# Design Document: Physical Desk Memo & Artifacts Portfolio Redesign

**Date:** 2026-08-09  
**Author:** Antigravity AI & Supakron Klinbubpa (Tonnam)  
**Status:** Approved by User  

---

## 1. Overview & Objective

Redesign Tonnam's personal portfolio website from its previous Neo-Brutalist studio canvas style into an authentic, tactile **"Physical Desk Memo & Artifacts"** experience. 

The goal is to eliminate generic AI-slop visual tropes (such as dark-mode glow backgrounds, numbered section eyebrows, floating glassmorphism navbars, and fake stats cards) while celebrating Tonnam's authentic identity as a 14-year-old developer who started with Roblox scripts in 5th grade and now builds full-stack web applications (Astro, React, Supabase, Cloudflare) and hardware projects (ESP32, Arduino, Microbit).

---

## 2. Visual Design System

### 2.1 Color Palette
- **Canvas Base (Desk Surface):** `#F6F5F0` (Warm Paper Cream)
- **Paper Card Surface:** `#FFFFFF` (Crisp Paper) with `1px solid #1E293B` border & `box-shadow: 3px 3px 0px #CBD5E1`
- **Memo & Sticker Accents:**
  - **Yellow Sticky Memo:** `#FEF08A` (Text: `#854D0E`, Border: `#EAB308`)
  - **Ink Blue Stamp:** `#1D4ED8` (Text: `#FFFFFF`)
  - **Status Mint Label:** `#DCFCE7` (Text: `#166534`, Border: `#86EFAC`)
  - **Text Primary:** `#0F172A` (Slate Ink)
  - **Text Muted:** `#64748B` (Muted Graphite)

### 2.2 Typography
- **Display Headings:** `Space Grotesk` (700/800)
- **Body Text:** `DM Sans` (400/500)
- **Technical Annotations & Code:** `Geist Mono` (500)

---

## 3. Component Architecture & Structure

### 3.1 Layout (`src/layouts/Layout.astro`)
- Updated global CSS variables for paper cream background (`#F6F5F0`).
- Import Google Fonts (`Space Grotesk`, `DM Sans`, `Geist Mono`).

### 3.2 Header Navigation (`src/components/islands/HeaderNav.tsx`)
- Solid white paper surface header bar with hairline border (`#1E293B`).
- Clean brand title `Tonnam.dev`.
- Direct text links: `Works`, `Tech`, `Story`, `Blogs`, `Contact`.
- Real-time Bangkok clock badge (`Asia/Bangkok`).

### 3.3 Hero Component (`src/components/islands/Hero.tsx`)
- **Left Column:**
  - Headline: `Supakron Klinbubpa (Tonnam)` in Space Grotesk.
  - Subhead: "Fullstack & Embedded Tinkerer".
  - Yellow Sticky Memo cards featuring Tonnam's signature quotes ("อยู่ไม่ไหว...", "เริ่มเขียนสคริปต์ Roblox ตอน ป.5", "ความตั้งใจ 67%").
  - Action Stamp Buttons: `ดูผลงานผม` (Ink Blue) and `[STATUS: ว่างจ้างได้]` (Mint Green).
- **Right Column:**
  - Profile image formatted as a tactile Polaroid cutout with paper tape corners.

### 3.4 Work Showcase (`src/components/islands/Work.tsx`)
- Project cards styled as clean specification index sheets.
- Display project metadata, tags, live links, and GitHub repository links.

### 3.5 Tech Stack & Tools (`src/components/islands/TechStack.tsx`)
- Grouped into 3 physical paper trays:
  - `Web & Fullstack`
  - `Hardware & Embedded`
  - `Languages`

### 3.6 About & Interests (`src/components/islands/Aboutme.tsx`)
- Bulletin board layout showing personal facts, interests (Games, Manhwa, Movies, Anime, Money 🤑), location, and birthday.

### 3.7 Blogs & Contact (`src/components/islands/BlogsSection.tsx` & `Contact.tsx`)
- Blog list presented as article clippings.
- Contact section formatted as a postcard with social links.

---

## 4. Verification Plan

1. **Astro Dev Server Check:** Run `npm run dev` or `bun run dev` and ensure zero build/runtime errors.
2. **Visual & Responsive Verification:** Test desktop (1280px+), tablet (768px), and mobile (375px) layouts.
3. **Interactive Behavior Check:** Ensure clock updates live, navigation jumps correctly, external links open safely in new tabs.
