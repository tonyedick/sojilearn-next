export interface Comment {
  id: string;
  blog_post_id: string;
  author_name: string;
  author_email: string;
  content: string;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
  parent_id?: string | null;
  replies?: Comment[];
}

export interface CommentFormData {
  author_name: string;
  author_email: string;
  content: string;
  parent_id?: string;
}
