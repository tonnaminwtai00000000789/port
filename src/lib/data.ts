import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import { supabase, type HeroRow, type AboutMeRow, type TechStackRow, type ContactRow, type BlogRow } from './supabase';

function parseCsvLine(text: string): string[] {
  const result: string[] = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') {
      if (inQuotes && text[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === ',' && !inQuotes) {
      result.push(cur);
      cur = '';
    } else {
      cur += c;
    }
  }
  result.push(cur);
  return result;
}

function parseCsvFile<T>(filename: string): T[] {
  try {
    const filePath = resolve(process.cwd(), filename);
    if (!existsSync(filePath)) return [];
    const text = readFileSync(filePath, 'utf-8').trim();
    const lines = text.split('\n');
    if (lines.length < 2) return [];

    const headers = parseCsvLine(lines[0]);
    const rows: T[] = [];

    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      const values = parseCsvLine(lines[i]);
      const obj: Record<string, any> = {};
      headers.forEach((h, idx) => {
        let val = values[idx] ?? '';
        if (val.startsWith('[') || val.startsWith('{')) {
          try {
            val = JSON.parse(val);
          } catch {}
        }
        if (val === 'true') val = true;
        if (val === 'false') val = false;
        obj[h] = val;
      });
      rows.push(obj as T);
    }
    return rows;
  } catch (e) {
    console.error(`Error reading CSV ${filename}:`, e);
    return [];
  }
}

export async function getHeroData(): Promise<HeroRow | null> {
  if (process.env.PUBLIC_SUPABASE_URL && process.env.PUBLIC_SUPABASE_ANON_KEY) {
    const { data } = await supabase.from('hero').select('*').limit(1).single();
    if (data) return data as HeroRow;
  }
  const fallback = parseCsvFile<HeroRow>('hero_rows.csv');
  return fallback[0] || null;
}

export async function getAboutMeData(): Promise<AboutMeRow | null> {
  if (process.env.PUBLIC_SUPABASE_URL && process.env.PUBLIC_SUPABASE_ANON_KEY) {
    const { data } = await supabase.from('about_me').select('*').limit(1).single();
    if (data) return data as AboutMeRow;
  }
  const fallback = parseCsvFile<AboutMeRow>('about_me_rows.csv');
  return fallback[0] || null;
}

export async function getTechStackData(): Promise<TechStackRow[]> {
  if (process.env.PUBLIC_SUPABASE_URL && process.env.PUBLIC_SUPABASE_ANON_KEY) {
    const { data } = await supabase.from('tech_stack').select('*').order('order', { ascending: true });
    if (data && data.length) return data as TechStackRow[];
  }
  return parseCsvFile<TechStackRow>('tech_stack_rows.csv');
}

export async function getContactData(): Promise<ContactRow | null> {
  if (process.env.PUBLIC_SUPABASE_URL && process.env.PUBLIC_SUPABASE_ANON_KEY) {
    const { data } = await supabase.from('contact').select('*').limit(1).single();
    if (data) return data as ContactRow;
  }
  const fallback = parseCsvFile<ContactRow>('contact_rows.csv');
  return fallback[0] || null;
}

export async function getBlogPosts(): Promise<BlogRow[]> {
  if (process.env.PUBLIC_SUPABASE_URL && process.env.PUBLIC_SUPABASE_ANON_KEY) {
    const { data } = await supabase.from('blog').select('*').eq('published', true);
    if (data && data.length) return data as BlogRow[];
  }
  return parseCsvFile<BlogRow>('blog_rows.csv');
}

export async function getBlogPostBySlug(slug: string): Promise<BlogRow | null> {
  if (process.env.PUBLIC_SUPABASE_URL && process.env.PUBLIC_SUPABASE_ANON_KEY) {
    const { data } = await supabase.from('blog').select('*').eq('slug', slug).single();
    if (data) return data as BlogRow;
  }
  const posts = parseCsvFile<BlogRow>('blog_rows.csv');
  return posts.find((p) => p.slug === slug) || null;
}
