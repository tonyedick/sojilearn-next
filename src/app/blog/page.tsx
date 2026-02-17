/**
 * Blog Page (Server Component)
 *
 * Fetches all published blog posts server-side using the centralized
 * blog API, then passes data to presentational components for rendering.
 *
 * @see {@link @/lib/blog/api} for data fetching logic
 */

import { Metadata } from "next";
import { getAllBlogPosts } from '@/lib/blog/api';
import BlogList from '@/components/blog/BlogList';
import BlogLayout from "@/components/Layouts/BlogLayout";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Blog page - Sojilearn",
  description: "Sojilearn is a study abroad agency, helping students navigate their educational journey and achieve their dreams.",
  openGraph: {
    title: "Blog page - Sojilearn",
    description: "Expert guidance for studying abroad",
    url: "https://www.sojilearn.com/blog",
    images: [{ url: "https://www.sojilearn.com/social-media.jpg" }],
  },
};

export default async function BlogPage() {

  const posts = await getAllBlogPosts();
  return (
    <BlogLayout>
     <BlogList posts={posts} />
    </BlogLayout>
  );
}
