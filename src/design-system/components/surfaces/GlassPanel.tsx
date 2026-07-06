import React from 'react';

interface GlassPanelProps {
  children: React.ReactNode;
  blur?: string;
  opacity?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  blur = 'var(--glass-blur)',
  opacity = 'var(--glass-opacity)',
  className,
  style,
}) => {
  const baseStyle: React.CSSProperties = {
    background: 'var(--bg-surface)',
    backdropFilter: `blur(${blur})`,
    WebkitBackdropFilter: `blur(${blur})`,
    border: '1px solid var(--border-subtle)',
    borderRadius: 'var(--radius-md)',
    opacity,
    ...style,
  };

  return <div style={baseStyle} className={className}>{children}</div>;
};
