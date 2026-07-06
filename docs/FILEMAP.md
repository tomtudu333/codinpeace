# Stratoscope — File Map

## `src/design-system/` — UI Component Library

### Tokens
| File | Description |
|---|---|
| `tokens/colors.ts` | Dark + light color palettes |
| `tokens/spacing.ts` | Spacing scale (xs through 3xl) |
| `tokens/radius.ts` | Border radius scale |
| `tokens/shadows.ts` | Box shadow + glow presets |
| `tokens/blur.ts` | Backdrop blur values |
| `tokens/typography.ts` | Font families, sizes, weights |
| `tokens/motion.ts` | Animation durations, easings |
| `tokens/zIndex.ts` | Z-index layer values |
| `tokens/syntaxColors.ts` | Syntax highlighting colors |

### Theme
| File | Description |
|---|---|
| `theme/ThemeProvider.tsx` | CSS variable injection, context provider |
| `theme/useTheme.ts` | Hook: access theme mode + toggle |
| `theme/themes/dark.ts` | Dark theme CSS string generator |
| `theme/themes/light.ts` | Light theme CSS string generator |

### Animation
| File | Description |
|---|---|
| `animation/index.ts` | 14 keyframe CSSProperties + getAnimation() helper |
| `animation/index.css` | Same 14 @keyframes as real CSS |

### Icons
| File | Description |
|---|---|
| `icons/IconRegistry.tsx` | Icon component (name → SVG lookup) |
| `icons/icons.tsx` | 68 SVG icon components (Home, Search, Layers, Settings, etc.) |

### Hooks
| File | Description |
|---|---|
| `hooks/useClickOutside.ts` | Detect clicks outside an element |
| `hooks/useKeyboard.ts` | Register keyboard shortcuts |

### Base Components
| File | Description |
|---|---|
| `components/base/Button.tsx` | Button (primary/secondary/ghost/danger, sm/md/lg, icon positions) |
| `components/base/IconButton.tsx` | Icon-only button (primary/ghost/subtle) |
| `components/base/Badge.tsx` | Badge (6 color variants) |
| `components/base/Chip.tsx` | Chip (active, removable) |
| `components/base/Divider.tsx` | Horizontal divider |
| `components/base/Text.tsx` | Text (heading/body/caption/mono, 6 variants) |
| `components/base/Splitter.tsx` | Resize handle (vertical/horizontal, pointer capture) |
| `components/base/InspectorSection.tsx` | Collapsible section with title |
| `components/base/PropertyRow.tsx` | Label-value property row |
| `components/base/MetricDisplay.tsx` | Metric value with label, trend, icon |
| `components/base/MetricGrid.tsx` | CSS grid wrapper for MetricDisplay items |
| `components/base/MiniStatusWidget.tsx` | Small status indicator dot + label + value |

### Surface Components
| File | Description |
|---|---|
| `components/surfaces/GlassPanel.tsx` | Glassmorphism panel |
| `components/surfaces/Card.tsx` | Card (elevated/outlined/flat) |
| `components/surfaces/FloatingPanel.tsx` | Fixed-position floating panel |
| `components/surfaces/SurfaceContainer.tsx` | Surface depth container (low/medium/high) |
| `components/surfaces/ElevatedBox.tsx` | Box with elevation levels |

### Layout Components
| File | Description |
|---|---|
| `components/layout/Stack.tsx` | Flex container (vertical/horizontal, gap) |
| `components/layout/ScrollContainer.tsx` | Scrollable container with custom scrollbar |
| `components/layout/DockPanel.tsx` | Fixed edge panel (left/right/top/bottom) |
| `components/layout/SplitView.tsx` | Two-panel split layout |
| `components/layout/ResizableContainer.tsx` | Single-panel with resize handle |

### Feedback Components
| File | Description |
|---|---|
| `components/feedback/Toast.tsx` | Toast notification (success/error/warning/info) |
| `components/feedback/ToastContext.tsx` | ToastProvider + useToast context |
| `components/feedback/StatusIndicator.tsx` | Status dot (success/error/warning/info/none) |
| `components/feedback/LoadingSkeleton.tsx` | Skeleton loader (text/card/circle) |
| `components/feedback/ProgressIndicator.tsx` | Progress bar (determinate/indeterminate/circular/segmented) |

### Form Components
| File | Description |
|---|---|
| `components/forms/TextInput.tsx` | Styled text input with error state |
| `components/forms/Dropdown.tsx` | Dropdown select with popover list |
| `components/forms/Toggle.tsx` | Toggle switch |
| `components/forms/SearchField.tsx` | Search input with icon + clear |

### Navigation Components
| File | Description |
|---|---|
| `components/navigation/Toolbar.tsx` | Toolbar bar (48px) |
| `components/navigation/Sidebar.tsx` | Collapsible sidebar |
| `components/navigation/NavigationItem.tsx` | Nav item with icon + label + active state |
| `components/navigation/Breadcrumb.tsx` | Breadcrumb trail with separators |

