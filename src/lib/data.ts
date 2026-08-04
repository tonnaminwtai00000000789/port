import { supabase, isSupabaseConfigured, type HeroRow, type AboutMeRow, type TechStackRow, type WorkRow, type ContactRow, type BlogRow } from './supabase';

export async function getHeroData(): Promise<HeroRow | null> {
  try {
    const { data, error } = await supabase.from('hero').select('*').limit(1).single();
    if (data && !error) return data as HeroRow;
  } catch (e) {
    console.error('Supabase getHeroData error:', e);
  }
  return null;
}

export async function getAboutMeData(): Promise<AboutMeRow | null> {
  try {
    const { data, error } = await supabase.from('about_me').select('*').limit(1).single();
    if (data && !error) return data as AboutMeRow;
  } catch (e) {
    console.error('Supabase getAboutMeData error:', e);
  }
  return null;
}

export async function getTechStackData(): Promise<TechStackRow[]> {
  try {
    const { data, error } = await supabase.from('tech_stack').select('*').order('order', { ascending: true });
    if (data && !error) return data as TechStackRow[];
  } catch (e) {
    console.error('Supabase getTechStackData error:', e);
  }
  return [];
}

export async function getWorksData(): Promise<WorkRow[]> {
  try {
    const { data, error } = await supabase.from('works').select('*').order('order', { ascending: true });
    if (data && !error) return data as WorkRow[];
  } catch (e) {
    console.error('Supabase getWorksData error:', e);
  }
  return [];
}

export async function getContactData(): Promise<ContactRow | null> {
  try {
    const { data, error } = await supabase.from('contact').select('*').limit(1).single();
    if (data && !error) return data as ContactRow;
  } catch (e) {
    console.error('Supabase getContactData error:', e);
  }
  return null;
}

export async function getBlogPosts(): Promise<BlogRow[]> {
  try {
    const { data, error } = await supabase.from('blog').select('*').eq('published', true);
    if (data && !error) return data as BlogRow[];
  } catch (e) {
    console.error('Supabase getBlogPosts error:', e);
  }
  return [];
}

export async function getBlogPostBySlug(slug: string): Promise<BlogRow | null> {
  try {
    const { data, error } = await supabase.from('blog').select('*').eq('slug', slug).single();
    if (data && !error) return data as BlogRow;
  } catch (e) {
    console.error('Supabase getBlogPostBySlug error:', e);
  }
  return null;
}
