import { Camera } from '@/camera/Camera';
import { Viewport } from '@/types';

export abstract class SceneObject {
  protected _x: number;
  protected _y: number;
  protected _width: number;
  protected _height: number;
  protected _visible = true;

  constructor(x: number, y: number, width: number, height: number) {
    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;
  }

  abstract render(ctx: CanvasRenderingContext2D, camera: Camera, viewport: Viewport): void;
  abstract update(dt: number): void;

  get x(): number { return this._x; }
  get y(): number { return this._y; }
  get width(): number { return this._width; }
  get height(): number { return this._height; }
  get visible(): boolean { return this._visible; }

  set visible(v: boolean) { this._visible = v; }
}
