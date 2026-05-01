---
title: Popover
section: Components
status: new
keyboard: true
screen-reader: tested
browser: Chrome 125+, Firefox 128+, Safari 17.4+
lede: Floating panel that anchors to a trigger. Uses the native HTML `popover` attribute and CSS anchor positioning where supported.
---

# Popover

<demo>
<button class="b-btn" data-b-toggle="popover" data-b-target="#demo-popover">Show details</button>
<div id="demo-popover" class="b-popover">
  <strong>What is this?</strong>
  <p class="text-muted text-sm">A popover is a non-modal panel that doesn't dim the background.</p>
</div>
</demo>

```html
<button class="b-btn" data-b-toggle="popover" data-b-target="#info">Open</button>

<div id="info" class="b-popover">
  <strong>Title</strong>
  <p>Body text.</p>
</div>
```

## Native `popover` attribute

For top-layer rendering and automatic light dismiss, opt into the native API:

```html
<button class="b-btn" data-b-toggle="popover" data-b-target="#native-pop">Open</button>

<div id="native-pop" class="b-popover" popover>
  <strong>Native popover</strong>
  <p>Renders in the top layer, auto-dismisses on outside click and Escape.</p>
</div>
```

When `popover` is present, the framework uses `showPopover()` / `hidePopover()` and the browser handles light dismiss for you.

## Anchor positioning

Where the browser supports CSS anchor positioning (Chrome 125+), popovers automatically anchor to their trigger via `position-anchor`. Older browsers fall back to JS-positioned `inset` props.

## API

| Class | Effect |
| --- | --- |
| `.b-popover` | Popover panel |
| `data-b-toggle="popover"` + `data-b-target="#id"` | Toggle attribute |
| `popover` attribute | Opt into native API (recommended) |
