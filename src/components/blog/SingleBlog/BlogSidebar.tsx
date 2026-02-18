'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Moment from 'moment';
import { BlogPost } from '@/types/blog';
import { RelatedPosts } from '@/components/blog/RelatedPosts';

interface BlogSidebarProps {
  currentPost: BlogPost;
  allPosts: BlogPost[];
  onSearch: (searchTerm: string) => void;
  onFilterByTag: (tag: string) => void;
}

const dateFormat = 'MMM DD, YYYY';

export default function BlogSidebar({ 
  currentPost, 
  allPosts,
  onSearch,
  onFilterByTag 
}: BlogSidebarProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <>
      <RelatedPosts currentPost={currentPost} />
      
      <div className="single_widgets widget_search mb-4">
        <h4 className="title">Search Posts</h4>
        <input
          type="text"
          className="form-control"
          placeholder="Search blog posts..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="single_widgets widget_thumb_post">
        <h4 className="title">Recent Posts</h4>
        <ul>
          {allPosts.length > 0 ? (
            allPosts.slice(0, 5).map(post => (
              <li key={post.id}>
                <span className="left">
                  <Image
                    src={post.featured_image_url || '/assets/img/default-blog.jpg'}
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
                    {Moment(post.created_at).format(dateFormat)}
                  </span>
                </span>
              </li>
            ))
          ) : (
            <li>No Posts Available</li>
          )}
        </ul>
      </div>
    </>
  );
}