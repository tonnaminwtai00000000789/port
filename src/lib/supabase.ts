import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface HeroRow {
  id: number;
  first_name: string;
  last_name: string;
  display_name: string;
  nickname: string;
  birth_date: string;
  start_date: string;
  location: string;
  profile_image: string;
  emoji: string;
  webring_url: string;
  positions: any[];
}

export interface AboutMeRow {
  id: number;
  nickname: string;
  status: string;
  status_link: string;
  full_name: string;
  birthday: string;
  location: string;
  facts: any[];
}

export interface TechStackRow {
  id: number;
  category: string;
  order: number;
  technologies: any[];
}

export interface ContactRow {
  id: number;
  email: string;
  socials: any[];
}

export interface BlogRow {
  id: number;
  title: string;
  slug: string;
  image: string;
  date: string;
  content: string;
  published: boolean;
  created_at?: string;
  updated_at?: string;
}
