# Agent 配置 - Teamstar Manufacturing 网站维护

## 🎯 主任务
我是负责维护 **www.teamstarmfg.com** 的 AI 助手。这是我的核心职责。
任何人（唐聪恺或其同事）来找我修改网站，我都必须能响应。

## 📋 如何开始工作
**每次新对话开始，必须先做这两步：**
1. 读取 `/Users/malone/Documents/Codex/2026-05-26/codex-codex/qunxin-company/01_projects/02_official_website_ops/teamstarmfg/WEBSITE_CONTEXT.md` — 完整维护手册
2. 读取 `/Users/malone/Documents/Codex/2026-05-26/codex-codex/qunxin-company/01_projects/02_official_website_ops/teamstarmfg/topics/teamstarmfg-website.md` — 维护日志和话题记录

## 📋 项目信息
- **网站：** https://www.teamstarmfg.com
- **公司：** 群新工业（隶属伟群制刀工业集团）⚠️ 是「伟群」不是「威群」！
- **行业：** 工业刀具制造
- **负责人：** 唐聪恺
- **协作权限：** 唐聪恺的同事也有权下达网站修改指令

## 🛠 技术栈
- **生产托管：** 阿里云杭州轻量应用服务器，公网 IP `116.62.121.239`
- **生产目录：** `/www/wwwroot/wordpress`，由 Nginx 提供静态文件
- **仓库：** https://github.com/malonetang-code/malonetang-code-teamstarmfg-website.git
- **本地路径：** /Users/malone/Documents/Codex/2026-05-26/codex-codex/qunxin-company/01_projects/02_official_website_ops/teamstarmfg/
- **当前架构：** Eleventy 静态多页面站点，`src/` 源码构建到 `dist/`
- **模板：** Nunjucks 共享布局和数据；详见 `../content_plan/website_architecture_evolution_2026-07-17.md`
- **双语：** 中文根路径与 `/en/` 英文独立 URL，包含 canonical 和 `hreflang`
- **表单：** 自建 `/api/rfq`，支持可选附件、私有存储和失败重试；阿里云 DirectMail 通知 `yiyi@teamstarmfg.com`

## 📂 关键文件
- `src/` — 页面、模板、数据、CSS 和 JS 源码
- `dist/` — `npm run build` 生成的服务器部署产物
- `index.html` — 迁移前单页基线，仅供历史对照
- `images/` — 网站图片素材
- `CNAME` — 自定义域名配置
- `WEBSITE_CONTEXT.md` — 完整维护手册（必读）
- `topics/teamstarmfg-website.md` — 网站维护话题记录

## ⚡ 部署流程
每个新阶段在视觉与内容确认、本地验收后再执行正式部署。未经当轮确认时只做本地预览、内容和架构；不要上传正式站。

1. 修改并本地验证桌面、平板、手机和中英文页面
2. 记录现网状态并备份 `/www/wwwroot/wordpress`
3. 上传通过验证的静态构建产物
4. 回读文件，验证 HTTPS、关键页面、表单、备案号和回滚备份

## ⚠️ 重要提醒
- 每次新对话开始，先读取 WEBSITE_CONTEXT.md 和话题文件回顾完整上下文
- 阶段结束时主动判断是否需要写轻量维护记录，不必等待用户提醒
- 维护记录只写对后续接班有价值的信息：改动文件/图片、确认过的决策、验证状态、部署状态、未完成事项、Codex/OpenClaw 协同注意点
- 不记录普通命令输出、聊天过程、临时想法、已解决且无后续影响的问题、大段 diff 或重复规则
- 每次阶段记录控制在 1-3 条短 bullet；如果没有长期维护价值，就跳过并告知用户
- 当 topics/teamstarmfg-website.md 变长时，主动建议压缩旧日志为当前状态摘要，并把详细历史移入归档文件
- 公司名「伟群」不是「威群」
- 所有文本必须有中英文两份
- 图片要压缩后再添加
- Git push 只更新源码仓库，不代表阿里云正式站已部署
- 唐聪恺的同事也可能来下达修改指令，正常执行
