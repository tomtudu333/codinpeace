import { SceneNode, createSceneNode } from './SceneNode';

export interface FeatureMetadata {
  name: string;
  functionCount: number;
  classCount: number;
  complexityScore: number;
  apiCount: number;
  dbTableCount: number;
  testCoverage: number;
  documentationStatus: 'complete' | 'partial' | 'missing';
  description: string;
}

export function createFeatureNode(
  id: string,
  name: string,
  metadata: FeatureMetadata,
  position?: { x: number; y: number },
): SceneNode {
  return createSceneNode({
    id,
    name,
    nodeType: 'feature',
    position: position ?? { x: 0, y: 0 },
    size: { width: 240, height: 150 },
    metadata: metadata as unknown as Record<string, unknown>,
  });
}

export function isFeatureNode(node: SceneNode): node is SceneNode & { metadata: FeatureMetadata } {
  return node.nodeType === 'feature';
}

export function getFeatureMetadata(node: SceneNode): FeatureMetadata | null {
  if (!isFeatureNode(node)) return null;
  return node.metadata as unknown as FeatureMetadata;
}
