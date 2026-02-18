/**
 * Blog Post Type Definitions
 * 
 * Defines the shape of blog post data used throughout the application
 * 
 * @module types/blog
 */

/**
 * Represents a blog post in the system
 */
export interface BlogPost {
  /** Unique identifier for the blog post */
  id: string;
  
  /** Title of the blog post */
  title: string;
  
  /** URL-friendly slug for routing */
  slug: string;
  
  /** Short excerpt or summary (optional) */
  excerpt?: string;
  
  /** Full content of the blog post in markdown/HTML */
  content: string;
  
  /** URL to the featured image (optional) */
  featured_image_url?: string;

  author_name: string;

  author_avatar_url?: string;

  /** ISO 8601 timestamp when the post was published */
  published_date: string;
  
  /** ISO 8601 timestamp of the last update */
  updated_at: string;
  
  /** Category the post belongs to */
  category: string;
  
  /** Array of tags for categorization */
  tags: string[];

  filter_type?: string;
  
  /** Whether the post is published (visible to public) */
  is_published: boolean;

  featured: boolean;

  reading_time_minutes?: number;
  
  seo_title?: string;

  seo_description?: string;
  
  /** SEO meta description (optional) */
  meta_description?: string;
  
  /** SEO keywords (optional) */
  meta_keywords?: string[];
}

/**
 * Blog post list response type
 */
export interface BlogPostListResponse {
  posts: BlogPost[];
  total: number;
  page: number;
  pageSize: number;
}

/**
 * API error response type
 */
export interface BlogAPIErrorResponse {
  error: string;
  statusCode?: number;
  details?: unknown;
}