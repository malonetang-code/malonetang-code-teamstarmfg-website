# Teamstar Manufacturing 网站维护话题

## 2026-07-17 Logo 墙与标题规范
- Logo 墙已取消灰度和透明度处理，10 个品牌标识默认显示原色；CSS/JS 增加版本参数，避免回访浏览器继续使用旧样式。
- sitemap 32 个页面的全部 H1/H2 已去除结尾句号；线上浏览器验证无断图、溢出和控制台错误，发布证据见 `../../deploy_packages/releases/20260717191323/DEPLOYMENT.md`。

## 2026-07-17 官网措辞与设备图纠正
- 已移除官网中关于 AI 伪装、证据边界、素材批准和避免虚构等内部审核式措辞，改为直接面向客户的业务表达。
- `factory-interior.jpg` 与 `cnc-machines.jpg` 不再被任何页面引用，也不再复制到 `dist/`；热修复上线后两个公开 URL 均为 404，发布证据见 `../../deploy_packages/releases/20260717185957/DEPLOYMENT.md`。

## 2026-07-17 架构演进上线
- 用户确认 A+B+C 视觉组合：Precision Catalog 为全站骨架，Modern Factory 用于公司/工厂，Engineering System 用于能力/质量；Eleventy 双语多页面源码位于 `src/`，构建产物为 `dist/`，旧单页说明已被本节及维护手册取代。
- 2026-07-17 已部署阿里云 `/www/wwwroot/wordpress`：69/69 文件哈希通过，根域、`www`、中英文与关键页面 HTTPS 200，移动端/桌面端浏览器无控制台错误；发布证据见 `../../deploy_packages/releases/20260717183617/DEPLOYMENT.md`。
- 即时回滚目录为 `/www/wwwroot/teamstar-rollback-20260717183617`，压缩备份为 `/root/teamstar-backups/20260717183617/wordpress-before-v3.tar.gz`；旧首页哈希已在两个恢复来源中匹配。

## 2026-07-17 架构演进启动
- 用户批准启动官网架构演进，并批准最终在视觉确认、本地验收和现网备份后部署；目标为静态多页面、共享模板、中文/英文独立 URL，方案见 `../content_plan/website_architecture_evolution_2026-07-17.md`。
- 本地首页已接入新 Logo 墙和品保设备素材，两个现有视频因转场与配乐不满意而不直接上线；已制作 A/B/C 三套视觉样稿等待确认，正式站尚未部署。
- 生产事实已校正为阿里云杭州轻量应用服务器 `116.62.121.239` / Nginx `/www/wwwroot/wordpress`；GitHub push 不代表正式部署。

## 2026-05-25 接手记录
- 当前项目路径：`/Users/malone/Documents/Codex/2026-05-26/codex-codex/qunxin-company/01_projects/02_official_website_ops/teamstarmfg/`
- 当前 Git 状态：`main...origin/main`，本地已有未提交改动。
- 未提交改动包括：`index.html`、`WEBSITE_CONTEXT.md`、`timeline.html`、`topics/BiteLog.md`、`topics/teamstarmfg-website.md`。
- 线上站点 `https://www.teamstarmfg.com/` 仍显示旧首页主张：`Precision Industrial Cutting Tool Solutions`，本地 `index.html` 已开始转向 `Custom Industrial Knives / From Prototype to Production`。
- 本轮补充 `README.md` 作为项目入口，后续维护优先读取 `WEBSITE_CONTEXT.md` 与本文件。

## 2026-05-25 阶段收口（明天继续）
- 当前继续稿以本地 `index.html` 为准：已重构为长期门户结构 `#home` / `#products` / `#custom` / `#capabilities` / `#quality` / `#company` / `#customers` / `#contact`；可见 `SEO 技术资料库` 已移除，`WEBSITE_BLUEPRINT.md` 是新蓝图。
- 验证与部署状态：仅本地验证，未部署正式站；GitHub Pages 预览镜像是较早稿，不作为明天验收依据；本地检查通过：无 `#resources`、锚点无断、中英数量一致、Formspree 仍为 `mbdqlnar`。
- 明天优先事项：本地打开 `index.html` 做整体视觉/文案评审；确认客户 Logo/证言授权、工厂数据占位、产品分类与图片；全部通过后再决定是否提交和部署。

