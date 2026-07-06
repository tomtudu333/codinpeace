import React from 'react';
import { Icon } from '@/icons';

interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const SearchField: React.FC<SearchFieldProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
  className = '',
  style,
}) => {
  return (
    <div
      className={`search-field ${className}`}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        ...style,
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: '10px',
          color: 'var(--text-muted)',
          pointerEvents: 'none',
          display: 'flex',
        }}
      >
        <Icon name="Search" size={13} />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        style={{
          width: '100%',
          height: '30px',
          padding: '0 10px 0 30px',
          fontSize: '12px',
          color: 'var(--text-primary)',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-sm)',
          outline: 'none',
          fontFamily: 'inherit',
          transition: 'border-color var(--anim-fast) var(--ease-out)',
        }}
        onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--border-accent)'; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; }}
      />
    </div>
  );
};
