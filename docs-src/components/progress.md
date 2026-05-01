---
title: Progress & spinner
section: Components
lede: Linear progress bars and circular spinners.
---

# Progress & spinner

## Progress

<demo>
<div class="b-stack" style="--b-stack-gap: var(--b-3)">
  <div class="b-progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="20"><span style="--b-progress: 20%"></span></div>
  <div class="b-progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="60"><span style="--b-progress: 60%"></span></div>
  <div class="b-progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="92"><span style="--b-progress: 92%"></span></div>
</div>
</demo>

## Indeterminate

<demo>
<div class="b-progress b-progress-indeterminate" role="progressbar" aria-label="Loading"><span></span></div>
</demo>

## Spinner

<demo>
<div class="b-cluster">
  <span class="b-spinner b-spinner-sm"></span>
  <span class="b-spinner"></span>
  <span class="b-spinner b-spinner-lg"></span>
</div>
</demo>

## API

| Class | Effect |
| --- | --- |
| `.b-progress` | Linear bar wrapper |
| `.b-progress-indeterminate` | Looping animation |
| `style="--b-progress: 60%"` | Set the fill percentage |
| `.b-spinner` | Circular spinner |
| `.b-spinner-sm` / `-lg` | Sizes |
