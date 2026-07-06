import React from 'react';
import './TopToolbar.css';

export const TopToolbar: React.FC = () => {
  return (
    <header className="top-toolbar">
      <div className="toolbar-left">
        <div className="toolbar-logo">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect x="1" y="1" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
            <rect x="12" y="1" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
            <rect x="1" y="12" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
            <rect x="12" y="12" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <span className="toolbar-title">CodeMap</span>
        </div>
      </div>
      <div className="toolbar-center">
        <div className="toolbar-pill">
          <span className="toolbar-pill-text">Workspace</span>
        </div>
      </div>
      <div className="toolbar-right">
        <div className="toolbar-badge">v0.1.0</div>
      </div>
    </header>
  );
};
