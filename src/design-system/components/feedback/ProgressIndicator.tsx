import React from 'react';

interface ProgressIndicatorProps {
  value: number;
  variant?: 'default' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md';
  className?: string;
}

const variantColors: Record<string, string> = {
  default: 'var(--accent-primary)',
  success: 'var(--accent-success)',
  warning: 'var(--accent-warning)',
  error: 'var(--accent-danger)',
};

const sizeMap: Record<string, number> = {
  sm: 4,
  md: 8,
};

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  value,
  variant = 'default',
  size = 'md',
  className,
}) => {
  const clampedValue = Math.min(100, Math.max(0, value));
  const barHeight = sizeMap[size];

  const trackStyle: React.CSSProperties = {
    width: '100%',
    height: barHeight,
    background: 'var(--bg-surface)',
    borderRadius: barHeight / 2,
    overflow: 'hidden',
  };

  const fillStyle: React.CSSProperties = {
    width: `${clampedValue}%`,
    height: '100%',
    background: variantColors[variant],
    borderRadius: barHeight / 2,
    transition: 'width var(--anim-normal, 300ms) ease',
  };

  return (
    <div style={trackStyle} className={className} role="progressbar" aria-valuenow={clampedValue} aria-valuemin={0} aria-valuemax={100}>
      <div style={fillStyle} />
    </div>
  );
};
