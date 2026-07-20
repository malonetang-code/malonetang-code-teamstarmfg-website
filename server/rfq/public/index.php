<?php

declare(strict_types=1);

use Teamstar\Rfq\Application;

require dirname(__DIR__) . '/vendor/autoload.php';

$configPath = $_SERVER['TEAMSTAR_RFQ_CONFIG']
    ?? getenv('TEAMSTAR_RFQ_CONFIG')
    ?: '/etc/teamstar-rfq/config.php';

if (!is_file($configPath)) {
    http_response_code(503);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['ok' => false, 'message' => 'RFQ service is not configured']);
    exit;
}

$config = require $configPath;
(new Application($config))->handleHttpRequest();
