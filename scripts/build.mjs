import { gzipSync } from "node:zlib";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, "dist");

const entries = {
  "blast.css": "src/blast.css",
  "blast.core.css": "src/core.css",
  "blast.components.css": "src/components.css",
  "blast.components-extra.css": "src/components-extra.css",
  "blast.utilities.css": "src/utilities.css",
  "blast.motion.css": "src/motion.css",
  "blast.reset.css": "src/reset.css"
};

const jsEntries = {
  "blast.js": "src/js/blast.js"
};

async function bundle(file, seen = new Set()) {
  const absolute = resolve(root, file);
  if (seen.has(absolute)) return "";
  seen.add(absolute);

  const source = await readFile(absolute, "utf8");
  const importPattern = /@import\s+["'](.+?)["'];?/g;
  let output = "";
  let last = 0;

  for (const match of source.matchAll(importPattern)) {
    output += source.slice(last, match.index);
    output += await bundle(resolve(dirname(absolute), match[1]), seen);
    last = match.index + match[0].length;
  }

  return output + source.slice(last);
}

function minify(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{}:;,>+~])\s*/g, "$1")
    .replace(/;}/g, "}")
    .replace(/\b0(px|rem|em)\b/g, "0")
    .trim();
}

function minifyJs(js) {
  return js
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|\n)\s*\/\/.*(?=\n|$)/g, "$1")
    .replace(/\s+/g, " ")
    .replace(/\s*([{}();,:=+\-*/<>[\]])\s*/g, "$1")
    .trim();
}

function splitArgs(s) {
  const parts = [];
  let depth = 0;
  let buf = "";
  for (const ch of s) {
    if (ch === "(") depth++;
    if (ch === ")") depth--;
    if (ch === "," && depth === 0) {
      parts.push(buf.trim());
      buf = "";
    } else {
      buf += ch;
    }
  }
  if (buf.trim()) parts.push(buf.trim());
  return parts;
}

function splitDeclarations(body) {
  const decls = [];
  let depth = 0;
  let buf = "";
  for (const ch of body) {
    if (ch === "(") depth++;
    if (ch === ")") depth--;
    if (ch === ";" && depth === 0) {
      if (buf.trim()) decls.push(buf.trim());
      buf = "";
    } else {
      buf += ch;
    }
  }
  if (buf.trim()) decls.push(buf.trim());
  return decls;
}

function extractRootBody(source) {
  // Find :root { ... } accounting for nested braces
  const start = source.search(/:root\s*\{/);
  if (start < 0) return "";
  const open = source.indexOf("{", start);
  let depth = 1;
  for (let i = open + 1; i < source.length; i++) {
    if (source[i] === "{") depth++;
    else if (source[i] === "}") {
      depth--;
      if (depth === 0) return source.slice(open + 1, i);
    }
  }
  return "";
}

function parseTokens(source) {
  const body = extractRootBody(source);
  const light = {};
  const dark = {};

  for (const decl of splitDeclarations(body)) {
    const m = decl.match(/^(--b-[\w-]+)\s*:\s*([\s\S]+)$/);
    if (!m) continue;
    const name = m[1];
    const value = m[2].trim();

    const ld = value.match(/^light-dark\(([\s\S]+)\)$/);
    if (ld) {
      const args = splitArgs(ld[1]);
      light[name] = args[0];
      dark[name] = args[1] || args[0];
    } else {
      light[name] = value;
      dark[name] = value;
    }
  }

  return { light, dark };
}

async function exportTokens() {
  const tokenSource = await readFile(resolve(root, "src/tokens.css"), "utf8");
  const tokens = parseTokens(tokenSource);

  const lightDecls = Object.entries(tokens.light).map(([k, v]) => `  ${k}: ${v};`).join("\n");
  const darkDecls = Object.entries(tokens.dark).map(([k, v]) => `  ${k}: ${v};`).join("\n");

  const tokenCss = `:root {\n${lightDecls}\n}\n\n[data-theme="dark"] {\n${darkDecls}\n}\n`;
  const tokenTs = `export const tokens = ${JSON.stringify(tokens, null, 2)} as const;\nexport type TokenName = keyof typeof tokens.light;\nexport default tokens;\n`;

  await writeFile(resolve(dist, "tokens.json"), JSON.stringify(tokens, null, 2) + "\n");
  await writeFile(resolve(dist, "tokens.css"), tokenCss);
  await writeFile(resolve(dist, "tokens.ts"), tokenTs);
}

function sizeLine(name, css) {
  const bytes = Buffer.byteLength(css);
  const gzipBytes = gzipSync(css).byteLength;
  return `${name.padEnd(32)} ${String(bytes).padStart(7)} B ${String(gzipBytes).padStart(7)} B gzip`;
}

await mkdir(dist, { recursive: true });

const report = [];
for (const [outFile, sourceFile] of Object.entries(entries)) {
  const css = await bundle(sourceFile);
  const min = minify(css);
  const cssPath = resolve(dist, outFile);
  const minPath = cssPath.replace(/\.css$/, ".min.css");

  await writeFile(cssPath, css.trim() + "\n");
  await writeFile(minPath, min + "\n");
  report.push(sizeLine(outFile.replace(".css", ".min.css"), min));
}

for (const [outFile, sourceFile] of Object.entries(jsEntries)) {
  const js = await readFile(resolve(root, sourceFile), "utf8");
  const min = minifyJs(js);
  const jsPath = resolve(dist, outFile);
  const minPath = jsPath.replace(/\.js$/, ".min.js");

  await writeFile(jsPath, js.trim() + "\n");
  await writeFile(minPath, min + "\n");
  report.push(sizeLine(outFile.replace(".js", ".min.js"), min));
}

await exportTokens();
await writeFile(resolve(dist, "size-report.txt"), report.join("\n") + "\n");
console.log(report.join("\n"));
