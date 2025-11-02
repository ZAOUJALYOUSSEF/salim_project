import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type UserType = 'client' | 'partner' | 'admin';

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  user_type: UserType;
  created_at: string;
  updated_at: string;
}

export interface Client {
  id: string;
  user_id: string;
  company_name: string;
  sector: string;
  postal_code: string;
  logo_url?: string;
  message?: string;
  status: 'pending' | 'active' | 'suspended';
  created_at: string;
}

export interface Partner {
  id: string;
  user_id: string;
  business_name: string;
  business_type: 'bakery' | 'pharmacy' | 'supermarket' | 'restaurant' | 'other';
  address: string;
  postal_code: string;
  city: string;
  logo_url?: string;
  bag_quantity: number;
  latitude?: number;
  longitude?: number;
  status: 'pending' | 'active' | 'suspended';
  created_at: string;
}

export interface Campaign {
  id: string;
  client_id: string;
  campaign_name: string;
  start_date: string;
  end_date: string;
  bags_printed: number;
  status: 'pending' | 'approved' | 'printing' | 'distributed' | 'completed';
  created_at: string;
}

export interface Statistics {
  id: string;
  total_bags_distributed: number;
  total_partners: number;
  co2_saved_kg: number;
  updated_at: string;
}
