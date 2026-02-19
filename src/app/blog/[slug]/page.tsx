import { Metadata } from "next";
import { getAllBlogPosts, getBlogPostBySlug } from '@/lib/blog/api';
import BlogDetailContent from '@/components/blog/SingleBlog/BlogDetailContent';
import BlogLayout from "@/components/Layouts/BlogLayout";
import Link from "next/link";
import { useAnalytics } from '@/hooks/useAnalytics';
import { notFound } from 'next/navigation';

export const revalidate = 3600;

type Props = {
  params: Promise<{ slug: string }>
}

// Generate dynamic metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found - Sojilearn",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: post.seo_title || `${post.title} - Sojilearn Blog`,
    description: post.seo_description || post.excerpt || "Expert guidance for studying abroad",
    keywords: post.tags?.join(', ') || 'study abroad, international education',
    authors: [{ name: post.author_name }],
    openGraph: {
      title: post.seo_title || post.title,
      description: post.seo_description || post.excerpt || '',
      url: `https://www.sojilearn.com/blog/${post.slug}`,
      images: post.featured_image_url ? [{ url: post.featured_image_url }] : [],
      type: 'article',
      publishedTime: post.published_date,
      modifiedTime: post.updated_date || post.published_date,
      authors: [post.author_name],
      tags: post.tags || [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seo_title || post.title,
      description: post.seo_description || post.excerpt || '',
      images: post.featured_image_url ? [post.featured_image_url] : [],
    },
  };
}

// Generate static params for static generation
export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogDetailPage({ params }: Props) {
  useAnalytics();
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([
    getBlogPostBySlug(slug),
    getAllBlogPosts(),
  ]);

  if (!post) {
    notFound();
  }

  return (
    <BlogLayout>
      <>
        <section className="page-title gray">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="breadcrumbs-wrap">
                  <h1 className="breadcrumb-title">{post.title}</h1>
                  <nav className="transparent">
                    <ol className="breadcrumb p-0">
                      <li className="breadcrumb-item">
                        <Link href="/">Home</Link>
                      </li>
                      <li className="breadcrumb-item">
                        <Link href="/blog">Blog</Link>
                      </li>
                      <li className="breadcrumb-item active theme-cl" aria-current="page">
                        {post.category}
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </section>

        <BlogDetailContent post={post} allPosts={allPosts} />
      </>
    </BlogLayout>
  );
}