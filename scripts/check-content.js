const fs = require("node:fs");
const path = require("node:path");

const outputDir = path.join(__dirname, "..", "dist");
const trailingPunctuation = /[。．.!！?？;；:：、，,]$/;
const violations = [];

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      walk(entryPath);
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      checkFile(entryPath);
    }
  }
}

function plainText(value) {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function checkFile(filePath) {
  const html = fs.readFileSync(filePath, "utf8");
  const pattern = /<(title|h[1-6])\b[^>]*>([\s\S]*?)<\/\1>/gi;
  for (const match of html.matchAll(pattern)) {
    const text = plainText(match[2]);
    if (trailingPunctuation.test(text)) {
      violations.push(`${path.relative(outputDir, filePath)}: <${match[1]}> ${text}`);
    }
  }
}

if (!fs.existsSync(outputDir)) {
  console.error("Content check requires a completed build in dist");
  process.exit(1);
}

walk(outputDir);

if (violations.length > 0) {
  console.error("Heading or page-title punctuation is not allowed:");
  for (const violation of violations) console.error(`- ${violation}`);
  process.exit(1);
}

console.log("Content check passed: page titles and headings have no terminal punctuation");
