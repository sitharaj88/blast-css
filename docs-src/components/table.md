---
title: Table
section: Components
lede: Bordered, striped, and hoverable table styles for data-heavy interfaces.
---

# Table

<demo>
<table class="b-table b-table-hover">
  <thead><tr><th>Name</th><th>Role</th><th>Status</th></tr></thead>
  <tbody>
    <tr><td>Anya Chen</td><td>Designer</td><td><span class="b-badge b-badge-success b-badge-dot">Active</span></td></tr>
    <tr><td>Jordan Moss</td><td>Engineer</td><td><span class="b-badge b-badge-warning b-badge-dot">Trial</span></td></tr>
    <tr><td>Rita Gomez</td><td>PM</td><td><span class="b-badge b-badge-success b-badge-dot">Active</span></td></tr>
  </tbody>
</table>
</demo>

## Striped

<demo>
<table class="b-table b-table-striped">
  <thead><tr><th>Plan</th><th>Price</th></tr></thead>
  <tbody>
    <tr><td>Free</td><td>$0</td></tr>
    <tr><td>Pro</td><td>$49</td></tr>
    <tr><td>Team</td><td>$199</td></tr>
  </tbody>
</table>
</demo>

## API

| Class | Effect |
| --- | --- |
| `.b-table` | Bordered table |
| `.b-table-striped` | Alternating row backgrounds |
| `.b-table-hover` | Row hover background |
