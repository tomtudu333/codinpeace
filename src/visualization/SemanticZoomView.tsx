import React, { useRef, useEffect, useCallback, useState, useMemo } from 'react';
import { Engine } from '@/core/Engine';
import { PerformanceStats, Viewport } from '@/types';
import { SceneGraph, SceneNode, createModuleNode, createFeatureNode, createFunctionNode } from '@/scene';
import { ModuleDataProvider } from '@/data';
import { computeGridLayout } from '@/layout';
import { ModuleCard } from './ModuleCard';
import { Canvas } from '@/app/canvas/Canvas';

const MODULE_COLS = 3;
const MODULE_GAP_X = 32;
const MODULE_GAP_Y = 32;
const MODULE_ORIGIN_X = 80;
const MODULE_ORIGIN_Y = 80;
const CARD_WORLD_W = 320;
const FEATURE_FADE_START_H = 0.5;
const FUNC_FADE_START_H = 2.0;
const CODE_FADE_START_H = 3.0;
const SINGLE_COL_ZOOM_H = 1.8;
const FN_GRID_COLS_H = 2;

function estimateScreenHeight(featureCount: number, zoom: number, totalFunctions: number): number {
  const p = Math.max(8, Math.min(160, 16 * zoom));
  const iconSize = Math.max(12, Math.min(20, 20 * zoom / 1.5));
  const fSize = Math.max(10, Math.min(14, 14 * zoom / 1.5));
  const sSize = Math.max(9, Math.min(12, 12 * zoom / 1.5));
  const mSize = Math.max(8, Math.min(10, 10 * zoom / 1.5));
  const codeFontSize = Math.max(10, Math.min(20, 10 + zoom * 2));

  const headerH = Math.max(iconSize, fSize * 1.2) + (zoom > 0.8 ? mSize * 1.3 + 1 : 0) + p * 0.4;
  const metricsH = zoom > 0.8 ? sSize * 1.3 + p * 0.4 : 0;

  let featH = 0;
  if (zoom > FEATURE_FADE_START_H && featureCount > 0) {
    const itemPad = p * 0.6;
    const itemContent = sSize * 0.95 * 1.3 + mSize * 0.9 * 1.3 + mSize * 0.85 * 1.3 + p * 0.2 * 2;
    const itemH = itemPad * 2 + itemContent + 2;
    const useSingleCol = zoom > SINGLE_COL_ZOOM_H;
    const cols = useSingleCol ? 1 : 2;
    const rows = Math.ceil(featureCount / cols);
    featH = p * 0.3 + 1 + p * 0.5 + rows * itemH + (rows - 1) * p * 0.5;
  }

  let funcH = 0;
  if (zoom > FUNC_FADE_START_H && totalFunctions > 0) {
    const fnBoxPad = p * 0.3;
    const fnBoxContent = mSize * 0.9 * 1.3 + (zoom > 3.0 ? mSize * 0.7 * 1.3 + 1 : 0);
    const fnBoxH = fnBoxPad * 2 + fnBoxContent + 2;
    const fnRows = Math.ceil(totalFunctions / FN_GRID_COLS_H);
    funcH = p * 0.2 + 1 + p * 0.3 + fnRows * fnBoxH + (fnRows - 1) * p * 1.0 + p * 1.0;
  }

  let codeH = 0;
  if (zoom > CODE_FADE_START_H && totalFunctions > 0) {
    codeH = codeFontSize * 6 + p * 0.3;
  }

  return Math.ceil(p * 2 + headerH + 1 + metricsH + 1 + featH + funcH + codeH);
}

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
  const [cameraX, setCameraX] = useState(0);
  const [cameraY, setCameraY] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isSpaceDownRef = useRef(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') { e.preventDefault(); isSpaceDownRef.current = true; }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') isSpaceDownRef.current = false;
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  const modules = useMemo(() => dataProvider.getModules(), [dataProvider]);
  const staticGridPositions = useMemo(() => computeGridLayout(modules.length, { cardWidth: CARD_WORLD_W, cardHeight: 200 }), [modules.length]);

  const moduleWorldPositions = useMemo(() => {
    const map: Record<string, { x: number; y: number; w: number; h: number }> = {};
    const rowHeights: number[] = [];
    modules.forEach((mod, i) => {
      const col = i % MODULE_COLS;
      const row = Math.floor(i / MODULE_COLS);
      const x = MODULE_ORIGIN_X + col * (CARD_WORLD_W + MODULE_GAP_X);
      const screenH = estimateScreenHeight(mod.featureCount, zoom, mod.totalFunctions);
      const h = screenH / zoom;
      if (!rowHeights[row]) rowHeights[row] = 0;
      rowHeights[row] = Math.max(rowHeights[row], h);
      let y = MODULE_ORIGIN_Y;
      for (let r = 0; r < row; r++) y += rowHeights[r] + MODULE_GAP_Y;
      map[mod.id] = { x, y, w: CARD_WORLD_W, h };
    });
    return map;
  }, [modules, zoom]);

  const totalFeaturesRef = useRef(0);
  const totalFunctionsRef = useRef(0);
  const featuresByModuleRef = useRef<Record<string, { node: SceneNode }[]>>({});
  const functionsByFeatureRef = useRef<Record<string, SceneNode[]>>({});

  useEffect(() => {
    const sg = sceneGraphRef.current;
    const root = sg.root;
    while (root.children.length > 0) { sg.removeChild(root.children[0]); }
    featuresByModuleRef.current = {};
    functionsByFeatureRef.current = {};
    totalFeaturesRef.current = 0;
    totalFunctionsRef.current = 0;

    modules.forEach((mod, i) => {
      const pos = staticGridPositions[i];
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

        const funcs = dataProvider.getFunctions(feat.id);
        totalFunctionsRef.current += funcs.length;
        const fnNodes: SceneNode[] = [];

        funcs.forEach((fn) => {
          const fnNode = createFunctionNode(fn.id, fn.name, {
            name: fn.name, signature: fn.signature, complexity: fn.complexity,
            lineStart: fn.lineStart, lineEnd: fn.lineEnd, code: fn.code,
            filePath: fn.filePath, documentation: fn.documentation,
            calls: fn.calls, calledBy: fn.calledBy,
            logicIcons: fn.logicIcons,
            accentColor: fn.accentColor,
            paramCount: fn.metadata.paramCount,
            returnCount: fn.metadata.returnCount,
            dbCalls: fn.metadata.dbCalls,
            apiCalls: fn.metadata.apiCalls,
            estimatedCost: fn.metadata.estimatedCost,
            testCoverage: fn.metadata.testCoverage,
            parameters: fn.metadata.parameters,
            returnType: fn.metadata.returnType,
            description: fn.metadata.description,
            tags: fn.metadata.tags,
            developerNotes: fn.metadata.developerNotes,
            width: fn.width,
            height: fn.height,
          }, { x: fn.position.x, y: fn.position.y });
          sg.addChild(featNode, fnNode);
          fnNodes.push(fnNode);
        });

        functionsByFeatureRef.current[feat.id] = fnNodes;
        featNodes.push({ node: featNode });
      });

      featuresByModuleRef.current[mod.id] = featNodes;
      sg.addChild(root, modNode);
    });

    onVisibleCountChange(modules.length);
  }, [modules, staticGridPositions, dataProvider, onVisibleCountChange]);

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
    const map: Record<string, { screenX: number; screenY: number; screenW: number; screenH: number }> = {};
    for (const mod of modules) {
      const wp = moduleWorldPositions[mod.id];
      if (!wp) continue;
      const [sx, sy] = camera.worldToScreen(wp.x, wp.y, viewport);
      map[mod.id] = { screenX: sx, screenY: sy, screenW: wp.w * zoom, screenH: estimateScreenHeight(mod.featureCount, zoom, mod.totalFunctions) };
    }
    return map;
  }, [camera, modules, moduleWorldPositions, viewport, zoom, cameraX, cameraY]);

  const handleSelectModule = useCallback((id: string) => {
    setSelectedId(id);
    const node = sceneGraphRef.current.findById(id);
    onSelectionChange(node);
  }, [onSelectionChange]);

  const handleSelectFeature = useCallback((id: string) => {
    setSelectedId(id);
    const node = sceneGraphRef.current.findById(id);
    if (node) {
      onSelectionChange(node);
      const cam = engineRef.current?.camera;
      if (cam && zoom > 0.8) {
        cam.setPosition(node.position.x, node.position.y - 100, 2.5);
      }
    }
  }, [onSelectionChange, engineRef, zoom]);

  const handleSelectFunction = useCallback((id: string) => {
    setSelectedId(id);
    const node = sceneGraphRef.current.findById(id);
    if (node) {
      onSelectionChange(node);
    }
  }, [onSelectionChange]);

  useEffect(() => {
    const engine = engineRef.current;
    if (!engine) return;

    let raf: number;
    const tick = () => {
      const cam = engine.camera;
      setZoom(cam.zoom);
      setCameraX(cam.x);
      setCameraY(cam.y);

      const FEATURE_FADE_START = 0.5;
      const FUNC_FADE_START = 2.0;
      const featVisible = cam.zoom > FEATURE_FADE_START;
      const funcVisible = cam.zoom > FUNC_FADE_START;
      let visibleCount = modules.length;
      if (featVisible) visibleCount += totalFeaturesRef.current;
      if (funcVisible) visibleCount += totalFunctionsRef.current;
      onVisibleCountChange(visibleCount);

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [engineRef, modules.length, onVisibleCountChange]);

  return (
    <div ref={containerRef} data-zoom-area style={{ position: 'relative', width: '100%', height: '100%', gridArea: 'canvas' }}>
      <Canvas engineRef={engineRef} onStatsUpdate={onStatsUpdate} />

      <div data-overlay style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {modules.map((mod) => {
          const sp = moduleScreenPositions[mod.id];
          if (!sp) return null;
          const modNode = sceneGraphRef.current.findById(mod.id);
          if (!modNode) return null;

          return (
            <div
              key={mod.id}
              style={{
                position: 'absolute', left: sp.screenX, top: sp.screenY,
                transition: 'left 0.2s ease, top 0.2s ease',
                pointerEvents: 'auto',
              }}
            >
              <ModuleCard
                node={modNode}
                accentColor={mod.accentColor}
                isSelected={mod.id === selectedId}
                screenWidth={sp.screenW}
                screenHeight={sp.screenH}
                zoom={zoom}
                onSelect={handleSelectModule}
                onSelectFeature={handleSelectFeature}
                onSelectFunction={handleSelectFunction}
                features={featuresByModuleRef.current[mod.id]}
                functionsByFeature={functionsByFeatureRef.current}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
