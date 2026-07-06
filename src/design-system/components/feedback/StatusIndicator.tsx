import React from 'react';
import { animations } from '../../animation';

interface StatusIndicatorProps {
  status: 'info' | 'success' | 'warning' | 'error' | 'none';
  size?: 'sm' | 'md';
  pulse?: boolean;
  className?: string;
}

const statusColors: Record<string, string> = {
  info: 'var(--accent-primary)',
  success: 'var(--accent-success)',
  warning: 'var(--accent-warning)',
  error: 'var(--accent-danger)',
  none: 'transparent',
};

const sizeMap: Record<string, number> = {
  sm: 6,
  md: 10,
};

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  size = 'md',
  pulse = false,
  className,
}) => {
  const dotSize = sizeMap[size];

  const dotStyle: React.CSSProperties = {
    width: dotSize,
    height: dotSize,
    borderRadius: '50%',
    background: statusColors[status],
    display: 'inline-block',
    flexShrink: 0,
    ...(pulse && status !== 'none' ? animations.glowPulse : {}),
  };

  return <span style={dotStyle} className={className} />;
};
