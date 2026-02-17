/**
 * BlogPostContent Component (Presentational)
 *
 * Renders a single blog post's full content.
 * Receives data as props — does NOT fetch data itself.
 *
 * @component
 */

import { BlogPost } from '@/integrations/types/blog';
import Image from 'next/image';
import Link from 'next/link';

interface BlogPostContentProps {
  post: BlogPost;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
  return (
    <section>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {/* Back link */}
            <div className="mb-4">
              <Link href="/blog" className="theme-cl">
                &larr; Back to Blog
              </Link>
            </div>

            {/* Post header */}
            <div className="mb-4">
              <div className="blg_tag dark mb-2">
                <span>{post.category}</span>
              </div>
              <h1>{post.title}</h1>
              <p className="text-muted">
                Published on {formatDate(post.published_date)}
                {post.author && <> &bull; By {post.author}</>}
              </p>
            </div>

            {/* Featured image */}
            {post.featured_image_url && (
              <div className="mb-4">
                <Image
                  src={post.featured_image_url}
                  alt={post.title}
                  className="img-fluid rounded"
                  style={{
                    width: '100%',
                    maxHeight: '500px',
                    objectFit: 'cover',
                  }}
                  width={1200}
                  height={500}
                  priority
                />
              </div>
            )}

            {/* Post body */}
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: post.content || '' }}
            />

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-4 pt-4 border-top">
                <strong>Tags: </strong>
                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="badge bg-light text-dark me-2"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}