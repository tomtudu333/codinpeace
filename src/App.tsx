import React, { useRef, useState } from 'react';
import { Engine } from '@/core/Engine';
import { PerformanceStats } from '@/types';
import { TopToolbar } from '@/components/layout/TopToolbar';
import { LeftSidebar } from '@/components/layout/LeftSidebar';
import { RightInspector } from '@/components/layout/RightInspector';
import { StatusBar } from '@/components/layout/StatusBar';
import { Canvas } from '@/components/canvas/Canvas';
import './App.css';

const INITIAL_STATS: PerformanceStats = {
  fps: 0,
  frameTime: 0,
  objectCount: 0,
  cameraX: 0,
  cameraY: 0,
  zoom: 1,
};

const App: React.FC = () => {
  const engineRef = useRef<Engine | null>(null);
  const [stats, setStats] = useState<PerformanceStats>(INITIAL_STATS);

  return (
    <div className="app-layout">
      <TopToolbar />
      <LeftSidebar />
      <Canvas engineRef={engineRef} onStatsUpdate={setStats} />
      <RightInspector />
      <StatusBar stats={stats} />
    </div>
  );
};

export default App;
