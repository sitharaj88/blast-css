# Versioning

BlastCSS follows semantic versioning.

## Before 1.0.0

The public API is still forming. Minor releases may include breaking changes, but breaking changes must be called out in `CHANGELOG.md`.

## After 1.0.0

- Major: breaking API changes.
- Minor: new components, utilities, tokens, exports, or backwards-compatible features.
- Patch: bug fixes, docs, accessibility improvements, browser fixes, and size reductions.

## Release Checklist

Before a release:

- Run `npm test`.
- Confirm `dist/size-report.txt` reflects the generated output.
- Update `CHANGELOG.md`.
- Review public API changes.
- Review browser and accessibility impact.
