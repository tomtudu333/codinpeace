import React from 'react';
import { IconButton } from '@/components/base/IconButton';
import './TopToolbar.css';

interface TopToolbarProps {
  onToggleShowcase?: () => void;
}

export const TopToolbar: React.FC<TopToolbarProps> = ({ onToggleShowcase }) => {
  return (
    <header className="top-toolbar">
      <div className="toolbar-left">
        <div className="toolbar-logo">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="1" y="1" width="6.4" height="6.4" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
            <rect x="10.6" y="1" width="6.4" height="6.4" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
            <rect x="1" y="10.6" width="6.4" height="6.4" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
            <rect x="10.6" y="10.6" width="6.4" height="6.4" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <span className="toolbar-title">Stratoscope</span>
        </div>
      </div>

      <div className="toolbar-center">
        <div className="toolbar-btn-group">
          <IconButton icon="Home" variant="ghost" title="Home" />
          <IconButton icon="Search" variant="ghost" title="Search" />
          <IconButton icon="Layers" variant="ghost" title="Layers" />
          <div className="toolbar-separator" />
          <IconButton icon="Settings" variant="ghost" title="Settings" />
          <IconButton icon="Help" variant="ghost" title="Help" />
          <div className="toolbar-separator" />
          <IconButton
            icon="Grid"
            variant="ghost"
            title="Component Showcase (Ctrl+Shift+D)"
            onClick={onToggleShowcase}
          />
        </div>
      </div>

      <div className="toolbar-right">
        <div className="toolbar-badge">v0.1.0</div>
      </div>
    </header>
  );
};
