import { readdir, readFile, writeFile, mkdir, cp, stat } from "node:fs/promises";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = resolve(root, "docs-src");
const outDir = resolve(root, "docs");

const VERSION = JSON.parse(await readFile(resolve(root, "package.json"), "utf8")).version;

const NAV = [
  { title: "Get started", items: [
    { href: "/index.html", title: "Introduction" },
    { href: "/guides/installation.html", title: "Installation" },
    { href: "/guides/quickstart.html", title: "Quick start" },
    { href: "/guides/theming.html", title: "Theming & tokens" },
    { href: "/guides/dark-mode.html", title: "Dark mode" },
    { href: "/guides/frameworks.html", title: "Framework integration" }
  ]},
  { title: "Foundations", items: [
    { href: "/guides/layers.html", title: "Cascade layers" },
    { href: "/guides/layout.html", title: "Layout primitives" },
    { href: "/guides/typography.html", title: "Typography" },
    { href: "/guides/colors.html", title: "Colors" },
    { href: "/guides/motion.html", title: "Motion & view transitions" },
    { href: "/guides/accessibility.html", title: "Accessibility" }
  ]},
  { title: "Components", items: [
    { href: "/components/buttons.html", title: "Buttons" },
    { href: "/components/forms.html", title: "Forms" },
    { href: "/components/cards.html", title: "Cards" },
    { href: "/components/badges.html", title: "Badges & chips" },
    { href: "/components/alerts.html", title: "Alerts" },
    { href: "/components/dialog.html", title: "Dialog & drawer" },
    { href: "/components/dropdown.html", title: "Dropdown" },
    { href: "/components/popover.html", title: "Popover" },
    { href: "/components/tooltip.html", title: "Tooltip" },
    { href: "/components/tabs.html", title: "Tabs" },
    { href: "/components/segmented.html", title: "Segmented control" },
    { href: "/components/combobox.html", title: "Combobox" },
    { href: "/components/command.html", title: "Command palette" },
    { href: "/components/tag-input.html", title: "Tag input" },
    { href: "/components/stepper.html", title: "Stepper" },
    { href: "/components/accordion.html", title: "Accordion" },
    { href: "/components/toast.html", title: "Toast" },
    { href: "/components/table.html", title: "Table" },
    { href: "/components/avatar.html", title: "Avatar" },
    { href: "/components/pagination.html", title: "Pagination" },
    { href: "/components/breadcrumb.html", title: "Breadcrumb" },
    { href: "/components/progress.html", title: "Progress & spinner" },
    { href: "/components/skeleton.html", title: "Skeleton" },
    { href: "/components/empty.html", title: "Empty state" },
    { href: "/components/stat.html", title: "Stat" }
  ]},
  { title: "Utilities", items: [
    { href: "/utilities/spacing.html", title: "Spacing" },
    { href: "/utilities/flex-grid.html", title: "Flexbox & grid" },
    { href: "/utilities/typography.html", title: "Typography" },
    { href: "/utilities/colors.html", title: "Colors & background" },
    { href: "/utilities/borders.html", title: "Borders & shadows" },
    { href: "/utilities/responsive.html", title: "Responsive & container" }
  ]},
  { title: "Tools", items: [
    { href: "/playground.html", title: "Theme playground" },
    { href: "/showcase.html", title: "Showcase" }
  ]}
];

const flatNav = NAV.flatMap((section) => section.items.map((item) => ({ ...item, section: section.title })));

