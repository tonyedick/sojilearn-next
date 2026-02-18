'use client';

import { useState, useMemo, useEffect } from 'react';
import { BlogPost } from '@/integrations/types/blog';
import BlogGrid from './BlogGrid';
import BlogSidebar from './BlogSidebar';
import NewsletterSection from './NewsletterSection';
import { useSearchParams } from 'next/navigation';

interface BlogPageContentProps {
  initialPosts: BlogPost[];
}

export default function BlogPageContent({ initialPosts }: BlogPageContentProps) {
  const [posts] = useState<BlogPost[]>(initialPosts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();
  const postsPerPage = 9;

  const countries = ['Canada', 'UK', 'USA', 'France', 'Germany', 'Ireland', 'Malta', 'Japan'];
  const filters = ['Undergraduate', 'Postgraduate', 'Visa', 'SOPs', 'Scholarships', 'Work'];

  const filteredPosts = useMemo(() => {
    let filtered = posts;

    // Filter by category from URL params
    const categoryParam = searchParams.get('category');
    if (categoryParam && categoryParam !== 'all') {
      filtered = filtered.filter(post => post.category === categoryParam);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by country (tags)
    if (selectedCountry !== 'all') {
      filtered = filtered.filter(post =>
        post.tags?.includes(selectedCountry)
      );
    }

    // Filter by filter type
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(post => post.filter_type === selectedFilter);
    }

    return filtered;
  }, [posts, searchTerm, selectedCountry, selectedFilter, searchParams]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredPosts]);

  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <>
      <section className="min">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-12 col-sm-12 col-12">
              <BlogGrid posts={paginatedPosts} />

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <nav aria-label="Page navigation">
                      <ul className="pagination justify-content-center">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                          <button
                            className="page-link"
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                          >
                            Previous
                          </button>
                        </li>
                        {[...Array(totalPages)].map((_, index) => (
                          <li
                            key={index + 1}
                            className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                          >
                            <button
                              className="page-link"
                              onClick={() => setCurrentPage(index + 1)}
                            >
                              {index + 1}
                            </button>
                          </li>
                        ))}
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                          <button
                            className="page-link"
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                          >
                            Next
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              )}
            </div>

            <div className="col-lg-4 col-md-12 col-sm-12 col-12">
              <BlogSidebar
                posts={posts}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
                countries={countries}
                filters={filters}
              />
            </div>
          </div>
        </div>
      </section>

      <NewsletterSection />
    </>
  );
}