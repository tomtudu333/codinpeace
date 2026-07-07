import React from 'react';

interface BreadcrumbItem {
  id: string;
  label: string;
  type: 'module' | 'feature' | 'function';
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  onNavigate: (id: string, type: string) => void;
  accentColor?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = React.memo(({
  items, onNavigate, accentColor = 'var(--accent-primary)',
}) => {
  if (items.length === 0) return null;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      padding: '6px 12px',
      fontSize: '11px',
      color: 'var(--text-secondary)',
      fontFamily: 'monospace',
      background: 'rgba(10, 10, 16, 0.7)',
      borderRadius: '6px',
      backdropFilter: 'blur(8px)',
      border: '1px solid var(--border-subtle)',
      userSelect: 'none',
    }}>
      {items.map((item, i) => (
        <React.Fragment key={item.id}>
          {i > 0 && (
            <span style={{ color: 'var(--text-muted)', margin: '0 2px', fontSize: '10px' }}>/</span>
          )}
          <span
            onClick={() => onNavigate(item.id, item.type)}
            style={{
              color: i === items.length - 1 ? accentColor : 'var(--text-secondary)',
              fontWeight: i === items.length - 1 ? 600 : 400,
              cursor: i < items.length - 1 ? 'pointer' : 'default',
              padding: '2px 6px',
              borderRadius: '4px',
              transition: 'background 0.1s ease, color 0.1s ease',
              background: i < items.length - 1 ? 'transparent' : `${accentColor}12`,
            }}
            onMouseEnter={(e) => {
              if (i < items.length - 1) e.currentTarget.style.background = `${accentColor}15`;
            }}
            onMouseLeave={(e) => {
              if (i < items.length - 1) e.currentTarget.style.background = 'transparent';
            }}
          >
            {item.label}
          </span>
        </React.Fragment>
      ))}
    </div>
  );
});

Breadcrumb.displayName = 'Breadcrumb';
