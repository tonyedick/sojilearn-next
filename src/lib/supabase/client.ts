/**
 * Client-side Supabase client with restricted permissions
 * 
 * This client should only be used for:
 * - Public data access (with RLS enabled)
 * - User authentication flows
 * - Real-time subscriptions
 * 
 * For server-side operations, use @/lib/supabase/server
 * 
 * @module lib/supabase/client
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  console.log(
    'Missing NEXT_PUBLIC_SUPABASE_URL.'
  );
}

if (!supabaseAnonKey) {
  console.log(
    'Missing NEXT_PUBLIC_SUPABASE_ANON_KEY.'
  );
}
/**
 * Client-side Supabase instance
 * This uses the anon key which has restricted permissions
 * All database access must be protected by Row Level Security (RLS) policies
 */
export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
  db: {
    schema: 'public',
  },
  global: {
    headers: {
      'X-Client-Info': 'sojilearn-client',
    },
  },
});

/**
 * Get client-side Supabase instance
 * Use this for client components that need database access
 */
export const getSupabaseClient = () => supabaseClient;