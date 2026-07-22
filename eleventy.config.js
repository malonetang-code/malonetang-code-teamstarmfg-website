const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");

function buildManufacturingService(product, lang, canonicalUrl, description, site) {
  const prefix = lang === "en" ? "/en" : "";
  const pageUrl = `${site.url}${canonicalUrl}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    url: pageUrl,
    name: product.name[lang],
    description,
    image: `${site.url}/images/web/product-library-20260722/overview.jpg`,
    serviceType: product.name[lang],
    category: lang === "en" ? "Custom industrial machine knife manufacturing" : "工业机械刀具定制制造",
    provider: { "@id": `${site.url}/#organization` },
    audience: {
      "@type": "Audience",
      audienceType: lang === "en"
        ? "Machine OEMs, brand owners and industrial users"
        : "设备制造商、品牌企业及工业用户"
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${site.url}${prefix}/rfq/?product=${encodeURIComponent(product.slug)}#rfq-form`
    },
    mainEntityOfPage: { "@id": `${pageUrl}#webpage` }
  };
}

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

  eleventyConfig.addFilter("jsonLd", (value) => {
    return JSON.stringify(value)
      .replace(/</g, "\\u003c")
      .replace(/>/g, "\\u003e")
      .replace(/&/g, "\\u0026")
      .replace(/\u2028/g, "\\u2028")
      .replace(/\u2029/g, "\\u2029");
  });

  eleventyConfig.addFilter("manufacturingServiceSchema", (product, lang, canonicalUrl, description, site) => {
    return buildManufacturingService(product, lang, canonicalUrl, description, site);
  });

  eleventyConfig.addFilter("manufacturingCatalogSchema", (products, lang, canonicalUrl, site) => {
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": `${site.url}${canonicalUrl}#custom-manufacturing-services`,
      name: lang === "en"
        ? "Custom industrial machine knife manufacturing services"
        : "工业机械刀具定制制造服务目录",
      numberOfItems: products.length,
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      itemListElement: products.map((product, index) => {
        const productUrl = `${lang === "en" ? "/en" : ""}/products/${product.slug}/`;
        return {
          "@type": "ListItem",
          position: index + 1,
          item: buildManufacturingService(product, lang, productUrl, product.summary[lang], site)
        };
      }),
      mainEntityOfPage: { "@id": `${site.url}${canonicalUrl}#webpage` }
    };
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
