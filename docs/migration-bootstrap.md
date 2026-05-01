# Bootstrap Migration

This guide maps common Bootstrap concepts to BlastCSS equivalents.

## Layout

| Bootstrap | BlastCSS |
| --- | --- |
| `.container` | `.b-container` |
| `.row` / `.col` | `.b-grid`, `.grid-*`, `.b-cluster`, `.b-split` |
| `.d-flex` | `.d-flex` |
| `.gap-*` | `.gap-*` |

## Components

| Bootstrap | BlastCSS |
| --- | --- |
| `.btn .btn-primary` | `.b-btn` |
| `.btn-secondary` | `.b-btn b-btn-secondary` |
| `.card` | `.b-card` |
| `.badge` | `.b-badge` |
| `.alert` | `.b-alert` |
| `.modal` | `.b-modal` or `.b-drawer` on native `dialog` |
| `.dropdown` | `.b-dropdown` |
| `.accordion` | `.b-accordion` |
| `.pagination` | `.b-pagination` and `.b-page` |
| `.breadcrumb` | `.b-breadcrumb` |

## Forms

| Bootstrap | BlastCSS |
| --- | --- |
| `.form-control` | `.b-input` or `.b-textarea` |
| `.form-select` | `.b-select` |
| `.form-check` | `.b-check` |
| `.form-switch` | `.b-switch` |
| `.input-group` | `.b-input-group` |

## JavaScript

BlastCSS keeps JavaScript optional. Import helpers only when needed:

```js
import { autoInit } from "blastcss/js";

autoInit();
```

## Migration Strategy

- Replace one component family at a time.
- Keep Bootstrap and BlastCSS side by side temporarily if needed.
- Prefer semantic HTML before adding ARIA.
- Use token overrides to match the existing brand before rewriting markup.
