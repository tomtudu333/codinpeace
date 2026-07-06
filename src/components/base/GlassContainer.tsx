import React from 'react';

interface GlassContainerProps {
  children: React.ReactNode;
  className?: string;
  blur?: string;
  opacity?: number;
  border?: boolean;
  style?: React.CSSProperties;
}

export const GlassContainer: React.FC<GlassContainerProps> = ({
  children,
  className = '',
  blur = '16px',
  opacity = 0.85,
  border = true,
  style,
}) => {
  return (
    <div
      className={`glass-container ${className}`}
      style={{
        background: `rgba(15, 15, 25, ${opacity})`,
        backdropFilter: `blur(${blur})`,
        WebkitBackdropFilter: `blur(${blur})`,
        border: border ? '1px solid var(--border-subtle)' : 'none',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-lg)',
        transition: 'all var(--anim-normal) var(--ease-out)',
        ...style,
      }}
    >
      {children}
    </div>
  );
};