function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function escapeAttr(s) {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

function inline(text) {
  let out = escapeHtml(text);
  // Inline code
  out = out.replace(/`([^`]+)`/g, (_, code) => `<code>${code}</code>`);
  // Bold and italic
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<em>$2</em>");
  // Links: [text](url)
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, text, url) => `<a href="${escapeAttr(url)}">${text}</a>`);
  return out;
}

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function parseMarkdown(src) {
  // First, parse frontmatter
  const fmMatch = src.match(/^---\s*\n([\s\S]+?)\n---\s*\n/);
  let frontmatter = {};
  let body = src;
  if (fmMatch) {
    body = src.slice(fmMatch[0].length);
    for (const line of fmMatch[1].split("\n")) {
      const m = line.match(/^([\w-]+):\s*(.+)$/);
      if (m) frontmatter[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
    }
  }

  // Extract demo blocks first to protect them
  const demos = [];
  body = body.replace(/<demo>([\s\S]*?)<\/demo>/g, (_, raw) => {
    const trimmed = raw.replace(/^\n+/, "").replace(/\s+$/, "");
    const idx = demos.length;
    demos.push(trimmed);
    return `\n\n@@DEMO_${idx}@@\n\n`;
  });

  // Extract code blocks to protect from other processing
  const codeBlocks = [];
  body = body.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
    const idx = codeBlocks.length;
    codeBlocks.push({ lang: lang || "", code: code.replace(/\n$/, "") });
    return `\n\n@@CODE_${idx}@@\n\n`;
  });

  // Process line-by-line
  const lines = body.split("\n");
  const out = [];
  const headings = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Empty line
    if (!line.trim()) { i++; continue; }

    // Code block placeholder
    const codeMatch = line.trim().match(/^@@CODE_(\d+)@@$/);
    if (codeMatch) {
      const { lang, code } = codeBlocks[Number(codeMatch[1])];
      const langLabel = lang || "code";
      out.push(`<div class="b-code"><div class="b-code-head"><span>${langLabel}</span><button class="b-code-copy" type="button" data-b-copy>Copy</button></div><pre tabindex="0"><code>${escapeHtml(code)}</code></pre></div>`);
      i++; continue;
    }

    // Demo placeholder
    const demoMatch = line.trim().match(/^@@DEMO_(\d+)@@$/);
    if (demoMatch) {
      const html = demos[Number(demoMatch[1])];
      out.push(`<section class="b-demo"><div class="b-demo-preview">${html}</div><div class="b-code"><div class="b-code-head"><span>html</span><button class="b-code-copy" type="button" data-b-copy>Copy</button></div><pre tabindex="0"><code>${escapeHtml(html)}</code></pre></div></section>`);
      i++; continue;
    }

    // Headings
    const h = line.match(/^(#{1,6})\s+(.+)$/);
    if (h) {
      const level = h[1].length;
      const text = h[2].trim();
      const id = slugify(text);
      if (level <= 3) headings.push({ level, text, id });
      out.push(`<h${level} id="${id}"><a class="b-anchor-link" href="#${id}" aria-label="Anchor link">${inline(text)}</a></h${level}>`);
      i++; continue;
    }

    // Unordered list
    if (/^\s*[-*+]\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\s*[-*+]\s+/.test(lines[i])) {
        items.push(inline(lines[i].replace(/^\s*[-*+]\s+/, "")));
        i++;
      }
      out.push(`<ul>${items.map((t) => `<li>${t}</li>`).join("")}</ul>`);
      continue;
    }

    // Ordered list
    if (/^\s*\d+\.\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(inline(lines[i].replace(/^\s*\d+\.\s+/, "")));
        i++;
      }
      out.push(`<ol>${items.map((t) => `<li>${t}</li>`).join("")}</ol>`);
      continue;
    }

    // Blockquote
    if (/^>\s?/.test(line)) {
      const buf = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        buf.push(lines[i].replace(/^>\s?/, ""));
        i++;
      }
      out.push(`<blockquote>${inline(buf.join(" "))}</blockquote>`);
      continue;
    }

    // HTML passthrough
    if (line.trim().startsWith("<")) {
      const buf = [line];
      i++;
      while (i < lines.length && lines[i].trim() !== "") {
        buf.push(lines[i]);
        i++;
      }
      out.push(buf.join("\n"));
      continue;
    }

    // Paragraph
    const buf = [line];
    i++;
    while (i < lines.length && lines[i].trim() !== "" && !/^(#{1,6})\s/.test(lines[i]) && !/^@@/.test(lines[i].trim())) {
      buf.push(lines[i]);
      i++;
    }
    out.push(`<p>${inline(buf.join(" "))}</p>`);
  }

  return { frontmatter, html: out.join("\n"), headings };
}

function relativeHref(currentPath, targetPath) {
  // Both paths are absolute starting with /. Compute relative.
  const fromParts = currentPath.split("/").slice(1, -1);
  const toParts = targetPath.split("/").slice(1);
  let common = 0;
  while (common < fromParts.length && common < toParts.length - 1 && fromParts[common] === toParts[common]) common++;
  const up = "../".repeat(fromParts.length - common) || "./";
  const down = toParts.slice(common).join("/");
  return up + down;
}

function navMarkup(currentPath) {
  const sections = NAV.map((section) => {
    const items = section.items.map((item) => {
      const isActive = item.href === currentPath;
      const href = relativeHref(currentPath, item.href);
      return `<li><a class="docs-nav-link${isActive ? " is-active" : ""}" href="${href}">${item.title}</a></li>`;
    }).join("");
    return `<div class="docs-nav-section"><div class="docs-nav-title">${section.title}</div><ul class="docs-nav-list">${items}</ul></div>`;
  }).join("");
  return sections;
}

function tocMarkup(headings) {
  if (!headings.length) return "";
  const items = headings.filter((h) => h.level === 2 || h.level === 3).map((h) => {
    return `<li class="docs-toc-${h.level}"><a href="#${h.id}">${escapeHtml(h.text)}</a></li>`;
  }).join("");
  return `<aside class="docs-toc" aria-label="On this page"><div class="docs-toc-title">On this page</div><ul>${items}</ul></aside>`;
}

function shell({ title, description, content, currentPath, headings, hideToc, bodyClass = "" }) {
  const fullTitle = currentPath === "/index.html" ? "BlastCSS — Modern, fast, framework-agnostic CSS" : `${title} — BlastCSS`;
  const desc = description || "BlastCSS is a tiny, modern, framework-agnostic CSS framework built on cascade layers, OKLCH tokens, and container queries.";
  const depth = currentPath.split("/").length - 2; // count of directories below docs/
  const rel = depth > 0 ? "../".repeat(depth) : "./";
  const distRel = `${rel}../dist/`;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="${escapeAttr(desc)}">
    <meta name="theme-color" content="#0c1016">
    <title>${escapeHtml(fullTitle)}</title>
    <link rel="stylesheet" href="${distRel}blast.min.css">
    <link rel="stylesheet" href="${rel}site.css">
    <script type="module" src="${distRel}blast.js"></script>
    <script defer src="${rel}site.js"></script>
    <script>(function(){try{var t=localStorage.getItem("b-theme");if(t)document.documentElement.dataset.theme=t;}catch(e){}})();</script>
  </head>
  <body class="${bodyClass}">
    <a class="b-skip-link" href="#main">Skip to content</a>

    <header class="docs-header">
      <div class="docs-header-inner">
        <a class="docs-brand" href="${rel}index.html" aria-label="BlastCSS home">
          <span class="docs-mark" aria-hidden="true">B</span>
          <span class="docs-brand-name">BlastCSS</span>
          <span class="b-badge b-badge-neutral docs-version">v${VERSION}</span>
        </a>
        <button class="docs-menu-btn b-icon-btn" type="button" aria-label="Toggle menu" data-docs-menu>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
        </button>
        <div class="docs-search-wrap">
          <button class="docs-search" type="button" data-docs-search>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
            <span>Search docs</span>
            <kbd class="b-kbd">⌘K</kbd>
          </button>
        </div>
        <nav class="docs-top-nav" aria-label="Primary">
          <a href="${rel}components/buttons.html">Components</a>
          <a href="${rel}guides/theming.html">Theming</a>
          <a href="${rel}playground.html">Playground</a>
          <a href="https://github.com/blastcss/blastcss" rel="noopener">GitHub</a>
        </nav>
        <button class="b-icon-btn docs-theme-toggle" type="button" data-b-toggle="theme" aria-label="Toggle dark mode">
          <svg class="docs-icon-sun" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
          <svg class="docs-icon-moon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"/></svg>
        </button>
      </div>
    </header>

    <div class="docs-shell">
      <aside class="docs-sidebar" data-docs-sidebar aria-label="Documentation">
        <nav class="docs-nav">${navMarkup(currentPath)}</nav>
      </aside>

      <main id="main" class="docs-main">
        <article class="docs-article">
          ${content}
        </article>
        ${hideToc ? "" : tocMarkup(headings)}
      </main>
    </div>

    <dialog id="docs-search-dialog" class="b-command" aria-label="Search documentation">
      <div class="b-command-search">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
        <input type="search" placeholder="Search components, utilities, guides…" aria-label="Search">
        <kbd class="b-kbd">esc</kbd>
      </div>
      <ul class="b-command-list" data-docs-search-list></ul>
    </dialog>
  </body>
</html>`;
}

