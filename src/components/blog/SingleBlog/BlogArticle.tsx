'use client';

import Image from 'next/image';
import { BlogPost } from '@/types/blog';
import { BlogContentRenderer, TableOfContents } from '@/components/blog';
import { CommentSection } from '@/components/blog/Comments/CommentSection';
import BlogPostMeta from './BlogPostMeta';
import SocialShareButtons from './SocialShareButtons';
import BlogTags from './BlogTags';

interface BlogArticleProps {
  post: BlogPost;
}

export default function BlogArticle({ post }: BlogArticleProps) {
  return (
    <div className="article_detail_wrapss single_article_wrap format-standard">
      <div className="article_body_wrap">
        <h4 className="mb-3 text-dark">{post.excerpt}</h4>

        <BlogPostMeta 
          authorName={post.author_name}
          publishedDate={post.published_date}
          readingTime={post.reading_time_minutes}
        />

        <SocialShareButtons title={post.title} />

        {post.featured_image_url && (
          <div className="article_featured_image">
            <Image
              src={post.featured_image_url}
              alt={post.title}
              className="img-fluid"
              width={800}
              height={450}
              style={{ borderRadius: '6px' }}
              priority
            />
          </div>
        )}

        <TableOfContents content={post.content} />
        <BlogContentRenderer content={post.content} />
        <BlogTags tags={post.tags} />
      </div>

      <CommentSection blogPostId={post.id} />
    </div>
  );
}