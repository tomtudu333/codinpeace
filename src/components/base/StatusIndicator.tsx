import React from 'react';

interface StatusIndicatorProps {
  status: 'info' | 'success' | 'warning' | 'error' | 'none';
  label?: string;
  size?: 'sm' | 'md';
  pulse?: boolean;
  className?: string;
}

const statusColors: Record<string, { dot: string; glow: string }> = {
  info: { dot: 'var(--status-info)', glow: 'rgba(74,125,255,0.4)' },
  success: { dot: 'var(--status-success)', glow: 'rgba(52,211,153,0.4)' },
  warning: { dot: 'var(--status-warning)', glow: 'rgba(251,191,36,0.4)' },
  error: { dot: 'var(--status-error)', glow: 'rgba(248,113,113,0.4)' },
  none: { dot: 'var(--severity-none)', glow: 'transparent' },
};

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  label,
  size = 'sm',
  pulse = false,
  className = '',
}) => {
  const c = statusColors[status];
  const dotSize = size === 'sm' ? 6 : 8;

  return (
    <span
      className={`status-indicator ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: size === 'sm' ? '11px' : '12px',
        color: 'var(--text-secondary)',
        lineHeight: 1,
      }}
    >
      <span
        style={{
          width: `${dotSize}px`,
          height: `${dotSize}px`,
          borderRadius: '50%',
          background: c.dot,
          boxShadow: pulse ? `0 0 6px ${c.glow}` : 'none',
          flexShrink: 0,
          animation: pulse ? 'glowPulse 2s ease-in-out infinite' : undefined,
        }}
      />
      {label && <span>{label}</span>}
    </span>
  );
};
