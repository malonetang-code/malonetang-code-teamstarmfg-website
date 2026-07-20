# Teamstar RFQ service

Self-hosted PHP service for structured RFQ intake, optional drawing uploads and sales email notifications.

## Request flow

1. `POST /api/rfq` validates the RFQ and up to 10 optional files.
2. The service writes the RFQ and file metadata to SQLite before attempting email.
3. Files are renamed and stored outside the website root.
4. Sales receives a structured email with expiring signed download links.
5. Failed email notifications remain queued and are retried by cron.
6. Uploaded files are deleted after the configured retention period.

## Limits

- 10 files per RFQ
- 25 MB per file
- 100 MB combined
- Extensions: PDF, DXF, DWG, STEP, STP, IGS, IGES, ZIP, JPG, JPEG, PNG and WebP
- Five submissions per source IP hash per hour by default

## Server layout

- Releases: `/opt/teamstar-rfq/releases/<release>`
- Current release: `/opt/teamstar-rfq/current`
- Configuration: `/etc/teamstar-rfq/config.php`
- Database and queues: `/var/lib/teamstar-rfq`
- Uploaded files: `/var/lib/teamstar-rfq/files`
- Nginx route: `/www/server/panel/vhost/nginx/extension/127.0.0.1/rfq.conf`

Configuration secrets must never be placed in the repository or website root. The PHP-FPM user needs read access to the configuration and read/write access to `/var/lib/teamstar-rfq`.

## Mail modes

- `file`: writes rendered notification HTML to the private mail log directory. Use for deployment checks only.
- `smtp`: sends through Alibaba Cloud DirectMail at `smtpdm.aliyun.com` with SSL on port 465. Use the dedicated SMTP password for `rfq@notify.teamstarmfg.com`; never use a mailbox or webmail password.

The production sender domain is `notify.teamstarmfg.com`. Its SPF, DKIM, DMARC and MX records must remain valid. After any credential, sender or DNS change, repeat a real delivery test and compare the submitted and downloaded attachment hashes.

## Verification

```bash
composer install --no-dev --prefer-dist --optimize-autoloader
find . -path ./vendor -prune -o -name '*.php' -print -exec php -l {} \;
```

After deployment, verify `OPTIONS`, a multipart `POST`, SQLite state, file ownership, the notification result, signed download headers and a source/download SHA-256 comparison.
