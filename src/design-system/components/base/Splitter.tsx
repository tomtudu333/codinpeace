import React, { useRef, useCallback, useState } from 'react';

interface SplitterProps {
  direction: 'vertical' | 'horizontal';
  onResize: (delta: number) => void;
  style?: React.CSSProperties;
}

export const Splitter: React.FC<SplitterProps> = ({
  direction,
  onResize,
  style,
}) => {
  const dragging = useRef(false);
  const startPos = useRef(0);
  const [active, setActive] = useState(false);
  const isVertical = direction === 'vertical';

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (e.button !== 0) return;
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragging.current = true;
    setActive(true);
    startPos.current = isVertical ? e.clientX : e.clientY;
    document.body.style.cursor = isVertical ? 'col-resize' : 'row-resize';
  }, [isVertical]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    const current = isVertical ? e.clientX : e.clientY;
    onResize(current - startPos.current);
    startPos.current = current;
  }, [isVertical, onResize]);

  const handlePointerUp = useCallback(() => {
    dragging.current = false;
    setActive(false);
    document.body.style.cursor = '';
  }, []);

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{
        position: 'absolute',
        zIndex: 20,
        touchAction: 'none',
        ...(isVertical
          ? { width: '12px', cursor: 'col-resize', transform: 'translateX(-50%)' }
          : { height: '12px', cursor: 'row-resize', transform: 'translateY(-50%)' }
        ),
        ...style,
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '2px',
          background: 'var(--accent-primary)',
          opacity: active ? '0.8' : '0.15',
          transition: 'opacity 0.1s',
        }}
        onPointerEnter={(e) => {
          if (!dragging.current) e.currentTarget.style.opacity = '0.4';
        }}
        onPointerLeave={(e) => {
          if (!dragging.current) e.currentTarget.style.opacity = '0.15';
        }}
      />
    </div>
  );
};
