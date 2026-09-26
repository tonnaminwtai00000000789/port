const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID || "";
const DATABASE_ID = process.env.CLOUDFLARE_DATABASE_ID || "";
const API_TOKEN = process.env.CLOUDFLARE_D1_TOKEN || process.env.CLOUDFLARE_API_TOKEN || "";

const D1_API_URL = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/d1/database/${DATABASE_ID}/query`;

export interface HeroRow {
  id: number;
  firstName: string;
  lastName: string;
  displayName: string;
  nickname: string;
  birthDate: string;
  startDate: string;
  location: string;
  profileImage: string;
  emoji: string;
  webringUrl?: string;
  positions: any[];
}

export interface AboutMeRow {
  id: number;
  nickname: string;
  status: string;
  statusLink: string | null;
  fullName: string;
  birthday: string;
  location: string;
  facts: any[];
}

export interface TechStackRow {
  id: number;
  category: string;
  order: number;
  technologies: any[];
}

export interface WorkRow {
  id: number;
  title: string;
  description: string;
  image: string;
  year: string;
  size: "large" | "small";
  watermark: string | null;
  tags: any[];
  links: any[];
  order: number;
}

export interface ContactRow {
  id: number;
  email: string;
  socials: any[];
}

export interface BlogRow {
  id: number;
  title: string;
  slug: string;
  image: string;
  date: string;
  content: string;
  published: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface MessageRow {
  id: number;
  name: string;
  email: string;
  content: string;
  created_at?: string;
}

function parseJson<T>(raw: any, fallback: T): T {
  if (!raw) return fallback;
  if (typeof raw === "object") return raw;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

async function d1Query(sql: string, params: any[] = []): Promise<any[]> {
  const res = await fetch(D1_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sql, params }),
next: { revalidate: 3600 },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`D1 query failed (${res.status}): ${text}`);
  }

  const json = await res.json();
  const result = json.result ?? json;
  if (Array.isArray(result) && result.length > 0 && result[0].results) {
    return result[0].results;
  }
  return [];
}

async function d1Exec(sql: string, params: any[] = []): Promise<void> {
  const res = await fetch(D1_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sql, params }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`D1 exec failed (${res.status}): ${text}`);
  }
}

// ── Read functions ──

export async function getHero(): Promise<HeroRow | null> {
  const rows = await d1Query("SELECT * FROM hero LIMIT 1");
  if (!rows.length) return null;
  const r = rows[0];
  return {
    id: r.id,
    firstName: r.first_name || "",
    lastName: r.last_name || "",
    displayName: r.display_name || "",
    nickname: r.nickname || "",
    birthDate: r.birth_date || "",
    startDate: r.start_date || "",
    location: r.location || "",
    profileImage: r.profile_image || "",
    emoji: r.emoji || "",
    webringUrl: r.webring_url || "",
    positions: parseJson(r.positions, []),
  };
}

export async function getAboutMe(): Promise<AboutMeRow | null> {
  const rows = await d1Query("SELECT * FROM about_me LIMIT 1");
  if (!rows.length) return null;
  const r = rows[0];
  return {
    id: r.id,
    nickname: r.nickname || "",
    status: r.status || "",
    statusLink: r.status_link || null,
    fullName: r.full_name || "",
    birthday: r.birthday || "",
    location: r.location || "",
    facts: parseJson(r.facts, []),
  };
}

export async function getTechStack(): Promise<TechStackRow[]> {
  const rows = await d1Query('SELECT * FROM tech_stack ORDER BY "order" ASC');
  return rows.map((r: any) => ({
    id: r.id,
    category: r.category,
    order: r.order ?? 0,
    technologies: parseJson(r.technologies, []),
  }));
}

export async function getWorks(): Promise<WorkRow[]> {
  const rows = await d1Query('SELECT * FROM works ORDER BY "order" ASC');
  return rows.map((r: any) => ({
    id: r.id,
    title: r.title,
    description: r.description || "",
    image: r.image || "",
    year: r.year || "",
    size: (r.size as any) || "large",
    watermark: r.watermark || null,
    tags: parseJson(r.tags, []),
    links: parseJson(r.links, []),
    order: r.order ?? 0,
  }));
}

export async function getContact(): Promise<ContactRow | null> {
  const rows = await d1Query("SELECT * FROM contact LIMIT 1");
  if (!rows.length) return null;
  const r = rows[0];
  return {
    id: r.id,
    email: r.email || "",
    socials: parseJson(r.socials, []),
  };
}

export async function getBlogPosts(): Promise<BlogRow[]> {
  const rows = await d1Query(
    "SELECT * FROM blog WHERE published = 1 ORDER BY date DESC, id DESC"
  );
  return rows.map((r: any) => ({
    id: r.id,
    title: r.title,
    slug: r.slug,
    image: r.image || "",
    date: r.date || "",
    content: r.content || "",
    published: Boolean(r.published),
    created_at: r.created_at,
    updated_at: r.updated_at,
  }));
}

export async function getBlogPostBySlug(slug: string): Promise<BlogRow | null> {
  const rows = await d1Query("SELECT * FROM blog WHERE slug = ? LIMIT 1", [slug]);
  if (!rows.length) return null;
  const r = rows[0];
  return {
    id: r.id,
    title: r.title,
    slug: r.slug,
    image: r.image || "",
    date: r.date || "",
    content: r.content || "",
    published: Boolean(r.published),
    created_at: r.created_at,
    updated_at: r.updated_at,
  };
}

export async function getMessages(): Promise<MessageRow[]> {
  const rows = await d1Query("SELECT * FROM messages ORDER BY id DESC");
  return rows;
}

// ── Write functions (used by /api/admin) ──

function serialize(val: any): string {
  return typeof val === "string" ? val : JSON.stringify(val || []);
}

export async function saveHero(h: any): Promise<void> {
  const existing = await d1Query("SELECT id FROM hero LIMIT 1");
  if (existing.length) {
    await d1Exec(
      `UPDATE hero SET first_name=?, last_name=?, display_name=?, nickname=?, birth_date=?, start_date=?, location=?, profile_image=?, emoji=?, webring_url=?, positions=?, updated_at=datetime('now') WHERE id=?`,
      [
        h.firstName || h.first_name || "",
        h.lastName || h.last_name || "",
        h.displayName || h.display_name || "",
        h.nickname || "",
        h.birthDate || h.birth_date || "",
        h.startDate || h.start_date || "",
        h.location || "",
        h.profileImage || h.profile_image || "",
        h.emoji || "",
        h.webringUrl || h.webring_url || "",
        serialize(h.positions),
        existing[0].id,
      ]
    );
  } else {
    await d1Exec(
      `INSERT INTO hero (first_name, last_name, display_name, nickname, birth_date, start_date, location, profile_image, emoji, webring_url, positions) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
      [
        h.firstName || h.first_name || "",
        h.lastName || h.last_name || "",
        h.displayName || h.display_name || "",
        h.nickname || "",
        h.birthDate || h.birth_date || "",
        h.startDate || h.start_date || "",
        h.location || "",
        h.profileImage || h.profile_image || "",
        h.emoji || "",
        h.webringUrl || h.webring_url || "",
        serialize(h.positions),
      ]
    );
  }
}

