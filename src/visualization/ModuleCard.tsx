import React, { useMemo } from 'react';
import { GlassPanel, Icon, Divider } from '@/design-system';
import { SceneNode } from '@/scene';
import { getModuleMetadata, getFeatureMetadata } from '@/scene';

interface ModuleCardProps {
  node: SceneNode;
  accentColor: string;
  isSelected: boolean;
  screenWidth: number;
  zoom: number;
  onSelect: (id: string) => void;
  onSelectFeature: (id: string) => void;
  features?: Array<{
    node: SceneNode;
  }>;
}

const FEATURE_FADE_START = 1.2;
const FEATURE_FADE_END = 2.5;

export const ModuleCard: React.FC<ModuleCardProps> = React.memo(({
  node, accentColor, isSelected, screenWidth,
  zoom, onSelect, onSelectFeature, features = [],
}) => {
  const meta = getModuleMetadata(node);
  if (!meta) return null;

  const featT = zoom <= FEATURE_FADE_START ? 0 : zoom >= FEATURE_FADE_END ? 1 : (zoom - FEATURE_FADE_START) / (FEATURE_FADE_END - FEATURE_FADE_START);
  const showFeatures = featT > 0.01;

  const cardStyle: React.CSSProperties = useMemo(() => ({
    width: screenWidth,
    cursor: 'pointer',
    transition: 'box-shadow 0.15s ease',
    boxShadow: isSelected
      ? `0 0 0 2px ${accentColor}, 0 0 24px ${accentColor}40`
      : 'none',
    border: `1px solid ${accentColor}40`,
    position: 'relative',
  }), [screenWidth, isSelected, accentColor]);

  const p = Math.max(8, Math.min(16, 16 * zoom));
  const fSize = Math.max(10, Math.min(14, 14 * zoom / 1.5));
  const sSize = Math.max(9, Math.min(12, 12 * zoom / 1.5));
  const mSize = Math.max(8, Math.min(10, 10 * zoom / 1.5));

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
          }}>
            <Divider />
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: `${p * 0.5}px`,
              paddingTop: `${p * 0.5}px`,
            }}>
              {features.map((feat) => {
                const featMeta = getFeatureMetadata(feat.node);
                if (!featMeta) return null;

                return (
                  <div
                    key={feat.node.id}
                    onClick={(e) => { e.stopPropagation(); onSelectFeature(feat.node.id); }}
                    style={{
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
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </GlassPanel>
    </div>
  );
});

ModuleCard.displayName = 'ModuleCard';
