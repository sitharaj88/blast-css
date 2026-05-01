---
title: Quick start
section: Get started
lede: A 2-minute tour through the BlastCSS conventions — tokens, layout primitives, components, and utilities.
---

# Quick start

## 1. Tokens drive everything

All visual decisions live in CSS custom properties prefixed with `--b-`. Override them anywhere — `:root`, a wrapper element, or even a single component instance.

```css
:root {
  --b-primary-h: 200;     /* shift the hue */
  --b-radius: .375rem;    /* tighter corners */
  --b-control: 2.75rem;   /* taller controls */
}
```

See [theming & tokens](./theming.html) for the full list.

## 2. Layout primitives

Compose pages with semantic layout classes. Each is a single-purpose primitive:

<demo>
<div class="b-stack" style="--b-stack-gap: var(--b-3)">
  <div class="b-cluster">
    <span class="b-chip">Stack</span>
    <span class="b-chip">Cluster</span>
    <span class="b-chip">Split</span>
    <span class="b-chip">Grid</span>
    <span class="b-chip">Sidebar</span>
  </div>
  <div class="b-grid" style="--b-grid-min:8rem;">
    <div class="b-card"><div class="b-card-body">A</div></div>
    <div class="b-card"><div class="b-card-body">B</div></div>
    <div class="b-card"><div class="b-card-body">C</div></div>
  </div>
</div>
</demo>

## 3. Components are HTML + class names

No JSX, no slots, no hydration: a button is `<button class="b-btn">`. Extend by adding modifier classes (`b-btn-secondary`, `b-btn-soft`, `b-btn-lg`).

<demo>
<div class="b-cluster">
  <button class="b-btn">Primary</button>
  <button class="b-btn b-btn-secondary">Secondary</button>
  <button class="b-btn b-btn-soft">Soft</button>
  <button class="b-btn b-btn-outline">Outline</button>
  <button class="b-btn b-btn-ghost">Ghost</button>
</div>
</demo>

## 4. Utilities for one-offs

Short, opt-in helpers for spacing, layout, typography, and color. They live in a dedicated cascade layer so they never fight components.

<demo>
<div class="d-flex items-center gap-3 p-4 rounded-lg bg-soft-primary">
  <div class="b-avatar">JD</div>
  <div class="b-stack" style="--b-stack-gap: 0">
    <strong>Jane Doe</strong>
    <span class="text-muted text-sm">jane@blast.css</span>
  </div>
  <button class="b-btn b-btn-sm ms-auto">Edit</button>
</div>
</demo>

## 5. Optional JS for behavior

CSS owns the look. A small (3 KB gzip) helper script wires up native interactivity — `<dialog>`, popovers, tabs, toasts, command palettes — when CSS alone can't.

```html
<button class="b-btn" data-b-toggle="dialog" data-b-target="#welcome">Open</button>

<dialog id="welcome" class="b-modal">
  <div class="b-card-header">
    <strong>Welcome</strong>
    <button class="b-close" data-b-dismiss="dialog" aria-label="Close">×</button>
  </div>
  <div class="b-card-body">It just works.</div>
</dialog>
```

Continue with [theming](./theming.html), or browse [components](../components/buttons.html).
