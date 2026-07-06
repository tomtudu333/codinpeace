import React from 'react';

interface ArrowHeadProps {
  color?: string;
  size?: number;
}

export const ArrowHead: React.FC<ArrowHeadProps> = ({
  color = 'var(--accent-primary)',
  size = 8,
}) => (
  <defs>
    <marker
      id="arrowHead"
      viewBox="0 0 10 10"
      refX={size}
      refY={5}
      markerWidth={size}
      markerHeight={size}
      orient="auto"
    >
      <path d="M 0 0 L 10 5 L 0 10 L 2.5 5 Z" fill={color} />
    </marker>
  </defs>
);
