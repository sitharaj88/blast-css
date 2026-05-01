import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";

const packageJson = JSON.parse(await readFile("package.json", "utf8"));
const exportsMap = packageJson.exports || {};
let failed = false;

function collectFiles(value) {
  if (typeof value === "string") return [value];
  if (value && typeof value === "object") return Object.values(value).flatMap(collectFiles);
  return [];
}

for (const [name, value] of Object.entries(exportsMap)) {
  for (const file of collectFiles(value)) {
    try {
      await access(resolve(file));
      console.log(`ok        export ${name} -> ${file}`);
    } catch {
      console.error(`fail      export ${name} -> ${file}`);
      failed = true;
    }
  }
}

if (failed) {
  process.exitCode = 1;
}
