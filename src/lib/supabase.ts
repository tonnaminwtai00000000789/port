import { createClient } from '@supabase/supabase-js';

const getEnv = (key: string) => {
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
      return import.meta.env[key];
    }
  } catch (e) {}
  try {
    if (typeof process !== 'undefined' && process.env && process.env[key]) {
      return process.env[key];
    }
  } catch (e) {}
  return '';
};

const supabaseUrl = getEnv('PUBLIC_SUPABASE_URL') || 'https://placeholder.supabase.co';
const supabaseAnonKey = getEnv('PUBLIC_SUPABASE_ANON_KEY') || 'placeholder-key';

export const isSupabaseConfigured = () => {
  return supabaseUrl && !supabaseUrl.includes('placeholder');
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface HeroRow {
  id: number;
  firstName: string;
  lastName: string;
  displayName: string;
  nickname: string;
  birthDate: string;
  startDate: string;
  location: string;
  profileImage: string;
  emoji: string;
  webringUrl: string | null;
  positions: any[];
}

export interface AboutMeRow {
  id: number;
  nickname: string;
  status: string;
  statusLink: string | null;
  fullName: string;
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

export interface WorkRow {
  id: number;
  title: string;
  description: string;
  image: string;
  year: string;
  size: "large" | "small";
  watermark: string | null;
  tags: any[];
  links: any[];
  order: number;
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
