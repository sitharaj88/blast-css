import { readdir, readFile, writeFile, mkdir, cp, stat } from "node:fs/promises";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = resolve(root, "docs-src");
const outDir = resolve(root, "docs");

const VERSION = JSON.parse(await readFile(resolve(root, "package.json"), "utf8")).version;
const AUTHOR = "Sitharaj Seenivasan";
const REPO_URL = "https://github.com/sitharaj88/blast-css";
const GH_URL = "https://github.com/sitharaj88";
const LINKEDIN_URL = "https://www.linkedin.com/in/Sitharaj08";
const COFFEE_URL = "https://www.buymeacoffee.com/sitharaj88";

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

function flatNavList() {
  return NAV.flatMap((section) => section.items.map((item) => ({ ...item, section: section.title })));
}
let flatNav = flatNavList();

// ─────────────────────────────────────────────────────────────────
// Inline assets
// ─────────────────────────────────────────────────────────────────

const LOGO_SVG = `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="oklch(62% 0.22 264)"/>
      <stop offset="100%" stop-color="oklch(58% 0.22 220)"/>
    </linearGradient>
  </defs>
  <rect x="2" y="2" width="28" height="28" rx="8" fill="url(#bg)"/>
  <path d="M11 9h7.5a4.5 4.5 0 0 1 2.4 8.3A5 5 0 0 1 18.5 23H11V9Zm3 3v3.2h4a1.6 1.6 0 1 0 0-3.2h-4Zm0 6v3.2h4.5a1.6 1.6 0 1 0 0-3.2H14Z" fill="#fff"/>
</svg>`;

const FAVICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#5b6cff"/>
      <stop offset="100%" stop-color="#3aa8ff"/>
    </linearGradient>
  </defs>
  <rect width="32" height="32" rx="8" fill="url(#g)"/>
  <path d="M11 9h7.5a4.5 4.5 0 0 1 2.4 8.3A5 5 0 0 1 18.5 23H11V9Zm3 3v3.2h4a1.6 1.6 0 1 0 0-3.2h-4Zm0 6v3.2h4.5a1.6 1.6 0 1 0 0-3.2H14Z" fill="#fff"/>
</svg>`;

// ─────────────────────────────────────────────────────────────────
// Server-side syntax highlighter
// ─────────────────────────────────────────────────────────────────

const KW_JS = ["import", "export", "from", "as", "const", "let", "var", "function", "class", "extends", "return", "if", "else", "for", "while", "do", "break", "continue", "new", "this", "async", "await", "try", "catch", "finally", "throw", "typeof", "instanceof", "in", "of", "default", "case", "switch", "null", "undefined", "true", "false", "interface", "type", "enum", "void", "static", "public", "private", "protected", "readonly"];

const grammars = {
  html: /(?<comment><!--[\s\S]*?-->)|(?<doctype><!doctype[^>]*>|<!DOCTYPE[^>]*>)|(?<tag><\/?[a-zA-Z][\w-]*)|(?<attr>\s[a-zA-Z-][\w-]*)(?==)|(?<string>"[^"\n]*"|'[^'\n]*')|(?<punc>\/?>)/g,

  css: /(?<comment>\/\*[\s\S]*?\*\/)|(?<atrule>@[a-zA-Z-]+)|(?<selector>(?:^|\s|,|>|~|\+)(?:\.|#)[a-zA-Z][\w-]*|::?[a-z][a-z-]*(?:\([^)]*\))?|&)|(?<string>"[^"\n]*"|'[^'\n]*')|(?<number>#[0-9a-fA-F]{3,8}\b|-?\d*\.?\d+(?:rem|em|px|%|s|ms|deg|fr|vh|vw|dvh|dvw|svh|svw|ch|cqi|cqb|cqw|cqh)?\b)|(?<property>--[\w-]+)|(?<func>[a-zA-Z-]+(?=\())|(?<keyword>!important|\bimportant\b|\binherit\b|\bauto\b|\bnone\b|\binitial\b|\bunset\b|\btransparent\b|\bcurrentColor\b)/g,

  js: new RegExp(`(?<comment>\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/)|(?<string>"(?:[^"\\\\\\n]|\\\\.)*"|'(?:[^'\\\\\\n]|\\\\.)*'|\`(?:[^\`\\\\]|\\\\.)*\`)|(?<keyword>\\b(?:${KW_JS.join("|")})\\b)|(?<number>\\b\\d+(?:\\.\\d+)?\\b)|(?<func>[a-zA-Z_$][\\w$]*(?=\\())`, "g"),

  bash: /(?<comment>#[^\n]*)|(?<string>"[^"\n]*"|'[^'\n]*')|(?<flag>(?<=\s)--?[\w-]+)|(?<number>\b\d+\b)/gm,

  json: /(?<string>"(?:[^"\\\n]|\\.)*")|(?<number>-?\d*\.?\d+)|(?<keyword>\btrue\b|\bfalse\b|\bnull\b)|(?<punc>[{}\[\],:])/g
};

