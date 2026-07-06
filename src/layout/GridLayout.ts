export interface GridPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface GridLayoutConfig {
  cardWidth: number;
  cardHeight: number;
  gapX: number;
  gapY: number;
  columns: number;
  originX: number;
  originY: number;
}

const DEFAULT_CONFIG: GridLayoutConfig = {
  cardWidth: 320,
  cardHeight: 200,
  gapX: 32,
  gapY: 32,
  columns: 3,
  originX: 80,
  originY: 80,
};

export function computeGridLayout(
  count: number,
  config: Partial<GridLayoutConfig> = {},
): GridPosition[] {
  const cfg = { ...DEFAULT_CONFIG, ...config };
  const positions: GridPosition[] = [];

  for (let i = 0; i < count; i++) {
    const col = i % cfg.columns;
    const row = Math.floor(i / cfg.columns);
    positions.push({
      x: cfg.originX + col * (cfg.cardWidth + cfg.gapX),
      y: cfg.originY + row * (cfg.cardHeight + cfg.gapY),
      width: cfg.cardWidth,
      height: cfg.cardHeight,
    });
  }

  return positions;
}
