import React from 'react';
import { Icon, IconName } from '@/icons';

interface ButtonProps {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: IconName;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  title?: string;
  style?: React.CSSProperties;
  fullWidth?: boolean;
}

const variantStyles: Record<string, { bg: string; hoverBg: string; text: string; border: string }> = {
  primary: {
    bg: 'var(--accent-primary)',
    hoverBg: '#5a8dff',
    text: '#ffffff',
    border: 'transparent',
  },
  secondary: {
    bg: 'rgba(255,255,255,0.06)',
    hoverBg: 'rgba(255,255,255,0.10)',
    text: 'var(--text-primary)',
    border: 'var(--border-subtle)',
  },
  ghost: {
    bg: 'transparent',
    hoverBg: 'rgba(255,255,255,0.06)',
    text: 'var(--text-secondary)',
    border: 'transparent',
  },
  danger: {
    bg: 'var(--status-error-bg)',
    hoverBg: 'rgba(248,113,113,0.2)',
    text: 'var(--status-error)',
    border: 'transparent',
  },
};

const sizeMap: Record<string, { h: string; fSize: string; px: string; gap: string }> = {
  sm: { h: '26px', fSize: '11px', px: '10px', gap: '4px' },
  md: { h: '32px', fSize: '12px', px: '14px', gap: '6px' },
  lg: { h: '38px', fSize: '13px', px: '18px', gap: '8px' },
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'secondary',
  size = 'md',
  icon,
  iconPosition = 'left',
  disabled = false,
  onClick,
  className = '',
  title,
  style,
  fullWidth = false,
}) => {
  const v = variantStyles[variant];
  const s = sizeMap[size];
  const isIconOnly = !children && !!icon;

  return (
    <button
      className={`btn btn--${variant} ${className}`}
      onClick={onClick}
      disabled={disabled}
      title={title}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: s.gap,
        height: s.h,
        minWidth: isIconOnly ? s.h : undefined,
        padding: children ? `0 ${s.px}` : '0',
        fontSize: s.fSize,
        fontWeight: 500,
        color: v.text,
        background: v.bg,
        border: `1px solid ${v.border}`,
        borderRadius: 'var(--radius-sm)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        whiteSpace: 'nowrap',
        lineHeight: 1,
        transition: 'all var(--anim-fast) var(--ease-out)',
        outline: 'none',
        fontFamily: 'inherit',
        width: fullWidth ? '100%' : undefined,
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.background = v.hoverBg;
          if (variant === 'ghost') e.currentTarget.style.color = 'var(--text-primary)';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.background = v.bg;
          if (variant === 'ghost') e.currentTarget.style.color = v.text;
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
      {icon && iconPosition === 'left' && <Icon name={icon} size={size === 'lg' ? 16 : size === 'sm' ? 12 : 14} />}
      {children}
      {icon && iconPosition === 'right' && <Icon name={icon} size={size === 'lg' ? 16 : 14} />}
    </button>
  );
};
