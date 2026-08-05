# Page Transition Animations Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** Enable native Astro View Transitions (`ClientRouter`) and implement high-performance, sleek "Accent Bar Fast Wipe" page transition animations matching the Slate-Blue theme (`#60a5fa` / `#0f172a`).

**Architecture:** Add `<ClientRouter />` to `src/layouts/Layout.astro` head, and configure custom CSS clip-path keyframe animations in `src/styles/global.css`.

**Tech Stack:** Astro 5 View Transitions (`ClientRouter`), CSS View Transitions API, Vanilla CSS keyframes.

---

### Task 1: Enable ClientRouter in `src/layouts/Layout.astro`

**Files:**
- Modify: `src/layouts/Layout.astro:1-47`

**Step 1: Import and add `<ClientRouter />` to `Layout.astro` head**

```astro
---
import '../styles/global.css';
import { ClientRouter } from 'astro:transitions';

interface Props {
  title?: string;
  description?: string;
  image?: string;
}

const {
  title = 'Tonnam · Supakron Klinbubpa',
  description = 'My portfolio/bio website',
  image = 'https://theijon.online/images/tonnam.png',
} = Astro.props;
---

<!DOCTYPE html>
<html lang="th" class="scroll-smooth">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta property="og:type" content="website" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Sora:wght@600;700;800&display=swap"
      rel="stylesheet"
    />
    <!-- Devicon CDN -->
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
    />
    <ClientRouter />
  </head>
  <body class="bg-[#f8fafc] text-[#0f172a] antialiased selection:bg-[#60a5fa] selection:text-[#0f172a] min-h-screen flex flex-col">
    <slot />
  </body>
</html>
```

**Step 2: Commit**

```bash
git add src/layouts/Layout.astro
git commit -m "feat: enable ClientRouter in Layout.astro head"
```

---

### Task 2: Implement Accent Bar Fast Wipe CSS Keyframes in `src/styles/global.css`

**Files:**
- Modify: `src/styles/global.css`

**Step 1: Add View Transitions CSS rules at the end of `src/styles/global.css`**

```css
/* Custom View Transitions: Accent Bar Fast Wipe */
@keyframes page-wipe-out {
  from {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    opacity: 1;
    transform: scale(1);
  }
  to {
    clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%);
    opacity: 0.92;
    transform: scale(0.99);
  }
}

@keyframes page-wipe-in {
  from {
    clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
    transform: scale(1.01);
  }
  to {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    transform: scale(1);
  }
}

::view-transition-old(root) {
  animation: 350ms cubic-bezier(0.16, 1, 0.3, 1) both page-wipe-out;
  mix-blend-mode: normal;
}

::view-transition-new(root) {
  animation: 350ms cubic-bezier(0.16, 1, 0.3, 1) both page-wipe-in;
  mix-blend-mode: normal;
}

@media (prefers-reduced-motion: reduce) {
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation: none !important;
  }
}
```

**Step 2: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: add Accent Bar Fast Wipe view transition animations to global.css"
```

---

### Task 3: Build Verification

**Step 1: Verify TypeScript & Astro build**

Run: `bun run build`
Expected: Successfully builds without errors.

**Step 2: Commit**

```bash
git commit --allow-empty -m "build: verify page transitions build passes"
```
