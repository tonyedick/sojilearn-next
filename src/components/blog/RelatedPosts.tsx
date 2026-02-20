'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import moment from 'moment';
import { supabaseClient } from '@/lib/supabase/client';
import { BlogPost } from '@/lib/types/blog';

interface RelatedPostsProps {
  currentPost: BlogPost | null;
}

export const RelatedPosts = ({ currentPost }: RelatedPostsProps) => {
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      if (!currentPost) return;

      try {
        // Fetch posts with same category or filter_type, excluding current post
        const { data, error } = await supabaseClient
          .from('blog_posts')
          .select('*')
          .eq('is_published', true)
          .neq('id', currentPost.id)
          .or(`category.eq.${currentPost.category},filter_type.eq.${currentPost.filter_type}`)
          .order('published_date', { ascending: false })
          .limit(3);

        if (error) throw error;
        setRelatedPosts((data as BlogPost[]) || []);
      } catch (error) {
        console.error('Error fetching related posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedPosts();
  }, [currentPost]);

  if (loading || relatedPosts.length === 0) {
    return null;
  }

  const dateFormat = 'MMM DD, YYYY';

  return (
    <div className="single_widgets widget_thumb_post">
      <h4 className="title">You May Also Like</h4>
      <ul>
        {relatedPosts.map(post => (
          <li key={post.id}>
            {post.featured_image_url && (
              <>
                <span className="left">
                  <Image
                    src={post.featured_image_url}
                    alt={post.title}
                    width={80}
                    height={80}
                    style={{ objectFit: 'cover' }}
                  />
                </span>
                <span className="right">
                  <Link className="feed-title" href={`/blog/${post.slug}`}>
                    {post.title.slice(0, 40)}...
                  </Link>
                  <span className="post-date">
                    <i className="ti-calendar"></i>
                    {moment(post.published_date).format(dateFormat)}
                  </span>
                </span>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};