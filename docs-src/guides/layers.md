---
title: Cascade layers
section: Foundations
lede: BlastCSS organizes its CSS into named layers so your overrides win without tricks.
---

# Cascade layers

The framework declares an explicit layer order:

```css
@layer blast.tokens, blast.reset, blast.base, blast.layout,
       blast.forms, blast.a11y, blast.motion, blast.components, blast.utilities;
```

Within a layer, normal specificity rules apply. Across layers, **later layers win regardless of specificity**.

## Why this matters

You can write:

```css
.b-btn { background: rebeccapurple; }
```

…in your app stylesheet — outside any `@layer` — and it beats every BlastCSS rule, because unlayered styles are always more powerful than layered ones.

## Adding your own layer

Insert your styles between BlastCSS layers for fine-grained control:

```css
@layer blast.components, app, blast.utilities;

@layer app {
  .b-btn {
    /* still beats blast.components, but utilities like .bg-primary still win */
  }
}
```

## Avoiding `!important`

BlastCSS only uses `!important` in the **utilities** layer, intentionally — utilities are meant to be the final say. Components and layout never use `!important`. If you find yourself reaching for it, you can usually solve the problem by:

1. Inserting your style in a layer after `blast.components`
2. Or writing it outside any layer

## Reading the source

Each `src/*.css` file declares its own layer:

```css
/* src/components.css */
@layer blast.components {
  .b-btn { ... }
}
```

This means you can ship a single bundle but still get the layer structure browsers honor.
