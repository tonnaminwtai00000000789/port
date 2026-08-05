# Page Transition Animations Design Document

## Problem & Goal
The website currently transitions abruptly between pages on navigation because Astro View Transitions are not enabled.

The goal is to implement a high-speed, sleek, non-tacky "Accent Bar Fast Wipe" page transition using native Astro 5 View Transitions (`ClientRouter`) and custom CSS keyframe animations in `src/styles/global.css`.

## Proposed Solution & Architecture
1. **Enable Astro ClientRouter**:
   Import `{ ClientRouter }` from `astro:transitions` and add `<ClientRouter />` to `<head>` in `src/layouts/Layout.astro`.

2. **Custom CSS View Transitions**:
   In `src/styles/global.css`, define custom clip-path Wipe keyframe animations with `cubic-bezier(0.16, 1, 0.3, 1)` timing (~350ms duration) for `::view-transition-old(root)` and `::view-transition-new(root)`.

3. **Accessibility**:
   Include `@media (prefers-reduced-motion: reduce)` to disable transitions for users who prefer reduced motion.

## Verification
- Verify smooth page navigation between `/`, `/works`, `/blogs`, `/blogs/[slug]`, and `/admin`.
- Verify production build with `bun run build`.
