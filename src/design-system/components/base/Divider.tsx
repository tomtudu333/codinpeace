import React from 'react';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({ orientation = 'horizontal', className }) => {
  const style: React.CSSProperties = {
    ...(orientation === 'horizontal'
      ? { width: '100%', height: 0, borderTop: '1px solid var(--border-subtle)' }
      : { height: '100%', width: 0, borderLeft: '1px solid var(--border-subtle)' }),
    borderStyle: 'solid',
    flexShrink: 0,
  };

  return <div style={style} className={className} />;
};
