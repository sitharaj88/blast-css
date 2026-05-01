---
title: Cards
section: Components
lede: Bordered surface containers with header, body, and footer slots. Container queries enabled by default.
---

# Cards

## Basic

<demo>
<div class="b-card" style="max-width:24rem">
  <div class="b-card-body">
    <h3>Card title</h3>
    <p>Cards are bordered surface containers built on container queries — children can adapt to the card's own width.</p>
  </div>
</div>
</demo>

## With header & footer

<demo>
<div class="b-card" style="max-width:24rem">
  <div class="b-card-header">
    <strong>Settings</strong>
    <span class="b-badge b-badge-success">Saved</span>
  </div>
  <div class="b-card-body">
    <p>Configure your workspace defaults.</p>
  </div>
  <div class="b-card-footer">
    <span class="text-muted text-sm">Updated 2h ago</span>
    <button class="b-btn b-btn-sm">Edit</button>
  </div>
</div>
</demo>

## Interactive card

<demo>
<a href="#" class="b-card b-card-interactive" style="display:block; max-width:24rem; text-decoration:none">
  <div class="b-card-body">
    <strong>View report →</strong>
    <p class="text-muted">Hover to lift</p>
  </div>
</a>
</demo>

## Container-query aware

Use `@sm:`, `@md:`, `@lg:` utilities inside a card to react to its own width — not the viewport:

```html
<div class="b-card">
  <div class="b-card-body b-grid @md:grid-2">
    ...
  </div>
</div>
```

## API

| Class | Effect |
| --- | --- |
| `.b-card` | Card wrapper (container-type: inline-size) |
| `.b-card-header` | Top section, separated by border |
| `.b-card-body` | Main content |
| `.b-card-footer` | Bottom section, surface background |
| `.b-card-interactive` | Hover lift + border emphasis |
