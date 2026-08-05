# Blog UI/UX Redesign Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** Redesign `/blogs` and `/blogs/[slug]` pages to match the main portfolio page's Slate-Blue neo-brutalist UI/UX, including `<HeaderNav />`, global `<footer>`, Framer Motion animations, and `#60a5fa` / `#2563eb` accents.

**Architecture:** Create React components `BlogsList.tsx` and `BlogPostDetail.tsx` in `src/components/islands/`. Update `src/pages/blogs/index.astro` and `src/pages/blogs/[slug].astro` to wrap content with shared HeaderNav, new React islands, and global Footer.

**Tech Stack:** Astro 5, React 19, Tailwind CSS v4, Framer Motion, Lucide React.

---

### Task 1: Create `BlogsList.tsx` React Island Component

**Files:**
- Create: `src/components/islands/BlogsList.tsx`

**Step 1: Create `src/components/islands/BlogsList.tsx`**

```tsx
import React from "react";
import { ArrowLeft, Clock, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import type { BlogRow } from "../../lib/supabase";

export function BlogsList({ blogs }: { blogs: BlogRow[] }) {
  return (
    <div className="space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-[#0f172a]">
        <div className="flex items-center gap-3">
          <span className="slant inline-block h-8 w-3 bg-[#60a5fa]"></span>
          <div>
            <span className="text-xs font-mono font-bold text-[#2563eb] uppercase tracking-wider">
              WRITINGS & THOUGHTS
            </span>
            <h1 className="text-3xl font-black text-[#0f172a] font-display">
              บทความทั้งหมด
            </h1>
          </div>
        </div>

        <a
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white text-[#0f172a] border-1.5 border-[#0f172a] text-xs font-bold shadow-[2px_2px_0px_#0f172a] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all w-fit"
        >
          <ArrowLeft className="w-4 h-4 text-[#2563eb]" />
          <span>กลับหน้าหลัก</span>
        </a>
      </div>

      {/* Blogs Grid */}
      {blogs && blogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map((blog, idx) => (
            <motion.a
              key={blog.id || idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.08 * idx }}
              whileHover={{ y: -4 }}
              href={`/blogs/${blog.slug}`}
              className="card-paper overflow-hidden bg-white border-1.5 border-[#0f172a] flex flex-col justify-between shadow-[3px_3px_0px_#0f172a] hover:shadow-[5px_5px_0px_#0f172a] transition-all duration-200"
            >
              <div className="aspect-[16/10] overflow-hidden relative border-b-1.5 border-[#0f172a]">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 bg-[#0f172a] text-white text-[10px] font-mono font-bold flex items-center gap-1 border border-white">
                  <Clock className="w-3 h-3 text-[#60a5fa]" /> {blog.date}
                </span>
              </div>

              <div className="p-5 flex flex-col justify-between flex-1 space-y-4">
                <h2 className="text-base font-extrabold text-[#0f172a] hover:text-[#2563eb] transition-colors line-clamp-2 leading-snug">
                  {blog.title}
                </h2>

                <div className="pt-3 border-t border-[#e2e8f0] flex items-center justify-between text-xs font-bold text-[#2563eb]">
                  <span>อ่านบทความเต็ม</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white border-1.5 border-[#0f172a] text-[#475569] font-medium">
          ยังไม่มีบทความในขณะนี้
        </div>
      )}
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/islands/BlogsList.tsx
git commit -m "feat: add BlogsList React island component with slate-blue theme"
```

---

### Task 2: Create `BlogPostDetail.tsx` React Island Component

**Files:**
- Create: `src/components/islands/BlogPostDetail.tsx`

**Step 1: Create `src/components/islands/BlogPostDetail.tsx`**

```tsx
import React from "react";
import { ArrowLeft, Clock } from "lucide-react";
import { motion } from "framer-motion";
import type { BlogRow } from "../../lib/supabase";

export function BlogPostDetail({ post }: { post: BlogRow }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Navigation Bar */}
      <div className="flex items-center justify-between pb-4">
        <a
          href="/blogs"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white text-[#0f172a] border-1.5 border-[#0f172a] text-xs font-bold shadow-[2px_2px_0px_#0f172a] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
        >
          <ArrowLeft className="w-4 h-4 text-[#2563eb]" />
          <span>กลับไปหน้าบทความทั้งหมด</span>
        </a>
      </div>

      {/* Hero Header Banner */}
      <div className="card-paper overflow-hidden bg-[#0f172a] border-1.5 border-[#0f172a] shadow-[4px_4px_0px_#0f172a] relative">
        <div className="w-full h-[32vh] md:h-[40vh] relative overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover opacity-40"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/60 to-transparent"></div>

          <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 space-y-3">
            <div className="inline-flex items-center gap-2 bg-[#60a5fa] text-[#0f172a] px-2.5 py-1 text-xs font-mono font-bold border border-[#0f172a]">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.date}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white font-display leading-tight tracking-tight">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Article Main Content */}
      <div className="card-paper p-6 sm:p-10 bg-white border-1.5 border-[#0f172a] shadow-[4px_4px_0px_#0f172a] space-y-8">
        <div className="prose prose-slate max-w-none">
          <div className="whitespace-pre-wrap font-sans text-[#0f172a] leading-relaxed text-base sm:text-lg">
            {post.content}
          </div>
        </div>

        <div className="pt-6 border-t-1.5 border-[#e2e8f0] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-bold text-[#475569]">
          <p>ขอบคุณที่เข้ามาอ่านบทความครับ 🙏</p>
          <a
            href="/blogs"
            className="text-[#2563eb] hover:underline font-extrabold inline-flex items-center gap-1"
          >
            อ่านบทความอื่นๆ →
          </a>
        </div>
      </div>
    </motion.article>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/islands/BlogPostDetail.tsx
git commit -m "feat: add BlogPostDetail React island component with slate-blue theme"
```

