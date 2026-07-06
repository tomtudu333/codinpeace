import React from 'react';

interface SurfaceContainerProps {
  children: React.ReactNode;
  level?: 0 | 1 | 2;
  className?: string;
}

const levelStyles: Record<number, React.CSSProperties> = {
  0: { background: 'transparent' },
  1: { background: 'var(--bg-surface)' },
  2: { background: 'var(--bg-surface-raised)' },
};

export const SurfaceContainer: React.FC<SurfaceContainerProps> = ({ children, level = 0, className }) => {
  const style: React.CSSProperties = {
    ...levelStyles[level],
    borderRadius: 'var(--radius-md)',
    padding: 'var(--spacing-md)',
  };

  return <div style={style} className={className}>{children}</div>;
};
