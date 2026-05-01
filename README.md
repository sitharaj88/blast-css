# BlastCSS

A modern, framework-agnostic CSS framework built on the latest web platform: cascade layers, OKLCH design tokens, container queries, the popover API, anchor positioning, and view transitions. Tiny, fast, no build step, no runtime dependencies.

```text
blast.min.css                  ~12 KB gzip   (full bundle)
blast.core.min.css            ~5.0 KB gzip   (tokens + reset + base + layout + forms + a11y + motion)
blast.components.min.css      ~5.5 KB gzip   (buttons, cards, dialogs, popovers, etc.)
blast.components-extra.min.css ~3.2 KB gzip  (command palette, combobox, segmented, tag input, stepper)
blast.utilities.min.css       ~4.5 KB gzip   (flex/grid/spacing/colors + container query variants)
blast.motion.min.css          ~2.0 KB gzip   (view transitions, animation utilities)
blast.reset.min.css           ~0.7 KB gzip
blast.min.js                  ~3.3 KB gzip   (optional — dialogs, popovers, command palette, theme toggle)
```

## What's modern about this

- **Cascade layers** — predictable specificity. App styles always win without `!important`.
- **OKLCH tokens with `light-dark()`** — perceptually uniform color, dark mode without double-defining variables.
- **Container queries** — components respond to their own width, not the viewport. Drop a card into a sidebar or a hero and it adapts.
- **Native popover & `<dialog>`** — top-layer rendering, automatic light dismiss, with `@starting-style` animations that honor `prefers-reduced-motion`.
- **CSS anchor positioning** — tooltips and popovers anchor without JavaScript on supporting browsers.
- **View Transitions** — cross-document and same-document transitions out of the box.
- **`field-sizing: content`** — textareas grow with input.
- **`text-wrap: balance` / `pretty`** — better headlines and paragraphs by default.
- **Subgrid** where supported.

## Goals

- Faster and smaller than every full-fat UI framework, with more components than every minimal CSS toolkit.
- Works with HTML, React, Vue, Angular, Svelte, Solid, Astro, Rails, Laravel, Django, and any server-rendered app.
- No runtime JavaScript required for most components. No PostCSS, no Sass.
- Native-platform components where possible.
- Accessible defaults — focus rings, reduced motion, semantic HTML, ARIA, Axe-tested in CI.
- Tokens travel — JSON, CSS, and TypeScript exports for design pipelines.

## Documentation

The full website lives in [`docs/`](docs/index.html) — generated from markdown sources in [`docs-src/`](docs-src/) by `npm run build:docs`. To browse locally:

```sh
npm run build && npm run build:docs && npm run serve
# open http://127.0.0.1:4173
```

Highlights:

- [Installation](docs-src/guides/installation.md)
- [Quick start](docs-src/guides/quickstart.md)
- [Theming & tokens](docs-src/guides/theming.md)
- [Dark mode](docs-src/guides/dark-mode.md)
- [Cascade layers](docs-src/guides/layers.md)
- [Layout primitives](docs-src/guides/layout.md)
- [Motion & view transitions](docs-src/guides/motion.md)
- [Accessibility](docs-src/guides/accessibility.md)
- [Framework integration](docs-src/guides/frameworks.md)
- All [components](docs-src/components/) and [utilities](docs-src/utilities/)

Reference docs for contributors:

- [Architecture](docs/architecture.md) · [Public API](docs/public-api.md) · [Quality gates](docs/quality.md) · [Testing](docs/testing.md) · [Browser support](docs/browser-support.md) · [Versioning](docs/versioning.md) · [Release process](docs/release.md) · [1.0 readiness](docs/1.0-readiness.md) · [Phase status](docs/phase-status.md) · [Bootstrap migration](docs/migration-bootstrap.md)

## Install

```sh
npm install blastcss
```

```js
import "blastcss";
import { autoInit } from "blastcss/js";

autoInit();
```

## Modular bundles

```js
import "blastcss/core";              // foundations only
import "blastcss/components";        // buttons, cards, dialog, popover, ...
import "blastcss/components-extra";  // command palette, combobox, segmented, tag input, stepper
import "blastcss/utilities";         // flex, grid, spacing, color
import "blastcss/motion";            // view transitions + animation utilities
import "blastcss/reset";             // 700-byte modern reset
```

## Theming

Override CSS variables anywhere:

```css
:root {
  --b-primary-h: 200;     /* shift hue → re-tunes whole palette */
  --b-radius: .375rem;
  --b-control: 2.75rem;
}
```

Toggle dark mode:

```html
<button class="b-btn" data-b-toggle="theme" aria-label="Toggle theme">🌗</button>
```

The bundled JS persists the user's choice to `localStorage`. Dark variants come from `light-dark()` — no double-defining tokens.

## Components included

Buttons (primary/secondary/ghost/soft/outline/danger/success/warning), Cards (with header/footer/interactive), Badges, Chips, Alerts, Avatars (with status + groups), Breadcrumbs, Tabs (underline + pill), Tables (striped + hover), Lists, Pagination, Navbar, Menu, Dropdown (`<details>`-based), Modal Dialog, Drawer (left/right/bottom), Popover (native API + anchor positioning), Tooltip, Progress (bar + indeterminate), Spinner, Skeleton, Empty state, Stat, Toast (programmatic), **Segmented control**, **Combobox**, **Command palette (⌘K)**, **Tag input**, **Stepper** (vertical + horizontal), Form fields (input, select, textarea, switch, checkbox, range, file, fieldset, input groups with addons), Code blocks (with copy button), Hero, Kbd, Divider.

## Layout primitives

`.b-container` (with container-query enabled), `.b-stack`, `.b-cluster`, `.b-split`, `.b-center`, `.b-grid` (auto-fit), `.b-sidebar`, `.b-cover`, `.b-switcher`, `.b-prose`, `.b-spacer`, `.b-subgrid`.

## Utilities

Display, flex, grid, gap, margin, padding, sizing, typography, weight, family, colors, gradients, borders, radius, shadows, position, z-index, overflow, opacity, scroll-snap, content-visibility, color-scheme, motion-safe/reduce, and **container-query variants** (`@sm:`, `@md:`, `@lg:`).

## Verify

```sh
npm run build         # bundles, exports, minifies — produces dist/
npm run build:docs    # generates docs/ from docs-src/
npm run test:static   # build + benchmark + size + quality + exports + html + visual-manifest
npm run test:browser  # Playwright across Chromium / Firefox / WebKit + mobile
npm run verify        # all of the above
```

## Browser support

Evergreen, with progressive enhancement:

- Chrome / Edge 125+
- Firefox 128+
- Safari 17.4+

Older browsers fall back to hex colors via `@supports not (color: light-dark(#fff, #000))`.

## License

MIT — see [LICENSE](LICENSE).