## 近期优化方向
- 2026-06-22 阿里云备案接入准确性复核：已登录正确阿里云账号查看 `群新工业（漳州）有限公司` 主体，后台仍显示 `闽ICP备2026007966号-1 / teamstarmfg.com` 风险，原因是“已备案域名未使用阿里云中国内地节点服务器”；后台原截止提示为 `2026年06月23日0点之前`，可见操作只有 `申请延期`、`申请核查专员回电协助`，未看到 `申请提前复查`。技术侧已完成整改：AliDNS 查询 `teamstarmfg.com` 与 `www.teamstarmfg.com` 均解析到 `116.62.121.239`，WHOIS 归属 `Aliyun Computing Co., LTD` / CN，线上 `https://www.teamstarmfg.com` 返回 `HTTP/2 200` / `nginx`，页脚已显示 `闽ICP备2026007966号-1` 并链接工信部。已提交 `申请延期` 兜底：延期 `10个工作日`，原因为 `其他原因（备注必填）`，说明域名已恢复解析至阿里云中国内地节点、网站访问正常、等待系统复核；后台确认 `您的延期处理申请已通过`，新期限为 `2026年07月07日0点之前`。后续不要误判为仍需从 GitHub Pages 迁移，也不要点击取消接入/注销类操作，等待阿里云自动复核或再申请核查专员协助。
- 2026-06-16 用户选择阿里云备案整改 1 号方案：保留 `闽ICP备2026007966号-1` 并恢复使用阿里云中国内地节点；本地 `index.html` 已补备案号页脚，迁移执行清单见上级目录 `content_plan/aliyun_mainland_migration_2026-06-16.md`，正式 DNS/阿里云复查仍需登录控制台完成。
- 2026-05-25 用户批准更新 GitHub Pages 预览镜像；已将当前本地门户稿同步到 `malonetang-code/teamstarmfg-preview`，提交 `a857432`，预览页现在包含客户案例板块且不含可见 `SEO 技术资料库`；正式站仍未部署。
- 2026-05-25 用户确认移除可见 `SEO 技术资料库` 板块；首页不再保留通用资源库入口，未来 SEO 内容改从产品详情、行业应用、制造能力、客户案例或询盘指南等真实页面承接。
- 2026-05-25 用户确认短期工作流：官网重构全部通过前只做本地预览和验证；不主动推正式站，也不主动推 GitHub Pages 预览镜像，除非用户明确批准。
- 2026-05-25 Codex: 在长期门户稿新增 `#customers` 客户证言与合作案例板块，并接入导航/移动菜单/页脚/蓝图；真实客户 Logo、证言、案例必须确认可公开授权后再替换占位内容。
- 2026-05-25 Codex: 按长期门户架构重构本地 `index.html`，新增 `WEBSITE_BLUEPRINT.md` 记录信息架构、视觉系统、占位符规则与未来 SEO 页面规划；仅更新预览镜像前的本地稿，正式站未部署。
- 2026-05-25 Codex: 制作官网 UI/UX 样稿，仅改本地 `index.html`；强化定制刀具定位、产品参数标签、定制流程、制造能力板块、质量区视觉和联系方式统一；已本地验证桌面/移动端与语言切换，未提交/未部署。
- 2026-05-25 Codex: 创建 GitHub Pages 预览镜像 `malonetang-code/teamstarmfg-preview`，地址 `https://malonetang-code.github.io/teamstarmfg-preview/`；仅用于查看样稿，不影响正式站 `www.teamstarmfg.com`。
- 2026-05-25 Codex: 根据反馈修正中文态英文泄漏、手机端首屏顺序和“定制流程/制造能力”可见性；本地验证中英切换与 390px/1440px 无横向溢出，待用户确认后再决定是否部署正式站。
- 确认并发布本地首页定位优化：突出“来图定制、样品复刻、打样到量产”。
- 检查新增 `#process` 定制流程板块在桌面与移动端的显示效果。
- 发布前再次确认联系邮箱与电话：本地样稿已统一为 `info@teamstarmfg.com` 和 `+86 181-5070-7007`，表单仍使用 Formspree `mbdqlnar`。
- 清理与官网无关的话题文件，例如 `topics/BiteLog.md`。
- 审核 `timeline.html` 是否需要纳入官网导航或仅作为内部资料页。
- 发布前用本地服务器和浏览器截图验证首页、产品、表单、语言切换、移动端菜单。

## 基本信息
- **网站地址：** https://www.teamstarmfg.com
- **公司：** 群新工业（隶属伟群制刀工业集团 Wei Qun Cutting Tools Group）
- **行业：** 工业刀具制造（木工、食品、塑胶、服装、纸品、工业等）
- **负责人：** 唐聪恺
- **主任务：** 维护 www.teamstarmfg.com 网站

