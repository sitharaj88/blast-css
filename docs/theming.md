# Theming

BlastCSS themes are CSS custom properties. Override tokens in your app or consume generated token artifacts from `dist/`.

## CSS Override

```css
:root {
  --b-primary: #0f766e;
  --b-radius: .375rem;
}
```

## Dark Mode

```html
<html data-theme="dark">
```

## Generated Token Exports

The build generates:

- `dist/tokens.css`
- `dist/tokens.json`
- `dist/tokens.ts`

Package exports:

```js
import tokens from "blastcss/tokens.json";
```

```css
@import "blastcss/tokens.css";
```

```ts
import tokens from "blastcss/tokens.ts";
```
