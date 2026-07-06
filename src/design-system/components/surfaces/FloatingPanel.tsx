import React from 'react';

interface FloatingPanelProps {
  children: React.ReactNode;
  x?: number;
  y?: number;
  visible: boolean;
  className?: string;
}

export const FloatingPanel: React.FC<FloatingPanelProps> = ({
  children,
  x = 0,
  y = 0,
  visible,
  className,
}) => {
  const style: React.CSSProperties = {
    position: 'fixed',
    left: x,
    top: y,
    background: 'var(--bg-surface-raised)',
    boxShadow: 'var(--shadow-lg)',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border-subtle)',
    zIndex: 1000,
    display: visible ? 'block' : 'none',
    minWidth: 160,
  };

  return <div style={style} className={className}>{children}</div>;
};
