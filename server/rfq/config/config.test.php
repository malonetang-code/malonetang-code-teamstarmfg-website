<?php

declare(strict_types=1);

return [
    'base_url' => 'http://127.0.0.1:18080',
    'database_path' => '/tmp/teamstar-rfq-state/rfq.sqlite',
    'storage_path' => '/tmp/teamstar-rfq-state/files',
    'mail_log_path' => '/tmp/teamstar-rfq-state/mail',
    'download_secret' => 'test-download-secret-0123456789-abcdefghijklmnopqrstuvwxyz',
    'rate_secret' => 'test-rate-secret-0123456789-abcdefghijklmnopqrstuvwxyz-abcd',
    'test_token' => 'teamstar-local-smoke-test',
    'retention_days' => 30,
    'rate_limit_per_hour' => 5,
    'allowed_origins' => ['http://127.0.0.1:8080'],
    'mail' => [
        'transport' => 'file',
        'host' => 'smtpdm.aliyun.com',
        'port' => 465,
        'username' => 'rfq@notify.teamstarmfg.com',
        'password' => 'not-used-by-file-transport',
        'from_address' => 'rfq@notify.teamstarmfg.com',
        'from_name' => 'Teamstar Website RFQ Test',
        'recipients' => [
            'yiyi@teamstarmfg.com',
            'rd01@teamstarmfg.com',
        ],
        'subject_prefix' => '[TEST Teamstar RFQ]',
    ],
];
