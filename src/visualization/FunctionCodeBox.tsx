import React, { useMemo, useState, useRef, useEffect } from 'react';
import { Divider } from '@/design-system';
import { SceneNode, getFunctionMetadata } from '@/scene';
import { LogicIcon } from './LogicIcon';

interface FunctionCodeBoxProps {
  node: SceneNode;
  canvasZoom: number;
  isSelected: boolean;
  isFocused: boolean;
  isDimmed: boolean;
  onSelect: (id: string) => void;
}

function tokenizeLine(line: string): Array<{ text: string; color: string }> {
  const tokens: Array<{ text: string; color: string }> = [];
  const parts = line.split(/(\/\/.*|'.*?'|".*?"|`.*?`|\b\w+\b|[{}();,.\-+*/=<>!]=?|[\[\]])/);
  for (const part of parts) {
    if (!part) continue;
    if (/^\/\//.test(part)) { tokens.push({ text: part, color: 'var(--syntax-comment, #6b7280)' }); }
    else if (/^['"`]/.test(part)) { tokens.push({ text: part, color: 'var(--syntax-string, #34d399)' }); }
    else if (/\b(const|let|var|function|async|await|return|if|else|for|of|in|throw|new|import|from|export|default|class|try|catch)\b/.test(part)) { tokens.push({ text: part, color: 'var(--syntax-keyword, #f472b6)' }); }
    else if (/\b(require|findByPk|findOne|findAndCountAll|create|update|destroy|save|reduce|filter|includes|toLowerCase|randomBytes)\b/.test(part)) { tokens.push({ text: part, color: 'var(--syntax-function, #60a5fa)' }); }
    else if (/[{}(),;.]/.test(part)) { tokens.push({ text: part, color: 'var(--text-secondary, #94a3b8)' }); }
    else if (/^[0-9]+$/.test(part.trim())) { tokens.push({ text: part, color: 'var(--syntax-number, #fbbf24)' }); }
    else { tokens.push({ text: part, color: 'var(--text-primary, #e2e8f0)' }); }
  }
  return tokens;
}

export const FunctionCodeBox: React.FC<FunctionCodeBoxProps> = React.memo(({
  node, canvasZoom, isSelected, isFocused, isDimmed, onSelect,
}) => {
  const meta = getFunctionMetadata(node);
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const codeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      codeRef.current.scrollTop = 0;
    }
  }, []);

  const lines = useMemo(() => meta?.code?.split('\n') ?? [], [meta?.code]);

  if (!meta) return null;

  const w = node.size?.width ?? meta.width ?? 320;
  const h = node.size?.height ?? meta.height ?? 240;

  const containerStyle: React.CSSProperties = useMemo(() => ({
    width: w * canvasZoom,
    height: h * canvasZoom,
    position: 'absolute',
    left: (node.position.x ?? 0) * canvasZoom,
    top: (node.position.y ?? 0) * canvasZoom,
    borderRadius: '10px',
    background: 'var(--bg-surface)',
    border: `1px solid ${isSelected ? `${meta.accentColor}80` : isFocused ? `${meta.accentColor}40` : 'var(--border-subtle)'}`,
    boxShadow: isSelected
      ? `0 0 0 2px ${meta.accentColor}, 0 0 24px ${meta.accentColor}30, 0 8px 32px rgba(0,0,0,0.4)`
      : isFocused
        ? `0 0 0 1px ${meta.accentColor}30, 0 8px 24px rgba(0,0,0,0.3)`
        : isDimmed
          ? '0 2px 8px rgba(0,0,0,0.15)'
          : '0 4px 16px rgba(0,0,0,0.2)',
    opacity: isDimmed && !isSelected && !isFocused ? 0.35 : 1,
    transition: 'box-shadow 0.2s ease, opacity 0.25s ease, transform 0.15s ease',
    transform: hovered && !isSelected ? 'scale(1.01)' : 'scale(1)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
    backdropFilter: 'blur(8px)',
    zIndex: isSelected ? 10 : isFocused ? 5 : 1,
  }), [w, h, canvasZoom, node.position, meta.accentColor, isSelected, isFocused, isDimmed, hovered]);

  const p = Math.max(6, Math.min(12, 12 * canvasZoom));

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(node.id);
  };

  const handleDoubleClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div
      style={containerStyle}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        padding: `${p}px ${p}px ${p * 0.5}px`,
        borderBottom: `1px solid var(--border-subtle)`,
        background: `${meta.accentColor}08`,
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
          <span style={{
            fontSize: `${Math.max(9, 11 * canvasZoom)}px`,
            fontWeight: 700, color: meta.accentColor,
            fontFamily: 'monospace',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {meta.name}
          </span>
          <span style={{
            marginLeft: 'auto', fontSize: `${Math.max(7, 8 * canvasZoom)}px`,
            color: 'var(--text-muted)', fontFamily: 'monospace',
          }}>
            {meta.lineStart}:{meta.lineEnd}
          </span>
        </div>
        <div style={{
          fontSize: `${Math.max(7, 9 * canvasZoom)}px`,
          color: 'var(--text-secondary)', fontFamily: 'monospace',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {meta.signature}
        </div>

        {canvasZoom > 0.6 && (
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: '3px',
            marginTop: `${p * 0.4}px`,
          }}>
            {meta.logicIcons.map((icon, i) => (
              <LogicIcon key={i} icon={icon} size={Math.max(10, 13 * canvasZoom)} />
            ))}
          </div>
        )}
      </div>

      {canvasZoom > 0.7 && (
        <div
          ref={codeRef}
          style={{
            flex: 1,
            overflow: 'auto',
            padding: `${p * 0.5}px 0`,
            fontFamily: 'monospace',
            fontSize: `${Math.max(7, 9 * canvasZoom)}px`,
            lineHeight: 1.5,
            background: '#080810',
          }}
        >
          {lines.map((line, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                padding: '0 4px',
                background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent',
                minHeight: '1.5em',
              }}
            >
              <span style={{
                width: `${Math.max(20, 28 * canvasZoom)}px`,
                textAlign: 'right',
                paddingRight: '8px',
                color: 'var(--text-muted)',
                userSelect: 'none',
                flexShrink: 0,
                fontSize: 'inherit',
              }}>
                {i + meta.lineStart}
              </span>
              <span style={{ whiteSpace: 'pre', color: 'var(--text-primary)' }}>
                {tokenizeLine(line).map((t, j) => (
                  <span key={j} style={{ color: t.color }}>{t.text}</span>
                ))}
              </span>
            </div>
          ))}
        </div>
      )}

      {canvasZoom > 0.85 && (
        <>
          <Divider />
          <div style={{
            padding: `${p * 0.4}px ${p}px`,
            display: 'flex',
            flexWrap: 'wrap',
            gap: `${p * 0.3}px ${p * 0.8}px`,
            fontSize: `${Math.max(7, 8 * canvasZoom)}px`,
            color: 'var(--text-secondary)',
            background: `${meta.accentColor}06`,
            flexShrink: 0,
          }}>
            <span>Cx: {meta.complexity}</span>
            <span>Params: {meta.paramCount}</span>
            <span>Returns: {meta.returnCount}</span>
            <span>DB: {meta.dbCalls}</span>
            <span>API: {meta.apiCalls}</span>
            <span>Cost: {meta.estimatedCost}</span>
            <span>Coverage: {meta.testCoverage}%</span>
          </div>
        </>
      )}
    </div>
  );
});

FunctionCodeBox.displayName = 'FunctionCodeBox';
