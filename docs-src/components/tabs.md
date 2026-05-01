---
title: Tabs
section: Components
lede: Underline tabs and pill tabs with full keyboard navigation (arrow keys, Home/End).
---

# Tabs

## Underline (default)

<demo>
<div class="b-tabs" role="tablist" aria-label="Demo tabs">
  <button class="b-tab" role="tab" aria-selected="true" aria-controls="dt-1" id="dt-1-t">Overview</button>
  <button class="b-tab" role="tab" aria-selected="false" aria-controls="dt-2" id="dt-2-t">Activity</button>
  <button class="b-tab" role="tab" aria-selected="false" aria-controls="dt-3" id="dt-3-t">Billing</button>
</div>
<div id="dt-1" class="b-tab-panel" role="tabpanel" aria-labelledby="dt-1-t">Overview content.</div>
<div id="dt-2" class="b-tab-panel" role="tabpanel" aria-labelledby="dt-2-t" hidden>Activity content.</div>
<div id="dt-3" class="b-tab-panel" role="tabpanel" aria-labelledby="dt-3-t" hidden>Billing content.</div>
</demo>

## Pill tabs

<demo>
<div class="b-tabs b-tabs-pill" role="tablist" aria-label="Demo pill">
  <button class="b-tab" role="tab" aria-selected="true" aria-controls="dp-1" id="dp-1-t">Day</button>
  <button class="b-tab" role="tab" aria-selected="false" aria-controls="dp-2" id="dp-2-t">Week</button>
  <button class="b-tab" role="tab" aria-selected="false" aria-controls="dp-3" id="dp-3-t">Month</button>
</div>
</demo>

## Markup

```html
<div class="b-tabs" role="tablist">
  <button class="b-tab" role="tab" aria-selected="true" aria-controls="p1" id="t1">One</button>
  <button class="b-tab" role="tab" aria-selected="false" aria-controls="p2" id="t2">Two</button>
</div>
<div id="p1" class="b-tab-panel" role="tabpanel" aria-labelledby="t1">First panel.</div>
<div id="p2" class="b-tab-panel" role="tabpanel" aria-labelledby="t2" hidden>Second panel.</div>
```

## Keyboard

| Key | Action |
| --- | --- |
| Left/Right | Move focus to previous/next tab |
| Home / End | Jump to first/last tab |
| Enter / Space | Activate the focused tab |

## API

| Class | Effect |
| --- | --- |
| `.b-tabs` | Tab list (underline style) |
| `.b-tabs-pill` | Pill style |
| `.b-tab` | Individual tab |
| `.b-tab-panel` | Tab content panel |
