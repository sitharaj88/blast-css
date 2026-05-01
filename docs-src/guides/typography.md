---
title: Typography
section: Foundations
lede: A fluid type scale, balanced headings, pretty paragraph wrapping, and modern font features.
---

# Typography

## Type scale

Sizes are defined as static rems and as fluid `clamp()` values for responsive headings.

| Token | Value | Usage |
| --- | --- | --- |
| `--b-text-2xs` | 0.6875rem | Small labels, kbd |
| `--b-text-xs` | 0.75rem | Captions, badges |
| `--b-text-sm` | 0.875rem | Help text, table cells |
| `--b-text-md` | 1rem | Body |
| `--b-text-lg` | 1.125rem | Lead text |
| `--b-text-xl` | 1.25rem | Sub-headings |
| `--b-text-2xl` | 1.5rem | h3 |
| `--b-text-3xl` | 1.875rem | h2 |
| `--b-text-4xl` | 2.25rem | h1 |
| `--b-text-5xl` | 3rem | Hero |

Fluid sizes:

| Token | Range |
| --- | --- |
| `--b-fluid-h1` | 2rem → 3.75rem |
| `--b-fluid-h2` | 1.625rem → 2.75rem |
| `--b-fluid-h3` | 1.25rem → 1.875rem |
| `--b-fluid-lead` | 1.0625rem → 1.25rem |

## Headings

`<h1>`–`<h6>` are styled with fluid sizes and `text-wrap: balance` for nice multi-line headlines:

<demo>
<h1>Display heading</h1>
<h2>Section heading</h2>
<h3>Subsection heading</h3>
<h4>h4 heading</h4>
</demo>

## Body text

Paragraphs use `text-wrap: pretty` for better orphan/widow handling.

```html
<p>BlastCSS automatically prevents orphan words on the last line of a paragraph.</p>
```

## Weights

| Token | Value |
| --- | --- |
| `--b-weight-normal` | 400 |
| `--b-weight-medium` | 530 |
| `--b-weight-semi` | 620 |
| `--b-weight-bold` | 720 |
| `--b-weight-black` | 820 |

Use as utility classes: `.font-normal`, `.font-medium`, `.font-semi`, `.font-bold`, `.font-black`.

## Code, kbd, mark

<demo>
<p>Inline <code>code</code> uses the mono stack. Press <kbd class="b-kbd">⌘K</kbd> to search. Some <mark>marked text</mark> is highlighted.</p>
</demo>

## Pretty/Balance utilities

<demo>
<p class="text-balance">Use .text-balance on headlines for symmetric multi-line wrapping.</p>
<p class="text-pretty">Use .text-pretty on body text to avoid widows.</p>
<p class="truncate" style="max-width:18rem">Use .truncate for ellipsis on overflow lines</p>
</demo>

## Font stacks

Tokens default to:

```css
--b-font-sans: "Inter var", Inter, ui-sans-serif, system-ui, sans-serif;
--b-font-mono: ui-monospace, "JetBrains Mono", "SFMono-Regular", monospace;
--b-font-display: var(--b-font-sans);
```

Override with brand fonts:

```css
:root {
  --b-font-sans: "Geist", system-ui, sans-serif;
  --b-font-display: "GT Sectra", "Times New Roman", serif;
}
```
