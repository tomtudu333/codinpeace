import React from 'react';
import { Icon } from '../../icons';

interface ChipProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  onRemove?: () => void;
  className?: string;
}

export const Chip: React.FC<ChipProps> = ({ children, active = false, onClick, onRemove, className }) => {
  const [hovered, setHovered] = React.useState(false);

  const style: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--spacing-xs)',
    padding: '2px var(--spacing-sm)',
    fontSize: 'var(--font-sm)',
    fontWeight: 500,
    background: active ? 'var(--accent-primary-dim)' : hovered ? 'var(--bg-surface)' : 'var(--bg-surface)',
    color: active ? 'var(--accent-primary)' : 'var(--text-primary)',
    border: `1px solid ${active ? 'var(--accent-primary)' : 'var(--border-default)'}`,
    borderRadius: 'var(--radius-md)',
    cursor: onClick ? 'pointer' : 'default',
    transition: 'all var(--anim-fast)',
    lineHeight: 1.4,
  };

  return (
    <button
      style={style}
      onClick={onClick}
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      type="button"
    >
      {children}
      {onRemove && (
        <span
          style={{ display: 'inline-flex', cursor: 'pointer', marginLeft: 'var(--spacing-xs)', color: 'var(--text-secondary)' }}
          onClick={(e) => { e.stopPropagation(); onRemove(); }}
        >
          <Icon name="X" size={12} />
        </span>
      )}
    </button>
  );
};
