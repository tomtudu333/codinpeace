import React from 'react';

type CardVariant = 'default' | 'raised' | 'bordered';

interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  padding?: string;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const cardVariants: Record<CardVariant, React.CSSProperties> = {
  default: { background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' },
  raised: { background: 'var(--bg-surface)', border: '1px solid transparent', boxShadow: 'var(--shadow-md)' },
  bordered: { background: 'var(--bg-surface)', border: '1px solid var(--border-default)', boxShadow: 'none' },
};

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'var(--spacing-md)',
  className,
  onClick,
  style,
}) => {
  const baseStyle: React.CSSProperties = {
    ...cardVariants[variant],
    padding,
    borderRadius: 'var(--radius-md)',
    cursor: onClick ? 'pointer' : undefined,
    transition: 'all var(--anim-fast)',
    ...style,
  };

  return <div style={baseStyle} className={className} onClick={onClick}>{children}</div>;
};
