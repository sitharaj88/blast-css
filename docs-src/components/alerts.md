---
title: Alerts
section: Components
lede: Inline messages for system status, validation, and informational notices.
---

# Alerts

<demo>
<div class="b-stack" style="--b-stack-gap: var(--b-3)">
  <div class="b-alert">
    <div class="b-alert-title">Heads up</div>
    <span>This is the default informational variant.</span>
  </div>
  <div class="b-alert b-alert-success">
    <div class="b-alert-title">Saved</div>
    <span>Your changes have been saved successfully.</span>
  </div>
  <div class="b-alert b-alert-warning">
    <div class="b-alert-title">Warning</div>
    <span>Subscription renews in 3 days.</span>
  </div>
  <div class="b-alert b-alert-danger">
    <div class="b-alert-title">Error</div>
    <span>Something went wrong. Please try again.</span>
  </div>
</div>
</demo>

## With dismiss button

<demo>
<div class="b-alert b-alert-warning b-split">
  <div>
    <div class="b-alert-title">Update available</div>
    <span>Version 0.5 is ready to install.</span>
  </div>
  <button class="b-close" aria-label="Dismiss">×</button>
</div>
</demo>

## API

| Class | Effect |
| --- | --- |
| `.b-alert` | Default info alert |
| `.b-alert-success` / `-warning` / `-danger` | Variants |
| `.b-alert-title` | Bold title in alert color |
