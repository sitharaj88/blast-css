---
title: Layout primitives
section: Foundations
lede: Eight composable primitives — stack, cluster, split, grid, sidebar, switcher, cover, container — that cover most page layouts.
---

# Layout primitives

## Container

A centered, max-width wrapper with horizontal padding. Container queries are enabled by default, so children can use `@sm:` / `@md:` / `@lg:` variants.

<demo>
<div class="b-container" style="border:1px dashed var(--b-border); padding-block: var(--b-3); text-align:center">.b-container — capped at 72rem</div>
</demo>

Sizes: `.b-container-xs` (30rem), `.b-container-sm` (42rem), `.b-container-md` (56rem), `.b-container` (72rem), `.b-container-lg` (88rem), `.b-container-xl` (104rem), `.b-container-fluid` (100%).

## Stack

Vertical column with consistent gap. Override via `--b-stack-gap`.

<demo>
<div class="b-stack" style="--b-stack-gap: var(--b-3)">
  <div class="b-card"><div class="b-card-body">One</div></div>
  <div class="b-card"><div class="b-card-body">Two</div></div>
  <div class="b-card"><div class="b-card-body">Three</div></div>
</div>
</demo>

## Cluster

Horizontal row that wraps. Use for chips, button groups, breadcrumbs.

<demo>
<div class="b-cluster">
  <span class="b-chip">Engineering</span>
  <span class="b-chip">Design</span>
  <span class="b-chip">Product</span>
  <span class="b-chip">Marketing</span>
</div>
</demo>

## Split

Two-column row that pushes children to opposite ends.

<demo>
<div class="b-split">
  <strong>Settings</strong>
  <button class="b-btn b-btn-sm">Save</button>
</div>
</demo>

## Grid

Responsive auto-fit grid. Defaults to columns that are at least 16rem wide.

<demo>
<div class="b-grid" style="--b-grid-min:8rem;">
  <div class="b-card"><div class="b-card-body">A</div></div>
  <div class="b-card"><div class="b-card-body">B</div></div>
  <div class="b-card"><div class="b-card-body">C</div></div>
  <div class="b-card"><div class="b-card-body">D</div></div>
</div>
</demo>

Customize: `--b-grid-min` (column floor), `--b-grid-cols` (max columns), `--b-grid-gap`.

## Sidebar

Fixed-width sidebar + flexible main. Collapses to one column under 40rem.

```html
<div class="b-sidebar" style="--b-sidebar-width: 14rem">
  <nav>...</nav>
  <main>...</main>
</div>
```

`.b-sidebar-end` flips the orientation.

## Switcher

Switches between row and column layout based on intrinsic size — no media query.

```html
<div class="b-switcher" style="--b-switcher-threshold: 30rem">
  <div>Item one</div>
  <div>Item two</div>
</div>
```

## Cover

Full-height layout with header, centered content, and footer.

```html
<div class="b-cover" style="--b-cover-min: 100dvh">
  <header>...</header>
  <main>...</main>
  <footer>...</footer>
</div>
```

## Center

Drop-in centered element.

```html
<div class="b-center" style="--b-center-min: 50vh">
  <h1>Hello</h1>
</div>
```

## Prose

Reading-width container for long-form content. Caps at 70 characters.

```html
<article class="b-prose">
  <h1>Article</h1>
  <p>Lorem ipsum...</p>
</article>
```

## Subgrid

Where supported (Chrome 117+, Firefox 71+, Safari 16+):

```html
<div class="b-grid">
  <div class="b-card b-subgrid">
    <h3>Aligned</h3>
    <p>across</p>
    <small>siblings</small>
  </div>
</div>
```
