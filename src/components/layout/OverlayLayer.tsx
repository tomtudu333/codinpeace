import React, { useEffect } from 'react';

interface OverlayLayerProps {
  children: React.ReactNode;
  visible: boolean;
  onClose?: () => void;
  closeOnClick?: boolean;
  className?: string;
}

export const OverlayLayer: React.FC<OverlayLayerProps> = ({
  children,
  visible,
  onClose,
  closeOnClick = true,
  className = '',
}) => {
  useEffect(() => {
    if (!visible) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div
      className={`overlay-layer ${className}`}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'fadeIn var(--anim-normal) var(--ease-out) forwards',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--bg-overlay)',
        }}
        onClick={closeOnClick ? onClose : undefined}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
};
