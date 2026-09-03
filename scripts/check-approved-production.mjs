import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "dist-approved");
const errors = [];
const files = (directory) => fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
  const target = path.join(directory, entry.name);
  return entry.isDirectory() ? files(target) : [target];
});
const exists = (url) => {
  const pathname = decodeURIComponent(url.split(/[?#]/)[0]).replace(/^\//, "");
  if (!pathname) return fs.existsSync(path.join(root, "index.html"));
  const target = path.join(root, pathname);
  return (fs.existsSync(target) && fs.statSync(target).isFile()) || fs.existsSync(path.join(target, "index.html")) || fs.existsSync(`${target}.html`);
};

for (const file of files(root).filter((target) => target.endsWith(".html"))) {
  const relative = path.relative(root, file);
  const html = fs.readFileSync(file, "utf8");
  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const url = match[1];
    if (!url || /^(?:https?:|mailto:|tel:|data:|#)/.test(url)) continue;
    if (!exists(url)) errors.push(`${relative}: missing ${url}`);
  }
  for (const match of html.matchAll(/\bsrcset="([^"]+)"/g)) {
    for (const candidate of match[1].split(",")) {
      const url = candidate.trim().split(/\s+/)[0];
      if (url && !exists(url)) errors.push(`${relative}: missing ${url}`);
    }
  }
  if (/full-style-preview\/(?:1|2|3|a|b|c|d|e)/.test(html)) errors.push(`${relative}: concept route remains`);
  if (/[?&](?:style|concept)=/.test(html)) errors.push(`${relative}: review query parameter remains`);
}

for (const asset of [
  "assets/css/concept-1-theme.css",
  "assets/css/concept-1-home.css",
  "assets/js/concept-1-runtime.js",
  "images/web/process-20260901/home-manufacturing-closeup.mp4",
  "images/web/process-20260725/06-surface-inspection-full.jpg",
]) {
  if (!fs.existsSync(path.join(root, asset))) errors.push(`release: missing ${asset}`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`Approved-production check passed: ${files(root).filter((file) => file.endsWith(".html")).length} HTML files and all local links/assets resolve.`);
