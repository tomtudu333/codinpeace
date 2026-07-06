import React, { forwardRef } from 'react';

interface PanelProps {
  children: React.ReactNode;
  className?: string;
  elevation?: 'flat' | 'raised' | 'overlay';
  variant?: 'default' | 'glass' | 'solid';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  style?: React.CSSProperties;
}

const elevationMap: Record<string, string> = {
  flat: 'var(--shadow-sm)',
  raised: 'var(--shadow-md)',
  overlay: 'var(--shadow-lg)',
};

const paddingMap: Record<string, string> = {
  none: '0',
  sm: 'var(--spacing-sm)',
  md: 'var(--spacing-md)',
  lg: 'var(--spacing-lg)',
};

export const Panel = forwardRef<HTMLDivElement, PanelProps>(
  ({ children, className = '', elevation = 'raised', variant = 'glass', padding = 'md', style }, ref) => {
    const variantStyles: React.CSSProperties = {
      default: {
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
      },
      glass: {
        background: 'var(--bg-surface)',
        backdropFilter: 'blur(var(--glass-blur))',
        WebkitBackdropFilter: 'blur(var(--glass-blur))',
        border: '1px solid var(--border-subtle)',
      },
      solid: {
        background: 'var(--bg-primary)',
        border: '1px solid var(--border-default)',
      },
    }[variant] || {};

    return (
      <div
        ref={ref}
        className={`panel ${className}`}
        style={{
          borderRadius: 'var(--radius-md)',
          boxShadow: elevationMap[elevation] || elevationMap.raised,
          padding: paddingMap[padding] || paddingMap.md,
          transition: 'background var(--anim-fast) var(--ease-out), box-shadow var(--anim-fast) var(--ease-out)',
          ...variantStyles,
          ...style,
        }}
      >
        {children}
      </div>
    );
  }
);

Panel.displayName = 'Panel';
