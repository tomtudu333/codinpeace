import React from 'react';
import { GlassContainer } from './GlassContainer';

interface FloatingToolbarProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const FloatingToolbar: React.FC<FloatingToolbarProps> = ({
  children,
  className = '',
  style,
}) => {
  return (
    <GlassContainer
      className={`floating-toolbar ${className}`}
      blur="16px"
      opacity={0.9}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '2px',
        padding: '4px',
        borderRadius: 'var(--radius-md)',
        ...style,
      }}
    >
      {children}
    </GlassContainer>
  );
};
