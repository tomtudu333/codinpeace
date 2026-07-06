import { Camera } from '@/camera/Camera';
import { Viewport } from '@/types';
import { Scene } from '@/scene/Scene';
import { Grid } from './Grid';

export class Renderer {
  private _canvas: HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D;
  private _grid: Grid;
  private _scene: Scene;

  constructor(canvas: HTMLCanvasElement, scene: Scene) {
    this._canvas = canvas;
    this._ctx = canvas.getContext('2d')!;

    if (!this._ctx) {
      throw new Error('Failed to get 2D rendering context');
    }

    this._grid = new Grid();
    this._scene = scene;
  }

  render(camera: Camera, viewport: Viewport): void {
    const ctx = this._ctx;
    const dpr = window.devicePixelRatio || 1;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, viewport.width, viewport.height);

    ctx.fillStyle = '#0c0c14';
    ctx.fillRect(0, 0, viewport.width, viewport.height);

    this._grid.render(ctx, camera, viewport);
    this._scene.render(ctx, camera, viewport);
  }

  resize(width: number, height: number): void {
    const dpr = window.devicePixelRatio || 1;
    this._canvas.width = Math.round(width * dpr);
    this._canvas.height = Math.round(height * dpr);
  }
}
