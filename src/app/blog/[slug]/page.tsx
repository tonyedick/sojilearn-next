'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/integrations/supabase/client';
import { BlogPost as BlogPostType } from '@/types/blog';
import Moment from 'moment';
import BlogLayout from '@/components/Layouts/BlogLayout';
import { BlogContentRenderer, TableOfContents } from '@/components/blog';
import { RelatedPosts } from '@/components/blog/RelatedPosts';
import { CommentSection } from '@/components/blog/Comments/CommentSection';
import Meta from '@/components/Meta';
import { useConversionTracking } from '@/hooks/useConversionTracking';
import { usePageTracking } from '@/hooks/usePageTracking';

const dateFormat = 'MMM DD, YYYY';

export default function BlogDetail() {
    const { slug } = useParams();
    const searchParams = useSearchParams();
    const [post, setPost] = useState<BlogPostType | null>(null);
    const [posts, setPosts] = useState<BlogPostType[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<BlogPostType[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilter] = useState('all');
    const [selectedCountry, setSelectedCountry] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 9;

    const { trackConversion } = useConversionTracking();

    // Track page view with post ID or slug
    usePageTracking(post?.id || (slug as string));

    // Fetch all posts for sidebar
    useEffect(() => {
        const fetchPosts = async () => {
            const { data, error } = await supabase
                .from('blog_posts')
                .select('*')
                .eq('is_published', true)
                .order('created_at', { ascending: false });
            
            if (!error && Array.isArray(data)) {
                setPosts(data as BlogPostType[]);
                setFilteredPosts(data as BlogPostType[]);
            }
        };
        fetchPosts();
    }, []);

    // Fetch single post by slug
    useEffect(() => {
        if (slug) {
            fetchPost(slug as string);
        }
    }, [slug]);

    // Filtering logic for sidebar posts
    const filterPosts = useCallback(() => {
        let filtered = [...posts];

        // Filter by category from URL params
        const categoryParam = searchParams.get('category');
        if (categoryParam && categoryParam !== 'all') {
            filtered = filtered.filter((post: BlogPostType) => post.category === categoryParam);
        }

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter((post: BlogPostType) =>
                post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.tags?.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        // Filter by country (now tags)
        if (selectedCountry !== 'all') {
            filtered = filtered.filter((post: BlogPostType) =>
                post.tags?.includes(selectedCountry)
            );
        }

        // Filter by filter type
        if (selectedFilter !== 'all') {
            filtered = filtered.filter((post: BlogPostType) => post.filter_type === selectedFilter);
        }

        setFilteredPosts(filtered);
        setCurrentPage(1);
    }, [posts, searchTerm, selectedCountry, selectedFilter, searchParams]);

    useEffect(() => {
        filterPosts();
    }, [posts, searchTerm, selectedCountry, selectedFilter, searchParams, filterPosts]);

    // Fetch single post
    const fetchPost = async (postSlug: string) => {
        try {
            const { data, error } = await supabase
                .from('blog_posts')
                .select('*')
                .eq('slug', postSlug)
                .eq('is_published', true)
                .single();

            if (error) throw error;
            const postData = data && typeof data === 'object' ? (data as BlogPostType) : null;
            setPost(postData);

            // Update document title and meta description for SEO
            if (postData) {
                document.title = postData.seo_title || postData.title;
                const metaDescription = document.querySelector('meta[name="description"]');
                if (metaDescription) {
                    metaDescription.setAttribute('content', postData.seo_description || postData.excerpt || '');
                }
            }
        } catch (error) {
            console.error('Error fetching post:', error);
        }
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (!post) {
        return (
            <BlogLayout>
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <h2>Loading...</h2>
                </div>
            </BlogLayout>
        );
    }

    return (
        <BlogLayout>
            <>
                <Meta
                    title={post?.title}
                    description={post?.seo_description || post?.excerpt || ''}
                    canonical={`https://www.sojilearn.com/blog/${post?.slug}`}
                    image={post?.featured_image_url || 'https://www.sojilearn.com/logo.png'}
                />
                
                <section className="page-title gray">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12">
                                <div className="breadcrumbs-wrap">
                                    <h1 className="breadcrumb-title">{post?.title}</h1>
                                    <nav className="transparent">
                                        <ol className="breadcrumb p-0">
                                            <li className="breadcrumb-item">
                                                <Link href="/">Home</Link>
                                            </li>
                                            <li className="breadcrumb-item">
                                                <Link href="/blog">Blog</Link>
                                            </li>
                                            <li className="breadcrumb-item active theme-cl" aria-current="page">
                                                Blog Detail
                                            </li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-md-12 col-sm-12 col-12">
                                <div className="article_detail_wrapss single_article_wrap format-standard">
                                    <div className="article_body_wrap">
                                        <h4 className="mb-3 text-dark">{post?.excerpt}</h4>

                                        <div className="article_top_info mb-4">
                                            <ul className="article_middle_info">
                                                <li>
                                                    <i className="fa fa-user-circle text-secondary"></i>{' '}
                                                    {post?.author_name}
                                                </li>
                                                <li>
                                                    <i className="fa fa-calendar text-secondary"></i>{' '}
                                                    {formatDate(post?.published_date)}
                                                </li>
                                                {post?.reading_time_minutes && (
                                                    <li>
                                                        <i className="fa fa-clock text-secondary"></i>{' '}
                                                        {post?.reading_time_minutes} min
                                                    </li>
                                                )}
                                            </ul>
                                        </div>

                                        {/* Social Share Buttons */}
                                        <div className="article_top_info mb-4">
                                            <ul
                                                className="article_middle_info"
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '1rem',
                                                    listStyle: 'none',
                                                    paddingLeft: 0,
                                                    flexWrap: 'wrap',
                                                }}
                                            >
                                                <li style={{ fontWeight: 500 }}>
                                                    <i className="fa fa-share-alt" aria-hidden="true"></i> Share:
                                                </li>
                                                <li>
                                                    <button
                                                        type="button"
                                                        className="btn btn-secondary btn-sm"
                                                        style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', whiteSpace: 'nowrap' }}
                                                        onClick={() => {
                                                            const url = encodeURIComponent(window.location.href);
                                                            const text = encodeURIComponent(post?.title || '');
                                                            window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'noopener,noreferrer');
                                                        }}
                                                    >
                                                        <i className="fab fa-twitter" aria-hidden="true"></i>
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                        type="button"
                                                        className="btn btn-secondary btn-sm"
                                                        style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', whiteSpace: 'nowrap' }}
                                                        onClick={() => {
                                                            const url = encodeURIComponent(window.location.href);
                                                            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'noopener,noreferrer');
                                                        }}
                                                    >
                                                        <i className="fab fa-linkedin-in" aria-hidden="true"></i>
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                        type="button"
                                                        className="btn btn-secondary btn-sm"
                                                        style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', whiteSpace: 'nowrap' }}
                                                        onClick={() => {
                                                            const url = encodeURIComponent(window.location.href);
                                                            window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'noopener,noreferrer');
                                                        }}
                                                    >
                                                        <i className="fab fa-facebook-f" aria-hidden="true"></i>
                                                    </button>
                                                </li>
                                            </ul>
                                            <style>
                                                {`
                                                    @media (max-width: 600px) {
                                                        .article_middle_info {
                                                            gap: 0.5rem !important;
                                                            font-size: 0.95rem;
                                                        }
                                                        .article_middle_info li {
                                                            margin-bottom: 0.25rem;
                                                        }
                                                    }
                                                `}
                                            </style>
                                        </div>

                                        {/* Featured Image */}
                                        <div className="article_featured_image">
                                            {post && post.featured_image_url && (
                                                <Image
                                                    src={post.featured_image_url}
                                                    alt={post.title}
                                                    className="img-fluid"
                                                    width={800}
                                                    height={450}
                                                    style={{ borderRadius: '6px' }}
                                                    priority
                                                />
                                            )}
                                        </div>

                                        {/* Table of Contents */}
                                        <TableOfContents content={post.content} />

                                        {/* Blog Content Renderer */}
                                        <BlogContentRenderer content={post.content} />

                                        {/* Tags */}
                                        {post.tags && post.tags.length > 0 && (
                                            <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
                                                <h5 style={{ marginBottom: '1rem' }}>Tags</h5>
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                                    {post.tags.map(tag => (
                                                        <span
                                                            key={tag}
                                                            style={{
                                                                backgroundColor: '#f1f5f9',
                                                                color: '#475569',
                                                                padding: '0.25rem 0.75rem',
                                                                borderRadius: '1rem',
                                                                fontSize: '0.875rem',
                                                                border: '1px solid #e2e8f0'
                                                            }}
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Comment Section */}
                                <CommentSection blogPostId={post?.id} trackConversion={trackConversion} />
                            </div>

                            {/* Sidebar */}
                            <div className="col-lg-4 col-md-12 col-sm-12 col-12">
                                <RelatedPosts currentPost={post} />
                                <div className="single_widgets widget_thumb_post">
                                    <h4 className="title">All Posts</h4>
                                    <ul>
                                        {posts && posts.length > 0 ? (
                                            posts.slice(0, 5).map(p => (
                                                <li key={p?.id}>
                                                    <span className="left">
                                                        <Image
                                                            src={p?.featured_image_url || '/assets/img/default-blog.jpg'}
                                                            alt={p?.title}
                                                            width={80}
                                                            height={80}
                                                            style={{ objectFit: 'cover' }}
                                                        />
                                                    </span>
                                                    <span className="right">
                                                        <Link className="feed-title" href={`/blog/${p?.slug}`}>
                                                            {p?.title.slice(0, 40)}...
                                                        </Link>
                                                        <span className="post-date">
                                                            <i className="ti-calendar"></i>
                                                            {Moment(p?.created_at).format(dateFormat)}
                                                        </span>
                                                    </span>
                                                </li>
                                            ))
                                        ) : (
                                            <li>No Posts Available</li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        </BlogLayout>
    );
}