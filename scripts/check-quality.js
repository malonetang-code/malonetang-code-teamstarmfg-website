const fs = require("fs");
const path = require("path");
const inspection = require("../src/_data/inspection");

const root = path.resolve(__dirname, "..");
const expectedModels = [
  "SPECTROLAB",
  "VCA",
  "Mitutoyo MVK-H100",
  "ZHR-8150LK",
  "NIKON",
  "Mitutoyo BEYOND APEX 707",
  "KEYENCE IM-7000",
  "JT-300",
  "Mitutoyo SJ-310",
  "EX-3000"
];

function fail(message) {
  throw new Error(message);
}

if (inspection.scopes.length !== 4) fail(`expected 4 inspection scopes, found ${inspection.scopes.length}`);
if (inspection.equipment.length !== expectedModels.length) fail(`expected ${expectedModels.length} equipment items, found ${inspection.equipment.length}`);

const models = inspection.equipment.map((item) => item.model);
for (const model of expectedModels) {
  if (!models.includes(model)) fail(`missing inspection equipment: ${model}`);
}

for (const item of inspection.equipment) {
  const source = path.join(root, "src", item.image);
  if (!fs.existsSync(source)) fail(`missing equipment image: ${item.image}`);
  if (!item.alt.zh || !item.alt.en || !item.function.zh || !item.function.en) fail(`incomplete bilingual equipment data: ${item.model}`);
}

const mapping = Object.fromEntries(inspection.equipment.map((item) => [item.model, item.image]));
if (mapping.SPECTROLAB !== "/images/quality/spectrolab-spectrometer.jpeg") fail("SPECTROLAB image mapping is incorrect");
if (mapping["EX-3000"] !== "/images/quality/ex3000-coating-thickness.jpeg") fail("EX-3000 image mapping is incorrect");

for (const file of [
  "dist/quality/index.html",
  "dist/en/quality/index.html",
  "dist/capabilities/inspection-lab/index.html",
  "dist/en/capabilities/inspection-lab/index.html"
]) {
  const html = fs.readFileSync(path.join(root, file), "utf8");
  if (!html.includes("20260722-2g")) fail(`missing Stage 2G marker: ${file}`);
  if ((html.match(/class="?equipment-item/g) || []).length !== expectedModels.length) fail(`unexpected equipment-card count: ${file}`);
  if ((html.match(/class="?inspection-scope/g) || []).length < inspection.scopes.length) fail(`inspection scopes missing: ${file}`);
  for (const model of expectedModels) {
    if (!html.includes(model)) fail(`${model} missing from ${file}`);
  }
}

console.log("Quality check passed: four inspection scopes and ten bilingual equipment records are mapped to dedicated images");
