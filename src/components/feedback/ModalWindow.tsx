import React from 'react';
import { Icon } from '@/icons';

interface ModalWindowProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  width?: string;
  className?: string;
}

export const ModalWindow: React.FC<ModalWindowProps> = ({
  visible,
  onClose,
  title,
  children,
  width = '420px',
  className = '',
}) => {
  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 400,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'fadeIn var(--anim-normal) var(--ease-out) forwards',
      }}
    >
      <div
        style={{ position: 'absolute', inset: 0, background: 'var(--bg-overlay)' }}
        onClick={onClose}
      />
      <div
        className={`modal-window ${className}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        style={{
          position: 'relative',
          width,
          maxWidth: '90vw',
          maxHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--bg-surface-raised)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-xl)',
          animation: 'scaleIn var(--anim-normal) var(--ease-out) forwards',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px var(--spacing-lg)',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>{title}</span>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
            }}
            aria-label="Close modal"
          >
            <Icon name="X" size={16} />
          </button>
        </div>
        <div style={{ flex: 1, overflow: 'auto', padding: 'var(--spacing-lg)' }}>
          {children}
        </div>
      </div>
    </div>
  );
};
