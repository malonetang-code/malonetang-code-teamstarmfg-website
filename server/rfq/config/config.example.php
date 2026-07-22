<?php

declare(strict_types=1);

return [
    'base_url' => 'https://www.teamstarmfg.com',
    'database_path' => '/var/lib/teamstar-rfq/rfq.sqlite',
    'storage_path' => '/var/lib/teamstar-rfq/files',
    'mail_log_path' => '/var/lib/teamstar-rfq/mail',
    'download_secret' => 'replace-with-at-least-32-random-bytes',
    'rate_secret' => 'replace-with-a-different-random-value',
    'retention_days' => 30,
    'rate_limit_per_hour' => 5,
    'allowed_origins' => [
        'https://www.teamstarmfg.com',
        'https://teamstarmfg.com',
    ],
    'mail' => [
        'transport' => 'smtp',
        'host' => 'smtpdm.aliyun.com',
        'port' => 465,
        'username' => 'rfq@notify.teamstarmfg.com',
        'password' => 'replace-with-directmail-smtp-password',
        'from_address' => 'rfq@notify.teamstarmfg.com',
        'from_name' => 'Teamstar Website RFQ',
        'recipients' => [
            'yiyi@teamstarmfg.com',
            'rd01@teamstarmfg.com',
        ],
        'subject_prefix' => '[Teamstar RFQ]',
    ],
];
