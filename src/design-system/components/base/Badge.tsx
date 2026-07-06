import React from 'react';

type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: React.ReactNode;
}

interface BadgeColors {
  bg: string;
  text: string;
  border: string;
}

const variantColors: Record<BadgeVariant, BadgeColors> = {
  default: { bg: 'var(--bg-surface)', text: 'var(--text-secondary)', border: 'var(--border-default)' },
  primary: { bg: 'var(--accent-primary-dim)', text: 'var(--accent-primary)', border: 'var(--accent-primary)' },
  success: { bg: 'var(--accent-success-dim)', text: 'var(--accent-success)', border: 'var(--accent-success)' },
  warning: { bg: 'var(--accent-warning-dim)', text: 'var(--accent-warning)', border: 'var(--accent-warning)' },
  error: { bg: 'var(--accent-danger-dim)', text: 'var(--accent-danger)', border: 'var(--accent-danger)' },
  info: { bg: 'var(--accent-info-dim)', text: 'var(--accent-info)', border: 'var(--accent-info)' },
};

const sizeMap: Record<BadgeSize, React.CSSProperties> = {
  sm: { padding: '1px var(--spacing-xs)', fontSize: 'var(--font-xs)' },
  md: { padding: '2px var(--spacing-sm)', fontSize: 'var(--font-sm)' },
};

export const Badge: React.FC<BadgeProps> = ({ variant = 'default', size = 'md', children }) => {
  const colors = variantColors[variant];

  const style: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    background: colors.bg,
    color: colors.text,
    border: `1px solid ${colors.border}`,
    borderRadius: 'var(--radius-md)',
    fontWeight: 500,
    lineHeight: 1.4,
    whiteSpace: 'nowrap',
    ...sizeMap[size],
  };

  return <span style={style}>{children}</span>;
};
