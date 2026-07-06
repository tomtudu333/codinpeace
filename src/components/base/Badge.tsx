import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'info' | 'success' | 'warning' | 'error' | 'accent';
  size?: 'sm' | 'md';
  className?: string;
}

const variantColors: Record<string, { bg: string; text: string; border: string }> = {
  default: { bg: 'rgba(255,255,255,0.06)', text: 'rgba(255,255,255,0.55)', border: 'rgba(255,255,255,0.08)' },
  info: { bg: 'var(--status-info-bg)', text: 'var(--status-info)', border: 'rgba(74,125,255,0.2)' },
  success: { bg: 'var(--status-success-bg)', text: 'var(--status-success)', border: 'rgba(52,211,153,0.2)' },
  warning: { bg: 'var(--status-warning-bg)', text: 'var(--status-warning)', border: 'rgba(251,191,36,0.2)' },
  error: { bg: 'var(--status-error-bg)', text: 'var(--status-error)', border: 'rgba(248,113,113,0.2)' },
  accent: { bg: 'var(--accent-primary-dim)', text: 'var(--accent-primary)', border: 'var(--border-accent)' },
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'sm',
  className = '',
}) => {
  const c = variantColors[variant] || variantColors.default;
  const h = size === 'sm' ? '18px' : '22px';
  const fSize = size === 'sm' ? '10px' : '11px';

  return (
    <span
      className={`badge ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        height: h,
        padding: `0 ${size === 'sm' ? '6px' : '8px'}`,
        fontSize: fSize,
        fontWeight: 500,
        color: c.text,
        background: c.bg,
        border: `1px solid ${c.border}`,
        borderRadius: 'var(--radius-full)',
        whiteSpace: 'nowrap',
        lineHeight: 1,
      }}
    >
      {children}
    </span>
  );
};
