import React from 'react';
import { Icon } from '@/icons';

interface TagProps {
  children: React.ReactNode;
  variant?: 'default' | 'info' | 'success' | 'warning' | 'error';
  removable?: boolean;
  onRemove?: () => void;
  className?: string;
}

const variantColors: Record<string, { bg: string; text: string; border: string }> = {
  default: { bg: 'rgba(255,255,255,0.04)', text: 'var(--text-secondary)', border: 'var(--border-subtle)' },
  info: { bg: 'var(--status-info-bg)', text: 'var(--status-info)', border: 'rgba(74,125,255,0.2)' },
  success: { bg: 'var(--status-success-bg)', text: 'var(--status-success)', border: 'rgba(52,211,153,0.2)' },
  warning: { bg: 'var(--status-warning-bg)', text: 'var(--status-warning)', border: 'rgba(251,191,36,0.2)' },
  error: { bg: 'var(--status-error-bg)', text: 'var(--status-error)', border: 'rgba(248,113,113,0.2)' },
};

export const Tag: React.FC<TagProps> = ({
  children,
  variant = 'default',
  removable = false,
  onRemove,
  className = '',
}) => {
  const c = variantColors[variant] || variantColors.default;

  return (
    <span
      className={`tag ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        height: '22px',
        padding: '0 8px',
        fontSize: '11px',
        fontWeight: 500,
        color: c.text,
        background: c.bg,
        border: `1px solid ${c.border}`,
        borderRadius: 'var(--radius-sm)',
        whiteSpace: 'nowrap',
        lineHeight: 1,
      }}
    >
      {children}
      {removable && (
        <button
          onClick={onRemove}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '14px',
            height: '14px',
            border: 'none',
            background: 'transparent',
            color: 'inherit',
            cursor: 'pointer',
            padding: 0,
            borderRadius: '2px',
            opacity: 0.6,
          }}
          aria-label="Remove"
        >
          <Icon name="X" size={10} />
        </button>
      )}
    </span>
  );
};
