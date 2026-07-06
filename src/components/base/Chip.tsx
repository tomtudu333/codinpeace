import React from 'react';

interface ChipProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  size?: 'sm' | 'md';
  className?: string;
}

export const Chip: React.FC<ChipProps> = ({
  children,
  active = false,
  onClick,
  size = 'md',
  className = '',
}) => {
  const h = size === 'sm' ? '24px' : '28px';
  const fSize = size === 'sm' ? '11px' : '12px';

  return (
    <button
      className={`chip ${active ? 'chip--active' : ''} ${className}`}
      onClick={onClick}
      role="button"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        height: h,
        padding: `0 ${size === 'sm' ? '10px' : '12px'}`,
        fontSize: fSize,
        fontWeight: 500,
        color: active ? 'var(--text-accent)' : 'var(--text-secondary)',
        background: active ? 'var(--accent-primary-dim)' : 'rgba(255,255,255,0.03)',
        border: `1px solid ${active ? 'var(--border-accent)' : 'var(--border-subtle)'}`,
        borderRadius: 'var(--radius-full)',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        lineHeight: 1,
        transition: 'all var(--anim-fast) var(--ease-out)',
        outline: 'none',
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.background = 'var(--bg-surface-hover)';
          e.currentTarget.style.borderColor = 'var(--border-hover)';
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
          e.currentTarget.style.borderColor = 'var(--border-subtle)';
        }
      }}
      onFocus={(e: React.FocusEvent<HTMLButtonElement>) => {
        if (e.currentTarget.matches(':focus-visible')) {
          e.currentTarget.style.boxShadow = '0 0 0 2px var(--accent-primary)';
        }
      }}
      onBlur={(e: React.FocusEvent<HTMLButtonElement>) => {
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {children}
    </button>
  );
};
