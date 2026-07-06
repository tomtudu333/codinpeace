import React from 'react';
import { animations } from '../../animation';

interface LoadingSkeletonProps {
  width?: string;
  height?: string;
  variant?: 'text' | 'circle' | 'rect';
  count?: number;
  className?: string;
}

const variantStyles: Record<string, React.CSSProperties> = {
  text: { borderRadius: 'var(--radius-sm)' },
  circle: { borderRadius: '50%' },
  rect: { borderRadius: 'var(--radius-md)' },
};

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  width,
  height,
  variant = 'text',
  count = 1,
  className,
}) => {
  const style: React.CSSProperties = {
    background: 'var(--bg-surface)',
    width: width ?? (variant === 'circle' ? '32px' : '100%'),
    height: height ?? (variant === 'circle' ? '32px' : variant === 'text' ? '14px' : '80px'),
    ...variantStyles[variant],
    ...animations.skeletonPulse,
  };

  if (count <= 1) {
    return <div style={style} className={className} />;
  }

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-sm)',
  };

  return (
    <div style={containerStyle} className={className}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={style} />
      ))}
    </div>
  );
};
