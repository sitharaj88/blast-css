---
title: Stepper
section: Components
status: new
browser: Evergreen
lede: Vertical or horizontal step indicator for multi-step flows. Auto-numbered.
---

# Stepper

## Vertical

<demo>
<ol class="b-stepper">
  <li class="b-step" data-state="done"><div><div class="b-step-title">Create account</div><div class="b-step-desc">Enter your name and email</div></div></li>
  <li class="b-step" data-state="done"><div><div class="b-step-title">Verify email</div><div class="b-step-desc">Check your inbox</div></div></li>
  <li class="b-step" data-state="current"><div><div class="b-step-title">Choose plan</div><div class="b-step-desc">Pro is recommended</div></div></li>
  <li class="b-step"><div><div class="b-step-title">Invite team</div><div class="b-step-desc">Optional</div></div></li>
</ol>
</demo>

## Horizontal

<demo>
<ol class="b-stepper b-stepper-horizontal">
  <li class="b-step" data-state="done"><div><div class="b-step-title">Pick</div></div></li>
  <li class="b-step" data-state="current"><div><div class="b-step-title">Pay</div></div></li>
  <li class="b-step"><div><div class="b-step-title">Ship</div></div></li>
</ol>
</demo>

## API

| Attribute | Effect |
| --- | --- |
| `.b-stepper` | Vertical (default) |
| `.b-stepper-horizontal` | Horizontal layout |
| `.b-step` | Step item |
| `data-state="done"` | Step completed (shows ✓) |
| `data-state="current"` | Active step |
| `.b-step-title` / `.b-step-desc` | Title and description |

Numbers are auto-generated via CSS counters — no JS or hard-coded indices needed.
