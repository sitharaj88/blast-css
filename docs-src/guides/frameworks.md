---
title: Framework integration
section: Get started
lede: Drop BlastCSS into React, Vue, Svelte, Astro, Angular, Rails, Laravel, Django — anywhere HTML is rendered.
---

# Framework integration

BlastCSS is *just CSS*. Class names work in any framework or templating language. The optional 3 KB JS helper is a regular ES module — import it once and it auto-initializes interactive components on the entire document.

## React

```jsx
import "blastcss";
import { autoInit } from "blastcss/js";
import { useEffect } from "react";

export function App() {
  useEffect(() => { autoInit(); }, []);

  return (
    <button className="b-btn">Click me</button>
  );
}
```

For a per-component init that respects React's rendering, scope to a ref:

```jsx
import { initDialogs } from "blastcss/js";
import { useEffect, useRef } from "react";

function MyDialog() {
  const ref = useRef();
  useEffect(() => { initDialogs(ref.current); }, []);
  return <div ref={ref}>{/* ... */}</div>;
}
```

## Vue

```vue
<script setup>
import "blastcss";
import { autoInit } from "blastcss/js";
import { onMounted } from "vue";

onMounted(() => autoInit());
</script>

<template>
  <button class="b-btn">Click me</button>
</template>
```

## Svelte

```svelte
<script>
  import "blastcss";
  import { autoInit } from "blastcss/js";
  import { onMount } from "svelte";

  onMount(() => autoInit());
</script>

<button class="b-btn">Click me</button>
```

## Astro

```astro
---
import "blastcss";
---
<button class="b-btn">Click me</button>

<script>
  import { autoInit } from "blastcss/js";
  autoInit();
</script>
```

## Angular

In your global `styles.css`:

```css
@import "blastcss";
```

In `main.ts`:

```ts
import { autoInit } from "blastcss/js";
autoInit();
```

Then use classes in templates:

```html
<button class="b-btn">Click me</button>
```

## Server-rendered (Rails, Laravel, Django, PHP)

Link the CSS file in your layout, drop the JS helper as a module script:

```html
<link rel="stylesheet" href="/blast.min.css">
<script type="module" src="/blast.min.js"></script>
```

`autoInit()` runs automatically on `DOMContentLoaded` (or immediately if loaded after the parser).

## Tailwind side-by-side

If you're already using Tailwind and want to adopt BlastCSS components incrementally, layer order keeps utilities winning:

```css
@import "tailwindcss";
@import "blastcss";

@layer utilities {
  /* Tailwind utilities still beat BlastCSS components in the cascade */
}
```

## Tree-shaking

For maximum size optimization, import only the bundles you need:

```js
import "blastcss/core";        // foundations
import "blastcss/components";  // UI components
// skip utilities/components-extra/motion if unused
```
