import React, { useState, useEffect } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface ContentBlock {
  type: string;
  content: {
    text: string;
    level: number;
  };
  order: number;
}

interface TableOfContentsProps {
  content: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  useEffect(() => {
    const generateTocData = () => {
      try {
        // Try to parse as structured content first
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed)) {
          const headingBlocks = parsed
            .filter((block: ContentBlock) => block.type === 'heading')
            .map((block: ContentBlock, index: number) => ({
              id: block.content.text.toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-')
                .trim() + '-' + block.order,
              text: block.content.text,
              level: block.content.level,
            }));
          
          setTocItems(headingBlocks);
          return;
        }
      } catch {
        // Fallback to DOM parsing for legacy content
      }
      
      // Fallback for legacy text content
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, 'text/html');
      const headings = Array.from(doc.querySelectorAll('h1, h2, h3, h4, h5, h6'));
      
      const items = headings.map((heading, index) => {
        const text = heading.textContent || '';
        const id = text.toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
          .trim() + '-' + index;
        
        return {
          id,
          text,
          level: parseInt(heading.tagName.slice(1), 10),
        };
      });
      
      setTocItems(items);
    };

    generateTocData();
  }, [content]);

  useEffect(() => {
    const handleScroll = () => {
      const headings = tocItems.map(item => document.getElementById(item.id)).filter(Boolean);
      const scrollPosition = window.scrollY + 100; // Offset for header

      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i];
        if (heading && heading.offsetTop <= scrollPosition) {
          setActiveId(tocItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [tocItems]);

  const handleTocClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for fixed header
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  if (tocItems.length === 0) return null;

  const styles = {
    container: {
      // position: 'sticky' as const,
      // top: '20px',
      maxHeight: 'calc(100vh - 120px)',
      overflowY: 'auto' as const,
      backgroundColor: '#fff',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      padding: '1rem',
      marginBottom: '1.5rem',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease'
    },
    collapsedContainer: {
      // position: 'sticky' as const,
      // top: '60px',
      backgroundColor: '#fff',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      padding: '0.5rem',
      marginBottom: '1.5rem',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
      width: 'fit-content'
    },
    header: {
      fontSize: '1rem',
      fontWeight: '600',
      marginBottom: isExpanded ? '0.75rem' : '0',
      paddingBottom: isExpanded ? '0.5rem' : '0',
      borderBottom: isExpanded ? '1px solid #e2e8f0' : 'none',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
     headerContent: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    toggleButton: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '0.25rem',
      borderRadius: '4px',
      color: '#666',
      fontSize: '0.875rem',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '24px',
      minHeight: '24px'
    } as React.CSSProperties,
    list: {
      listStyle: 'none' as const,
      padding: 0,
      margin: 0,
      display: isExpanded ? 'block' : 'none'
    },
    listItem: {
      marginBottom: '0.25rem'
    },
    button: {
      display: 'block',
      width: '100%',
      textAlign: 'left' as const,
      fontSize: '0.875rem',
      padding: '0.25rem 0.5rem',
      borderRadius: '4px',
      border: 'none',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      textDecoration: 'none',
      color: '#666'
    },
    activeButton: {
      backgroundColor: '#f1f5f9',
      fontWeight: '500',
      color: '#3b82f6'
    },
    hoverButton: {
      backgroundColor: '#f8fafc'
    },
    icon: {
      width: '1rem',
      height: '1rem',
      display: 'inline-block'
    }
  };

  // Simple table of contents icon using CSS
  const TocIcon: React.FC = () => (
    <span style={styles.icon}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="8" y1="6" x2="21" y2="6"></line>
        <line x1="8" y1="12" x2="21" y2="12"></line>
        <line x1="8" y1="18" x2="21" y2="18"></line>
        <line x1="3" y1="6" x2="3.01" y2="6"></line>
        <line x1="3" y1="12" x2="3.01" y2="12"></line>
        <line x1="3" y1="18" x2="3.01" y2="18"></line>
      </svg>
    </span>
  );

  // Chevron icons for expand/collapse
  const ChevronDownIcon: React.FC = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="6,9 12,15 18,9"></polyline>
    </svg>
  );

  const ChevronUpIcon: React.FC = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="18,15 12,9 6,15"></polyline>
    </svg>
  );

  return (
    <div style={isExpanded ? styles.container : styles.collapsedContainer}>
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <TocIcon />
          {isExpanded && 'Table of Contents'}
        </div>
        <button
          onClick={toggleExpanded}
          style={styles.toggleButton}
          onMouseEnter={(e) => {
            const target = e.target as HTMLButtonElement;
            target.style.backgroundColor = '#f8fafc';
          }}
          onMouseLeave={(e) => {
            const target = e.target as HTMLButtonElement;
            target.style.backgroundColor = 'transparent';
          }}
          title={isExpanded ? 'Minimize Table of Contents' : 'Expand Table of Contents'}
        >
          {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </button>
      </div>
      <nav>
        <ul style={styles.list}>
          {tocItems.map((item) => (
            <li key={item.id} style={styles.listItem}>
              <button
                onClick={() => handleTocClick(item.id)}
                style={{
                  ...styles.button,
                  ...(activeId === item.id ? styles.activeButton : {}),
                  paddingLeft: `${(item.level - 1) * 0.75 + 0.5}rem`
                }}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLButtonElement;
                  if (activeId !== item.id) {
                    target.style.backgroundColor = styles.hoverButton.backgroundColor;
                  }
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLButtonElement;
                  if (activeId !== item.id) {
                    target.style.backgroundColor = styles.button.backgroundColor;
                  }
                }}
              >
                {item.text}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default TableOfContents;
