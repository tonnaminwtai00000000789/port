# Cloudflare Workers Deployment Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** Configure the Astro 5 portfolio project to run on Cloudflare Workers using `@astrojs/cloudflare` adapter and `wrangler.jsonc`.

**Architecture:** Replace `@astrojs/node` adapter with `@astrojs/cloudflare` in `astro.config.mjs`, create `wrangler.jsonc` configured for worker entry and assets binding, and add npm scripts for local preview and worker deployment.

**Tech Stack:** Astro 5, `@astrojs/cloudflare`, Wrangler CLI, Cloudflare Workers.

---

### Task 1: Install Cloudflare Packages and Update `package.json`

**Files:**
- Modify: `package.json:1-35`

**Step 1: Install `@astrojs/cloudflare` and `wrangler`**

Run: `bun add @astrojs/cloudflare`
Run: `bun add -d wrangler`

**Step 2: Update scripts in `package.json`**

Update `package.json` scripts:
```json
"scripts": {
  "dev": "astro dev",
  "build": "astro build",
  "preview": "wrangler dev",
  "deploy": "wrangler deploy",
  "seed": "bun run ./scripts/seed-supabase.ts"
}
```

**Step 3: Commit**

```bash
git add package.json bun.lock
git commit -m "feat: add @astrojs/cloudflare adapter and wrangler dependency"
```

---

### Task 2: Configure `astro.config.mjs` and Create `wrangler.jsonc`

**Files:**
- Modify: `astro.config.mjs:1-48`
- Create: `wrangler.jsonc`

**Step 1: Update `astro.config.mjs`**

```javascript
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'server',
  adapter: cloudflare(),
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [
        '@supabase/supabase-js',
        'framer-motion',
        'lucide-react',
        'react',
        'react-dom',
      ],
    },
  },
});
```

**Step 2: Create `wrangler.jsonc`**

```json
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "astro-portfolio",
  "main": "./dist/_worker.js/index.js",
  "compatibility_date": "2026-08-05",
  "compatibility_flags": ["nodejs_compat"],
  "assets": {
    "binding": "ASSETS",
    "directory": "./dist"
  }
}
```

**Step 3: Commit**

```bash
git add astro.config.mjs wrangler.jsonc
git commit -m "feat: configure cloudflare adapter and wrangler.jsonc"
```

---

### Task 3: Build Verification

**Step 1: Verify Cloudflare Worker build**

Run: `bun run build`
Expected: Successfully generates `dist/_worker.js/index.js` without bundling errors.

**Step 2: Commit**

```bash
git commit --allow-empty -m "build: verify Cloudflare Worker build passes"
```
