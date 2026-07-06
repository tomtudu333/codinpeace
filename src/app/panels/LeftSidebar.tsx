import React, { useState } from 'react';
import { Icon, IconButton, Divider } from '@/design-system';
import { ModuleRecord } from '@/data';
import './LeftSidebar.css';

interface LeftSidebarProps {
  modules?: ModuleRecord[];
  onNavigateModule?: (moduleId: string) => void;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({ modules = [], onNavigateModule }) => {
  const [collapsed, setCollapsed] = useState(false);

  if (collapsed) {
    return (
      <aside className="left-sidebar left-sidebar--collapsed">
        <div className="sidebar-collapsed-header">
          <IconButton
            icon="Sidebar"
            variant="ghost"
            size={14}
            onClick={() => setCollapsed(false)}
            title="Expand sidebar"
          />
        </div>
        <div className="sidebar-collapsed-items">
          {modules.map((mod) => (
            <IconButton
              key={mod.id}
              icon={mod.icon as any}
              variant="ghost"
              size={14}
              onClick={() => onNavigateModule?.(mod.id)}
              title={mod.name}
            />
          ))}
        </div>
      </aside>
    );
  }

  return (
    <aside className="left-sidebar">
      <div className="sidebar-header">
        <span className="sidebar-label">Explorer</span>
        <IconButton icon="Sidebar" variant="ghost" size={12} onClick={() => setCollapsed(true)} title="Collapse sidebar" />
      </div>

      <div className="sidebar-content-list">
        <div className="sidebar-category">
          <div className="sidebar-category-title">Modules ({modules.length})</div>
          {modules.map((mod) => (
            <button
              key={mod.id}
              className="sidebar-nav-item"
              onClick={() => onNavigateModule?.(mod.id)}
            >
              <span className="sidebar-nav-icon">
                <Icon name={mod.icon as any} size={14} />
              </span>
              <span className="sidebar-nav-label">{mod.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 'auto', padding: '8px 12px' }}>
        <Divider />
        <div className="sidebar-footer-info">
          <Icon name="Info" size={10} />
          <span>{modules.length} modules loaded</span>
        </div>
      </div>
    </aside>
  );
};
