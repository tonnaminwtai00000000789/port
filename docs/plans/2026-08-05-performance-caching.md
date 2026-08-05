# Performance & Caching Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** Implement server-side In-Memory Stale-While-Revalidate (SWR) caching and HTTP response Cache-Control headers to optimize website loading speed from ~300ms to near 0ms database latency, while supporting instant admin cache invalidation.

**Architecture:** A generic in-memory cache helper (`src/lib/cache.ts`) wraps all Supabase queries in `src/lib/data.ts`. A new API route (`src/pages/api/revalidate.ts`) receives invalidation signals from `AdminDashboard.tsx`. Public Astro SSR pages attach HTTP `Cache-Control` response headers.

**Tech Stack:** Astro 5, TypeScript, Supabase JS Client, Node/Bun runtime.

---

### Task 1: Create In-Memory Cache Store Helper (`src/lib/cache.ts`)

**Files:**
- Create: `src/lib/cache.ts`

**Step 1: Write minimal implementation for `cache.ts`**

```typescript
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  isFetching?: boolean;
}

const memoryStore = new Map<string, CacheEntry<any>>();

export async function getCachedData<T>(
  key: string,
  fetchFn: () => Promise<T>,
  ttlMs: number = 600000 // 10 minutes default
): Promise<T> {
  const now = Date.now();
  const cached = memoryStore.get(key);

  if (cached) {
    const isStale = now - cached.timestamp > ttlMs;

    if (isStale && !cached.isFetching) {
      cached.isFetching = true;
      // Trigger background revalidation
      fetchFn()
        .then((freshData) => {
          memoryStore.set(key, {
            data: freshData,
            timestamp: Date.now(),
            isFetching: false,
          });
        })
        .catch((err) => {
          console.error(`Background revalidate failed for key [${key}]:`, err);
          cached.isFetching = false;
        });
    }

    return cached.data;
  }

  // Cache miss: fetch synchronously
  const freshData = await fetchFn();
  memoryStore.set(key, {
    data: freshData,
    timestamp: Date.now(),
    isFetching: false,
  });

  return freshData;
}

export function clearCache(key?: string): void {
  if (key) {
    memoryStore.delete(key);
  } else {
    memoryStore.clear();
  }
}
```

**Step 2: Commit**

```bash
git add src/lib/cache.ts
git commit -m "feat: add in-memory SWR cache manager"
```

---

### Task 2: Wrap Supabase Data Queries with Cache in `src/lib/data.ts`

**Files:**
- Modify: `src/lib/data.ts:1-89`

**Step 1: Modify `src/lib/data.ts` to use `getCachedData`**

```typescript
import { supabase, isSupabaseConfigured, type HeroRow, type AboutMeRow, type TechStackRow, type WorkRow, type ContactRow, type BlogRow } from './supabase';
import { getCachedData } from './cache';

export async function getHeroData(): Promise<HeroRow | null> {
  return getCachedData('hero', async () => {
    try {
      const { data, error } = await supabase.from('hero').select('*').limit(1).single();
      if (data && !error) {
        return {
          ...data,
          displayName: data.displayName || data.display_name || '',
          firstName: data.firstName || data.first_name || '',
          lastName: data.lastName || data.last_name || '',
          profileImage: data.profileImage || data.profile_image || '',
          birthDate: data.birthDate || data.birth_date || '',
          startDate: data.startDate || data.start_date || '',
          webringUrl: data.webringUrl || data.webring_url || null,
        } as HeroRow;
      }
    } catch (e) {
      console.error('Supabase getHeroData error:', e);
    }
    return null;
  });
}

export async function getAboutMeData(): Promise<AboutMeRow | null> {
  return getCachedData('about_me', async () => {
    try {
      const { data, error } = await supabase.from('about_me').select('*').limit(1).single();
      if (data && !error) {
        return {
          ...data,
          fullName: data.fullName || data.full_name || '',
          statusLink: data.statusLink || data.status_link || null,
        } as AboutMeRow;
      }
    } catch (e) {
      console.error('Supabase getAboutMeData error:', e);
    }
    return null;
  });
}

export async function getTechStackData(): Promise<TechStackRow[]> {
  return getCachedData('tech_stack', async () => {
    try {
      const { data, error } = await supabase.from('tech_stack').select('*').order('order', { ascending: true });
      if (data && !error) return data as TechStackRow[];
    } catch (e) {
      console.error('Supabase getTechStackData error:', e);
    }
    return [];
  });
}

export async function getWorksData(): Promise<WorkRow[]> {
  return getCachedData('works', async () => {
    try {
      const { data, error } = await supabase.from('works').select('*').order('order', { ascending: true });
      if (data && !error) return data as WorkRow[];
    } catch (e) {
      console.error('Supabase getWorksData error:', e);
    }
    return [];
  });
}

export async function getContactData(): Promise<ContactRow | null> {
  return getCachedData('contact', async () => {
    try {
      const { data, error } = await supabase.from('contact').select('*').limit(1).single();
      if (data && !error) return data as ContactRow;
    } catch (e) {
      console.error('Supabase getContactData error:', e);
    }
    return null;
  });
}

export async function getBlogPosts(): Promise<BlogRow[]> {
  return getCachedData('blog_posts', async () => {
    try {
      const { data, error } = await supabase.from('blog').select('*').eq('published', true);
      if (data && !error) return data as BlogRow[];
    } catch (e) {
      console.error('Supabase getBlogPosts error:', e);
    }
    return [];
  });
}

export async function getBlogPostBySlug(slug: string): Promise<BlogRow | null> {
  return getCachedData(`blog_post_${slug}`, async () => {
    try {
      const { data, error } = await supabase.from('blog').select('*').eq('slug', slug).single();
      if (data && !error) return data as BlogRow;
    } catch (e) {
      console.error('Supabase getBlogPostBySlug error:', e);
    }
    return null;
  });
}
```

