---
title: Dark mode
section: Get started
lede: BlastCSS uses native `light-dark()` and `color-scheme` for dark mode. No double-defining variables, no flash of incorrect theme.
---

# Dark mode

## Default: follow the system

Out of the box, BlastCSS sets `color-scheme: light dark` on `:root`. Browsers automatically pick light or dark variants based on the user's OS preference. No JavaScript required.

## Override per-page

Set `data-theme` on `<html>` to force a mode:

```html
<html data-theme="dark">  <!-- forced dark -->
<html data-theme="light"> <!-- forced light -->
```

This works because `data-theme` toggles `color-scheme`, which in turn flips every `light-dark()` call in the cascade.

## Toggle button

Add a theme toggle anywhere — the bundled JS handles it:

<demo>
<button class="b-icon-btn" type="button" data-b-toggle="theme" aria-label="Toggle dark mode">🌗</button>
</demo>

```html
<button class="b-icon-btn" data-b-toggle="theme" aria-label="Toggle dark mode">🌗</button>
```

## Persisting the choice

The toggle saves to `localStorage` under `b-theme` and restores on next visit. To prevent a flash before the script runs, inline this in `<head>`:

```html
<script>(function(){try{var t=localStorage.getItem("b-theme");if(t)document.documentElement.dataset.theme=t;}catch(e){}})();</script>
```

## Listening for changes

```js
document.addEventListener("b:theme:change", (e) => {
  console.log("Theme is now", e.detail.theme);
});
```

## Progressive enhancement

For browsers that don't yet support `light-dark()` (older Safari/Firefox), the framework falls back to a `[data-theme="dark"]` block with hex colors. The fallback is automatic via `@supports`.

## Custom dark palette

Override the dark side without touching light:

```css
[data-theme="dark"] {
  --b-bg: #0a0a14;
  --b-surface: #14142b;
  --b-primary: oklch(80% 0.16 280);
}
```
