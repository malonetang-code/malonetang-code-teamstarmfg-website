# Teamstar Manufacturing 网站维护手册

> 本文件是给网站维护 bot 的完整上下文。读完此文件后，你应该可以独立维护 www.teamstarmfg.com 网站。

---

## 1. 公司信息

- **中文名：** 群新工业（隶属伟群制刀工业集团，英文 Wei Qun Cutting Tools Group）
  - ⚠️ 是「**伟群**」不是「威群」！千万别写错
- **英文品牌名：** Teamstar Manufacturing
- **行业：** 工业刀具制造（木工、食品、塑胶、服装、纸品、工业等）
- **历史：** 台北群新工业 40+ 年，1990 年深圳设厂，中国 30+ 年经验
- **认证：** ISO9001:2015
- **联系方式：**
  - 邮箱：info@teamstarmfg.com（对外）/ tang@teamstarmfg.com（联系表单接收）
  - 手机/电话：+86 181-5070-7007
  - 地址：福建省漳州市长泰区古农农场顺兴路6号
- **六大生产基地：** 台北伟群、深圳伟群、漳州群新、昆山伟群、越南据点、长泰新厂
- **台北伟群网站：** https://www.greatknives.tw/

---

## 2. 技术架构

### 托管 & 部署
- **生产托管：** 阿里云杭州轻量应用服务器（公网 IP `116.62.121.239`）
- **生产 Web 服务：** Nginx，静态目录 `/www/wwwroot/wordpress`
- **GitHub 仓库：** https://github.com/malonetang-code/teamstarmfg-website.git
- **GitHub 账号：** malonetang-code
- **分支：** `main`（唯一分支）
- **生产域名：** `teamstarmfg.com` 与 `www.teamstarmfg.com`，A 记录均指向 `116.62.121.239`
- **代码仓库职责：** GitHub 保留源码与版本历史；push 到 `main` 不等于正式站发布
- **历史兼容文件：** `CNAME` 与 `.github/workflows/pages.yml` 属于旧 GitHub Pages 流程，不作为当前生产部署依据
- **SSH 密钥：** 上级项目目录 `deploy_packages/ssh/teamstar_aliyun_ed25519`，不得外传
- **架构演进方案：** `../content_plan/website_architecture_evolution_2026-07-17.md`

### 部署流程（重要！）
```bash
# 1. 本地修改、预览并完成桌面/移动端验证
cd /Users/malone/Documents/Codex/2026-05-26/codex-codex/qunxin-company/01_projects/02_official_website_ops/teamstarmfg
npm install
npm run build
npm run serve

# 2. 用户确认视觉与内容后，先备份阿里云现网，再上传通过验证的静态产物
# 3. 回读远端文件并检查 HTTPS、关键页面、表单、备案号和回滚备份
```

正式部署必须遵守“现网取证 -> 备份 -> 上传 -> 校验 -> 线上验证 -> 回滚验证”。不要仅通过 `git push` 宣称已经部署。

### 技术栈
- **静态生成器：** Eleventy 3，源码目录 `src/`，部署产物 `dist/`
- **模板：** Nunjucks 共享布局、局部组件和 `_data` 数据文件
- **CSS / JS：** `src/assets/css/site.css` 与 `src/assets/js/site.js`
- **字体：** Google Fonts — IBM Plex Sans + Noto Sans SC
- **联系表单：** Formspree（ID: `mbdqlnar`），表单提交发到 tang@teamstarmfg.com
- **双语支持：** 中文使用根路径，英文使用 `/en/`；页面包含 canonical 与双向 `hreflang`
- **生产方式：** 阿里云 Nginx 只托管经过验证的 `dist/` 静态产物

---

## 3. 项目文件结构

