import React from 'react';
import { Icon } from '../../icons/IconRegistry';

interface MetricDisplayProps {
  label: string;
  value: React.ReactNode;
  icon?: string;
  trend?: 'up' | 'down' | 'neutral';
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const MetricDisplay: React.FC<MetricDisplayProps> = ({
  label,
  value,
  icon,
  trend,
  color,
  size = 'md',
  className = '',
}) => {
  const vSize = size === 'sm' ? '16px' : size === 'lg' ? '28px' : '20px';
  const lSize = size === 'sm' ? '10px' : '11px';

  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
      <span style={{ fontSize: lSize, fontWeight: 500, color: 'var(--text-muted)', lineHeight: 1 }}>
        {label}
      </span>
      <span
        style={{
          fontSize: vSize,
          fontWeight: 600,
          color: color || 'var(--text-primary)',
          lineHeight: 1.2,
          fontFamily: 'var(--font-mono)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        {icon && <Icon name={icon} size={size === 'sm' ? 10 : 12} />}
        {value}
        {trend && (
          <span style={{ fontSize: '10px', color: trend === 'up' ? 'var(--status-success)' : trend === 'down' ? 'var(--status-error)' : 'var(--text-muted)' }}>
            {trend === 'up' ? '\u2191' : trend === 'down' ? '\u2193' : '\u2192'}
          </span>
        )}
      </span>
    </div>
  );
};
