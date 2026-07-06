import React, { useState } from 'react';
import { Icon } from '@/icons';
import { Divider } from './Divider';

interface CollapsiblePanelProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const CollapsiblePanel: React.FC<CollapsiblePanelProps> = ({
  title,
  children,
  defaultOpen = true,
  className = '',
  style,
}) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={`collapsible-panel ${className}`} style={style}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          width: '100%',
          padding: '8px var(--spacing-lg)',
          background: 'transparent',
          border: 'none',
          color: 'var(--text-muted)',
          fontSize: '11px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          cursor: 'pointer',
          lineHeight: 1,
          fontFamily: 'inherit',
        }}
        aria-expanded={open}
      >
        <div style={{
          transition: 'transform var(--anim-fast) var(--ease-out)',
          transform: open ? 'rotate(0deg)' : 'rotate(-90deg)',
          display: 'flex',
        }}>
          <Icon name="ChevronDown" size={10} />
        </div>
        {title}
      </button>
      {open && (
        <div style={{ animation: 'fadeIn var(--anim-fast) var(--ease-out) forwards' }}>
          <Divider />
          <div style={{ padding: 'var(--spacing-sm) var(--spacing-lg)' }}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
};
