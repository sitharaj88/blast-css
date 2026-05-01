---
title: Buttons
section: Components
status: stable
keyboard: true
screen-reader: tested
browser: Evergreen
lede: Solid, secondary, soft, outline, ghost — sized small, default, and large. With loading and disabled states.
---

# Buttons

## Variants

<demo>
<div class="b-cluster">
  <button class="b-btn">Primary</button>
  <button class="b-btn b-btn-secondary">Secondary</button>
  <button class="b-btn b-btn-soft">Soft</button>
  <button class="b-btn b-btn-outline">Outline</button>
  <button class="b-btn b-btn-ghost">Ghost</button>
</div>
</demo>

## Status colors

<demo>
<div class="b-cluster">
  <button class="b-btn b-btn-success">Save</button>
  <button class="b-btn b-btn-warning">Review</button>
  <button class="b-btn b-btn-danger">Delete</button>
</div>
</demo>

## Sizes

<demo>
<div class="b-cluster">
  <button class="b-btn b-btn-sm">Small</button>
  <button class="b-btn">Default</button>
  <button class="b-btn b-btn-lg">Large</button>
</div>
</demo>

## With icons

<demo>
<div class="b-cluster">
  <button class="b-btn">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
    New project
  </button>
  <button class="b-btn b-btn-secondary">
    Settings
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 6 6 6-6 6"/></svg>
  </button>
</div>
</demo>

## Loading state

Add `aria-busy="true"` for loading spinners that overlay the button text without changing layout:

<demo>
<button class="b-btn" aria-busy="true">Saving</button>
</demo>

```html
<button class="b-btn" aria-busy="true">Saving</button>
```

## Disabled

<demo>
<button class="b-btn" disabled>Disabled</button>
</demo>

## Icon-only

<demo>
<div class="b-cluster">
  <button class="b-icon-btn" aria-label="Edit">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4v16h16v-7M19 5l-9 9 5 5 9-9-5-5z"/></svg>
  </button>
  <button class="b-icon-btn" aria-label="Delete">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6l-1 14H6L5 6M10 11v6M14 11v6"/></svg>
  </button>
</div>
</demo>

## Button groups

<demo>
<div class="b-btn-group">
  <button class="b-btn b-btn-secondary">One</button>
  <button class="b-btn b-btn-secondary">Two</button>
  <button class="b-btn b-btn-secondary">Three</button>
</div>
</demo>

## Full width

```html
<button class="b-btn b-btn-block">Block button</button>
```

## API

| Class | Effect |
| --- | --- |
| `.b-btn` | Base button |
| `.b-btn-secondary` | Surface background |
| `.b-btn-ghost` | Transparent until hover |
| `.b-btn-soft` | Tinted brand background |
| `.b-btn-outline` | Border-only with brand color |
| `.b-btn-success` / `-warning` / `-danger` | Status |
| `.b-btn-sm` / `.b-btn-lg` | Sizes |
| `.b-btn-block` | Full width |
| `.b-icon-btn` | Square icon button |
| `.b-btn-group` | Visually joined buttons |

## Accessibility

- Always use semantic `<button>` (or `<a>` for navigation)
- `aria-busy="true"` for loading
- `aria-disabled="true"` for visually-disabled-but-focusable
- Icon-only buttons need `aria-label`
