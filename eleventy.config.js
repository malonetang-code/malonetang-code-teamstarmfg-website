module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  const imageFiles = [
    "images/web",
    "images/product_01.png",
    "images/product_02.png",
    "images/product_04.png",
    "images/product_05.png",
    "images/product_06.png",
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
