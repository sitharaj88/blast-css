import { access, readFile } from "node:fs/promises";

const files = [
  "docs/index.html",
  "docs/playground.html",
  "docs/showcase.html",
  "docs/components/buttons.html",
  "docs/components/forms.html",
  "docs/guides/installation.html",
  "examples/index.html",
  "examples/kitchen-sink.html",
  "benchmarks/dashboard.html",
  "benchmarks/form.html",
  "benchmarks/marketing.html"
];

let failed = false;

for (const file of files) {
  try {
    await access(file);
    const html = await readFile(file, "utf8");
    const checks = [
      ["doctype", /^<!doctype html>/i.test(html)],
      ["lang", /<html[^>]+lang=/.test(html)],
      ["viewport", /name="viewport"/.test(html)],
      ["title", /<title>[^<]+<\/title>/.test(html)],
      ["h1", /<h1[\s>]/.test(html)]
    ];

    let pageFailed = false;
    for (const [name, ok] of checks) {
      if (!ok) {
        console.error(`fail      ${file} missing ${name}`);
        failed = true;
        pageFailed = true;
      }
    }

    if (!pageFailed) {
      console.log(`ok        ${file}`);
    }
  } catch {
    console.error(`fail      ${file} missing`);
    failed = true;
  }
}

if (failed) {
  process.exitCode = 1;
}
