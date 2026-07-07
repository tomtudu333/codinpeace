import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { SceneNode, getFunctionMetadata, getFeatureMetadata } from '@/scene';
import { FunctionCodeBox } from './FunctionCodeBox';
import { FunctionCanvasConnectors } from './FunctionCanvasConnectors';
import { MiniMap } from './MiniMap';
import { Breadcrumb } from './Breadcrumb';

interface FunctionCanvasProps {
  featureNode: SceneNode;
  functions: SceneNode[];
  accentColor: string;
  onSelectFunction: (id: string) => void;
  onNavigate: (id: string, type: string) => void;
  cameraX: number;
  cameraY: number;
  zoom: number;
  viewport: { width: number; height: number };
}

export const FunctionCanvas: React.FC<FunctionCanvasProps> = React.memo(({
  featureNode, functions, accentColor, onSelectFunction, onNavigate,
  cameraX, cameraY, zoom, viewport,
}) => {
  const featureMeta = getFeatureMetadata(featureNode);
  const [selectedFnId, setSelectedFnId] = useState<string | null>(null);
  const [focusedFnId, setFocusedFnId] = useState<string | null>(null);
  const [canvasZoom, setCanvasZoom] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const CANVAS_PADDING = 60;

  const canvasBounds = useMemo(() => {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const fn of functions) {
      const meta = getFunctionMetadata(fn);
      if (!meta) continue;
      const x = fn.position.x ?? 0;
      const y = fn.position.y ?? 0;
      const w = fn.size?.width ?? meta.width ?? 320;
      const h = fn.size?.height ?? meta.height ?? 240;
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x + w);
      maxY = Math.max(maxY, y + h);
    }
    if (minX === Infinity) return { width: 800, height: 600 };
    return {
      width: maxX - minX + CANVAS_PADDING * 2,
      height: maxY - minY + CANVAS_PADDING * 2,
    };
  }, [functions]);

  const handleSelect = useCallback((id: string) => {
    setSelectedFnId(id);
    setFocusedFnId(id);
    onSelectFunction(id);
  }, [onSelectFunction]);

  const handleBreadcrumbNavigate = useCallback((id: string, type: string) => {
    onNavigate(id, type);
  }, [onNavigate]);

  const handleContainerClick = useCallback(() => {
    setSelectedFnId(null);
    onSelectFunction(featureNode.id);
  }, [featureNode.id, onSelectFunction]);

  useEffect(() => {
    const MIN_CANVAS_ZOOM = 0.5;
    const MAX_CANVAS_ZOOM = 2.5;
    const rawZoom = zoom * 1.2;
    setCanvasZoom(Math.max(MIN_CANVAS_ZOOM, Math.min(MAX_CANVAS_ZOOM, rawZoom)));
  }, [zoom]);

  const breadcrumbItems = useMemo(() => [
    { id: featureNode.parent?.id ?? '', label: featureNode.parent?.name ?? 'Modules', type: 'module' as const },
    { id: featureNode.id, label: featureMeta?.name ?? featureNode.name, type: 'feature' as const },
    { id: 'canvas', label: 'Function Canvas', type: 'function' as const },
  ], [featureNode, featureMeta]);

  return (
    <div
      ref={containerRef}
      onClick={handleContainerClick}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        background: 'rgba(10, 10, 16, 0.92)',
        backdropFilter: 'blur(4px)',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 12px',
        flexShrink: 0,
        borderBottom: '1px solid var(--border-subtle)',
        background: 'rgba(10, 10, 16, 0.6)',
      }}>
        <Breadcrumb
          items={breadcrumbItems}
          onNavigate={handleBreadcrumbNavigate}
          accentColor={accentColor}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
          <span>{functions.length} functions</span>
          <span>Zoom: {canvasZoom.toFixed(1)}x</span>
        </div>
      </div>

      <div style={{
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <FunctionCanvasConnectors
          functions={functions}
          selectedId={selectedFnId}
          focusedId={focusedFnId}
          canvasZoom={canvasZoom}
        />

        {functions.map((fn) => {
          const meta = getFunctionMetadata(fn);
          if (!meta) return null;
          return (
            <FunctionCodeBox
              key={fn.id}
              node={fn}
              canvasZoom={canvasZoom}
              isSelected={fn.id === selectedFnId}
              isFocused={fn.id === focusedFnId}
              isDimmed={selectedFnId !== null && fn.id !== selectedFnId && focusedFnId !== fn.id}
              onSelect={handleSelect}
            />
          );
        })}

        <MiniMap
          functions={functions}
          selectedId={selectedFnId}
          focusedId={focusedFnId}
          viewport={viewport}
          canvasWidth={canvasBounds.width}
          canvasHeight={canvasBounds.height}
          cameraX={cameraX}
          cameraY={cameraY}
          zoom={zoom}
        />
      </div>
    </div>
  );
});

FunctionCanvas.displayName = 'FunctionCanvas';
