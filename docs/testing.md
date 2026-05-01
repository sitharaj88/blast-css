# Testing Strategy

BlastCSS uses fast local checks today and has a clear path for browser-level checks.

## Current Automated Checks

- CSS, JS, and token build.
- Gzip size budgets.
- Required selector checks.
- Package export checks.
- Static HTML quality checks.
- Benchmark artifact generation.
- Playwright render checks.
- Playwright interaction checks.
- Axe accessibility scans.
- Chromium visual screenshots.
- Browser matrix config for Chromium, Firefox, WebKit, mobile Chrome, and mobile Safari.

## Visual Regression

`tests/visual-manifest.json` lists pages and viewport sizes. Generate or update screenshot baselines with:

```sh
npm run test:visual:update
```

## Accessibility Scans

Axe scans run inside `npm run test:browser` against:

- `docs/index.html`
- `examples/index.html`
- `examples/kitchen-sink.html`
- benchmark pages
