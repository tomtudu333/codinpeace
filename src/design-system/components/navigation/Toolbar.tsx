import React from 'react';

interface ToolbarProps {
  children: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

const alignMap: Record<string, React.CSSProperties['justifyContent']> = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
};

const Toolbar: React.FC<ToolbarProps> = ({
  children,
  align = 'left',
  className,
}) => {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: alignMap[align],
        height: '48px',
        padding: '0 var(--spacing-sm)',
        borderBottom: '1px solid var(--border-default)',
        background: 'var(--bg-surface)',
        gap: 'var(--spacing-sm)',
      }}
    >
      {children}
    </div>
  );
};

export default Toolbar;
