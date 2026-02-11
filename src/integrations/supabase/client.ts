import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON as string;

if (!supabaseUrl || !supabaseKey) {
  console.log('Supabase URL and Key must be set in environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);