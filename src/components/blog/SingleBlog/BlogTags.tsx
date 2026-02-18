'use client';

interface BlogTagsProps {
  tags?: string[];
}

export default function BlogTags({ tags }: BlogTagsProps) {
  if (!tags || tags.length === 0) return null;

  return (
    <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
      <h5 style={{ marginBottom: '1rem' }}>Tags</h5>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {tags.map(tag => (
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
  );
}