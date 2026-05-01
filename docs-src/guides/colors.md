---
title: Colors
section: Foundations
lede: Perceptually uniform OKLCH palette with light/dark variants derived from a single hue.
---

# Colors

## Why OKLCH

OKLCH (Lightness, Chroma, Hue) is a perceptually uniform color space — equal numeric changes correspond to equal visual changes. That means tweaks like "make this 10% lighter" actually look 10% lighter. The palette generates consistent soft, strong, and hover variants from a base hue.

## Brand colors

<div class="docs-swatches">
  <div class="docs-swatch" style="--swatch: var(--b-primary)"><span>--b-primary</span></div>
  <div class="docs-swatch" style="--swatch: var(--b-success)"><span>--b-success</span></div>
  <div class="docs-swatch" style="--swatch: var(--b-warning)"><span>--b-warning</span></div>
  <div class="docs-swatch" style="--swatch: var(--b-danger)"><span>--b-danger</span></div>
  <div class="docs-swatch" style="--swatch: var(--b-info)"><span>--b-info</span></div>
</div>

Each color has three variants:

- `--b-{name}` — base
- `--b-{name}-soft` — light tint (for badges, alerts, hover backgrounds)
- `--b-{name}-ink` — text color when used as background

Plus `--b-primary-strong` for emphasized text on neutral backgrounds.

## Surfaces

| Token | Use |
| --- | --- |
| `--b-bg` | Page background |
| `--b-surface` | Card/panel base |
| `--b-surface-2` | Slightly elevated panel (input groups, table headers) |
| `--b-elevated` | Cards/popovers above the page |

## Text

| Token | Use |
| --- | --- |
| `--b-text` | Body text |
| `--b-muted` | Secondary text, captions |
| `--b-subtle` | Placeholders, disabled hints |

## Borders

| Token | Use |
| --- | --- |
| `--b-border` | Default 1px lines |
| `--b-border-strong` | Hover/emphasis lines |

## Color utility classes

```html
<span class="text-primary">Primary text</span>
<span class="text-muted">Muted text</span>
<span class="text-danger">Error</span>
<div class="bg-surface p-4">Surface background</div>
<div class="bg-soft-primary p-4">Soft primary background</div>
<div class="bg-gradient-primary p-4">Gradient background</div>
```

## Building your own palette

Override one variable, retune the rest:

```css
:root {
  --b-primary-h: 200;     /* sky */
  --b-primary-c: 0.20;
}
```

For a fully custom brand:

```css
:root {
  --b-primary: oklch(60% 0.20 280);          /* purple */
  --b-primary-soft: oklch(96% 0.04 280);
  --b-primary-strong: oklch(48% 0.22 280);
  --b-primary-ink: white;
}
```

## Color-mix recipes

The framework relies heavily on `color-mix()` for hover states. You can do the same for custom tints:

```css
.my-card:hover {
  background: color-mix(in oklch, var(--b-primary) 12%, var(--b-bg));
}
```
