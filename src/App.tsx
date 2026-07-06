import React, { useRef, useState, useCallback } from 'react';
import { Engine } from '@/core/Engine';
import { PerformanceStats } from '@/types';
import { ThemeProvider, useTheme } from '@/theme';
import { useKeyboard } from '@/hooks/useKeyboard';
import { useToast, ToastProvider } from '@/components/feedback/ToastContext';
import { CommandPalette, CommandItem } from '@/components/navigation/CommandPalette';
import { ContextMenu, ContextMenuItem } from '@/components/navigation/ContextMenu';
import { ComponentShowcase } from '@/components/showcase/ComponentShowcase';
import { TopToolbar } from '@/components/layout/TopToolbar';
import { LeftSidebar } from '@/components/layout/LeftSidebar';
import { RightInspector } from '@/components/layout/RightInspector';
import { StatusBar } from '@/components/layout/StatusBar';
import { Canvas } from '@/components/canvas/Canvas';
import { Splitter } from '@/components/base/Splitter';
import './App.css';

const INITIAL_STATS: PerformanceStats = {
  fps: 0,
  frameTime: 0,
  objectCount: 0,
  cameraX: 0,
  cameraY: 0,
  zoom: 1,
};

const MIN_SIDEBAR = 40;
const MAX_SIDEBAR = 500;
const MIN_INSPECTOR = 200;
const MAX_INSPECTOR = 600;
const MIN_TOOLBAR = 36;
const MAX_TOOLBAR = 120;
const MIN_STATUS = 24;
const MAX_STATUS = 60;

const AppContent: React.FC = () => {
  const engineRef = useRef<Engine | null>(null);
  const [stats, setStats] = useState<PerformanceStats>(INITIAL_STATS);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [showShowcase, setShowShowcase] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const { addToast } = useToast();
  const { toggleTheme } = useTheme();

  const [leftWidth, setLeftWidth] = useState(260);
  const [rightWidth, setRightWidth] = useState(300);
  const [toolbarHeight, setToolbarHeight] = useState(48);
  const [statusHeight, setStatusHeight] = useState(28);

  const handleLeftResize = useCallback((delta: number) => {
    setLeftWidth((prev) => Math.min(MAX_SIDEBAR, Math.max(MIN_SIDEBAR, prev + delta)));
  }, []);

  const handleRightResize = useCallback((delta: number) => {
    setRightWidth((prev) => Math.min(MAX_INSPECTOR, Math.max(MIN_INSPECTOR, prev - delta)));
  }, []);

  const handleToolbarResize = useCallback((delta: number) => {
    setToolbarHeight((prev) => Math.min(MAX_TOOLBAR, Math.max(MIN_TOOLBAR, prev + delta)));
  }, []);

  const handleStatusResize = useCallback((delta: number) => {
    setStatusHeight((prev) => Math.min(MAX_STATUS, Math.max(MIN_STATUS, prev - delta)));
  }, []);

  useKeyboard([
    {
      key: 'p',
      ctrl: true,
      shift: true,
      handler: () => setShowCommandPalette((v) => !v),
    },
    {
      key: 'd',
      ctrl: true,
      shift: true,
      handler: () => setShowShowcase((v) => !v),
    },
  ]);

  const commands: CommandItem[] = [
    { id: 'showcase', label: 'Open Component Showcase', description: 'Browse the design system library', icon: 'Grid', shortcut: '\u2303\u21E7D', onExecute: () => setShowShowcase(true) },
    { id: 'palette', label: 'Toggle Command Palette', description: 'Show or hide command palette', icon: 'Command', shortcut: '\u2303\u21E7P', onExecute: () => setShowCommandPalette((v) => !v) },
    { id: 'toggle-theme', label: 'Toggle Theme', description: 'Switch between dark and light mode', icon: 'Settings', onExecute: () => toggleTheme() },
    { id: 'reset-camera', label: 'Reset Camera', description: 'Reset view to center', icon: 'Refresh', onExecute: () => { const e = engineRef.current; if (e) { e.camera.pan(0, 0); } } },
    { id: 'show-info', label: 'Show System Info', description: 'Display system information toast', icon: 'Info', onExecute: () => addToast('Stratoscope v0.1.0 | Rendering: Canvas 2D | Theme: Dark', 'info') },
  ];

  const contextMenuItems: ContextMenuItem[] = [
    { id: 'cut', label: 'Cut', icon: 'X', shortcut: 'Ctrl+X', onClick: () => addToast('Cut (placeholder)', 'info') },
    { id: 'copy', label: 'Copy', icon: 'Copy', shortcut: 'Ctrl+C', onClick: () => addToast('Copy (placeholder)', 'info') },
    { id: 'paste', label: 'Paste', icon: 'Plus', shortcut: 'Ctrl+V', onClick: () => addToast('Paste (placeholder)', 'info') },
    { id: 'div1', divider: true, label: '', onClick: () => {} },
    { id: 'duplicate', label: 'Duplicate', icon: 'Copy', onClick: () => addToast('Duplicate (placeholder)', 'info') },
    { id: 'delete', label: 'Delete', icon: 'Trash', onClick: () => addToast('Delete (placeholder)', 'error') },
    { id: 'div2', divider: true, label: '', onClick: () => {} },
    { id: 'properties', label: 'Properties', icon: 'Settings', onClick: () => addToast('Properties (placeholder)', 'info') },
  ];

  return (
    <div
      className="app-layout"
      style={{
        gridTemplateColumns: `${leftWidth}px 1fr ${rightWidth}px`,
        gridTemplateRows: `${toolbarHeight}px 1fr ${statusHeight}px`,
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        setContextMenu({ x: e.clientX, y: e.clientY });
      }}
    >
      <TopToolbar onToggleShowcase={() => setShowShowcase((v) => !v)} />
      <LeftSidebar />
      <Canvas engineRef={engineRef} onStatsUpdate={setStats} />
      <RightInspector />
      <StatusBar stats={stats} />

      <Splitter direction="vertical" onResize={handleLeftResize} style={{ left: leftWidth, top: toolbarHeight, bottom: statusHeight }} />
      <Splitter direction="vertical" onResize={handleRightResize} style={{ left: `calc(100% - ${rightWidth}px)`, top: toolbarHeight, bottom: statusHeight }} />
      <Splitter direction="horizontal" onResize={handleToolbarResize} style={{ top: toolbarHeight, left: 0, right: 0 }} />
      <Splitter direction="horizontal" onResize={handleStatusResize} style={{ top: `calc(100% - ${statusHeight}px)`, left: 0, right: 0 }} />

      {contextMenu && (
        <ContextMenu
          items={contextMenuItems}
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
        />
      )}

      <CommandPalette
        visible={showCommandPalette}
        onClose={() => setShowCommandPalette(false)}
        commands={commands}
      />

      <ComponentShowcase
        visible={showShowcase}
        onClose={() => setShowShowcase(false)}
      />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;
