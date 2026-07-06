import React from 'react';
import { Icon } from '@/icons';

interface InformationBoxProps {
  variant: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const variantStyle: Record<string, { icon: 'Info' | 'Success' | 'Warning' | 'Error'; bg: string; border: string; color: string }> = {
  info: { icon: 'Info', bg: 'var(--status-info-bg)', border: 'rgba(74,125,255,0.15)', color: 'var(--status-info)' },
  success: { icon: 'Success', bg: 'var(--status-success-bg)', border: 'rgba(52,211,153,0.15)', color: 'var(--status-success)' },
  warning: { icon: 'Warning', bg: 'var(--status-warning-bg)', border: 'rgba(251,191,36,0.15)', color: 'var(--status-warning)' },
  error: { icon: 'Error', bg: 'var(--status-error-bg)', border: 'rgba(248,113,113,0.15)', color: 'var(--status-error)' },
};

export const InformationBox: React.FC<InformationBoxProps> = ({
  variant,
  title,
  children,
  className = '',
}) => {
  const v = variantStyle[variant];

  return (
    <div
      className={`info-box info-box--${variant} ${className}`}
      role="alert"
      style={{
        display: 'flex',
        gap: 'var(--spacing-sm)',
        padding: 'var(--spacing-sm) var(--spacing-md)',
        background: v.bg,
        border: `1px solid ${v.border}`,
        borderRadius: 'var(--radius-sm)',
        fontSize: '12px',
        color: 'var(--text-secondary)',
        lineHeight: 1.4,
      }}
    >
      <div style={{ color: v.color, flexShrink: 0, marginTop: '1px' }}>
        <Icon name={v.icon} size={14} />
      </div>
      <div>
        {title && <div style={{ fontWeight: 600, color: v.color, marginBottom: '2px' }}>{title}</div>}
        {children}
      </div>
    </div>
  );
};
