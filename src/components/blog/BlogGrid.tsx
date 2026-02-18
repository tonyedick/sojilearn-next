'use client';

import { BlogPost } from '@/integrations/types/blog';
import Link from 'next/link';
import Image from 'next/image';

interface BlogGridProps {
  posts: BlogPost[];
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogGrid({ posts }: BlogGridProps) {
  if (posts.length === 0) {
    return (
      <div className="col-12 text-center py-8">
        <h4>No posts found matching your criteria</h4>
        <p className="text-muted">Try adjusting your filters or search term</p>
      </div>
    );
  }

  return (
    <div className="row">
      {posts.map(post => (
        <div key={post.id} className="col-lg-6 col-md-6 col-sm-12 col-12">
          <div className="blg_grid_box">
            <div className="blg_grid_thumb">
              {post.featured_image_url && (
                <Link href={`/blog/${post.slug}`}>
                  <Image 
                    src={post.featured_image_url}
                    alt={post.title}
                    className="img-fluid"
                    loading="lazy"
                    style={{height: "220px", width: "100%", objectFit: "cover"}}
                    width={400}
                    height={220}
                  />
                </Link>
              )}
            </div>
            <div className="blg_grid_caption" style={{height: "220px", width: "100%"}}>
              <div className="blg_tag">
                <span>{post.category}</span>
              </div>
              {post.filter_type && (
                <div className="blg_tag">{post.filter_type}</div>
              )}
              <div className="blg_title">
                <h4>
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h4>
              </div>
              <div className="blg_desc">
                <p>{post.excerpt}</p>
              </div>
            </div>
            <div className="crs_grid_foot">
              <div className="crs_flex">
                <div className="crs_fl_first">
                  <div className="crs_tutor">
                    <div className="crs_tutor_thumb">
                      <Link href={`/blog/${post.slug}`}>
                        {post.author_avatar_url ? (
                          <Image 
                            className="img-fluid circle" 
                            src={post.author_avatar_url}
                            alt={post.author_name}
                            loading="lazy"
                            width={40}
                            height={40}
                          />
                        ) : (
                          <div className="img-fluid circle bg-light d-flex align-items-center justify-content-center" style={{width: 40, height: 40}}>
                            <i className="fa fa-user"></i>
                          </div>
                        )}
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="crs_fl_last">
                  <div className="foot_list_info">
                    <ul>
                      {post.reading_time_minutes && (
                        <li>
                          <div className="elsio_ic"><i className="fa fa-clock text-success"></i></div>
                          <div className="elsio_tx">{post.reading_time_minutes} min</div>
                        </li>
                      )}
                      <li>
                        <div className="elsio_ic"><i className="fa fa-calendar text-warning"></i></div>
                        <div className="elsio_tx">{formatDate(post.published_date)}</div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}