async function ensureDir(p) { await mkdir(dirname(p), { recursive: true }); }

async function walkMd(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walkMd(full));
    else if (entry.name.endsWith(".md")) files.push(full);
  }
  return files;
}

async function buildPage(mdPath) {
  const src = await readFile(mdPath, "utf8");
  const rel = relative(srcDir, mdPath);
  const outPath = resolve(outDir, rel.replace(/\.md$/, ".html"));
  const currentPath = "/" + relative(outDir, outPath).replace(/\\/g, "/");

  const { frontmatter, html, headings } = parseMarkdown(src);
  const title = frontmatter.title || headings[0]?.text || "BlastCSS";
  const description = frontmatter.description;

  const articleHead = `<header class="docs-article-head">
    ${frontmatter.section ? `<div class="docs-eyebrow">${escapeHtml(frontmatter.section)}</div>` : ""}
    <h1>${escapeHtml(title)}</h1>
    ${frontmatter.lede ? `<p class="docs-lede">${escapeHtml(frontmatter.lede)}</p>` : ""}
  </header>`;

  // Strip the original h1 if it was rendered (the heading first)
  const stripFirstH1 = html.replace(/^<h1[^>]*>[\s\S]*?<\/h1>\n?/, "");

  const content = articleHead + stripFirstH1;
  const page = shell({
    title,
    description,
    content,
    currentPath,
    headings: headings.filter((h) => h.level > 1),
    hideToc: frontmatter.toc === "false",
    bodyClass: "docs-body"
  });

  await ensureDir(outPath);
  await writeFile(outPath, page);
  return { url: currentPath, title, description, headings };
}

