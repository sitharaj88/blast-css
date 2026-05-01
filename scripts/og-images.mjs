// Generate per-page Open Graph card PNGs (1200×630).
// Reads docs/search-index.json, renders an HTML template via Playwright,
// and writes one PNG per page under docs/og/.

import { mkdir, readFile, writeFile, stat } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const docsDir = resolve(root, "docs");
const ogDir = resolve(docsDir, "og");

const VERSION = JSON.parse(await readFile(resolve(root, "package.json"), "utf8")).version;

function escapeHtml(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function ogTemplate({ title, description, section }) {
  const safeTitle = escapeHtml(title || "BlastCSS");
  const safeDesc = escapeHtml(description || "Modern, framework-agnostic CSS framework. Tiny, fast, no build step.");
  const safeSection = escapeHtml(section || "Documentation");

  return `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { width: 1200px; height: 630px; }
body {
  background:
    radial-gradient(ellipse 800px 600px at 80% 0%, oklch(50% 0.22 264 / .55), transparent 65%),
    radial-gradient(ellipse 600px 500px at 0% 100%, oklch(55% 0.20 320 / .35), transparent 60%),
    linear-gradient(135deg, oklch(20% 0.025 264), oklch(14% 0.020 264));
  color: #fff;
  font-family: "Inter var", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
  padding: 72px 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
}
.grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse 90% 80% at 50% 50%, #000 30%, transparent 80%);
}
.row { display: flex; align-items: center; gap: 18px; position: relative; }
.mark {
  width: 56px; height: 56px; border-radius: 14px;
  background: linear-gradient(135deg, oklch(62% 0.22 264), oklch(58% 0.22 220));
  display: flex; align-items: center; justify-content: center;
  font-weight: 900; font-size: 32px; letter-spacing: -0.02em;
  box-shadow: 0 8px 24px oklch(20% 0.05 264 / .6);
}
.brand { font-size: 28px; font-weight: 800; letter-spacing: -0.02em; }
.version {
  margin-left: auto;
  font-family: ui-monospace, "SFMono-Regular", monospace;
  font-size: 14px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.12);
  padding: 6px 12px;
  border-radius: 999px;
  color: rgba(255,255,255,0.8);
}
.content { position: relative; max-width: 980px; }
.eyebrow {
  display: inline-block;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: oklch(78% 0.16 264);
  margin-bottom: 18px;
}
h1 {
  font-size: 78px;
  font-weight: 850;
  line-height: 1.05;
  letter-spacing: -0.025em;
  margin-bottom: 24px;
  text-wrap: balance;
}
h1 .grad {
  background: linear-gradient(135deg, oklch(78% 0.20 264), oklch(76% 0.18 220));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
p {
  font-size: 26px;
  line-height: 1.45;
  color: rgba(255,255,255,0.7);
  max-width: 880px;
  text-wrap: pretty;
}
.foot {
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 16px;
  color: rgba(255,255,255,0.6);
  position: relative;
  font-family: ui-monospace, "SFMono-Regular", monospace;
}
.foot .dot {
  width: 8px; height: 8px; border-radius: 999px;
  background: oklch(76% 0.18 145);
  box-shadow: 0 0 12px oklch(76% 0.18 145 / .8);
}
</style>
</head>
<body>
<div class="grid"></div>

<div class="row">
  <div class="mark">B</div>
  <div class="brand">BlastCSS</div>
  <div class="version">v${VERSION}</div>
</div>

<div class="content">
  <div class="eyebrow">${safeSection}</div>
  <h1>${highlight(safeTitle)}</h1>
  <p>${safeDesc}</p>
</div>

<div class="foot">
  <span class="dot"></span>
  <span>blastcss · sitharaj88.github.io/blast-css</span>
</div>
</body>
</html>`;
}

// Wrap last word in gradient span for visual punch (only when title is short enough).
function highlight(title) {
  // Split into words; wrap the last 1-2 words if title has at least 3 words
  const parts = title.split(" ");
  if (parts.length < 3) return `<span class="grad">${title}</span>`;
  const headCount = Math.max(1, parts.length - 2);
  const head = parts.slice(0, headCount).join(" ");
  const tail = parts.slice(headCount).join(" ");
  return `${head} <span class="grad">${tail}</span>`;
}

function slugify(url) {
  return url.replace(/^\//, "").replace(/\.html$/, "").replace(/[/\\]/g, "-") || "index";
}

async function exists(p) {
  try { await stat(p); return true; } catch { return false; }
}

async function main() {
  const indexPath = resolve(docsDir, "search-index.json");
  if (!await exists(indexPath)) {
    console.error("og: search-index.json not found — run `npm run build:docs` first.");
    process.exit(1);
  }

  const index = JSON.parse(await readFile(indexPath, "utf8"));
  await mkdir(ogDir, { recursive: true });

  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();

  let count = 0;
  for (const entry of index) {
    const html = ogTemplate({ title: entry.title, description: entry.description, section: entry.section });
    await page.setContent(html, { waitUntil: "networkidle" });
    const slug = slugify(entry.url);
    const out = resolve(ogDir, `${slug}.png`);
    await page.screenshot({ path: out, type: "png", fullPage: false, clip: { x: 0, y: 0, width: 1200, height: 630 }, omitBackground: false });
    count++;
  }

  await browser.close();
  console.log(`og:       ${count} cards generated under docs/og/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
