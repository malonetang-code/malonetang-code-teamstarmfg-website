# Teamstar Manufacturing Website

Official website maintenance project for Teamstar Manufacturing / Zhangzhou Qunxin Industry.

Website: https://www.teamstarmfg.com

## Purpose

This repository maintains and improves the bilingual official website for Teamstar Manufacturing, focused on industrial knives and custom cutting tool solutions.

Core goals:
- Keep company information, products, contact details, and certificates accurate.
- Improve inquiry conversion for custom industrial knife buyers.
- Maintain bilingual Chinese / English content.
- Keep the Aliyun-hosted static deployment simple, fast, verifiable, and recoverable.

## Tech Stack

- Production static website hosted by Nginx on an Aliyun Hangzhou Lightweight Application Server
- Eleventy-generated static multi-page site with Nunjucks templates and shared data
- Separate Chinese and English URLs with canonical and `hreflang` metadata
- Shared CSS and JavaScript under `src/assets/`
- Self-hosted `/api/rfq` service with optional private file storage and Alibaba Cloud DirectMail notification
- Root domain points to the Aliyun origin; `www` uses Alibaba Cloud CDN with the Hangzhou server as origin

## Key Files

- `src/` - Source pages, layouts, shared data, CSS, and JavaScript
- `dist/` - Generated deployment artifact; never edit it by hand
- `index.html` - Preserved pre-migration single-page baseline
- `images/` - Product, factory, certificate, and presentation images
- `package.json` and `eleventy.config.js` - Build definition
- `CNAME` - Legacy GitHub Pages compatibility file; not the production DNS source of truth
- `WEBSITE_CONTEXT.md` - Full maintenance handbook
- `agent.md` - AI maintenance instructions
- `topics/teamstarmfg-website.md` - Ongoing project log
- `.github/workflows/pages.yml` - Legacy GitHub Pages workflow; not the production deployment path

## Local Workflow

```bash
cd /Users/malone/Documents/Codex/2026-05-26/codex-codex/qunxin-company/01_projects/02_official_website_ops/teamstarmfg
npm install
npm run build
npm run serve
```

Then open:

```text
http://localhost:8080
```

## Deployment

Production is not deployed by pushing to GitHub. After visual approval and local verification:

```bash
# Back up /www/wwwroot/wordpress on the Aliyun server.
# Upload only the validated static build.
# Verify remote files, HTTPS, key pages, form path, ICP footer, and rollback.
```

Production URL:

```text
https://www.teamstarmfg.com
```

## Maintenance Rules

- Company name must use `伟群`, not `威群`.
- Visible copy should have both Chinese and English versions.
- New images should be compressed before adding.
- Avoid unrelated project files in this repository.
- Verify the live site after deployment.
