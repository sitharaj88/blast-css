---
title: Avatar
section: Components
lede: Circular profile image or initials. Supports sizes, status indicators, and stacked groups.
---

# Avatar

## Initials

<demo>
<div class="b-cluster">
  <span class="b-avatar b-avatar-sm">AC</span>
  <span class="b-avatar">JM</span>
  <span class="b-avatar b-avatar-lg">RG</span>
  <span class="b-avatar b-avatar-xl">DP</span>
</div>
</demo>

## Image

<demo>
<span class="b-avatar"><img alt="" src="https://i.pravatar.cc/64?u=blast"></span>
</demo>

## Status indicator

<demo>
<span class="b-avatar b-avatar-status">JD</span>
</demo>

## Stacked group

<demo>
<div class="b-avatar-group">
  <span class="b-avatar">A</span>
  <span class="b-avatar">B</span>
  <span class="b-avatar">C</span>
  <span class="b-avatar">+4</span>
</div>
</demo>

## API

| Class | Effect |
| --- | --- |
| `.b-avatar` | Default avatar (2.5rem) |
| `.b-avatar-sm` / `-lg` / `-xl` | Sizes |
| `.b-avatar-status` | Adds online indicator |
| `.b-avatar-group` | Overlapping stack |
| `style="--b-avatar-size: 4rem"` | Custom size |