export async function saveAbout(a: any): Promise<void> {
  const existing = await d1Query("SELECT id FROM about_me LIMIT 1");
  if (existing.length) {
    await d1Exec(
      `UPDATE about_me SET nickname=?, status=?, status_link=?, full_name=?, birthday=?, location=?, facts=?, updated_at=datetime('now') WHERE id=?`,
      [
        a.nickname || "",
        a.status || "",
        a.statusLink || a.status_link || null,
        a.fullName || a.full_name || "",
        a.birthday || "",
        a.location || "",
        serialize(a.facts),
        existing[0].id,
      ]
    );
  } else {
    await d1Exec(
      `INSERT INTO about_me (nickname, status, status_link, full_name, birthday, location, facts) VALUES (?,?,?,?,?,?,?)`,
      [
        a.nickname || "",
        a.status || "",
        a.statusLink || a.status_link || null,
        a.fullName || a.full_name || "",
        a.birthday || "",
        a.location || "",
        serialize(a.facts),
      ]
    );
  }
}

export async function saveTechStack(techList: any[]): Promise<void> {
  await d1Exec("DELETE FROM tech_stack");
  for (const t of techList) {
    await d1Exec(
      `INSERT INTO tech_stack (category, "order", technologies) VALUES (?,?,?)`,
      [t.category, t.order ?? 0, serialize(t.technologies)]
    );
  }
}

export async function saveWorks(worksList: any[]): Promise<void> {
  await d1Exec("DELETE FROM works");
  for (const w of worksList) {
    await d1Exec(
      `INSERT INTO works (title, description, image, year, size, watermark, tags, links, "order") VALUES (?,?,?,?,?,?,?,?,?)`,
      [
        w.title,
        w.description || "",
        w.image || "",
        w.year || "",
        w.size || "large",
        w.watermark || null,
        serialize(w.tags),
        serialize(w.links),
        w.order ?? 0,
      ]
    );
  }
}

export async function saveBlogs(blogsList: any[]): Promise<void> {
  await d1Exec("DELETE FROM blog");
  for (const b of blogsList) {
    await d1Exec(
      `INSERT INTO blog (title, slug, image, date, content, published) VALUES (?,?,?,?,?,?)`,
      [
        b.title,
        b.slug,
        b.image || "",
        b.date || "",
        b.content || "",
        b.published ? 1 : 0,
      ]
    );
  }
}

export async function saveContact(c: any): Promise<void> {
  const existing = await d1Query("SELECT id FROM contact LIMIT 1");
  if (existing.length) {
    await d1Exec(
      `UPDATE contact SET email=?, socials=?, updated_at=datetime('now') WHERE id=?`,
      [c.email || "", serialize(c.socials), existing[0].id]
    );
  } else {
    await d1Exec(
      `INSERT INTO contact (email, socials) VALUES (?,?)`,
      [c.email || "", serialize(c.socials)]
    );
  }
}
