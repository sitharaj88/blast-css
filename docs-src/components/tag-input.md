---
title: Tag input
section: Components
status: new
keyboard: true
screen-reader: tested
browser: Evergreen
lede: Multi-value input that converts each entry into a removable chip.
---

# Tag input

<demo>
<div class="b-tag-input">
  <span class="b-tag">design <button class="b-tag-x" aria-label="Remove">×</button></span>
  <span class="b-tag">engineering <button class="b-tag-x" aria-label="Remove">×</button></span>
  <input placeholder="Add tag…">
</div>
</demo>

```html
<div class="b-tag-input">
  <span class="b-tag">design <button class="b-tag-x">×</button></span>
  <input placeholder="Add tag…">
</div>
```

## Behavior

- Press **Enter** or **comma** to add the current input as a tag
- Press **Backspace** when the input is empty to remove the last tag
- Click the × on a tag to remove it

## Listening

```js
document.addEventListener("b:tag:add", (e) => {
  console.log("Added:", e.detail.value);
});
```

## API

| Class | Effect |
| --- | --- |
| `.b-tag-input` | Wrapper |
| `.b-tag` | Individual tag |
| `.b-tag-x` | Remove button |
