'use client';

import React, { useState } from 'react';
import { Comment, CommentFormData } from '@/lib/types/comment';
import { CommentForm } from './CommentForm';

interface CommentItemProps {
  comment: Comment;
  onReply: (data: CommentFormData) => Promise<boolean>;
  isReply?: boolean;
}

export const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  onReply,
  isReply = false
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // const getInitials = (name: string) => {
  //   return name
  //     .split(' ')
  //     .map(n => n[0])
  //     .join('')
  //     .toUpperCase()
  //     .slice(0, 2);
  // };

  const handleReplySubmit = async (data: CommentFormData) => {
    const success = await onReply({ ...data, parent_id: comment.id });
    if (success) {
      setShowReplyForm(false);
    }
    return success;
  };

  return (
    <div className={`comment-item ${isReply ? 'comment-reply' : ''}`} style={{ marginLeft: isReply ? '40px' : '0', paddingBottom: '1.5rem', borderBottom: isReply ? 'none' : '1px solid #e7ecf5' }}>
      <div className="article_posts_thumb">
        <div className="row gray">
          <div className="col-4">
            <div className="d-flex align-items-start mb-3">
              {/* <div 
                className="theme-bg text-white rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: '50px',
                  height: '50px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  marginRight: 12,
                  flexShrink: 0
                }}
              >
                {getInitials(comment.author_name)}
              </div> */}
              <div className="d-flex flex-column">
                <span className="font-weight-bold" style={{ fontSize: '1.1rem', color: '#334e6f' }}>
                  {comment.author_name}
                </span>
                <span className="text-muted" style={{ fontSize: '0.875rem' }}>
                  <i className="ti-calendar" style={{ marginRight: 4 }}></i>
                  {formatDate(comment.created_at)}
                </span>
              </div>
            </div>
          </div>
          <div className="col-8">
            <div className="comment-content mb-3" style={{ paddingLeft: '62px' }}>
              <p style={{ color: '#5a6c7d', lineHeight: '1.7', marginBottom: '1rem', fontWeight: 'semibold' }}>
                {comment.content}
              </p>
              {!isReply && (
                <button
                  onClick={e => {
                    e.preventDefault();
                    setShowReplyForm(!showReplyForm);
                  }}
                  className="btn-apply btn btn-sm theme-bg"
                  style={{ fontSize: '0.875rem' }}
                >
                  <i className="ti-back-right" style={{ marginRight: 4 }}></i>
                  {showReplyForm ? 'Cancel' : 'Reply'}
                </button>
              )}
            </div>
          </div>
        </div>

        {showReplyForm && !isReply && (
          <div className="reply-form mt-3 p-3 bg-light rounded" style={{ marginLeft: '62px' }}>
            <CommentForm
              onSubmit={handleReplySubmit}
              parentId={comment.id}
              onCancel={() => setShowReplyForm(false)}
              compact
            />
          </div>
        )}

        {comment.replies && comment.replies.length > 0 && (
          <div className="comment-replies mt-3">
            {comment.replies.map((reply) => (
              <CommentItem
                key={reply.id}
                comment={reply}
                onReply={onReply}
                isReply
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};