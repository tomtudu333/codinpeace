import React from 'react';
import { Icon, IconName } from '@/icons';

interface EmptyStateProps {
  icon?: IconName;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'Info',
  title,
  description,
  action,
  className = '',
}) => {
  return (
    <div
      className={`empty-state ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        padding: 'var(--spacing-2xl) var(--spacing-lg)',
        textAlign: 'center',
      }}
    >
      <div style={{ color: 'var(--text-muted)', opacity: 0.4 }}>
        <Icon name={icon} size={24} />
      </div>
      <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.4 }}>
        {title}
      </span>
      {description && (
        <span style={{ fontSize: '11px', color: 'var(--text-muted)', maxWidth: '220px', lineHeight: 1.4 }}>
          {description}
        </span>
      )}
      {action && <div style={{ marginTop: '4px' }}>{action}</div>}
    </div>
  );
};
