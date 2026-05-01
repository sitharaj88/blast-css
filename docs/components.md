# Components

Components use the `b-` prefix. They are plain HTML classes, so the same markup works in React, Vue, Angular, Svelte, server-rendered templates, and static sites.

## Button

```html
<button class="b-btn">Save</button>
<button class="b-btn b-btn-secondary">Cancel</button>
<button class="b-btn b-btn-danger">Delete</button>
```

## Dropdown

```html
<details class="b-dropdown">
  <summary class="b-btn b-btn-secondary">Actions</summary>
  <div class="b-dropdown-menu">
    <a href="/settings">Settings</a>
    <button type="button">Archive</button>
  </div>
</details>
```

## Accordion

```html
<div class="b-accordion">
  <details open>
    <summary>Performance</summary>
    <div class="b-accordion-panel">Small CSS and no runtime JavaScript.</div>
  </details>
  <details>
    <summary>Portability</summary>
    <div class="b-accordion-panel">Works across UI frameworks.</div>
  </details>
</div>
```

## Toast

```html
<div class="b-toast-stack" aria-live="polite">
  <div class="b-toast">
    <strong>Saved</strong>
    <span class="text-muted">Your changes are live.</span>
  </div>
</div>
```

## Tooltip

```html
<button class="b-icon-btn b-tooltip" data-tooltip="Refresh" aria-label="Refresh">R</button>
```

## Pagination

```html
<nav aria-label="Pagination">
  <ol class="b-pagination">
    <li><a class="b-page" href="?page=1">1</a></li>
    <li><a class="b-page" aria-current="page" href="?page=2">2</a></li>
    <li><a class="b-page" href="?page=3">3</a></li>
  </ol>
</nav>
```

## Dialog And Drawer

```html
<button class="b-btn" data-b-toggle="dialog" data-b-target="#drawer">Open</button>

<dialog id="drawer" class="b-drawer" data-side="right">
  <div class="b-card-header">
    <strong>Drawer</strong>
    <button class="b-close" data-b-dismiss="dialog" aria-label="Close">x</button>
  </div>
  <div class="b-card-body">Drawer content</div>
</dialog>
```

## Collapse

```html
<button class="b-btn" data-b-toggle="collapse" data-b-target="#panel">Toggle</button>
<div id="panel" class="b-collapse">
  <div class="b-alert">Collapsed content</div>
</div>
```

## Switch, Range, And File

```html
<label class="b-switch"><input type="checkbox" checked><span>Enabled</span></label>
<input class="b-range" type="range">
<input class="b-file" type="file">
```
