import React, { useState } from 'react';
import { Icon } from '@/icons';
import { IconButton } from '@/components/base/IconButton';
import { Divider } from '@/components/base/Divider';
import './LeftSidebar.css';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
}

const categories: { title: string; items: NavItem[] }[] = [
  {
    title: 'Navigate',
    items: [
      { id: 'workspace', label: 'Workspace', icon: <Icon name="Folder" size={14} />, active: true },
      { id: 'layers', label: 'Layers', icon: <Icon name="Layers" size={14} /> },
      { id: 'assets', label: 'Assets', icon: <Icon name="File" size={14} /> },
    ],
  },
  {
    title: 'Library',
    items: [
      { id: 'bookmarks', label: 'Bookmarks', icon: <Icon name="Bookmark" size={14} /> },
      { id: 'history', label: 'History', icon: <Icon name="History" size={14} /> },
      { id: 'templates', label: 'Templates', icon: <Icon name="Copy" size={14} /> },
    ],
  },
];

export const LeftSidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeId, setActiveId] = useState('workspace');

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
          {categories.flatMap((c) => c.items).map((item) => (
            <IconButton
              key={item.id}
              icon={item.id as any}
              variant={item.id === activeId ? 'primary' : 'ghost'}
              size={14}
              onClick={() => setActiveId(item.id)}
              title={item.label}
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
        {categories.map((cat) => (
          <div key={cat.title} className="sidebar-category">
            <div className="sidebar-category-title">{cat.title}</div>
            {cat.items.map((item) => (
              <button
                key={item.id}
                className={`sidebar-nav-item ${item.id === activeId ? 'sidebar-nav-item--active' : ''}`}
                onClick={() => setActiveId(item.id)}
              >
                <span className="sidebar-nav-icon">{item.icon}</span>
                <span className="sidebar-nav-label">{item.label}</span>
              </button>
            ))}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 'auto', padding: '8px 12px' }}>
        <Divider />
        <div className="sidebar-footer-info">
          <Icon name="Info" size={10} />
          <span>Placeholder navigation</span>
        </div>
      </div>
    </aside>
  );
};
