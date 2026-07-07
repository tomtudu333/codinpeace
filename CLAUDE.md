# Notifications
Notifications are handled automatically by the `opencode-sound-alert` plugin (configured in global opencode.jsonc).
Plays Windows notification sounds on `session.idle`, `permission.asked`, and `session.error` events.
No manual action needed.

# CodinPeace Architecture

## Core Engine (src/core/Engine.ts)
Central orchestrator. Owns Camera, Scene, Renderer, Viewport.
- `start()`/`stop()` control the rAF render loop
- Each frame: `camera.update(dt)` → `scene.update(dt)` → `renderer.render(camera, viewport)`
- Reports `PerformanceStats` (fps, frameTime, objectCount, camera position/zoom)

## Scene Graph (src/scene/)
Two distinct concepts that are NOT the same type:
- **Scene** (`Scene.ts`) — container of `SceneObject[]`, calls `update()`/`render()` on each
- **SceneNode** (`SceneNode.ts`) — pure data interface (id, position, children tree, nodeType: 'module'|'feature'). NOT a SceneObject.
- **SceneObject** (`SceneObject.ts`) — abstract base class with position/size/visibility, abstract `render()` and `update()`
- **SceneGraph** (`SceneGraph.ts`) — manages a tree of SceneNode instances
- **ModuleNode** (`ModuleNode.ts`) — factory creating SceneNode with `ModuleMetadata` (name, icon, featureCount, complexityScore, healthScore, fileCount)
- **FeatureNode** (`FeatureNode.ts`) — factory creating SceneNode with `FeatureMetadata` (functionCount, classCount, complexityScore, documentationStatus)

Key gap: there's a bridge missing between SceneNode data → SceneObject renderables. ModuleNode/FeatureNode produce SceneNode data, but Scene holds SceneObject instances. Layout engines and visualization cards fill this gap.

## Layout Engines (src/layout/)
- **GridLayout** — computes grid-based positions from scene nodes
- **PackedLayout** — computes packed/force-directed positions

## Render Pipeline (src/renderer/)
- **Renderer** (`Renderer.ts`) — main drawing pipeline
- **Grid** (`Grid.ts`) — background grid rendering

## Visualization Layers (src/visualization/)
- **ModuleCard**, **FeatureCard** — card renderers for modules and features
- **SemanticZoomView** — view that switches between zoom levels

## Design System (src/design-system/)
44 components organized by category:
- `base/` — Button, Badge, Chip, Divider, IconButton, Panel, Card, etc.
- `feedback/` — LoadingSkeleton, ProgressIndicator, StatusIndicator, Toast
- `forms/` — Dropdown, SearchField, TextInput, Toggle
- `layout/` — DockPanel, ResizableContainer, ScrollContainer, SplitView, Stack
- `navigation/` — Breadcrumb, NavigationItem, Sidebar, Toolbar
- `overlay/` — CommandPalette, ContextMenu, Modal, Popover, Tooltip
- `surfaces/` — Card, ElevatedBox, FloatingPanel, GlassPanel, SurfaceContainer
- `connectors/` — AnimatedParticlePath, ArrowHead, BezierConnector
- `code/` — CodeBox, CodeHighlighter
- `showcase/` — ComponentShowcase
- `tokens/` — colors, spacing, typography, shadows, radius, blur, motion, zIndex, syntaxColors
- `theme/` — ThemeProvider (dark/light), useTheme

## Data Layer (src/data/)
- **ModuleDataProvider** (interface) — data access abstraction
- **MockModuleDataProvider** — mock implementation with mockFeatures + mockModules

## Graph Knowledge
- Knowledge graph available at `graphify-out/graph.json` (215 nodes, 232 edges, 32 communities)
- Interactive visualization at `graphify-out/graph.html`
- Query with: `graphify query "<question>"`
- Trace paths with: `graphify path "Node1" "Node2"`
