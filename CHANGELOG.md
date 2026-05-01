# Changelog

All notable changes to BlastCSS will be documented here.

## 0.4.0

### Foundations modernized
- Migrated the entire color system to **OKLCH** with `light-dark()` so dark mode works without redefining variables.
- Added `color-scheme: light dark` by default, with `[data-theme="dark"]` / `[data-theme="light"]` overriding.
- Added `@supports not (color: light-dark(...))` fallback for older browsers.
- Added fluid type scale (`--b-fluid-h1`, `--b-fluid-h2`, `--b-fluid-h3`, `--b-fluid-lead`).
- Added fluid spacing (`--b-fluid-1`…`--b-fluid-5`) and expanded spacing scale (`--b-7`, `--b-14`, `--b-20`, `--b-24`, `--b-px`).
- Added motion tokens (`--b-duration-instant/fast/slow/slower`, `--b-ease-in/out/spring`).
- Added z-index scale (`--b-z-dropdown/sticky/popover/toast/modal/max`).
- Added shadow tokens (`--b-shadow-xs/xl/ring/glow`).

### Reset & base
- Added `interpolate-size: allow-keywords` for animating to/from `auto`.
- Added `text-wrap: balance` on headings and `text-wrap: pretty` on paragraphs.
- Added blockquote, mark, kbd, abbr, figure styling.
- Added `:where()`-scoped resets to lower specificity.
- Modernized scrollbar styling.

### Layout
- All `.b-container*` now have `container-type: inline-size` enabling container queries.
- Added `.b-center`, `.b-cover`, `.b-switcher`, `.b-prose`, `.b-spacer`, `.b-subgrid`, `.b-sidebar-end`.
- Added container-aware breakpoint variants via `@sm:`, `@md:`, `@lg:`.

### Forms
- Textareas now use `field-sizing: content` to grow with input.
- Added `.b-input-sm` / `.b-input-lg`, `.b-search` (with icon), `.b-error`, `.b-fieldset`, `[data-required]` label.
- Improved validation focus rings.

### Components — modernized
- Modals and drawers now use `@starting-style` + `transition-behavior: allow-discrete` for native open/close animations.
- Popovers support the native `popover` attribute and CSS `anchor-name` / `position-anchor` where supported, with JS fallback.
- Buttons gained `.b-btn-soft`, `.b-btn-outline`, `.b-btn-success`, `.b-btn-warning`, plus loading state via `aria-busy="true"`.
- Cards now have `.b-card-interactive` and use container queries.
- Tabs gained `.b-tabs-pill` variant.
- Tables gained `.b-table-striped` and `.b-table-hover`.
- Toasts entry-animate via `@starting-style`.
- Navbar gained backdrop blur and `.b-navbar-sticky`.
- Avatars gained sizes (`-sm/-lg/-xl`) and `.b-avatar-status` indicator.
- Stat gained `.b-stat-trend` (and `-down` variant).
- Progress gained `.b-progress-indeterminate`.
- Added `.b-kbd` and `.b-divider`.
- Added `.b-badge-info`, `.b-badge-neutral`, `.b-badge-dot`.

### New components
- **Segmented control** (`.b-segmented`) — radio-based, accessible.
- **Combobox** (`.b-combobox`) — searchable input with arrow-key navigation.
- **Command palette** (`.b-command`) — Spotlight-style with global ⌘K shortcut.
- **Tag input** (`.b-tag-input`) — multi-value entry with chips.
- **Stepper** (`.b-stepper`, `.b-stepper-horizontal`) — auto-numbered via CSS counters.
- **Code block** (`.b-code`) with header, language label, and copy button.
- **Hero** (`.b-hero`, `.b-hero-grid`) for landing pages.

### Motion layer (new)
- `@view-transition` enabled by default for cross-document SPA-style navigation.
- Reusable named transitions: `.b-vt-name` with `--b-vt`.
- Scroll-driven `b-reveal` animation where `animation-timeline` is supported.
- Animation utilities: `.b-anim-fade-in`, `-slide-up`, `-scale-in`, `-pulse`.
- Reduced-motion guard at the layer level.

