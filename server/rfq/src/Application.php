<?php

declare(strict_types=1);

namespace Teamstar\Rfq;

use DateTimeImmutable;
use finfo;
use PDO;
use PHPMailer\PHPMailer\PHPMailer;
use RuntimeException;
use Throwable;

final class Application
{
    private const MAX_FILES = 10;
    private const MAX_FILE_BYTES = 26_214_400;
    private const MAX_TOTAL_BYTES = 104_857_600;
    private const ALLOWED_EXTENSIONS = [
        'pdf', 'dxf', 'dwg', 'step', 'stp', 'igs', 'iges',
        'zip', 'jpg', 'jpeg', 'png', 'webp',
    ];

    private array $config;
    private PDO $database;

    public function __construct(array $config)
    {
        $this->config = $config;
        $this->validateConfiguration();
        $this->createDirectory(dirname($config['database_path']));
        $this->createDirectory($config['storage_path']);
        $this->createDirectory($config['mail_log_path']);

        $this->database = new PDO('sqlite:' . $config['database_path'], null, null, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);
        $this->database->exec('PRAGMA foreign_keys = ON');
        $this->database->exec('PRAGMA journal_mode = WAL');
        $this->initializeSchema();
    }

    public function handleHttpRequest(): void
    {
        header('Cache-Control: no-store, private');
        header('X-Content-Type-Options: nosniff');

        try {
            $this->applyCorsHeaders();
            $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
            $path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';

            if ($method === 'OPTIONS') {
                http_response_code(204);
                return;
            }

            if ($method === 'POST' && $path === '/api/rfq') {
                $this->handleSubmission();
                return;
            }

            if (($method === 'GET' || $method === 'HEAD')
                && preg_match('#^/api/rfq/files/([a-f0-9]{32})$#', $path, $matches)) {
                $this->handleDownload($matches[1], $method === 'HEAD');
                return;
            }

            $this->jsonResponse(404, ['ok' => false, 'message' => 'Not found']);
        } catch (ValidationException $error) {
            $this->jsonResponse($error->status, ['ok' => false, 'message' => $error->getMessage()]);
        } catch (Throwable $error) {
            error_log('Teamstar RFQ error: ' . $error->getMessage());
            $this->jsonResponse(500, ['ok' => false, 'message' => 'The RFQ could not be processed']);
        }
    }

    public function processNotificationQueue(int $limit = 20): array
    {
        $statement = $this->database->prepare(
            "SELECT id FROM rfqs
             WHERE notification_status IN ('queued', 'retry') AND next_attempt_at <= :now
             ORDER BY id ASC LIMIT :limit"
        );
        $statement->bindValue(':now', time(), PDO::PARAM_INT);
        $statement->bindValue(':limit', max(1, min($limit, 100)), PDO::PARAM_INT);
        $statement->execute();

        $result = ['processed' => 0, 'sent' => 0, 'retry' => 0];
        foreach ($statement->fetchAll() as $row) {
            $result['processed']++;
            if ($this->sendNotification((int) $row['id'])) {
                $result['sent']++;
            } else {
                $result['retry']++;
            }
        }
        return $result;
    }

    public function cleanupExpiredFiles(): array
    {
        $cutoff = time() - ((int) $this->config['retention_days'] * 86400);
        $statement = $this->database->prepare(
            'SELECT id, stored_name FROM files WHERE deleted_at IS NULL AND created_at < :cutoff'
        );
        $statement->execute([':cutoff' => $cutoff]);

        $deleted = 0;
        foreach ($statement->fetchAll() as $file) {
            $path = $this->storedFilePath($file['stored_name']);
            if (is_file($path)) {
                unlink($path);
            }
            $update = $this->database->prepare('UPDATE files SET deleted_at = :deleted_at WHERE id = :id');
            $update->execute([':deleted_at' => time(), ':id' => $file['id']]);
            $deleted++;
        }

        return ['deleted_files' => $deleted, 'retention_days' => (int) $this->config['retention_days']];
    }

