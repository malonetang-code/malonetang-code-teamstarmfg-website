const fs = require("node:fs");
const path = require("node:path");

const outputRoot = path.resolve("dist");
const errors = [];

function listFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? listFiles(fullPath) : [fullPath];
  });
}

function localTarget(url) {
  if (!url || /^(?:https?:|mailto:|tel:|data:|#)/.test(url)) return null;
  const pathname = url.split("?")[0].split("#")[0];
  if (!pathname) return null;
  return path.join(outputRoot, decodeURIComponent(pathname.replace(/^\//, "")));
}

function targetExists(target) {
  if (fs.existsSync(target) && fs.statSync(target).isFile()) return true;
  if (fs.existsSync(target) && fs.statSync(target).isDirectory()) {
    return fs.existsSync(path.join(target, "index.html"));
  }
  return fs.existsSync(`${target}.html`) || fs.existsSync(path.join(target, "index.html"));
}

for (const htmlPath of listFiles(outputRoot).filter((filePath) => filePath.endsWith(".html"))) {
  const html = fs.readFileSync(htmlPath, "utf8");

  if (/fonts\.(?:googleapis|gstatic)\.com/.test(html)) {
    errors.push(`${htmlPath}: external Google Fonts request remains`);
  }
  if (/eleventy:/.test(html)) {
    errors.push(`${htmlPath}: Eleventy image attributes remain in output`);
  }

  const urls = [];
  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) urls.push(match[1]);
  for (const match of html.matchAll(/\bsrcset="([^"]+)"/g)) {
    for (const candidate of match[1].split(",")) urls.push(candidate.trim().split(/\s+/)[0]);
  }

  for (const url of urls) {
    const target = localTarget(url);
    if (target && !targetExists(target)) errors.push(`${htmlPath}: missing ${url}`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Build check passed: local links and assets resolve without external font requests");
