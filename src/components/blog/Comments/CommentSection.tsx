'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Comment, CommentFormData } from '@/types/comment';
import { CommentForm } from './CommentForm';
import { CommentItem } from './CommentItem';

interface CommentSectionProps {
  blogPostId: string;
}

export function CommentSection({ blogPostId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchComments = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('blog_comments')
        .select('*')
        .eq('blog_post_id', blogPostId)
        .eq('is_approved', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Organize comments with replies
      const commentMap = new Map<string, Comment>();
      const rootComments: Comment[] = [];

      // First pass: create all comment objects
      data?.forEach(comment => {
        commentMap.set(comment.id, { ...comment, replies: [] });
      });

      // Second pass: organize into tree structure
      data?.forEach(comment => {
        const commentObj = commentMap.get(comment.id)!;
        if (comment.parent_id) {
          const parent = commentMap.get(comment.parent_id);
          if (parent) {
            parent.replies = parent.replies || [];
            parent.replies.push(commentObj);
          }
        } else {
          rootComments.push(commentObj);
        }
      });

      setComments(rootComments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [blogPostId]);

  const handleCommentSubmit = async (data: CommentFormData): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('blog_comments')
        .insert({
          blog_post_id: blogPostId,
          author_name: data.author_name,
          author_email: data.author_email,
          content: data.content,
          parent_id: data.parent_id || null,
          is_approved: false,
        });

      if (error) throw error;

      await fetchComments();
      return true;
    } catch (error) {
      console.error('Error submitting comment:', error);
      return false;
    }
  };

  return (
    <div className="article_detail_wrapss single_article_wrap format-standard">
      <div className="comment-area">
        <div className="comment-section-title mb-4">
          <h3 className="mb-3">
            {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
          </h3>
        </div>

        {/* New Comment Form */}
        <div className="add-comment-section mb-5">
          <CommentForm 
            onSubmit={handleCommentSubmit}
          />
        </div>

        {/* Comments List */}
        {isLoading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading comments...</span>
            </div>
          </div>
        ) : comments.length > 0 ? (
          <div className="comments-list">
            {comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                onReply={handleCommentSubmit}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-5">
            <p className="text-muted">No comments yet. Be the first to comment!</p>
          </div>
        )}
      </div>
    </div>
  );
}