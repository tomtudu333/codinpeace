import React from 'react';

interface MetricGridProps {
  columns?: number;
  gap?: string;
  children: React.ReactNode;
  className?: string;
}

export const MetricGrid: React.FC<MetricGridProps> = ({
  columns = 2,
  gap = 'var(--spacing-sm)',
  children,
  className = '',
}) => {
  return (
    <div
      className={className}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap,
      }}
    >
      {children}
    </div>
  );
};
