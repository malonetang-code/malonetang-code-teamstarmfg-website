const fs = require("node:fs");
const path = require("node:path");
const sharp = require("sharp");
const site = require("../src/_data/site");

const root = path.resolve(__dirname, "..");
const images = [
  "factory-gate.jpg",
  "office-building-side.jpg",
  "manufacturing-workshop.jpg",
  "cnc-equipment-area.jpg",
  "inspection-room.jpg",
];

function fail(message) {
  throw new Error(message);
}

async function main() {
  const companyTemplate = fs.readFileSync(path.join(root, "src/_includes/layouts/company.njk"), "utf8");
  const homeTemplate = fs.readFileSync(path.join(root, "src/_includes/layouts/home.njk"), "utf8");

  for (const image of images) {
    const source = path.join(root, "images/web/factory-20260722", image);
    if (!fs.existsSync(source)) fail(`missing factory evidence image: ${image}`);
    const metadata = await sharp(source).metadata();
    if (metadata.width < 1600 || metadata.height < 1000) fail(`factory evidence image is undersized: ${image}`);
    if (metadata.exif) fail(`factory evidence image retains EXIF metadata: ${image}`);
    if (!companyTemplate.includes(`/images/web/factory-20260722/${image}`)) fail(`company template does not reference ${image}`);
  }

  for (const file of ["dist/company/index.html", "dist/en/company/index.html"]) {
    const html = fs.readFileSync(path.join(root, file), "utf8");
    if (!html.includes(site.assetVersion)) fail(`missing current asset marker: ${file}`);
    if ((html.match(/<figure class="company-photo(?:\s|")/g) || []).length !== images.length) {
      fail(`unexpected factory evidence count: ${file}`);
    }
  }

  if (!homeTemplate.includes("/images/web/factory-20260722/factory-gate.jpg")) {
    fail("homepage factory band does not use the gate photograph");
  }

  console.log("Factory evidence check passed: five metadata-free photographs are present on both company pages");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
