# Teamstar Manufacturing 网站维护话题

## 2026-07-22 阶段 2H 厂区与制造现场实景上线
- 已逐张审查桌面 `群新/厂区及车间.rar` 的 23 张实拍，采用 5 张：漳州厂区入口、办公及生产楼侧景、生产车间、数控加工设备区和检测室；宿舍楼、杂乱侧门、重复角度、人物及纸张信息较多的画面未上线。
- 保留现有光线与构图更好的真实主楼 Hero；新图仅用于展示画面可直接确认的建筑与制造环境，不添加未经确认的设备、精度、产能或工艺参数。
- 原始压缩包已归档至 `assets/incoming_factory_photos_2026-07-22/raw/厂区及车间.rar`，SHA-256 为 `f3ce87c98c58442f815a921487e161837ca11a979e11c7c69cc394b949f8c4de`；网页图已清除 EXIF 并完成响应式处理。
- 版本 `20260722-2h`、正式源码提交 `550e9b2` 已推送至 `origin/main`；GitHub Pages 评审镜像提交 `f5ea3db` 通过 12/12 浏览器检查。
- 发布号 `20260722122838` 已完成生产备份、1,235 项哈希回读、46 个公网页面两轮 92/92、12 组生产浏览器和 11 个旧图 404；RFQ 后端未变更，数据库仍为 5 条已发送、0 条排队或重试。

## 2026-07-22 阶段 2G 产品实拍图库上线
- 已按用户提供的五个原文件夹接入 86 张专业产品实拍：包装类 22、工业机械用刀 19、木工机械刀片 9、缝纫类刀片 14、食品刀片 22，不跨目录调整归类。
- 产品目录新增五个双语图册入口，图片仅执行方向校正、网页尺寸、轻度锐化与元数据清理；旧 `product_01–07`、`product_parts`、`products_overview` 等不合格产品图已退出正式源码。
- 版本 `20260722-2g`、正式源码提交 `6b080c0` 已推送至 `origin/main`；发布号 `20260722120304` 已完成生产备份、1,178 项哈希回读、46 个公网页面两轮 92/92 和 16 组生产浏览器检查。
- 11 个淘汰旧图地址均返回 404，RFQ 后端未变更，数据库仍为 5 条已发送、0 条排队或重试。

## 2026-07-22 阶段 2F 质量证据与检测能力上线
- 已逐项核对 `品保设备.docx` 的图文顺序，纠正 SPECTROLAB 图片错配；原使用图片实际对应 EX-3000 荧光 X 线膜厚计。
- 质量页与检测能力页已接入 10 类真实设备，并按材料成分、硬度与金相、尺寸与几何、表面与膜厚四类受控特性组织，不添加未经确认的精度、量程或检验承诺。
- 版本 `20260721-2f` 已通过构建、标题标点、链接、RFQ、质量映射及 390 / 768 / 1440px 中英文浏览器检查。
- GitHub Pages 评审镜像提交 `fa75ea7` 已发布；36/36 路由、4 个公网浏览器页面、`noindex` 隔离和关键文件哈希均通过。
- 正式源码提交 `57fd069` 已推送至 `origin/main`；发布号 `20260722110904` 已上线，361 项生产哈希、36 个公网页面两轮 72/72、8 组生产浏览器及 12 国海外探针两轮 48/48 均通过。RFQ 后端未变更，数据库仍为 5 条已发送、0 条排队或重试。

## 2026-07-21 阶段 2E 首页与产品发现路径上线
- 首页 Hero 已收紧为定制刀具技术评估定位，明确可从图纸、实物样品或设备工况开始；报价继续由工程团队人工确认。
- 手机首屏新增三种资料入口，首页和产品目录 CTA 统一为查找应用产品或提交现有资料。
- 六类共用产品卡改为典型设备与适用材料，目录增加“暂不确定产品分类”时的工况询价入口。
- 版本 `20260721-2e` 已通过构建、标题标点、链接、RFQ 回归及 320 / 390 / 768 / 1024 / 1440px 中英文浏览器检查；正式源码提交 `cf27ff8` 已推送至 `origin/main`。
- 独立评审镜像已发布至 `https://malonetang-code.github.io/teamstar-website-review/`，镜像提交 `711dc72`；36/36 公网页面、关键文件哈希和 390 / 1440px 公网浏览器通过，镜像已设为 `noindex` 且不连接生产表单接口。
- 发布号 `20260721103817` 已上线；313 项生产哈希、36 个公网页面两轮 72/72、生产浏览器、RFQ 工况预选及 12 国海外探针冷/热两轮 48/48 均通过。RFQ 后端未变更，数据库仍为 5 条已发送、0 条排队或重试。

