import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputRoot = path.resolve(
  process.env.APPROVED_OUT || path.join(projectRoot, "dist-approved"),
);
const releaseVersion = "20260803-4a";
const errors = [];

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(target) : [target];
  });
}

function read(relativePath) {
  return fs.readFileSync(path.join(outputRoot, relativePath), "utf8");
}

function sha256(relativePath) {
  return crypto
    .createHash("sha256")
    .update(fs.readFileSync(path.join(outputRoot, relativePath)))
    .digest("hex");
}

function expect(condition, message) {
  if (!condition) errors.push(message);
}

expect(fs.existsSync(outputRoot), `Production candidate is missing: ${outputRoot}`);

const expectedAssetHashes = {
  "assets/css/site-2w.css":
    "4305e1d9d4691de9e58ae06fbb085a2a921d68e5da628bdad7dc1ad5a6b1fcd8",
  "assets/js/home-video.js":
    "354f1cd60f603b37c659417be2da41c29890081e23bdf31cb8472f4f555f610b",
  "assets/css/home-reference-marquee.css":
    "5782a7b33a406e4a11a237d1e098c5a1f730854e553b898f20471a973efc1816",
  "assets/js/home-reference-marquee.js":
    "88f249538249eee2fb863fdb650faac07b2d90274cd16bd794d66cc64977561f",
};

for (const [file, expectedHash] of Object.entries(expectedAssetHashes)) {
  expect(fs.existsSync(path.join(outputRoot, file)), `${file}: missing from candidate`);
  if (fs.existsSync(path.join(outputRoot, file))) {
    expect(sha256(file) === expectedHash, `${file}: approved hash mismatch`);
  }
}

const htmlFiles = walk(outputRoot).filter((file) => file.endsWith(".html"));
expect(htmlFiles.length === 48, `Expected 48 HTML files, found ${htmlFiles.length}`);
expect(!fs.existsSync(path.join(outputRoot, "home")), "Review-only /home/ route remains");
expect(!fs.existsSync(path.join(outputRoot, "en", "home")), "Review-only /en/home/ route remains");

for (const [file, heading, removedInquiry] of [
  ["index.html", "因需而制，以准致信。", "三种询价方式"],
  ["en/index.html", "Engineered for Your Needs. Trusted for Precision.", "Three Ways to Start"],
]) {
  const html = read(file);
  expect(html.includes(heading), `${file}: approved heading is missing`);
  expect(
    html.includes('<meta name="robots" content="index, follow">'),
    `${file}: production indexing is not enabled`,
  );
  expect(
    html.includes(`<meta name="teamstar-release" content="${releaseVersion}">`),
    `${file}: release marker is missing`,
  );
  expect(!html.includes(removedInquiry), `${file}: removed inquiry section remains`);
  expect(!html.includes('class="rfq-paths"'), `${file}: removed inquiry cards remain`);
  expect(!html.includes("teamstar-review-baseline"), `${file}: review baseline marker remains`);
  expect((html.match(/<video\b/g) || []).length === 1, `${file}: Home video count changed`);
  for (const required of [
    "home-company-manufacturing-montage-20260730.mp4",
    "home-company-manufacturing-montage-20260730-poster.jpg",
    "home-company-manufacturing-montage-20260730-poster-mobile.jpg",
    "data-home-video",
    `home-video.js?v=${releaseVersion}`,
    "img/6-6uVLfQnG-1440.webp",
    "images/web/process-20260725/04-machining.jpg",
    "img/DjfribI31j-720.jpeg",
    "reference-section",
    `home-reference-marquee.css?v=${releaseVersion}`,
    `home-reference-marquee.js?v=${releaseVersion}`,
  ]) {
    expect(html.includes(required), `${file}: approved content is missing: ${required}`);
  }
  expect(
    (html.match(/class="logo-item"/g) || []).length === 10,
    `${file}: expected ten source logos`,
  );

  const partnerStart = html.indexOf('<section class="section partner-section">');
  const partnerEnd = html.indexOf("</section>", partnerStart);
  const partnerSection = html.slice(partnerStart, partnerEnd);
  expect(partnerStart !== -1 && partnerEnd !== -1, `${file}: black partner section is missing`);
  expect(!partnerSection.includes("/rfq/"), `${file}: black partner section contains an RFQ CTA`);
}

for (const locale of ["rfq/index.html", "en/rfq/index.html"]) {
  expect(read(locale).includes('action="/api/rfq"'), `${locale}: production RFQ action is missing`);
}

const sitemap = read("sitemap.xml");
const sitemapUrls = Array.from(sitemap.matchAll(/<loc>([^<]+)<\/loc>/g), (match) => match[1]);
expect(sitemapUrls.length === 46, `Expected 46 sitemap routes, found ${sitemapUrls.length}`);
for (const url of sitemapUrls) {
  const route = new URL(url).pathname;
  const relativePath = route === "/" ? "index.html" : path.join(route.slice(1), "index.html");
  expect(fs.existsSync(path.join(outputRoot, relativePath)), `Sitemap route has no file: ${route}`);
}

const textFiles = walk(outputRoot).filter((file) =>
  /\.(?:css|html|js|json|svg|webmanifest|xml)$/.test(file),
);
const allText = textFiles.map((file) => fs.readFileSync(file, "utf8")).join("\n");
for (const forbidden of [
  "/teamstar-website-review",
  "noindex,nofollow,noarchive",
  "teamstar-review-baseline",
  'href="/home/"',
  'href="/en/home/"',
]) {
  expect(!allText.includes(forbidden), `Review-only residue remains: ${forbidden}`);
}

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  for (const match of html.matchAll(/(?:src|href)="(\/[^"#?]+)[^"#]*"/g)) {
    const assetPath = match[1];
    if (!/\.(?:avif|css|gif|jpe?g|js|json|mp4|png|svg|webmanifest|webp|woff2)$/i.test(assetPath)) {
      continue;
    }
    expect(
      fs.existsSync(path.join(outputRoot, assetPath.slice(1))),
      `${path.relative(outputRoot, file)}: missing asset ${assetPath}`,
    );
  }
}

expect(
  read("robots.txt").includes("Sitemap: https://www.teamstarmfg.com/sitemap.xml"),
  "Production robots.txt sitemap is missing",
);

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

console.log(
  JSON.stringify(
    {
      outputRoot,
      releaseVersion,
      htmlFiles: htmlFiles.length,
      sitemapRoutes: sitemapUrls.length,
      approvedAssetHashes: Object.keys(expectedAssetHashes).length,
      inquirySectionRemoved: true,
      partnerRfqCta: false,
      productionIndexing: true,
      reviewResidue: false,
    },
    null,
    2,
  ),
);
