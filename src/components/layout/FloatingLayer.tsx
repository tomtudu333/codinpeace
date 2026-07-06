import React from 'react';

interface FloatingLayerProps {
  children: React.ReactNode;
  visible: boolean;
  x?: number;
  y?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const FloatingLayer: React.FC<FloatingLayerProps> = ({
  children,
  visible,
  x,
  y,
  className = '',
  style,
}) => {
  if (!visible) return null;

  return (
    <div
      className={`floating-layer ${className}`}
      style={{
        position: 'fixed',
        left: x ?? 0,
        top: y ?? 0,
        zIndex: 200,
        animation: 'scaleIn var(--anim-fast) var(--ease-out) forwards',
        ...style,
      }}
    >
      {children}
    </div>
  );
};
