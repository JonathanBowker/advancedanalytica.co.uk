# src/components/AGENTS.md

## Scope

These instructions apply to Astro, React, and UI components inside `src/components`.

## Component edit controls

Make component edits minimal and backward-compatible.

Default budget:

- Inspect at most 3 component files.
- Edit at most 1 component file.
- Do not change component props or public API unless asked.
- Do not rewrite components from scratch unless asked.
- Do not move shared components without approval.
- Do not edit global CSS, Tailwind config, Astro config, or package files unless approved.

## Visual work

For layout or visual polish:

- Preserve existing brand palette unless asked.
- Prefer spacing, hierarchy, and structure changes over new dependencies.
- Keep dark premium enterprise style where already present.
- Use clear visual hierarchy, not more decoration.
- Avoid excessive glows, over-styled panels, and clutter.

## Lottie and animation

If adding or editing Lottie:

- Put JSON assets in `public/lotties`.
- Use a wrapper component.
- Do not use CDN dependencies in production unless the user asks.
- Do not install packages without approval.
- Respect reduced-motion preferences where practical.

## Accessibility

Do not remove focus states.

Use real links for navigation and real buttons for actions.

Add `aria-label` only when visible text is not enough.

Do not hide essential text inside animations or images.
