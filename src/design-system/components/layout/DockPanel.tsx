import React from 'react';

interface DockPanelProps {
  children: React.ReactNode;
  position: 'top' | 'bottom' | 'left' | 'right';
  size?: string;
  className?: string;
}

const positionStyles: Record<
  DockPanelProps['position'],
  React.CSSProperties
> = {
  top: {
    top: 0,
    left: 0,
    right: 0,
    height: 'var(--dock-size, 48px)',
    borderBottom: '1px solid var(--border-default)',
  },
  bottom: {
    bottom: 0,
    left: 0,
    right: 0,
    height: 'var(--dock-size, 48px)',
    borderTop: '1px solid var(--border-default)',
  },
  left: {
    top: 0,
    bottom: 0,
    left: 0,
    width: 'var(--dock-size, 48px)',
    borderRight: '1px solid var(--border-default)',
  },
  right: {
    top: 0,
    bottom: 0,
    right: 0,
    width: 'var(--dock-size, 48px)',
    borderLeft: '1px solid var(--border-default)',
  },
};

const DockPanel: React.FC<DockPanelProps> = ({
  children,
  position,
  size,
  className,
}) => {
  return (
    <div
      className={className}
      style={{
        position: 'fixed',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-surface)',
        ...positionStyles[position],
        ...(size ? { '--dock-size': size } as React.CSSProperties : {}),
      }}
    >
      {children}
    </div>
  );
};

export default DockPanel;
