# Contributing

BlastCSS aims to stay small, predictable, accessible, and framework-agnostic.

## Local Checks

```sh
npm test
```

This builds the framework, checks gzip budgets, and verifies important exports.

## Contribution Rules

- Keep CSS-only behavior as the default.
- Do not add runtime dependencies to the core CSS package.
- Keep new components semantic and accessible.
- Prefer native HTML controls before custom behavior.
- Add docs for every public class or component family.
- Keep output size under the configured budgets.
- Do not rename public classes without documenting the breaking change.

## Adding A Component

When adding a component:

- Add styles to `src/components.css`.
- Add an example to `docs/components.md`.
- Add demo coverage to `examples/index.html` when useful.
- Add required selectors to `scripts/quality-check.mjs` if the component is core.
- Run `npm test`.

## Adding Utilities

When adding utilities:

- Keep names short and predictable.
- Avoid one-off utilities that only serve a single example.
- Prefer token-backed values where possible.
- Confirm the utility bundle stays under budget.