## 2026-07-21 阶段 2C 产品决策支持上线
- 六类产品的中英文详情页新增适用材料、四项分类化技术评估要素，以及按图、按样、按工况三个直达询价入口。
- 三个入口可自动带入当前产品类别、资料路径及对应填写提示；附件继续保持选填，报价继续由工程与报价人员人工评估。
- 版本 `20260720-2d` 已通过 12/12 产品页、标题标点、构建、链接、RFQ 回归和 320 / 768 / 1440px 浏览器检查。
- 发布号 `20260721004827` 已上线；生产备份、313 项哈希、36/36 CDN 页面、中英文浏览器、RFQ 预选和海外热缓存 48/48 探针均通过，后续结合实际浏览反馈继续调整。

## 2026-07-20 阶段 2B 技术询价内容增强
- Malone 已确认阶段 2A 带附件收件链路按验收通过处理；新增中英文询价资料指南，覆盖按图、按样、工况三类入口、图纸与照片清单、附件限制及人工评估流程。
- 产品详情页、RFQ 页、页脚和 sitemap 已接入指南；本地版本 `20260720-2c` 通过构建、内容、链接、RFQ 回归与 320 / 390 / 768 / 1440px 视觉检查。
- 版本 `20260720-2c` 已作为发布号 `20260720230059` 部署；生产备份、313 项文件清单、36/36 公网页面、CDN 刷新预热、中英文浏览器与 RFQ 队列检查均通过。

## 2026-07-17 全站文案规范化上线
- 参考 DIENES、TKM、Baucor、York Saw & Knife、Fernite、LUTZ BLADES 与 Winterhoff Picard 等工业刀具企业官网，重写首页、产品、制造能力、质量体系、公司概况、合作参考与技术询价页面的中英文文案。
- 全站统一使用“工业机械刀具、按图制造、按样复刻、工况评估、技术要求确认、工艺路线制定、样品验证、批量制造与检验”等正式术语，移除“把……”“从你……开始”“先发送今天已有的资料”“客户背书”等口语或内部汇报式表达。
- 页面标题及 H1-H6 全部禁止句末标点，并新增 `npm run check:content` 自动检查；文案规范见 `../content_plan/website-copy-style-guide.md`。
- 32 个中英文页面已部署至阿里云生产站，全部 HTTPS 200；桌面、平板、390px 与 320px 布局、本地 966 个链接/资源引用、线上浏览器和 Logo 原色均通过验证，发布证据见 `../../deploy_packages/releases/20260717193146/DEPLOYMENT.md`。

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
| 3 | #products | 产品中心 | 新产品实拍按原文件夹五类展示，技术询价入口另行保留 |
| 4 | #quality | 品控与服务 | ISO认证、热处理、涂层、检测 |
| 5 | #locations | 全球布局 | 6大生产基地卡片 |
| 6 | #contact | 联系我们 | 联系信息 + Formspree表单 |
| 7 | Footer | 页脚 | 链接、版权信息 |

## 产品分类
| 原文件夹分类 | 中文 | 新照片数 |
|---------------|------|---------:|
| packaging-blades | 包装类刀片 | 22 |
| industrial-machine-knives | 工业机械用刀 | 19 |
| woodworking-machine-blades | 木工机械刀片 | 9 |
| sewing-blades | 缝纫类刀片 | 14 |
| food-blades | 食品刀片 | 22 |

旧 `product_01–07`、`product_parts`、`products_overview` 等产品图片已于 2026-07-22 退出网站与正式源码，不再作为回退图使用。

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
