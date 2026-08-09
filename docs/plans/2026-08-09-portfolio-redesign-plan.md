# Portfolio Redesign (Physical Desk Memo & Artifacts) Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** Redesign Tonnam's portfolio website into an authentic "Physical Desk Memo & Artifacts" visual identity using Astro 5, React 19, and Tailwind v4.

**Architecture:** Update global design system CSS tokens and typography in `global.css` and `Layout.astro`, then refactor React island components (`HeaderNav.tsx`, `Hero.tsx`, `Work.tsx`, `TechStack.tsx`, `Aboutme.tsx`, `BlogsSection.tsx`, `Contact.tsx`) to implement paper-textured panels, sticky notes, and clean stamp badges.

**Tech Stack:** Astro 5, React 19, Tailwind CSS v4, Framer Motion, Lucide-React, TypeScript.

---

### Task 1: Global Styles & Typography Tokens

**Files:**
- Modify: `src/layouts/Layout.astro`
- Modify: `src/styles/global.css`

**Step 1: Update fonts in Layout.astro**
Import `Space Grotesk`, `DM Sans`, and `Geist Mono` from Google Fonts, set body background to `#F6F5F0`.

**Step 2: Update global.css utilities**
Define `@theme` font rules (`--font-display: "Space Grotesk"`, `--font-sans: "DM Sans"`, `--font-mono: "Geist Mono"`), paper card styles (`.paper-card`), sticky note styles (`.sticky-memo-yellow`), and stamp badge utilities (`.stamp-btn`, `.stamp-label`).

**Step 3: Commit**
```bash
git add src/layouts/Layout.astro src/styles/global.css
git commit -m "style: configure physical desk memo typography and paper card utilities"
```

---

### Task 2: Header Component Redesign

**Files:**
- Modify: `src/components/islands/HeaderNav.tsx`

**Step 1: Refactor HeaderNav.tsx**
Replace floating glassmorphism navbar with a solid paper header bar (`#FFFFFF` background, `1px solid #1E293B` bottom border, live BKK clock badge, clean text navigation links).

**Step 2: Commit**
```bash
git add src/components/islands/HeaderNav.tsx
git commit -m "feat(ui): redesign HeaderNav to solid paper bar with BKK clock"
```

---

### Task 3: Hero Component Redesign

**Files:**
- Modify: `src/components/islands/Hero.tsx`

**Step 1: Refactor Hero.tsx**
Update hero grid layout with Space Grotesk display title, yellow sticky memo cards containing Tonnam's real quotes and background info, a Polaroid-style photo frame with tape corners, and ink stamp buttons (`ดูผลงานผม` and `[STATUS: ว่างจ้างได้]`).

**Step 2: Commit**
```bash
git add src/components/islands/Hero.tsx
git commit -m "feat(ui): redesign Hero component with yellow sticky memos and polaroid photo frame"
```

---

### Task 4: Work Showcase Redesign

**Files:**
- Modify: `src/components/islands/Work.tsx`

**Step 1: Refactor Work.tsx**
Update project cards to clean specification index sheets with 1px slate ink borders, paper tag badges, and live demo / GitHub buttons.

**Step 2: Commit**
```bash
git add src/components/islands/Work.tsx
git commit -m "feat(ui): redesign Work component with spec sheet index cards"
```

---

### Task 5: Tech Stack Component Redesign

**Files:**
- Modify: `src/components/islands/TechStack.tsx`

**Step 1: Refactor TechStack.tsx**
Group tech stack items into 3 physical paper trays: `Web & Fullstack`, `Hardware & Embedded`, and `Languages`.

**Step 2: Commit**
```bash
git add src/components/islands/TechStack.tsx
git commit -m "feat(ui): redesign TechStack component with hardware & web trays"
```

---

### Task 6: About Component Redesign

**Files:**
- Modify: `src/components/islands/Aboutme.tsx`

**Step 1: Refactor Aboutme.tsx**
Layout personal bio, interests (Games, Manhwa, Movies, Anime, Money 🤑), location, and birthday as a bulletin board with paper cards and status badges.

**Step 2: Commit**
```bash
git add src/components/islands/Aboutme.tsx
git commit -m "feat(ui): redesign Aboutme component as bulletin board"
```

---

### Task 7: Blogs & Contact Components Redesign

**Files:**
- Modify: `src/components/islands/BlogsSection.tsx`
- Modify: `src/components/islands/Contact.tsx`

**Step 1: Refactor BlogsSection.tsx & Contact.tsx**
Format blog posts as clean article clippings and contact section as a postcard with social links.

**Step 2: Commit**
```bash
git add src/components/islands/BlogsSection.tsx src/components/islands/Contact.tsx
git commit -m "feat(ui): redesign BlogsSection and Contact as paper article clippings and postcard"
```

---

### Task 8: Verification & Production Build

**Files:**
- None (Build verification)

**Step 1: Run production build**
Run `npm run build` to verify all Astro pages and React islands compile without errors.

**Step 2: Update task.md**
Mark all tasks in `docs/plans/task.md` as complete.

**Step 3: Commit**
```bash
git add docs/plans/task.md
git commit -m "chore: complete portfolio redesign implementation"
```
