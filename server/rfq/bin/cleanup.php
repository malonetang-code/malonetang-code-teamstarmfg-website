<?php

declare(strict_types=1);

use Teamstar\Rfq\Application;

require dirname(__DIR__) . '/vendor/autoload.php';

$configPath = getenv('TEAMSTAR_RFQ_CONFIG') ?: '/etc/teamstar-rfq/config.php';
$application = new Application(require $configPath);
$result = $application->cleanupExpiredFiles();

echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) . PHP_EOL;
