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
