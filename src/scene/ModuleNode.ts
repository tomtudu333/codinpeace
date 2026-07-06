import { SceneNode, createSceneNode } from './SceneNode';

export interface ModuleMetadata {
  name: string;
  icon: string;
  accentColor: string;
  featureCount: number;
  totalFunctions: number;
  complexityScore: number;
  healthScore: number;
  fileCount: number;
  description: string;
}

export function createModuleNode(
  id: string,
  name: string,
  metadata: ModuleMetadata,
  position?: { x: number; y: number },
): SceneNode {
  return createSceneNode({
    id,
    name,
    nodeType: 'module',
    position: position ?? { x: 0, y: 0 },
    size: { width: 320, height: 200 },
    metadata: metadata as unknown as Record<string, unknown>,
  });
}

export function isModuleNode(node: SceneNode): node is SceneNode & { metadata: ModuleMetadata } {
  return node.nodeType === 'module';
}

export function getModuleMetadata(node: SceneNode): ModuleMetadata | null {
  if (!isModuleNode(node)) return null;
  return node.metadata as unknown as ModuleMetadata;
}

export function getModuleFeatureCount(node: SceneNode): number {
  const meta = getModuleMetadata(node);
  return meta?.featureCount ?? 0;
}