---

### Task 3: Update `src/pages/blogs/index.astro`

**Files:**
- Modify: `src/pages/blogs/index.astro:1-60`

**Step 1: Update `src/pages/blogs/index.astro` to use `<HeaderNav />`, `<BlogsList />`, and global Footer**

```astro
---
import Layout from '../../layouts/Layout.astro';
import { HeaderNav } from '../../components/islands/HeaderNav';
import { BlogsList } from '../../components/islands/BlogsList';
import { getBlogPosts } from '../../lib/data';

const blogs = await getBlogPosts();

Astro.response.headers.set('Cache-Control', 'public, max-age=60, s-maxage=600, stale-while-revalidate=3600');
---

<Layout title="Tonnam · บทความทั้งหมด" description="บทความ ความคิด และประสบการณ์การพัฒนาซอฟต์แวร์โดย Tonnam">
  <HeaderNav client:load />

  <main class="mx-auto max-w-5xl px-6 pt-28 pb-16 flex-1 w-full space-y-8">
    <BlogsList client:load blogs={blogs} />
  </main>

  <footer class="mt-16 border-t-2 border-[#0f172a] bg-white py-6 text-center text-xs font-medium text-[#475569]">
    <div class="mx-auto max-w-5xl px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
      <p>© {new Date().getFullYear()} Supakron Klinbubpa (Tonnam). All rights reserved.</p>
      <p class="font-mono text-[11px] text-[#0f172a]">Astro 5 · React Islands · Supabase · Bun</p>
    </div>
  </footer>
</Layout>
```

**Step 2: Commit**

```bash
git add src/pages/blogs/index.astro
git commit -m "refactor: update blogs index page to use HeaderNav, BlogsList island, and global footer"
```

---

### Task 4: Update `src/pages/blogs/[slug].astro`

**Files:**
- Modify: `src/pages/blogs/[slug].astro:1-75`

**Step 1: Update `src/pages/blogs/[slug].astro` to use `<HeaderNav />`, `<BlogPostDetail />`, and global Footer**

```astro
---
import Layout from '../../layouts/Layout.astro';
import { HeaderNav } from '../../components/islands/HeaderNav';
import { BlogPostDetail } from '../../components/islands/BlogPostDetail';
import { getBlogPostBySlug } from '../../lib/data';

const { slug } = Astro.params;

if (!slug) {
  return Astro.redirect('/blogs');
}

const post = await getBlogPostBySlug(slug);

if (!post) {
  return Astro.redirect('/404');
}

Astro.response.headers.set('Cache-Control', 'public, max-age=60, s-maxage=600, stale-while-revalidate=3600');
---

<Layout
  title={`${post.title} · Tonnam`}
  description={post.content ? post.content.slice(0, 150) : post.title}
  image={post.image}
>
  <HeaderNav client:load />

  <main class="mx-auto max-w-4xl px-6 pt-28 pb-16 flex-1 w-full space-y-8">
    <BlogPostDetail client:load post={post} />
  </main>

  <footer class="mt-16 border-t-2 border-[#0f172a] bg-white py-6 text-center text-xs font-medium text-[#475569]">
    <div class="mx-auto max-w-5xl px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
      <p>© {new Date().getFullYear()} Supakron Klinbubpa (Tonnam). All rights reserved.</p>
      <p class="font-mono text-[11px] text-[#0f172a]">Astro 5 · React Islands · Supabase · Bun</p>
    </div>
  </footer>
</Layout>
```

**Step 2: Commit**

```bash
git add src/pages/blogs/\[slug\].astro
git commit -m "refactor: update blog post detail page to use HeaderNav, BlogPostDetail island, and global footer"
```

---

### Task 5: Build Verification

**Step 1: Verify TypeScript & Astro build**

Run: `bun run build`
Expected: Successfully builds without TypeScript or bundling errors.

**Step 2: Commit**

```bash
git commit --allow-empty -m "build: verify blog UI redesign build passes"
```
