---
title: Installation
section: Get started
lede: Install BlastCSS via npm, a CDN, or as a single CSS file. No build step, no preprocessor, no JavaScript framework required.
---

# Installation

## npm

```bash
npm install blastcss
```

Then import the full framework in your app entry:

```js
import "blastcss";
import { autoInit } from "blastcss/js";

autoInit();
```

That's it. `autoInit()` wires up dialogs, dropdowns, tabs, toasts, popovers, command palettes, comboboxes, tag inputs, and the theme toggle.

## CDN

```html
<link rel="stylesheet" href="https://unpkg.com/blastcss/dist/blast.min.css">
<script type="module" src="https://unpkg.com/blastcss/dist/blast.min.js"></script>
```

## Modular bundles

Drop the bundles you actually need:

```js
import "blastcss/core";        // tokens + reset + base + layout + forms + a11y + motion
import "blastcss/components";  // ~5.5 KB gzip — buttons, cards, dialogs, popovers, etc.
import "blastcss/utilities";   // ~4.5 KB gzip — flex/grid/spacing/colors
import "blastcss/reset";       // ~700 B gzip — modern CSS reset only
```

Or import a single component layer for an experimental rollout:

```js
import "blastcss/motion";              // view-transitions, animation utilities
import "blastcss/components-extra";    // command palette, combobox, segmented, tag input
```

## Single file

For server-rendered apps, frameworks without a bundler, or quick prototypes — link the minified bundle:

```html
<link rel="stylesheet" href="/blast.min.css">
<script type="module" src="/blast.min.js"></script>
```

## Verify

After installation, this snippet should render a styled button with a focus ring, hover state, and dark-mode aware colors:

<demo>
<button class="b-btn">Hello, BlastCSS</button>
</demo>

## What you got

- **~12 KB gzip** for the full bundle, including JS helpers
- **Cascade layers** — predictable specificity, no `!important` fights
- **OKLCH design tokens** with `light-dark()` for instant dark-mode
- **40+ components** as plain HTML + class names
- **Container queries** — components adapt to their own width
- **Popover & anchor positioning** for tooltips, menus, command palettes
- **View Transitions** for animated route changes
- **Zero runtime dependencies** — pure CSS + 3 KB of optional JS

Continue with [the quick start](./quickstart.html), or jump to [theming](./theming.html).
