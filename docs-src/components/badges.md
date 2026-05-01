---
title: Badges & chips
section: Components
lede: Compact status indicators (badges) and removable filter pills (chips).
---

# Badges & chips

## Badges

<demo>
<div class="b-cluster">
  <span class="b-badge">Default</span>
  <span class="b-badge b-badge-success">Success</span>
  <span class="b-badge b-badge-warning">Warning</span>
  <span class="b-badge b-badge-danger">Danger</span>
  <span class="b-badge b-badge-info">Info</span>
  <span class="b-badge b-badge-neutral">Neutral</span>
</div>
</demo>

## Dot badges

<demo>
<div class="b-cluster">
  <span class="b-badge b-badge-success b-badge-dot">Online</span>
  <span class="b-badge b-badge-warning b-badge-dot">Idle</span>
  <span class="b-badge b-badge-danger b-badge-dot">Offline</span>
</div>
</demo>

## Chips

<demo>
<div class="b-cluster">
  <span class="b-chip">React</span>
  <span class="b-chip">Vue</span>
  <span class="b-chip b-chip-removable">Svelte <button class="b-chip-x" aria-label="Remove">×</button></span>
</div>
</demo>

## API

| Class | Effect |
| --- | --- |
| `.b-badge` | Pill-shaped status badge |
| `.b-badge-{variant}` | Color variant: success/warning/danger/info/neutral |
| `.b-badge-dot` | Adds leading dot |
| `.b-chip` | Larger removable pill |
