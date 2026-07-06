import React from 'react';

interface PropertyRowProps {
  label: string;
  value: React.ReactNode;
  className?: string;
}

export const PropertyRow: React.FC<PropertyRowProps> = ({ label, value, className = '' }) => {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '3px 0',
        fontSize: '11px',
      }}
    >
      <span style={{ color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{label}</span>
      <span style={{ color: 'var(--text-primary)', fontWeight: 500, textAlign: 'right' }}>{value}</span>
    </div>
  );
};
