import React from 'react';
import './LeftSidebar.css';

export const LeftSidebar: React.FC = () => {
  return (
    <aside className="left-sidebar">
      <div className="sidebar-header">
        <span className="sidebar-label">Explorer</span>
      </div>
      <div className="sidebar-content">
        <div className="sidebar-empty">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="sidebar-empty-icon">
            <path d="M4 4h16v16H4V4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M4 8h16" stroke="currentColor" strokeWidth="1.5" />
            <path d="M8 4v16" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <span className="sidebar-empty-text">No modules loaded</span>
          <span className="sidebar-empty-hint">Future phases will populate this panel</span>
        </div>
      </div>
    </aside>
  );
};
