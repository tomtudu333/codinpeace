import React from 'react';
import { PerformanceStats } from '@/types';
import './StatusBar.css';

interface StatusBarProps {
  stats: PerformanceStats;
}

export const StatusBar: React.FC<StatusBarProps> = ({ stats }) => {
  return (
    <footer className="status-bar">
      <div className="status-left">
        <span className="status-item">
          <span className="status-dot status-dot--green" />
          <span className="status-value">{stats.fps} FPS</span>
        </span>
        <span className="status-divider" />
        <span className="status-item">
          <span className="status-label">Frame</span>
          <span className="status-value">{stats.frameTime}ms</span>
        </span>
        <span className="status-divider" />
        <span className="status-item">
          <span className="status-label">Objects</span>
          <span className="status-value">{stats.objectCount}</span>
        </span>
      </div>
      <div className="status-right">
        <span className="status-item">
          <span className="status-label">X</span>
          <span className="status-value status-value--mono">{stats.cameraX}</span>
        </span>
        <span className="status-divider" />
        <span className="status-item">
          <span className="status-label">Y</span>
          <span className="status-value status-value--mono">{stats.cameraY}</span>
        </span>
        <span className="status-divider" />
        <span className="status-item">
          <span className="status-label">Zoom</span>
          <span className="status-value status-value--mono">{stats.zoom}x</span>
        </span>
      </div>
    </footer>
  );
};
