import React from 'react';

interface ScrollContainerProps {
  children: React.ReactNode;
  direction?: 'vertical' | 'horizontal' | 'both';
  className?: string;
  style?: React.CSSProperties;
}

const ScrollContainer: React.FC<ScrollContainerProps> = ({
  children,
  direction = 'vertical',
  className,
  style,
}) => {
  const overflowStyle:
    | 'auto'
    | 'auto hidden'
    | 'hidden auto'
    | 'auto auto' = (() => {
    switch (direction) {
      case 'horizontal':
        return 'auto hidden';
      case 'vertical':
        return 'hidden auto';
      case 'both':
        return 'auto auto';
    }
  })();

  return (
    <div
      className={className}
      style={{
        overflow: overflowStyle,
        scrollbarWidth: 'thin',
        scrollbarColor: 'var(--border-default) transparent',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default ScrollContainer;