    private function handleSubmission(): void
    {
        $contentLength = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
        if ($contentLength > self::MAX_TOTAL_BYTES + 5_242_880) {
            throw new ValidationException('The submitted files exceed the 100 MB total limit', 413);
        }

        if (trim((string) ($_POST['_gotcha'] ?? '')) !== '') {
            $this->jsonResponse(200, ['ok' => true, 'reference' => $this->createReference()]);
            return;
        }

        $data = $this->validateFields($_POST);
        $this->enforceRateLimit();
        $files = $this->validateUploads($_FILES['attachments'] ?? null);
        $reference = $this->createReference();
        $createdAt = time();
        $savedPaths = [];

        $this->database->beginTransaction();
        try {
            $insert = $this->database->prepare(
                'INSERT INTO rfqs (
                    reference, language, name, email, company, country_or_region, phone,
                    inquiry_path, product_category, quantity, machine_make_model,
                    processed_material, technical_requirements, ip_hash, notification_status,
                    attempts, next_attempt_at, created_at
                 ) VALUES (
                    :reference, :language, :name, :email, :company, :country_or_region, :phone,
                    :inquiry_path, :product_category, :quantity, :machine_make_model,
                    :processed_material, :technical_requirements, :ip_hash, :notification_status,
                    0, :next_attempt_at, :created_at
                 )'
            );
            $insert->execute([
                ':reference' => $reference,
                ':language' => $data['language'],
                ':name' => $data['name'],
                ':email' => $data['email'],
                ':company' => $data['company'],
                ':country_or_region' => $data['country_or_region'],
                ':phone' => $data['phone'],
                ':inquiry_path' => $data['inquiry_path'],
                ':product_category' => $data['product_category'],
                ':quantity' => $data['quantity'],
                ':machine_make_model' => $data['machine_make_model'],
                ':processed_material' => $data['processed_material'],
                ':technical_requirements' => $data['technical_requirements'],
                ':ip_hash' => $this->requestIpHash(),
                ':notification_status' => 'queued',
                ':next_attempt_at' => $createdAt,
                ':created_at' => $createdAt,
            ]);
            $rfqId = (int) $this->database->lastInsertId();

            foreach ($files as $file) {
                $extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
                $storedName = bin2hex(random_bytes(24)) . '.' . $extension;
                $publicId = bin2hex(random_bytes(16));
                $target = $this->storedFilePath($storedName);
                if (!move_uploaded_file($file['tmp_name'], $target)) {
                    throw new RuntimeException('Could not store uploaded file');
                }
                chmod($target, 0640);
                $savedPaths[] = $target;

                $fileInsert = $this->database->prepare(
                    'INSERT INTO files (
                        rfq_id, public_id, original_name, stored_name, mime_type, file_size, created_at
                     ) VALUES (:rfq_id, :public_id, :original_name, :stored_name, :mime_type, :file_size, :created_at)'
                );
                $fileInsert->execute([
                    ':rfq_id' => $rfqId,
                    ':public_id' => $publicId,
                    ':original_name' => $file['name'],
                    ':stored_name' => $storedName,
                    ':mime_type' => $file['mime'],
                    ':file_size' => $file['size'],
                    ':created_at' => $createdAt,
                ]);
            }