### Overlay Components
| File | Description |
|---|---|
| `components/overlay/Modal.tsx` | Modal dialog with backdrop + escape |
| `components/overlay/Popover.tsx` | Anchor-relative popover |
| `components/overlay/Tooltip.tsx` | Tooltip (4 positions, hover delay) |
| `components/overlay/ContextMenu.tsx` | Right-click context menu with dividers |
| `components/overlay/CommandPalette.tsx` | ⌘K-style command palette with filter |

### Code Components
| File | Description |
|---|---|
| `components/code/CodeBox.tsx` | Code display panel with header/meta slots |
| `components/code/CodeHighlighter.tsx` | Regex-based syntax tokenizer |

### Connector Components
| File | Description |
|---|---|
| `components/connectors/BezierConnector.tsx` | SVG cubic Bézier curve with glow/arrow/particles |
| `components/connectors/ArrowHead.tsx` | SVG marker definition for arrowheads |
| `components/connectors/AnimatedParticlePath.tsx` | SVG circles with animateMotion along a path |

### Showcase
| File | Description |
|---|---|
| `components/showcase/ComponentShowcase.tsx` | Full-screen dev browser with 13 sections |

### Entry
| File | Description |
|---|---|
| `index.ts` | Single barrel export — all components, tokens, hooks, icons, animations, theme |
| `styles/global.css` | Global CSS reset + @import of animation keyframes |

---

## `src/scene/` — Object Model

| File | Description |
|---|---|
| `SceneNode.ts` | Base interface: id, position, size, children, parent, metadata, nodeType |
| `ModuleNode.ts` | Factory + type guard; ModuleMetadata (name, icon, accentColor, scores) |
| `FeatureNode.ts` | Factory + type guard; FeatureMetadata (functionCount, complexity, coverage) |
| `SceneGraph.ts` | Tree: addChild, removeChild, findById, traverse, getFlatList, getModules, getFeatures |
| `index.ts` | Barrel export for scene module |

---

## `src/data/` — Data Access Layer

| File | Description |
|---|---|
| `ModuleDataProvider.ts` | Interface: getModules(), getFeatures(moduleId) |
| `mock/mockModules.ts` | 8 modules (User, Customer, Product, Order, Payment, Inventory, Reports, Auth) |
| `mock/mockFeatures.ts` | 50 features across 8 modules |
| `mock/MockModuleDataProvider.ts` | Mock implementation of ModuleDataProvider |
| `index.ts` | Barrel export |

---

## `src/layout/` — Layout Algorithms

| File | Description |
|---|---|
| `GridLayout.ts` | Grid layout for modules (configurable columns, gap, card size, origin) |
| `PackedLayout.ts` | Packed grid layout for features inside modules |
| `index.ts` | Barrel export |

---

## `src/visualization/` — Visualization Components

| File | Description |
|---|---|
| `ModuleCard.tsx` | Module card with GlassPanel, metrics, and nested feature card grid |
| `FeatureCard.tsx` | Standalone feature card (available for future use) |
| `SemanticZoomView.tsx` | Canvas overlay: positions cards via worldToScreen, drives zoom tracking |
| `index.ts` | Barrel export |

---

## `src/app/` — Application Layer

| File | Description |
|---|---|
| `App.tsx` | Main app: ThemeProvider + ToastProvider + layout grid + panels + SemanticZoomView |
| `App.css` | Grid layout for toolbar/sidebar/canvas/inspector/status |
| `main.tsx` | Entry point — imports App + global CSS |
| `canvas/Canvas.tsx` | Canvas element wrapper, creates Engine, handles camera controls |
| `canvas/Canvas.css` | Canvas container styles |
| `panels/TopToolbar.tsx` | Header bar with logo, icon toolbar, showcase toggle |
| `panels/TopToolbar.css` | TopToolbar styles |
| `panels/LeftSidebar.tsx` | Module explorer sidebar with navigation |
| `panels/LeftSidebar.css` | LeftSidebar styles |
| `panels/RightInspector.tsx` | Property inspector showing selected node data |
| `panels/RightInspector.css` | RightInspector styles |
| `panels/StatusBar.tsx` | Status bar showing FPS, object count, camera position |
| `panels/StatusBar.css` | StatusBar styles |

---

## Phase 1 — Core Engine (Unchanged)

| File | Description |
|---|---|
| `core/Engine.ts` | Main animation loop: camera.update → scene.update → renderer.render |
| `camera/Camera.ts` | Pan, zoomToward, worldToScreen, screenToWorld, inertia |
| `scene/Scene.ts` | Scene object list, update/render dispatch |
| `scene/SceneObject.ts` | Abstract renderable with x, y, width, height |
| `renderer/Renderer.ts` | Canvas 2D rendering with Retina support |
| `renderer/Grid.ts` | Infinite background grid |
| `types/index.ts` | Viewport, PerformanceStats interfaces |
