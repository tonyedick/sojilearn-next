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
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featured_image_url?: string;
  author_name: string;
  author_avatar_url?: string;
  published_date: string;
  updated_date: string;
  category: 'Study Abroad' | 'Scholarships' | 'Success Stories' | 'Visa and Immigration' | 'Scholarships and Grants' | 'SOP';
  tags?: string[];
  filter_type?: 'Undergraduate' | 'Postgraduate' | 'Visa' | 'SOPs' | 'Scholarships';
  is_published: boolean | null;
  featured: boolean;
  reading_time_minutes?: number;
  seo_title?: string;
  seo_description?: string;
  created_at: string;
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