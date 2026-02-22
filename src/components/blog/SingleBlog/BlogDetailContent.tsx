'use client';

import { useState, useCallback } from 'react';
import { BlogPost as BlogPostType } from '@/lib/types/blog';
import BlogArticle from './BlogArticle';
import BlogSidebar from './BlogSidebar';
import { usePageTracking } from '@/utils/websiteAnalytics';

interface BlogDetailContentProps {
  post: BlogPostType;
  allPosts: BlogPostType[];
}

export default function BlogDetailContent({ post, allPosts }: BlogDetailContentProps) {
  const [filteredPosts, setFilteredPosts] = useState<BlogPostType[]>(allPosts);
  usePageTracking(post?.id || null);

  const handleSearch = useCallback((searchTerm: string) => {
    if (!searchTerm) {
      setFilteredPosts(allPosts);
      return;
    }

    const filtered = allPosts.filter((p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.tags?.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredPosts(filtered);
  }, [allPosts]);

  const handleFilterByTag = useCallback((tag: string) => {
    if (tag === 'all') {
      setFilteredPosts(allPosts);
      return;
    }

    const filtered = allPosts.filter((p) => p.tags?.includes(tag));
    setFilteredPosts(filtered);
  }, [allPosts]);

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-12 col-sm-12 col-12">
            <BlogArticle post={post} />
          </div>

          <div className="col-lg-4 col-md-12 col-sm-12 col-12">
            <BlogSidebar 
              currentPost={post}
              allPosts={filteredPosts}
              onSearch={handleSearch}
              onFilterByTag={handleFilterByTag}
            />
          </div>
        </div>
      </div>
    </section>
  );
}