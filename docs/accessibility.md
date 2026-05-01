# Accessibility

BlastCSS should make accessible interfaces easier, but CSS alone cannot guarantee accessibility. Component docs must describe the required semantic HTML and ARIA patterns where they matter.

## Baseline Commitments

- Visible focus states for interactive controls.
- Reduced motion support through `prefers-reduced-motion`.
- Screen-reader-only helper.
- Skip link helper.
- Semantic examples in docs.
- Native controls where they provide better platform behavior.
- Color tokens that can be themed for contrast.

## Author Responsibilities

Application authors still need to provide:

- Correct labels for form controls.
- Useful button and link text.
- Correct heading order.
- Keyboard behavior for custom JavaScript interactions.
- ARIA only when native semantics are not enough.
- Sufficient color contrast after custom theming.

## Component Requirements

Interactive components should document:

- Required HTML structure.
- Required ARIA attributes.
- Keyboard interactions.
- Focus management.
- Reduced motion behavior.
- Known CSS-only limitations.

## CSS-Only Limitations

Some components cannot be fully accessible with CSS alone in every use case. Dropdowns, popovers, tooltips, drawers, dismissible toasts, and complex modal workflows may need optional JavaScript helpers.
