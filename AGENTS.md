# Codex Project Instructions - Teamstar Manufacturing Website

This is the standalone Codex project for maintaining the Teamstar Manufacturing official website.

## Project

- Website: https://www.teamstarmfg.com
- Local path: `/Users/malone/Documents/Codex/2026-05-26/codex-codex/qunxin-company/01_projects/02_official_website_ops/teamstarmfg`
- GitHub repo: https://github.com/malonetang-code/teamstarmfg-website.git
- Production: Aliyun Hangzhou Lightweight Application Server at `116.62.121.239`
- Web root: `/www/wwwroot/wordpress`, served by Nginx
- GitHub remains the source repository; a push to `main` is not a production deployment.

## Required Context

At the start of each website task, read:

1. `WEBSITE_CONTEXT.md`
2. `topics/teamstarmfg-website.md`
3. `agent.md`

## Technical Shape

- Eleventy generates the production-ready static site from `src/` into `dist/`.
- Shared Nunjucks layouts and data drive separate Chinese and English URLs.
- Architecture plan: `../content_plan/website_architecture_evolution_2026-07-17.md`.
- Build with `npm run build`; preview with `npm run serve`.
- Images live in `images/`.
- Contact form uses Formspree ID `mbdqlnar`.

## Content Rules

- Company name: use `伟群`, never `威群`.
- Chinese company: `群新工业`.
- English brand: `Teamstar Manufacturing`.
- Industry: industrial knives and cutting tools.
- Visible pages need Chinese and English route counterparts with matching canonical and `hreflang` metadata.
- Keep copy concrete and factory-like: products, materials, process, quality control, custom inquiries.
- Avoid vague marketing language.

## Design Rules

- Industrial B2B, technical, concrete, and evidence-led.
- Use real factory, product, equipment, certificate, and approved customer assets.
- Confirmed visual system: Precision Catalog for the global shell, Modern Factory for company/factory storytelling, and Engineering System for capability/quality pages.
- Use ink `#10181d`, action orange `#e64a2e`, factory navy `#0b2432`, factory gold `#d7b066`, and engineering green `#173f31`.
- Responsive, accessible, and restrained in animation.

## Deployment Workflow

The user has approved a final deployment only after visual style confirmation and local acceptance. Do not deploy before that gate.

```bash
# 1. Verify locally.
# 2. Back up /www/wwwroot/wordpress on Aliyun.
# 3. Upload only the validated static build.
# 4. Verify remote hashes/responses, HTTPS, key pages, form path, ICP footer, and rollback backup.
```

After push, verify:

```text
https://www.teamstarmfg.com
```

## Lightweight Logging

- At the end of each meaningful maintenance stage, decide whether a short handoff note is needed without waiting for the user to ask.
- Write only durable handoff facts to `topics/teamstarmfg-website.md`: changed files/images, confirmed decisions, validation status, deploy status, unresolved risks, and Codex/OpenClaw coordination notes.
- Do not log ordinary command output, chat process, temporary ideas, resolved dead ends, large diffs, or repeated project rules.
- Keep each stage note to 1-3 short bullets. If nothing has future maintenance value, skip the log and say so.
- When `topics/teamstarmfg-website.md` becomes long, proactively suggest compressing old entries into a concise current-state summary and moving detailed history to an archive file.

## Safety

- Do not overwrite existing uncommitted changes.
- Do not delete historical assets, logs, or unrelated files unless explicitly asked.
- Do not mix BiteLog, AiLog, Alpaca, or other projects into this website.
- `topics/BiteLog.md` is unrelated to this website; ignore it unless the user asks to clean it up.
- DNS, certificates, Nginx, Formspree settings, and credentials are external production state. Change them only when required by the approved deployment scope and record verification/recovery evidence.
