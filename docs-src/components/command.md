---
title: Command palette
section: Components
status: new
keyboard: true
screen-reader: tested
browser: Evergreen
lede: Spotlight-style search with global ⌘K shortcut. Native dialog + filterable list.
---

# Command palette

<demo>
<button class="b-btn" data-b-toggle="dialog" data-b-target="#demo-cmd">Open palette (or press ⌘K)</button>
<dialog id="demo-cmd" class="b-command" data-shortcut>
  <div class="b-command-search">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
    <input type="search" placeholder="Type a command…">
    <kbd class="b-kbd">esc</kbd>
  </div>
  <ul class="b-command-list">
    <li><div class="b-command-group-label">Navigate</div></li>
    <li><a class="b-command-item" href="#"><span>Go to dashboard</span><kbd class="b-kbd">G D</kbd></a></li>
    <li><a class="b-command-item" href="#"><span>Go to settings</span><kbd class="b-kbd">G S</kbd></a></li>
    <li><div class="b-command-group-label">Actions</div></li>
    <li><a class="b-command-item" href="#"><span>Create new project</span><kbd class="b-kbd">N</kbd></a></li>
    <li><a class="b-command-item" href="#"><span>Invite teammate</span></a></li>
    <li><a class="b-command-item" href="#"><span>Toggle dark mode</span></a></li>
  </ul>
</dialog>
</demo>

## Markup

```html
<dialog class="b-command" data-shortcut>
  <div class="b-command-search">
    <svg>...</svg>
    <input type="search" placeholder="Type a command…">
    <kbd class="b-kbd">esc</kbd>
  </div>
  <ul class="b-command-list">
    <li><div class="b-command-group-label">Navigate</div></li>
    <li><a class="b-command-item" href="/dash"><span>Dashboard</span></a></li>
  </ul>
</dialog>
```

## Behavior

When `data-shortcut` is present, ⌘K (or Ctrl+K) toggles the palette globally.

- Type to filter
- Arrow Up/Down to navigate
- Enter activates the highlighted item
- Esc closes

## API

| Class | Effect |
| --- | --- |
| `.b-command` | Use on `<dialog>` |
| `.b-command-search` | Search input row |
| `.b-command-list` | Items list |
| `.b-command-group-label` | Group separator |
| `.b-command-item` | Selectable item (anchor or button) |
| `data-shortcut` attribute | Enables ⌘K binding |
