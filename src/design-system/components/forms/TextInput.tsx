import React from 'react';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  error?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  placeholder,
  type = 'text',
  disabled = false,
  error,
  className,
  style,
}) => {
  const baseStyle: React.CSSProperties = {
    width: '100%',
    padding: 'var(--spacing-sm) var(--spacing-md)',
    background: 'var(--bg-surface)',
    border: error
      ? '1px solid var(--accent-danger)'
      : '1px solid var(--border-default)',
    borderRadius: 'var(--radius-md)',
    color: 'var(--text-primary)',
    fontSize: 'var(--font-sm)',
    outline: 'none',
    transition: 'border-color var(--anim-fast)',
    ...(disabled ? { opacity: 0.5, cursor: 'not-allowed' } : {}),
    ...style,
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-xs)',
  };

  const errorStyle: React.CSSProperties = {
    color: 'var(--accent-danger)',
    fontSize: 'var(--font-xs)',
  };

  return (
    <div style={containerStyle} className={className}>
      <input
        style={baseStyle}
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        onFocus={(e) => {
          if (!error) {
            e.currentTarget.style.borderColor = 'var(--accent-primary)';
          }
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = error
            ? 'var(--accent-danger)'
            : 'var(--border-default)';
        }}
      />
      {error && <span style={errorStyle}>{error}</span>}
    </div>
  );
};
