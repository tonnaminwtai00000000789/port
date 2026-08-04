import { supabase, isSupabaseConfigured, type HeroRow, type AboutMeRow, type TechStackRow, type WorkRow, type ContactRow, type BlogRow } from './supabase';

const DEFAULT_HERO: HeroRow = {
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
  webringUrl: 'https://webring.wonderful.software#nsys.site',
  positions: [
    {
      logo: 'https://theijon.online/logo.jpg',
      since: 'Since Jan 2025',
      title: 'the founder of',
      organization: 'The ijon',
      organizationUrl: 'https://theijon.online/',
    },
    {
      logo: 'https://scontent.fbkk22-1.fna.fbcdn.net/v/t39.30808-6/399066911_734484848721847_3491665446363065300_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=a5f93a',
      since: 'Become a student in 2014',
      title: 'Student (Grade 9) in',
      organization: 'Sarasas Witaed Bangbon',
      organizationUrl: 'https://www.swb.ac.th/swb/',
    },
  ],
};

const DEFAULT_ABOUT: AboutMeRow = {
  id: 3,
  nickname: 'Tonnam',
  status: 'IDK',
  statusLink: 'https://www.pornhub.org/',
  fullName: 'Supakron Klinbubpa',
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
    {
      type: 'image',
      image: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Valorant_logo_-_pink_color_version.svg',
      title: 'Valorant',
      subtitle: 'Favorite Game',
    },
  ],
};

const DEFAULT_TECH: TechStackRow[] = [
  {
    id: 16,
    category: 'Frontend Frameworks',
    order: 1,
    technologies: [
      { icon: 'devicon-react-original colored', name: 'React' },
      { icon: 'devicon-nextjs-plain colored', name: 'Next.js' },
      { icon: 'devicon-astro-plain colored', name: 'Astro' },
      { icon: 'devicon-svelte-plain colored', name: 'SvelteKit' },
      { icon: 'devicon-tailwindcss-original colored', name: 'Tailwind CSS' },
    ],
  },
  {
    id: 17,
    category: 'Backend Frameworks',
    order: 2,
    technologies: [
      { icon: 'devicon-express-original', name: 'Express' },
      { icon: 'devicon-nestjs-original colored', name: 'NestJS' },
      { icon: 'https://hono.dev/favicon.ico', name: 'Hono' },
      { icon: 'https://elysiajs.com/assets/elysia.svg', name: 'Elysia' },
      { icon: 'devicon-cloudflare-plain colored', name: 'Cloudflare Workers' },
    ],
  },
  {
    id: 18,
    category: 'Languages & Runtimes',
    order: 3,
    technologies: [
      { icon: 'devicon-typescript-plain colored', name: 'TypeScript' },
      { icon: 'devicon-javascript-plain colored', name: 'JavaScript' },
      { icon: 'devicon-nodejs-plain-wordmark colored', name: 'Node.js' },
      { icon: 'devicon-bun-plain colored', name: 'Bun' },
      { icon: 'devicon-python-plain colored', name: 'Python' },
    ],
  },
];

const DEFAULT_WORKS: WorkRow[] = [
  {
    id: 1,
    title: 'The iJon Project',
    description: 'A modern web ecosystem built for community members & developers.',
    image: 'https://theijon.online/images/tonnam.png',
    year: '2025',
    size: 'large',
    watermark: null,
    tags: [
      { label: 'React', url: '#' },
      { label: 'TypeScript', url: '#' },
      { label: 'Tailwind', url: '#' },
    ],
    links: [
      { url: 'https://theijon.online/', type: 'website' },
    ],
    order: 1,
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
    id: 10,
    title: 'ควย',
    slug: 'เย้',
    image: 'https://tr.rbxcdn.com/180DAY-6a9f37f333452ee91542001faacf5e49/576/324/Image/Jpeg/noFilter',
    date: '9999-99-99',
    content: '# ควยควย\nควย\nควย\nควย',
    published: true,
  },
];

export async function getHeroData(): Promise<HeroRow | null> {
  if (isSupabaseConfigured()) {
    const { data } = await supabase.from('hero').select('*').limit(1).single();
    if (data) return data as HeroRow;
  }
  return DEFAULT_HERO;
}

export async function getAboutMeData(): Promise<AboutMeRow | null> {
  if (isSupabaseConfigured()) {
    const { data } = await supabase.from('about_me').select('*').limit(1).single();
    if (data) return data as AboutMeRow;
  }
  return DEFAULT_ABOUT;
}

export async function getTechStackData(): Promise<TechStackRow[]> {
  if (isSupabaseConfigured()) {
    const { data } = await supabase.from('tech_stack').select('*').order('order', { ascending: true });
    if (data && data.length) return data as TechStackRow[];
  }
  return DEFAULT_TECH;
}

export async function getWorksData(): Promise<WorkRow[]> {
  if (isSupabaseConfigured()) {
    const { data } = await supabase.from('works').select('*').order('order', { ascending: true });
    if (data && data.length) return data as WorkRow[];
  }
  return DEFAULT_WORKS;
}

export async function getContactData(): Promise<ContactRow | null> {
  if (isSupabaseConfigured()) {
    const { data } = await supabase.from('contact').select('*').limit(1).single();
    if (data) return data as ContactRow;
  }
  return DEFAULT_CONTACT;
}

export async function getBlogPosts(): Promise<BlogRow[]> {
  if (isSupabaseConfigured()) {
    const { data } = await supabase.from('blog').select('*').eq('published', true);
    if (data && data.length) return data as BlogRow[];
  }
  return DEFAULT_BLOGS;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogRow | null> {
  if (isSupabaseConfigured()) {
    const { data } = await supabase.from('blog').select('*').eq('slug', slug).single();
    if (data) return data as BlogRow;
  }
  return DEFAULT_BLOGS.find((p) => p.slug === slug) || null;
}
