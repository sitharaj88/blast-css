---
title: Color utilities
section: Utilities
lede: Text and background utilities tied to brand and surface tokens.
---

# Color utilities

## Text

`text-primary`, `text-muted`, `text-subtle`, `text-success`, `text-warning`, `text-danger`, `text-info`, `text-inherit`, `text-current`.

## Background — surfaces

`bg-body`, `bg-surface`, `bg-surface-2`, `bg-elevated`, `bg-transparent`.

## Background — solid brand

`bg-primary`, `bg-success`, `bg-warning`, `bg-danger` (these also set the matching ink color).

## Background — soft tints

`bg-soft-primary`, `bg-soft-success`, `bg-soft-danger`.

## Gradients

`bg-gradient-primary` — diagonal primary→info.

<demo>
<div class="b-stack" style="--b-stack-gap: var(--b-2)">
  <div class="bg-soft-primary p-3 rounded">Soft primary</div>
  <div class="bg-soft-success p-3 rounded">Soft success</div>
  <div class="bg-soft-danger p-3 rounded">Soft danger</div>
  <div class="bg-gradient-primary p-3 rounded">Gradient</div>
</div>
</demo>
