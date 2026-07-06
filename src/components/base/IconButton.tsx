import React from 'react';
import { Icon, IconName } from '@/icons';

interface IconButtonProps {
  icon: IconName;
  size?: number;
  variant?: 'default' | 'primary' | 'ghost';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  title?: string;
  style?: React.CSSProperties;
}

const variantColors: Record<string, { bg: string; hoverBg: string; color: string }> = {
  default: { bg: 'rgba(255,255,255,0.06)', hoverBg: 'rgba(255,255,255,0.10)', color: 'var(--text-secondary)' },
  primary: { bg: 'var(--accent-primary-dim)', hoverBg: 'rgba(74,125,255,0.2)', color: 'var(--accent-primary)' },
  ghost: { bg: 'transparent', hoverBg: 'rgba(255,255,255,0.06)', color: 'var(--text-muted)' },
};

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  size = 14,
  variant = 'default',
  disabled = false,
  onClick,
  className = '',
  title,
  style,
}) => {
  const v = variantColors[variant];
  const btnSize = size + 12;

  return (
    <button
      className={`icon-btn icon-btn--${variant} ${className}`}
      onClick={onClick}
      disabled={disabled}
      title={title}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: `${btnSize}px`,
        height: `${btnSize}px`,
        background: v.bg,
        color: v.color,
        border: 'none',
        borderRadius: 'var(--radius-sm)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        transition: 'all var(--anim-fast) var(--ease-out)',
        outline: 'none',
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!disabled) e.currentTarget.style.background = v.hoverBg;
      }}
      onMouseLeave={(e) => {
        if (!disabled) e.currentTarget.style.background = v.bg;
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
      <Icon name={icon} size={size} />
    </button>
  );
};
