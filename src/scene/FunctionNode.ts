import { SceneNode, createSceneNode } from './SceneNode';
import type { LogicIconDef } from '@/data';

export interface FunctionMetadata {
  name: string;
  signature: string;
  complexity: number;
  lineStart: number;
  lineEnd: number;
  code: string;
  filePath: string;
  documentation: 'complete' | 'partial' | 'missing';
  calls: string[];
  calledBy: string[];
  logicIcons: LogicIconDef[];
  accentColor: string;
  paramCount: number;
  returnCount: number;
  dbCalls: number;
  apiCalls: number;
  estimatedCost: 'low' | 'medium' | 'high';
  testCoverage: number;
  parameters: string;
  returnType: string;
  description: string;
  tags: string[];
  developerNotes: string;
  width: number;
  height: number;
}

export function createFunctionNode(
  id: string,
  name: string,
  metadata: FunctionMetadata,
  position?: { x: number; y: number },
): SceneNode {
  return createSceneNode({
    id,
    name,
    nodeType: 'function',
    position: position ?? { x: 0, y: 0 },
    size: { width: metadata.width, height: metadata.height },
    metadata: metadata as unknown as Record<string, unknown>,
  });
}

export function isFunctionNode(node: SceneNode): node is SceneNode & { metadata: FunctionMetadata } {
  return node.nodeType === 'function';
}

export function getFunctionMetadata(node: SceneNode): FunctionMetadata | null {
  if (!isFunctionNode(node)) return null;
  return node.metadata as unknown as FunctionMetadata;
}
