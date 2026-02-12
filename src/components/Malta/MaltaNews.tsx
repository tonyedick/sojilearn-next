
import { supabase } from '../../integrations/supabase/client';
import { BlogPost } from '../../types/blog';
import Link from 'next/link';

async function getMaltaPosts() {
     const { data, error } = await supabase
        .from('blog_posts' as unknown as string)
        .select('*')
        .eq('is_published', true)
        .contains('tags', ['Malta']) 
        .order('published_date', { ascending: false })
        .limit(3);

        if (error) return [];
        return (data  as BlogPost[]) || [];
}

export const revalidate = 3600;

export default async function MaltaNews() {
    const maltaPosts = await getMaltaPosts();

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
        });
    };

     if (maltaPosts.length === 0) {
        return (
            <section className="min gray" style={{backgroundColor: '#DFFFFF'}}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-7 col-md-8">
                            <div className="sec-heading center">
                                <h2>Latest <span className="theme-cl">Malta</span> News</h2>
                                <h4>No Posts at this time</h4>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        {[1, 2, 3].map(i => (
                            <div className="col-lg-4 col-md-6" key={i}>
                                <div className="blg_grid_box" style={{ opacity: 0.7 }}>
                                    <div className="blg_grid_thumb" style={{ background: "#e0e0e0", height: 180, borderRadius: 8 }} />
                                    <div className="blg_grid_caption">
                                        <div className="row">
                                            <div className="col-6">
                                                <div style={{ background: "#e0e0e0", height: 20, width: 80, borderRadius: 4, marginBottom: 8 }} />
                                            </div>
                                            <div className="col-6" style={{ textAlign: 'end' }}>
                                                <div style={{ background: "#e0e0e0", height: 20, width: 60, borderRadius: 4, marginBottom: 8, float: 'right' }} />
                                            </div>
                                        </div>
                                        <div className="blg_title">
                                            <div style={{ background: "#e0e0e0", height: 24, width: "80%", borderRadius: 4, marginBottom: 12 }} />
                                        </div>
                                        <div className="blg_desc">
                                            <div style={{ background: "#e0e0e0", height: 16, width: "100%", borderRadius: 4, marginBottom: 6 }} />
                                            <div style={{ background: "#e0e0e0", height: 16, width: "70%", borderRadius: 4 }} />
                                        </div>
                                        <div className="blg_more">
                                            <div style={{ background: "#e0e0e0", height: 20, width: 90, borderRadius: 4, marginTop: 10 }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        )
    }

    return (
        <div>
            <section style={{backgroundColor: '#DFFFFF'}}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-7 col-md-8">
                            <div className="sec-heading center">
                                <h2>Latest <span className="theme-cl">Malta</span> News</h2>
                            </div>
                        </div>
                    </div>

                    <div className="row justify-content-center">
                        {maltaPosts.map(post => (
                            <div className="col-lg-4 col-md-6" key={post.id}>
                                <div className="blg_grid_box">
                                    {post.featured_image_url && (
                                        <div className="blg_grid_thumb">
                                            <Link href={`/blog/${post.slug}`}>
                                                <img    
                                                    src={post.featured_image_url}
                                                    alt={post.title} 
                                                    className="img-fluid"
                                                    style={{height: "220px", width: "100%", objectFit: "cover"}}
                                                    loading="lazy"
                                                    height={240}
                                                    width={100}
                                                />
                                            </Link>
                                        </div>
                                    )}
                                    <div className="blg_grid_caption"
                                        style={{height: "220px", width: "100%"}}
                                    >
                                        <div className="row">
                                            <div className="col-8">
                                                <div className="blg_tag dark"><span>{post.category}</span> </div>
                                            </div>
                                            <div className="col-4" style={{ fontWeight: 'light', fontSize: '12px' ,textAlign: 'end' }}>
                                                {formatDate(post.published_date)}
                                            </div>
                                        </div>
                                        <div className="blg_title">
                                            <h4> {post.title}</h4>
                                        </div>
                                        <div className="blg_desc">
                                            <p>{post?.excerpt.substring(0, 100)}...</p>
                                        </div>
                                        <div className="blg_more">
                                            <Link href={`/blog/${post.slug}`} target="_blank">Read More</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
