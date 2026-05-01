---
title: Motion & view transitions
section: Foundations
lede: Tasteful default transitions, animation utilities, and one-line view transitions for SPA-style routing.
---

# Motion

All animations honor `prefers-reduced-motion: reduce` — falling to near-zero duration without disabling functionality.

## Duration & easing tokens

```css
--b-duration-instant: 80ms;
--b-duration-fast: 140ms;
--b-duration: 200ms;
--b-duration-slow: 320ms;
--b-duration-slower: 480ms;

--b-ease: cubic-bezier(.2, 0, 0, 1);
--b-ease-in: cubic-bezier(.4, 0, 1, 1);
--b-ease-out: cubic-bezier(0, 0, .2, 1);
--b-ease-spring: cubic-bezier(.34, 1.56, .64, 1);
```

## Built-in animations

Used by components like dialog, drawer, popover, and toast via `@starting-style`:

| Class | Effect |
| --- | --- |
| `b-anim-fade-in` | Opacity 0 → 1 |
| `b-anim-slide-up` | Translate from below + fade |
| `b-anim-scale-in` | Scale from 96% with spring ease |
| `b-anim-pulse` | Gentle pulse loop |

<demo>
<button class="b-btn b-anim-scale-in">Animated in</button>
</demo>

## View Transitions

The motion layer enables cross-document view transitions in supporting browsers:

```css
@view-transition { navigation: auto; }
```

Click a link → the browser snapshots the old DOM, swaps it for the new, then crossfades. No SPA framework required.

For same-document changes, use the `viewTransition` helper:

```js
import { viewTransition } from "blastcss/js";

viewTransition(() => {
  // mutate the DOM here
  document.querySelector("#tab-panel").classList.toggle("is-active");
});
```

To preserve element identity across the transition, give it a `view-transition-name`:

```html
<img id="hero" src="..." style="view-transition-name: hero-image">
```

Or use the utility class with a CSS variable:

```html
<img class="b-vt-name" style="--b-vt: hero-image" src="...">
```

## Scroll-driven reveals

Where `animation-timeline` is supported (Chrome 115+, Firefox behind a flag):

```html
<section class="b-reveal">...</section>
```

The element fades and slides in as it scrolls into view, native — no IntersectionObserver, no JS.

## Disabling motion

Users with `prefers-reduced-motion: reduce` automatically get:

- Animation duration capped at 0.01ms
- Transitions capped at 0.01ms
- View transitions disabled (`view-transition-name: none`)
- `scroll-behavior` set to `auto`

You can opt content out manually with the utility:

```html
<div class="motion-reduce:d-none">Hidden when motion is reduced</div>
```
