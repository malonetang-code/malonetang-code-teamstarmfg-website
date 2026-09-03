import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const reviewRoot = path.resolve(process.env.APPROVED_REVIEW_DIR || path.join(projectRoot, "..", "teamstar-website-review-redesign"));
const outputRoot = path.resolve(process.env.APPROVED_OUT || path.join(projectRoot, "dist-approved"));
const approvedReviewCommit = "b5d0930750fd6bfc46a8915fa0cccbaecd729fa2";
const releaseVersion = process.env.TEAMSTAR_RELEASE_MARKER || "20260903-2";

function git(args) {
  return execFileSync("git", ["-C", reviewRoot, ...args], { encoding: "utf8" }).trim();
}
function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(target) : [target];
  });
}
function assert(condition, message) {
  if (!condition) throw new Error(message);
}
function copy(entry) {
  const source = path.join(reviewRoot, entry);
  assert(fs.existsSync(source), `Approved review entry is missing: ${entry}`);
  fs.cpSync(source, path.join(outputRoot, entry), { recursive: true });
}

assert(fs.existsSync(path.join(reviewRoot, ".git")), "Approved review repository is missing");
assert(git(["rev-parse", "HEAD"]) === approvedReviewCommit, `Review checkout must be at approved commit ${approvedReviewCommit}`);
assert(git(["status", "--porcelain", "--untracked-files=no"]) === "", "Approved review tracked files are not clean");

fs.rmSync(outputRoot, { recursive: true, force: true });
fs.mkdirSync(outputRoot, { recursive: true });
for (const entry of ["404.html", "assets", "capabilities", "company", "customers", "en", "guides", "images", "img", "privacy", "products", "quality", "rfq", "sitemap.xml"]) copy(entry);

fs.copyFileSync(path.join(reviewRoot, "full-style-preview", "1", "index.html"), path.join(outputRoot, "index.html"));
fs.copyFileSync(path.join(reviewRoot, "full-style-preview", "1", "en", "index.html"), path.join(outputRoot, "en", "index.html"));
fs.rmSync(path.join(outputRoot, "en", "home"), { recursive: true, force: true });
fs.rmSync(path.join(outputRoot, "en", "why-qunxin-preview"), { recursive: true, force: true });
fs.rmSync(path.join(outputRoot, "en", "why-qunxin-refined"), { recursive: true, force: true });

const cssRoot = path.join(outputRoot, "assets", "css");
const jsRoot = path.join(outputRoot, "assets", "js");
fs.copyFileSync(path.join(reviewRoot, "full-style-preview", "site-theme-preview.css"), path.join(cssRoot, "concept-1-theme.css"));
fs.copyFileSync(path.join(reviewRoot, "full-style-preview", "full-style-preview.css"), path.join(cssRoot, "concept-1-home.css"));
fs.copyFileSync(path.join(reviewRoot, "full-style-preview", "concept-1-motion.css"), path.join(cssRoot, "concept-1-motion.css"));
fs.copyFileSync(path.join(projectRoot, "src", "assets", "js", "concept-1-runtime.js"), path.join(jsRoot, "concept-1-runtime.js"));
fs.copyFileSync(path.join(reviewRoot, "full-style-preview", "concept-1-motion.js"), path.join(jsRoot, "concept-1-motion.js"));

const heroTarget = path.join(outputRoot, "images", "web", "process-20260901", "home-manufacturing-closeup.mp4");
fs.mkdirSync(path.dirname(heroTarget), { recursive: true });
fs.copyFileSync(path.join(reviewRoot, "full-style-preview", "media", "home-manufacturing-closeup-preview-20260828.mp4"), heroTarget);

const textExtensions = new Set([".css", ".html", ".js", ".json", ".svg", ".webmanifest", ".xml"]);
for (const file of walk(outputRoot)) {
  if (!textExtensions.has(path.extname(file))) continue;
  let content = fs.readFileSync(file, "utf8");
  content = content
    .replaceAll("/teamstar-review/full-style-preview/1/en/", "/en/")
    .replaceAll("/teamstar-review/full-style-preview/1/", "/")
    .replaceAll("/teamstar-website-review/", "/")
    .replaceAll("/teamstar-review/", "/")
    .replaceAll("/en/home/", "/en/")
    .replaceAll("/home/", "/")
    .replaceAll("/full-style-preview/site-theme-preview.css", "/assets/css/concept-1-theme.css")
    .replaceAll("/full-style-preview/full-style-preview.css", "/assets/css/concept-1-home.css")
    .replaceAll("/full-style-preview/concept-1-motion.css", "/assets/css/concept-1-motion.css")
    .replaceAll("/full-style-preview/site-theme-preview.js", "/assets/js/concept-1-runtime.js")
    .replaceAll("/full-style-preview/concept-1-motion.js", "/assets/js/concept-1-motion.js")
    .replaceAll("/full-style-preview/media/home-manufacturing-closeup-preview-20260828.mp4", "/images/web/process-20260901/home-manufacturing-closeup.mp4")
    .replaceAll("noindex,nofollow,noarchive", "index, follow")
    .replace(/\?v=[A-Za-z0-9._-]+/g, `?v=${releaseVersion}`);

  if (file.endsWith(".html")) {
    content = content
      .replace(/<meta name="teamstar-review-baseline"[^>]*>\s*/g, "")
      .replace(/<script>\(function\(\)\{var s=new URLSearchParams\(location\.search\)\.get\("style"\);if\(\/\^\[a-e\]\$\/\.test\(s\|\|""\)\)document\.documentElement\.dataset\.siteThemePreview=s;\}\(\)\);<\/script>/g, "")
      .replace("1号方案 · 克制极简｜", "")
      .replace("Concept 1 · Restrained Minimal｜", "")
      .replace(/<\/head>/i, `<meta name="teamstar-release" content="${releaseVersion}"></head>`);
  }
  fs.writeFileSync(file, content);
}

