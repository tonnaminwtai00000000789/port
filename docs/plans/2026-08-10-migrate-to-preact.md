# Migrate Astro Project from React to Preact Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** Replace `@astrojs/react` and React with `@astrojs/preact` and Preact using `compat: true` in an Astro project.

**Architecture:** Update package dependencies to use `@astrojs/preact` and `preact`. Configure Astro integration with `{ compat: true }` so existing components and third-party UI libraries (`lucide-react`, `@radix-ui/*`, `framer-motion`) work seamlessly. Update TypeScript configuration for Preact JSX.

**Tech Stack:** Astro v7, `@astrojs/preact`, Preact v10, TypeScript, Bun.

---

### Task 1: Update Package Dependencies

**Files:**
- Modify: `package.json`

**Step 1: Update package.json to replace react packages with preact packages**

Remove `@astrojs/react`, `react`, `react-dom`, `@types/react`, `@types/react-dom`.
Add `@astrojs/preact` (^4.0.0 or latest) and `preact` (^10.0.0 or latest).

**Step 2: Install dependencies**

Run: `bun install`

---

### Task 2: Update Astro and TypeScript Configurations

**Files:**
- Modify: `astro.config.mjs`
- Modify: `tsconfig.json`

**Step 1: Update astro.config.mjs**

Replace `@astrojs/react` import with `@astrojs/preact`. Update `integrations: [preact({ compat: true })]`.

**Step 2: Update tsconfig.json**

Set `"jsxImportSource": "preact"`.

---

### Task 3: Update Components and Verify Build

**Files:**
- Modify: components in `src/components/islands/` and `src/components/ui/` if necessary
- Verify: full build

**Step 1: Verify island component compatibility**

Ensure components importing from `react` or using hooks operate cleanly with Preact compat.

**Step 2: Run build**

Run: `bun run build`
Expected: Build completes successfully with 0 errors.