async function buildLanding(searchIndex) {
  const html = await readFile(resolve(srcDir, "_landing.html"), "utf8");
  const out = shell({
    title: "BlastCSS",
    description: "BlastCSS — modern, fast, framework-agnostic CSS framework with OKLCH tokens, container queries, and zero dependencies.",
    content: html,
    currentPath: "/index.html",
    headings: [],
    hideToc: true,
    bodyClass: "docs-body docs-landing"
  });
  await writeFile(resolve(outDir, "index.html"), out);
}

async function buildPlayground() {
  const html = await readFile(resolve(srcDir, "_playground.html"), "utf8");
  const out = shell({
    title: "Theme Playground",
    description: "Live theme playground for BlastCSS — adjust tokens and copy them into your project.",
    content: html,
    currentPath: "/playground.html",
    headings: [],
    hideToc: true,
    bodyClass: "docs-body"
  });
  await writeFile(resolve(outDir, "playground.html"), out);
}

async function buildShowcase() {
  const html = await readFile(resolve(srcDir, "_showcase.html"), "utf8");
  const out = shell({
    title: "Showcase",
    description: "Realistic interfaces built with BlastCSS — dashboard, marketing, and forms.",
    content: html,
    currentPath: "/showcase.html",
    headings: [],
    hideToc: true,
    bodyClass: "docs-body"
  });
  await writeFile(resolve(outDir, "showcase.html"), out);
}

async function writeSearchIndex(pages) {
  // Store URLs relative to docs/ root (no leading slash) so they work with any deploy path.
  const index = pages.map((p) => ({
    title: p.title,
    url: p.url.replace(/^\//, ""),
    description: p.description || "",
    headings: p.headings.filter((h) => h.level === 2).map((h) => h.text)
  }));
  await writeFile(resolve(outDir, "search-index.json"), JSON.stringify(index));
}

async function copyAsset(src, dst) {
  await ensureDir(dst);
  await cp(src, dst);
}

async function exists(p) {
  try { await stat(p); return true; } catch { return false; }
}

async function main() {
  await mkdir(outDir, { recursive: true });

  const mdFiles = await walkMd(srcDir);
  const pages = [];

  for (const file of mdFiles) {
    const meta = await buildPage(file);
    pages.push(meta);
  }

  if (await exists(resolve(srcDir, "_landing.html"))) {
    await buildLanding();
    pages.push({ url: "/index.html", title: "BlastCSS — Modern, fast, framework-agnostic CSS", description: "A modern CSS framework built on cascade layers, OKLCH tokens, and container queries.", headings: [] });
  }
  if (await exists(resolve(srcDir, "_playground.html"))) {
    await buildPlayground();
    pages.push({ url: "/playground.html", title: "Theme playground", description: "Live theme builder for BlastCSS — adjust tokens and copy them.", headings: [] });
  }
  if (await exists(resolve(srcDir, "_showcase.html"))) {
    await buildShowcase();
    pages.push({ url: "/showcase.html", title: "Showcase", description: "Realistic interfaces built with BlastCSS.", headings: [] });
  }

  // Copy site assets
  if (await exists(resolve(srcDir, "site.css"))) await copyAsset(resolve(srcDir, "site.css"), resolve(outDir, "site.css"));
  if (await exists(resolve(srcDir, "site.js"))) await copyAsset(resolve(srcDir, "site.js"), resolve(outDir, "site.js"));

  await writeSearchIndex(pages);

  console.log(`docs:     ${pages.length} pages built`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
