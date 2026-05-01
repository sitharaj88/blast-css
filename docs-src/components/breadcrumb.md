---
title: Breadcrumb
section: Components
lede: Hierarchical navigation trail. Slash separators, last item marked as current.
---

# Breadcrumb

<demo>
<ol class="b-breadcrumb" aria-label="Breadcrumb">
  <li><a href="#">Home</a></li>
  <li><a href="#">Projects</a></li>
  <li><a href="#">Acme</a></li>
  <li aria-current="page">Settings</li>
</ol>
</demo>

## API

| Class | Effect |
| --- | --- |
| `.b-breadcrumb` | Wrapper (use an `<ol>`) |
| `aria-current="page"` | Marks the current crumb |
