import React, { useEffect, useCallback } from 'react';
import { Icon } from '../../icons';
import { animations } from '../../animation';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  width?: string;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  title,
  children,
  width = '480px',
  className,
}) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (visible) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [visible, handleKeyDown]);

  if (!visible) return null;

  const backdropStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    background: 'var(--bg-overlay)',
    zIndex: 'var(--z-modal)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...animations.fadeIn,
  };

  const modalStyle: React.CSSProperties = {
    background: 'var(--bg-surface-raised)',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--border-default)',
    boxShadow: 'var(--shadow-xl)',
    width,
    maxWidth: '90vw',
    maxHeight: '85vh',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    ...animations.scaleIn,
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 'var(--spacing-md) var(--spacing-lg)',
    borderBottom: '1px solid var(--border-default)',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: 'var(--font-base)',
    fontWeight: 600,
    color: 'var(--text-primary)',
  };

  const closeBtnStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: 'var(--text-muted)',
    padding: 'var(--spacing-xs)',
    borderRadius: 'var(--radius-sm)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'color var(--anim-fast)',
  };

  const contentStyle: React.CSSProperties = {
    padding: 'var(--spacing-lg)',
    color: 'var(--text-primary)',
  };

  return (
    <div style={backdropStyle} onClick={onClose} className={className}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        {title && (
          <div style={headerStyle}>
            <span style={titleStyle}>{title}</span>
            <button
              style={closeBtnStyle}
              onClick={onClose}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)';
              }}
            >
              <Icon name="X" size={16} />
            </button>
          </div>
        )}
        <div style={contentStyle}>{children}</div>
      </div>
    </div>
  );
};