const langAlias = { ts: "js", tsx: "jsx", jsx: "js", mjs: "js", cjs: "js", svelte: "html", vue: "html", astro: "html", shell: "bash", sh: "bash", yaml: "json", yml: "json" };

function highlight(code, lang) {
  if (!lang) return escapeHtml(code);
  const key = langAlias[lang] || lang;
  const grammar = grammars[key];
  if (!grammar) return escapeHtml(code);

  const re = new RegExp(grammar.source, grammar.flags);
  let out = "";
  let lastIdx = 0;
  for (const m of code.matchAll(re)) {
    if (m.index > lastIdx) out += escapeHtml(code.slice(lastIdx, m.index));
    let token = null;
    for (const name in m.groups) {
      if (m.groups[name] !== undefined) { token = name; break; }
    }
    out += `<span class="t-${token}">${escapeHtml(m[0])}</span>`;
    lastIdx = m.index + m[0].length;
  }
  if (lastIdx < code.length) out += escapeHtml(code.slice(lastIdx));
  return out;
}

// ─────────────────────────────────────────────────────────────────
// Markdown
// ─────────────────────────────────────────────────────────────────

function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function escapeAttr(s) {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

function inline(text) {
  let out = escapeHtml(text);
  out = out.replace(/`([^`]+)`/g, (_, code) => `<code>${code}</code>`);
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<em>$2</em>");
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, t, url) => `<a href="${escapeAttr(url)}">${t}</a>`);
  return out;
}

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function codeBlock(code, lang) {
  const langLabel = lang || "text";
  const highlighted = highlight(code, lang);
  return `<figure class="b-code" data-lang="${escapeAttr(langLabel)}">
    <figcaption class="b-code-head">
      <span class="b-code-lang">${langLabel}</span>
      <button class="b-code-copy" type="button" data-b-copy aria-label="Copy code">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>
        <span>Copy</span>
      </button>
    </figcaption>
    <pre tabindex="0"><code>${highlighted}</code></pre>
  </figure>`;
}

function demoBlock(html) {
  // Multi-variant detection: lines starting with `## Variant Name` split into tabs.
  const variantParts = html.split(/^##\s+(.+)$/m);
  if (variantParts.length > 1) {
    // The first chunk before any `## ` heading is preamble (often empty).
    const preamble = variantParts[0].trim();
    const variants = [];
    for (let i = 1; i < variantParts.length; i += 2) {
      const name = variantParts[i].trim();
      const body = (variantParts[i + 1] || "").trim();
      variants.push({ name, body });
    }
    if (variants.length > 1) return demoVariantsBlock(variants, preamble);
  }
  return demoSingle(html);
}

function demoSingle(html) {
  return `<section class="b-demo">
    <div class="b-demo-bar">
      <div class="b-demo-tabs" role="tablist">
        <button class="b-demo-tab is-active" type="button" role="tab" aria-selected="true" data-tab="preview">Preview</button>
        <button class="b-demo-tab" type="button" role="tab" aria-selected="false" data-tab="code">Code</button>
      </div>
      <div class="b-demo-toolbar">
        <button class="b-demo-theme" type="button" data-demo-theme aria-label="Toggle preview theme" title="Toggle preview theme">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"/></svg>
        </button>
      </div>
    </div>
    <div class="b-demo-preview" role="tabpanel" data-panel="preview">${html}</div>
    <div class="b-demo-code" role="tabpanel" data-panel="code" hidden>${codeBlock(html, "html")}</div>
  </section>`;
}

function demoVariantsBlock(variants, preamble) {
  const variantTabs = variants.map((v, i) => `<button class="b-demo-variant-tab${i === 0 ? " is-active" : ""}" type="button" role="tab" aria-selected="${i === 0}" data-variant="${i}">${escapeHtml(v.name)}</button>`).join("");
  const previews = variants.map((v, i) => `<div class="b-demo-variant${i === 0 ? " is-active" : ""}" data-variant-pane="${i}">
    <div class="b-demo-preview" role="tabpanel" data-panel="preview">${preamble}${v.body}</div>
    <div class="b-demo-code" role="tabpanel" data-panel="code" hidden>${codeBlock((preamble ? preamble + "\n" : "") + v.body, "html")}</div>
  </div>`).join("");

  return `<section class="b-demo b-demo-variants">
    <div class="b-demo-bar">
      <div class="b-demo-tabs" role="tablist">
        <button class="b-demo-tab is-active" type="button" role="tab" aria-selected="true" data-tab="preview">Preview</button>
        <button class="b-demo-tab" type="button" role="tab" aria-selected="false" data-tab="code">Code</button>
      </div>
      <div class="b-demo-toolbar">
        <button class="b-demo-theme" type="button" data-demo-theme aria-label="Toggle preview theme" title="Toggle preview theme">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"/></svg>
        </button>
      </div>
    </div>
    <div class="b-demo-variant-tabs" role="tablist">${variantTabs}</div>
    <div class="b-demo-variants-body">${previews}</div>
  </section>`;
}

function apiBlock(rows) {
  // rows is an array of {class, type, default, description}
  const headerRow = `<tr>
    <th scope="col">Name</th>
    <th scope="col">Type</th>
    <th scope="col">Default</th>
    <th scope="col">Description</th>
  </tr>`;
  const bodyRows = rows.map((r) => `<tr>
    <td>
      <code class="docs-api-name">${inline(r.name)}</code>
      <button class="docs-api-copy" type="button" data-b-copy data-copy-text="${escapeAttr(stripTagsForCopy(r.name))}" aria-label="Copy ${escapeAttr(stripTagsForCopy(r.name))}">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>
      </button>
    </td>
    <td><code class="docs-api-type">${inline(r.type || "—")}</code></td>
    <td><code class="docs-api-default">${inline(r.default || "—")}</code></td>
    <td>${inline(r.description || "")}</td>
  </tr>`).join("");
  return `<div class="docs-api-table-wrap">
    <table class="docs-api-table">
      <thead>${headerRow}</thead>
      <tbody>${bodyRows}</tbody>
    </table>
  </div>`;
}

function stripTagsForCopy(s) {
  return s.replace(/`([^`]+)`/g, "$1");
}

function parseApi(raw) {
  // Markdown-table form:
  //   name | type | default | description
  //   ---  | ---  | ---     | ---
  //   .b-btn | base | — | Default button
  const lines = raw.trim().split("\n").map((l) => l.trim()).filter(Boolean);
  const rows = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.includes("|")) continue;
    if (/^[\s|:-]+$/.test(line)) continue; // separator row
    const cells = line.split("|").map((c) => c.trim()).filter((_, idx, arr) => idx > 0 || arr[0] !== "" ? true : false);
    // Trim leading/trailing empty cells from leading/trailing pipes.
    while (cells.length && cells[0] === "") cells.shift();
    while (cells.length && cells[cells.length - 1] === "") cells.pop();
    if (rows.length === 0 && cells.some((c) => /^name$/i.test(c))) continue; // header
    if (cells.length < 2) continue;
    rows.push({
      name: cells[0] || "",
      type: cells[1] || "",
      default: cells[2] || "",
      description: cells[3] || ""
    });
  }
  return rows;
}

function parseMarkdown(src) {
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

  const demos = [];
  body = body.replace(/<demo>([\s\S]*?)<\/demo>/g, (_, raw) => {
    const trimmed = raw.replace(/^\n+/, "").replace(/\s+$/, "");
    const idx = demos.length;
    demos.push(trimmed);
    return `\n\n@@DEMO_${idx}@@\n\n`;
  });

  const apis = [];
  body = body.replace(/<api>([\s\S]*?)<\/api>/g, (_, raw) => {
    const idx = apis.length;
    apis.push(parseApi(raw));
    return `\n\n@@API_${idx}@@\n\n`;
  });

  const codeBlocks = [];
  body = body.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
    const idx = codeBlocks.length;
    codeBlocks.push({ lang: lang || "", code: code.replace(/\n$/, "") });
    return `\n\n@@CODE_${idx}@@\n\n`;
  });

  const lines = body.split("\n");
  const out = [];
  const headings = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) { i++; continue; }

    const codeMatch = line.trim().match(/^@@CODE_(\d+)@@$/);
    if (codeMatch) {
      const { lang, code } = codeBlocks[Number(codeMatch[1])];
      out.push(codeBlock(code, lang));
      i++; continue;
    }

    const demoMatch = line.trim().match(/^@@DEMO_(\d+)@@$/);
    if (demoMatch) {
      out.push(demoBlock(demos[Number(demoMatch[1])]));
      i++; continue;
    }

    const apiMatch = line.trim().match(/^@@API_(\d+)@@$/);
    if (apiMatch) {
      out.push(apiBlock(apis[Number(apiMatch[1])]));
      i++; continue;
    }

    const h = line.match(/^(#{1,6})\s+(.+)$/);
    if (h) {
      const level = h[1].length;
      const text = h[2].trim();
      const id = slugify(text);
      if (level <= 3) headings.push({ level, text, id });
      out.push(`<h${level} id="${id}"><a class="b-anchor-link" href="#${id}" aria-label="Anchor link">${inline(text)}</a></h${level}>`);
      i++; continue;
    }

    if (/^\s*[-*+]\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\s*[-*+]\s+/.test(lines[i])) {
        items.push(inline(lines[i].replace(/^\s*[-*+]\s+/, "")));
        i++;
      }
      out.push(`<ul>${items.map((t) => `<li>${t}</li>`).join("")}</ul>`);
      continue;
    }

    if (/^\s*\d+\.\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(inline(lines[i].replace(/^\s*\d+\.\s+/, "")));
        i++;
      }
      out.push(`<ol>${items.map((t) => `<li>${t}</li>`).join("")}</ol>`);
      continue;
    }

    if (/^>\s?/.test(line)) {
      const buf = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        buf.push(lines[i].replace(/^>\s?/, ""));
        i++;
      }
      const text = buf.join("\n").trim();
      const calloutMatch = text.match(/^\[!(NOTE|TIP|WARNING|IMPORTANT|DANGER)\]\s*\n?([\s\S]*)$/i);
      if (calloutMatch) {
        const kind = calloutMatch[1].toLowerCase();
        const body = calloutMatch[2].trim();
        const icons = {
          note: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>',
          tip: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.74V17h8v-2.26A7 7 0 0 0 12 2Z"/></svg>',
          warning: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"/><path d="M12 9v4M12 17h.01"/></svg>',
          important: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v8M12 14h.01M12 22A10 10 0 1 0 12 2a10 10 0 0 0 0 20Z"/></svg>',
          danger: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg>'
        };
        const titles = { note: "Note", tip: "Tip", warning: "Warning", important: "Important", danger: "Danger" };
        out.push(`<aside class="docs-callout docs-callout-${kind}" role="note">
          <div class="docs-callout-head">${icons[kind]}<span>${titles[kind]}</span></div>
          <div class="docs-callout-body">${inline(body)}</div>
        </aside>`);
      } else {
        out.push(`<blockquote>${inline(text.replace(/\n/g, " "))}</blockquote>`);
      }
      continue;
    }

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

// ─────────────────────────────────────────────────────────────────
// Shell helpers
// ─────────────────────────────────────────────────────────────────

function relativeHref(currentPath, targetPath) {
  const fromParts = currentPath.split("/").slice(1, -1);
  const toParts = targetPath.split("/").slice(1);
  let common = 0;
  while (common < fromParts.length && common < toParts.length - 1 && fromParts[common] === toParts[common]) common++;
  const up = "../".repeat(fromParts.length - common) || "./";
  const down = toParts.slice(common).join("/");
  return up + down;
}

// Metadata collected in a pre-pass: url -> { status, keyboard, screenReader, browser, lede, title, description }
let META = {};

function statusBadge(status) {
  if (!status) return "";
  const map = { stable: "Stable", beta: "Beta", new: "New", preview: "Preview", deprecated: "Deprecated" };
  const label = map[status.toLowerCase()] || status;
  return `<span class="docs-nav-status docs-nav-status-${status.toLowerCase()}" aria-label="${label}">${label}</span>`;
}

function navMarkup(currentPath) {
  return NAV.map((section) => {
    const items = section.items.map((item) => {
      const isActive = item.href === currentPath;
      const href = relativeHref(currentPath, item.href);
      const meta = META[item.href] || {};
      const status = meta.status === "new" || meta.status === "beta" ? statusBadge(meta.status) : "";
      return `<li><a class="docs-nav-link${isActive ? " is-active" : ""}" href="${href}">${item.title}${status}</a></li>`;
    }).join("");
    return `<div class="docs-nav-section"><div class="docs-nav-title">${section.title}</div><ul class="docs-nav-list">${items}</ul></div>`;
  }).join("");
}

function componentInfoBar(meta) {
  if (!meta) return "";
  const items = [];
  if (meta.status) {
    items.push(`<span class="docs-info-pill docs-info-status docs-info-status-${meta.status.toLowerCase()}">
      <span class="docs-info-dot" aria-hidden="true"></span>
      ${escapeHtml(meta.status[0].toUpperCase() + meta.status.slice(1))}
    </span>`);
  }
  if (meta.keyboard) {
    items.push(`<span class="docs-info-pill" title="Keyboard accessible">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="14" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M6 14h.01M10 14h.01M14 14h.01M18 14h.01"/></svg>
      Keyboard
    </span>`);
  }
  if (meta["screen-reader"] || meta.screenReader) {
    items.push(`<span class="docs-info-pill" title="Tested with screen readers">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>
      Screen reader
    </span>`);
  }
  if (meta.browser) {
    items.push(`<span class="docs-info-pill" title="Browser support: ${escapeAttr(meta.browser)}">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a14 14 0 0 1 0 20M12 2a14 14 0 0 0 0 20"/></svg>
      ${escapeHtml(meta.browser)}
    </span>`);
  }
  if (!items.length) return "";
  return `<div class="docs-info-bar">${items.join("")}</div>`;
}

function tocMarkup(headings) {
  if (!headings.length) return "";
  const items = headings.filter((h) => h.level === 2 || h.level === 3).map((h) => {
    return `<li class="docs-toc-${h.level}"><a href="#${h.id}">${escapeHtml(h.text)}</a></li>`;
  }).join("");
  return `<aside class="docs-toc" aria-label="On this page"><div class="docs-toc-title">On this page</div><ul>${items}</ul></aside>`;
}

function breadcrumbMarkup(currentPath) {
  const item = flatNav.find((n) => n.href === currentPath);
  if (!item || currentPath === "/index.html") return "";
  const homeHref = relativeHref(currentPath, "/index.html");
  return `<nav class="docs-breadcrumb" aria-label="Breadcrumb">
    <ol>
      <li><a href="${homeHref}">Docs</a></li>
      <li>${escapeHtml(item.section)}</li>
      <li aria-current="page">${escapeHtml(item.title)}</li>
    </ol>
  </nav>`;
}

function prevNextMarkup(currentPath) {
  const idx = flatNav.findIndex((n) => n.href === currentPath);
  if (idx < 0) return "";
  const prev = idx > 0 ? flatNav[idx - 1] : null;
  const next = idx < flatNav.length - 1 ? flatNav[idx + 1] : null;
  if (!prev && !next) return "";
  const card = (item, dir) => {
    if (!item) return `<div></div>`;
    const href = relativeHref(currentPath, item.href);
    const arrow = dir === "prev" ? "←" : "→";
    return `<a class="docs-pn-card docs-pn-${dir}" href="${href}">
      <span class="docs-pn-dir">${arrow} ${dir === "prev" ? "Previous" : "Next"}</span>
      <span class="docs-pn-title">${escapeHtml(item.title)}</span>
    </a>`;
  };
  return `<nav class="docs-prev-next" aria-label="Pagination">${card(prev, "prev")}${card(next, "next")}</nav>`;
}

function footerMarkup(currentPath) {
  const sections = NAV.slice(0, 5).map((s) => {
    const items = s.items.slice(0, 6).map((item) => {
      const href = relativeHref(currentPath, item.href);
      return `<li><a href="${href}">${item.title}</a></li>`;
    }).join("");
    return `<div class="docs-footer-col">
      <div class="docs-footer-title">${s.title}</div>
      <ul>${items}</ul>
    </div>`;
  }).join("");
  return `<footer class="docs-footer" aria-label="Site footer">
    <div class="docs-footer-inner">
      <div class="docs-footer-brand">
        <div class="docs-brand">
          <span class="docs-mark" aria-hidden="true">${LOGO_SVG}</span>
          <span class="docs-brand-name">BlastCSS</span>
        </div>
        <p>A modern, framework-agnostic CSS framework. MIT licensed.</p>
        <div class="docs-footer-meta">
          <span>v${VERSION}</span>
          <span>·</span>
          <a href="${REPO_URL}">GitHub</a>
          <span>·</span>
          <a href="${REPO_URL}/issues">Issues</a>
          <span>·</span>
          <a href="${REPO_URL}/blob/main/CHANGELOG.md">Changelog</a>
        </div>
        <div class="docs-footer-social">
          <a href="${GH_URL}" rel="noopener" aria-label="GitHub profile">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.51 2.87 8.34 6.84 9.69.5.09.68-.22.68-.49 0-.24-.01-.88-.01-1.72-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.11-1.49-1.11-1.49-.91-.63.07-.62.07-.62 1.01.07 1.54 1.06 1.54 1.06.89 1.57 2.34 1.12 2.91.85.09-.66.35-1.12.63-1.37-2.22-.26-4.55-1.14-4.55-5.06 0-1.12.39-2.03 1.03-2.74-.1-.26-.45-1.31.1-2.72 0 0 .84-.27 2.75 1.04A9.34 9.34 0 0 1 12 6.84c.85.01 1.71.12 2.51.34 1.91-1.31 2.75-1.04 2.75-1.04.55 1.41.2 2.46.1 2.72.64.71 1.03 1.62 1.03 2.74 0 3.93-2.34 4.79-4.57 5.05.36.31.68.93.68 1.88 0 1.36-.01 2.45-.01 2.79 0 .27.18.59.69.49 3.97-1.35 6.83-5.18 6.83-9.69C22 6.58 17.52 2 12 2Z"/></svg>
          </a>
          <a href="${LINKEDIN_URL}" rel="noopener" aria-label="LinkedIn profile">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14ZM8.34 18V9.7H5.67V18h2.67Zm-1.33-9.46a1.55 1.55 0 1 0 0-3.1 1.55 1.55 0 0 0 0 3.1ZM18 18v-4.55c0-2.4-1.28-3.51-2.99-3.51a2.58 2.58 0 0 0-2.34 1.29h-.04V9.7h-2.56V18h2.66v-4.11c0-1.08.2-2.13 1.55-2.13 1.32 0 1.34 1.24 1.34 2.2V18H18Z"/></svg>
          </a>
          <a href="${COFFEE_URL}" rel="noopener" aria-label="Buy me a coffee" class="docs-footer-coffee">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 8h1a4 4 0 0 1 0 8h-1M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8ZM6 1v3M10 1v3M14 1v3"/></svg>
            <span>Buy me a coffee</span>
          </a>
        </div>
      </div>
      <div class="docs-footer-grid">${sections}</div>
    </div>
    <div class="docs-footer-bottom">
      <small>Built with BlastCSS by <a href="${GH_URL}">${escapeHtml(AUTHOR)}</a> · MIT licensed · © ${new Date().getFullYear()}</small>
    </div>
  </footer>`;
}

// ─────────────────────────────────────────────────────────────────
// Page shell
// ─────────────────────────────────────────────────────────────────

function shell({ title, description, content, currentPath, headings, hideToc, bodyClass = "", isLanding = false }) {
  const fullTitle = currentPath === "/index.html" ? "BlastCSS — Modern, fast, framework-agnostic CSS" : `${title} · BlastCSS`;
  const desc = description || "BlastCSS is a tiny, modern, framework-agnostic CSS framework built on cascade layers, OKLCH tokens, and container queries.";
  const depth = currentPath.split("/").length - 2;
  const rel = depth > 0 ? "../".repeat(depth) : "./";
  const distRel = `${rel}../dist/`;
  const ogSlug = currentPath.replace(/^\//, "").replace(/\.html$/, "").replace(/[/\\]/g, "-") || "index";
  const ogImage = `${SITE_BASE}/og/${ogSlug}.png`;
  const ogImageRel = `${rel}og/${ogSlug}.png`;
  const editPath = currentPath.replace(/\.html$/, ".md").replace(/^\//, "");
  const editHref = `${REPO_URL}/edit/main/docs-src/${editPath}`;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="${escapeAttr(desc)}">
    <meta name="author" content="${escapeAttr(AUTHOR)}">
    <meta name="theme-color" content="#0c1016" media="(prefers-color-scheme: dark)">
    <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)">
    <meta property="og:title" content="${escapeAttr(fullTitle)}">
    <meta property="og:description" content="${escapeAttr(desc)}">
    <meta property="og:type" content="website">
    <meta property="og:image" content="${ogImage}">
    <meta name="twitter:card" content="summary_large_image">
    <link rel="icon" type="image/svg+xml" href="${rel}favicon.svg">
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
        <div class="docs-header-start">
          <a class="docs-brand" href="${rel}index.html" aria-label="BlastCSS home">
            <span class="docs-mark" aria-hidden="true">${LOGO_SVG}</span>
            <span class="docs-brand-name">BlastCSS</span>
            <span class="docs-version">v${VERSION}</span>
          </a>
        </div>
        <div class="docs-header-mid">
          <div class="docs-search-wrap">
            <button class="docs-search" type="button" data-docs-search>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
              <span>Search docs</span>
              <kbd class="b-kbd">⌘K</kbd>
            </button>
          </div>
        </div>
        <div class="docs-header-end">
          <nav class="docs-top-nav" aria-label="Primary">
            <a href="${rel}components/buttons.html">Components</a>
            <a href="${rel}guides/theming.html">Theming</a>
            <a href="${rel}playground.html">Playground</a>
            <a href="${REPO_URL}" rel="noopener" class="docs-top-github">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.51 2.87 8.34 6.84 9.69.5.09.68-.22.68-.49 0-.24-.01-.88-.01-1.72-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.11-1.49-1.11-1.49-.91-.63.07-.62.07-.62 1.01.07 1.54 1.06 1.54 1.06.89 1.57 2.34 1.12 2.91.85.09-.66.35-1.12.63-1.37-2.22-.26-4.55-1.14-4.55-5.06 0-1.12.39-2.03 1.03-2.74-.1-.26-.45-1.31.1-2.72 0 0 .84-.27 2.75 1.04A9.34 9.34 0 0 1 12 6.84c.85.01 1.71.12 2.51.34 1.91-1.31 2.75-1.04 2.75-1.04.55 1.41.2 2.46.1 2.72.64.71 1.03 1.62 1.03 2.74 0 3.93-2.34 4.79-4.57 5.05.36.31.68.93.68 1.88 0 1.36-.01 2.45-.01 2.79 0 .27.18.59.69.49 3.97-1.35 6.83-5.18 6.83-9.69C22 6.58 17.52 2 12 2Z"/></svg>
              <span class="b-sr-only">GitHub</span>
            </a>
          </nav>
          <button class="b-icon-btn docs-theme-toggle" type="button" data-b-toggle="theme" aria-label="Toggle dark mode">
            <svg class="docs-icon-sun" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
            <svg class="docs-icon-moon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"/></svg>
          </button>
          ${isLanding ? "" : `<button class="docs-menu-btn b-icon-btn" type="button" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="docs-sidebar" data-docs-menu>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
          </button>`}
        </div>
      </div>
    </header>

    <div class="docs-shell">
      ${isLanding ? "" : `<aside id="docs-sidebar" class="docs-sidebar" data-docs-sidebar aria-label="Documentation">
        <button class="docs-search docs-search-mobile" type="button" data-docs-search>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
          <span>Search docs</span>
        </button>
        <nav class="docs-nav">${navMarkup(currentPath)}</nav>
      </aside>`}

      <main id="main" class="docs-main">
        <article class="docs-article">
          ${breadcrumbMarkup(currentPath)}
          ${content}
          ${isLanding ? "" : `<div class="docs-article-foot">
            <a class="docs-edit-link" href="${editHref}" rel="noopener">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5Z"/></svg>
              Edit this page
            </a>
            ${prevNextMarkup(currentPath)}
          </div>`}
        </article>
        ${hideToc ? "" : tocMarkup(headings)}
      </main>
    </div>

    ${footerMarkup(currentPath)}

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

// ─────────────────────────────────────────────────────────────────
// Page builders
// ─────────────────────────────────────────────────────────────────

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
    ${componentInfoBar(frontmatter)}
  </header>`;

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

async function buildLanding() {
  const html = await readFile(resolve(srcDir, "_landing.html"), "utf8");
  const out = shell({
    title: "BlastCSS",
    description: "BlastCSS — modern, fast, framework-agnostic CSS framework with OKLCH tokens, container queries, and zero dependencies.",
    content: html,
    currentPath: "/index.html",
    headings: [],
    hideToc: true,
    bodyClass: "docs-body docs-landing",
    isLanding: true
  });
  await writeFile(resolve(outDir, "index.html"), out);
}

async function buildPlayground() {
  const html = await readFile(resolve(srcDir, "_playground.html"), "utf8");
  const out = shell({
    title: "Playground",
    description: "Live HTML + CSS editor with token controls. Edit, preview, share — all in the browser.",
    content: html,
    currentPath: "/playground.html",
    headings: [],
    hideToc: true,
    bodyClass: "docs-body docs-playground",
    isLanding: true
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
  const index = pages.map((p) => ({
    title: p.title,
    url: p.url.replace(/^\//, ""),
    description: p.description || "",
    section: p.section || "",
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

async function writeFavicon() {
  await writeFile(resolve(outDir, "favicon.svg"), FAVICON_SVG);
}

// Quick frontmatter-only parse for the metadata pre-pass.
function readFrontmatter(src) {
  const match = src.match(/^---\s*\n([\s\S]+?)\n---\s*\n/);
  if (!match) return {};
  const fm = {};
  for (const line of match[1].split("\n")) {
    const m = line.match(/^([\w-]+):\s*(.+)$/);
    if (m) fm[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
  }
  return fm;
}

async function collectMetadata(mdFiles) {
  const meta = {};
  for (const file of mdFiles) {
    const src = await readFile(file, "utf8");
    const rel = relative(srcDir, file);
    const url = "/" + rel.replace(/\.md$/, ".html").replace(/\\/g, "/");
    meta[url] = readFrontmatter(src);
  }
  return meta;
}

// ─────────────────────────────────────────────────────────────────
// 404 page
// ─────────────────────────────────────────────────────────────────

async function build404() {
  const popular = [
    { href: "/guides/installation.html", title: "Installation", desc: "Get BlastCSS into your project" },
    { href: "/components/buttons.html", title: "Buttons", desc: "Solid, soft, ghost, outline" },
    { href: "/components/forms.html", title: "Forms", desc: "Inputs, switches, validation" },
    { href: "/playground.html", title: "Theme playground", desc: "Live token editor" }
  ];
  const currentPath = "/404.html";
  const popularLinks = popular.map((p) => `<a class="docs-pn-card" href="${relativeHref(currentPath, p.href)}">
    <span class="docs-pn-dir">→ Popular</span>
    <span class="docs-pn-title">${escapeHtml(p.title)}</span>
    <span style="color:var(--b-muted);font-size:var(--b-text-sm)">${escapeHtml(p.desc)}</span>
  </a>`).join("");

  const content = `<header class="docs-article-head" style="text-align:center; border:0; padding-block-start: var(--b-12)">
    <div class="docs-eyebrow">Error 404</div>
    <h1 style="font-size: clamp(2.5rem, 6vw, 4rem)">Page not found</h1>
    <p class="docs-lede">The page you're looking for doesn't exist or has been moved. Try searching the docs, or pick one of the popular pages below.</p>
    <div class="b-cluster" style="justify-content:center; margin-block-start: var(--b-5)">
      <button class="b-btn" type="button" data-docs-search>Search docs (⌘K)</button>
      <a class="b-btn b-btn-secondary" href="${relativeHref(currentPath, "/index.html")}">Back to home</a>
    </div>
  </header>
  <h2 style="text-align:center; margin-block-start: var(--b-10)">Popular pages</h2>
  <div class="docs-prev-next" style="grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr)); margin-block-start: var(--b-4)">
    ${popularLinks}
  </div>`;

  const page = shell({
    title: "404 — Not found",
    description: "The page you're looking for doesn't exist.",
    content,
    currentPath,
    headings: [],
    hideToc: true,
    bodyClass: "docs-body docs-404",
    isLanding: true
  });
  await writeFile(resolve(outDir, "404.html"), page);
}

// ─────────────────────────────────────────────────────────────────
// What's new (CHANGELOG)
// ─────────────────────────────────────────────────────────────────

async function buildChangelogPage() {
  const changelogPath = resolve(root, "CHANGELOG.md");
  if (!await exists(changelogPath)) return;

  const md = await readFile(changelogPath, "utf8");

  // Split into version sections: ## 1.0.0, ## 0.4.0, etc.
  const lines = md.split("\n");
  const versions = [];
  let current = null;
  let inFirstHeading = true;

  for (const line of lines) {
    if (inFirstHeading && line.startsWith("# ")) { inFirstHeading = false; continue; }
    if (line.startsWith("## ")) {
      if (current) versions.push(current);
      current = { title: line.slice(3).trim(), body: [] };
    } else if (current) {
      current.body.push(line);
    }
  }
  if (current) versions.push(current);

  const renderVersion = (v, isLatest) => {
    const { html: bodyHtml } = parseMarkdown(v.body.join("\n"));
    const slug = slugify(v.title);
    return `<article class="docs-changelog-entry" id="v-${slug}">
      <div class="docs-changelog-meta">
        <h2><a class="b-anchor-link" href="#v-${slug}">${escapeHtml(v.title)}</a></h2>
        ${isLatest ? `<span class="b-badge b-badge-success">Latest</span>` : ""}
      </div>
      <div class="docs-changelog-body">${bodyHtml}</div>
    </article>`;
  };

  const articles = versions.map((v, i) => renderVersion(v, i === 0)).join("");

  const articleHead = `<header class="docs-article-head">
    <div class="docs-eyebrow">Tools</div>
    <h1>What's new</h1>
    <p class="docs-lede">Release history for BlastCSS — every feature, fix, and breaking change.</p>
  </header>`;

  const content = `${articleHead}<div class="docs-changelog">${articles}</div>`;

  const page = shell({
    title: "What's new",
    description: "BlastCSS release notes and changelog.",
    content,
    currentPath: "/whats-new.html",
    headings: versions.map((v) => ({ level: 2, text: v.title, id: "v-" + slugify(v.title) })),
    hideToc: false,
    bodyClass: "docs-body"
  });
  await writeFile(resolve(outDir, "whats-new.html"), page);
}

// ─────────────────────────────────────────────────────────────────
// Sitemap + robots.txt
// ─────────────────────────────────────────────────────────────────

const SITE_BASE = "https://sitharaj88.github.io/blast-css";

async function writeSitemap(pages) {
  const today = new Date().toISOString().slice(0, 10);
  const entries = pages.map((p) => {
    const loc = SITE_BASE + (p.url.startsWith("/") ? p.url : "/" + p.url);
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${p.url === "/index.html" ? "1.0" : "0.7"}</priority>
  </url>`;
  }).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
  await writeFile(resolve(outDir, "sitemap.xml"), xml);
}

async function writeRobots() {
  const txt = `User-agent: *
Allow: /

Sitemap: ${SITE_BASE}/sitemap.xml
`;
  await writeFile(resolve(outDir, "robots.txt"), txt);
}

// ─────────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────────

async function main() {
  await mkdir(outDir, { recursive: true });

  const mdFiles = await walkMd(srcDir);

  // Pre-pass: collect frontmatter so navMarkup/info-bar see metadata.
  META = await collectMetadata(mdFiles);

  // Augment NAV with the auto-generated What's new entry under Tools.
  NAV.find((s) => s.title === "Tools").items.push({ href: "/whats-new.html", title: "What's new" });
  flatNav = flatNavList();

  const pages = [];

  for (const file of mdFiles) {
    const meta = await buildPage(file);
    const navItem = flatNav.find((n) => n.href === meta.url);
    pages.push({ ...meta, section: navItem?.section || "" });
  }

  if (await exists(resolve(srcDir, "_landing.html"))) {
    await buildLanding();
    pages.push({ url: "/index.html", title: "BlastCSS — Modern, fast, framework-agnostic CSS", description: "A modern CSS framework built on cascade layers, OKLCH tokens, and container queries.", section: "Get started", headings: [] });
  }
  if (await exists(resolve(srcDir, "_playground.html"))) {
    await buildPlayground();
    pages.push({ url: "/playground.html", title: "Theme playground", description: "Live theme builder for BlastCSS — adjust tokens and copy them.", section: "Tools", headings: [] });
  }
  if (await exists(resolve(srcDir, "_showcase.html"))) {
    await buildShowcase();
    pages.push({ url: "/showcase.html", title: "Showcase", description: "Realistic interfaces built with BlastCSS.", section: "Tools", headings: [] });
  }

  await build404();
  await buildChangelogPage();
  pages.push({ url: "/whats-new.html", title: "What's new", description: "BlastCSS release notes and changelog.", section: "Tools", headings: [] });

  if (await exists(resolve(srcDir, "site.css"))) await copyAsset(resolve(srcDir, "site.css"), resolve(outDir, "site.css"));
  if (await exists(resolve(srcDir, "site.js"))) await copyAsset(resolve(srcDir, "site.js"), resolve(outDir, "site.js"));
  if (await exists(resolve(srcDir, "playground.js"))) await copyAsset(resolve(srcDir, "playground.js"), resolve(outDir, "playground.js"));

  await writeFavicon();
  await writeSearchIndex(pages);
  await writeSitemap(pages);
  await writeRobots();

  console.log(`docs:     ${pages.length} pages, sitemap.xml, robots.txt, 404.html, what's new`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