**Step 2: Commit**

```bash
git add src/lib/data.ts
git commit -m "feat: wrap supabase data queries with in-memory SWR cache"
```

---

### Task 3: Create Revalidation API Endpoint & Integrate with Admin Dashboard

**Files:**
- Create: `src/pages/api/revalidate.ts`
- Modify: `src/components/islands/AdminDashboard.tsx`

**Step 1: Create `src/pages/api/revalidate.ts`**

```typescript
import type { APIRoute } from 'astro';
import { clearCache } from '../../lib/cache';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json().catch(() => ({}));
    const key = body?.key;
    clearCache(key);
    return new Response(JSON.stringify({ success: true, clearedKey: key || 'all' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
```

**Step 2: Add helper in `src/components/islands/AdminDashboard.tsx` to notify revalidate endpoint after mutations**

In `AdminDashboard.tsx`, define:
```typescript
const notifyRevalidate = async (key?: string) => {
  try {
    await fetch("/api/revalidate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key }),
    });
  } catch (e) {
    console.error("Revalidate failed", e);
  }
};
```
And call `notifyRevalidate()` after successful saves in `saveHero`, `saveAboutMe`, `saveTechStackItem`, `saveWork`, `saveBlogPost`, `saveContact`.

**Step 3: Commit**

```bash
git add src/pages/api/revalidate.ts src/components/islands/AdminDashboard.tsx
git commit -m "feat: add revalidation API endpoint and trigger from admin dashboard"
```

---

### Task 4: Add HTTP Response Cache Headers to Public Astro Pages

**Files:**
- Modify: `src/pages/index.astro:26-27`
- Modify: `src/pages/works.astro:20-21`
- Modify: `src/pages/blogs/index.astro:12-13`
- Modify: `src/pages/blogs/[slug].astro:15-16`

**Step 1: Set Cache-Control header in Astro frontmatter**

Add `Astro.response.headers.set('Cache-Control', 'public, max-age=60, s-maxage=600, stale-while-revalidate=3600');` in the frontmatter of `index.astro`, `works.astro`, `blogs/index.astro`, and `blogs/[slug].astro`.

**Step 2: Commit**

```bash
git add src/pages/index.astro src/pages/works.astro src/pages/blogs/index.astro src/pages/blogs/\[slug\].astro
git commit -m "perf: add HTTP Cache-Control headers to public pages"
```

---

### Task 5: Build Verification

**Step 1: Verify TypeScript & Astro build**

Run: `bun run build`
Expected: Successfully builds without TypeScript or bundling errors.

**Step 2: Commit**

```bash
git commit --allow-empty -m "build: verify production build passes"
```
