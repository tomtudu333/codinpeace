import React from 'react';
import { Icon } from '../../icons';
import type { IconName } from '../../icons';

interface NavigationItemProps {
  icon?: IconName;
  label: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

const NavigationItem: React.FC<NavigationItemProps> = ({
  icon,
  label,
  active = false,
  onClick,
  className,
  children,
}) => {
  return (
    <div
      className={className}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--spacing-sm)',
        padding: '8px 12px',
        cursor: 'pointer',
        borderRadius: 'var(--radius-md)',
        color: active ? 'var(--accent-primary)' : 'var(--text-primary)',
        background: active ? 'var(--accent-primary-dim, rgba(var(--accent-primary), 0.1))' : 'transparent',
        transition: 'background var(--anim-fast, 0.15s) ease, color var(--anim-fast, 0.15s) ease',
        userSelect: 'none',
      }}
    >
      {icon && <Icon name={icon} size={16} />}
      <span style={{ fontSize: 'var(--font-sm)' }}>{label}</span>
      {children}
    </div>
  );
};

export default NavigationItem;
