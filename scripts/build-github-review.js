const fs = require("fs");
const os = require("os");
const path = require("path");

const projectRoot = path.resolve(__dirname, "..");
const sourceDir = path.join(projectRoot, "dist");
const outputDir = process.env.REVIEW_OUT || path.join(os.tmpdir(), "teamstar-website-review");
const repository = process.env.REVIEW_REPO || "teamstar-website-review";
const basePath = `/${repository}`;

if (!fs.existsSync(path.join(sourceDir, "index.html"))) {
  throw new Error("dist/index.html is missing; run npm run build first");
}

fs.rmSync(outputDir, { recursive: true, force: true });
fs.cpSync(sourceDir, outputDir, { recursive: true });

function walkFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walkFiles(entryPath) : [entryPath];
  });
}

function prefixRootPath(value) {
  return value.replace(/(^|,\s*)\/(?!\/)/g, `$1${basePath}/`);
}

function rewriteHtml(html) {
  const withAttributes = html
    .replace(/(\b(?:href|src|action)=["'])\/(?!\/)/gi, `$1${basePath}/`)
    .replace(/(\bsrcset=["'])([^"']*)(["'])/gi, (_, start, value, end) => `${start}${prefixRootPath(value)}${end}`);

  const robotsMeta = '<meta name="robots" content="noindex,nofollow,noarchive">';
  if (/<meta\b[^>]*\bname=["']robots["'][^>]*>/i.test(withAttributes)) {
    return withAttributes.replace(/<meta\b[^>]*\bname=["']robots["'][^>]*>/gi, robotsMeta);
  }
  return withAttributes.replace(/<\/head>/i, `${robotsMeta}</head>`);
}

function rewriteManifest(filePath) {
  const manifest = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const rewriteValue = (value) => {
    if (Array.isArray(value)) return value.map(rewriteValue);
    if (value && typeof value === "object") {
      return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, rewriteValue(child)]));
    }
    if (typeof value === "string" && value.startsWith("/") && !value.startsWith("//")) {
      return `${basePath}${value}`;
    }
    return value;
  };
  fs.writeFileSync(filePath, `${JSON.stringify(rewriteValue(manifest), null, 2)}\n`);
}

for (const filePath of walkFiles(outputDir)) {
  if (filePath.endsWith(".html")) {
    fs.writeFileSync(filePath, rewriteHtml(fs.readFileSync(filePath, "utf8")));
  } else if (filePath.endsWith(".css")) {
    const css = fs.readFileSync(filePath, "utf8").replace(/url\((['"]?)\/(?!\/)/g, `url($1${basePath}/`);
    fs.writeFileSync(filePath, css);
  } else if (filePath.endsWith("site.webmanifest")) {
    rewriteManifest(filePath);
  }
}

fs.writeFileSync(path.join(outputDir, ".nojekyll"), "");
fs.writeFileSync(path.join(outputDir, "robots.txt"), "User-agent: *\nDisallow: /\n");
fs.rmSync(path.join(outputDir, "CNAME"), { force: true });

const reviewMetadata = [
  "Teamstar website review mirror",
  `Version: 20260721-2e`,
  `Base path: ${basePath}/`,
  "Production form submission: disabled in this static review mirror",
  ""
].join("\n");
fs.writeFileSync(path.join(outputDir, "REVIEW_BUILD.txt"), reviewMetadata);

console.log(outputDir);
