# Align Project Structure with Official Astro Guidelines Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** Align project directory layout with official Astro Project Structure guidelines.

**Architecture:** Create standard `src/env.d.ts` type declaration file, `src/assets/`, and `src/content/` directories. Update `tsconfig.json` to reference `src/env.d.ts`.

**Tech Stack:** Astro v7, TypeScript, Bun.

---

### Task 1: Create Standard Astro Directories & Type Declarations

**Files:**
- Create: `src/env.d.ts`
- Create: `src/assets/.gitkeep`
- Create: `src/content/.gitkeep`
- Modify: `tsconfig.json`

**Step 1: Create `src/env.d.ts`**
Add `/// <reference types="astro/client" />`

**Step 2: Create placeholder directories for `src/assets` and `src/content`**

**Step 3: Update `tsconfig.json`**
Add `"src/env.d.ts"` to `include`.

**Step 4: Verify build**
Run: `bun run build`
