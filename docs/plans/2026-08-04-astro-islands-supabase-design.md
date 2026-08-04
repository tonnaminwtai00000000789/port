# Design Document: Migration to Astro + Islands + SSR (Supabase + Bun)

Date: 2026-08-04
Status: Approved

## Overview
Re-architect the existing React Router portfolio application (`d:\client`) to **Astro** with **Islands Architecture**, powered by **SSR (Server-Side Rendering)** with **@nurodev/astro-bun** adapter and **Supabase PostgreSQL** database. All existing data in CSV files (`hero_rows.csv`, `about_me_rows.csv`, `tech_stack_rows.csv`, `contact_rows.csv`, `blog_rows.csv`) will be migrated into Supabase tables.

## Requirements & Stack
- **Framework**: Astro 5+
- **SSR Adapter**: `@nurodev/astro-bun`
- **Output Mode**: `output: 'server'`
- **Islands UI**: React (`@astrojs/react`)
- **Styling**: Tailwind CSS
- **Database**: Supabase PostgreSQL (`@supabase/supabase-js`)
- **Package Manager / Runtime**: Bun

## Data Architecture & Supabase Schema
Tables to be created in Supabase:
1. `hero` (id, first_name, last_name, display_name, nickname, birth_date, start_date, location, profile_image, emoji, webring_url, positions)
2. `about_me` (id, nickname, status, status_link, full_name, birthday, location, facts)
3. `tech_stack` (id, category, order, technologies)
4. `contact` (id, email, socials)
5. `blog` (id, title, slug, image, date, content, published, created_at, updated_at)

A seeding script (`scripts/seed-supabase.ts`) will parse the CSV files and insert/upsert the rows into Supabase.

## Project Structure
```
d:/client/
├── public/                 # Static public assets
├── scripts/
│   └── seed-supabase.ts   # CSV to Supabase seeder
├── src/
│   ├── components/
│   │   ├── islands/        # Dynamic React Components
│   │   │   ├── HeaderNav.tsx
│   │   │   ├── TechStack.tsx
│   │   │   ├── ContactForm.tsx
│   │   │   └── FactsCarousel.tsx
│   │   └── static/         # Astro Static Components
│   │       ├── HeroSection.astro
│   │       ├── AboutSection.astro
│   │       └── BlogCard.astro
│   ├── layouts/
│   │   └── Layout.astro    # Base HTML Shell, Meta, Fonts
│   ├── lib/
│   │   └── supabase.ts     # Supabase Singleton Client
│   └── pages/
│       ├── index.astro     # Portfolio Main SSR Page
│       ├── blog/
│       │   ├── index.astro  # Blog List SSR Page
│       │   └── [slug].astro # Blog Post Detail SSR Page
│       └── api/            # API Endpoints (if needed)
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Astro Configuration (`astro.config.mjs`)
```ts
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwindcss';
import bun from '@nurodev/astro-bun';

export default defineConfig({
  output: 'server',
  adapter: bun(),
  integrations: [
    react(),
    tailwind()
  ],
});
```

## Package Scripts (`package.json`)
```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro check && astro build",
    "preview": "astro preview",
    "start": "bun run ./dist/server/entry.mjs",
    "seed": "bun run ./scripts/seed-supabase.ts"
  }
}
```

## Implementation Workflow
1. Scaffold Astro app in project root using Bun / preserve existing `.csv` & assets.
2. Setup Supabase Client & SQL Schema / Seeder Script.
3. Configure `@nurodev/astro-bun`, `@astrojs/react`, Tailwind CSS.
4. Implement Base Layout, SSR Pages, and React Islands.
5. Verification: Build & run using Bun, check SSR & dynamic interactive islands.
