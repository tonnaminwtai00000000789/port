# Blog UI/UX Redesign Design Document

## Problem & Goal
The blog pages (`/blogs` and `/blogs/[slug]`) currently use an outdated warm-cream/orange color palette (`#f7f7f2`, `#161616`, `#ff4500`) and lack the shared navigation header (`<HeaderNav />`) and site footer present on the main portfolio page (`index.astro`).

The goal is to align the UI/UX of all blog pages seamlessly with the main page's Slate-Blue neo-brutalist theme (`#f8fafc`, `#0f172a`, `#60a5fa`, `#2563eb`).

## Proposed Solution & Architecture
1. **Consistent Layout & Navigation**:
   Wrap `/blogs` and `/blogs/[slug]` pages in the shared `<HeaderNav client:load />` and global `<footer>` component.

2. **React Island Components**:
   - `src/components/islands/BlogsList.tsx`: Displays blog list grid with Framer Motion entry animations, `#60a5fa` accent highlights, and Slate dark border cards.
   - `src/components/islands/BlogPostDetail.tsx`: Displays full blog post with hero header, paper card container, and responsive typography aligned with slate-900 `#0f172a`.

3. **Page Updates**:
   - `src/pages/blogs/index.astro`: Update to use `HeaderNav`, `BlogsList`, and global footer.
   - `src/pages/blogs/[slug].astro`: Update to use `HeaderNav`, `BlogPostDetail`, and global footer.

## Verification
- Run `bun run build` to verify zero TypeScript or Astro SSR compilation issues.
- Verify visual consistency, responsive layout, and links.
