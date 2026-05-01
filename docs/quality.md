# Quality Gates

BlastCSS uses local checks that can run in CI without external services.

## Build

```sh
npm run build
```

Generates bundled and minified CSS files in `dist/`.

## Size Budgets

```sh
npm run check:size
```

Current gzip limits:

```text
full         7.0 KB
core         3.0 KB
components   3.5 KB
utilities    2.8 KB
reset        0.6 KB
```

## Export Quality

```sh
npm run check:quality
```

This verifies that production bundles do not contain unresolved imports and that important selectors exist in the expected exports.

## Package Exports

```sh
npm run check:exports
```

Verifies every `package.json` export points to a generated file.

## HTML Fixtures

```sh
npm run check:html
```

Verifies docs, examples, and benchmark fixtures include basic production HTML structure.

## Visual Manifest

```sh
npm run check:visual-manifest
```

Verifies every page listed for future screenshot testing exists.
