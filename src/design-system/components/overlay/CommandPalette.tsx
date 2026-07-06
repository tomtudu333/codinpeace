import React, { useEffect, useState, useRef } from 'react';
import { Icon } from '../../icons';
import { animations } from '../../animation';

export interface Command {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  shortcut?: string;
  onExecute: () => void;
}

interface CommandPaletteProps {
  visible: boolean;
  onClose: () => void;
  commands: Command[];
  className?: string;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  visible,
  onClose,
  commands,
  className,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (visible) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filtered.length);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
      }
      if (e.key === 'Enter' && filtered[selectedIndex]) {
        filtered[selectedIndex].onExecute();
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [visible, filtered, selectedIndex, onClose]);

  const backdropStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    background: 'var(--bg-overlay)',
    zIndex: 'var(--z-modal)',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: '15vh',
  };

  const panelStyle: React.CSSProperties = {
    background: 'var(--bg-surface-raised)',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--border-default)',
    boxShadow: 'var(--shadow-xl)',
    width: '520px',
    maxWidth: '90vw',
    maxHeight: '60vh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    ...animations.slideDown,
  };

  const inputStyle: React.CSSProperties = {
    padding: 'var(--spacing-md) var(--spacing-lg)',
    background: 'var(--bg-surface)',
    border: 'none',
    borderBottom: '1px solid var(--border-default)',
    color: 'var(--text-primary)',
    fontSize: 'var(--font-base)',
    outline: 'none',
    width: '100%',
  };

  const listStyle: React.CSSProperties = {
    overflow: 'auto',
    flex: 1,
    padding: 'var(--spacing-xs) 0',
  };

  const itemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-sm)',
    padding: 'var(--spacing-sm) var(--spacing-lg)',
    cursor: 'pointer',
    color: 'var(--text-primary)',
    fontSize: 'var(--font-sm)',
    transition: 'background var(--anim-fast)',
  };

  const descStyle: React.CSSProperties = {
    color: 'var(--text-muted)',
    fontSize: 'var(--font-xs)',
  };

  const shortcutStyle: React.CSSProperties = {
    marginLeft: 'auto',
    color: 'var(--text-muted)',
    fontSize: 'var(--font-xs)',
  };

  const iconWrapStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    color: 'var(--text-muted)',
  };

  if (!visible) return null;

  return (
    <div style={backdropStyle} onClick={onClose} className={className}>
      <div style={panelStyle} onClick={(e) => e.stopPropagation()}>
        <input
          ref={inputRef}
          style={inputStyle}
          placeholder="Search commands..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedIndex(0);
          }}
        />
        <div style={listStyle}>
          {filtered.map((cmd, idx) => (
            <div
              key={cmd.id}
              style={{
                ...itemStyle,
                background: idx === selectedIndex ? 'var(--accent-primary)' : 'transparent',
                color: idx === selectedIndex ? 'var(--text-on-accent)' : 'var(--text-primary)',
              }}
              onClick={() => {
                cmd.onExecute();
                onClose();
              }}
              onMouseEnter={() => setSelectedIndex(idx)}
            >
              {cmd.icon && (
                <span style={iconWrapStyle}>
                  <Icon name={cmd.icon as any} size={14} />
                </span>
              )}
              <div>
                <div>{cmd.label}</div>
                {cmd.description && <div style={descStyle}>{cmd.description}</div>}
              </div>
              {cmd.shortcut && <span style={shortcutStyle}>{cmd.shortcut}</span>}
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ ...itemStyle, color: 'var(--text-muted)', cursor: 'default' }}>
              No results found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