            $this->database->commit();
        } catch (Throwable $error) {
            if ($this->database->inTransaction()) {
                $this->database->rollBack();
            }
            foreach ($savedPaths as $path) {
                if (is_file($path)) unlink($path);
            }
            throw $error;
        }

        $notificationSent = $this->sendNotification($rfqId);
        $this->jsonResponse(200, [
            'ok' => true,
            'reference' => $reference,
            'attachments' => count($files),
            'notification' => $notificationSent ? 'sent' : 'queued',
        ]);
    }

    private function handleDownload(string $publicId, bool $headOnly): void
    {
        $expires = filter_input(INPUT_GET, 'expires', FILTER_VALIDATE_INT);
        $signature = (string) ($_GET['signature'] ?? '');
        if (!$expires || $expires < time() || $expires > time() + ((int) $this->config['retention_days'] * 86400) + 3600) {
            throw new ValidationException('This download link has expired', 410);
        }

        $expected = hash_hmac('sha256', $publicId . '|' . $expires, $this->config['download_secret']);
        if (!hash_equals($expected, $signature)) {
            throw new ValidationException('Invalid download link', 403);
        }

        $statement = $this->database->prepare(
            'SELECT original_name, stored_name, mime_type, file_size FROM files
             WHERE public_id = :public_id AND deleted_at IS NULL'
        );
        $statement->execute([':public_id' => $publicId]);
        $file = $statement->fetch();
        if (!$file) {
            throw new ValidationException('File not found', 404);
        }

        $path = $this->storedFilePath($file['stored_name']);
        if (!is_file($path)) {
            throw new ValidationException('File not found', 404);
        }

        header('Content-Type: application/octet-stream');
        header('Content-Length: ' . (string) $file['file_size']);
        header("Content-Disposition: attachment; filename*=UTF-8''" . rawurlencode($file['original_name']));
        if (!$headOnly) readfile($path);
    }

    private function validateFields(array $input): array
    {
        $required = [
            'name' => 120,
            'email' => 254,
            'company' => 180,
            'inquiry_path' => 24,
            'product_category' => 100,
            'quantity' => 120,
            'processed_material' => 180,
            'technical_requirements' => 5000,
        ];
        $optional = [
            'country_or_region' => 120,
            'phone' => 80,
            'machine_make_model' => 180,
            'language' => 8,
        ];

        $data = [];
        foreach ($required as $field => $maxLength) {
            $value = $this->plainText($input[$field] ?? '', $maxLength);
            if ($value === '') throw new ValidationException("Missing required field: {$field}");
            $data[$field] = $value;
        }
        foreach ($optional as $field => $maxLength) {
            $data[$field] = $this->plainText($input[$field] ?? '', $maxLength);
        }

        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            throw new ValidationException('Invalid email address');
        }
        if (!in_array($data['inquiry_path'], ['drawing', 'sample', 'application'], true)) {
            throw new ValidationException('Invalid inquiry path');
        }
        $data['language'] = $data['language'] === 'en' ? 'en' : 'zh';
        return $data;
    }

    private function validateUploads(?array $upload): array
    {
        if (!$upload || !isset($upload['error'])) return [];

        $files = [];
        $names = is_array($upload['name']) ? $upload['name'] : [$upload['name']];
        $errors = is_array($upload['error']) ? $upload['error'] : [$upload['error']];
        $temporaryNames = is_array($upload['tmp_name']) ? $upload['tmp_name'] : [$upload['tmp_name']];
        $sizes = is_array($upload['size']) ? $upload['size'] : [$upload['size']];

        $totalBytes = 0;
        $finfo = new finfo(FILEINFO_MIME_TYPE);
        foreach ($names as $index => $rawName) {
            $error = (int) ($errors[$index] ?? UPLOAD_ERR_NO_FILE);
            if ($error === UPLOAD_ERR_NO_FILE) continue;
            if ($error !== UPLOAD_ERR_OK) throw new ValidationException('One of the files could not be uploaded');

            if (count($files) >= self::MAX_FILES) {
                throw new ValidationException('A maximum of 10 files can be uploaded');
            }

            $name = $this->safeOriginalFilename((string) $rawName);
            $extension = strtolower(pathinfo($name, PATHINFO_EXTENSION));
            if (!in_array($extension, self::ALLOWED_EXTENSIONS, true)) {
                throw new ValidationException("Unsupported file type: {$name}");
            }

            $size = (int) ($sizes[$index] ?? 0);
            if ($size <= 0 || $size > self::MAX_FILE_BYTES) {
                throw new ValidationException("File exceeds the 25 MB limit: {$name}", 413);
            }
            $totalBytes += $size;
            if ($totalBytes > self::MAX_TOTAL_BYTES) {
                throw new ValidationException('The submitted files exceed the 100 MB total limit', 413);
            }

            $temporaryName = (string) ($temporaryNames[$index] ?? '');
            if (!is_uploaded_file($temporaryName)) {
                throw new ValidationException('Invalid uploaded file');
            }
            $mime = $finfo->file($temporaryName) ?: 'application/octet-stream';
            if (preg_match('#(?:php|x-httpd|x-sh|x-executable)#i', $mime)) {
                throw new ValidationException("Unsafe file content: {$name}");
            }

            $files[] = [
                'name' => $name,
                'tmp_name' => $temporaryName,
                'size' => $size,
                'mime' => $mime,
            ];
        }

        return $files;
    }

    private function sendNotification(int $rfqId): bool
    {
        $statement = $this->database->prepare('SELECT * FROM rfqs WHERE id = :id');
        $statement->execute([':id' => $rfqId]);
        $rfq = $statement->fetch();
        if (!$rfq) return false;

        $fileStatement = $this->database->prepare(
            'SELECT public_id, original_name, file_size FROM files WHERE rfq_id = :rfq_id AND deleted_at IS NULL ORDER BY id'
        );
        $fileStatement->execute([':rfq_id' => $rfqId]);
        $files = $fileStatement->fetchAll();

        try {
            $message = $this->buildNotificationMessage($rfq, $files);
            if (($this->config['mail']['transport'] ?? 'smtp') === 'file') {
                $path = rtrim($this->config['mail_log_path'], '/') . '/' . $rfq['reference'] . '.html';
                file_put_contents($path, $message['html'], LOCK_EX);
            } else {
                $mail = new PHPMailer(true);
                $mail->isSMTP();
                $mail->Host = $this->config['mail']['host'];
                $mail->Port = (int) $this->config['mail']['port'];
                $mail->SMTPAuth = true;
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
                $mail->Username = $this->config['mail']['username'];
                $mail->Password = $this->config['mail']['password'];
                $mail->Timeout = 20;
                $mail->CharSet = PHPMailer::CHARSET_UTF8;
                $mail->setFrom($this->config['mail']['from_address'], $this->config['mail']['from_name']);
                foreach ($this->config['mail']['recipients'] as $recipient) {
                    $mail->addAddress($recipient);
                }
                $mail->addReplyTo($rfq['email'], $rfq['name']);
                $mail->Subject = $message['subject'];
                $mail->isHTML(true);
                $mail->Body = $message['html'];
                $mail->AltBody = $message['text'];
                $mail->send();
            }

            $update = $this->database->prepare(
                "UPDATE rfqs SET notification_status = 'sent', notified_at = :notified_at, last_error = NULL WHERE id = :id"
            );
            $update->execute([':notified_at' => time(), ':id' => $rfqId]);
            return true;
        } catch (Throwable $error) {
            $attempts = ((int) $rfq['attempts']) + 1;
            $delay = min(3600, 60 * (2 ** min($attempts - 1, 6)));
            $update = $this->database->prepare(
                "UPDATE rfqs SET notification_status = 'retry', attempts = :attempts,
                 next_attempt_at = :next_attempt_at, last_error = :last_error WHERE id = :id"
            );
            $update->execute([
                ':attempts' => $attempts,
                ':next_attempt_at' => time() + $delay,
                ':last_error' => mb_substr($error->getMessage(), 0, 500),
                ':id' => $rfqId,
            ]);
            error_log('Teamstar RFQ notification retry: ' . $error->getMessage());
            return false;
        }
    }

    private function buildNotificationMessage(array $rfq, array $files): array
    {
        $escape = static fn (string $value): string => htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
        $rows = [
            '询价编号' => $rfq['reference'],
            '公司' => $rfq['company'],
            '联系人' => $rfq['name'],
            '客户邮箱' => $rfq['email'],
            '国家或地区' => $rfq['country_or_region'] ?: '-',
            '电话' => $rfq['phone'] ?: '-',
            '资料入口' => $rfq['inquiry_path'],
            '刀具类别' => $rfq['product_category'],
            '需求数量' => $rfq['quantity'],
            '设备品牌及型号' => $rfq['machine_make_model'] ?: '-',
            '被处理材料' => $rfq['processed_material'],
            '技术要求' => $rfq['technical_requirements'],
        ];

        $htmlRows = '';
        $textRows = [];
        foreach ($rows as $label => $value) {
            $htmlRows .= '<tr><th style="text-align:left;padding:8px;border-bottom:1px solid #ddd;vertical-align:top">'
                . $escape($label) . '</th><td style="padding:8px;border-bottom:1px solid #ddd">'
                . nl2br($escape((string) $value)) . '</td></tr>';
            $textRows[] = $label . ': ' . $value;
        }

        $expires = time() + ((int) $this->config['retention_days'] * 86400);
        $htmlFiles = '<p>未上传附件</p>';
        $textFiles = ['附件: 无'];
        if ($files) {
            $items = [];
            $textFiles = ['附件下载链接（30天有效）:'];
            foreach ($files as $file) {
                $signature = hash_hmac('sha256', $file['public_id'] . '|' . $expires, $this->config['download_secret']);
                $url = rtrim($this->config['base_url'], '/') . '/api/rfq/files/' . $file['public_id']
                    . '?expires=' . $expires . '&signature=' . $signature;
                $label = $file['original_name'] . ' (' . $this->formatBytes((int) $file['file_size']) . ')';
                $items[] = '<li><a href="' . $escape($url) . '">' . $escape($label) . '</a></li>';
                $textFiles[] = $label . ': ' . $url;
            }
            $htmlFiles = '<p><strong>附件下载链接（30天有效）</strong></p><ul>' . implode('', $items) . '</ul>';
        }

        $prefix = trim((string) ($this->config['mail']['subject_prefix'] ?? '[Teamstar RFQ]'));
        return [
            'subject' => "{$prefix} {$rfq['reference']} {$rfq['company']} / {$rfq['product_category']}",
            'html' => '<h2>官网技术询价</h2><table style="border-collapse:collapse;width:100%;max-width:760px">'
                . $htmlRows . '</table>' . $htmlFiles
                . '<p style="color:#666">直接回复本邮件将回复客户邮箱。附件到期后会从服务器自动删除。</p>',
            'text' => "官网技术询价\n\n" . implode("\n", $textRows) . "\n\n" . implode("\n", $textFiles),
        ];
    }

    private function applyCorsHeaders(): void
    {
        $origin = (string) ($_SERVER['HTTP_ORIGIN'] ?? '');
        if ($origin !== '') {
            if (!in_array($origin, $this->config['allowed_origins'], true)) {
                throw new ValidationException('Origin is not allowed', 403);
            }
            header('Access-Control-Allow-Origin: ' . $origin);
            header('Access-Control-Allow-Methods: POST, OPTIONS');
            header('Access-Control-Allow-Headers: Accept, Content-Type');
            header('Vary: Origin');
        }
    }

    private function enforceRateLimit(): void
    {
        $testToken = (string) ($this->config['test_token'] ?? '');
        $providedToken = (string) ($_SERVER['HTTP_X_TEAMSTAR_TEST_TOKEN'] ?? '');
        if ($testToken !== '' && hash_equals($testToken, $providedToken)) return;

        $statement = $this->database->prepare(
            'SELECT COUNT(*) FROM rfqs WHERE ip_hash = :ip_hash AND created_at >= :cutoff'
        );
        $statement->execute([':ip_hash' => $this->requestIpHash(), ':cutoff' => time() - 3600]);
        if ((int) $statement->fetchColumn() >= (int) $this->config['rate_limit_per_hour']) {
            throw new ValidationException('Too many RFQ submissions. Please try again later', 429);
        }
    }

    private function requestIpHash(): string
    {
        $ip = (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
        return hash_hmac('sha256', $ip, $this->config['rate_secret']);
    }

    private function initializeSchema(): void
    {
        $this->database->exec(
            "CREATE TABLE IF NOT EXISTS rfqs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                reference TEXT NOT NULL UNIQUE,
                language TEXT NOT NULL,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                company TEXT NOT NULL,
                country_or_region TEXT NOT NULL DEFAULT '',
                phone TEXT NOT NULL DEFAULT '',
                inquiry_path TEXT NOT NULL,
                product_category TEXT NOT NULL,
                quantity TEXT NOT NULL,
                machine_make_model TEXT NOT NULL DEFAULT '',
                processed_material TEXT NOT NULL,
                technical_requirements TEXT NOT NULL,
                ip_hash TEXT NOT NULL,
                notification_status TEXT NOT NULL,
                attempts INTEGER NOT NULL DEFAULT 0,
                next_attempt_at INTEGER NOT NULL,
                last_error TEXT,
                created_at INTEGER NOT NULL,
                notified_at INTEGER
            )"
        );
        $this->database->exec(
            "CREATE TABLE IF NOT EXISTS files (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                rfq_id INTEGER NOT NULL REFERENCES rfqs(id) ON DELETE CASCADE,
                public_id TEXT NOT NULL UNIQUE,
                original_name TEXT NOT NULL,
                stored_name TEXT NOT NULL UNIQUE,
                mime_type TEXT NOT NULL,
                file_size INTEGER NOT NULL,
                created_at INTEGER NOT NULL,
                deleted_at INTEGER
            )"
        );
        $this->database->exec('CREATE INDEX IF NOT EXISTS rfqs_queue_idx ON rfqs(notification_status, next_attempt_at)');
        $this->database->exec('CREATE INDEX IF NOT EXISTS rfqs_rate_idx ON rfqs(ip_hash, created_at)');
        $this->database->exec('CREATE INDEX IF NOT EXISTS files_retention_idx ON files(deleted_at, created_at)');
    }

    private function validateConfiguration(): void
    {
        foreach (['base_url', 'database_path', 'storage_path', 'mail_log_path', 'download_secret', 'rate_secret'] as $key) {
            if (!isset($this->config[$key]) || trim((string) $this->config[$key]) === '') {
                throw new RuntimeException("Missing RFQ configuration: {$key}");
            }
        }
        if (strlen((string) $this->config['download_secret']) < 32 || strlen((string) $this->config['rate_secret']) < 32) {
            throw new RuntimeException('RFQ secrets must be at least 32 characters');
        }
        if (!isset($this->config['mail'], $this->config['allowed_origins'])) {
            throw new RuntimeException('Missing RFQ mail or origin configuration');
        }
    }

    private function createReference(): string
    {
        return 'TS-' . (new DateTimeImmutable())->format('Ymd') . '-' . strtoupper(substr(bin2hex(random_bytes(4)), 0, 6));
    }

    private function createDirectory(string $path): void
    {
        if (!is_dir($path) && !mkdir($path, 0750, true) && !is_dir($path)) {
            throw new RuntimeException("Could not create directory: {$path}");
        }
    }

    private function storedFilePath(string $storedName): string
    {
        if (!preg_match('/^[a-f0-9]{48}\.[a-z0-9]+$/', $storedName)) {
            throw new RuntimeException('Invalid stored filename');
        }
        return rtrim($this->config['storage_path'], '/') . '/' . $storedName;
    }

    private function plainText(mixed $value, int $maxLength): string
    {
        if (!is_scalar($value)) return '';
        $text = trim(preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', (string) $value) ?? '');
        if (mb_strlen($text) > $maxLength) {
            throw new ValidationException('One of the submitted fields is too long');
        }
        return $text;
    }

    private function safeOriginalFilename(string $name): string
    {
        $name = basename(str_replace('\\', '/', $name));
        $name = trim(preg_replace('/[\x00-\x1F\x7F]/u', '', $name) ?? '');
        if ($name === '' || mb_strlen($name) > 180) {
            throw new ValidationException('Invalid filename');
        }
        return $name;
    }

    private function formatBytes(int $bytes): string
    {
        if ($bytes >= 1_048_576) return number_format($bytes / 1_048_576, 1) . ' MB';
        if ($bytes >= 1024) return number_format($bytes / 1024, 1) . ' KB';
        return $bytes . ' B';
    }

    private function jsonResponse(int $status, array $payload): void
    {
        http_response_code($status);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }
}

final class ValidationException extends RuntimeException
{
    public function __construct(string $message, public readonly int $status = 422)
    {
        parent::__construct($message);
    }
}
