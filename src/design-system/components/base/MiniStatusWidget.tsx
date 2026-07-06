import React from 'react';

interface MiniStatusWidgetProps {
  label: string;
  value: string;
  status?: 'info' | 'success' | 'warning' | 'error' | 'none';
  className?: string;
}

const statusColors: Record<string, { dot: string; text: string }> = {
  info: { dot: 'var(--status-info)', text: 'var(--status-info)' },
  success: { dot: 'var(--status-success)', text: 'var(--status-success)' },
  warning: { dot: 'var(--status-warning)', text: 'var(--status-warning)' },
  error: { dot: 'var(--status-error)', text: 'var(--status-error)' },
  none: { dot: 'var(--severity-none)', text: 'var(--text-muted)' },
};

export const MiniStatusWidget: React.FC<MiniStatusWidgetProps> = ({
  label,
  value,
  status = 'none',
  className = '',
}) => {
  const colors = statusColors[status];

  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 0' }}>
      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: colors.dot, flexShrink: 0 }} />
      <span style={{ fontSize: '11px', color: 'var(--text-muted)', minWidth: '60px' }}>{label}</span>
      <span style={{ fontSize: '11px', color: colors.text, fontWeight: 500, marginLeft: 'auto' }}>{value}</span>
    </div>
  );
};
