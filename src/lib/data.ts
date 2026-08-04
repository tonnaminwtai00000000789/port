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
      logo: 'https://ui-avatars.com/api/?name=SWB&background=0f172a&color=60a5fa&font-size=0.45&bold=true',
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
  {
    id: 19,
    category: 'Database & ORM',
    order: 4,
    technologies: [
      { icon: 'devicon-postgresql-plain colored', name: 'PostgreSQL' },
      { icon: 'devicon-mysql-plain colored', name: 'MySQL' },
      { icon: 'devicon-mongodb-plain colored', name: 'MongoDB' },
      { icon: 'devicon-redis-plain colored', name: 'Redis' },
      { icon: 'devicon-prisma-original colored', name: 'Prisma' },
      { icon: 'https://orm.drizzle.team/favicon.ico', name: 'Drizzle ORM' },
    ],
  },
  {
    id: 20,
    category: 'Real-time Communication',
    order: 5,
    technologies: [
      { icon: 'devicon-[#0f172a]', name: 'WebSocket' },
      { icon: 'devicon-socketio-original colored', name: 'Socket.IO' },
      { icon: 'devicon-[#0f172a]', name: 'EventStream' },
    ],
  },
  {
    id: 21,
    category: 'DevOps & Infrastructure',
    order: 6,
    technologies: [
      { icon: 'devicon-docker-plain colored', name: 'Docker' },
      { icon: 'devicon-[#0f172a]', name: 'PM2' },
      { icon: 'devicon-nginx-original colored', name: 'Nginx' },
      { icon: 'devicon-vercel-[#0f172a]', name: 'Vercel' },
      { icon: 'devicon-cloudflare-plain colored', name: 'Cloudflare' },
      { icon: 'devicon-githubactions-plain colored', name: 'GitHub Actions' },
      { icon: 'devicon-ubuntu-plain colored', name: 'Ubuntu' },
      { icon: 'devicon-windows8-original colored', name: 'Windows Server' },
    ],
  },
  {
    id: 22,
    category: 'Design & Tools',
    order: 7,
    technologies: [
      { icon: 'devicon-figma-plain colored', name: 'Figma' },
      { icon: 'devicon-photoshop-plain colored', name: 'Photoshop' },
      { icon: 'devicon-premierepro-plain colored', name: 'Premiere Pro' },
      { icon: 'devicon-[#0f172a]', name: 'Vegas Pro' },
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
    title: 'บทความแนะนำ',
    slug: 'welcome',
    image: 'https://theijon.online/images/tonnam.png',
    date: '2026-08-04',
    content: '# ต้อนรับสู่บล็อกของผม\nขอบคุณที่เข้ามาเยี่ยมชมเว็บไซต์และอ่านบทความครับ',
    published: true,
  },
];

export async function getHeroData(): Promise<HeroRow | null> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from('hero').select('*').limit(1).single();
      if (data && !error) return data as HeroRow;
    } catch (e) {
      console.warn('Supabase hero fetch fallback:', e);
    }
  }
  return DEFAULT_HERO;
}

export async function getAboutMeData(): Promise<AboutMeRow | null> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from('about_me').select('*').limit(1).single();
      if (data && !error) return data as AboutMeRow;
    } catch (e) {
      console.warn('Supabase about_me fetch fallback:', e);
    }
  }
  return DEFAULT_ABOUT;
}

export async function getTechStackData(): Promise<TechStackRow[]> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from('tech_stack').select('*').order('order', { ascending: true });
      if (data && data.length && !error) return data as TechStackRow[];
    } catch (e) {
      console.warn('Supabase tech_stack fetch fallback:', e);
    }
  }
  return DEFAULT_TECH;
}

export async function getWorksData(): Promise<WorkRow[]> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from('works').select('*').order('order', { ascending: true });
      if (data && data.length && !error) return data as WorkRow[];
    } catch (e) {
      console.warn('Supabase works fetch fallback:', e);
    }
  }
  return DEFAULT_WORKS;
}

export async function getContactData(): Promise<ContactRow | null> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from('contact').select('*').limit(1).single();
      if (data && !error) return data as ContactRow;
    } catch (e) {
      console.warn('Supabase contact fetch fallback:', e);
    }
  }
  return DEFAULT_CONTACT;
}

export async function getBlogPosts(): Promise<BlogRow[]> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from('blog').select('*').eq('published', true);
      if (data && data.length && !error) return data as BlogRow[];
    } catch (e) {
      console.warn('Supabase blog fetch fallback:', e);
    }
  }
  return DEFAULT_BLOGS;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogRow | null> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from('blog').select('*').eq('slug', slug).single();
      if (data && !error) return data as BlogRow;
    } catch (e) {
      console.warn('Supabase blog slug fetch fallback:', e);
    }
  }
  return DEFAULT_BLOGS.find((p) => p.slug === slug) || null;
}
