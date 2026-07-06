import React from 'react';
import { Icon } from '../../icons';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: string;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  title?: string;
}

const sizeMap: Record<ButtonSize, React.CSSProperties> = {
  sm: { padding: 'var(--spacing-xs) var(--spacing-sm)', fontSize: 'var(--font-xs)', gap: 'var(--spacing-xs)' },
  md: { padding: 'var(--spacing-sm) var(--spacing-md)', fontSize: 'var(--font-sm)', gap: 'var(--spacing-sm)' },
  lg: { padding: 'var(--spacing-md) var(--spacing-lg)', fontSize: 'var(--font-base)', gap: 'var(--spacing-sm)' },
};

const variantStyles: Record<ButtonVariant, { normal: React.CSSProperties; hover: React.CSSProperties }> = {
  primary: {
    normal: { background: 'var(--accent-primary)', color: 'var(--text-on-accent)', border: '1px solid transparent', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: 600, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', transition: 'all var(--anim-fast)' },
    hover: { background: 'var(--accent-primary-hover)' },
  },
  secondary: {
    normal: { background: 'var(--bg-surface)', color: 'var(--text-primary)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: 600, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', transition: 'all var(--anim-fast)' },
    hover: { background: 'var(--bg-surface-raised)' },
  },
  ghost: {
    normal: { background: 'transparent', color: 'var(--text-primary)', border: '1px solid transparent', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: 600, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', transition: 'all var(--anim-fast)' },
    hover: { background: 'var(--bg-surface)' },
  },
  danger: {
    normal: { background: 'var(--accent-danger)', color: 'var(--text-on-accent)', border: '1px solid transparent', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: 600, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', transition: 'all var(--anim-fast)' },
    hover: { background: 'var(--accent-danger-hover)' },
  },
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  children,
  onClick,
  className,
  title,
}) => {
  const [hovered, setHovered] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const v = variantStyles[variant];
  const s = sizeMap[size];

  const baseStyle: React.CSSProperties = {
    ...v.normal,
    ...s,
    ...(fullWidth ? { width: '100%' } : {}),
    ...(disabled ? { opacity: 0.5, cursor: 'not-allowed', pointerEvents: 'none' as const } : {}),
    ...(hovered && !disabled ? v.hover : {}),
    ...(focused ? { outline: '2px solid var(--accent-primary)', outlineOffset: '2px' } : {}),
  };

  const handleFocus: React.FocusEventHandler<HTMLButtonElement> = (e) => {
    if (e.target.matches(':focus-visible')) {
      setFocused(true);
    }
  };

  return (
    <button
      style={baseStyle}
      disabled={disabled}
      onClick={onClick}
      className={className}
      title={title}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={handleFocus}
      onBlur={() => setFocused(false)}
    >
      {icon && iconPosition === 'left' && <Icon name={icon as any} size={size === 'lg' ? 18 : 14} />}
      {children}
      {icon && iconPosition === 'right' && <Icon name={icon as any} size={size === 'lg' ? 18 : 14} />}
    </button>
  );
};
