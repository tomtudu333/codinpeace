import React, { useState, useRef, useCallback } from 'react';
import { animations } from '../../animation';

interface TooltipProps {
  content: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  children: React.ReactNode;
}

const positionStyles: Record<string, React.CSSProperties> = {
  top: { bottom: 'calc(100% + 6px)', left: '50%', transform: 'translateX(-50%)' },
  bottom: { top: 'calc(100% + 6px)', left: '50%', transform: 'translateX(-50%)' },
  left: { right: 'calc(100% + 6px)', top: '50%', transform: 'translateY(-50%)' },
  right: { left: 'calc(100% + 6px)', top: '50%', transform: 'translateY(-50%)' },
};

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  position = 'top',
  delay = 300,
  children,
}) => {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const handleMouseEnter = useCallback(() => {
    timeoutRef.current = setTimeout(() => setVisible(true), delay);
  }, [delay]);

  const handleMouseLeave = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisible(false);
  }, []);

  const wrapperStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-flex',
  };

  const tooltipStyle: React.CSSProperties = {
    position: 'absolute',
    background: 'var(--bg-tooltip)',
    color: 'var(--text-primary)',
    borderRadius: 'var(--radius-sm)',
    padding: 'var(--spacing-xs) var(--spacing-sm)',
    fontSize: 'var(--font-xs)',
    whiteSpace: 'nowrap',
    zIndex: 'var(--z-tooltip)',
    pointerEvents: 'none',
    ...positionStyles[position],
    ...(visible ? animations.fadeIn : {}),
  };

  return (
    <div style={wrapperStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
      {visible && <div style={tooltipStyle}>{content}</div>}
    </div>
  );
};