```
/Users/malone/Documents/Codex/2026-05-26/codex-codex/qunxin-company/01_projects/02_official_website_ops/teamstarmfg/
├── .git/                    # Git 仓库
├── .github/
│   └── workflows/           # 历史 GitHub Pages 配置，不是当前生产发布路径
├── CNAME                    # 历史自定义域名文件，生产 DNS 由阿里云管理
├── WEBSITE_CONTEXT.md       # 本文件（维护手册）
├── eleventy.config.js       # Eleventy 构建与静态资源规则
├── package.json             # 构建依赖和命令
├── src/                     # ⭐ 页面、模板、数据、CSS 和 JS 源码
├── dist/                    # ⭐ 构建产物，仅由 Eleventy 生成
├── index.html               # 迁移前单页基线，仅供历史对照
├── images/                  # ⭐ 产品、工厂、证书、客户和检测设备素材
│   ├── *.jpg                # 实拍照片（工厂、设备、公司招牌等）
│   ├── page*_Image*.png     # 从 PPT 提取的产品图片
│   └── ...
├── pptx_extracted/          # PPT 解压原始文件（参考，不部署用）
├── pptx_images/             # PPT 提取的图片原件（参考）
└── topics/                  # 话题文件夹
    └── BiteLog.md           # AiLog 项目话题（与网站无关）
```

---

## 4. 当前网站结构

网站已演进为双语静态多页面。首页负责定位与分流，产品、能力、质量、公司、客户和 RFQ 各自拥有独立路由：

| # | Section ID | 中文标题 | 说明 |
|---|-----------|---------|------|
| 1 | `/` 与 `/en/` | 首页 | 定制刀具定位、事实数据、产品目录和主要路径 |
| 2 | `/products/` | 产品目录 | 六类应用入口及六个详情页 |
| 3 | `/capabilities/` | 制造能力 | 热处理、精密研磨、检测实验室及详情页 |
| 4 | `/quality/` | 质量体系 | 四阶段质量路径、证书与检测设备 |
| 5 | `/company/` | 公司与基地 | 集团历史、漳州基地和工厂实景 |
| 6 | `/customers/` | 客户背书 | Logo 墙和证据边界说明 |
| 7 | `/rfq/` | 询盘入口 | RFQ 资料清单、邮件附件说明和 Formspree 表单 |

### 导航栏
- 固定顶部，毛玻璃效果
- 包含：Logo + 5 个锚点链接 + 中/EN 语言切换 + 移动端汉堡菜单

每个中文页面均有 `/en/` 对应页。完整路由和后续阶段见 `../content_plan/website_architecture_evolution_2026-07-17.md`。

---

## 5. 设计规范

### 颜色
```css
--ink: #10181d;            /* 全站目录骨架 */
--accent: #e64a2e;         /* 询价与关键动作 */
--factory: #0b2432;        /* 工厂叙事 */
--factory-accent: #d7b066; /* 工厂事实强调 */
--system: #173f31;         /* 能力与质量系统 */
--system-soft: #e8eeea;    /* 工程系统浅底 */
```

### 字体
- 英文：Inter（300-700）
- 中文：Noto Sans SC（300-700）

### 设计风格
- 2026-07-17 已确认 A+B+C 组合：Precision Catalog 为全站骨架，Modern Factory 用于公司与工厂，Engineering System 用于能力与质量。
- 工业 B2B、技术可信、真实素材、清晰网格、克制动效、桌面/平板/手机响应式。
- 以边界、编号、表格感和真实照片构建层次，不使用装饰性圆角卡片和虚构数据。

---

## 6. 常见维护操作

### 添加/替换产品图片
1. 将新图片放入 `images/` 文件夹
2. 建议格式：PNG 或 JPG，宽度 800px 以上，比例 4:3 或 3:4
3. 在 `src/_data/catalog.js` 更新产品图片路径
4. 注意加 `loading="lazy"` 属性
5. 运行 `npm run build` 并本地验证；正式部署需另走阿里云备份与上传流程

### 添加新产品卡片
1. 在 `src/_data/catalog.js` 添加中英文名称、摘要、证据边界和图片。
2. 分别在 `src/products/` 与 `src/en/products/` 添加对应详情入口。
3. 首页和目录页会通过共享 `product-card.njk` 渲染卡片。

