# Stratoscope Architecture

## Project Structure

```
src/
  design-system/          Phase 2A — UI library (extractable, 44 components)
    tokens/               Design tokens (colors, spacing, radius, shadows, etc.)
    theme/                ThemeProvider + dark/light CSS variable injection
    animation/            14 keyframe animations + JS helper
    icons/                68 SVG icon components + IconRegistry
    components/           All UI components by category
      base/               Button, IconButton, Badge, Chip, Divider, Text, Splitter,
                          InspectorSection, PropertyRow, MetricDisplay, MetricGrid, MiniStatusWidget
      surfaces/           GlassPanel, Card, FloatingPanel, SurfaceContainer, ElevatedBox
      layout/             Stack, ScrollContainer, DockPanel, SplitView, ResizableContainer
      feedback/           Toast, ToastProvider, StatusIndicator, LoadingSkeleton, ProgressIndicator
      forms/              TextInput, Dropdown, Toggle, SearchField
      navigation/         Toolbar, Sidebar, NavigationItem, Breadcrumb
      overlay/            Modal, Popover, Tooltip, ContextMenu, CommandPalette
      code/               CodeBox, CodeHighlighter (regex tokenizer)
      connectors/         BezierConnector, ArrowHead, AnimatedParticlePath
      showcase/           ComponentShowcase (dev browser)
    hooks/                useClickOutside, useKeyboard
    styles/               global.css (reset + keyframe import)
    index.ts              Single barrel export — app imports ONLY from here

  scene/                  Phase 2B — Object model
    SceneNode.ts           Base interface (id, position, children, parent, metadata, nodeType)
    ModuleNode.ts          Factory + type guard for modules (ModuleMetadata)
    FeatureNode.ts         Factory + type guard for features (FeatureMetadata)
    SceneGraph.ts          Tree with findById, traverse, addChild, removeChild, getFlatList
    Scene.ts               Phase 1 — renderable scene (kept unchanged)

  data/                   Phase 2B — Data access layer
    ModuleDataProvider.ts  Interface (getModules, getFeatures) — swap point for real parser
    mock/
      mockModules.ts      8 modules (User, Customer, Product, Order, Payment, Inventory, Reports, Auth)
      mockFeatures.ts     50 features across 8 modules
      MockModuleDataProvider.ts  Mock implementation of ModuleDataProvider

  layout/                 Phase 2B — Layout algorithms
    GridLayout.ts         Positions modules in a grid (configurable columns, gap, origin)
    PackedLayout.ts       Positions features in rows inside module bounds

  visualization/          Phase 2B — Visual components
    ModuleCard.tsx        Renders a module with nested feature cards (semantic zoom)
    FeatureCard.tsx       Standalone feature card (unused in current zoom approach, kept for future)
    SemanticZoomView.tsx  Top-level orchestrator: canvas overlay, card positioning, zoom tracking
    index.ts              Barrel export

  app/                    Application layer
    App.tsx               Main app: composes panels + SemanticZoomView + theme + keyboard
    canvas/
      Canvas.tsx          Phase 1 canvas wrapper (imports Engine)
    panels/
      TopToolbar.tsx       Header with logo, icon toolbar, showcase toggle
      LeftSidebar.tsx      Module explorer with navigation
      RightInspector.tsx   Property inspector — shows real mock data for selected node
      StatusBar.tsx        FPS, frame time, object/renderer/workspace info

  core/                   Phase 1 — Engine
    Engine.ts             Main loop: camera → scene → renderer, 60fps rAF

  camera/                 Phase 1 — Camera
    Camera.ts             World-to-screen projection, pan, zoomToward, inertia

  scene/ (Phase 1)        Phase 1 — Scene
    Scene.ts              Array of SceneObjects, update/render dispatch

  renderer/               Phase 1 — Renderer
    Renderer.ts           Canvas 2D context, grid drawing
    Grid.ts               Infinite grid overlay

  types/                  Shared types
    index.ts              Viewport, PerformanceStats
```

## Data Flow

```
ModuleDataProvider (mock or real)
  → SceneGraph (tree of SceneNodes)
    → SemanticZoomView (reads camera state every frame via rAF)
      → ModuleCard (rendered in canvas overlay at worldToScreen position)
        → FeatureCard grid (inside ModuleCard, fades in at zoom > 1.2x)
      → RightInspector (receives selectedNode via callback)
      → StatusBar (receives visibleCount via callback)
```

## Coordinate System

- **World space**: Infinite plane where modules/features live. Module (320×200), Feature (240×150).
- **Screen space**: Pixel positions on the viewport.
- **Camera** (`Camera.ts`): `worldToScreen(wx, wy) → [sx, sy]` and `screenToWorld(sx, sy) → [wx, wy]`.
- **Card positioning**: Module cards are positioned at `camera.worldToScreen(worldX, worldY)`. Card width = `worldWidth × zoom`. This creates the "zoom like HD image" effect — cards scale naturally with the camera zoom, no discrete breakpoints.
- **Feature cards**: Rendered inside ModuleCard as a CSS grid, fades in smoothly between 1.2× and 2.5× zoom.

## Import Rules

- `app/` → may only import from `design-system/index.ts` (no deep imports)
- `visualization/` → imports from `design-system/index.ts`, `scene/`, `data/`, `layout/`
- `design-system/` → never imports from `app/` or any visualization/scene/data code
- Phase 1 (`core/`, `camera/`, `renderer/`, `scene/Scene.ts`) → untouched, no dependencies on new code

## Camera Viewport Projection

```
screenX = (worldX - camera.x) × camera.zoom + viewport.width / 2
screenY = (worldY - camera.y) × camera.zoom + viewport.height / 2
```

Card size on screen = worldSize × camera.zoom (linear scaling — true zoom, no discrete levels).

## Semantic Zoom (Continuous Model)

| Zoom Range | Behavior |
|---|---|
| 0.05× – 0.8× | All modules visible as small colored dots (icon only) |
| 0.8× – 1.2× | Module cards show name + metrics, readable |
| 1.2× – 2.5× | Feature cards fade in inside module card (CSS grid, 2 columns) |
| 2.5×+ | Full detail: feature names, metrics, hover highlights |

No discrete state machine. The `zoom` value from the camera drives everything. Cards scale continuously. Feature opacity uses a smooth linear ramp: `clamp((zoom - 1.2) / 1.3, 0, 1)`.
