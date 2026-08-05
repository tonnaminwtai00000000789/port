# Performance & Caching Design Document

## Problem & Background
The portfolio application built with Astro 5 in SSR mode (`output: 'server'`) fetches content directly from Supabase via database network calls on every single page render (`index.astro`, `works.astro`, `blogs`). This incurs unnecessary Supabase latency (~150ms-500ms) on each request even when content hasn't changed.

## Solution Architecture
Implement a two-tier caching strategy:
1. **Server-side In-Memory Cache with Stale-While-Revalidate (SWR) & On-Demand Purge**
2. **HTTP Response Cache-Control Headers**

```
[Browser / Client]
       │
       ▼  HTTP Request
[Astro SSR Pages] ──(Set Response Header)──► Cache-Control: public, max-age=60, s-maxage=600, stale-while-revalidate=3600
       │
       ▼  Calls getHeroData(), getWorksData(), etc.
[In-Memory Cache Manager (src/lib/cache.ts)]
       ├─── (Cache Hit & Valid) ──────────► Return JSON immediately (~0ms)
       ├─── (Cache Stale) ────────────────► Return stale JSON (~0ms) & Trigger background fetch to Supabase
       └─── (Cache Miss) ─────────────────► Fetch Supabase (~150-500ms) ──► Cache result & Return

[Admin Panel Dashboard (src/components/islands/AdminDashboard.tsx)]
       │
       ▼  On successful mutation
[POST /api/revalidate] ─────────► Calls clearCache(key) on server in-memory store
```

## Proposed Changes

### 1. In-Memory Cache Helper (`src/lib/cache.ts`)
- Maintain a global singleton in-memory map storing cached data along with timestamps and revalidation state.
- Support `getCachedData<T>(key, fetchFn, ttlMs)` implementing Stale-While-Revalidate pattern.
- Support `clearCache(key?: string)` to clear specific keys or invalidate all entries.

### 2. Wrap Supabase Data Queries (`src/lib/data.ts`)
- Wrap `getHeroData`, `getAboutMeData`, `getTechStackData`, `getWorksData`, `getContactData`, `getBlogPosts`, `getBlogPostBySlug` with `getCachedData`.

### 3. Revalidation API Endpoint (`src/pages/api/revalidate.ts`)
- Handle `POST` requests to clear in-memory cache when changes are made.

### 4. Admin Dashboard Cache Purge (`src/components/islands/AdminDashboard.tsx`)
- Trigger `/api/revalidate` after successful updates/inserts to ensure data is updated immediately.

### 5. HTTP Response Cache Headers
- Set `Astro.response.headers.set('Cache-Control', 'public, max-age=60, s-maxage=600, stale-while-revalidate=3600')` on public pages.

## Verification & Error Handling
- **Resilience**: If Supabase fails during background revalidation, stale cache will continue serving content without interrupting user experience.
- **Verification**: Verify latency drop on page loads and verify immediate update when saving changes in Admin.
