'use client';

interface BlogPostMetaProps {
  authorName: string;
  publishedDate: string;
  readingTime?: number;
}

export default function BlogPostMeta({ authorName, publishedDate, readingTime }: BlogPostMetaProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="article_top_info mb-4">
      <ul className="article_middle_info">
        <li>
          <i className="fa fa-user-circle text-secondary"></i> {authorName}
        </li>
        <li>
          <i className="fa fa-calendar text-secondary"></i> {formatDate(publishedDate)}
        </li>
        {readingTime && (
          <li>
            <i className="fa fa-clock text-secondary"></i> {readingTime} min
          </li>
        )}
      </ul>
    </div>
  );
}