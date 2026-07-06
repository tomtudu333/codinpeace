import React from 'react';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  style?: React.CSSProperties;
}

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  className = '',
  style,
}) => {
  const isHorizontal = orientation === 'horizontal';

  return (
    <div
      className={`divider ${className}`}
      role="separator"
      aria-orientation={orientation}
      style={{
        width: isHorizontal ? '100%' : '1px',
        height: isHorizontal ? '1px' : '100%',
        minHeight: isHorizontal ? '1px' : undefined,
        background: 'var(--border-subtle)',
        margin: isHorizontal ? 'var(--spacing-sm) 0' : '0 var(--spacing-sm)',
        flexShrink: 0,
        ...style,
      }}
    />
  );
};
