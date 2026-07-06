import { Camera } from '@/camera/Camera';
import { Viewport } from '@/types';
import { snapToNiceNumber } from '@/utils/math';

export class Grid {
  private _minorColor: string;
  private _majorColor: string;
  private _minorWidth: number;
  private _majorWidth: number;

  constructor(
    minorColor = 'rgba(255, 255, 255, 0.06)',
    majorColor = 'rgba(255, 255, 255, 0.12)',
    minorWidth = 1,
    majorWidth = 1.5,
  ) {
    this._minorColor = minorColor;
    this._majorColor = majorColor;
    this._minorWidth = minorWidth;
    this._majorWidth = majorWidth;
  }

  render(ctx: CanvasRenderingContext2D, camera: Camera, viewport: Viewport): void {
    const { x: camX, y: camY, zoom } = camera;

    const baseStep = 100;
    const rawStep = baseStep / zoom;
    const minorStep = snapToNiceNumber(rawStep);
    const majorStep = minorStep * 5;
    const majorEvery = 5;

    const left = camX - viewport.width / 2 / zoom;
    const right = camX + viewport.width / 2 / zoom;
    const top = camY - viewport.height / 2 / zoom;
    const bottom = camY + viewport.height / 2 / zoom;

    const vpW = viewport.width;
    const vpH = viewport.height;

    const minorStartX = Math.floor(left / minorStep) * minorStep;
    const minorStartY = Math.floor(top / minorStep) * minorStep;

    ctx.strokeStyle = this._minorColor;
    ctx.lineWidth = this._minorWidth;
    ctx.beginPath();

    for (let wx = minorStartX; wx <= right; wx += minorStep) {
      if (Math.round(wx / minorStep) % majorEvery === 0) continue;
      const sx = (wx - camX) * zoom + vpW / 2;
      ctx.moveTo(sx, 0);
      ctx.lineTo(sx, vpH);
    }

    for (let wy = minorStartY; wy <= bottom; wy += minorStep) {
      if (Math.round(wy / minorStep) % majorEvery === 0) continue;
      const sy = (wy - camY) * zoom + vpH / 2;
      ctx.moveTo(0, sy);
      ctx.lineTo(vpW, sy);
    }

    ctx.stroke();

    const majorStartX = Math.floor(left / majorStep) * majorStep;
    const majorStartY = Math.floor(top / majorStep) * majorStep;

    ctx.strokeStyle = this._majorColor;
    ctx.lineWidth = this._majorWidth;
    ctx.beginPath();

    for (let wx = majorStartX; wx <= right; wx += majorStep) {
      const sx = (wx - camX) * zoom + vpW / 2;
      ctx.moveTo(sx, 0);
      ctx.lineTo(sx, vpH);
    }

    for (let wy = majorStartY; wy <= bottom; wy += majorStep) {
      const sy = (wy - camY) * zoom + vpH / 2;
      ctx.moveTo(0, sy);
      ctx.lineTo(vpW, sy);
    }

    ctx.stroke();
  }
}
