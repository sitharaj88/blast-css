---
title: Skeleton
section: Components
lede: Animated placeholder for loading states.
---

# Skeleton

<demo>
<div class="b-stack" style="--b-stack-gap: var(--b-2); max-width:24rem">
  <div class="b-skeleton" style="height: 1.5rem; width:60%"></div>
  <div class="b-skeleton" style="height: 1rem"></div>
  <div class="b-skeleton" style="height: 1rem; width: 80%"></div>
</div>
</demo>

```html
<div class="b-skeleton" style="height: 1rem"></div>
```

## API

| Class | Effect |
| --- | --- |
| `.b-skeleton` | Animated placeholder |

Set width and height inline. Honors `prefers-reduced-motion` (animation pauses).
