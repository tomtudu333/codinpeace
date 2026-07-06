import React, { useState, useCallback } from 'react';
import { Splitter } from '../base/Splitter';

interface SplitViewProps {
  direction?: 'horizontal' | 'vertical';
  defaultRatio?: number;
  minSize?: string;
  children: [React.ReactNode, React.ReactNode];
}

const SplitView: React.FC<SplitViewProps> = ({
  direction = 'horizontal',
  defaultRatio = 0.5,
  minSize = '100px',
  children,
}) => {
  const [ratio, setRatio] = useState<number>(
    Math.max(0, Math.min(1, defaultRatio)),
  );

  const clampedRatio = Math.max(0, Math.min(1, ratio));

  const isHorizontal = direction === 'horizontal';

  const handleResize = useCallback(
    (delta: number) => {
      setRatio((prev) => {
        const containerSize = isHorizontal
          ? window.innerWidth
          : window.innerHeight;
        const minPx = parseFloat(minSize);
        const deltaRatio = delta / containerSize;
        const raw = prev + deltaRatio;
        const clamped = Math.max(
          minPx / containerSize,
          Math.min(1 - minPx / containerSize, raw),
        );
        return clamped;
      });
    },
    [isHorizontal, minSize],
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: isHorizontal ? 'row' : 'column',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          [isHorizontal ? 'width' : 'height']: `${clampedRatio * 100}%`,
          overflow: 'auto',
        }}
      >
        {children[0]}
      </div>
      <Splitter direction={direction} onResize={handleResize} />
      <div
        style={{
          flex: 1,
          overflow: 'auto',
        }}
      >
        {children[1]}
      </div>
    </div>
  );
};

export default SplitView;
