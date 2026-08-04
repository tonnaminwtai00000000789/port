import { createClient } from '@supabase/supabase-js';

const url = process.env.PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key || url.includes('placeholder')) {
  console.log('⚠️ Missing valid PUBLIC_SUPABASE_URL or PUBLIC_SUPABASE_ANON_KEY environment variables in .env');
  console.log('Please update .env with your real Supabase credentials before running seed.');
  process.exit(0);
}

const supabase = createClient(url, key);

const HERO_DATA = [
  {
    id: 3,
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
      { logo: 'https://theijon.online/logo.jpg', since: 'Since Jan 2025', title: 'the founder of', organization: 'The ijon', organizationUrl: 'https://theijon.online/' },
      { logo: 'https://scontent.fbkk22-1.fna.fbcdn.net/v/t39.30808-6/399066911_734484848721847_3491665446363065300_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=a5f93a', since: 'Become a student in 2014', title: 'Student (Grade 9) in', organization: 'Sarasas Witaed Bangbon', organizationUrl: 'https://www.swb.ac.th/swb/' }
    ]
  }
];

const ABOUT_DATA = [
  {
    id: 3,
    nickname: 'Tonnam',
    status: 'IDK',
    status_link: 'https://www.pornhub.org/',
    full_name: 'Supakron Klinbubpa',
    birthday: 'Thursday, March3, 2011',
    location: 'Bangbon, Thailand',
    facts: [
      { type: 'image', image: 'https://swebtoon-phinf.pstatic.net/20210224_142/1614130186947iB8vd_JPEG/0M_details.jpg?type=crop540_540', title: 'Manhwa', subtitle: 'Passions' },
      { type: 'image', image: 'https://upload.wikimedia.org/wikipedia/sco/thumb/b/bf/KFC_logo.svg/250px-KFC_logo.svg.png', title: 'KFC', subtitle: 'Favorite Food' },
      { type: 'image', image: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Valorant_logo_-_pink_color_version.svg', title: 'Valorant', subtitle: 'Favorite Game' }
    ]
  }
];

const TECH_DATA = [
  {
    id: 16,
    category: 'Frontend Frameworks',
    order: 1,
    technologies: [
      { icon: 'devicon-react-original colored', name: 'React' },
      { icon: 'devicon-nextjs-plain colored', name: 'Next.js' },
      { icon: 'devicon-astro-plain colored', name: 'Astro' },
      { icon: 'devicon-svelte-plain colored', name: 'SvelteKit' },
      { icon: 'devicon-tailwindcss-original colored', name: 'Tailwind CSS' }
    ]
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
      { icon: 'devicon-cloudflare-plain colored', name: 'Cloudflare Workers' }
    ]
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
      { icon: 'devicon-python-plain colored', name: 'Python' }
    ]
  }
];

const CONTACT_DATA = [
  {
    id: 1,
    email: 'zel.da.supakron@gmail.com',
    socials: [
      { url: 'https://github.com/tonnaminwtai00000000789', icon: 'devicon-github-original', platform: 'GitHub', username: 'tonnaminwtai00000000789' },
      { url: 'https://www.instagram.com/tonnaminwtai00000000789/', icon: 'devicon-instagram-plain colored', platform: 'Instagram', username: 'tonnaminwtai00000000789' }
    ]
  }
];

const BLOG_DATA = [
  {
    id: 10,
    title: 'ควย',
    slug: 'เย้',
    image: 'https://tr.rbxcdn.com/180DAY-6a9f37f333452ee91542001faacf5e49/576/324/Image/Jpeg/noFilter',
    date: '9999-99-99',
    content: '# ควยควย\nควย\nควย\nควย',
    published: true
  }
];

async function seed() {
  console.log('🚀 Seeding data to Supabase database...');

  const { error: heroErr } = await supabase.from('hero').upsert(HERO_DATA);
  console.log('Hero:', heroErr ? heroErr.message : `Seeded ${HERO_DATA.length} row(s)`);

  const { error: aboutErr } = await supabase.from('about_me').upsert(ABOUT_DATA);
  console.log('About Me:', aboutErr ? aboutErr.message : `Seeded ${ABOUT_DATA.length} row(s)`);

  const { error: techErr } = await supabase.from('tech_stack').upsert(TECH_DATA);
  console.log('Tech Stack:', techErr ? techErr.message : `Seeded ${TECH_DATA.length} row(s)`);

  const { error: contactErr } = await supabase.from('contact').upsert(CONTACT_DATA);
  console.log('Contact:', contactErr ? contactErr.message : `Seeded ${CONTACT_DATA.length} row(s)`);

  const { error: blogErr } = await supabase.from('blog').upsert(BLOG_DATA);
  console.log('Blog:', blogErr ? blogErr.message : `Seeded ${BLOG_DATA.length} row(s)`);

  console.log('✅ Seeding complete!');
}

seed();
