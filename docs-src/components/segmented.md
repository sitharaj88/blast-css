---
title: Segmented control
section: Components
lede: Pill-shaped multi-option toggle. Built on radio inputs — works without JavaScript.
---

# Segmented control

<demo>
<div class="b-segmented" role="radiogroup" aria-label="View density">
  <input type="radio" name="density" id="d-comfy" checked><label for="d-comfy">Comfortable</label>
  <input type="radio" name="density" id="d-cozy"><label for="d-cozy">Cozy</label>
  <input type="radio" name="density" id="d-tight"><label for="d-tight">Compact</label>
</div>
</demo>

```html
<div class="b-segmented" role="radiogroup" aria-label="...">
  <input type="radio" name="x" id="a" checked><label for="a">A</label>
  <input type="radio" name="x" id="b"><label for="b">B</label>
  <input type="radio" name="x" id="c"><label for="c">C</label>
</div>
```

## Listening for changes

```js
document.addEventListener("b:segmented:change", (e) => {
  console.log("Selected:", e.detail.value);
});
```

## API

| Class | Effect |
| --- | --- |
| `.b-segmented` | Wrapper |
| `input[type=radio]` + `label` pairs | Each segment |

The control is fully accessible — radios are exposed to screen readers, and arrow-key navigation comes for free.
