---
title: Stat
section: Components
lede: Single metric display with label, value, and optional trend.
---

# Stat

<demo>
<div class="b-grid" style="--b-grid-min:14rem">
  <article class="b-stat">
    <span class="b-stat-label">Revenue</span>
    <strong class="b-stat-value">$48,920</strong>
    <span class="b-stat-trend">↑ 12% MoM</span>
  </article>
  <article class="b-stat">
    <span class="b-stat-label">Churn</span>
    <strong class="b-stat-value">1.8%</strong>
    <span class="b-stat-trend b-stat-trend-down">↓ 0.3%</span>
  </article>
  <article class="b-stat">
    <span class="b-stat-label">Sessions</span>
    <strong class="b-stat-value">12,840</strong>
    <span class="b-stat-trend">↑ 4%</span>
  </article>
</div>
</demo>

## API

| Class | Effect |
| --- | --- |
| `.b-stat` | Wrapper |
| `.b-stat-label` | Small caption |
| `.b-stat-value` | Big number |
| `.b-stat-trend` | Green trend |
| `.b-stat-trend-down` | Red trend |
