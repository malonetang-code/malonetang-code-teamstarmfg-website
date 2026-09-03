const fs = require("node:fs");
const path = require("node:path");

const outputDir = path.join(__dirname, "..", "dist");
const errors = [];
const guideSlugs = [
  "custom-machine-knife-from-drawing-or-sample",
  "textile-cutting-knife-selection",
  "paper-slitter-knife-selection"
];
const productGuidePairs = [
  ["custom-industrial-blades", guideSlugs[0]],
  ["textile-cutting-knives", guideSlugs[1]],
  ["paper-slitting-knives", guideSlugs[2]]
];

function read(relativePath) {
  const filePath = path.join(outputDir, relativePath);
  if (!fs.existsSync(filePath)) {
    errors.push(`${relativePath}: missing build output`);
    return "";
  }
  return fs.readFileSync(filePath, "utf8");
}

function requireText(html, text, label) {
  if (!html.includes(text)) errors.push(`${label}: missing ${text}`);
}

if (!fs.existsSync(outputDir)) {
  console.error("AI-GEO check requires a completed build in dist");
  process.exit(1);
}

const robots = read("robots.txt");
requireText(robots, "User-agent: *", "robots.txt");
requireText(robots, "Allow: /", "robots.txt");
requireText(robots, "Sitemap: https://www.teamstarmfg.com/sitemap.xml", "robots.txt");
if (/User-agent:\s*OAI-SearchBot[\s\S]*?Disallow:\s*\//i.test(robots)) {
  errors.push("robots.txt: OAI-SearchBot is blocked");
}

const sitemap = read("sitemap.xml");
for (const slug of guideSlugs) {
  requireText(sitemap, `<loc>https://www.teamstarmfg.com/guides/${slug}/</loc>`, "sitemap.xml");
  requireText(sitemap, `<loc>https://www.teamstarmfg.com/en/guides/${slug}/</loc>`, "sitemap.xml");
}

for (const langPrefix of ["", "en/"]) {
  const language = langPrefix ? "en" : "zh";
  const indexHtml = read(`${langPrefix}guides/index.html`);
  for (const slug of guideSlugs) {
    requireText(indexHtml, `/${langPrefix}guides/${slug}/`, `${language} guide index`);
    const html = read(`${langPrefix}guides/${slug}/index.html`);
    requireText(html, 'class="buyer-guide-article"', `${language}/${slug}`);
    requireText(html, '"@type":"TechArticle"', `${language}/${slug}`);
    const canonicalTag = html.match(/<link\b[^>]*rel="canonical"[^>]*>|<link\b[^>]*href="[^"]+"[^>]*rel="canonical"[^>]*>/i)?.[0] || "";
    if (!canonicalTag.includes(`href="https://www.teamstarmfg.com/${langPrefix}guides/${slug}/"`)) {
      errors.push(`${language}/${slug}: canonical URL is missing or incorrect`);
    }
    requireText(html, `${langPrefix ? "/guides/" : "/en/guides/"}${slug}/`, `${language}/${slug} alternate language`);
    requireText(html, `/${langPrefix}capabilities/`, `${language}/${slug} capabilities link`);
    requireText(html, `/${langPrefix}quality/`, `${language}/${slug} quality link`);
    requireText(html, `/${langPrefix}rfq/?product=`, `${language}/${slug} RFQ link`);
    const questionBlock = html.match(/<div class="guide-question-list">([\s\S]*?)<\/div>/)?.[1] || "";
    const answerHeadings = (questionBlock.match(/<h3>/g) || []).length;
    const answerParagraphs = (questionBlock.match(/<p>/g) || []).length;
    if (answerHeadings !== 3 || answerParagraphs !== 3) errors.push(`${language}/${slug}: expected a visible three-question answer block`);
  }
}

for (const [productSlug, guideSlug] of productGuidePairs) {
  for (const langPrefix of ["", "en/"]) {
    const html = read(`${langPrefix}products/${productSlug}/index.html`);
    requireText(html, `/${langPrefix}guides/${guideSlug}/`, `${langPrefix || "zh/"}products/${productSlug}`);
  }
}

const allGuideHtml = guideSlugs.flatMap((slug) => [
  read(`guides/${slug}/index.html`),
  read(`en/guides/${slug}/index.html`)
]).join("\n");
for (const marker of ["XX+", "XX,000", "TBD", "TODO", "待补充", "pending confirmation"]) {
  if (allGuideHtml.includes(marker)) errors.push(`buyer guides contain unresolved placeholder: ${marker}`);
}
for (const unsupportedType of ["FAQPage", "AggregateRating", '"@type":"Product"', '"@type":"Offer"']) {
  if (allGuideHtml.includes(unsupportedType)) errors.push(`buyer guides contain unsupported structured data: ${unsupportedType}`);
}

if (errors.length) {
  console.error("AI-GEO check failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("AI-GEO check passed: crawl access, sitemap discovery, six bilingual TechArticle guides, language alternates, product-guide links, evidence links and RFQ paths are present without placeholders or unsupported schema");
