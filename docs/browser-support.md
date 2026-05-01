# Browser Support

BlastCSS targets current evergreen browsers and modern WebView environments.

## Supported Browsers

- Latest two stable versions of Chrome.
- Latest two stable versions of Edge.
- Latest two stable versions of Firefox.
- Latest two stable versions of Safari.
- Current iOS Safari.
- Current Android Chrome.

## CSS Features Used

BlastCSS intentionally uses modern CSS where it removes weight or JavaScript:

- Cascade layers.
- CSS custom properties.
- Logical properties.
- `color-mix()`.
- Native `dialog`, `details`, and `summary` styling.
- Modern media queries such as `prefers-reduced-motion`.

## Compatibility Policy

Browser support can be expanded in patch or minor releases. Dropping support for a browser or removing a fallback requires a major version after `1.0.0`.

## Legacy Browsers

BlastCSS does not target Internet Explorer or outdated non-evergreen browsers. Projects that need those environments should compile or post-process the distributed CSS in their own build pipeline.
