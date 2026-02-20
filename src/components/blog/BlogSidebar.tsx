'use client';

import { BlogPost } from '@/lib/types/blog';
import Link from 'next/link';
import Image from 'next/image';
import Moment from 'moment';
import { useAnalytics } from '@/hooks/useAnalytics';

interface BlogSidebarProps {
  posts: BlogPost[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
  countries: string[];
  filters: string[];
}

const dateFormat = 'MMM DD, YYYY';

export default function BlogSidebar({
  posts,
  searchTerm,
  setSearchTerm,
  selectedCountry,
  setSelectedCountry,
  countries,
}: BlogSidebarProps) {
  const { trackSearch, trackButtonClick, trackLinkClick } = useAnalytics();
  const recentPosts = posts.slice(0, 5);

  // Handle search with analytics tracking
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    if (value.length >= 3) {
      // Track search once user has typed at least 3 characters
      const resultsCount = posts.filter(post => 
        post.title.toLowerCase().includes(value.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(value.toLowerCase())
      ).length;
      trackSearch(value, resultsCount);
    }
  };

  // Handle country filter with analytics tracking
  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    trackButtonClick(
      `filter_${country}`,
      'blog_filters',
      `Blog filtered by ${country}`
    );
  };

  // Handle recent post click with analytics tracking
  const handleRecentPostClick = (post: BlogPost) => {
    trackLinkClick(
      `/blog/${post.slug}`,
      post.title,
      false
    );
  };

  return (
    <>
      <div className="single_widgets widget_search">
        <h4 className="title">Search</h4>
        <form
          className="sidebar-search-form"
          onSubmit={e => e.preventDefault()}
        >
          <input 
            type="search" 
            name="search" 
            placeholder="Search blog posts..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
          <button type="submit"><i className="ti-search"></i></button>
        </form>
      </div>

      <div className="single_widgets widget_category">
        <h4 className="title">Locations</h4>  
        <ul>
          <li>
            <button
              className="category-btn"
              onClick={() => handleCountryChange('all')}
              style={{ 
                background: 'none', 
                border: 'none', 
                padding: 0, 
                cursor: 'pointer',
                color: selectedCountry === 'all' ? '#4a90e2' : undefined,
                fontWeight: selectedCountry === 'all' ? 'bold' : 'normal'
              }}
            >
              All Countries
            </button>
          </li>
          {countries.map(country => (
            <li key={country}>
              <button
                className={`category-btn ${selectedCountry === country ? 'active' : ''}`}
                onClick={() => handleCountryChange(country)}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  padding: 0, 
                  cursor: 'pointer', 
                  color: selectedCountry === country ? '#4a90e2' : undefined,
                  fontWeight: selectedCountry === country ? 'bold' : 'normal'
                }}
              >
                {country}
              </button>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="single_widgets widget_thumb_post">
        <h4 className="title">Recent Posts</h4>
        <ul>
          {recentPosts.length > 0 ? (
            recentPosts.map((item) => (
              <li key={item.id}>
                <span className="left">
                  {item.featured_image_url && (
                    <Image 
                      src={item.featured_image_url} 
                      alt={item.title} 
                      width={80}
                      height={60}
                      style={{objectFit: 'cover'}}
                    />
                  )}
                </span>
                <span className="right">
                  <Link 
                    className="feed-title" 
                    href={`/blog/${item.slug}`}
                    onClick={() => handleRecentPostClick(item)}
                  >
                    {item.title.slice(0, 40)}...
                  </Link> 
                  <span className="post-date">
                    <i className="ti-calendar"></i>
                    {Moment(item.created_at).format(dateFormat)}
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