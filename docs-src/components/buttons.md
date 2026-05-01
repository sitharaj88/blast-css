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

## States

<demo>
## Default
<button class="b-btn">Click me</button>

## Loading
<button class="b-btn" aria-busy="true">Saving</button>

## Disabled
<button class="b-btn" disabled>Disabled</button>

## Block
<button class="b-btn b-btn-block">Block button</button>
</demo>

## API

<api>
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `.b-btn` | base | — | Default solid button. Pair with one of the variants below. |
| `.b-btn-secondary` | variant | — | Surface background, neutral border. Use for non-primary actions. |
| `.b-btn-ghost` | variant | — | Transparent until hover. Best in dense toolbars. |
| `.b-btn-soft` | variant | — | Tinted primary background. Lower contrast than solid. |
| `.b-btn-outline` | variant | — | Border-only with primary color. |
| `.b-btn-success` | variant | — | Green background, success ink color. |
| `.b-btn-warning` | variant | — | Amber background, warning ink color. |
| `.b-btn-danger` | variant | — | Red background, danger ink color. |
| `.b-btn-sm` | size | — | Smaller height (`var(--b-control-sm)`). |
| `.b-btn-lg` | size | — | Larger height (`var(--b-control-lg)`). |
| `.b-btn-block` | modifier | — | Full-width button. |
| `.b-icon-btn` | base | — | Square 1:1 button for icons only. Always pair with `aria-label`. |
| `.b-btn-group` | layout | — | Visually joins adjacent `.b-btn` elements. |
| `aria-busy` | attribute | `false` | Set to `true` to show a centered loading spinner. |
| `disabled` | attribute | — | Standard HTML disabled state. |
</api>

## Accessibility

- Always use semantic `<button>` (or `<a>` for navigation)
- `aria-busy="true"` for loading
- `aria-disabled="true"` for visually-disabled-but-focusable
- Icon-only buttons need `aria-label`
