import React, { useEffect, useRef, useState } from 'react';
import { SceneNode, getFunctionMetadata } from '@/scene';

interface FunctionCanvasConnectorsProps {
  functions: SceneNode[];
  selectedId: string | null;
  focusedId: string | null;
  canvasZoom: number;
}

interface ConnectorLine {
  from: { x: number; y: number };
  to: { x: number; y: number };
  fromId: string;
  toId: string;
  isHighlighted: boolean;
}

export const FunctionCanvasConnectors: React.FC<FunctionCanvasConnectorsProps> = ({
  functions, selectedId, focusedId, canvasZoom,
}) => {
  const [animatedPaths, setAnimatedPaths] = useState<Set<string>>(new Set());
  const animRef = useRef<number | null>(null);

  const fnMap = useRef<Record<string, SceneNode>>({});
  fnMap.current = {};
  for (const fn of functions) {
    fnMap.current[fn.id] = fn;
  }

  const connectors: ConnectorLine[] = [];

  for (const fn of functions) {
    const meta = getFunctionMetadata(fn);
    if (!meta) continue;
    for (const calledId of meta.calls) {
      const target = fnMap.current[calledId];
      if (!target) continue;
      const fromX = (fn.position.x + (fn.size?.width ?? 320) / 2) * canvasZoom;
      const fromY = (fn.position.y + (fn.size?.height ?? 240)) * canvasZoom;
      const toX = (target.position.x + (target.size?.width ?? 320) / 2) * canvasZoom;
      const toY = target.position.y * canvasZoom;
      const isHighlighted = fn.id === selectedId || fn.id === focusedId ||
        target.id === selectedId || target.id === focusedId;
      connectors.push({ from: { x: fromX, y: fromY }, to: { x: toX, y: toY }, fromId: fn.id, toId: calledId, isHighlighted });
    }
  }

  useEffect(() => {
    const ids = new Set(connectors.map(c => `${c.fromId}→${c.toId}`));
    let idx = 0;
    const tick = () => {
      setAnimatedPaths(new Set(Array.from(ids).slice(0, idx + 1)));
      idx = (idx + 1) % (ids.size + 1);
      animRef.current = window.setTimeout(tick, 300);
    };
    tick();
    return () => { if (animRef.current) clearTimeout(animRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (connectors.length === 0) return null;

  return (
    <svg
      style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', overflow: 'visible', zIndex: 0,
      }}
    >
      <defs>
        {connectors.map((c, i) => (
          <marker
            key={`arrow-${i}`}
            id={`fc-arrow-${i}`}
            markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"
          >
            <path d="M 0 0 L 6 3 L 0 6 Z" fill={c.isHighlighted ? 'var(--accent-primary)' : 'var(--border-default)'} />
          </marker>
        ))}
      </defs>
      {connectors.map((c, i) => {
        const dx = c.to.x - c.from.x;
        const dy = c.to.y - c.from.y;
        const cx1 = c.from.x + dx * 0.4;
        const cy1 = c.from.y + dy * 0.15;
        const cx2 = c.to.x - dx * 0.4;
        const cy2 = c.to.y - dy * 0.15;
        const key = `${c.fromId}→${c.toId}`;
        const isAnimating = animatedPaths.has(key);

        return (
          <g key={key}>
            <path
              d={`M ${c.from.x} ${c.from.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${c.to.x} ${c.to.y}`}
              fill="none"
              stroke={c.isHighlighted ? 'var(--accent-primary)' : 'var(--border-default)'}
              strokeWidth={c.isHighlighted ? 2 : 1}
              strokeLinecap="round"
              strokeDasharray={c.isHighlighted ? 'none' : '4 4'}
              markerEnd={`url(#fc-arrow-${i})`}
              style={{
                transition: 'stroke 0.3s ease, stroke-width 0.3s ease',
                filter: c.isHighlighted ? 'drop-shadow(0 0 4px var(--accent-primary-glow))' : undefined,
              }}
            />
            {isAnimating && c.isHighlighted && (
              <path
                d={`M ${c.from.x} ${c.from.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${c.to.x} ${c.to.y}`}
                fill="none"
                stroke="var(--accent-primary)"
                strokeWidth={3}
                strokeLinecap="round"
                opacity={0.4}
                style={{
                  transition: 'opacity 0.3s ease',
                  animation: 'connectorPulse 1.5s ease-in-out infinite',
                }}
              />
            )}
          </g>
        );
      })}
    </svg>
  );
};
