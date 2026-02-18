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
        .order('published_date', { ascending: false })
        .limit(limit);

      if (error) {
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
 * Fetch a single blog post by slug
 * Cached per request for optimal performance
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
 * Fetch related blog posts based on tags and category
 * 
 * @param currentPostId - ID of current post to exclude
 * @param category - Category to filter by
 * @param tags - Tags to match against
 * @param limit - Maximum number of posts to return
 * @returns Promise<BlogPost[]>
 */
export const getRelatedPosts = cache(
  async (
    currentPostId: string,
    category: string,
    tags: string[] = [],
    limit = 3
  ): Promise<BlogPost[]> => {
    try {
      const supabase = getSupabaseServer();

      // First try to get posts with matching tags
      if (tags.length > 0) {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('is_published', true)
          .neq('id', currentPostId)
          .overlaps('tags', tags)
          .order('published_date', { ascending: false })
          .limit(limit);

        if (!error && data && data.length > 0) {
          return data as BlogPost[];
        }
      }

      // Fallback to category-based related posts
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('is_published', true)
        .eq('category', category)
        .neq('id', currentPostId)
        .order('published_date', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('[Blog] Error fetching related posts:', error);
        return [];
      }

      return (data as BlogPost[]) || [];
    } catch (err) {
      console.error('[Blog] Unexpected error fetching related posts:', err);
      return [];
    }
  }
);

/**
 * Fetch blog posts by category
 * 
 * @param category - Category to filter by
 * @returns Promise<BlogPost[]>
 */
export const getPostsByCategory = cache(
  async (category: string): Promise<BlogPost[]> => {
    try {
      const supabase = getSupabaseServer();

      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('is_published', true)
        .eq('category', category)
        .order('published_date', { ascending: false });

      if (error) {
        console.error('[Blog] Error fetching posts by category:', error);
        return [];
      }

      return (data as BlogPost[]) || [];
    } catch (err) {
      console.error('[Blog] Unexpected error fetching posts by category:', err);
      return [];
    }
  }
);

/**
 * Search blog posts by search term
 * 
 * @param searchTerm - Search query
 * @returns Promise<BlogPost[]>
 */
export const searchPosts = cache(
  async (searchTerm: string): Promise<BlogPost[]> => {
    try {
      const supabase = getSupabaseServer();

      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('is_published', true)
        .or(`title.ilike.%${searchTerm}%,excerpt.ilike.%${searchTerm}%`)
        .order('published_date', { ascending: false });

      if (error) {
        console.error('[Blog] Error searching posts:', error);
        return [];
      }

      return (data as BlogPost[]) || [];
    } catch (err) {
      console.error('[Blog] Unexpected error searching posts:', err);
      return [];
    }
  }
);

/**
 * Fetch recent blog posts
 * 
 * @param limit - Maximum number of posts to return
 * @returns Promise<BlogPost[]>
 */
export const getRecentPosts = cache(
  async (limit: number = 5): Promise<BlogPost[]> => {
    try {
      const supabase = getSupabaseServer();

      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('is_published', true)
        .order('published_date', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('[Blog] Error fetching recent posts:', error);
        return [];
      }

      return (data as BlogPost[]) || [];
    } catch (err) {
      console.error('[Blog] Unexpected error fetching recent posts:', err);
      return [];
    }
  }
);

/**
 * Fetch all unique categories
 * 
 * @returns Promise<string[]>
 */
export const getAllCategories = cache(
  async (): Promise<string[]> => {
    try {
      const supabase = getSupabaseServer();

      const { data, error } = await supabase
        .from('blog_posts')
        .select('category')
        .eq('is_published', true);

      if (error) {
        console.error('[Blog] Error fetching categories:', error);
        return [];
      }

      const uniqueCategories = [...new Set(data.map(post => post.category))];
      return uniqueCategories.filter(Boolean) as string[];
    } catch (err) {
      console.error('[Blog] Unexpected error fetching categories:', err);
      return [];
    }
  }
);

/**
 * Fetch all unique tags
 * 
 * @returns Promise<string[]>
 */
export const getAllTags = cache(
  async (): Promise<string[]> => {
    try {
      const supabase = getSupabaseServer();

      const { data, error } = await supabase
        .from('blog_posts')
        .select('tags')
        .eq('is_published', true);

      if (error) {
        console.error('[Blog] Error fetching tags:', error);
        return [];
      }

      const allTags = data
        .filter(post => post.tags && Array.isArray(post.tags))
        .flatMap(post => post.tags as string[]);

      const uniqueTags = [...new Set(allTags)];
      return uniqueTags.filter(Boolean);
    } catch (err) {
      console.error('[Blog] Unexpected error fetching tags:', err);
      return [];
    }
  }
);