import React from 'react';
import { ArrowHead } from './ArrowHead';
import { AnimatedParticlePath } from './AnimatedParticlePath';

interface Point {
  x: number;
  y: number;
}

interface BezierConnectorProps {
  from: Point;
  to: Point;
  controlPoint?: Point;
  strokeColor?: string;
  strokeWidth?: number;
  highlighted?: boolean;
  animated?: boolean;
  arrowEnd?: boolean;
  className?: string;
}

export const BezierConnector: React.FC<BezierConnectorProps> = ({
  from,
  to,
  controlPoint,
  strokeColor = 'var(--accent-primary)',
  strokeWidth = 2,
  highlighted = false,
  animated = false,
  arrowEnd = false,
  className,
}) => {
  const dx = to.x - from.x;
  const dy = to.y - from.y;

  const c1 = controlPoint ?? {
    x: from.x + dx / 3,
    y: from.y + dy / 3,
  };

  const c2 = controlPoint
    ? { x: to.x - (to.x - controlPoint.x), y: to.y - (to.y - controlPoint.y) }
    : {
        x: to.x - dx / 3,
        y: to.y - dy / 3,
      };

  const pathD = `M ${from.x} ${from.y} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${to.x} ${to.y}`;

  const actualStroke = highlighted ? 'var(--accent-primary-glow)' : strokeColor;

  const pathStyle: React.CSSProperties = {
    fill: 'none',
    stroke: actualStroke,
    strokeWidth,
    strokeLinecap: 'round',
    transition: 'stroke 0.2s ease',
    filter: highlighted ? 'drop-shadow(0 0 6px var(--accent-primary-glow))' : undefined,
  };

  const svgStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    overflow: 'visible',
  };

  return (
    <svg className={className} style={svgStyle}>
      <ArrowHead color={actualStroke} size={strokeWidth * 4} />
      <path
        d={pathD}
        style={pathStyle}
        markerEnd={arrowEnd ? 'url(#arrowHead)' : undefined}
      />
      {animated && <AnimatedParticlePath path={pathD} color={strokeColor} size={3} />}
    </svg>
  );
};
