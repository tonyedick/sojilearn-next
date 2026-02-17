/**
 * Country News Component
 * 
 * Reusable component for displaying country-specific blog posts
 * This eliminates duplication across country-specific news components
 * 
 * @component
 * @example
 * ```tsx
 * <CountryNews 
 *   country="Canada" 
 *   posts={posts}
 *   backgroundColor="#DFFFFF"
 * />
 * ```
 */

import Link from 'next/link';
import Image from 'next/image';
import { BlogPost, Country } from '@/types';

interface CountryNewsProps {
  /** Country name for display */
  country: Country;
  
  /** Array of blog posts to display */
  posts: BlogPost[];
  
  /** Background color for the section (optional) */
  backgroundColor?: string;
  
  /** Custom title for the section (optional) */
  title?: string;
  
  /** Maximum number of posts to display (optional) */
  maxPosts?: number;
}

/**
 * Formats a date string to a human-readable format
 */
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Truncates text to a specified length with ellipsis
 */
function truncateText(text: string | undefined, maxLength: number): string {
  if (!text) return 'No excerpt available';
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
}

export default function CountryNews({
  country,
  posts,
  backgroundColor = '#DFFFFF',
  title = 'Latest News & Articles',
  maxPosts = 3,
}: CountryNewsProps) {
  // Don't render if no posts
  if (!posts || posts.length === 0) {
    return null;
  }

  const displayPosts = posts.slice(0, maxPosts);

  return (
    <section style={{ backgroundColor }}>
      <div className="container">
        {/* Section Header */}
        <div className="row justify-content-center">
          <div className="col-lg-7 col-md-8">
            <div className="sec-heading center">
              <h2>
                {title.split('&').length > 1 ? (
                  <>
                    {title.split('&')[0]}
                    <span className="theme-cl">&amp;</span>
                    {title.split('&')[1]}
                  </>
                ) : (
                  title
                )}
              </h2>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="row justify-content-center">
          {displayPosts.map((post) => (
            <div className="col-lg-4 col-md-6" key={post.id}>
              <article className="blg_grid_box">
                {/* Featured Image */}
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

                {/* Post Content */}
                <div
                  className="blg_grid_caption"
                  style={{ minHeight: '220px', width: '100%' }}
                >
                  {/* Category and Date */}
                  <div className="row mb-2">
                    <div className="col-8">
                      <div className="blg_tag dark">
                        <span>{post.category}</span>
                      </div>
                    </div>
                    <div
                      className="col-4"
                      style={{
                        fontWeight: 300,
                        fontSize: '12px',
                        textAlign: 'end',
                      }}
                    >
                      {formatDate(post.published_date)}
                    </div>
                  </div>

                  {/* Post Title */}
                  <div className="blg_title">
                    <h4>
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h4>
                  </div>

                  {/* Post Excerpt */}
                  <div className="blg_desc">
                    <p>{truncateText(post.excerpt, 100)}</p>
                  </div>

                  {/* Read More Link */}
                  <div className="blg_more">
                    <Link href={`/blog/${post.slug}`}>
                      Read More
                    </Link>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}