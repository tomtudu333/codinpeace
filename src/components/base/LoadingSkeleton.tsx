import React from 'react';

interface LoadingSkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  count?: number;
  className?: string;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  width = '100%',
  height = '16px',
  borderRadius = 'var(--radius-sm)',
  count = 1,
  className = '',
}) => {
  return (
    <div className={`skeleton-wrapper ${className}`} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="skeleton"
          style={{
            width: count > 1 && i === count - 1 ? '60%' : width,
            height,
            borderRadius,
            background: 'var(--border-subtle)',
            animation: 'skeletonPulse 1.5s ease-in-out infinite',
          }}
        />
      ))}
    </div>
  );
};
