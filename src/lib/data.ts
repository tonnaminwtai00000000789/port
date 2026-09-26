import { cache } from 'react';
import {
  getHero,
  getAboutMe,
  getTechStack,
  getWorks,
  getContact,
  getBlogPosts as getD1BlogPosts,
  getBlogPostBySlug as getD1BlogPostBySlug,
  type HeroRow,
  type AboutMeRow,
  type TechStackRow,
  type WorkRow,
  type ContactRow,
  type BlogRow,
} from './db';

export type { HeroRow, AboutMeRow, TechStackRow, WorkRow, ContactRow, BlogRow };

export const FALLBACK_HERO: HeroRow = {
  id: 3,
  firstName: 'Supakron',
  lastName: 'Klinbubpa',
  displayName: 'Tonnameangja',
  nickname: 'Tonnam',
  birthDate: '2011-03-03',
  startDate: '2021-01-01',
  location: 'Bangbon, Bangkok',
  profileImage: 'https://theijon.online/images/tonnam.png',
  emoji: '😪💤',
  webringUrl: 'https://webring.wonderful.software#nsys.site',
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

// React.cache for per-request deduplication (server-cache-react rule)
export const getHeroData = cache(async (): Promise<HeroRow | null> => {
  try {
    const data = await getHero();
    return data || FALLBACK_HERO;
  } catch (e) {
    console.error('getHeroData error:', e);
    return FALLBACK_HERO;
  }
});

export const getAboutMeData = cache(async (): Promise<AboutMeRow | null> => {
  try {
    const data = await getAboutMe();
    return data || FALLBACK_ABOUT;
  } catch (e) {
    console.error('getAboutMeData error:', e);
    return FALLBACK_ABOUT;
  }
});

export const getTechStackData = cache(async (): Promise<TechStackRow[]> => {
  try {
    const data = await getTechStack();
    return (data && data.length > 0) ? data : FALLBACK_TECH;
  } catch (e) {
    console.error('getTechStackData error:', e);
    return FALLBACK_TECH;
  }
});

export const getWorksData = cache(async (): Promise<WorkRow[]> => {
  try {
    const data = await getWorks();
    return data || [];
  } catch (e) {
    console.error('getWorksData error:', e);
    return [];
  }
});

export const getContactData = cache(async (): Promise<ContactRow | null> => {
  try {
    const data = await getContact();
    return data || FALLBACK_CONTACT;
  } catch (e) {
    console.error('getContactData error:', e);
    return FALLBACK_CONTACT;
  }
});

export const getBlogPosts = cache(async (): Promise<BlogRow[]> => {
  try {
    const data = await getD1BlogPosts();
    return data || [];
  } catch (e) {
    console.error('getBlogPosts error:', e);
    return [];
  }
});

export const getBlogPostBySlug = cache(async (slug: string): Promise<BlogRow | null> => {
  try {
    const data = await getD1BlogPostBySlug(slug);
    return data;
  } catch (e) {
    console.error('getBlogPostBySlug error:', e);
    return null;
  }
});
