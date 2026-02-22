import React, { JSX, useEffect, useRef } from 'react';

// Type definitions for different content blocks
interface HeadingContent {
  level: number;
  text: string;
}

interface ParagraphContent {
  text: string;
}

interface ImageContent {
  url: string;
  alt?: string;
  caption?: string;
}

interface TableContent {
  headers: string[];
  rows: string[][];
}

interface ListContent {
  type: 'ordered' | 'unordered';
  items: string[];
}

interface QuoteContent {
  text: string; 
  author?: string;
}

interface CodeContent {
  code: string;
  language?: string;
}

interface ContentBlock {
  id: string;
  type: 'heading' | 'paragraph' | 'image' | 'table' | 'list' | 'quote' | 'code';
  content: HeadingContent | ParagraphContent | ImageContent | TableContent | ListContent | QuoteContent | CodeContent;
  order: number;
}

interface BlogContentRendererProps {
  content: string;
  className?: string;
}

const BlogContentRenderer: React.FC<BlogContentRendererProps> = ({ content, className = '' }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const parseContent = (content: string): ContentBlock[] => {
    try {
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch {
      // Fallback to text parsing for backward compatibility
      return parseTextContent(content);
    }
    return parseTextContent(content);
  };

  const parseTextContent = (text: string): ContentBlock[] => {
    if (!text) return [];
    
    const paragraphs = text.split('\n\n').filter(p => p.trim());
    
    return paragraphs.map((paragraph, index) => {
      const trimmed = paragraph.trim();
      
      if (trimmed.startsWith('#')) {
        const level = trimmed.match(/^#+/)?.[0].length || 1;
        const text = trimmed.replace(/^#+\s*/, '');
        return {
          id: `block-${index}`,
          type: 'heading' as const,
          content: { level, text },
          order: index
        };
      }
      
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const items = trimmed.split('\n').map(item => {
          if (item.trim().startsWith('- ') || item.trim().startsWith('* ')) {
            return item.trim().substring(2);
          }
          return item;
        }).filter(item => item);
        
        return {
          id: `block-${index}`,
          type: 'list' as const,
          content: { type: 'unordered', items },
          order: index
        };
      }
      
      if (/^\d+\.\s/.test(trimmed)) {
        const items = trimmed.split('\n').map(item => {
          if (/^\d+\.\s/.test(item.trim())) {
            return item.trim().replace(/^\d+\.\s/, '');
          }
          return item;
        }).filter(item => item);
        
        return {
          id: `block-${index}`,
          type: 'list' as const,
          content: { type: 'ordered', items },
          order: index
        };
      }
      
      if (trimmed.startsWith('>')) {
        const text = trimmed.replace(/^>\s*/, '');
        return {
          id: `block-${index}`,
          type: 'quote' as const,
          content: { text },
          order: index
        };
      }
      
      return {
        id: `block-${index}`,
        type: 'paragraph' as const,
        content: { text: trimmed },
        order: index
      };
    });
  };

  const renderBlock = (block: ContentBlock, index: number): JSX.Element => {
    // Helper function to get heading level safely
    const getHeadingLevel = (): number => {
      if (block.type === 'heading' && 'level' in block.content) {
        return (block.content as HeadingContent).level;
      }
      return 1;
    };

    const headingLevel = block.type === 'heading' ? getHeadingLevel() : 1;

    const styles = {
      heading: {
        scrollMarginTop: '80px',
        marginTop: headingLevel === 1 ? '2rem' : headingLevel === 2 ? '2rem' : '1.5rem',
        marginBottom: headingLevel === 1 ? '1rem' : headingLevel === 2 ? '1rem' : '0.75rem',
        fontWeight: 'bold',
        fontSize: headingLevel === 1 ? '1.875rem' : 
                  headingLevel === 2 ? '1.5rem' : 
                  headingLevel === 3 ? '1.25rem' : 
                  headingLevel === 4 ? '1.125rem' : 
                  headingLevel === 5 ? '1rem' : '0.875rem'
      },
      paragraph: {
        marginBottom: '1rem',
        fontSize: '1.125rem',
        lineHeight: '1.7'
      },
      image: {
        maxWidth: '100%',
        height: 'auto',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        margin: '1.5rem 0'
      },
      figure: {
        margin: '1.5rem 0'
      },
      figcaption: {
        fontSize: '0.875rem',
        color: '#666',
        textAlign: 'center' as const,
        marginTop: '0.5rem',
        fontStyle: 'italic'
      },
      table: {
        width: '100%',
        borderCollapse: 'collapse' as const,
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        overflow: 'hidden',
        margin: '1.5rem 0'
      },
      tableHeader: {
        backgroundColor: '#f8fafc',
        padding: '0.75rem 1rem',
        textAlign: 'left' as const,
        fontWeight: '600',
        border: '1px solid #e2e8f0'
      },
      tableCell: {
        padding: '0.75rem 1rem',
        border: '1px solid #e2e8f0'
      },
      list: {
        margin: '1rem 0',
        paddingLeft: '1.5rem',
        listStyleType: 'disc',
      },
      listItem: {
        marginBottom: '0.5rem',
        lineHeight: '1.6'
      },
      quote: {
        borderLeft: '4px solid #3b82f6',
        paddingLeft: '1.5rem',
        margin: '1.5rem 0',
        fontStyle: 'italic',
        color: '#666'
      },
      citeAuthor: {
        display: 'block',
        marginTop: '0.5rem',
        fontSize: '0.875rem',
        fontStyle: 'normal'
      },
      codeContainer: {
        margin: '1.5rem 0'
      },
      codeLanguage: {
        backgroundColor: '#f8fafc',
        padding: '0.25rem 0.75rem',
        fontSize: '0.75rem',
        fontFamily: 'monospace',
        color: '#666',
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
        borderBottom: '1px solid #e2e8f0'
      },
      codeBlock: {
        backgroundColor: '#f8fafc',
        padding: '1rem',
        borderRadius: '8px',
        overflowX: 'auto' as const,
        fontSize: '0.875rem',
        fontFamily: 'monospace'
      }
    };

    switch (block.type) {
      case 'heading': {
        const headingContent = block.content as HeadingContent;
        const HeadingTag = `h${headingContent.level}` as keyof JSX.IntrinsicElements;
        const headingId = headingContent.text.toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
          .trim() + '-' + index;
        
        return React.createElement(HeadingTag, {
          key: block.id,
          id: headingId,
          style: styles.heading
        }, headingContent.text);
      }

      case 'paragraph': {
        const paragraphContent = block.content as ParagraphContent;
        return (
          <p key={block.id} style={styles.paragraph}>
            {paragraphContent.text}
          </p>
        );
      }

      case 'image': {
        const imageContent = block.content as ImageContent;
        return (
          <figure key={block.id} style={styles.figure}>
            <img
              src={imageContent.url}
              alt={imageContent.alt || ''}
              style={styles.image}
              loading="lazy"
            />
            {imageContent.caption && (
              <figcaption style={styles.figcaption}>
                {imageContent.caption}
              </figcaption>
            )}
          </figure>
        );
      }

      case 'table': {
        const tableContent = block.content as TableContent;
        return (
          <div key={block.id} style={{ overflowX: 'auto', margin: '1.5rem 0' }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  {(tableContent.headers || []).map((header: string, headerIndex: number) => (
                    <th key={headerIndex} style={styles.tableHeader}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(tableContent.rows || []).map((row: string[], rowIndex: number) => (
                  <tr key={rowIndex}>
                    {row.map((cell: string, cellIndex: number) => (
                      <td key={cellIndex} style={styles.tableCell}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }

      case 'list': {
        const listContent = block.content as ListContent;
        const isOrdered = listContent.type === 'ordered';
        const ListTag = isOrdered ? 'ol' : 'ul';
        return (
          <ListTag key={block.id} 
            style={{
              ...styles.list,
              listStyleType: isOrdered ? 'decimal' : 'disc'
            }}
          >
            {listContent.items.map((item: string, itemIndex: number) => (
              <li key={itemIndex} style={styles.listItem}>
                {item}
              </li>
            ))}
          </ListTag>
        );
      }

      case 'quote': {
        const quoteContent = block.content as QuoteContent;
        return (
          <blockquote key={block.id} style={styles.quote}>
            <p style={{ margin: 0 }}>{quoteContent.text}</p>
            {quoteContent.author && (
              <cite style={styles.citeAuthor}>
                — {quoteContent.author}
              </cite>
            )}
          </blockquote>
        );
      }

      case 'code': {
        const codeContent = block.content as CodeContent;
        return (
          <div key={block.id} style={styles.codeContainer}>
            {codeContent.language && (
              <div style={styles.codeLanguage}>
                {codeContent.language}
              </div>
            )}
            <pre style={styles.codeBlock}>
              <code>{codeContent.code}</code>
            </pre>
          </div>
        );
      }

      default:
        return <div key={block.id}>Unsupported content type</div>;
    }
  };

  useEffect(() => {
    if (!contentRef.current) return;

    // Enhance any remaining tables, images, etc. that might be in legacy content
    const tables = contentRef.current.querySelectorAll('table:not([data-processed])');
    tables.forEach((table) => {
      const tableElement = table as HTMLTableElement;
      tableElement.setAttribute('data-processed', 'true');
      tableElement.style.width = '100%';
      tableElement.style.borderCollapse = 'collapse';
      tableElement.style.border = '1px solid #e2e8f0';
      tableElement.style.borderRadius = '8px';
      tableElement.style.overflow = 'hidden';
      tableElement.style.margin = '1.5rem 0';
      
      const ths = tableElement.querySelectorAll('th');
      ths.forEach((th) => {
        th.style.border = '1px solid #e2e8f0';
        th.style.backgroundColor = '#f8fafc';
        th.style.padding = '0.75rem 1rem';
        th.style.textAlign = 'left';
        th.style.fontWeight = '600';
      });
      
      const tds = tableElement.querySelectorAll('td');
      tds.forEach((td) => {
        td.style.border = '1px solid #e2e8f0';
        td.style.padding = '0.75rem 1rem';
      });
    });

    const images = contentRef.current.querySelectorAll('img:not([data-processed])');
    images.forEach((img) => {
      const imageElement = img as HTMLImageElement;
      imageElement.setAttribute('data-processed', 'true');
      imageElement.style.maxWidth = '100%';
      imageElement.style.height = 'auto';
      imageElement.style.width = 'auto'; 
      imageElement.style.borderRadius = '8px';
      imageElement.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
      imageElement.style.margin = '1rem 0';
      
      if (imageElement.alt && !imageElement.parentElement?.tagName.toLowerCase().includes('figure')) {
        const figure = document.createElement('figure');
        figure.style.margin = '1.5rem 0';
        imageElement.parentNode?.insertBefore(figure, imageElement);
        figure.appendChild(imageElement);
        
        const figcaption = document.createElement('figcaption');
        figcaption.style.fontSize = '0.875rem';
        figcaption.style.color = '#666';
        figcaption.style.textAlign = 'center';
        figcaption.style.marginTop = '0.5rem';
        figcaption.style.fontStyle = 'italic';
        figcaption.textContent = imageElement.alt;
        figure.appendChild(figcaption);
      }
    });
  }, [content]);

  const blocks = parseContent(content);

  return (
    <div 
      ref={contentRef}
      className={`blog-content-renderer ${className}`}
      style={{ 
        fontSize: '1.125rem',
        lineHeight: '1.7',
        maxWidth: '100%'
      }}
    >
      {blocks.map((block, index) => renderBlock(block, index))}
    </div>
  );
};

export default BlogContentRenderer;
