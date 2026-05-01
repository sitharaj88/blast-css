---
title: Tooltip
section: Components
lede: Tiny CSS-only tooltips on hover and focus. Set the label via `data-tooltip`.
---

# Tooltip

<demo>
<div class="b-cluster" style="padding-block:var(--b-6)">
  <button class="b-btn b-btn-secondary b-tooltip" data-tooltip="Save changes">Save</button>
  <button class="b-btn b-btn-secondary b-tooltip" data-tooltip="Delete forever">Delete</button>
  <button class="b-icon-btn b-tooltip" data-tooltip="Edit" aria-label="Edit">✎</button>
</div>
</demo>

```html
<button class="b-btn b-btn-secondary b-tooltip" data-tooltip="Save changes">Save</button>
```

## Notes

- Tooltips use CSS only — they show on `:hover` and `:focus-visible`
- Always pair an icon-only button with `aria-label` for screen readers
- Tooltips are not focusable themselves; they shouldn't carry information that's only available via hover

## API

| Attribute | Effect |
| --- | --- |
| `class="b-tooltip"` | Wraps the trigger element |
| `data-tooltip="text"` | The tooltip content |
