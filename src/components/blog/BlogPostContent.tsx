/**
 * Blog Content Component
 * 
 * Presentational component that renders a list of blog posts.
 * Receives data via props from the parent Server Component.
 * Does NOT fetch data itself.
 * 
 * If you need client-side interactivity (filtering, search, pagination),
 * add 'use client' and use useState/useEffect for UI state only.
 * 
 * @component
 */

'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '../integrations/supabase/client';
import Moment from "moment";
import { dateFormat } from "../utils/types";
import { BlogPost } from '../types/blog';
import { Link, useParams } from 'next/image';
import Image from 'next/image';

export default function BlogPostContent() {
    usePageTracking('blog_list');
    const { trackSearch } = useSearchTracking();
    const { trackConversion } = useConversionTracking();
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [selectedCountry, setSelectedCountry] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchParams] = useSearchParams();
    const postsPerPage = 9;

    const countries = ['Canada', 'UK', 'USA', 'France', 'Germany', 'Ireland', 'Malta', 'Japan', 'USA'];
    const filters = ['Undergraduate', 'Postgraduate', 'Visa', 'SOPs', 'Scholarships', 'Work'];

    useEffect(() => {
        fetchPosts();
    }, []);

    useEffect(() => {
        filterPosts();
    }, [posts, searchTerm, selectedCountry, selectedFilter, searchParams]);

    const fetchPosts = async () => {
        try {
        const { data, error } = await supabase
            .from('blog_posts' as unknown)
            .select('*')
            .eq('is_published', true)
            .order('published_date', { ascending: false });

        if (error) throw error;
        setPosts((data as unknown[]) || []);
        } catch (error) {
        console.error('Error fetching posts:', error);
        } finally {
        setLoading(false);
        }
    };

    const filterPosts = () => {
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

        // Filter by country (now tags)
        if (selectedCountry !== 'all') {
        filtered = filtered.filter(post => 
            post.tags?.includes(selectedCountry)
        );
        }

        // Filter by filter type
        if (selectedFilter !== 'all') {
        filtered = filtered.filter(post => post.filter_type === selectedFilter);
        }
        trackSearch(searchTerm, filtered.length);
        setFilteredPosts(filtered);
        setCurrentPage(1);
    };

    const paginatedPosts = filteredPosts.slice(
        (currentPage - 1) * postsPerPage,
        currentPage * postsPerPage
    );

    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsLoading(true);
        try {
        const { error } = await supabase
            .from('newsletter_subscribers')
            .insert([
            {
                email: email.toLowerCase().trim(),
                source: 'blog_signup'
            }
            ]);

        if (error) {
            // Check if it's a duplicate email error
            if (error.code === '23505') {
            alert("This email is already subscribed to our newsletter.");
            } else {
            throw error;
            }
        } else {
            alert("Successful! Thank you for subscribing to our newsletter.");
            await trackConversion('newsletter_signup', null, email);
            setEmail('');
        }
        } catch (error) {
        console.error('Newsletter subscription error:', error);
        alert("Subscription failed, Please try again later.");
        } finally {
        setIsLoading(false);
        }
    };

  return (
            <>
                <section className="page-title" style={{background: "url(assets/img/banner-3.jpg)no-repeat"}} data-overlay="8">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12">
                                <div className="breadcrumbs-wrap">
                                    <h1 className="breadcrumb-title text-light">Hot Topics</h1>
                                    <nav className="transparent">
                                        <ol className="breadcrumb p-0">
                                            <li className="breadcrumb-item"><Link href="/" className="text-light">Home</Link></li>
                                            <li className="breadcrumb-item theme-cl" aria-current="page">Blog</li>
                                        </ol>
                                    </nav>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
                <section className="min">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-8 col-md-12 col-sm-12 col-12">
                                <div className="row">
                                    {paginatedPosts.length > 0 ? (
                                    paginatedPosts.map(post => (
                                    <div  key={post.id} className="col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div className="blg_grid_box">
                                            <div className="blg_grid_thumb">
                                                {post.featured_image_url && (
                                                    <Link to={`/blog/${post.slug}`}>
                                                        <img 
                                                            src={post.featured_image_url}
                                                            alt={post.title}
                                                            className="img-fluid"
                                                            loading="lazy"
                                                            style={{height: "220px", width: "100%", objectFit: "cover"}}
                                                            />
                                                    </Link>
                                                )}
                                            </div>
                                            <div className="blg_grid_caption"
                                                style={{height: "220px", width: "100%"}}    
                                            >
                                                <div className="blg_tag"><span>{post.category}</span></div>{" "}
                                                    {post.filter_type && (
                                                        <div className="blg_tag">{post.filter_type}</div>
                                                    )}
                                                <div className="blg_title"><h4><Link to={`/blog/${post.slug}`}>{post.title}</Link></h4></div>
                                                <div className="blg_desc"><p>{post.excerpt}</p></div>
                                            </div>
                                            <div className="crs_grid_foot">
                                                <div className="crs_flex">
                                                    <div className="crs_fl_first">
                                                        <div className="crs_tutor">
                                                            <div className="crs_tutor_thumb">
                                                                <Link to={`/blog/${post.slug}`}>
                                                                    <img 
                                                                        className="img-fluid circle" 
                                                                        src={post.author_avatar_url}
                                                                        alt={post.author_name}
                                                                        loading="lazy"
                                                                    />
                                                                </Link></div>
                                                        </div>
                                                    </div>
                                                    <div className="crs_fl_last">
                                                        <div className="foot_list_info">
                                                            <ul>
                                                                {post.reading_time_minutes && (
                                                                    <li><div className="elsio_ic"><i className="fa fa-clock text-success"></i></div><div className="elsio_tx">{post.reading_time_minutes} min</div></li>
                                                                )}
                                                                    <li><div className="elsio_ic"><i className="fa fa-calendar text-warning"></i></div><div className="elsio_tx">{formatDate(post.published_date)}</div></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                        ))
                                        ) : (
                                        <div className="col-12 text-center py-8">Loading...</div>
                                    )}
                                </div>
                            </div>

                            {/* Beginning */}
                           

                            {/* End */}

                            <div className="col-lg-4 col-md-12 col-sm-12 col-12">
                        
                                <div className="single_widgets widget_search">
                                    <h4 className="title">Search</h4>
                                    <form
                                        className="sidebar-search-form"
                                        onSubmit={e => {
                                            e.preventDefault();
                                            // Optionally trigger search/filter logic here if needed
                                        }}
                                    >
                                        <input 
                                            type="search" 
                                            name="search" 
                                            placeholder="Search blog posts..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
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
                                                onClick={() => setSelectedCountry('all')}
                                                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer'}}
                                            >
                                                All Countries
                                            </button>
                                        </li>
                                        {countries.map(country => (
                                            <li key={country}>
                                                <button
                                                    className={`category-btn ${selectedCountry === country ? 'active' : ''}`}
                                                    onClick={() => setSelectedCountry(country)}
                                                    style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: selectedCountry === country ? '#4a90e2' : undefined }}
                                                >
                                                    {country}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                
                                <div className="single_widgets widget_thumb_post">
                                    <h4 className="title">All Posts</h4>
                                    <ul>
                                    {posts && posts.length > 0 ? (
                                    posts.map((item: any) => (
                                        <li key={item?.id}>
                                            <span className="left">
                                                <Image src={item?.featured_image_url} alt="blog content featured" className="" />
                                            </span>
                                            <span className="right">
                                                <Link className="feed-title" to={`/blog/${item?.slug}`} target="_blank">{item?.title.slice(0, 24)}...</Link> 
                                                <span className="post-date"><i className="ti-calendar"></i>
                                                    {Moment(item?.created_at).format(dateFormat)}
                                                </span>
                                            </span>
                                        </li>
                                    ))
                                    ) : (
                                        <li>No Posts Available</li>
                                    )}
                                    </ul>
                                </div>
                        
                                {/* <div className="single_widgets widget_tags">
                                    <h4 className="title">Advertise Here</h4>
                                    <ul>
                                        <img className="img-fluid" src={post1} alt="" />
                                    </ul>
                                </div> */}
                        
                            </div>

                        </div>

                    </div>
                </section>
                <div className="clearfix"></div>

                <section id="newsletter" className="theme-bg call_action_wrap-wrap">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="call_action_wrap text-center p-4" style={{ background: "#fff", borderRadius: "16px", boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}>
                                {/* Icon in round shaded circle */}
                                <div className="col-12 mb-3">
                                        <i className="fas fa-envelope fa-2x text-primary"></i>
                                </div>
                                <div className="col-12 text-dark">
                                    <h3 className="mb-2 text-dark">Join Our Newsletter</h3>
                                    <p className="mb-4 h6">Get the latest study abroad tips, scholarship opportunities, and visa updates delivered to your inbox.</p>
                                </div>
                                <div className="col-12">
                                    <form onSubmit={handleSubmit} className="d-flex justify-content-center" style={{ gap: "8px" }}>
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                        <button className="btn theme-bg text-white btn-md" type="submit" disabled={isLoading}> {isLoading ? 'Subscribing...' : 'Subscribe'}</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
  )
}