for (const stylesheet of ["concept-1-theme.css", "concept-1-home.css", "concept-1-motion.css"]) {
  const stylesheetPath = path.join(cssRoot, stylesheet);
  fs.writeFileSync(stylesheetPath, fs.readFileSync(stylesheetPath, "utf8").replace(/^@import url\([^\n]+\);\s*/m, ""));
}

let sitemap = fs.readFileSync(path.join(outputRoot, "sitemap.xml"), "utf8");
const guideRoutes = ["/guides/", "/en/guides/", "/guides/custom-machine-knife-from-drawing-or-sample/", "/en/guides/custom-machine-knife-from-drawing-or-sample/"];
for (const route of guideRoutes) {
  const loc = `https://www.teamstarmfg.com${route}`;
  if (!sitemap.includes(`<loc>${loc}</loc>`)) sitemap = sitemap.replace("</urlset>", `  <url><loc>${loc}</loc></url>\n</urlset>`);
}
fs.writeFileSync(path.join(outputRoot, "sitemap.xml"), sitemap);
fs.writeFileSync(path.join(outputRoot, "robots.txt"), "User-agent: *\nAllow: /\nSitemap: https://www.teamstarmfg.com/sitemap.xml\n");

const htmlFiles = walk(outputRoot).filter((file) => file.endsWith(".html"));
assert(htmlFiles.length === 52, `Expected 52 production HTML files, found ${htmlFiles.length}`);
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  const relative = path.relative(outputRoot, file);
  assert(html.includes('<meta name="robots" content="index, follow">'), `${relative}: production robots directive missing`);
  assert(html.includes(`<meta name="teamstar-release" content="${releaseVersion}">`), `${relative}: release marker missing`);
  assert(!html.includes("/teamstar-review/"), `${relative}: protected-review path remains`);
  assert(!html.includes("/teamstar-website-review/"), `${relative}: legacy-review path remains`);
  assert(!html.includes("URLSearchParams(location.search).get(\"style\")"), `${relative}: review style selector remains`);
}

const allText = walk(outputRoot).filter((file) => textExtensions.has(path.extname(file)) || file.endsWith("robots.txt")).map((file) => fs.readFileSync(file, "utf8")).join("\n");
for (const forbidden of ["noindex,nofollow,noarchive", "Disallow: /", "fonts.googleapis.com", "teamstar-review-baseline"]) {
  assert(!allText.includes(forbidden), `Review-only or external content remains: ${forbidden}`);
}
const zhHome = fs.readFileSync(path.join(outputRoot, "index.html"), "utf8");
const enHome = fs.readFileSync(path.join(outputRoot, "en", "index.html"), "utf8");
assert(zhHome.includes("为什么选择群新") && zhHome.includes("40+<small>年</small>"), "Approved Chinese Why Qunxin section is missing");
assert(enHome.includes("Why customers choose Qunxin") && enHome.includes("40+<small>YEARS</small>"), "Approved English Why Qunxin section is missing");
assert(zhHome.includes("六类产品") && !zhHome.includes("手工具与裁布设备"), "Approved six-category Chinese product section is missing");
assert(enHome.includes("Six product categories"), "Approved six-category English product section is missing");
assert(!zhHome.includes("找到适合您的刀具"), "Retired Chinese Home inquiry band remains");
assert(!enHome.includes("Find the right knife for your application"), "Retired English Home inquiry band remains");
assert(zhHome.includes('href="/products/"') && enHome.includes('href="/en/products/"'), "Production Home navigation is not canonical");
assert(!zhHome.includes("1号方案") && !enHome.includes("Concept 1"), "Review labels remain in production Home");
for (const locale of ["rfq/index.html", "en/rfq/index.html"]) {
  assert(fs.readFileSync(path.join(outputRoot, locale), "utf8").includes('action="/api/rfq"'), `${locale}: production RFQ endpoint missing`);
}
assert((sitemap.match(/<loc>/g) || []).length === 50, "Production sitemap must contain 50 canonical routes");

console.log(JSON.stringify({ approvedReviewCommit, releaseVersion, outputRoot, htmlFiles: htmlFiles.length, sitemapRoutes: 50 }, null, 2));
