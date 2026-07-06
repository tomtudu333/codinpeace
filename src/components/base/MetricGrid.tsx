import React from 'react';

interface MetricGridProps {
  children: React.ReactNode;
  columns?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const MetricGrid: React.FC<MetricGridProps> = ({
  children,
  columns = 2,
  className = '',
  style,
}) => {
  return (
    <div
      className={`metric-grid ${className}`}
      role="grid"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: 'var(--spacing-md)',
        ...style,
      }}
    >
      {children}
    </div>
  );
};
