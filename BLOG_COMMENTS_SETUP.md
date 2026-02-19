# Blog Comments Setup Guide

## Database Setup

You need to create the `blog_comments` table in your Supabase database.

### Option 1: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Click **New Query**
4. Copy the entire contents of `supabase/migrations/create_blog_comments_table.sql`
5. Paste it into the SQL Editor
6. Click **Run** or press `Ctrl/Cmd + Enter`
7. Verify the table was created by going to **Table Editor**

### Option 2: Using Supabase CLI

If you have Supabase CLI installed:

```bash
# Make sure you're in the project directory
cd /path/to/sojilearn-next

# Run the migration
supabase db push

# Or manually run the SQL file
supabase db execute -f supabase/migrations/create_blog_comments_table.sql
```

## Table Structure

The `blog_comments` table includes:

- **id**: UUID primary key
- **blog_post_id**: Reference to blog_posts table
- **author_name**: Commenter's name (2-255 characters)
- **author_email**: Commenter's email (validated format)
- **content**: Comment text (1-5000 characters)
- **is_approved**: Moderation flag (default: false)
- **parent_id**: For threaded replies (optional)
- **created_at**: Timestamp
- **updated_at**: Auto-updated timestamp

## Security Features

✅ **Row Level Security (RLS)** enabled  
✅ **Public can read** only approved comments  
✅ **Anyone can insert** comments (unapproved by default)  
✅ **Service role** has full access for moderation  
✅ **Input validation** via database constraints  
✅ **XSS protection** via server-side sanitization  
✅ **Rate limiting** - 1 comment per email per minute  

## Features

- 📝 Threaded comments (replies to comments)
- ✅ Comment moderation (all comments require approval)
- 🔒 Spam protection (rate limiting)
- 📧 Email validation
- 🛡️ XSS prevention
- 📊 Indexes for performance

## Moderation

All comments are **unapproved by default**. To approve comments:

### Via Supabase Dashboard:
1. Go to **Table Editor**
2. Select **blog_comments** table
3. Find the comment you want to approve
4. Set `is_approved` to `true`

### Via SQL:
```sql
UPDATE blog_comments 
SET is_approved = true 
WHERE id = 'comment-uuid-here';
```

### Bulk Approve by Email (trusted users):
```sql
UPDATE blog_comments 
SET is_approved = true 
WHERE author_email = 'trusted@email.com';
```

## Usage in Components

The comment system is already integrated into your blog:

- **CommentSection.tsx** - Main comment display and form
- **CommentForm.tsx** - Comment submission form
- **CommentItem.tsx** - Individual comment display with replies

Comments use **Server Actions** for security:
- `submitComment()` - Server-side validation and sanitization
- `getApprovedComments()` - Fetch approved comments
- `getCommentCount()` - Get comment count for a post

## Testing

After setup, test the comment system:

1. Visit any blog post: `/blog/[slug]`
2. Scroll to the comments section
3. Submit a test comment
4. Verify it shows "awaiting moderation" message
5. Approve it in Supabase dashboard
6. Refresh the page - comment should now be visible

## Troubleshooting

### Error: "relation public.blog_comments does not exist"
- Run the SQL migration file in Supabase SQL Editor

### Comments not showing
- Check if comments are approved: `SELECT * FROM blog_comments WHERE is_approved = true;`
- Verify RLS policies are enabled

### Can't submit comments
- Check browser console for errors
- Verify email format is valid
- Check if rate-limited (wait 1 minute between comments)

## Future Enhancements

Consider adding:
- 📧 Email notifications for new comments
- 👤 User authentication for comment authors
- 💬 Rich text editor for comments
- 👍 Like/upvote system
- 🚩 Report/flag inappropriate comments
- 📱 Admin dashboard for moderation
