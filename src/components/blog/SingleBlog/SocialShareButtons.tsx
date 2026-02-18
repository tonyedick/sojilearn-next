'use client';

import { usePathname } from 'next/navigation';

interface SocialShareButtonsProps {
  title: string;
}

export default function SocialShareButtons({ title }: SocialShareButtonsProps) {
  const pathname = usePathname();
  const url = typeof window !== 'undefined' ? window.location.href : '';

  const shareLinks = {
    twitter: (url: string, text: string) => 
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    linkedin: (url: string) => 
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    facebook: (url: string) => 
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    const shareUrl = platform === 'twitter' 
      ? shareLinks[platform](url, title)
      : shareLinks[platform](url);
    
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  return (
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
            onClick={() => handleShare('twitter')}
            aria-label="Share on Twitter"
          >
            <i className="fab fa-twitter" aria-hidden="true"></i>
          </button>
        </li>
        <li>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', whiteSpace: 'nowrap' }}
            onClick={() => handleShare('linkedin')}
            aria-label="Share on LinkedIn"
          >
            <i className="fab fa-linkedin-in" aria-hidden="true"></i>
          </button>
        </li>
        <li>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', whiteSpace: 'nowrap' }}
            onClick={() => handleShare('facebook')}
            aria-label="Share on Facebook"
          >
            <i className="fab fa-facebook-f" aria-hidden="true"></i>
          </button>
        </li>
      </ul>
      <style jsx>{`
        @media (max-width: 600px) {
          .article_middle_info {
            gap: 0.5rem !important;
            font-size: 0.95rem;
          }
          .article_middle_info li {
            margin-bottom: 0.25rem;
          }
        }
      `}</style>
    </div>
  );
}