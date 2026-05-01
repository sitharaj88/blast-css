---
title: Combobox
section: Components
lede: Searchable input with a dropdown listbox. Filters options as you type, navigable with arrow keys.
---

# Combobox

<demo>
<div class="b-combobox" style="max-width:18rem">
  <input class="b-input" placeholder="Choose a framework">
  <ul class="b-combobox-list">
    <li class="b-combobox-option" data-value="React">React</li>
    <li class="b-combobox-option" data-value="Vue">Vue</li>
    <li class="b-combobox-option" data-value="Svelte">Svelte</li>
    <li class="b-combobox-option" data-value="Solid">Solid</li>
    <li class="b-combobox-option" data-value="Astro">Astro</li>
    <li class="b-combobox-option" data-value="Qwik">Qwik</li>
  </ul>
</div>
</demo>

```html
<div class="b-combobox">
  <input class="b-input" placeholder="Choose…">
  <ul class="b-combobox-list">
    <li class="b-combobox-option" data-value="A">A</li>
    <li class="b-combobox-option" data-value="B">B</li>
  </ul>
</div>
```

## Behavior (with `autoInit()`)

- Typing filters the listbox
- Arrow Down/Up navigate
- Enter selects the active option
- Escape closes
- Click selects

## Listening for selection

```js
document.addEventListener("b:combobox:select", (e) => {
  console.log("Selected:", e.detail.value);
});
```

## API

| Class | Effect |
| --- | --- |
| `.b-combobox` | Wrapper |
| `.b-combobox-list` | The listbox `<ul>` |
| `.b-combobox-option` | Each option `<li>` |
| `data-value="..."` | The value to set on the input |
