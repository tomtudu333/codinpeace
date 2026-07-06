import { SceneNode } from './SceneNode';

export class SceneGraph {
  private _root: SceneNode;

  constructor() {
    this._root = {
      id: '__root__',
      position: { x: 0, y: 0 },
      scale: 1,
      rotation: 0,
      visible: true,
      children: [],
      parent: null,
      metadata: {},
      nodeType: 'module',
      name: 'root',
    };
  }

  get root(): SceneNode {
    return this._root;
  }

  addChild(parent: SceneNode, child: SceneNode): void {
    child.parent = parent;
    parent.children.push(child);
  }

  removeChild(child: SceneNode): void {
    const parent = child.parent;
    if (!parent) return;
    const index = parent.children.indexOf(child);
    if (index !== -1) {
      parent.children.splice(index, 1);
    }
    child.parent = null;
  }

  findById(id: string, start?: SceneNode): SceneNode | null {
    const node = start ?? this._root;
    if (node.id === id) return node;
    for (const child of node.children) {
      const found = this.findById(id, child);
      if (found) return found;
    }
    return null;
  }

  traverse(fn: (node: SceneNode, depth: number) => void, start?: SceneNode, depth?: number): void {
    const node = start ?? this._root;
    const d = depth ?? 0;
    fn(node, d);
    for (const child of node.children) {
      this.traverse(fn, child, d + 1);
    }
  }

  getPath(node: SceneNode): string[] {
    const path: string[] = [];
    let current: SceneNode | null = node;
    while (current && current.id !== '__root__') {
      path.unshift(current.id);
      current = current.parent;
    }
    return path;
  }

  getFlatList(nodeType?: 'module' | 'feature'): SceneNode[] {
    const list: SceneNode[] = [];
    this.traverse((node) => {
      if (node.id === '__root__') return;
      if (nodeType && node.nodeType !== nodeType) return;
      list.push(node);
    });
    return list;
  }

  getModules(): SceneNode[] {
    return this.getFlatList('module');
  }

  getFeatures(moduleId: string): SceneNode[] {
    const module = this.findById(moduleId);
    return module ? [...module.children] : [];
  }
}
