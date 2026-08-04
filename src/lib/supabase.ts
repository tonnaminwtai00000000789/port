import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

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
