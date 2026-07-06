import React from 'react';
import { StatusIndicator } from './StatusIndicator';

interface MiniStatusWidgetProps {
  status: 'info' | 'success' | 'warning' | 'error' | 'none';
  label: string;
  value: string;
  className?: string;
}

export const MiniStatusWidget: React.FC<MiniStatusWidgetProps> = ({
  status,
  label,
  value,
  className = '',
}) => {
  return (
    <div
      className={`mini-status ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '8px',
        padding: '6px 0',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <StatusIndicator status={status} size="sm" />
        <span style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1 }}>{label}</span>
      </div>
      <span style={{ fontSize: '11px', fontWeight: 500, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', lineHeight: 1 }}>{value}</span>
    </div>
  );
};
