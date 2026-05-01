---
title: Theming & tokens
section: Get started
lede: Override CSS variables to retheme. Tokens travel as JSON, CSS, and TypeScript for design pipelines.
---

# Theming & tokens

## How theming works

BlastCSS exposes ~80 CSS custom properties. They live in the `blast.tokens` cascade layer, so any `:root` rule in your app overrides them without specificity tricks.

```css
:root {
  --b-primary: oklch(60% 0.2 150);  /* green */
  --b-radius: .375rem;
  --b-font-sans: "Geist", system-ui;
}
```

## OKLCH everywhere

Every color is defined in OKLCH for perceptually uniform tinting and shading. The framework derives soft and strong variants automatically using `color-mix()`, so a single hue change retunes hovers, focus rings, badges, alerts, and more.

```css
:root {
  --b-primary-h: 264;     /* hue 0–360 */
  --b-primary-c: 0.21;    /* chroma 0–0.4 */
}
```

## Light & dark with `light-dark()`

Most colors are wrapped in `light-dark(lightValue, darkValue)`. The active value depends on `color-scheme`:

- `color-scheme: light` → light value
- `color-scheme: dark` → dark value
- `color-scheme: light dark` → follows `prefers-color-scheme`

Toggle dark mode by setting `data-theme` on `<html>`:

```html
<html data-theme="dark">
```

The bundled JS auto-saves the user's choice to `localStorage` under the key `b-theme` and restores it on next visit. Trigger it manually:

```html
<button class="b-icon-btn" data-b-toggle="theme" aria-label="Toggle theme">
  <!-- icon -->
</button>
```

See the [dark mode](./dark-mode.html) guide for more.

## Token categories

| Prefix | What it controls |
| --- | --- |
| `--b-bg`, `--b-surface`, `--b-elevated` | Page surfaces |
| `--b-text`, `--b-muted`, `--b-subtle` | Text colors |
| `--b-primary`, `--b-success`, `--b-warning`, `--b-danger`, `--b-info` | Brand & status colors |
| `--b-border`, `--b-border-strong` | Lines & dividers |
| `--b-1`…`--b-24` | Spacing scale (rem-based) |
| `--b-fluid-1`…`--b-fluid-5` | Fluid spacing for hero sections |
| `--b-text-xs`…`--b-text-5xl` | Type scale |
| `--b-fluid-h1`, `--b-fluid-h2`, `--b-fluid-h3` | Fluid heading sizes |
| `--b-radius-xs`…`--b-radius-2xl`, `--b-radius-pill` | Border radii |
| `--b-shadow-xs`…`--b-shadow-xl`, `--b-shadow-ring`, `--b-shadow-glow` | Elevation |
| `--b-duration*`, `--b-ease*` | Motion |
| `--b-z-*` | z-index scale (dropdown, popover, toast, modal) |
| `--b-container*` | Container max widths |
| `--b-control`, `--b-control-sm`, `--b-control-lg` | Form/button heights |

## Per-component theming

Many components also expose private properties for one-off tweaks:

```html
<div class="b-grid" style="--b-grid-min:18rem; --b-grid-gap:var(--b-6)">
  ...
</div>

<div class="b-stack" style="--b-stack-gap: var(--b-2)">
  ...
</div>

<span class="b-avatar" style="--b-avatar-size: 4rem">JD</span>
```

## Exported formats

The build emits tokens in three formats — pick whichever matches your design pipeline:

```js
import tokens from "blastcss/tokens.json";   // { light: { ... }, dark: { ... } }
import { tokens } from "blastcss/tokens.ts"; // typed
```

```css
@import "blastcss/tokens.css";
```

## Brand recipe

Match a brand color in three lines of CSS:

```css
:root {
  --b-primary: oklch(from #5B33FF l c h);  /* convert any hex to OKLCH */
  --b-primary-soft: oklch(from var(--b-primary) 0.96 0.05 h);
  --b-primary-strong: oklch(from var(--b-primary) 0.45 c h);
}
```
