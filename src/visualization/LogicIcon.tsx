import React, { useState } from 'react';
import type { LogicIconDef } from '@/data';

interface LogicIconProps {
  icon: LogicIconDef;
  size?: number;
}

const iconSymbols: Record<string, string> = {
  If: 'if', Else: 'else', Switch: 'sw', Loop: '↻', Return: '→',
  Select: '◉', Insert: '⊕', Update: '✎', Delete: '⊘', Transaction: '⚡',
  REST: '↔', GraphQL: '◈', Queue: '☰', WebSocket: '⇄',
  Login: '🔑', Permission: '🔒', JWT: '🔐', Session: '⏳',
  Cache: '◎', Async: '⚙',
  Try: '✓', Catch: '✗', Throw: '⚠', Validation: '✔', Logging: '☰',
  Regex: '∗', Date: '📅', String: 'Aa', Array: '[]', Object: '{}', Math: '∑',
};

export const LogicIcon: React.FC<LogicIconProps> = React.memo(({ icon, size = 16 }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size + 4,
        height: size + 4,
        borderRadius: '3px',
        background: hovered ? `${icon.accentColor}25` : `${icon.accentColor}12`,
        color: icon.accentColor,
        fontSize: Math.max(7, size * 0.5),
        fontWeight: 700,
        fontFamily: 'monospace',
        cursor: 'default',
        transition: 'background 0.12s ease, transform 0.12s ease',
        transform: hovered ? 'scale(1.15)' : 'scale(1)',
        border: `1px solid ${icon.accentColor}30`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title={`${icon.name} (${icon.count})`}
    >
      {iconSymbols[icon.name] ?? icon.name.slice(0, 2)}
      {icon.count > 1 && (
        <span style={{
          position: 'absolute', top: -3, right: -3,
          fontSize: Math.max(6, size * 0.38),
          color: '#fff',
          background: icon.accentColor,
          borderRadius: '50%',
          width: Math.max(10, size * 0.6),
          height: Math.max(10, size * 0.6),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 700,
          lineHeight: 1,
        }}>
          {icon.count}
        </span>
      )}
    </div>
  );
});

LogicIcon.displayName = 'LogicIcon';
