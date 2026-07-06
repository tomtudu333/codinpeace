import { Camera } from '@/camera/Camera';
import { Scene } from '@/scene/Scene';
import { Renderer } from '@/renderer/Renderer';
import { Viewport, PerformanceStats } from '@/types';

export class Engine {
  private _camera: Camera;
  private _scene: Scene;
  private _renderer: Renderer;
  private _viewport: Viewport;
  private _animationId: number | null = null;
  private _lastTime = 0;
  private _fps = 0;
  private _frameTime = 0;
  private _frameCount = 0;
  private _fpsTime = 0;
  private _running = false;
  private _onStatsUpdate: ((stats: PerformanceStats) => void) | null = null;

  constructor(canvas: HTMLCanvasElement) {
    this._viewport = {
      width: canvas.clientWidth,
      height: canvas.clientHeight,
    };
    this._camera = new Camera();
    this._scene = new Scene();
    this._renderer = new Renderer(canvas, this._scene);
    this._renderer.resize(this._viewport.width, this._viewport.height);
  }

  set onStatsUpdate(callback: ((stats: PerformanceStats) => void) | null) {
    this._onStatsUpdate = callback;
  }

  get camera(): Camera {
    return this._camera;
  }

  get scene(): Scene {
    return this._scene;
  }

  get viewport(): Viewport {
    return this._viewport;
  }

  resize(width: number, height: number): void {
    if (width <= 0 || height <= 0) return;
    this._viewport.width = width;
    this._viewport.height = height;
    this._renderer.resize(width, height);
  }

  start(): void {
    if (this._running) return;
    this._running = true;
    this._lastTime = performance.now();
    this._fpsTime = this._lastTime;
    this._animationId = requestAnimationFrame(this._loop);
  }

  stop(): void {
    this._running = false;
    if (this._animationId !== null) {
      cancelAnimationFrame(this._animationId);
      this._animationId = null;
    }
  }

  private _loop = (time: number): void => {
    if (!this._running) return;

    const dt = (time - this._lastTime) / 1000;
    this._lastTime = time;

    this._frameCount++;
    if (time - this._fpsTime >= 1000) {
      this._fps = this._frameCount;
      this._frameCount = 0;
      this._fpsTime = time;
    }

    this._frameTime = dt * 1000;

    this._camera.update(dt);
    this._scene.update(dt);
    this._renderer.render(this._camera, this._viewport);

    if (this._onStatsUpdate) {
      this._onStatsUpdate({
        fps: this._fps,
        frameTime: Math.round(this._frameTime * 10) / 10,
        objectCount: this._scene.objectCount,
        cameraX: Math.round(this._camera.x * 10) / 10,
        cameraY: Math.round(this._camera.y * 10) / 10,
        zoom: Math.round(this._camera.zoom * 100) / 100,
      });
    }

    this._animationId = requestAnimationFrame(this._loop);
  };
}
