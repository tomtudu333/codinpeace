import React from 'react';
import './RightInspector.css';

export const RightInspector: React.FC = () => {
  return (
    <aside className="right-inspector">
      <div className="inspector-header">
        <span className="inspector-label">Properties</span>
      </div>
      <div className="inspector-content">
        <div className="inspector-empty">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="inspector-empty-icon">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
            <path d="M12 7v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="12" cy="16" r="0.75" fill="currentColor" />
          </svg>
          <span className="inspector-empty-text">Nothing selected</span>
          <span className="inspector-empty-hint">Select an object to inspect its properties</span>
        </div>
      </div>
    </aside>
  );
};