### Utilities
- Container-query variants: `@sm:`, `@md:`, `@lg:` (e.g., `@md:grid-2`).
- New utilities: `truncate`, `text-pretty`, `aspect-portrait`, `font-display`, `font-semi`, `tracking-*`, `bg-soft-*`, `bg-gradient-primary`, `border-strong`, `border-primary`, `border-t/-b`, `rounded-2xl`, `rounded-md`, `rounded-full`, `shadow-xs/-xl/-glow`, `scroll-snap-x/-y`, `snap-*`, `content-auto`, `isolate`, `scheme-*`, `motion-safe:*`, `motion-reduce:*`, expanded `gap-*`, `col-span-*`, `row-span-*`, `h-screen`, `min-h-screen`, `max-w-prose`, `w-fit`.

### JavaScript (new helpers)
- `showToast({ title, body, variant, duration })` — programmatic toast API.
- `viewTransition(callback)` — wrap DOM mutations in a View Transition.
- `initSegmented`, `initCombobox`, `initTagInput`, `initCommand`, `initTheme` — auto-included in `autoInit()`.
- Theme toggle (`data-b-toggle="theme"`) with `localStorage` persistence and `b:theme:change` event.
- Popover anchor wiring via `anchor-name` where supported.

### Documentation site (rewritten)
- Brand-new generated docs site at `docs/` with sidebar nav, sticky header, command-palette search (⌘K), copy-to-clipboard on code blocks, scrollspy on each page, and live theme toggle.
- New theme playground at `docs/playground.html` — interactive sliders for hue, chroma, radius, density, and weight; live CSS export.
- New showcase at `docs/showcase.html` — three realistic interfaces (dashboard, marketing, settings form).
- 33 markdown content files in `docs-src/` (guides + components + utilities) authored from scratch.
- Zero-dependency static generator at `scripts/build-docs.mjs`.

### Build & tooling
- Build script now emits `blast.components-extra.min.css` and `blast.motion.min.css` bundles.
- Token export rewritten to parse `light-dark()` calls and emit accurate light/dark JSON, CSS, and TypeScript.
- Updated `npm run test:static` to also build docs.
- Added `npm run build:docs` and `npm run build:all`.
- Updated `serve.mjs` with smart fallback to `docs/` for arbitrary paths.

### Browser support
- Floor raised to evergreen (Chrome/Edge 125+, Safari 17.4+, Firefox 128+) for `light-dark()`, `@starting-style`, container queries, popover API.
- Older browsers fall back to a static hex palette via `@supports`.

## 0.3.0

- Added optional JavaScript helpers for dialogs, collapse, tabs, dropdown close behavior, toasts, and popovers.
- Added spinner, drawer, collapse, popover, close button, input group, switch, range, and file input styling.
- Added static docs site, theme playground, kitchen-sink example, benchmark fixtures, and starter templates.
- Added generated token exports for CSS, JSON, and TypeScript.
- Added package export checks, HTML fixture checks, visual manifest checks, and benchmark generation.
- Added Playwright browser tests, axe scans, visual screenshot tests, and browser matrix CI.
- Added Bootstrap migration guide, 1.0 readiness checklist, and release process docs.
- Added release workflow with npm provenance publishing and package dry-run validation.

## 0.2.0

- Expanded component coverage with dropdown, accordion, toast, tooltip, pagination, breadcrumb, avatars, chips, lists, stats, empty states, icon buttons, and button groups.
- Expanded utility coverage for layout, sizing, aspect ratio, object fit, opacity, pointer events, positioning, and responsive grids.
- Added quality checks for bundled exports and required selectors.
- Tightened gzip size budgets.
- Added architecture, components, frameworks, and quality docs.

## 0.1.0

- Added the first CSS-only framework foundation.
- Added tokens, reset, base styles, layout primitives, forms, accessibility helpers, components, and utilities.
- Added dependency-free build script and gzip size checks.
- Added static demo and README.
