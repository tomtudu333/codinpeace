import React, { useState, useEffect, useRef } from 'react';
import { Icon, IconName } from '@/icons';

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: IconName;
  shortcut?: string;
  category?: string;
  onExecute: () => void;
}

interface CommandPaletteProps {
  visible: boolean;
  onClose: () => void;
  commands: CommandItem[];
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  visible,
  onClose,
  commands,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = query
    ? commands.filter(
        (c) =>
          c.label.toLowerCase().includes(query.toLowerCase()) ||
          c.description?.toLowerCase().includes(query.toLowerCase()) ||
          c.category?.toLowerCase().includes(query.toLowerCase())
      )
    : commands;

  useEffect(() => {
    if (visible) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [visible]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      filtered[selectedIndex].onExecute();
      onClose();
    }
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 400,
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '15vh',
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '520px',
          maxHeight: '400px',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--bg-surface-raised)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-xl)',
          backdropFilter: 'blur(20px)',
          overflow: 'hidden',
          animation: 'scaleIn var(--anim-fast) var(--ease-out) forwards',
        }}
      >
        <div style={{ position: 'relative', padding: '12px 14px', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', display: 'flex' }}>
            <Icon name="Command" size={15} />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a command..."
            aria-label="Command search"
            style={{
              width: '100%',
              height: '32px',
              padding: '0 10px 0 30px',
              fontSize: '14px',
              color: 'var(--text-primary)',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontFamily: 'inherit',
            }}
          />
        </div>
        <div style={{ flex: 1, overflow: 'auto', padding: '4px' }}>
          {filtered.length === 0 && (
            <div style={{ padding: '20px', textAlign: 'center', fontSize: '12px', color: 'var(--text-muted)' }}>
              No commands found
            </div>
          )}
          {filtered.map((cmd, i) => (
            <button
              key={cmd.id}
              onClick={() => { cmd.onExecute(); onClose(); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                width: '100%',
                padding: '8px 12px',
                fontSize: '12px',
                fontWeight: 500,
                color: i === selectedIndex ? 'var(--text-primary)' : 'var(--text-secondary)',
                background: i === selectedIndex ? 'var(--accent-primary-dim)' : 'transparent',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                fontFamily: 'inherit',
                textAlign: 'left',
                transition: 'background var(--anim-fast)',
              }}
            >
              {cmd.icon && (
                <span style={{ display: 'flex', color: i === selectedIndex ? 'var(--accent-primary)' : 'var(--text-muted)', flexShrink: 0 }}>
                  <Icon name={cmd.icon} size={15} />
                </span>
              )}
              <div style={{ flex: 1 }}>
                <div style={{ lineHeight: 1.3 }}>{cmd.label}</div>
                {cmd.description && (
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', lineHeight: 1.3, marginTop: '1px' }}>
                    {cmd.description}
                  </div>
                )}
              </div>
              {cmd.shortcut && (
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', flexShrink: 0 }}>
                  {cmd.shortcut}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export type { CommandItem };
