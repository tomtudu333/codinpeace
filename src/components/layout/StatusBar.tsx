import React from 'react';
import { PerformanceStats } from '@/types';
import './StatusBar.css';

interface StatusBarProps {
  stats: PerformanceStats;
}

export const StatusBar: React.FC<StatusBarProps> = ({ stats }) => {
  return (
    <footer className="status-bar">
      <div className="status-section">
        <div className="status-item">
          <span className="status-dot status-dot--green" />
          <span className="status-value status-value--mono">{stats.fps}</span>
          <span className="status-label">FPS</span>
        </div>
        <div className="status-separator" />
        <div className="status-item">
          <span className="status-label">Frame</span>
          <span className="status-value status-value--mono">{stats.frameTime}ms</span>
        </div>
        <div className="status-separator" />
        <div className="status-item">
          <span className="status-label">Objects</span>
          <span className="status-value status-value--mono">{stats.objectCount}</span>
        </div>
      </div>

      <div className="status-section">
        <div className="status-item">
          <span className="status-label">Selection</span>
          <span className="status-value">—</span>
        </div>
        <div className="status-separator" />
        <div className="status-item">
          <span className="status-label">Mode</span>
          <span className="status-value status-value--accent">Select</span>
        </div>
        <div className="status-separator" />
        <div className="status-item">
          <span className="status-label">Renderer</span>
          <span className="status-value">Canvas 2D</span>
        </div>
        <div className="status-separator" />
        <div className="status-item">
          <span className="status-label">Memory</span>
          <span className="status-value">—</span>
        </div>
        <div className="status-separator" />
        <div className="status-item">
          <span className="status-label">Workspace</span>
          <span className="status-value">Local</span>
        </div>
      </div>

      <div className="status-section">
        <div className="status-item">
          <span className="status-label">X</span>
          <span className="status-value status-value--mono">{stats.cameraX}</span>
        </div>
        <div className="status-separator" />
        <div className="status-item">
          <span className="status-label">Y</span>
          <span className="status-value status-value--mono">{stats.cameraY}</span>
        </div>
        <div className="status-separator" />
        <div className="status-item">
          <span className="status-label">Zoom</span>
          <span className="status-value status-value--mono">{stats.zoom}x</span>
        </div>
      </div>
    </footer>
  );
};
