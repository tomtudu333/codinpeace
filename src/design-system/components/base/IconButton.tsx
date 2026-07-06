import React from 'react';
import { Icon } from '../../icons';

interface IconButtonProps {
  icon: string;
  size?: 12 | 14 | 16 | 18;
  variant?: 'primary' | 'ghost' | 'subtle';
  disabled?: boolean;
  onClick?: () => void;
  title?: string;
  className?: string;
}

const variantStyleMap: Record<string, React.CSSProperties> = {
  primary: { background: 'var(--accent-primary)', color: 'var(--text-on-accent)', border: '1px solid transparent' },
  ghost: { background: 'transparent', color: 'var(--text-primary)', border: '1px solid transparent' },
  subtle: { background: 'var(--bg-surface)', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' },
};

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  size = 16,
  variant = 'ghost',
  disabled = false,
  onClick,
  title,
  className,
}) => {
  const [hovered, setHovered] = React.useState(false);

  const style: React.CSSProperties = {
    ...variantStyleMap[variant],
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'var(--spacing-xl)',
    height: 'var(--spacing-xl)',
    borderRadius: 'var(--radius-md)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'all var(--anim-fast)',
    padding: 0,
    lineHeight: 1,
    ...(hovered && !disabled ? { background: variant === 'ghost' ? 'var(--bg-surface)' : 'var(--accent-primary-hover)' } : {}),
  };

  return (
    <button
      style={style}
      disabled={disabled}
      onClick={onClick}
      title={title}
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Icon name={icon as any} size={size} />
    </button>
  );
};
