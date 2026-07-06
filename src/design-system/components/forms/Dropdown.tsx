import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Icon } from '../../icons';

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
  placeholder?: string;
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  value,
  onChange,
  options,
  placeholder = 'Select...',
  className,
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  const triggerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 'var(--spacing-sm)',
    padding: 'var(--spacing-sm) var(--spacing-md)',
    background: 'var(--bg-surface)',
    border: '1px solid var(--border-default)',
    borderRadius: 'var(--radius-md)',
    color: selected ? 'var(--text-primary)' : 'var(--text-muted)',
    fontSize: 'var(--font-sm)',
    cursor: 'pointer',
    minWidth: '140px',
    transition: 'border-color var(--anim-fast)',
  };

  const listStyle: React.CSSProperties = {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    marginTop: '4px',
    background: 'var(--bg-surface-raised)',
    border: '1px solid var(--border-default)',
    borderRadius: 'var(--radius-md)',
    boxShadow: 'var(--shadow-lg)',
    zIndex: 'var(--z-modal)',
    overflow: 'hidden',
  };

  const itemStyle: React.CSSProperties = {
    padding: 'var(--spacing-sm) var(--spacing-md)',
    cursor: 'pointer',
    color: 'var(--text-primary)',
    fontSize: 'var(--font-sm)',
    transition: 'background var(--anim-fast)',
  };

  const handleSelect = useCallback(
    (optValue: string) => {
      onChange(optValue);
      setOpen(false);
    },
    [onChange]
  );

  return (
    <div ref={containerRef} style={{ position: 'relative' }} className={className}>
      <div
        style={triggerStyle}
        onClick={() => setOpen((prev) => !prev)}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-primary)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-default)';
        }}
      >
        <span>{selected ? selected.label : placeholder}</span>
        <Icon name="ChevronDown" size={14} />
      </div>
      {open && (
        <div style={listStyle}>
          {options.map((opt) => (
            <div
              key={opt.value}
              style={{
                ...itemStyle,
                background: opt.value === value ? 'var(--bg-surface)' : 'transparent',
                fontWeight: opt.value === value ? 600 : 400,
              }}
              onClick={() => handleSelect(opt.value)}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'var(--bg-surface)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  opt.value === value ? 'var(--bg-surface)' : 'transparent';
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
