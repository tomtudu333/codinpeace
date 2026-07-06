import React, { useEffect, useRef } from 'react';
import { Icon } from '../../icons';
import { animations } from '../../animation';

interface ToastProps {
  id: string;
  message: string;
  variant?: 'info' | 'success' | 'warning' | 'error';
  onClose: (id: string) => void;
  duration?: number;
  className?: string;
}

const variantColors: Record<string, { border: string; icon: string; iconName: string }> = {
  info: { border: 'var(--accent-primary)', icon: 'var(--accent-primary)', iconName: 'Info' },
  success: { border: 'var(--accent-success)', icon: 'var(--accent-success)', iconName: 'Success' },
  warning: { border: 'var(--accent-warning)', icon: 'var(--accent-warning)', iconName: 'Warning' },
  error: { border: 'var(--accent-danger)', icon: 'var(--accent-danger)', iconName: 'Error' },
};

export const Toast: React.FC<ToastProps> = ({
  id,
  message,
  variant = 'info',
  onClose,
  duration = 4000,
  className,
}) => {
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const colors = variantColors[variant];

  useEffect(() => {
    timerRef.current = setTimeout(() => onClose(id), duration);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [id, duration, onClose]);

  const toastStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-sm)',
    padding: 'var(--spacing-sm) var(--spacing-md)',
    background: 'var(--bg-surface-raised)',
    border: `1px solid ${colors.border}`,
    borderRadius: 'var(--radius-md)',
    boxShadow: 'var(--shadow-lg)',
    color: 'var(--text-primary)',
    fontSize: 'var(--font-sm)',
    minWidth: '280px',
    maxWidth: '420px',
    ...animations.slideUp,
  };

  const closeBtnStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: 'var(--text-muted)',
    padding: '2px',
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
    borderRadius: 'var(--radius-sm)',
  };

  return (
    <div style={toastStyle} className={className} role="alert">
      <Icon name={colors.iconName as any} size={16} />
      <span>{message}</span>
      <button
        style={closeBtnStyle}
        onClick={() => onClose(id)}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)';
        }}
      >
        <Icon name="X" size={14} />
      </button>
    </div>
  );
};
