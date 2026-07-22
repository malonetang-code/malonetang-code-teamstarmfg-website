const fs = require("node:fs");
const path = require("node:path");
const productPhotoLibrary = require("../src/_data/productPhotoLibrary");

const root = path.resolve(__dirname, "..");
const expected = new Map([
  ["packaging-blades", 22],
  ["industrial-machine-knives", 19],
  ["woodworking-machine-blades", 9],
  ["sewing-blades", 14],
  ["food-blades", 22]
]);
const legacyImages = [
  "images/product_01.png",
  "images/product_02.png",
  "images/product_03.png",
  "images/product_04.png",
  "images/product_05.png",
  "images/product_06.png",
  "images/product_07.png",
  "images/product_gears.jpg",
  "images/product_parts.jpg",
  "images/products_overview.png",
  "images/web/product-parts.jpg"
];

function fail(message) {
  throw new Error(message);
}

function listFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? listFiles(fullPath) : [fullPath];
  });
}

if (productPhotoLibrary.groups.length !== expected.size) {
  fail(`expected ${expected.size} product photo groups, found ${productPhotoLibrary.groups.length}`);
}

for (const group of productPhotoLibrary.groups) {
  const expectedCount = expected.get(group.slug);
  if (!expectedCount) fail(`unexpected product photo group: ${group.slug}`);
  if (group.photoCount !== expectedCount) fail(`${group.slug}: expected ${expectedCount} photos, found ${group.photoCount}`);
  for (const photo of group.photos) {
    const source = path.join(root, photo.image.replace(/^\//, ""));
    if (!fs.existsSync(source)) fail(`missing processed product photograph: ${photo.image}`);
  }

  for (const prefix of ["", "en/"]) {
    const htmlPath = path.join(root, "dist", prefix, "products/gallery", group.slug, "index.html");
    if (!fs.existsSync(htmlPath)) fail(`missing gallery page: ${htmlPath}`);
    const html = fs.readFileSync(htmlPath, "utf8");
    const renderedCount = (html.match(/class="?photo-gallery-item/g) || []).length;
    if (renderedCount !== expectedCount) fail(`${htmlPath}: expected ${expectedCount} gallery items, found ${renderedCount}`);
  }
}

for (const relativePath of legacyImages) {
  if (fs.existsSync(path.join(root, relativePath))) fail(`legacy product image remains: ${relativePath}`);
}

const referenceFiles = [
  path.join(root, "index.html"),
  path.join(root, "eleventy.config.js"),
  ...listFiles(path.join(root, "src")).filter((filePath) => /\.(?:js|njk|html|md)$/.test(filePath))
];
for (const filePath of referenceFiles) {
  const text = fs.readFileSync(filePath, "utf8");
  if (/product_0[1-7]|product_parts|products_overview|web\/product-parts/.test(text)) {
    fail(`legacy product image reference remains in ${path.relative(root, filePath)}`);
  }
}

const productsIndex = fs.readFileSync(path.join(root, "dist/products/index.html"), "utf8");
if ((productsIndex.match(/class="?product-library-group/g) || []).length !== expected.size) {
  fail("product directory does not expose all five source-defined photo groups");
}

console.log("Product photo check passed: 86 photographs remain in five source-defined groups and legacy product images are absent");
