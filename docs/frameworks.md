# Framework Adapters

BlastCSS does not need framework-specific wrappers. Import the CSS once and use classes in templates.

## React

```jsx
import "blastcss";

export function Toolbar() {
  return (
    <div className="b-cluster">
      <button className="b-btn">Save</button>
      <button className="b-btn b-btn-secondary">Cancel</button>
    </div>
  );
}
```

Full snippet: `examples/frameworks/react.jsx`.

## Vue

```vue
<template>
  <div class="b-card">
    <div class="b-card-body b-stack">
      <h2>Project</h2>
      <button class="b-btn">Open</button>
    </div>
  </div>
</template>
```

Full snippet: `examples/frameworks/vue.vue`.

## Angular

```ts
import "blastcss";
```

Full snippet: `examples/frameworks/angular.html`.

```html
<div class="b-alert b-alert-success">Build passed.</div>
```

## Svelte

```svelte
<script>
  import "blastcss";
</script>

<button class="b-btn b-btn-lg">Deploy</button>
```

Full snippet: `examples/frameworks/svelte.svelte`.

## Astro

```astro
---
import "blastcss";
---

<button class="b-btn">Deploy</button>
```

Full snippet: `examples/frameworks/astro.astro`.

## Server Rendered Apps

Use the generated CSS file directly:

```html
<link rel="stylesheet" href="/assets/blast.min.css">
```
