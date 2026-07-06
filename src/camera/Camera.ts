import { Viewport } from '@/types';
import { clamp } from '@/utils/math';

const MIN_ZOOM = 0.05;
const MAX_ZOOM = 10;
const FRICTION = 0.92;
const VELOCITY_THRESHOLD = 0.1;
const INERTIA_FACTOR = 0.85;

export class Camera {
  private _x = 0;
  private _y = 0;
  private _zoom = 1;
  private _velocityX = 0;
  private _velocityY = 0;
  private _isPanning = false;

  get x(): number { return this._x; }
  get y(): number { return this._y; }
  get zoom(): number { return this._zoom; }
  get velocityX(): number { return this._velocityX; }
  get velocityY(): number { return this._velocityY; }
  get isPanning(): boolean { return this._isPanning; }

  setPanning(value: boolean): void {
    this._isPanning = value;
  }

  pan(deltaX: number, deltaY: number): void {
    const moveX = deltaX / this._zoom;
    const moveY = deltaY / this._zoom;
    this._x -= moveX;
    this._y -= moveY;
    this._velocityX = -moveX * INERTIA_FACTOR;
    this._velocityY = -moveY * INERTIA_FACTOR;
  }

  zoomToward(factor: number, screenX: number, screenY: number, viewport: Viewport): void {
    const oldZoom = this._zoom;
    const newZoom = clamp(this._zoom * factor, MIN_ZOOM, MAX_ZOOM);
    const actualFactor = newZoom / oldZoom;

    const offsetX = screenX - viewport.width / 2;
    const offsetY = screenY - viewport.height / 2;

    this._x += offsetX * (actualFactor - 1) / (oldZoom * actualFactor);
    this._y += offsetY * (actualFactor - 1) / (oldZoom * actualFactor);
    this._zoom = newZoom;
  }

  update(dt: number): void {
    if (!this._isPanning) {
      const friction = Math.pow(FRICTION, dt * 60);
      this._x += this._velocityX * dt;
      this._y += this._velocityY * dt;
      this._velocityX *= friction;
      this._velocityY *= friction;

      if (Math.abs(this._velocityX) < VELOCITY_THRESHOLD) this._velocityX = 0;
      if (Math.abs(this._velocityY) < VELOCITY_THRESHOLD) this._velocityY = 0;
    }
  }

  worldToScreen(worldX: number, worldY: number, viewport: Viewport): [number, number] {
    return [
      (worldX - this._x) * this._zoom + viewport.width / 2,
      (worldY - this._y) * this._zoom + viewport.height / 2,
    ];
  }

  screenToWorld(screenX: number, screenY: number, viewport: Viewport): [number, number] {
    return [
      (screenX - viewport.width / 2) / this._zoom + this._x,
      (screenY - viewport.height / 2) / this._zoom + this._y,
    ];
  }
}
