import { supabase, isSupabaseConfigured, type HeroRow, type AboutMeRow, type TechStackRow, type WorkRow, type ContactRow, type BlogRow } from './supabase';
import { getCachedData } from './cache';

export const FALLBACK_HERO: HeroRow = {
  id: 3,
  firstName: 'Supakron',
  lastName: 'Klinbubpa',
  displayName: 'TonnamInwtai00789',
  nickname: 'Tonnam',
  birthDate: '2011-03-03',
  startDate: '2021-01-01',
  location: 'Bangbon, Bangkok',
  profileImage: 'https://theijon.online/images/tonnam.png',
  emoji: '😪💤',
  positions: [
    { logo: 'https://theijon.online/logo.jpg', since: 'Jan 2025', title: 'The Founder', organization: 'The ijon', organizationUrl: 'https://theijon.online/' },
    { logo: 'https://www.swb.ac.th/swb/images/logo.png', since: 'Grade 9', title: 'Student', organization: 'Sarasas Witaed Bangbon', organizationUrl: 'https://www.swb.ac.th/swb/' }
  ]
};

export const FALLBACK_ABOUT: AboutMeRow = {
  id: 3,
  nickname: 'Tonnam',
  status: 'IDK',
  statusLink: 'https://theijon.online/',
  fullName: 'Supakron Klinbubpa',
  birthday: 'Thursday, March 3, 2011',
  location: 'Bangbon, Thailand',
  facts: [
    { type: 'image', image: 'https://swebtoon-phinf.pstatic.net/20210224_142/1614130186947iB8vd_JPEG/0M_details.jpg?type=crop540_540', title: 'Manhwa', subtitle: 'Passions' },
    { type: 'image', image: 'https://upload.wikimedia.org/wikipedia/sco/thumb/b/bf/KFC_logo.svg/250px-KFC_logo.svg.png', title: 'KFC', subtitle: 'Favorite Food' },
    { type: 'image', image: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Valorant_logo_-_pink_color_version.svg', title: 'Valorant', subtitle: 'Favorite Game' }
  ]
};

export const FALLBACK_TECH: TechStackRow[] = [
  {
    id: 16,
    category: 'Web & Fullstack',
    order: 1,
    technologies: [
      { icon: 'devicon-react-original colored', name: 'React' },
      { icon: 'devicon-nextjs-plain colored', name: 'Next.js' },
      { icon: 'devicon-astro-plain colored', name: 'Astro' },
      { icon: 'devicon-tailwindcss-original colored', name: 'Tailwind CSS' }
    ]
  },
  {
    id: 17,
    category: 'Hardware & Embedded',
    order: 2,
    technologies: [
      { icon: 'devicon-arduino-plain colored', name: 'ESP32 / Arduino' },
      { icon: 'devicon-[#000000]', name: 'Microbit' },
      { icon: 'devicon-cloudflare-plain colored', name: 'Cloudflare Workers' }
    ]
  },
  {
    id: 18,
    category: 'Languages & Tools',
    order: 3,
    technologies: [
      { icon: 'devicon-typescript-plain colored', name: 'TypeScript' },
      { icon: 'devicon-javascript-plain colored', name: 'JavaScript' },
      { icon: 'devicon-bun-plain colored', name: 'Bun' }
    ]
  }
];

export const FALLBACK_CONTACT: ContactRow = {
  id: 1,
  email: 'zel.da.supakron@gmail.com',
  socials: [
    { url: 'https://github.com/tonnaminwtai00000000789', icon: 'devicon-github-original', platform: 'GitHub', username: 'tonnaminwtai00000000789' },
    { url: 'https://www.instagram.com/tonnaminwtai00000000789/', icon: 'devicon-instagram-plain colored', platform: 'Instagram', username: 'tonnaminwtai00000000789' }
  ]
};

export async function getHeroData(): Promise<HeroRow | null> {
  const result = await getCachedData('hero', async () => {
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
        } as HeroRow;
      }
    } catch (e) {
      console.error('Supabase getHeroData error:', e);
    }
    return null;
  });
  return result || FALLBACK_HERO;
}

export async function getAboutMeData(): Promise<AboutMeRow | null> {
  const result = await getCachedData('about_me', async () => {
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
  return result || FALLBACK_ABOUT;
}

export async function getTechStackData(): Promise<TechStackRow[]> {
  const result = await getCachedData('tech_stack', async () => {
    try {
      const { data, error } = await supabase.from('tech_stack').select('*').order('order', { ascending: true });
      if (data && !error && data.length > 0) return data as TechStackRow[];
    } catch (e) {
      console.error('Supabase getTechStackData error:', e);
    }
    return [];
  });
  return (result && result.length > 0) ? result : FALLBACK_TECH;
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
  const result = await getCachedData('contact', async () => {
    try {
      const { data, error } = await supabase.from('contact').select('*').limit(1).single();
      if (data && !error) return data as ContactRow;
    } catch (e) {
      console.error('Supabase getContactData error:', e);
    }
    return null;
  });
  return result || FALLBACK_CONTACT;
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
