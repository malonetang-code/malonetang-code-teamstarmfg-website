import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const reviewRoot = path.resolve(
  process.env.APPROVED_REVIEW_DIR ||
    path.join(projectRoot, "..", "teamstar-website-review-redesign"),
);
const outputRoot = path.resolve(
  process.env.APPROVED_OUT || path.join(projectRoot, "dist-approved"),
);
const approvedReviewCommit =
  "2a3705438a6a0309f32a4ea512c2a19889ab0ca2";
const releaseVersion = "20260731-3a";
const reviewBase = "/teamstar-website-review";

function git(args) {
  return execFileSync("git", ["-C", reviewRoot, ...args], {
    encoding: "utf8",
  }).trim();
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

assert(fs.existsSync(path.join(reviewRoot, ".git")), "Approved review repository is missing");
assert(
  git(["rev-parse", "HEAD"]) === approvedReviewCommit,
  `Review checkout must be at approved commit ${approvedReviewCommit}`,
);
assert(git(["status", "--porcelain"]) === "", "Approved review checkout is not clean");

const releaseEntries = [
  "404.html",
  "assets",
  "capabilities",
  "company",
  "customers",
  "en",
  "home",
  "images",
  "img",
  "index.html",
  "privacy",
  "products",
  "quality",
  "rfq",
  "sitemap.xml",
];

fs.rmSync(outputRoot, { recursive: true, force: true });
fs.mkdirSync(outputRoot, { recursive: true });
for (const entry of releaseEntries) {
  const source = path.join(reviewRoot, entry);
  assert(fs.existsSync(source), `Approved review entry is missing: ${entry}`);
  fs.cpSync(source, path.join(outputRoot, entry), { recursive: true });
}

fs.copyFileSync(
  path.join(outputRoot, "home", "index.html"),
  path.join(outputRoot, "index.html"),
);
fs.copyFileSync(
  path.join(outputRoot, "en", "home", "index.html"),
  path.join(outputRoot, "en", "index.html"),
);
fs.rmSync(path.join(outputRoot, "home"), { recursive: true, force: true });
fs.rmSync(path.join(outputRoot, "en", "home"), {
  recursive: true,
  force: true,
});

const textExtensions = new Set([
  ".css",
  ".html",
  ".js",
  ".json",
  ".svg",
  ".webmanifest",
  ".xml",
]);

for (const file of walk(outputRoot)) {
  if (!textExtensions.has(path.extname(file))) continue;
  let content = fs.readFileSync(file, "utf8");
  content = content
    .replaceAll(reviewBase, "")
    .replaceAll("/en/home/", "/en/")
    .replaceAll("/home/", "/")
    .replaceAll("noindex,nofollow,noarchive", "index, follow")
    .replace(/\?v=[A-Za-z0-9._-]+/g, `?v=${releaseVersion}`);
  if (file.endsWith(".html")) {
    content = content.replace(
      /<\/head>/i,
      `<meta name="teamstar-release" content="${releaseVersion}"></head>`,
    );
  }
  fs.writeFileSync(file, content);
}

fs.writeFileSync(
  path.join(outputRoot, "robots.txt"),
  [
    "User-agent: *",
    "Allow: /",
    "Sitemap: https://www.teamstarmfg.com/sitemap.xml",
    "",
  ].join("\n"),
);

const htmlFiles = walk(outputRoot).filter((file) => file.endsWith(".html"));
assert(htmlFiles.length === 48, `Expected 48 production HTML files, found ${htmlFiles.length}`);

const allText = walk(outputRoot)
  .filter((file) => textExtensions.has(path.extname(file)) || file.endsWith("robots.txt"))
  .map((file) => fs.readFileSync(file, "utf8"))
  .join("\n");

for (const forbidden of [
  reviewBase,
  "noindex,nofollow,noarchive",
  "Disallow: /",
  'href="/home/"',
  'href="/en/home/"',
  'action="/teamstar-website-review/api/rfq"',
]) {
  assert(!allText.includes(forbidden), `Review-only production content remains: ${forbidden}`);
}

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  assert(
    html.includes('<meta name="robots" content="index, follow">'),
    `${path.relative(outputRoot, file)} does not allow production indexing`,
  );
  assert(
    html.includes(`<meta name="teamstar-release" content="${releaseVersion}">`),
    `${path.relative(outputRoot, file)} is missing the release marker`,
  );
}

const zhHome = fs.readFileSync(path.join(outputRoot, "index.html"), "utf8");
const enHome = fs.readFileSync(path.join(outputRoot, "en", "index.html"), "utf8");
assert(zhHome.includes("<h1>因需而制，以准致信。</h1>"), "Chinese final Home slogan is missing");
assert(
  enHome.includes("<h1>Engineered for Your Needs. Trusted for Precision.</h1>"),
  "English final Home slogan is missing",
);
assert(
  zhHome.includes(
    "<strong>TEAMSTAR MANUFACTURING</strong> <p>因需而制，以准致信。</p>",
  ),
  "Chinese final footer slogan is missing",
);
assert(
  enHome.includes(
    "<strong>TEAMSTAR MANUFACTURING</strong> <p>Engineered for Your Needs. Trusted for Precision.</p>",
  ),
  "English final footer slogan is missing",
);
assert(zhHome.includes("data-home-video"), "Chinese production Home video is missing");
assert(enHome.includes("data-home-video"), "English production Home video is missing");

for (const locale of ["rfq/index.html", "en/rfq/index.html"]) {
  const html = fs.readFileSync(path.join(outputRoot, locale), "utf8");
  assert(html.includes('action="/api/rfq"'), `${locale} does not use the production RFQ endpoint`);
}

const sitemap = fs.readFileSync(path.join(outputRoot, "sitemap.xml"), "utf8");
assert(
  (sitemap.match(/<loc>/g) || []).length === 46,
  "Production sitemap must contain 46 canonical public routes",
);

console.log(
  JSON.stringify(
    {
      approvedReviewCommit,
      releaseVersion,
      outputRoot,
      htmlFiles: htmlFiles.length,
      sitemapRoutes: 46,
    },
    null,
    2,
  ),
);
