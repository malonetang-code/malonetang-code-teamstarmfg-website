const fs = require("node:fs");
const path = require("node:path");

const outputRoot = path.resolve("dist");
const errors = [];

function read(relativePath) {
  const filePath = path.join(outputRoot, relativePath);
  if (!fs.existsSync(filePath)) {
    errors.push(`${relativePath}: output file is missing`);
    return "";
  }
  return fs.readFileSync(filePath, "utf8");
}

function requirePattern(html, pattern, message, file) {
  if (!pattern.test(html)) errors.push(`${file}: ${message}`);
}

for (const file of ["rfq/index.html", "en/rfq/index.html"]) {
  const html = read(file);
  const stepCount = (html.match(/data-rfq-step=/g) || []).length;
  if (stepCount !== 3) errors.push(`${file}: expected 3 RFQ steps, found ${stepCount}`);

  for (const field of [
    "name",
    "email",
    "company",
    "inquiry_path",
    "product_category",
    "quantity",
    "processed_material",
    "technical_requirements",
    "privacy_consent",
    "rfq_reference"
  ]) {
    requirePattern(html, new RegExp(`name=\\"${field}\\"`), `missing ${field} field`, file);
  }

  requirePattern(html, /action="\/api\/rfq"/, "unexpected form endpoint", file);
  requirePattern(html, /enctype="multipart\/form-data"/, "multipart form encoding is missing", file);
  requirePattern(html, /data-rfq-review/, "review summary is missing", file);
  requirePattern(html, /data-rfq-success/, "success handoff is missing", file);
  requirePattern(html, /name="_gotcha"/, "spam honeypot is missing", file);
  requirePattern(html, /<input[^>]+name="attachments\[\]"[^>]+type="file"[^>]+multiple/i, "optional multi-file upload is missing", file);
  const fileInput = html.match(/<input[^>]+data-rfq-files[^>]*>/i)?.[0] || "";
  if (/\srequired(?:=|\s|>)/i.test(fileInput)) errors.push(`${file}: file upload must remain optional`);

  const ids = Array.from(html.matchAll(/\sid="([^"]+)"/g), (match) => match[1]);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicates.length) errors.push(`${file}: duplicate ids ${[...new Set(duplicates)].join(", ")}`);
}

for (const file of ["index.html", "en/index.html"]) {
  const html = read(file);
  for (const type of ["drawing", "sample", "application"]) {
    requirePattern(html, new RegExp(`/rfq/\\?type=${type}#rfq-form`), `missing preselected ${type} entry`, file);
  }
}

const productHtml = read("products/woodworking-knives/index.html");
requirePattern(
  productHtml,
  /\/rfq\/\?product=woodworking-knives#rfq-form/,
  "product page does not preselect its RFQ category",
  "products/woodworking-knives/index.html"
);

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("RFQ check passed: staged flow, optional file upload, entry preselection and secure endpoint are present");
