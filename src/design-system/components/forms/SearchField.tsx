import React from 'react';
import { Icon } from '../../icons';

interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onClear?: () => void;
  className?: string;
}

export const SearchField: React.FC<SearchFieldProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
  onClear,
  className,
}) => {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-xs)',
    padding: 'var(--spacing-sm) var(--spacing-md)',
    background: 'var(--bg-surface)',
    border: '1px solid var(--border-default)',
    borderRadius: 'var(--radius-md)',
    transition: 'border-color var(--anim-fast)',
  };

  const inputStyle: React.CSSProperties = {
    flex: 1,
    border: 'none',
    background: 'none',
    outline: 'none',
    color: 'var(--text-primary)',
    fontSize: 'var(--font-sm)',
  };

  const iconStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    color: 'var(--text-muted)',
    flexShrink: 0,
  };

  const clearBtnStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: 'var(--text-muted)',
    padding: '2px',
    borderRadius: 'var(--radius-sm)',
  };

  return (
    <div
      style={containerStyle}
      className={className}
      onFocus={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-primary)';
      }}
      onBlur={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-default)';
      }}
    >
      <span style={iconStyle}>
        <Icon name="Search" size={14} />
      </span>
      <input
        style={inputStyle}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && onClear && (
        <button style={clearBtnStyle} onClick={onClear}>
          <Icon name="X" size={14} />
        </button>
      )}
    </div>
  );
};
