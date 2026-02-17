/**
 * Blog data fetching utilities
 * Centralized functions for fetching blog posts
 * 
 * @module lib/blog/api
 */

import { getSupabaseServer } from '@/lib/supabase/server';
import { BlogPost } from '@/integrations/types/blog';
import { cache } from 'react';

/**
 * Valid country tags for filtering blog posts
 */
export const COUNTRY_TAGS = ['Canada', 'UK', 'USA', 'Germany', 'Malta'] as const;
export type CountryTag = typeof COUNTRY_TAGS[number];

/**
 * Server-side function to fetch blog posts by country tag
 * Cached per request for optimal performance
 * 
 * @param country - Country tag to filter by
 * @returns Promise<BlogPost[]>
 */
export const getBlogPostsByCountry = cache(
  async (country: CountryTag): Promise<BlogPost[]> => {
    try {
      const supabase = getSupabaseServer();

      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('is_published', true)
        .contains('tags', [country])
        .order('published_date', { ascending: false })
        .limit(3);

      if (error) {
        console.error(`[Blog] Error fetching ${country} posts:`, error);
        return [];
      }

      return (data as BlogPost[]) || [];
    } catch (err) {
      console.error(`[Blog] Unexpected error fetching ${country} posts:`, err);
      return [];
    }
  }
);

/**
 * Fetch all published blog posts
 * Used by the main /blog listing page
 * 
 * @param limit - Maximum number of posts to return
 * @returns Promise<BlogPost[]>
 */

export const getAllBlogPosts = cache(
  async (limit: number = 50): Promise<BlogPost[]> => {
    try {
      const supabase = getSupabaseServer();

      const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('is_published', true)
      .order('published_date', { ascending:false })
      .limit(limit);

      if (error){
        console.error('[Blog] Error fetching all posts:', error);
        return [];
      }

      return (data as BlogPost[]) || [];
    } catch (err) {
      console.error('[Blog] Unexpected error fetching all posts:', err);
      return [];
    }
  }
);
/**
 * Fetch all featured blog posts
 * 
 * @param limit - Maximum number of posts to return
 * @returns Promise<BlogPost[]>
 */
export const getFeaturedPosts = cache(
  async (limit: number = 3): Promise<BlogPost[]> => {
    try {
      const supabase = getSupabaseServer();

      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('is_published', true)
        .eq('featured', true)
        .order('published_date', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('[Blog] Error fetching featured posts:', error);
        return [];
      }

      return (data as BlogPost[]) || [];
    } catch (err) {
      console.error('[Blog] Unexpected error fetching featured posts:', err);
      return [];
    }
  }
);

/**
 * Fetch a single blog post by slug
 * 
 * @param slug - URL slug of the post
 * @returns Promise<BlogPost | null>
 */
export const getBlogPostBySlug = cache(
  async (slug: string): Promise<BlogPost | null> => {
    try {
      const supabase = getSupabaseServer();

      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .single();

      if (error) {
        console.error(`[Blog] Error fetching post ${slug}:`, error);
        return null;
      }

      return data as BlogPost;
    } catch (err) {
      console.error(`[Blog] Unexpected error fetching post ${slug}:`, err);
      return null;
    }
  }
);