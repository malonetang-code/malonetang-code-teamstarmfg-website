const fs = require("node:fs");
const path = require("node:path");

const outputDir = path.join(__dirname, "..", "dist");
const errors = [];
let htmlFiles = 0;
let jsonLdBlocks = 0;
let breadcrumbPages = 0;
let servicePages = 0;
let catalogPages = 0;
let articlePages = 0;

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(entryPath);
    if (entry.isFile() && entry.name.endsWith(".html")) checkFile(entryPath);
  }
}

function collectTypes(value, types = []) {
  if (!value || typeof value !== "object") return types;
  if (Array.isArray(value)) {
    for (const item of value) collectTypes(item, types);
    return types;
  }
  if (value["@type"]) {
    const nodeTypes = Array.isArray(value["@type"]) ? value["@type"] : [value["@type"]];
    types.push(...nodeTypes);
  }
  for (const child of Object.values(value)) collectTypes(child, types);
  return types;
}

function findNode(documents, type) {
  const queue = [...documents];
  while (queue.length) {
    const value = queue.shift();
    if (!value || typeof value !== "object") continue;
    if (Array.isArray(value)) {
      queue.push(...value);
      continue;
    }
    const types = Array.isArray(value["@type"]) ? value["@type"] : [value["@type"]];
    if (types.includes(type)) return value;
    queue.push(...Object.values(value));
  }
  return null;
}

function checkFile(filePath) {
  htmlFiles += 1;
  const relative = path.relative(outputDir, filePath);
  const html = fs.readFileSync(filePath, "utf8");
  const documents = [];
  for (const match of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    jsonLdBlocks += 1;
    try {
      documents.push(JSON.parse(match[1].trim()));
    } catch (error) {
      errors.push(`${relative}: invalid JSON-LD (${error.message})`);
    }
  }

  const graph = documents.find((document) => Array.isArray(document["@graph"]));
  if (!graph) {
    errors.push(`${relative}: missing Organization, WebSite and WebPage graph`);
  } else {
    const graphTypes = collectTypes(graph["@graph"]);
    for (const required of ["Organization", "WebSite", "WebPage"]) {
      if (!graphTypes.includes(required)) errors.push(`${relative}: base graph is missing ${required}`);
    }
    const organization = findNode([graph], "Organization");
    if (!organization?.legalName || !organization?.foundingDate || !organization?.parentOrganization || !organization?.contactPoint) {
      errors.push(`${relative}: Organization is missing legal name, founding date, parent organization or contact point`);
    }
  }

  const hasVisibleBreadcrumb = html.includes('class="breadcrumbs"');
  const breadcrumb = findNode(documents, "BreadcrumbList");
  if (hasVisibleBreadcrumb) {
    breadcrumbPages += 1;
    if (!breadcrumb) {
      errors.push(`${relative}: visible breadcrumb has no BreadcrumbList JSON-LD`);
    } else {
      const items = breadcrumb.itemListElement;
      if (!Array.isArray(items) || items.length < 2) {
        errors.push(`${relative}: BreadcrumbList must contain at least two ListItems`);
      } else if (items.some((item, index) => item.position !== index + 1 || !item.name || !item.item)) {
        errors.push(`${relative}: BreadcrumbList positions, names or URLs are incomplete`);
      }
    }
  }

  const isProductDetail = html.includes('class="page-product-detail"');
  const service = findNode(documents, "Service");
  if (isProductDetail) {
    servicePages += 1;
    if (!service) {
      errors.push(`${relative}: product family page is missing Service JSON-LD`);
    } else {
      for (const key of ["@id", "url", "name", "description", "serviceType", "category", "provider", "audience", "availableChannel", "mainEntityOfPage"]) {
        if (!service[key]) errors.push(`${relative}: Service is missing ${key}`);
      }
      if (!service.provider || service.provider["@id"] !== "https://www.teamstarmfg.com/#organization") {
        errors.push(`${relative}: Service provider does not reference the canonical organization`);
      }
    }
  }

  const isProductCatalog = html.includes('class="page-products"');
  if (isProductCatalog) {
    catalogPages += 1;
    const itemList = findNode(documents, "ItemList");
    if (!itemList || itemList.numberOfItems !== 6 || !Array.isArray(itemList.itemListElement) || itemList.itemListElement.length !== 6) {
      errors.push(`${relative}: product catalog must expose a six-item ItemList`);
    } else if (itemList.itemListElement.some((item, index) => item.position !== index + 1 || item.item?.["@type"] !== "Service")) {
      errors.push(`${relative}: product catalog ItemList order or Service items are invalid`);
    }
  }

  const isBuyerGuide = html.includes('class="buyer-guide-article"');
  if (isBuyerGuide) {
    articlePages += 1;
    const article = findNode(documents, "TechArticle");
    if (!article) {
      errors.push(`${relative}: buyer guide is missing TechArticle JSON-LD`);
    } else {
      for (const key of ["@id", "url", "headline", "description", "image", "inLanguage", "author", "publisher", "about", "mainEntityOfPage"]) {
        if (!article[key]) errors.push(`${relative}: TechArticle is missing ${key}`);
      }
      if (article.author?.["@id"] !== "https://www.teamstarmfg.com/#organization" || article.publisher?.["@id"] !== "https://www.teamstarmfg.com/#organization") {
        errors.push(`${relative}: TechArticle author and publisher must reference the canonical organization`);
      }
    }
  }

  const unsupportedTypes = new Set(["Product", "Offer", "AggregateOffer", "Review", "AggregateRating", "FAQPage"]);
  const presentUnsupported = collectTypes(documents).filter((type) => unsupportedTypes.has(type));
  if (presentUnsupported.length) {
    errors.push(`${relative}: unsupported commerce or FAQ markup found (${[...new Set(presentUnsupported)].join(", ")})`);
  }
}

if (!fs.existsSync(outputDir)) {
  console.error("Structured-data check requires a completed build in dist");
  process.exit(1);
}

walk(outputDir);

if (servicePages !== 12) errors.push(`expected 12 bilingual product Service pages, found ${servicePages}`);
if (catalogPages !== 2) errors.push(`expected 2 bilingual product ItemList pages, found ${catalogPages}`);
if (articlePages !== 6) errors.push(`expected 6 bilingual buyer-guide TechArticle pages, found ${articlePages}`);
if (errors.length) {
  console.error("Structured-data check failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Structured-data check passed: ${jsonLdBlocks} JSON-LD blocks parse across ${htmlFiles} pages, ${breadcrumbPages} visible breadcrumb pages match BreadcrumbList markup, 12 product families use Service, two catalogs use six-item ItemList data, and six buyer guides use TechArticle`);
