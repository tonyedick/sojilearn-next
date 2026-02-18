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
import BlogPageContent from '@/components/blog/BlogPageContent';
import BlogLayout from "@/components/Layouts/BlogLayout";
import Link from "next/link";

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
     <>
      <section className="page-title" style={{background: "url(assets/img/banner-3.jpg)no-repeat"}} data-overlay="8">
          <div className="container">
              <div className="row">
                  <div className="col-lg-12 col-md-12">
                      <div className="breadcrumbs-wrap">
                          <h1 className="breadcrumb-title text-light">Hot Topics</h1>
                          <nav className="transparent">
                              <ol className="breadcrumb p-0">
                                  <li className="breadcrumb-item"><Link href="/" className="text-light">Home</Link></li>
                                  <li className="breadcrumb-item theme-cl" aria-current="page">Blog</li>
                              </ol>
                          </nav>
                      </div>

                  </div>
              </div>
          </div>
      </section>

     <BlogPageContent initialPosts={posts} />
     </>
    </BlogLayout>
  );
}
