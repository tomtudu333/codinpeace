import React, { useEffect, useState, useRef } from 'react';
import { Icon } from '../../icons';
import { animations } from '../../animation';

export interface ContextMenuItem {
  id: string;
  label: string;
  icon?: string;
  shortcut?: string;
  divider?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

interface ContextMenuProps {
  items: ContextMenuItem[];
  x: number;
  y: number;
  onClose: () => void;
  className?: string;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  items,
  x,
  y,
  onClose,
  className,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [clampedPos, setClampedPos] = useState({ x, y });

  useEffect(() => {
    if (menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      const maxX = window.innerWidth - rect.width;
      const maxY = window.innerHeight - rect.height;
      setClampedPos({
        x: Math.min(x, maxX),
        y: Math.min(y, maxY),
      });
    }
  }, [x, y]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const menuStyle: React.CSSProperties = {
    position: 'fixed',
    top: clampedPos.y,
    left: clampedPos.x,
    background: 'var(--bg-surface-raised)',
    border: '1px solid var(--border-default)',
    borderRadius: 'var(--radius-md)',
    boxShadow: 'var(--shadow-lg)',
    zIndex: 'var(--z-modal)',
    minWidth: '180px',
    padding: 'var(--spacing-xs) 0',
    ...animations.fadeIn,
  };

  const itemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-sm)',
    padding: 'var(--spacing-xs) var(--spacing-md)',
    cursor: 'pointer',
    color: 'var(--text-primary)',
    fontSize: 'var(--font-sm)',
    transition: 'background var(--anim-fast)',
    border: 'none',
    background: 'none',
    width: '100%',
    textAlign: 'left',
  };

  const shortcutStyle: React.CSSProperties = {
    marginLeft: 'auto',
    color: 'var(--text-muted)',
    fontSize: 'var(--font-xs)',
  };

  const dividerStyle: React.CSSProperties = {
    height: '1px',
    background: 'var(--border-default)',
    margin: 'var(--spacing-xs) 0',
  };

  return (
    <div ref={menuRef} style={menuStyle} className={className}>
      {items.map((item) => {
        if (item.divider) {
          return <div key={item.id} style={dividerStyle} />;
        }
        return (
          <button
            key={item.id}
            style={{
              ...itemStyle,
              opacity: item.disabled ? 0.4 : 1,
              cursor: item.disabled ? 'not-allowed' : 'pointer',
            }}
            disabled={item.disabled}
            onClick={() => {
              if (!item.disabled) {
                item.onClick();
                onClose();
              }
            }}
            onMouseEnter={(e) => {
              if (!item.disabled) {
                (e.currentTarget as HTMLElement).style.background = 'var(--bg-surface)';
              }
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'none';
            }}
          >
            {item.icon && <Icon name={item.icon as any} size={14} />}
            <span>{item.label}</span>
            {item.shortcut && <span style={shortcutStyle}>{item.shortcut}</span>}
          </button>
        );
      })}
    </div>
  );
};
