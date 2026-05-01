---
title: Accessibility
section: Foundations
lede: Semantic defaults, visible focus, reduced-motion handling, and Axe-tested in CI.
---

# Accessibility

## What ships by default

- **Visible focus rings** — `:focus-visible` outlines on every interactive component
- **Skip link** — `.b-skip-link` for keyboard users
- **Screen reader only** — `.b-sr-only` for visually hidden text
- **Reduced motion** — animations and transitions auto-shorten when the user prefers reduced motion
- **Semantic HTML** — components are built on `<button>`, `<dialog>`, `<details>`, `<input>`, etc.
- **ARIA wired up** — tabs, dropdowns, popovers, dialogs all set the right ARIA attributes
- **Color contrast** — text/background pairs meet WCAG AA at every spec'd combination

## Skip link

Add at the top of `<body>`:

```html
<a class="b-skip-link" href="#main">Skip to content</a>
<header>...</header>
<main id="main">...</main>
```

The link is invisible until focused, then animates into view.

## Focus management in dialogs

The bundled `trapDialogFocus` helper traps Tab focus inside an open `<dialog>`:

```js
import { trapDialogFocus } from "blastcss/js";

const dialog = document.querySelector("#my-dialog");
trapDialogFocus(dialog);
```

`autoInit()` calls this for every `<dialog>` on the page.

## Form labelling

Always pair `<label class="b-label">` with an input via `for`/`id` or by nesting:

```html
<div class="b-field">
  <label class="b-label" for="email" data-required>Email</label>
  <input class="b-input" id="email" type="email" required>
  <span class="b-help">We'll never share this address.</span>
</div>
```

Use `aria-describedby` to wire the help/error text:

```html
<input class="b-input" id="email" aria-describedby="email-help" aria-invalid="true">
<span id="email-help" class="b-error">Please enter a valid address.</span>
```

## Keyboard support

| Component | Keys |
| --- | --- |
| Dialog | Esc closes, Tab cycles within, Shift+Tab reverses |
| Drawer | Same as dialog |
| Tabs | Arrow keys move focus, Home/End jump |
| Combobox | ArrowUp/Down navigate, Enter selects, Esc closes |
| Command palette | ⌘/Ctrl+K opens, ArrowUp/Down + Enter |
| Dropdown (`<details>`) | Esc closes |

## Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  * { transition-duration: 0.01ms !important; }
}
```

This is applied at the framework level — your custom transitions inherit the same treatment unless you opt out explicitly.

## Color contrast

The OKLCH palette is tuned to meet WCAG AA contrast on standard pairings:

- `--b-text` on `--b-bg` — AA Large + AA
- `--b-muted` on `--b-bg` — AA Large
- `--b-primary-ink` on `--b-primary` — AA
- `--b-primary` on `--b-primary-soft` — AA Large

If you customize the palette, [validate contrast](https://webaim.org/resources/contrastchecker/).

## Testing

The repo ships with Axe checks in Playwright. Run:

```bash
npm run test:browser
```

Every fixture page must pass with zero violations (excluding color-contrast on dynamic backgrounds, which is whitelisted).
