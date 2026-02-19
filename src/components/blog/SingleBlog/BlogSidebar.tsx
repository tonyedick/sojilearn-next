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

/**
 * BlogSidebar component that displays a sidebar with related posts, search functionality, and recent posts.
 * 
 * @component
 * @param {BlogSidebarProps} props - The component props
 * @param {Post} props.currentPost - The currently displayed blog post
 * @param {Post[]} props.allPosts - Array of all available blog posts
 * @param {(searchTerm: string) => void} props.onSearch - Callback function triggered when user searches for posts
 * @param {(tag: string) => void} props.onFilterByTag - Callback function triggered when user filters posts by tag
 * 
 * @returns {JSX.Element} A sidebar containing:
 *   - RelatedPosts component showing posts related to the current post
 *   - Search input field for filtering blog posts by search term
 *   - Widget displaying the 5 most recent posts with thumbnail images, titles, and publication dates
 * 
 * @example
 * <BlogSidebar 
 *   currentPost={post} 
 *   allPosts={allBlogPosts}
 *   onSearch={handleSearch}
 *   onFilterByTag={handleFilterByTag}
 * />
 */
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
        <h4 className="title">All Posts</h4>
        <ul>
          {allPosts.length > 0 ? (
            allPosts.map(post => (
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
                    {Moment(post.published_date).format(dateFormat)}
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