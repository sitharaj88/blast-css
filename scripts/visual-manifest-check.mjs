import { access, readFile } from "node:fs/promises";

const manifest = JSON.parse(await readFile("tests/visual-manifest.json", "utf8"));
let failed = false;

for (const viewport of manifest.viewports || []) {
  if (!viewport.name || !viewport.width || !viewport.height) {
    console.error("fail      invalid viewport");
    failed = true;
  }
}

for (const page of manifest.pages || []) {
  try {
    await access(page);
    console.log(`ok        visual page ${page}`);
  } catch {
    console.error(`fail      visual page ${page} missing`);
    failed = true;
  }
}

if (failed) {
  process.exitCode = 1;
}
