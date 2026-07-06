import React, { useMemo, useState } from 'react';
import { Icon, Tooltip, MiniStatusWidget } from '@/design-system';
import { SceneNode } from '@/scene';
import { getFeatureMetadata } from '@/scene';

interface FeatureCardProps {
  node: SceneNode;
  accentColor: string;
  isSelected: boolean;
  screenWidth: number;
  screenHeight: number;
  zoom: number;
  onSelect: (id: string) => void;
}

const coverageColor = (pct: number): 'success' | 'warning' | 'error' => {
  if (pct >= 80) return 'success';
  if (pct >= 50) return 'warning';
  return 'error';
};

export const FeatureCard: React.FC<FeatureCardProps> = React.memo(({ node, accentColor, isSelected, screenWidth, screenHeight, onSelect }) => {
  const meta = getFeatureMetadata(node);
  const [hovered, setHovered] = useState(false);

  if (!meta) return null;

  const isCompact = screenWidth < 160 || screenHeight < 100;
  const isMini = screenWidth < 100 || screenHeight < 60;

  const cardStyle: React.CSSProperties = useMemo(() => ({
    width: screenWidth,
    height: screenHeight,
    cursor: 'pointer',
    transition: 'box-shadow 0.15s ease',
    transform: hovered ? 'scale(1.03)' : 'scale(1)',
    boxShadow: isSelected
      ? `0 0 0 2px ${accentColor}, 0 0 16px ${accentColor}30`
      : hovered
        ? '0 4px 16px rgba(0,0,0,0.25)'
        : 'none',
    border: `1px solid ${isSelected ? accentColor + '60' : 'var(--border-subtle)'}`,
    padding: isCompact ? '6px' : '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: isCompact ? '3px' : '6px',
    borderRadius: '8px',
    background: 'var(--bg-surface)',
    position: 'relative',
    overflow: 'hidden',
  }), [screenWidth, screenHeight, hovered, isSelected, accentColor, isCompact]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(node.id);
  };

  if (isMini) {
    return (
      <div
        style={{
          ...cardStyle,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4px',
        }}
        onClick={handleClick}
        title={meta.name}
      >
        <Icon name="Code" size={Math.max(10, screenWidth * 0.25)} />
      </div>
    );
  }

  return (
    <Tooltip
      content={
        <div style={{ fontSize: '11px', lineHeight: 1.5, maxWidth: '220px' }}>
          <div style={{ fontWeight: 600, marginBottom: '4px' }}>{meta.name}</div>
          <div style={{ color: 'var(--text-muted)', marginBottom: '6px' }}>{meta.description}</div>
          <MiniStatusWidget label="Coverage" value={`${meta.testCoverage}%`} status={coverageColor(meta.testCoverage)} />
          <MiniStatusWidget label="Docs" value={meta.documentationStatus} status={meta.documentationStatus === 'complete' ? 'success' : meta.documentationStatus === 'partial' ? 'warning' : 'error'} />
          <MiniStatusWidget label="API" value={`${meta.apiCount} routes`} status="none" />
          <MiniStatusWidget label="DB" value={`${meta.dbTableCount} tables`} status="none" />
        </div>
      }
      position="top"
    >
      <div
        style={cardStyle}
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: isCompact ? '2px' : '4px' }}>
          <span style={{ color: accentColor, display: 'flex' }}>
            <Icon name="Code" size={isCompact ? 12 : 14} />
          </span>
          <span style={{ fontSize: isCompact ? '10px' : '12px', fontWeight: 600, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {meta.name}
          </span>
        </div>

        {!isCompact && (
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {meta.description}
          </div>
        )}

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 8px', fontSize: isCompact ? '9px' : '11px', color: 'var(--text-secondary)', marginTop: 'auto' }}>
          <span>{meta.functionCount} fn</span>
          <span>{meta.complexityScore} cx</span>
          {!isCompact && <span>{meta.apiCount} api</span>}
          {!isCompact && <span>{meta.dbTableCount} db</span>}
        </div>
      </div>
    </Tooltip>
  );
});

FeatureCard.displayName = 'FeatureCard';
