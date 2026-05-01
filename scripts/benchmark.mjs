import { gzipSync } from "node:zlib";
import { readFile, writeFile } from "node:fs/promises";

const bundles = [
  "dist/blast.min.css",
  "dist/blast.core.min.css",
  "dist/blast.components.min.css",
  "dist/blast.components-extra.min.css",
  "dist/blast.utilities.min.css",
  "dist/blast.motion.min.css",
  "dist/blast.reset.min.css",
  "dist/blast.min.js"
];

const fixtures = [
  "benchmarks/dashboard.html",
  "benchmarks/form.html",
  "benchmarks/marketing.html"
];

const result = {
  generatedAt: new Date().toISOString(),
  bundles: {},
  fixtures: {}
};

for (const file of bundles) {
  const source = await readFile(file, "utf8");
  result.bundles[file] = {
    bytes: Buffer.byteLength(source),
    gzipBytes: gzipSync(source).byteLength
  };
}

for (const file of fixtures) {
  const source = await readFile(file, "utf8");
  result.fixtures[file] = {
    bytes: Buffer.byteLength(source),
    componentClassCount: (source.match(/class="/g) || []).length
  };
}

await writeFile("benchmarks/results.json", JSON.stringify(result, null, 2) + "\n");
console.log(JSON.stringify(result.bundles, null, 2));
