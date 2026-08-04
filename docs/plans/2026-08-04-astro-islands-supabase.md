# Astro + Islands + Supabase Migration Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** Migrate existing React Router portfolio application (`d:\client`) to Astro 5 SSR with Bun (`@nurodev/astro-bun`), React Islands (`@astrojs/react`), Tailwind CSS, and Supabase PostgreSQL.

**Architecture:** Astro in SSR mode (`output: 'server'`) with `@nurodev/astro-bun` adapter. Page routes query Supabase on the server side (`src/lib/supabase.ts`) for maximum speed & SEO, while interactive UI elements (tabs, forms, modals) are hydrated as React Islands. CSV rows are seeded into Supabase tables via script.

**Tech Stack:** Astro 5, Bun, `@nurodev/astro-bun`, React 19, `@astrojs/react`, Tailwind CSS 4, `@supabase/supabase-js`, TypeScript.

---

### Task 1: Initialize Astro Project & Dependencies

**Files:**
- Create/Modify: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`

**Step 1: Install Astro and required integrations using Bun**
Run:
```bash
bun add astro @astrojs/react @nurodev/astro-bun @supabase/supabase-js tailwindcss @tailwindcss/vite
bun add -D typescript @types/node
```

**Step 2: Create `astro.config.mjs`**
```js
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import bun from '@nurodev/astro-bun';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'server',
  adapter: bun(),
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

**Step 3: Update `package.json` scripts**
Set:
```json
"scripts": {
  "dev": "astro dev",
  "build": "astro check && astro build",
  "preview": "astro preview",
  "start": "bun run ./dist/server/entry.mjs",
  "seed": "bun run ./scripts/seed-supabase.ts"
}
```

---

### Task 2: Supabase Schema & Seeder Script

**Files:**
- Create: `src/lib/supabase.ts`
- Create: `scripts/seed-supabase.ts`
- Create: `supabase/schema.sql`

**Step 1: Create Supabase Singleton Client (`src/lib/supabase.ts`)**
```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

**Step 2: Create SQL Schema definition (`supabase/schema.sql`)**
Define tables: `hero`, `about_me`, `tech_stack`, `contact`, `blog`.

**Step 3: Create CSV Seeding Script (`scripts/seed-supabase.ts`)**
Read CSV files (`hero_rows.csv`, `about_me_rows.csv`, `tech_stack_rows.csv`, `contact_rows.csv`, `blog_rows.csv`) using Bun file reading/parsing and upsert into Supabase tables when environment variables are set, or mock fallback for local dev.

---

### Task 3: Base Layout & Styles

**Files:**
- Create: `src/styles/global.css`
- Create: `src/layouts/Layout.astro`

**Step 1: Create `src/styles/global.css`**
Import Tailwind CSS and font/theme styles.

**Step 2: Create `src/layouts/Layout.astro`**
HTML shell with dynamic title, meta tags, theme setup, font imports, and slot.

---

### Task 4: React Islands & Static Components

**Files:**
- Create: `src/components/islands/HeaderNav.tsx`
- Create: `src/components/islands/TechStackTabs.tsx`
- Create: `src/components/islands/FactsCarousel.tsx`
- Create: `src/components/static/HeroSection.astro`
- Create: `src/components/static/AboutSection.astro`
- Create: `src/components/static/BlogCard.astro`

**Step 1: Create React Islands**
- `HeaderNav.tsx`: Navigation bar with mobile toggle & dark mode switcher (`client:load`)
- `TechStackTabs.tsx`: Interactive filterable technology stack (`client:visible`)
- `FactsCarousel.tsx`: Interactive facts viewer (`client:visible`)

**Step 2: Create Static Astro Components**
- `HeroSection.astro`: Server-rendered hero details
- `AboutSection.astro`: Server-rendered profile info
- `BlogCard.astro`: Server-rendered post preview card

---

### Task 5: Pages & Routing (SSR Pages)

**Files:**
- Create: `src/pages/index.astro`
- Create: `src/pages/blog/index.astro`
- Create: `src/pages/blog/[slug].astro`

**Step 1: Implement `src/pages/index.astro`**
Fetch `hero`, `about_me`, `tech_stack`, `contact` from Supabase on SSR, render static Astro sections and React Islands.

**Step 2: Implement `src/pages/blog/index.astro`**
Fetch `blog` posts from Supabase on SSR and render post grid.

**Step 3: Implement `src/pages/blog/[slug].astro`**
Fetch single blog post by slug from Supabase on SSR and render markdown content with layout.

---

### Task 6: Build & Verification

**Files:**
- Test: Build output directory `dist/`

**Step 1: Run Typecheck and Build**
Run: `bun run build`
Expected: Clean compilation, `dist/server/entry.mjs` generated.

**Step 2: Run Production Server**
Run: `bun run start` (or test dev server `bun run dev`)
Expected: Server starts on Bun runtime using `@nurodev/astro-bun` adapter.
