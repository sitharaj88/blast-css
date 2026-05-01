# Public API

This document defines what BlastCSS treats as public and stable.

## Stable Surfaces

- Package exports in `package.json`.
- Generated CSS files in `dist/`.
- Source entry files in `src/`: `blast.css`, `core.css`, `components.css`, `utilities.css`, and `reset.css`.
- Component classes prefixed with `b-`.
- Layout classes prefixed with `b-`.
- Design tokens prefixed with `--b-`.
- Utility classes documented in `src/utilities.css`.
- Cascade layer names prefixed with `blast.`.

## Naming Rules

- Components and layout primitives use `b-`, for example `b-btn`, `b-card`, and `b-container`.
- Component variants append a readable suffix, for example `b-btn-secondary` and `b-alert-danger`.
- Utilities stay short and unprefixed because they are optional and can be imported separately.
- Responsive utilities use escaped breakpoint prefixes in CSS, for example `.sm\:w-full`.
- Tokens use `--b-` and should describe purpose before raw value.

## Breaking Changes

These require a major version once the project reaches `1.0.0`:

- Removing or renaming a public class.
- Removing or renaming a public token.
- Changing an export path.
- Changing component semantics in a way that breaks existing markup.
- Raising the minimum browser support level.

## Non-Breaking Changes

These are minor or patch changes depending on risk:

- Adding new classes, components, tokens, or exports.
- Fixing accessibility, focus, layout, or browser bugs.
- Reducing output size without changing behavior.
- Improving docs, examples, or tests.

## Experimental Surface

Before `1.0.0`, new components may still change. Experimental additions should be documented with an explicit note in component docs before release.
