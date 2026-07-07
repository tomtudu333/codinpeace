import React, { useMemo } from 'react';
import Xarrow, { Xwrapper } from 'react-xarrows';
import { GlassPanel, Icon, Divider, CodeBox } from '@/design-system';
import { SceneNode } from '@/scene';
import { getModuleMetadata, getFeatureMetadata, getFunctionMetadata } from '@/scene';

interface ModuleCardProps {
  node: SceneNode;
  accentColor: string;
  isSelected: boolean;
  screenWidth: number;
  screenHeight: number;
  zoom: number;
  onSelect: (id: string) => void;
  onSelectFeature: (id: string) => void;
  onSelectFunction?: (id: string) => void;
  features?: Array<{
    node: SceneNode;
  }>;
  functionsByFeature?: Record<string, SceneNode[]>;
}

const FEATURE_FADE_START = 0.5;
const FEATURE_FADE_END = 1.0;
const FUNC_FADE_START = 2.0;
const FUNC_FADE_END = 3.0;
const CODE_FADE_START = 3.0;
const CODE_FADE_END = 4.0;
const SINGLE_COL_ZOOM = 1.8;
const FN_GRID_COLS = 2;

export const ModuleCard: React.FC<ModuleCardProps> = React.memo(({
  node, accentColor, isSelected, screenWidth, screenHeight,
  zoom, onSelect, onSelectFeature, onSelectFunction,
  features = [], functionsByFeature = {},
}) => {
  const meta = getModuleMetadata(node);
  if (!meta) return null;

  const featT = zoom <= FEATURE_FADE_START ? 0 : zoom >= FEATURE_FADE_END ? 1 : (zoom - FEATURE_FADE_START) / (FEATURE_FADE_END - FEATURE_FADE_START);
  const showFeatures = featT > 0.01;

  const cardStyle: React.CSSProperties = useMemo(() => ({
    width: screenWidth,
    minHeight: screenHeight,
    cursor: 'pointer',
    transition: 'box-shadow 0.15s ease, min-height 0.2s ease',
    boxShadow: isSelected
      ? `0 0 0 2px ${accentColor}, 0 0 24px ${accentColor}40`
      : 'none',
    border: `1px solid ${accentColor}40`,
    position: 'relative',
  }), [screenWidth, screenHeight, isSelected, accentColor]);

  const p = Math.max(8, Math.min(160, 16 * zoom));
  const fSize = Math.max(10, Math.min(14, 14 * zoom / 1.5));
  const sSize = Math.max(9, Math.min(12, 12 * zoom / 1.5));
  const mSize = Math.max(8, Math.min(10, 10 * zoom / 1.5));
  const codeFontSize = Math.max(10, Math.min(20, 10 + zoom * 2));

  const fnToFeature = useMemo(() => {
    const map: Record<string, string> = {};
    for (const [featId, funcs] of Object.entries(functionsByFeature)) {
      for (const fn of funcs) map[fn.id] = featId;
    }
    return map;
  }, [functionsByFeature]);

  const connections = useMemo(() => {
    const pairs = new Set<string>();
    const result: Array<{ fromFeatId: string; toFeatId: string }> = [];
    for (const [featId, funcs] of Object.entries(functionsByFeature)) {
      for (const fn of funcs) {
        const fnMeta = getFunctionMetadata(fn);
        if (!fnMeta) continue;
        for (const calledId of fnMeta.calls) {
          const targetFeat = fnToFeature[calledId];
          if (targetFeat && targetFeat !== featId) {
            const key = [featId, targetFeat].sort().join('::');
            if (!pairs.has(key)) {
              pairs.add(key);
              result.push({ fromFeatId: featId, toFeatId: targetFeat });
            }
          }
        }
      }
    }
    return result;
  }, [functionsByFeature, fnToFeature]);

  const fnConnectionsByFeature = useMemo(() => {
    const result: Record<string, Array<{ fromFnId: string; toFnId: string }>> = {};
    for (const [featId, funcs] of Object.entries(functionsByFeature)) {
      const pairs = new Set<string>();
      const conns: Array<{ fromFnId: string; toFnId: string }> = [];
      for (const fn of funcs) {
        const fnMeta = getFunctionMetadata(fn);
        if (!fnMeta) continue;
        for (const calledId of fnMeta.calls) {
          if (funcs.some(f => f.id === calledId)) {
            const key = [fn.id, calledId].sort().join('::');
            if (!pairs.has(key)) {
              pairs.add(key);
              conns.push({ fromFnId: fn.id, toFnId: calledId });
            }
          }
        }
      }
      result[featId] = conns;
    }
    return result;
  }, [functionsByFeature]);

  const useSingleCol = zoom > SINGLE_COL_ZOOM;

  const featContainerStyle = useMemo((): React.CSSProperties => ({
    display: 'grid',
    gridTemplateColumns: useSingleCol ? '1fr' : 'repeat(2, 1fr)',
    gap: `${p * 1.0}px`,
    paddingTop: `${p * 1.0}px`,
    minWidth: 0,
    position: 'relative',
  }), [p, useSingleCol]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(node.id);
  };

  return (
    <div
      style={cardStyle}
      onClick={handleClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 0 0 1px ${accentColor}60, 0 8px 32px rgba(0,0,0,0.3)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = isSelected
          ? `0 0 0 2px ${accentColor}, 0 0 24px ${accentColor}40`
          : 'none';
      }}
    >
      <GlassPanel style={{
        width: '100%', padding: `${p}px`,
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: `${p * 0.6}px`,
          marginBottom: `${p * 0.4}px`,
        }}>
          <div style={{ color: accentColor, display: 'flex' }}>
            <Icon name={meta.icon as any} size={Math.max(12, Math.min(20, 20 * zoom / 1.5))} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: `${fSize}px`, fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {meta.name}
            </div>
            {zoom > 0.8 && (
              <div style={{ fontSize: `${mSize}px`, color: 'var(--text-muted)', marginTop: '1px', lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {meta.description}
              </div>
            )}
          </div>
        </div>

        {zoom > 0.8 && (
          <>
            <Divider />
            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: `${p * 0.3}px ${p * 0.6}px`,
              fontSize: `${sSize}px`, color: 'var(--text-secondary)',
              padding: `${p * 0.2}px 0`,
            }}>
              <span>{meta.featureCount} features</span>
              <span>{meta.totalFunctions} functions</span>
              <span>Complexity: {meta.complexityScore}</span>
              <span>Health: {meta.healthScore}%</span>
              <span>{meta.fileCount} files</span>
            </div>
          </>
        )}

        {showFeatures && features.length > 0 && (
          <div style={{
            opacity: featT,
            transition: 'opacity 0.15s ease',
            marginTop: `${p * 0.3}px`,
            position: 'relative',
          }}>
            <Divider />
            <Xwrapper>
              <div style={featContainerStyle}>
                {features.map((feat) => {
                  const featMeta = getFeatureMetadata(feat.node);
                  if (!featMeta) return null;

                  const funcs = functionsByFeature[feat.node.id] ?? [];
                  const fnConns = fnConnectionsByFeature[feat.node.id] ?? [];
                  const funcT = zoom <= FUNC_FADE_START ? 0 : zoom >= FUNC_FADE_END ? 1 : (zoom - FUNC_FADE_START) / (FUNC_FADE_END - FUNC_FADE_START);
                  const showFunctions = funcT > 0.01 && funcs.length > 0;

                  return (
                    <div
                      key={feat.node.id}
                      id={`feat-${feat.node.id}`}
                      onClick={(e) => { e.stopPropagation(); onSelectFeature(feat.node.id); }}
                      style={{
                        minWidth: 0,
                        overflow: 'hidden',
                        border: `1px solid ${accentColor}30`,
                        borderRadius: '6px',
                        background: 'var(--bg-surface)',
                        padding: `${p * 0.6}px`,
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: `${p * 0.2}px`,
                        transition: 'box-shadow 0.15s ease, background 0.15s ease',
                        fontSize: `${sSize * 0.85}px`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = `${accentColor}15`;
                        e.currentTarget.style.boxShadow = `0 0 0 1px ${accentColor}40`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'var(--bg-surface)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <div style={{
                        display: 'flex', alignItems: 'center', gap: `${p * 0.25}px`,
                        fontSize: `${sSize * 0.95}px`,
                        fontWeight: 600, color: 'var(--text-primary)',
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      }}>
                        <span style={{ color: accentColor, display: 'flex', flexShrink: 0 }}>
                          <Icon name="Code" size={Math.max(10, Math.min(14, 14 * zoom / 2))} />
                        </span>
                        {featMeta.name}
                      </div>
                      <div style={{
                        fontSize: `${mSize * 0.9}px`,
                        color: 'var(--text-muted)',
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      }}>
                        {featMeta.description}
                      </div>
                      <div style={{
                        display: 'flex', flexWrap: 'wrap', gap: `${p * 0.2}px ${p * 0.5}px`,
                        fontSize: `${mSize * 0.85}px`,
                        color: 'var(--text-secondary)', marginTop: 'auto',
                      }}>
                        <span>{featMeta.functionCount} fn</span>
                        <span>{featMeta.complexityScore} cx</span>
                        <span>{featMeta.apiCount} api</span>
                        <span>{featMeta.dbTableCount} db</span>
                      </div>

                      {showFunctions && (
                        <div style={{
                          opacity: funcT,
                          transition: 'opacity 0.15s ease',
                          marginTop: `${p * 0.2}px`,
                          borderTop: `1px solid ${accentColor}20`,
                          paddingTop: `${p * 0.3}px`,
                          position: 'relative',
                        }}>
                          <div style={{
                            display: 'grid',
                            gridTemplateColumns: `repeat(${FN_GRID_COLS}, 1fr)`,
                            gap: `${p * 1.0}px`,
                            padding: `${p * 1.0}px`,
                          }}>
                            {funcs.map((fn) => {
                              const fnMeta = getFunctionMetadata(fn);
                              if (!fnMeta) return null;

                              const codeT = zoom <= CODE_FADE_START ? 0 : zoom >= CODE_FADE_END ? 1 : (zoom - CODE_FADE_START) / (CODE_FADE_END - CODE_FADE_START);
                              const showCode = codeT > 0.01 && fnMeta.code;

                              return (
                                <div
                                  key={fn.id}
                                  id={`fn-${fn.id}`}
                                  onClick={(e) => { e.stopPropagation(); onSelectFunction?.(fn.id); }}
                                  style={{
                                    border: `1px solid ${accentColor}25`,
                                    borderRadius: '5px',
                                    background: `${accentColor}06`,
                                    padding: `${p * 0.3}px`,
                                    cursor: 'pointer',
                                    fontSize: `${mSize * 0.85}px`,
                                    transition: 'box-shadow 0.12s ease, background 0.12s ease',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1px',
                                    minWidth: 0,
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.background = `${accentColor}12`;
                                    e.currentTarget.style.boxShadow = `0 0 0 1px ${accentColor}35`;
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.background = `${accentColor}06`;
                                    e.currentTarget.style.boxShadow = 'none';
                                  }}
                                >
                                  <div style={{
                                    display: 'flex', alignItems: 'center', gap: `${p * 0.15}px`,
                                    fontFamily: 'monospace',
                                  }}>
                                    <span style={{ color: fnMeta.accentColor ?? accentColor, fontWeight: 600, fontSize: `${mSize * 0.9}px`, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                      {fnMeta.name}
                                    </span>
                                    <span style={{
                                      marginLeft: 'auto', color: 'var(--text-muted)',
                                      fontSize: `${mSize * 0.7}px`, flexShrink: 0,
                                    }}>
                                      {fnMeta.complexity} cx
                                    </span>
                                  </div>
                                  {zoom > FUNC_FADE_END && (
                                    <div style={{
                                      fontSize: `${mSize * 0.7}px`,
                                      color: 'var(--text-muted)',
                                      fontFamily: 'monospace',
                                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                                      marginTop: '1px',
                                    }}>
                                      {fnMeta.signature}
                                    </div>
                                  )}
                                  {showCode && (
                                    <div style={{ opacity: codeT, transition: 'opacity 0.15s ease', marginTop: '2px' }}>
                                      <CodeBox
                                        code={fnMeta.code}
                                        language="typescript"
                                        header={
                                          <span style={{ fontSize: `${codeFontSize * 0.5}px`, color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                                            {fnMeta.filePath}:{fnMeta.lineStart}
                                          </span>
                                        }
                                      />
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>

                          {fnConns.length > 0 && fnConns.map(({ fromFnId, toFnId }) => (
                            <Xarrow
                              key={`fn-${fromFnId}-${toFnId}`}
                              start={`fn-${fromFnId}`}
                              end={`fn-${toFnId}`}
                              color="#f87171"
                              strokeWidth={1.5}
                              path="smooth"
                              showHead={false}
                              dashness={{ strokeLen: 4, nonStrokeLen: 3 }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {zoom > FEATURE_FADE_END && connections.map(({ fromFeatId, toFeatId }) => (
                <Xarrow
                  key={`feat-${fromFeatId}-${toFeatId}`}
                  start={`feat-${fromFeatId}`}
                  end={`feat-${toFeatId}`}
                  color={accentColor}
                  strokeWidth={1.5}
                  path="smooth"
                  showHead={false}
                />
              ))}
            </Xwrapper>
          </div>
        )}
      </GlassPanel>
    </div>
  );
});

ModuleCard.displayName = 'ModuleCard';
