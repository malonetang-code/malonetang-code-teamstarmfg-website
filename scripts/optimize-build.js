const fs = require("node:fs/promises");
const path = require("node:path");
const CleanCSS = require("clean-css");
const { minify: minifyHtml } = require("html-minifier-terser");
const { minify: minifyJs } = require("terser");

const outputRoot = path.resolve("dist");

async function listFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await listFiles(fullPath));
    else files.push(fullPath);
  }

  return files;
}

async function optimizeFile(filePath) {
  const extension = path.extname(filePath);
  const source = await fs.readFile(filePath, "utf8");
  let result = source;

  if (extension === ".css") {
    const output = new CleanCSS({ level: 2 }).minify(source);
    if (output.errors.length) throw new Error(output.errors.join("\n"));
    result = output.styles;
  } else if (extension === ".js") {
    const output = await minifyJs(source, { compress: true, mangle: true });
    if (!output.code) throw new Error(`JavaScript minification failed: ${filePath}`);
    result = output.code;
  } else if (extension === ".html") {
    result = await minifyHtml(source, {
      collapseWhitespace: true,
      conservativeCollapse: true,
      removeComments: true,
      removeRedundantAttributes: true,
      sortAttributes: true,
      sortClassName: true
    });
  }

  if (result !== source) await fs.writeFile(filePath, result);
}

async function main() {
  const files = await listFiles(outputRoot);
  const optimizable = files.filter((filePath) => [".css", ".js", ".html"].includes(path.extname(filePath)));
  await Promise.all(optimizable.map(optimizeFile));
  console.log(`Optimized ${optimizable.length} HTML, CSS and JavaScript files`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
