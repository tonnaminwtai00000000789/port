import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import { createClient } from '@supabase/supabase-js';

const url = process.env.PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.log('⚠️ Missing SUPABASE_URL or SUPABASE_ANON_KEY environment variables.');
  console.log('Skipping remote database sync. CSV files are ready for seeding when credentials are supplied.');
  process.exit(0);
}

const supabase = createClient(url, key);

function parseCsv(filePath: string) {
  if (!existsSync(filePath)) return [];
  const text = readFileSync(filePath, 'utf-8').trim();
  const lines = text.split('\n');
  if (lines.length < 2) return [];

  // Simple CSV parser supporting quotes
  const headers = parseCsvLine(lines[0]);
  const rows: Record<string, any>[] = [];

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
    rows.push(obj);
  }
  return rows;
}

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

async function seed() {
  console.log('🚀 Seeding CSV data to Supabase...');

  const root = resolve(process.cwd());

  const heroData = parseCsv(resolve(root, 'hero_rows.csv'));
  if (heroData.length) {
    const { error } = await supabase.from('hero').upsert(heroData);
    console.log('Hero:', error ? error.message : `Seeded ${heroData.length} row(s)`);
  }

  const aboutData = parseCsv(resolve(root, 'about_me_rows.csv'));
  if (aboutData.length) {
    const { error } = await supabase.from('about_me').upsert(aboutData);
    console.log('About Me:', error ? error.message : `Seeded ${aboutData.length} row(s)`);
  }

  const techData = parseCsv(resolve(root, 'tech_stack_rows.csv'));
  if (techData.length) {
    const { error } = await supabase.from('tech_stack').upsert(techData);
    console.log('Tech Stack:', error ? error.message : `Seeded ${techData.length} row(s)`);
  }

  const contactData = parseCsv(resolve(root, 'contact_rows.csv'));
  if (contactData.length) {
    const { error } = await supabase.from('contact').upsert(contactData);
    console.log('Contact:', error ? error.message : `Seeded ${contactData.length} row(s)`);
  }

  const blogData = parseCsv(resolve(root, 'blog_rows.csv'));
  if (blogData.length) {
    const { error } = await supabase.from('blog').upsert(blogData);
    console.log('Blog:', error ? error.message : `Seeded ${blogData.length} row(s)`);
  }

  console.log('✅ Seeding complete!');
}

seed();
