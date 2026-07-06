import React from 'react';

interface SidebarProps {
  children: React.ReactNode;
  width?: string;
  collapsed?: boolean;
  onToggle?: () => void;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  children,
  width = '260px',
  collapsed = false,
  className,
}) => {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: collapsed ? '0px' : width,
        minWidth: collapsed ? '0px' : width,
        overflow: 'hidden',
        background: 'var(--bg-surface)',
        borderRight: '1px solid var(--border-default)',
        transition: `width var(--anim-fast, 0.15s) ease`,
      }}
    >
      {children}
    </div>
  );
};

export default Sidebar;
