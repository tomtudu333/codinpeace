import React from 'react';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  className?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  disabled = false,
  label,
  className,
}) => {
  const containerStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--spacing-sm)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
  };

  const trackStyle: React.CSSProperties = {
    width: '28px',
    height: '16px',
    borderRadius: '8px',
    background: checked ? 'var(--accent-primary)' : 'var(--border-default)',
    position: 'relative',
    transition: 'background var(--anim-fast)',
    flexShrink: 0,
  };

  const thumbStyle: React.CSSProperties = {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    background: 'white',
    position: 'absolute',
    top: '2px',
    left: checked ? '14px' : '2px',
    transition: 'left var(--anim-fast)',
    boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
  };

  const labelStyle: React.CSSProperties = {
    color: 'var(--text-primary)',
    fontSize: 'var(--font-sm)',
  };

  return (
    <div
      style={containerStyle}
      className={className}
      onClick={() => {
        if (!disabled) onChange(!checked);
      }}
    >
      <div style={trackStyle}>
        <div style={thumbStyle} />
      </div>
      {label && <span style={labelStyle}>{label}</span>}
    </div>
  );
};
