import React, { useRef, useEffect, useCallback, useState, useMemo } from 'react';
import { Engine } from '@/core/Engine';
import { PerformanceStats, Viewport } from '@/types';
import { SceneGraph, SceneNode, createModuleNode, createFeatureNode } from '@/scene';
import { ModuleDataProvider } from '@/data';
import { computeGridLayout } from '@/layout';
import { ModuleCard } from './ModuleCard';
import { Canvas } from '@/app/canvas/Canvas';

interface SemanticZoomViewProps {
  engineRef: React.MutableRefObject<Engine | null>;
  dataProvider: ModuleDataProvider;
  onStatsUpdate: (stats: PerformanceStats) => void;
  onSelectionChange: (node: SceneNode | null) => void;
  onVisibleCountChange: (count: number) => void;
}

export const SemanticZoomView: React.FC<SemanticZoomViewProps> = ({
  engineRef,
  dataProvider,
  onStatsUpdate,
  onSelectionChange,
  onVisibleCountChange,
}) => {
  const sceneGraphRef = useRef<SceneGraph>(new SceneGraph());
  const [viewport, setViewport] = useState<Viewport>({ width: 800, height: 600 });
  const [zoom, setZoom] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const modules = useMemo(() => dataProvider.getModules(), [dataProvider]);
  const gridPositions = useMemo(() => computeGridLayout(modules.length, { cardWidth: 320, cardHeight: 200 }), [modules.length]);

  const moduleWorldPositions = useMemo(() => {
    const map: Record<string, { x: number; y: number; w: number; h: number }> = {};
    modules.forEach((mod, i) => {
      const pos = gridPositions[i];
      map[mod.id] = { x: pos.x, y: pos.y, w: pos.width, h: pos.height };
    });
    return map;
  }, [modules, gridPositions]);

  const totalFeaturesRef = useRef(0);
  const featuresByModuleRef = useRef<Record<string, { node: SceneNode }[]>>({});

  useEffect(() => {
    const sg = sceneGraphRef.current;
    const root = sg.root;
    while (root.children.length > 0) { sg.removeChild(root.children[0]); }
    featuresByModuleRef.current = {};
    totalFeaturesRef.current = 0;

    modules.forEach((mod, i) => {
      const pos = gridPositions[i];
      const modNode = createModuleNode(mod.id, mod.name, {
        name: mod.name, icon: mod.icon, accentColor: mod.accentColor,
        featureCount: mod.featureCount, totalFunctions: mod.totalFunctions,
        complexityScore: mod.complexityScore, healthScore: mod.healthScore,
        fileCount: mod.fileCount, description: mod.description,
      }, { x: pos.x, y: pos.y });
      modNode.size = { width: pos.width, height: pos.height };

      const features = dataProvider.getFeatures(mod.id);
      totalFeaturesRef.current += features.length;
      const featNodes: { node: SceneNode }[] = [];

      features.forEach((feat) => {
        const featNode = createFeatureNode(feat.id, feat.name, {
          name: feat.name, functionCount: feat.functionCount, classCount: feat.classCount,
          complexityScore: feat.complexityScore, apiCount: feat.apiCount,
          dbTableCount: feat.dbTableCount, testCoverage: feat.testCoverage,
          documentationStatus: feat.documentationStatus, description: feat.description,
        });
        sg.addChild(modNode, featNode);
        featNodes.push({ node: featNode });
      });

      featuresByModuleRef.current[mod.id] = featNodes;
      sg.addChild(root, modNode);
    });

    onVisibleCountChange(modules.length);
  }, [modules, gridPositions, dataProvider, onVisibleCountChange]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setViewport({ width: entry.contentRect.width, height: entry.contentRect.height });
      }
    });
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  const camera = engineRef.current?.camera ?? null;

  const moduleScreenPositions = useMemo(() => {
    if (!camera) return {};
    const map: Record<string, { screenX: number; screenY: number; screenW: number }> = {};
    for (const mod of modules) {
      const wp = moduleWorldPositions[mod.id];
      if (!wp) continue;
      const [sx, sy] = camera.worldToScreen(wp.x, wp.y, viewport);
      map[mod.id] = { screenX: sx, screenY: sy, screenW: wp.w * zoom };
    }
    return map;
  }, [camera, modules, moduleWorldPositions, viewport, zoom]);

  const handleSelectModule = useCallback((id: string) => {
    setSelectedId(id);
    const node = sceneGraphRef.current.findById(id);
    onSelectionChange(node);
  }, [onSelectionChange]);

  const handleSelectFeature = useCallback((id: string) => {
    const node = sceneGraphRef.current.findById(id);
    if (node) {
      setSelectedId(id);
      onSelectionChange(node);
    }
  }, [onSelectionChange]);

  useEffect(() => {
    const engine = engineRef.current;
    if (!engine) return;

    let raf: number;
    const tick = () => {
      const z = engine.camera.zoom;
      setZoom(z);

      const FEATURE_FADE_START = 1.2;
      const featVisible = z > FEATURE_FADE_START;
      const visibleCount = modules.length + (featVisible ? totalFeaturesRef.current : 0);
      onVisibleCountChange(visibleCount);

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [engineRef, modules.length, onVisibleCountChange]);

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%', gridArea: 'canvas' }}>
      <Canvas engineRef={engineRef} onStatsUpdate={onStatsUpdate} />

      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {modules.map((mod) => {
          const sp = moduleScreenPositions[mod.id];
          if (!sp) return null;
          const modNode = sceneGraphRef.current.findById(mod.id);
          if (!modNode) return null;

          return (
            <div
              key={mod.id}
              style={{ position: 'absolute', left: sp.screenX, top: sp.screenY, pointerEvents: 'auto' }}
            >
              <ModuleCard
                node={modNode}
                accentColor={mod.accentColor}
                isSelected={mod.id === selectedId}
                screenWidth={sp.screenW}
                zoom={zoom}
                onSelect={handleSelectModule}
                onSelectFeature={handleSelectFeature}
                features={featuresByModuleRef.current[mod.id]}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
