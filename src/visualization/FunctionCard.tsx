import React, { useMemo, useState } from 'react';
import { Icon, Divider, CodeBox, MiniStatusWidget } from '@/design-system';
import { SceneNode } from '@/scene';
import { getFunctionMetadata } from '@/scene';

interface FunctionCardProps {
  node: SceneNode;
  accentColor: string;
  isSelected: boolean;
  screenWidth: number;
  screenHeight: number;
  zoom: number;
  onSelect: (id: string) => void;
}

const CODE_FADE_START = 2.2;
const CODE_FADE_END = 3.2;

const docColor = (status: string): 'success' | 'warning' | 'error' => {
  if (status === 'complete') return 'success';
  if (status === 'partial') return 'warning';
  return 'error';
};

export const FunctionCard: React.FC<FunctionCardProps> = React.memo(({
  node, accentColor, isSelected, screenWidth, screenHeight, zoom, onSelect,
}) => {
  const meta = getFunctionMetadata(node);
  const [hovered, setHovered] = useState(false);

  if (!meta) return null;

  const isCompact = screenWidth < 180 || screenHeight < 80;
  const isMini = screenWidth < 100 || screenHeight < 50;

  const showCode = zoom > CODE_FADE_START;
  const codeOpacity = zoom < CODE_FADE_START ? 0 : zoom >= CODE_FADE_END ? 1 :
    (zoom - CODE_FADE_START) / (CODE_FADE_END - CODE_FADE_START);

  const cardStyle: React.CSSProperties = useMemo(() => ({
    width: screenWidth,
    height: screenHeight,
    cursor: 'pointer',
    transition: 'box-shadow 0.15s ease, height 0.2s ease',
    transform: hovered ? 'scale(1.02)' : 'scale(1)',
    boxShadow: isSelected
      ? `0 0 0 2px ${accentColor}, 0 0 16px ${accentColor}30`
      : hovered ? '0 4px 16px rgba(0,0,0,0.25)' : 'none',
    border: `1px solid ${isSelected ? accentColor + '60' : 'var(--border-subtle)'}`,
    padding: isCompact ? '6px' : '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: isCompact ? '2px' : '4px',
    borderRadius: '6px',
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
      <div style={{ ...cardStyle, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3px' }} onClick={handleClick} title={`${meta.name} — ${meta.signature}`}>
        <Icon name="Code" size={Math.max(8, screenWidth * 0.2)} />
      </div>
    );
  }

  return (
    <div
      style={cardStyle}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: isCompact ? '1px' : '2px' }}>
        <span style={{ color: accentColor, display: 'flex', flexShrink: 0 }}>
          <Icon name="Code" size={isCompact ? 10 : 12} />
        </span>
        <span style={{
          fontSize: isCompact ? '9px' : '11px', fontWeight: 600,
          color: 'var(--text-primary)', overflow: 'hidden',
          textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: 'monospace',
        }}>
          {meta.name}
        </span>
        <span style={{
          fontSize: isCompact ? '8px' : '9px', color: 'var(--text-muted)',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          fontFamily: 'monospace', marginLeft: 'auto',
        }}>
          L{meta.lineStart}–L{meta.lineEnd}
        </span>
      </div>

      {!isCompact && (
        <div style={{
          fontSize: '9px', color: 'var(--text-muted)', fontFamily: 'monospace',
          lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {meta.signature}
        </div>
      )}

      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: '3px 6px',
        fontSize: isCompact ? '8px' : '9px', color: 'var(--text-secondary)',
        marginTop: 'auto',
      }}>
        <span>{meta.complexity} cx</span>
        <MiniStatusWidget label="" value={meta.documentation} status={docColor(meta.documentation)} />
      </div>

      {showCode && meta.code && (
        <div style={{ opacity: codeOpacity, transition: 'opacity 0.15s ease', marginTop: '2px' }}>
          <Divider />
          <div style={{ marginTop: '4px', maxHeight: screenHeight * 0.5, overflow: 'auto' }}>
            <CodeBox
              code={meta.code}
              language="typescript"
              header={
                <span style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                  {meta.filePath}:{meta.lineStart}
                </span>
              }
            />
          </div>
        </div>
      )}
    </div>
  );
});

FunctionCard.displayName = 'FunctionCard';
