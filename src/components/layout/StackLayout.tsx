import React from 'react';

interface StackLayoutProps {
  children: React.ReactNode;
  direction?: 'vertical' | 'horizontal';
  gap?: string;
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between';
  wrap?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const StackLayout: React.FC<StackLayoutProps> = ({
  children,
  direction = 'vertical',
  gap = 'var(--spacing-sm)',
  align = 'stretch',
  justify = 'start',
  wrap = false,
  className = '',
  style,
}) => {
  const justifyMap: Record<string, string> = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    between: 'space-between',
  };

  return (
    <div
      className={`stack-layout ${className}`}
      style={{
        display: 'flex',
        flexDirection: direction === 'vertical' ? 'column' : 'row',
        gap,
        alignItems: align === 'stretch' ? 'stretch' : align === 'start' ? 'flex-start' : align === 'end' ? 'flex-end' : 'center',
        justifyContent: justifyMap[justify] || 'flex-start',
        flexWrap: wrap ? 'wrap' : 'nowrap',
        minWidth: 0,
        minHeight: 0,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
