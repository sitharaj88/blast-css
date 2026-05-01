---
title: Flex & grid
section: Utilities
lede: Display, flex direction, alignment, and grid column utilities.
---

# Flex & grid

## Display

`d-none`, `d-block`, `d-inline`, `d-inline-block`, `d-flex`, `d-inline-flex`, `d-grid`, `d-inline-grid`, `d-contents`.

## Flex direction

`flex-row`, `flex-col`, `flex-row-rev`, `flex-col-rev`.

## Wrap

`flex-wrap`, `flex-nowrap`.

## Align items / justify content

`items-{start, center, end, baseline, stretch}`, `justify-{start, center, end, between, around, evenly}`.

## Self-alignment

`self-{start, center, end, stretch}`.

## Flex grow/shrink/basis

`grow`, `grow-0`, `shrink-0`, `basis-full`, `basis-0`.

## Order

`order-first`, `order-last`.

## Grid columns

`grid-1`, `grid-2`, `grid-3`, `grid-4`, `grid-5`, `grid-6`, `grid-12`, `grid-auto`.

## Spans

`col-span-{2,3,4,full}`, `row-span-{2,full}`.

<demo>
<div class="d-grid grid-3 gap-3">
  <div class="b-card"><div class="b-card-body">A</div></div>
  <div class="b-card"><div class="b-card-body">B</div></div>
  <div class="b-card"><div class="b-card-body">C</div></div>
  <div class="b-card col-span-full"><div class="b-card-body">Spans full</div></div>
</div>
</demo>

## Place items

`place-center`, `place-between`.
