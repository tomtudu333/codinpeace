import React from 'react';

interface InspectorSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const InspectorSection: React.FC<InspectorSectionProps> = ({
  title,
  children,
  className = '',
}) => {
  return (
    <div className={`inspector-section ${className}`}>
      <div
        style={{
          padding: '8px var(--spacing-lg)',
          fontSize: '11px',
          fontWeight: 600,
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          borderBottom: '1px solid var(--border-subtle)',
          lineHeight: 1,
        }}
      >
        {title}
      </div>
      <div style={{ padding: '8px var(--spacing-lg)' }}>
        {children}
      </div>
    </div>
  );
};
