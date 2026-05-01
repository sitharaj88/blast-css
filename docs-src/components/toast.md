---
title: Toast
section: Components
lede: Stacked transient notifications, top-right by default. Programmatic API or markup-only.
---

# Toast

## Programmatic

```js
import { showToast } from "blastcss/js";

showToast({
  title: "Saved",
  body: "Your changes are live.",
  variant: "success",  // success | warning | danger
  duration: 4000
});
```

<demo>
<button class="b-btn" onclick="(typeof window!=='undefined') && import('../../dist/blast.js').then(m => m.showToast({title:'Saved', body:'Your changes are live.', variant:'success'}))">Trigger toast</button>
</demo>

## Static markup

```html
<div class="b-toast-stack">
  <div class="b-toast" role="status">
    <strong>Saved</strong>
    <span>Your changes are live.</span>
    <button class="b-close" data-b-dismiss="toast" aria-label="Dismiss">×</button>
  </div>
</div>
```

## API

| Class | Effect |
| --- | --- |
| `.b-toast-stack` | Fixed-position container (top right) |
| `.b-toast` | Individual toast |
| `data-b-dismiss="toast"` | Close button |

`showToast()` creates the stack if it doesn't exist, appends a new toast, and auto-removes it after `duration` ms (default 4000).
