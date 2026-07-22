const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({
    "node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-400-normal.woff2": "assets/fonts/ibm-plex-sans-latin-400-normal.woff2",
    "node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-500-normal.woff2": "assets/fonts/ibm-plex-sans-latin-500-normal.woff2",
    "node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-600-normal.woff2": "assets/fonts/ibm-plex-sans-latin-600-normal.woff2",
    "node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-700-normal.woff2": "assets/fonts/ibm-plex-sans-latin-700-normal.woff2"
  });

  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ["avif", "webp", "auto"],
    widths: [320, 640, 960, 1280, 1920],
    fixOrientation: true,
    transformOnRequest: false,
    sharpAvifOptions: { quality: 52, effort: 4 },
    sharpWebpOptions: { quality: 72, effort: 4 },
    sharpJpegOptions: { quality: 76, progressive: true, mozjpeg: true },
    sharpPngOptions: { compressionLevel: 9, palette: true },
    htmlOptions: {
      imgAttributes: { decoding: "async" }
    }
  });

  const imageFiles = [
    "images/web/brand-sign.jpg",
    "images/web/factory-building.jpg",
    "images/web/laser-cutting.jpg",
    "images/web/quality-control.jpg",
    "images/web/product-library-20260722",
    "images/certs",
    "images/logos",
    "images/quality"
  ];

  for (const imagePath of imageFiles) {
    eleventyConfig.addPassthroughCopy(imagePath);
  }

  eleventyConfig.addFilter("findBySlug", (items, slug) => {
    return items.find((item) => item.slug === slug);
  });

  eleventyConfig.addFilter("localized", (value, lang) => {
    return value && value[lang] ? value[lang] : "";
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "dist"
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    templateFormats: ["njk", "md"]
  };
};