### 修改联系信息
- 搜索对应文字直接改即可
- 如需修改表单接收邮箱，需登录 Formspree 后台改

### 添加新板块
1. 优先在 `src/_includes/layouts/` 或 `src/_includes/partials/` 扩展共享模板。
2. 遵循现有目录、工厂或工程系统视觉语法。
3. 如需新路由，分别添加中文与 `/en/` 页面，并更新共享导航和 sitemap 数据。
4. 构建后验证 canonical、`hreflang`、链接、移动端和断图。

### 添加双语内容（重要！）
所有对外页面都必须有中英文两份。共享模板通过 `lang` 分支渲染文案；独立路由分别位于 `src/` 和 `src/en/`，不要在一个 URL 内用 CSS 隐藏另一种语言。

---

## 7. Git 提交历史（参考）

```
c127666 Remove AiLog pages from company site
c74b796 Add AiLog privacy policy and support page
9ac4d04 Remove file upload from contact form (free Formspree plan)
043a76d Connect contact form to Formspree (tang@teamstarmfg.com)
76970cc Add link to Taipei Wei Qun website (greatknives.tw)
afe3246 Replace country flags with numbered badges for production bases
5640507 Add custom domain CNAME
699fe8f feat: 按应用场景分类改版产品导航（家具/食品/塑料/服装/工业）
b792a56 perf: 优化图片懒加载、清理内联样式、增强SEO
fca5017 更新塑胶业用刀系列产品图片
7532d0e 更新公司名称：伟群制刀工业 → 群新工业
791c65e 更新食品业用刀系列产品图片
8710339 v2.3 - add Quality & Service section
2bfd42f v2.2 - update products with PPT content and product photos
920eedf v2.0 - complete redesign with premium aesthetic
c3d3bad Initial website - bilingual (zh/en)
```

---

## 8. SEO 配置（已完成）

- Open Graph 标签 ✅
- Twitter Card 标签 ✅
- JSON-LD 结构化数据（Organization） ✅
- `<meta name="robots" content="index, follow">` ✅
- `<link rel="canonical">` ✅
- 图片 lazy loading ✅

---

## 9. 注意事项

1. **公司名写法：** 中文是「伟群」（Wei Qun），不是「威群」
2. **母公司 vs 子公司：** 台北是群新工业股份有限公司（母公司），大陆工厂统称伟群
3. **图片体积：** `images/` 中历史素材较多，新图必须筛选、压缩并记录来源
4. **架构状态：** 单文件是过渡基线，已批准向静态多页面架构演进；视觉确认前不部署
5. **Formspree 免费版限制：** 不支持文件上传（已移除），每月 50 次提交
6. **部署边界：** 已批准最终部署，但必须在视觉确认和本地验收之后执行
7. **PPT 资料：** `company_presentation.pptx` 是原始公司介绍 PPT，里面有很多产品图和公司信息可供参考
8. **topics/ 文件夹下的 BiteLog.md 与本网站无关**，是另一个项目的话题文件，不要修改

---

## 10. 快速参考

| 项目 | 值 |
|------|-----|
| 网站地址 | https://www.teamstarmfg.com |
| GitHub 仓库 | https://github.com/malonetang-code/teamstarmfg-website.git |
| 本地路径 | `/Users/malone/Documents/Codex/2026-05-26/codex-codex/qunxin-company/01_projects/02_official_website_ops/teamstarmfg/` |
| 生产托管 | 阿里云杭州轻量应用服务器，`116.62.121.239` |
| 部署方式 | 本地验证 → 服务器备份 → 上传静态产物 → 校验与回读 |
| 生产目录 | `/www/wwwroot/wordpress` |
| 域名配置 | 阿里云 DNS，根域与 `www` 均指向生产 IP |
| 表单服务 | Formspree ID: mbdqlnar → tang@teamstarmfg.com |
| 台北伟群 | https://www.greatknives.tw/ |
| 联系邮箱 | info@teamstarmfg.com |
| 联系电话 | +86 181-5070-7007 |
