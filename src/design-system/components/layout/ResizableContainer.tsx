import React, { useState, useCallback } from 'react';
import { Splitter } from '../base/Splitter';

interface ResizableContainerProps {
  direction: 'horizontal' | 'vertical';
  defaultSize: string;
  minSize?: string;
  maxSize?: string;
  children: React.ReactNode;
  className?: string;
}

const ResizableContainer: React.FC<ResizableContainerProps> = ({
  direction,
  defaultSize,
  minSize,
  maxSize,
  children,
  className,
}) => {
  const parsePx = (val: string): number => parseFloat(val) || 0;

  const [size, setSize] = useState<number>(parsePx(defaultSize));

  const isHorizontal = direction === 'horizontal';

  const handleResize = useCallback(
    (delta: number) => {
      setSize((prev) => {
        let next = isHorizontal ? prev + delta : prev - delta;
        if (minSize !== undefined) {
          next = Math.max(parsePx(minSize), next);
        }
        if (maxSize !== undefined) {
          next = Math.min(parsePx(maxSize), next);
        }
        return next;
      });
    },
    [isHorizontal, minSize, maxSize],
  );

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: isHorizontal ? 'row' : 'column',
        width: isHorizontal ? `${size}px` : '100%',
        height: isHorizontal ? '100%' : `${size}px`,
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      <div
        style={{
          flex: 1,
          overflow: 'auto',
        }}
      >
        {children}
      </div>
      <Splitter direction={direction} onResize={handleResize} />
    </div>
  );
};

export default ResizableContainer;
