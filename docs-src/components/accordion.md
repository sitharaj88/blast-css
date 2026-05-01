---
title: Accordion
section: Components
lede: Disclosure panels built on `<details>`. Works without JavaScript.
---

# Accordion

<demo>
<div class="b-accordion">
  <details><summary>What's BlastCSS?</summary><div class="b-accordion-panel">A modern, framework-agnostic CSS framework built on cascade layers and OKLCH tokens.</div></details>
  <details><summary>Do I need a build step?</summary><div class="b-accordion-panel">No. BlastCSS ships pre-built CSS and an optional ES module for interactivity.</div></details>
  <details><summary>Can I use it with React/Vue/Svelte?</summary><div class="b-accordion-panel">Yes — class names work with any framework.</div></details>
</div>
</demo>

## Exclusive (one-at-a-time)

Use `name=""` on `<details>` (Chrome 120+, Safari 17+, Firefox 130+):

```html
<div class="b-accordion">
  <details name="faq"><summary>One</summary><div class="b-accordion-panel">…</div></details>
  <details name="faq"><summary>Two</summary><div class="b-accordion-panel">…</div></details>
</div>
```

## API

| Class | Effect |
| --- | --- |
| `.b-accordion` | Wrapper |
| `.b-accordion-panel` | Content panel |

Built on `<details>`, so keyboard support, screen reader announcements, and `prefers-reduced-motion` come for free.
