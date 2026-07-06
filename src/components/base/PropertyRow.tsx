import React from 'react';

interface PropertyRowProps {
  label: string;
  value: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const PropertyRow: React.FC<PropertyRowProps> = ({
  label,
  value,
  className = '',
  style,
}) => {
  return (
    <div
      className={`property-row ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '6px 0',
        gap: 'var(--spacing-sm)',
        borderBottom: '1px solid var(--border-subtle)',
        ...style,
      }}
    >
      <span
        style={{
          fontSize: '11px',
          fontWeight: 500,
          color: 'var(--text-muted)',
          flexShrink: 0,
          lineHeight: 1,
        }}
      >
        {label}
      </span>
      <div
        style={{
          fontSize: '12px',
          color: 'var(--text-secondary)',
          textAlign: 'right',
          wordBreak: 'break-all',
          lineHeight: 1.3,
        }}
      >
        {value}
      </div>
    </div>
  );
};
