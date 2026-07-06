export interface PackedPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface PackedLayoutConfig {
  featureWidth: number;
  featureHeight: number;
  gapX: number;
  gapY: number;
  columns: number;
  offsetX: number;
  offsetY: number;
}

const DEFAULT_CONFIG: PackedLayoutConfig = {
  featureWidth: 240,
  featureHeight: 150,
  gapX: 16,
  gapY: 16,
  columns: 2,
  offsetX: 20,
  offsetY: 220,
};

export function computePackedLayout(
  count: number,
  config: Partial<PackedLayoutConfig> = {},
): PackedPosition[] {
  const cfg = { ...DEFAULT_CONFIG, ...config };
  const positions: PackedPosition[] = [];

  for (let i = 0; i < count; i++) {
    const col = i % cfg.columns;
    const row = Math.floor(i / cfg.columns);
    positions.push({
      x: cfg.offsetX + col * (cfg.featureWidth + cfg.gapX),
      y: cfg.offsetY + row * (cfg.featureHeight + cfg.gapY),
      width: cfg.featureWidth,
      height: cfg.featureHeight,
    });
  }

  return positions;
}

export function computeModuleExpandedHeight(
  featureCount: number,
  config: Partial<PackedLayoutConfig> = {},
): number {
  const cfg = { ...DEFAULT_CONFIG, ...config };
  const rows = Math.ceil(featureCount / cfg.columns);
  return cfg.offsetY + rows * (cfg.featureHeight + cfg.gapY) + 20;
}
