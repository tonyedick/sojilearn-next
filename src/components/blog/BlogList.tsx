/**
 * BlogList Component (Presentational)
 *
 * Renders a grid of blog post cards.
 * Receives data as props — does NOT fetch data itself.
 *
 * @component
 */

import { BlogPost } from '@/integrations/types/blog';
import Link from 'next/link';
import Image from 'next/image';

interface BlogListProps {
  posts: BlogPost[];
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function BlogList({ posts }: BlogListProps) {
  if (posts.length === 0) {
    return (
      <section className="min gray">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-8 text-center">
              <h2>No Posts Available</h2>
              <p className="text-muted">Check back soon for new articles.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-7 col-md-8">
            <div className="sec-heading center">
              <h2>
                Our <span className="theme-cl">Blog</span>
              </h2>
              <p>
                Stay informed with the latest news, tips, and insights about
                studying abroad.
              </p>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          {posts.map((post) => (
            <div className="col-lg-4 col-md-6 mb-4" key={post.id}>
              <div className="blg_grid_box">
                {post.featured_image_url && (
                  <div className="blg_grid_thumb">
                    <Link href={`/blog/${post.slug}`}>
                      <Image
                        src={post.featured_image_url}
                        alt={post.title}
                        className="img-fluid"
                        style={{
                          height: '240px',
                          width: '100%',
                          objectFit: 'cover',
                        }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        width={400}
                        height={240}
                        loading="lazy"
                      />
                    </Link>
                  </div>
                )}

                <div
                  className="blg_grid_caption"
                  style={{ height: '220px', width: '100%' }}
                >
                  <div className="row">
                    <div className="col-8">
                      <div className="blg_tag dark">
                        <span>{post.category}</span>
                      </div>
                    </div>
                    <div
                      className="col-4"
                      style={{
                        fontWeight: 'light',
                        fontSize: '12px',
                        textAlign: 'end',
                      }}
                    >
                      {formatDate(post.published_date)}
                    </div>
                  </div>

                  <div className="blg_title">
                    <h4>{post.title}</h4>
                  </div>

                  <div className="blg_desc">
                    <p>
                      {post?.excerpt?.substring(0, 100) ||
                        'No excerpt available'}
                      ...
                    </p>
                  </div>

                  <div className="blg_more">
                    <Link href={`/blog/${post.slug}`}>Read More</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}