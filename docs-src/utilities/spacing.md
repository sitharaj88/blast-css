---
title: Spacing
section: Utilities
lede: Margin and padding helpers tied to the spacing scale.
---

# Spacing

## Scale

The spacing scale is a quarter-rem ladder:

| Token | Value |
| --- | --- |
| `--b-0` | 0 |
| `--b-px` | 1px |
| `--b-1` | 0.25rem |
| `--b-2` | 0.5rem |
| `--b-3` | 0.75rem |
| `--b-4` | 1rem |
| `--b-5` | 1.25rem |
| `--b-6` | 1.5rem |
| `--b-8` | 2rem |
| `--b-10` | 2.5rem |
| `--b-12` | 3rem |
| `--b-16` | 4rem |
| `--b-20` | 5rem |
| `--b-24` | 6rem |

## Margin

`m-{0,1,2,3,4,6,8,auto}`, `mx-{...}`, `my-{...}`, `mt-{...}`, `mb-{...}`, `ms-{...}`, `me-{...}`.

## Padding

`p-{0…10}`, `px-{...}`, `py-{...}`, `pt-{...}`, `pb-{...}`.

## Gap

`gap-{0…12}`, `gap-x-{2,4}`, `gap-y-{2,4}`.

<demo>
<div class="d-flex gap-3 p-4 bg-surface rounded-lg">
  <div class="b-card"><div class="b-card-body p-3">A</div></div>
  <div class="b-card"><div class="b-card-body p-3">B</div></div>
  <div class="b-card"><div class="b-card-body p-3">C</div></div>
</div>
</demo>

## Logical properties

All spacing utilities use logical properties (`margin-block-start`, `padding-inline`) so they work in RTL contexts automatically.
