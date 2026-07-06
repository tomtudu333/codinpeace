# Stratoscope — Next Steps

## Immediate Polish (Before Phase 2C)

- [ ] **Camera center on selection**: When user clicks a module in sidebar or on canvas, smoothly pan camera to center on that module (use `camera.pan()` with animation).
- [ ] **Inspector close button**: Wire the X button in RightInspector to deselect the current node.
- [ ] **Sidebar navigation**: Replace toast placeholder with actual camera pan-to-module in LeftSidebar.
- [ ] **Reset camera button**: The command palette "Reset Camera" should work correctly (`camera.setPosition(0, 0, 1)`).

## Phase 2C — Function Boxes (Level 3)

This is the next big milestone. Functions appear as boxes inside feature cards, and `CodeBox`/`BezierConnector` are finally used.

### Scene Graph
- [ ] Create `FunctionNode.ts` — extends SceneNode with `FunctionMetadata` (name, params, returnType, lineCount, cyclomaticComplexity, calls, calledBy)
- [ ] Add `nodeType: 'function'` to the type union

### Mock Data
- [ ] Add `mockFunctions.ts` — 3–8 functions per feature with realistic signatures
- [ ] Add `getFunctions(featureId)` to `ModuleDataProvider` interface
- [ ] Implement in `MockModuleDataProvider`

### Layout
- [ ] Write a `CompactLayout` or tree layout for function boxes inside feature cards
- [ ] Functions should show as small code-snippet cards with connection points

### Visualization
- [ ] Create `FunctionCard.tsx` — tiny card showing function name, params, complexity
- [ ] Use `CodeBox` for the function body preview (collapsed by default)
- [ ] Create connections between functions that call each other using `BezierConnector`
- [ ] Use `ArrowHead` markers on connector endpoints
- [ ] Add `AnimatedParticlePath` for data flow visualization (optional, nice-to-have)

### Semantic Zoom (4 levels)
- [ ] Extend the continuous zoom model: functions fade in at zoom > ~3×
- [ ] Feature cards expand further to show function grid inside

### Level 3 Layout
```
Module (zoom 0.05x–1.2x)
  └── Feature grid (zoom 1.2x–3x)
       └── Function grid (zoom 3x+)
            └── CodeBox (zoom 5x+)
```

## Phase 3 — Advanced Layout Engine

After all 3 levels of visualization are stable:

- [ ] Replace `GridLayout`/`PackedLayout` with a formal layout engine supporting:
  - Force-directed layout for feature/function relationships
  - Tree layout for module hierarchies
  - Auto-layout on data load
  - Manual position overrides with persistence
- [ ] Viewport culling: only render cards that are visible in the current viewport
- [ ] Canvas-level LOD: at extreme zoom-out, draw cards directly on Canvas 2D instead of React overlay

## Phase 4 — Real Data Integration

- [ ] Real code parser (TypeScript AST, Python AST, etc.) implementing `ModuleDataProvider`
- [ ] Real metrics computation (complexity, coverage, dependencies)
- [ ] Real file system watcher for live updates
- [ ] Replace `MockModuleDataProvider` with real provider — zero UI changes needed

## Later Considerations

- **AI features**: Ask questions about the codebase, auto-summarize modules, suggest refactors
- **Persistence**: Save camera position, selection state, workspace layout across reloads
- **Performance**: Virtualized card rendering, GPU-accelerated canvas for large codebases
- **Extraction**: Design system → `packages/design-system` as a standalone npm package
