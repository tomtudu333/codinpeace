import React, { useMemo } from 'react';
import { SceneNode, getFunctionMetadata } from '@/scene';

interface MiniMapProps {
  functions: SceneNode[];
  selectedId: string | null;
  focusedId: string | null;
  viewport: { width: number; height: number };
  canvasWidth: number;
  canvasHeight: number;
  cameraX: number;
  cameraY: number;
  zoom: number;
}

export const MiniMap: React.FC<MiniMapProps> = React.memo(({
  functions, selectedId, focusedId, viewport, canvasWidth, canvasHeight,
  cameraX, cameraY, zoom,
}) => {
  const miniW = 160;
  const miniH = 100;

  const scale = useMemo(() => {
    const sx = miniW / canvasWidth;
    const sy = miniH / canvasHeight;
    return Math.min(sx, sy, 1) * 0.85;
  }, [canvasWidth, canvasHeight]);

  const offsetX = (miniW - canvasWidth * scale) / 2;
  const offsetY = (miniH - canvasHeight * scale) / 2;

  const vpX = (cameraX - viewport.width / 2 / zoom) * scale + offsetX;
  const vpY = (cameraY - viewport.height / 2 / zoom) * scale + offsetY;
  const vpW = (viewport.width / zoom) * scale;
  const vpH = (viewport.height / zoom) * scale;

  return (
    <div style={{
      position: 'absolute', bottom: 12, right: 12,
      width: miniW, height: miniH,
      borderRadius: '6px',
      background: 'rgba(10, 10, 16, 0.85)',
      border: '1px solid var(--border-subtle)',
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: 100,
      backdropFilter: 'blur(6px)',
    }}>
      <svg width={miniW} height={miniH}>
        {functions.map((fn) => {
          const meta = getFunctionMetadata(fn);
          if (!meta) return null;
          const x = (fn.position.x ?? 0) * scale + offsetX;
          const y = (fn.position.y ?? 0) * scale + offsetY;
          const w = (fn.size?.width ?? 320) * scale;
          const h = (fn.size?.height ?? 240) * scale;
          const isSel = fn.id === selectedId;
          const isFoc = fn.id === focusedId;
          return (
            <rect
              key={fn.id}
              x={x} y={y} width={Math.max(3, w)} height={Math.max(2, h)}
              rx={1.5}
              fill={isSel ? meta.accentColor : isFoc ? `${meta.accentColor}80` : `${meta.accentColor}30`}
              stroke={isSel ? meta.accentColor : 'transparent'}
              strokeWidth={isSel ? 1 : 0}
            />
          );
        })}
        <rect
          x={Math.max(0, vpX)} y={Math.max(0, vpY)}
          width={Math.min(miniW, Math.max(10, vpW))}
          height={Math.min(miniH, Math.max(8, vpH))}
          rx={2}
          fill="none"
          stroke="var(--accent-primary)"
          strokeWidth={1}
          strokeDasharray="2 2"
          opacity={0.7}
        />
      </svg>
    </div>
  );
});

MiniMap.displayName = 'MiniMap';
