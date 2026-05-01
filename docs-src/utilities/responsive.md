---
title: Responsive & container
section: Utilities
lede: Viewport breakpoint variants and modern container query variants.
---

# Responsive & container

## Viewport breakpoints

| Prefix | Width |
| --- | --- |
| `sm:` | up to 40rem (640px) |
| `md:` | from 40.0625rem (~641px) |
| `lg:` | from 64rem (1024px) |

```html
<div class="d-block md:d-flex">
  <!-- block on mobile, flex from tablet up -->
</div>

<div class="grid-1 md:grid-2 lg:grid-4">
  <!-- 1 col mobile, 2 col tablet, 4 col desktop -->
</div>
```

## Container query variants

The smarter, future-proof choice — responsive to the **parent container's** width, not the viewport. Place these on children of any element with `container-type: inline-size`:

| Prefix | Container width |
| --- | --- |
| `@sm:` | from 30rem |
| `@md:` | from 48rem |
| `@lg:` | from 64rem |

```html
<aside class="b-card">
  <div class="b-card-body grid-1 @sm:grid-2 @md:grid-3">
    ...
  </div>
</aside>
```

A card at full viewport width gets 3 columns, the same card in a sidebar gets 1 — without media queries.

## Helper: enable container query on any element

```html
<div class="b-container-q">
  <!-- children can now use @sm:, @md:, @lg: -->
</div>
```

## Color scheme

`scheme-light`, `scheme-dark`, `scheme-auto`.

## Motion

`motion-safe:transition`, `motion-safe:scale-105`, `motion-reduce:d-none`.

## Performance

`content-auto` — applies `content-visibility: auto` for offscreen optimization.
