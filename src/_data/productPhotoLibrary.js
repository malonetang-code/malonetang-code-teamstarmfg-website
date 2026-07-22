const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "../..");
const libraryRoot = path.join(root, "images/web/product-library-20260722");

const definitions = [
  {
    slug: "packaging-blades",
    folderName: "包装类刀片",
    name: { zh: "包装类刀片", en: "Packaging Blades" },
    representative: "dsc01058.jpg"
  },
  {
    slug: "industrial-machine-knives",
    folderName: "工业机械用刀",
    name: { zh: "工业机械用刀", en: "Industrial Machine Knives" },
    representative: "dsc00952-copy.jpg"
  },
  {
    slug: "woodworking-machine-blades",
    folderName: "木工机械刀片",
    name: { zh: "木工机械刀片", en: "Woodworking Machine Blades" },
    representative: "dsc01134.jpg"
  },
  {
    slug: "sewing-blades",
    folderName: "缝纫类刀片",
    name: { zh: "缝纫类刀片", en: "Sewing Blades" },
    representative: "dsc01065.jpg"
  },
  {
    slug: "food-blades",
    folderName: "食品刀片",
    name: { zh: "食品刀片", en: "Food Blades" },
    representative: "dsc00604-1.jpg"
  }
];

module.exports = {
  groups: definitions.map((definition) => {
    const directory = path.join(libraryRoot, definition.slug);
    const files = fs.readdirSync(directory)
      .filter((filename) => filename.endsWith(".jpg"))
      .sort((left, right) => left.localeCompare(right, "en", { numeric: true }));
    const photos = files.map((filename, index) => ({
      image: `/images/web/product-library-20260722/${definition.slug}/${filename}`,
      sequence: index + 1,
      alt: {
        zh: `${definition.folderName}产品实物 ${String(index + 1).padStart(2, "0")}`,
        en: `${definition.name.en} product photograph ${String(index + 1).padStart(2, "0")}`
      }
    }));
    const representative = photos.find((photo) => photo.image.endsWith(`/${definition.representative}`));
    if (!representative) throw new Error(`Missing representative image for ${definition.folderName}`);
    return {
      ...definition,
      photoCount: photos.length,
      representative: representative.image,
      representativeAlt: representative.alt,
      photos
    };
  })
};
