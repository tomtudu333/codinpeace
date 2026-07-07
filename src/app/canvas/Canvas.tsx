import React, { useRef, useEffect } from 'react';
import { Engine } from '@/core/Engine';
import { PerformanceStats } from '@/types';
import './Canvas.css';

interface CanvasProps {
  engineRef: React.MutableRefObject<Engine | null>;
  onStatsUpdate: (stats: PerformanceStats) => void;
}

export const Canvas: React.FC<CanvasProps> = ({ engineRef, onStatsUpdate }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isSpaceDown = useRef(false);
  const isPanning = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const engine = new Engine(canvas);
    engineRef.current = engine;

    let lastStatsUpdateTime = 0;
    engine.onStatsUpdate = (stats: PerformanceStats) => {
      const now = performance.now();
      if (now - lastStatsUpdateTime > 50) {
        lastStatsUpdateTime = now;
        onStatsUpdate(stats);
      }
    };

    engine.start();

    const container = containerRef.current!;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          engine.resize(Math.round(width), Math.round(height));
        }
      }
    });
    resizeObserver.observe(container);

    const rect = container.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      engine.resize(Math.round(rect.width), Math.round(rect.height));
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        isSpaceDown.current = true;
        if (!(e.target as HTMLElement).closest('[data-zoom-area]')) return;
        document.body.style.cursor = 'grab';
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        isSpaceDown.current = false;
        if (!isPanning.current) {
          document.body.style.cursor = '';
        }
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('[data-zoom-area]')) return;
      const camera = engine.camera;

      if (e.button === 1) {
        e.preventDefault();
        isPanning.current = true;
        lastMousePos.current = { x: e.clientX, y: e.clientY };
        camera.setPanning(true);
        document.body.style.cursor = 'grabbing';
      } else if (e.button === 0 && isSpaceDown.current) {
        isPanning.current = true;
        lastMousePos.current = { x: e.clientX, y: e.clientY };
        camera.setPanning(true);
        document.body.style.cursor = 'grabbing';
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isPanning.current) return;
      const camera = engine.camera;
      const dx = e.clientX - lastMousePos.current.x;
      const dy = e.clientY - lastMousePos.current.y;
      if (dx !== 0 || dy !== 0) {
        camera.pan(dx, dy);
        lastMousePos.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (isPanning.current && (e.button === 0 || e.button === 1)) {
        isPanning.current = false;
        engine.camera.setPanning(false);
        document.body.style.cursor = isSpaceDown.current ? 'grab' : '';
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const camera = engine.camera;

      if (e.ctrlKey || e.metaKey) {
        const zoomFactor = Math.pow(1.001, -e.deltaY);
        camera.zoomToward(zoomFactor, e.clientX, e.clientY, engine.viewport);
      } else {
        camera.pan(e.deltaX, e.deltaY);
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleMouseLeave = () => {
      if (isPanning.current) {
        isPanning.current = false;
        engine.camera.setPanning(false);
        document.body.style.cursor = isSpaceDown.current ? 'grab' : '';
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('wheel', handleWheel, { passive: false });
    canvas.addEventListener('contextmenu', handleContextMenu);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      engine.stop();
      resizeObserver.disconnect();
      engineRef.current = null;
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('wheel', handleWheel);
      canvas.removeEventListener('contextmenu', handleContextMenu);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [engineRef, onStatsUpdate]);

  return (
    <div ref={containerRef} className="canvas-container">
      <canvas ref={canvasRef} className="canvas-element" />
    </div>
  );
};
