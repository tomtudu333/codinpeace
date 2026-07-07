export interface SceneNode {
  id: string;
  position: { x: number; y: number };
  size?: { width: number; height: number };
  scale: number;
  rotation: number;
  visible: boolean;
  children: SceneNode[];
  parent: SceneNode | null;
  metadata: Record<string, unknown>;
  style?: Record<string, unknown>;
  nodeType: 'module' | 'feature' | 'function';
  name: string;
}

export function createSceneNode(overrides?: Partial<SceneNode>): SceneNode {
  return {
    id: '',
    position: { x: 0, y: 0 },
    scale: 1,
    rotation: 0,
    visible: true,
    children: [],
    parent: null,
    metadata: {},
    nodeType: 'module',
    name: '',
    ...overrides,
  };
}
