# Release Process

## Local Release Validation

```sh
npm ci
npm run verify
npm pack --dry-run
```

## Browser Installation

```sh
npx playwright install
```

In CI, the workflow uses:

```sh
npx playwright install --with-deps
```

## Publishing

Publishing is handled by `.github/workflows/release.yml` when a GitHub release is published.

Required secret:

- `NPM_TOKEN`

The workflow runs static checks, browser checks, package dry run, and then:

```sh
npm publish --provenance --access public
```

## Manual Publishing Guardrail

Do not publish manually unless CI is unavailable and all release validation commands pass locally.
