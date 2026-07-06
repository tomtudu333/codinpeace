import React, { useEffect, useState } from 'react';
import { Icon, IconName } from '@/icons';

export type ToastVariant = 'info' | 'success' | 'warning' | 'error';

interface NotificationToastProps {
  id: string;
  message: string;
  variant?: ToastVariant;
  duration?: number;
  onDismiss: (id: string) => void;
}

const variantConfig: Record<ToastVariant, { icon: IconName; color: string; bg: string; border: string }> = {
  info: { icon: 'Info', color: 'var(--status-info)', bg: 'var(--status-info-bg)', border: 'rgba(74,125,255,0.2)' },
  success: { icon: 'Success', color: 'var(--status-success)', bg: 'var(--status-success-bg)', border: 'rgba(52,211,153,0.2)' },
  warning: { icon: 'Warning', color: 'var(--status-warning)', bg: 'var(--status-warning-bg)', border: 'rgba(251,191,36,0.2)' },
  error: { icon: 'Error', color: 'var(--status-error)', bg: 'var(--status-error-bg)', border: 'rgba(248,113,113,0.2)' },
};

export const NotificationToast: React.FC<NotificationToastProps> = ({
  id,
  message,
  variant = 'info',
  duration = 4000,
  onDismiss,
}) => {
  const [exiting, setExiting] = useState(false);
  const v = variantConfig[variant];

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(() => onDismiss(id), 200);
    }, duration);
    return () => clearTimeout(timer);
  }, [id, duration, onDismiss]);

  return (
    <div
      role="alert"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px 14px',
        background: v.bg,
        border: `1px solid ${v.border}`,
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-lg)',
        backdropFilter: 'blur(12px)',
        minWidth: '280px',
        maxWidth: '400px',
        animation: exiting
          ? 'fadeOut var(--anim-fast) var(--ease-in-out) forwards'
          : 'toastSlideIn var(--anim-normal) var(--ease-out) forwards',
      }}
    >
      <div style={{ color: v.color, flexShrink: 0 }}>
        <Icon name={v.icon} size={16} />
      </div>
      <span style={{ flex: 1, fontSize: '12px', color: 'var(--text-primary)', lineHeight: 1.4 }}>
        {message}
      </span>
      <button
        onClick={() => { setExiting(true); setTimeout(() => onDismiss(id), 200); }}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--text-muted)',
          cursor: 'pointer',
          padding: '2px',
          display: 'flex',
          borderRadius: '2px',
        }}
        aria-label="Dismiss"
      >
        <Icon name="X" size={12} />
      </button>
    </div>
  );
};
