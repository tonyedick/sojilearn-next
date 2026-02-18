'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Comment, CommentFormData } from '@/types/comment';
import { CommentForm } from './CommentForm';
import avatar from '@/assets/img/architecture.png';

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

  const handleReplySubmit = async (data: CommentFormData) => {
    const success = await onReply({ ...data, parent_id: comment.id });
    if (success) {
      setShowReplyForm(false);
    }
    return success;
  };

  return (
    <div className={`${isReply ? 'article_detail_wrapss single_article_wrap format-standard' : ''}`}>
      <div className="article_posts_thumb">
        <div className="row">
          <div className="col-12">
            <div className="d-flex align-items-start mb-2">
              <Image
                src={avatar}
                alt="avatar"
                width={40}
                height={40}
                style={{
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginRight: 12,
                }}
              />
              <div className="d-flex flex-column">
                <span className="font-medium">
                  {comment.author_name}
                </span>
                <span className="text-muted">
                  <i className="fa fa-calendar text-primary" style={{ marginRight: 4 }}></i>
                  {formatDate(comment.created_at)}
                </span>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="form-group">
              <input
                type="text"
                value={comment.content}
                className="form-control"
                readOnly
                disabled
              />
            </div>
            <div className="d-flex align-items-start mb-2">
              {!isReply && (
                <a
                  href="#"
                  onClick={e => {
                    e.preventDefault();
                    setShowReplyForm(!showReplyForm);
                  }}
                  style={{ color: '#007bff', textDecoration: 'none', fontSize: 14, display: 'inline-flex', alignItems: 'center' }}
                >
                  Reply
                </a>
              )}
            </div>
          </div>
        </div>

        {showReplyForm && !isReply && (
          <div className="mt-4">
            <CommentForm
              onSubmit={handleReplySubmit}
              parentId={comment.id}
              onCancel={() => setShowReplyForm(false)}
              compact
            />
          </div>
        )}

        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-4">
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

        <hr />
      </div>
    </div>
  );
};