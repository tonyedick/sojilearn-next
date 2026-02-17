/**
 * Server-side Supabase client
 * Uses service role key for elevated permissions
 * ONLY use in Server Components, API Routes, and Server Actions
 * 
 * @module lib/supabase/server
 */

import { createClient } from '@supabase/supabase-js';
import { cache } from 'react';
import type { Database } from '@/integrations/supabase/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  console.log('Missing NEXT_PUBLIC_SUPABASE_URL');
}

if (!supabaseServiceKey) {
  console.log(
    'Missing SUPABASE_SERVICE_ROLE_KEY. Add it to .env.local (DO NOT use NEXT_PUBLIC_ prefix)'
  );
}

export const supabaseServer = createClient<Database>(
  supabaseUrl,
  supabaseServiceKey,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);

export const getSupabaseServer = cache(() => supabaseServer);