import { Camera } from '@/camera/Camera';
import { Viewport } from '@/types';
import { SceneObject } from './SceneObject';

export class Scene {
  private _objects: SceneObject[] = [];

  add(object: SceneObject): void {
    this._objects.push(object);
  }

  remove(object: SceneObject): void {
    const index = this._objects.indexOf(object);
    if (index !== -1) {
      this._objects.splice(index, 1);
    }
  }

  update(dt: number): void {
    for (const obj of this._objects) {
      obj.update(dt);
    }
  }

  render(ctx: CanvasRenderingContext2D, camera: Camera, viewport: Viewport): void {
    for (const obj of this._objects) {
      if (obj.visible) {
        obj.render(ctx, camera, viewport);
      }
    }
  }

  get objectCount(): number {
    return this._objects.length;
  }

  get objects(): readonly SceneObject[] {
    return this._objects;
  }
}
