<div align="center">

<img src="https://raw.githubusercontent.com/sitharaj88/blast-css/main/docs/favicon.svg" width="84" height="84" alt="BlastCSS logo">

# BlastCSS

**A modern, framework-agnostic CSS framework.**

Cascade layers · OKLCH tokens · `light-dark()` · container queries · popover API · view transitions.<br>
Tiny, fast, **zero build step**, **zero runtime dependencies**.

[![npm version](https://img.shields.io/npm/v/blastcss?style=flat-square&color=4f46e5&label=npm)](https://www.npmjs.com/package/blastcss)
[![License](https://img.shields.io/badge/License-MIT-22c55e?style=flat-square)](LICENSE)
[![Bundle size](https://img.shields.io/badge/gzip-~12%20KB-0ea5e9?style=flat-square)](https://sitharaj88.github.io/blast-css)
[![Tests](https://img.shields.io/badge/Playwright-137%20pass-3b82f6?style=flat-square)](#-verify)
[![Stars](https://img.shields.io/github/stars/sitharaj88/blast-css?style=flat-square&color=eab308)](https://github.com/sitharaj88/blast-css/stargazers)

[**📖 Documentation**](https://sitharaj88.github.io/blast-css) ·
[**🎨 Playground**](https://sitharaj88.github.io/blast-css/playground.html) ·
[**🧩 Components**](https://sitharaj88.github.io/blast-css/components/buttons.html) ·
[**📝 Changelog**](https://sitharaj88.github.io/blast-css/whats-new.html)

<br>

<img src="https://raw.githubusercontent.com/sitharaj88/blast-css/main/docs/og/index.png" alt="BlastCSS — modern, fast, framework-agnostic CSS" width="720">

</div>

---

## ✨ Why BlastCSS

- 🪶 **Tiny** — ~12 KB gzip full bundle (about 2.4× smaller than Bootstrap, with comparable component coverage)
- 🧠 **Modern CSS** — cascade layers, OKLCH, `light-dark()`, container queries, popover API, view transitions
- 🚫 **No build step** — drop a `<link>` and ship. No PostCSS. No Sass. No JS framework.
- 🌍 **Framework-agnostic** — works with React, Vue, Svelte, Astro, Solid, Angular, Rails, Laravel, Django
- 🧩 **40+ components** — buttons, dialog, popover, command palette, combobox, tag input, stepper…
- ♿ **Accessible by default** — focus rings, reduced-motion, semantic HTML, ARIA, Axe-tested in CI
- 🎨 **Themeable** — change one hue token, the whole palette retunes (soft, strong, hover, ring)
- 📱 **Mobile-first** — container queries make components respond to their own width, not the viewport

## 📑 Table of contents

- [Quick start](#-quick-start)
- [Modular bundles](#-modular-bundles)
- [Theming](#-theming)
- [Components](#-components)
- [Layout primitives](#-layout-primitives)
- [Utilities](#-utilities)
- [How it compares](#-how-it-compares)
- [Documentation](#-documentation)
- [Browser support](#-browser-support)
- [Verify](#-verify)
- [Contributing](#-contributing)
- [Author](#-author)
- [Support the project](#-support-the-project)
- [License](#-license)

## 🚀 Quick start

```sh
npm install blastcss
```

```js
import "blastcss";
import { autoInit } from "blastcss/js";

autoInit();
```

That's it. `autoInit()` wires up dialogs, dropdowns, tabs, toasts, popovers, command palettes, comboboxes, tag inputs, and the theme toggle. Most components work without any JavaScript at all.

```html
<button class="b-btn">Hello, BlastCSS</button>
```

## 📦 Modular bundles

Pick the slice that fits — full, layered, or per-section:

| Import path                | Size (gzip) | What you get |
| -------------------------- | ----------- | ------------- |
| `blastcss`                 | **~12 KB**  | Full bundle (everything below combined) |
| `blastcss/core`            | ~5.0 KB     | Tokens · reset · base · layout · forms · a11y · motion |
| `blastcss/components`      | ~5.5 KB     | Buttons · cards · dialog · popover · tabs · accordion · toast · spinner · drawer · progress · table · pagination · breadcrumb · avatar · stat · badge · alert · empty · skeleton |
| `blastcss/components-extra`| ~3.2 KB     | Command palette · combobox · segmented · tag input · stepper · code block · hero |
| `blastcss/utilities`       | ~4.5 KB     | Flex · grid · spacing · color · container-query variants (`@sm:`, `@md:`, `@lg:`) |
| `blastcss/motion`          | ~2.0 KB     | View transitions · animation utilities |
| `blastcss/reset`           | ~0.7 KB     | Modern CSS reset only |
| `blastcss/js`              | ~3.3 KB     | Optional behavior helpers (only what you need) |

Tokens travel as JSON, CSS, or TypeScript for design pipelines:

```js
import tokens from "blastcss/tokens.json";   // { light: { ... }, dark: { ... } }
import { tokens } from "blastcss/tokens.ts"; // typed
```

## 🎨 Theming

Override CSS variables anywhere — no rebuild, no Sass:

```css
:root {
  --b-primary-h: 200;     /* shift hue → re-tunes the whole palette */
  --b-radius: .375rem;    /* tighter corners */
  --b-control: 2.75rem;   /* taller controls */
  --b-font-sans: "Geist", system-ui, sans-serif;
}
```

Toggle dark mode:

```html
<button class="b-icon-btn" data-b-toggle="theme" aria-label="Toggle theme">🌗</button>
```

The bundled JS persists the user's choice to `localStorage`. Dark variants come from `light-dark()` — no double-defining tokens.

> [!TIP]
> Try the live [theme playground](https://sitharaj88.github.io/blast-css/playground.html) — it has sliders for hue, chroma, radius, control height, and weight, plus an HTML+CSS editor with live preview and shareable URLs.

## 🧩 Components

Buttons (primary / secondary / ghost / soft / outline / success / warning / danger), Cards (with header / footer / interactive), Badges, Chips, Alerts, Avatars (with status + groups), Breadcrumbs, Tabs (underline + pill), Tables (striped + hover), Lists, Pagination, Navbar, Menu, Dropdown (`<details>`-based), Modal Dialog, Drawer (left / right / bottom), Popover (native API + anchor positioning), Tooltip, Progress (bar + indeterminate), Spinner, Skeleton, Empty state, Stat, Toast (programmatic), **Segmented control**, **Combobox**, **Command palette (⌘K)**, **Tag input**, **Stepper** (vertical + horizontal), Form fields (input, select, textarea, switch, checkbox, range, file, fieldset, input groups with addons), Code blocks (with copy button), Hero, Kbd, Divider.

## 📐 Layout primitives

`.b-container` (with container-query enabled), `.b-stack`, `.b-cluster`, `.b-split`, `.b-center`, `.b-grid` (auto-fit), `.b-sidebar`, `.b-cover`, `.b-switcher`, `.b-prose`, `.b-spacer`, `.b-subgrid`.

## 🛠 Utilities

Display, flex, grid, gap, margin, padding, sizing, typography, weight, family, colors, gradients, borders, radius, shadows, position, z-index, overflow, opacity, scroll-snap, content-visibility, color-scheme, motion-safe / motion-reduce, and **container-query variants** (`@sm:`, `@md:`, `@lg:`).

## 📊 How it compares

|                                | **BlastCSS** | Tailwind     | Bootstrap | Pico |
| ------------------------------ | ------------ | ------------ | --------- | ---- |
| Full bundle (gzip)             | ✅ **~12 KB**| ~10–45 KB\*  | ~28 KB    | ~7 KB |
| Build step required            | ✅ **No**    | Yes          | No        | No   |
| Pre-built components           | ✅ **40+**   | 0 (utility-only) | 40+   | ~12  |
| OKLCH design tokens            | ✅ **Yes**   | Yes (v4+)    | No        | No   |
| Cascade layers                 | ✅ **Yes**   | Yes (v4+)    | No        | No   |
| Container queries              | ✅ **Yes**   | Yes          | No        | No   |
| Popover API                    | ✅ **Yes**   | No           | No        | No   |
| View Transitions               | ✅ **Yes**   | No           | No        | No   |
| Live theme playground          | ✅ **Yes**   | No           | No        | No   |

<sub>\* depending on JIT output and components used</sub>

## 📚 Documentation

Full docs live at **[sitharaj88.github.io/blast-css](https://sitharaj88.github.io/blast-css)**.

### Get started

| | | |
| --- | --- | --- |
| [📥 Installation](https://sitharaj88.github.io/blast-css/guides/installation.html) | [⚡ Quick start](https://sitharaj88.github.io/blast-css/guides/quickstart.html) | [🎨 Theming & tokens](https://sitharaj88.github.io/blast-css/guides/theming.html) |
| [🌗 Dark mode](https://sitharaj88.github.io/blast-css/guides/dark-mode.html) | [🧩 Framework integration](https://sitharaj88.github.io/blast-css/guides/frameworks.html) | [🎮 Playground](https://sitharaj88.github.io/blast-css/playground.html) |

### Foundations

| | | |
| --- | --- | --- |
| [📚 Cascade layers](https://sitharaj88.github.io/blast-css/guides/layers.html) | [📐 Layout primitives](https://sitharaj88.github.io/blast-css/guides/layout.html) | [🔤 Typography](https://sitharaj88.github.io/blast-css/guides/typography.html) |
| [🎨 Colors](https://sitharaj88.github.io/blast-css/guides/colors.html) | [🎬 Motion & view transitions](https://sitharaj88.github.io/blast-css/guides/motion.html) | [♿ Accessibility](https://sitharaj88.github.io/blast-css/guides/accessibility.html) |

### Components (selected)

| | | | |
| --- | --- | --- | --- |
| [Buttons](https://sitharaj88.github.io/blast-css/components/buttons.html) | [Forms](https://sitharaj88.github.io/blast-css/components/forms.html) | [Dialog](https://sitharaj88.github.io/blast-css/components/dialog.html) | [Popover](https://sitharaj88.github.io/blast-css/components/popover.html) |
| [Tabs](https://sitharaj88.github.io/blast-css/components/tabs.html) | [Accordion](https://sitharaj88.github.io/blast-css/components/accordion.html) | [Combobox](https://sitharaj88.github.io/blast-css/components/combobox.html) | [Command palette](https://sitharaj88.github.io/blast-css/components/command.html) |
| [Toast](https://sitharaj88.github.io/blast-css/components/toast.html) | [Stepper](https://sitharaj88.github.io/blast-css/components/stepper.html) | [Tag input](https://sitharaj88.github.io/blast-css/components/tag-input.html) | [Segmented control](https://sitharaj88.github.io/blast-css/components/segmented.html) |

→ [Browse all 40+ components](https://sitharaj88.github.io/blast-css/components/buttons.html)

To browse the docs locally:

```sh
git clone https://github.com/sitharaj88/blast-css.git
cd blast-css && npm install
npm run build:all && npm run serve
# open http://127.0.0.1:4173
```

## 🌐 Browser support

Evergreen, with progressive enhancement for older browsers via `@supports`:

- ✅ Chrome / Edge **125+**
- ✅ Firefox **128+**
- ✅ Safari **17.4+**

Older browsers fall back to a static hex palette, so the framework still works — just without OKLCH-derived tints, `light-dark()` swaps, and the popover API.

## ✅ Verify

```sh
npm run build         # bundles, exports, minifies — produces dist/
npm run build:docs    # generates docs/ from docs-src/
npm run test:static   # build + benchmark + size + quality + exports + html + visual-manifest
npm run test:browser  # Playwright across Chromium / Firefox / WebKit + mobile Chrome + mobile Safari
npm run verify        # all of the above
```

**Stats:** 137 Playwright tests, 5-browser matrix, 0 Axe violations, gzip-budget enforced, every public class verified in CI.

## 🤝 Contributing

PRs welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) for the rules — keep it CSS-only by default, no runtime dependencies in core, accessible, semantic, and within the size budget.

## 👤 Author

Built and maintained by **Sitharaj Seenivasan**.

<a href="https://github.com/sitharaj88"><img alt="GitHub" src="https://img.shields.io/badge/GitHub-Sitharaj88-181717?style=for-the-badge&logo=github&logoColor=white"></a>
<a href="https://www.linkedin.com/in/Sitharaj08"><img alt="LinkedIn" src="https://img.shields.io/badge/LinkedIn-Sitharaj08-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white"></a>
<a href="https://www.buymeacoffee.com/sitharaj88"><img alt="Buy me a coffee" src="https://img.shields.io/badge/Buy_me_a_coffee-sitharaj88-FFDD00?style=for-the-badge&logo=buymeacoffee&logoColor=black"></a>

## ☕ Support the project

If BlastCSS saves you time, the easiest ways to say thanks:

- ⭐ **Star the repo** on [GitHub](https://github.com/sitharaj88/blast-css) — it genuinely helps adoption
- 🐦 **Share it** with someone building a UI — the smaller this framework gets, the more people benefit
- 🐛 **Open an issue** when something doesn't work — every report makes the next release sharper
- ☕ **Buy me a coffee** — keeps the late-night CSS spec reading going

<a href="https://www.buymeacoffee.com/sitharaj88" target="_blank" rel="noopener">
  <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="50" width="210">
</a>

## 📄 License

[MIT](LICENSE) © [Sitharaj Seenivasan](https://github.com/sitharaj88)
