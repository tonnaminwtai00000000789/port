# Cloudflare Workers Deployment Design Document

## Problem & Goal
The project currently uses `@astrojs/node` adapter intended for Node.js/Bun servers.
The goal is to configure the Astro 5 application to run seamlessly on Cloudflare Workers (Edge SSR + Static Assets serving) using `@astrojs/cloudflare` and `wrangler`.

## Proposed Solution & Architecture
1. **Adapter Change**:
   Replace `@astrojs/node` with `@astrojs/cloudflare` in `astro.config.mjs`.

2. **Cloudflare Worker Configuration (`wrangler.jsonc`)**:
   - `name: "astro-portfolio"`
   - `main: "./dist/_worker.js/index.js"`
   - `compatibility_date: "2026-08-05"`
   - `compatibility_flags: ["nodejs_compat"]`
   - `assets: { "binding": "ASSETS", "directory": "./dist" }`

3. **Scripts & Packages**:
   Add `@astrojs/cloudflare` and `wrangler` to `package.json`.

## Verification
- Run `bun run build` to verify generation of `dist/_worker.js/index.js`.
- Test local build output compatibility.
