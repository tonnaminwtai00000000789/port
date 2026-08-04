import { supabase, type HeroRow, type AboutMeRow, type TechStackRow, type ContactRow, type BlogRow } from './supabase';

const DEFAULT_HERO: HeroRow = {
  id: 1,
  first_name: 'Supakron',
  last_name: 'Klinbubpa',
  display_name: 'TonnamInwtai00789',
  nickname: 'Tonnam',
  birth_date: '2011-03-03',
  start_date: '2021-01-01',
  location: 'Bangbon, Bangkok',
  profile_image: 'https://theijon.online/images/tonnam.png',
  emoji: '😪💤',
  webring_url: 'https://webring.wonderful.software#nsys.site',
  positions: [
    {
      logo: 'https://theijon.online/logo.jpg',
      since: 'Since Jan 2025',
      title: 'the founder of',
      organization: 'The ijon',
      organizationUrl: 'https://theijon.online/',
    },
  ],
};

const DEFAULT_ABOUT: AboutMeRow = {
  id: 1,
  nickname: 'Tonnam',
  status: 'IDK',
  status_link: 'https://www.pornhub.org/',
  full_name: 'Supakron Klinbubpa',
  birthday: 'Thursday, March 3, 2011',
  location: 'Bangbon, Thailand',
  facts: [
    {
      type: 'image',
      image: 'https://swebtoon-phinf.pstatic.net/20210224_142/1614130186947iB8vd_JPEG/0M_details.jpg?type=crop540_540',
      title: 'Manhwa',
      subtitle: 'Passions',
    },
    {
      type: 'image',
      image: 'https://upload.wikimedia.org/wikipedia/sco/thumb/b/bf/KFC_logo.svg/250px-KFC_logo.svg.png',
      title: 'KFC',
      subtitle: 'Favorite Food',
    },
  ],
};

const DEFAULT_TECH: TechStackRow[] = [
  {
    id: 1,
    category: 'Frontend Frameworks',
    order: 1,
    technologies: [
      { icon: 'devicon-react-original colored', name: 'React' },
      { icon: 'devicon-astro-plain colored', name: 'Astro' },
      { icon: 'devicon-tailwindcss-original colored', name: 'Tailwind CSS' },
    ],
  },
  {
    id: 2,
    category: 'Languages & Runtimes',
    order: 2,
    technologies: [
      { icon: 'devicon-typescript-plain colored', name: 'TypeScript' },
      { icon: 'devicon-javascript-plain colored', name: 'JavaScript' },
      { icon: 'devicon-bun-plain colored', name: 'Bun' },
    ],
  },
];

const DEFAULT_CONTACT: ContactRow = {
  id: 1,
  email: 'zel.da.supakron@gmail.com',
  socials: [
    { url: 'https://github.com/tonnaminwtai00000000789', icon: 'devicon-github-original', platform: 'GitHub', username: 'tonnaminwtai00000000789' },
    { url: 'https://www.instagram.com/tonnaminwtai00000000789/', icon: 'devicon-instagram-plain colored', platform: 'Instagram', username: 'tonnaminwtai00000000789' },
  ],
};

const DEFAULT_BLOGS: BlogRow[] = [
  {
    id: 1,
    title: 'Welcome to my Astro + Supabase portfolio',
    slug: 'welcome',
    image: 'https://tr.rbxcdn.com/180DAY-6a9f37f333452ee91542001faacf5e49/576/324/Image/Jpeg/noFilter',
    date: '2026-02-17',
    content: 'Welcome to my new blog powered by Astro 5, React Islands, and Supabase!',
    published: true,
  },
];

export async function getHeroData(): Promise<HeroRow | null> {
  if (process.env.PUBLIC_SUPABASE_URL && process.env.PUBLIC_SUPABASE_ANON_KEY) {
    const { data } = await supabase.from('hero').select('*').limit(1).single();
    if (data) return data as HeroRow;
  }
  return DEFAULT_HERO;
}

export async function getAboutMeData(): Promise<AboutMeRow | null> {
  if (process.env.PUBLIC_SUPABASE_URL && process.env.PUBLIC_SUPABASE_ANON_KEY) {
    const { data } = await supabase.from('about_me').select('*').limit(1).single();
    if (data) return data as AboutMeRow;
  }
  return DEFAULT_ABOUT;
}

export async function getTechStackData(): Promise<TechStackRow[]> {
  if (process.env.PUBLIC_SUPABASE_URL && process.env.PUBLIC_SUPABASE_ANON_KEY) {
    const { data } = await supabase.from('tech_stack').select('*').order('order', { ascending: true });
    if (data && data.length) return data as TechStackRow[];
  }
  return DEFAULT_TECH;
}

export async function getContactData(): Promise<ContactRow | null> {
  if (process.env.PUBLIC_SUPABASE_URL && process.env.PUBLIC_SUPABASE_ANON_KEY) {
    const { data } = await supabase.from('contact').select('*').limit(1).single();
    if (data) return data as ContactRow;
  }
  return DEFAULT_CONTACT;
}

export async function getBlogPosts(): Promise<BlogRow[]> {
  if (process.env.PUBLIC_SUPABASE_URL && process.env.PUBLIC_SUPABASE_ANON_KEY) {
    const { data } = await supabase.from('blog').select('*').eq('published', true);
    if (data && data.length) return data as BlogRow[];
  }
  return DEFAULT_BLOGS;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogRow | null> {
  if (process.env.PUBLIC_SUPABASE_URL && process.env.PUBLIC_SUPABASE_ANON_KEY) {
    const { data } = await supabase.from('blog').select('*').eq('slug', slug).single();
    if (data) return data as BlogRow;
  }
  return DEFAULT_BLOGS.find((p) => p.slug === slug) || null;
}
