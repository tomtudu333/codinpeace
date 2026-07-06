import React, { useState } from 'react';
import { Icon } from '../../icons/IconRegistry';

interface InspectorSectionProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  className?: string;
}

export const InspectorSection: React.FC<InspectorSectionProps> = ({
  title,
  children,
  defaultExpanded = true,
  className = '',
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div className={className} style={{ padding: '0 0 4px' }}>
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          width: '100%',
          padding: '10px 12px 6px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'inherit',
          fontSize: '10px',
          fontWeight: 600,
          color: 'var(--text-muted)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}
      >
        <span style={{ transform: expanded ? 'rotate(90deg)' : 'none', transition: 'transform var(--anim-fast)' }}>
          <Icon name="ChevronRight" size={8} />
        </span>
        {title}
      </button>
      {expanded && <div style={{ padding: '0 12px 8px' }}>{children}</div>}
    </div>
  );
};
