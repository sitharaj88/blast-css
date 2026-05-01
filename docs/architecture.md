# Architecture

BlastCSS is built around four rules:

- CSS is the product. The core framework does not require JavaScript.
- Every export must work by itself. `components` and `utilities` include the token layer.
- Cascade layers keep overrides predictable.
- Size budgets are part of the public contract.

## Layers

```css
@layer blast.tokens;
@layer blast.reset;
@layer blast.base;
@layer blast.layout;
@layer blast.forms;
@layer blast.a11y;
@layer blast.components;
@layer blast.utilities;
```

Applications should override tokens after importing BlastCSS:

```css
:root {
  --b-primary: #0f766e;
  --b-radius: .375rem;
}
```

## Exports

```js
import "blastcss";
import "blastcss/core";
import "blastcss/components";
import "blastcss/utilities";
import "blastcss/reset";
```

## Browser Strategy

BlastCSS targets modern evergreen browsers. It uses modern CSS features such as cascade layers, logical properties, `color-mix()`, and native controls where they reduce JavaScript or output size.
