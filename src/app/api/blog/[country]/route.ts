/**
 * Blog Posts API - Server-side endpoint for fetching country-specific blog posts
 * 
 * This API route provides:
 * - Secure server-side data fetching
 * - Input validation
 * - Rate limiting (TODO: implement)
 * - Proper error handling
 * - Cache headers for performance
 * 
 * @route GET /api/blog/:country
 * @param country - Country name (Canada, UK, USA, Germany, Malta)
 * @returns BlogPost[] - Array of blog posts for the specified country
 * 
 * @example
 * fetch('/api/blog/Canada')
 *   .then(res => res.json())
 *   .then(posts => console.log(posts))
 */

import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase/server';
import { BlogPost } from '@/lib/types/blog';

/**
 * Allowed country values for blog post filtering
 * This whitelist prevents injection attacks
 */
const VALID_COUNTRIES = ['Canada', 'UK', 'USA', 'Germany', 'Malta'] as const;
type ValidCountry = typeof VALID_COUNTRIES[number];

/**
 * Validates if the provided country is in the allowed list
 */
function isValidCountry(country: string): country is ValidCountry {
  return VALID_COUNTRIES.includes(country as ValidCountry);
}

/**
 * Cache configuration
 */
const CACHE_CONFIG = {
  // Revalidate after 1 hour
  revalidate: 3600,
  // Stale-while-revalidate for 24 hours
  swr: 86400,
} as const;

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ country: string }> }
) {
  try {
    const { country } = await context.params;

    // Input validation
    if (!country) {
      return NextResponse.json(
        { error: 'Country parameter is required' },
        { status: 400 }
      );
    }

    if (!isValidCountry(country)) {
      return NextResponse.json(
        { 
          error: 'Invalid country parameter',
          validCountries: VALID_COUNTRIES 
        },
        { status: 400 }
      );
    }

    // Get server-side Supabase client
    const supabase = getSupabaseServer();

    // Fetch blog posts with proper error handling
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('is_published', true)
      .contains('tags', [country])
      .order('published_date', { ascending: false })
      .limit(3);

    if (error) {
      console.log('[Blog API] Database error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch blog posts' },
        { status: 500 }
      );
    }

    // Return successful response with cache headers
    return NextResponse.json(data as unknown as BlogPost[], {
      status: 200,
      headers: {
        'Cache-Control': `public, s-maxage=${CACHE_CONFIG.revalidate}, stale-while-revalidate=${CACHE_CONFIG.swr}`,
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.log('[Blog API] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Handle unsupported methods
 */
export async function POST() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}