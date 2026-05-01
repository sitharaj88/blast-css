---
title: Dialog & drawer
section: Components
status: stable
keyboard: true
screen-reader: tested
browser: Evergreen
lede: Modal dialogs and slide-in drawers built on the native `<dialog>` element with `@starting-style` animations.
---

# Dialog & drawer

## Modal dialog

<demo>
<button class="b-btn" data-b-toggle="dialog" data-b-target="#demo-modal">Open modal</button>
<dialog id="demo-modal" class="b-modal">
  <div class="b-card-header">
    <strong>Confirm action</strong>
    <button class="b-close" data-b-dismiss="dialog" aria-label="Close">×</button>
  </div>
  <div class="b-card-body">
    <p>Are you sure you want to continue? This cannot be undone.</p>
  </div>
  <div class="b-card-footer">
    <button class="b-btn b-btn-ghost" data-b-dismiss="dialog">Cancel</button>
    <button class="b-btn b-btn-danger">Delete</button>
  </div>
</dialog>
</demo>

```html
<button class="b-btn" data-b-toggle="dialog" data-b-target="#confirm">Open</button>

<dialog id="confirm" class="b-modal">
  <div class="b-card-header">
    <strong>Title</strong>
    <button class="b-close" data-b-dismiss="dialog">×</button>
  </div>
  <div class="b-card-body">...</div>
  <div class="b-card-footer">
    <button class="b-btn b-btn-ghost" data-b-dismiss="dialog">Cancel</button>
    <button class="b-btn">Confirm</button>
  </div>
</dialog>
```

## Drawer

<demo>
<div class="b-cluster">
  <button class="b-btn b-btn-secondary" data-b-toggle="dialog" data-b-target="#demo-drawer-l">Open from left</button>
  <button class="b-btn b-btn-secondary" data-b-toggle="dialog" data-b-target="#demo-drawer-r">Open from right</button>
</div>
<dialog id="demo-drawer-l" class="b-drawer">
  <div class="b-card-header">
    <strong>Filters</strong>
    <button class="b-close" data-b-dismiss="dialog" aria-label="Close">×</button>
  </div>
  <div class="b-card-body">Drawer content</div>
</dialog>
<dialog id="demo-drawer-r" class="b-drawer" data-side="right">
  <div class="b-card-header">
    <strong>Settings</strong>
    <button class="b-close" data-b-dismiss="dialog" aria-label="Close">×</button>
  </div>
  <div class="b-card-body">Drawer content</div>
</dialog>
</demo>

```html
<dialog class="b-drawer" data-side="right">...</dialog>
```

Sides: `data-side="right"` (default left), `data-side="bottom"`.

## Animations

Modals and drawers use native `@starting-style` for entry animations — fading in for modals, sliding for drawers. Honors `prefers-reduced-motion`.

## API

| Component | Class |
| --- | --- |
| Modal dialog | `<dialog class="b-modal">` |
| Drawer | `<dialog class="b-drawer">` (`data-side` controls direction) |
| Toggle | `data-b-toggle="dialog" data-b-target="#id"` |
| Dismiss | `data-b-dismiss="dialog"` (inside the dialog) |

The bundled JS auto-traps Tab focus inside open dialogs.
