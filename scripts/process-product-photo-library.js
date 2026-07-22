const fs = require("node:fs");
const path = require("node:path");
const sharp = require("sharp");

const root = path.resolve(__dirname, "..");
const sourceRoot = process.env.TEAMSTAR_PHOTO_SOURCE || path.resolve(
  root,
  "..",
  "assets/incoming_website_photos_2026-07-22/extracted/群新工业产品图（筛选过）"
);
const outputRoot = path.join(root, "images/web/product-library-20260722");

const groups = [
  { folder: "包装类刀片", slug: "packaging-blades", representative: "dsc01058.jpg" },
  { folder: "工业机械用刀", slug: "industrial-machine-knives", representative: "dsc00952-copy.jpg" },
  { folder: "木工机械刀片", slug: "woodworking-machine-blades", representative: "dsc00676-1.jpg" },
  { folder: "缝纫类刀片", slug: "sewing-blades", representative: "dsc01065.jpg" },
  { folder: "食品刀片", slug: "food-blades", representative: "dsc00604-1.jpg" }
];
const backgroundOverrides = new Map([
  ["woodworking-machine-blades/dsc01134.jpg", { r: 156, g: 156, b: 157 }]
]);

function outputName(filename) {
  return filename
    .replace(/拷贝/gu, "copy")
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") + ".jpg";
}

async function processImage(input, output, backgroundOverride) {
  const stats = await sharp(input).stats();
  const background = { ...stats.dominant, alpha: 1 };
  const pipeline = sharp(input)
    .rotate()
    .sharpen({ sigma: 0.45 })
    .resize({ width: 1600, height: 1200, fit: "contain", background });

  if (!backgroundOverride) {
    await pipeline.jpeg({ quality: 88, progressive: true, mozjpeg: true }).toFile(output);
    return;
  }

  const { data, info } = await pipeline
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const result = Buffer.alloc(data.length);

  for (let index = 0; index < data.length; index += info.channels) {
    const luminance = 0.2126 * data[index] + 0.7152 * data[index + 1] + 0.0722 * data[index + 2];
    let subjectWeight = Math.max(0, Math.min(1, (235 - luminance) / 95));
    subjectWeight = subjectWeight * subjectWeight * (3 - 2 * subjectWeight);

    result[index] = Math.round(data[index] * subjectWeight + backgroundOverride.r * (1 - subjectWeight));
    result[index + 1] = Math.round(data[index + 1] * subjectWeight + backgroundOverride.g * (1 - subjectWeight));
    result[index + 2] = Math.round(data[index + 2] * subjectWeight + backgroundOverride.b * (1 - subjectWeight));
  }

  await sharp(result, { raw: { width: info.width, height: info.height, channels: 3 } })
    .jpeg({ quality: 88, progressive: true, mozjpeg: true })
    .toFile(output);
}

async function renderOverview() {
  const placements = [
    { left: 650, top: 48, width: 500, height: 375 },
    { left: 1170, top: 48, width: 500, height: 375 },
    { left: 650, top: 460, width: 330, height: 248 },
    { left: 1000, top: 460, width: 330, height: 248 },
    { left: 1350, top: 460, width: 330, height: 248 }
  ];
  const composites = [];
  for (const [index, group] of groups.entries()) {
    const input = path.join(outputRoot, group.slug, group.representative);
    const placement = placements[index];
    const image = await sharp(input)
      .resize({ width: placement.width, height: placement.height, fit: "cover" })
      .jpeg({ quality: 88, progressive: true, mozjpeg: true })
      .toBuffer();
    composites.push({ input: image, left: placement.left, top: placement.top });
  }
  await sharp({ create: { width: 1920, height: 1080, channels: 3, background: "#eef1ef" } })
    .composite(composites)
    .jpeg({ quality: 88, progressive: true, mozjpeg: true })
    .toFile(path.join(outputRoot, "overview.jpg"));
}

async function main() {
  let total = 0;
  for (const group of groups) {
    const sourceDirectory = path.join(sourceRoot, group.folder);
    const outputDirectory = path.join(outputRoot, group.slug);
    fs.mkdirSync(outputDirectory, { recursive: true });
    const files = fs.readdirSync(sourceDirectory)
      .filter((filename) => /\.(?:jpe?g|png)$/i.test(filename))
      .sort((left, right) => left.localeCompare(right, "en", { numeric: true }));

    for (const filename of files) {
      const input = path.join(sourceDirectory, filename);
      const processedName = outputName(filename);
      const output = path.join(outputDirectory, processedName);
      const backgroundOverride = backgroundOverrides.get(`${group.slug}/${processedName}`);
      await processImage(input, output, backgroundOverride);
      total += 1;
      console.log(`${group.folder}\t${filename}\t${path.relative(root, output)}`);
    }
  }
  await renderOverview();
  console.log(`Processed ${total} product photographs in five source-defined groups`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
