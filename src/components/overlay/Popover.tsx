import React, { useRef, useEffect } from 'react';

interface PopoverProps {
  visible: boolean;
  onClose: () => void;
  anchor: React.RefObject<HTMLElement | null>;
  children: React.ReactNode;
  className?: string;
}

export const Popover: React.FC<PopoverProps> = ({
  visible,
  onClose,
  anchor,
  children,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!visible) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node) && anchor.current && !anchor.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('keydown', keyHandler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('keydown', keyHandler);
    };
  }, [visible, onClose, anchor]);

  if (!visible) return null;

  return (
    <div
      ref={ref}
      className={`popover ${className}`}
      style={{
        position: 'fixed',
        zIndex: 200,
        animation: 'scaleIn var(--anim-fast) var(--ease-out) forwards',
        background: 'var(--bg-surface-raised)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-lg)',
        padding: 'var(--spacing-sm)',
        minWidth: '160px',
      }}
    >
      {children}
    </div>
  );
};
