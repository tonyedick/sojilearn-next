/**
 * Individual Blog Post Page (Server Component)
 *
 * Dynamic route that fetches a single blog post by slug
 * using the centralized blog API.
 *
 * @see {@link @/lib/blog/api#getBlogPostBySlug}
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getAllBlogPosts } from '@/lib/blog/api';
import BlogLayout from '@/components/Layouts/BlogLayout';
import BlogPostContent from '@/components/blog/BlogPostContent';

/** Revalidate every hour */
export const revalidate = 3600;

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Generate static params for pre-rendering known blog posts at build time
 */
export async function generateStaticParams() {
  const posts = await getAllBlogPosts(50);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

/**
 * Dynamic metadata based on the blog post content
 */
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found - Sojilearn',
    };
  }

  return {
    title: `${post.title} - Sojilearn`,
    description: post.excerpt || post.title,
    openGraph: {
      title: post.title,
      description: post.excerpt || post.title,
      url: `https://www.sojilearn.com/blog/${post.slug}`,
      images: post.featured_image_url
        ? [{ url: post.featured_image_url }]
        : [{ url: 'https://www.sojilearn.com/social-media.jpg' }],
      type: 'article',
      publishedTime: post.published_date,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  /** Fetch single post server-side */
  const post = await getBlogPostBySlug(slug);

  /** Return 404 if post not found */
  if (!post) {
    notFound();
  }

  return (
    <BlogLayout>
      <BlogPostContent post={post} />
    </BlogLayout>
  );
}