## 技术架构
- **托管：** GitHub Pages（自动部署）
- **仓库：** https://github.com/malonetang-code/malonetang-code-teamstarmfg-website.git
- **账号：** malonetang-code
- **分支：** main（唯一分支）
- **本地路径：** /Users/malone/Documents/Codex/2026-05-26/codex-codex/qunxin-company/01_projects/02_official_website_ops/teamstarmfg/
- **技术栈：** 纯前端，单个 index.html（HTML/CSS/JS 全内联，1915行）
- **域名配置：** CNAME → www.teamstarmfg.com
- **表单服务：** Formspree ID: mbdqlnar → tang@teamstarmfg.com
- **双语：** 中/英，通过 data-lang 属性切换，默认中文

## 部署流程
1. 修改文件（index.html、images/ 等）
2. git add . && git commit -m "描述改动"
3. git push origin main（自动触发部署，1-2 分钟生效）
4. 访问 https://www.teamstarmfg.com 验证

## 联系方式
- 邮箱：info@teamstarmfg.com（对外）/ tang@teamstarmfg.com（表单接收）
- 电话：+86 181-5070-7007
- 地址：福建省漳州市长泰区古农农场顺兴路6号

## 设计规范
- 主色：#1a3a5c（深蓝）
- 强调色：#c8a45a（金色）
- 字体：英文 Inter / 中文 Noto Sans SC
- 风格：现代工业感，卡片式布局，圆角16px，响应式
- 动画：fade-up 渐入（IntersectionObserver）

## 网站板块（index.html）
| # | Section ID | 中文标题 | 说明 |
|---|-----------|---------|------|
| 1 | #home | 首页 Hero | 大图背景 + 公司标语 + CTA 按钮 |
| 2 | #about | 关于我们 | 公司简介、里程碑数据 |
| 3 | #products | 产品中心 | 5个品类Tab：木工/食品/塑胶/服装/工业 |
| 4 | #quality | 品控与服务 | ISO认证、热处理、涂层、检测 |
| 5 | #locations | 全球布局 | 6大生产基地卡片 |
| 6 | #contact | 联系我们 | 联系信息 + Formspree表单 |
| 7 | Footer | 页脚 | 链接、版权信息 |

## 产品分类
| data-category | 中文 | 图片 |
|---------------|------|------|
| woodworking | 木工业用刀 | product_01.png |
| food | 食品业用刀 | product_04.png |
| plastic | 塑胶业用刀 | product_05.png |
| apparel | 服装业用刀 | product_02.png |
| industrial | 工业用刀（纸品/手动工具/文具/其他） | product_06/07/03.png, page24_Image543.png |

## 已验证的能力（2026-04-29）
- ✅ 读取所有项目文件
- ✅ 修改文字内容（中英文）
- ✅ 修改图片引用路径
- ✅ 添加/删除 HTML 功能块
- ✅ 修改 CSS 样式（内联在 index.html）
- ✅ 修改 JS 脚本（内联在 index.html）
- ✅ Git commit + push 自动部署
- ✅ 创建新文件

## 注意事项
- ⚠️ 公司名是「伟群」不是「威群」！
- 所有文本必须写中英文两份（data-lang="zh" 和 data-lang="en"）
- 图片注意压缩，images/ 已有 29MB/393 张
- Formspree 免费版每月 50 次提交限制
- 完整维护手册参见：WEBSITE_CONTEXT.md
- 新同事也可能来下达修改指令，需正常响应

## 关键文件
- `index.html` — 网站唯一页面（所有 HTML/CSS/JS）
- `images/` — 所有网站图片（393 张）
- `CNAME` — 自定义域名配置
- `WEBSITE_CONTEXT.md` — 完整维护手册（必读！每次新对话先读这个）
- `agent.md` — Agent 职责配置
- `topics/teamstarmfg-website.md` — 本话题文件（维护日志）
- `company_presentation.pptx` — 公司原始PPT（参考资料）

## 维护日志
- 2026-04-29 14:28: 读取 WEBSITE_CONTEXT.md，完整了解网站信息
- 2026-04-29 14:43: 获得文件写入权限
- 2026-04-29 14:44: 创建 agent.md 和本话题文件
- 2026-04-29 14:48: 全面验证能力（读/写/改/Git/部署）全部通过
- 2026-04-29 14:49: 更新 copyright 2025→2026，首次成功 git push 部署
- 2026-04-29 14:54: 更新话题文件，记录完整维护信息
