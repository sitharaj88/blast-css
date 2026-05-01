import { gzipSync } from "node:zlib";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const limits = {
  "dist/blast.min.css": 13000,
  "dist/blast.core.min.css": 5500,
  "dist/blast.components.min.css": 6000,
  "dist/blast.components-extra.min.css": 3600,
  "dist/blast.utilities.min.css": 5000,
  "dist/blast.motion.min.css": 2300,
  "dist/blast.reset.min.css": 800,
  "dist/blast.min.js": 4000
};

let failed = false;

for (const [file, limit] of Object.entries(limits)) {
  const css = await readFile(resolve(file), "utf8");
  const gzipBytes = gzipSync(css).byteLength;
  const status = gzipBytes <= limit ? "ok" : "too large";
  console.log(`${status.padEnd(9)} ${file.padEnd(36)} ${gzipBytes} / ${limit} B gzip`);
  if (gzipBytes > limit) failed = true;
}

if (failed) {
  process.exitCode = 1;
}
