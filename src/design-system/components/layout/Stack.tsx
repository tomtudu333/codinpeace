import React from 'react';

interface StackProps {
  direction?: 'vertical' | 'horizontal';
  gap?: string;
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between';
  wrap?: boolean;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Stack: React.FC<StackProps> = ({
  direction = 'vertical',
  gap = 'var(--spacing-sm)',
  align = 'stretch',
  justify = 'flex-start',
  wrap = false,
  children,
  className,
  style,
}) => {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: direction === 'vertical' ? 'column' : 'row',
        gap,
        alignItems: align,
        justifyContent: justify,
        flexWrap: wrap ? 'wrap' : 'nowrap',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default Stack;
