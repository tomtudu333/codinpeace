import React, { useState } from 'react';
import { Icon } from '../../icons';
import { Button } from '../base/Button';
import { IconButton } from '../base/IconButton';
import { Badge } from '../base/Badge';
import { Chip } from '../base/Chip';
import { Divider } from '../base/Divider';
import { Text } from '../base/Text';
import { GlassPanel } from '../surfaces/GlassPanel';
import { Card } from '../surfaces/Card';
import { FloatingPanel } from '../surfaces/FloatingPanel';
import { ElevatedBox } from '../surfaces/ElevatedBox';
import Stack from '../layout/Stack';
import ScrollContainer from '../layout/ScrollContainer';
import DockPanel from '../layout/DockPanel';
import SplitView from '../layout/SplitView';
import { CodeBox } from '../code/CodeBox';
import { BezierConnector } from '../connectors/BezierConnector';
import { Tooltip } from '../overlay/Tooltip';
import { Modal } from '../overlay/Modal';
import { ContextMenu } from '../overlay/ContextMenu';
import NavigationItem from '../navigation/NavigationItem';
import Breadcrumb from '../navigation/Breadcrumb';

interface ComponentShowcaseProps {
  visible: boolean;
  onClose: () => void;
}

const functionSnippet = `function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}`;

const classSnippet = `class GraphNode<T> {
  private edges: Map<string, T> = new Map();

  constructor(public id: string, public data: T) {}

  addEdge(target: string, weight: T): void {
    this.edges.set(target, weight);
  }
}`;

const jsxSnippet = `const App: React.FC = () => {
  const [count, setCount] = useState(0);
  return (
    <div className="app">
      <h1>Hello World</h1>
      <button onClick={() => setCount(c => c + 1)}>
        Count: {count}
      </button>
    </div>
  );
};`;

const sectionStyle: React.CSSProperties = {
  marginBottom: 'var(--spacing-xl)',
};

const sectionLabelStyle: React.CSSProperties = {
  fontSize: 'var(--font-lg)',
  fontWeight: 700,
  color: 'var(--text-primary)',
  marginBottom: 'var(--spacing-md)',
  paddingBottom: 'var(--spacing-xs)',
  borderBottom: '1px solid var(--border-subtle)',
};

const rowStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 'var(--spacing-sm)',
  alignItems: 'center',
  marginBottom: 'var(--spacing-sm)',
};

const labelStyle: React.CSSProperties = {
  fontSize: 'var(--font-xs)',
  color: 'var(--text-tertiary)',
  marginBottom: 'var(--spacing-xs)',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
};

const inlineDemoItem: React.CSSProperties = {
  background: 'var(--bg-surface)',
  border: '1px solid var(--border-subtle)',
  borderRadius: 'var(--radius-md)',
  padding: 'var(--spacing-sm) var(--spacing-md)',
  fontSize: 'var(--font-sm)',
  color: 'var(--text-primary)',
  cursor: 'pointer',
};

const relativeBox: React.CSSProperties = {
  position: 'relative',
  width: 400,
  height: 150,
  margin: 'var(--spacing-md) 0',
};

const connectorCenterStyle: React.CSSProperties = {
  position: 'absolute',
  width: 20,
  height: 20,
  borderRadius: '50%',
  background: 'var(--accent-primary-dim)',
  border: '2px solid var(--accent-primary)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 'var(--font-xs)',
  color: 'var(--accent-primary)',
};

export const ComponentShowcase: React.FC<ComponentShowcaseProps> = ({
  visible,
  onClose,
}) => {
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [contextOpen, setContextOpen] = useState(false);
  const [contextPos, setContextPos] = useState({ x: 0, y: 0 });

  if (!visible) return null;

  const backdropStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    background: 'var(--bg-overlay)',
    zIndex: 'var(--z-modal)',
    display: 'flex',
    flexDirection: 'column',
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 'var(--spacing-md) var(--spacing-lg)',
    background: 'var(--bg-surface)',
    borderBottom: '1px solid var(--border-default)',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: 'var(--font-xl)',
    fontWeight: 700,
    color: 'var(--text-primary)',
  };

  const searchStyle: React.CSSProperties = {
    padding: 'var(--spacing-sm) var(--spacing-md)',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border-default)',
    background: 'var(--bg-surface)',
    color: 'var(--text-primary)',
    fontSize: 'var(--font-sm)',
    outline: 'none',
    width: 240,
  };

  const scrollStyle: React.CSSProperties = {
    flex: 1,
    overflow: 'auto',
    padding: 'var(--spacing-lg)',
    scrollbarWidth: 'thin',
    scrollbarColor: 'var(--border-default) transparent',
  };

  const toastDemoStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-sm)',
    padding: 'var(--spacing-sm) var(--spacing-md)',
    background: 'var(--accent-success-dim)',
    border: '1px solid var(--accent-success)',
    borderRadius: 'var(--radius-md)',
    color: 'var(--accent-success)',
    fontSize: 'var(--font-sm)',
  };

  return (
    <div style={backdropStyle}>
      <div style={headerStyle}>
        <span style={titleStyle}>Component Showcase</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
          <input
            type="text"
            placeholder="Filter components..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={searchStyle}
          />
          <IconButton icon="X" size={16} variant="ghost" onClick={onClose} title="Close" />
        </div>
      </div>
      <div style={scrollStyle}>
        <div style={sectionStyle}>
          <div style={sectionLabelStyle}>Base / Button</div>
          <div style={labelStyle}>Variants</div>
          <div style={rowStyle}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </div>
          <div style={labelStyle}>Sizes</div>
          <div style={rowStyle}>
            <Button size="sm" variant="primary">Small</Button>
            <Button size="md" variant="primary">Medium</Button>
            <Button size="lg" variant="primary">Large</Button>
          </div>
        </div>

        <div style={sectionStyle}>
          <div style={sectionLabelStyle}>Base / IconButton</div>
          <div style={rowStyle}>
            <IconButton icon="Search" variant="primary" />
            <IconButton icon="Settings" variant="ghost" />
            <IconButton icon="Trash" variant="subtle" />
            <IconButton icon="Edit" variant="ghost" disabled />
          </div>
        </div>

        <div style={sectionStyle}>
          <div style={sectionLabelStyle}>Base / Badge</div>
          <div style={rowStyle}>
            <Badge variant="default">Default</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="info">Info</Badge>
          </div>
          <div style={rowStyle}>
            <Badge size="sm" variant="primary">Small</Badge>
            <Badge size="md" variant="primary">Medium</Badge>
          </div>
        </div>

        <div style={sectionStyle}>
          <div style={sectionLabelStyle}>Base / Chip</div>
          <div style={rowStyle}>
            <Chip>Default Chip</Chip>
            <Chip active>Active Chip</Chip>
            <Chip onRemove={() => {}}>Removable Chip</Chip>
            <Chip active onRemove={() => {}}>Active Removable</Chip>
          </div>
        </div>

        <div style={sectionStyle}>
          <div style={sectionLabelStyle}>Base / Divider</div>
          <div style={{ ...rowStyle, height: 32 }}>
            <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>Left</span>
            <Divider orientation="vertical" />
            <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>Right</span>
          </div>
          <Divider />
        </div>

        <div style={sectionStyle}>
          <div style={sectionLabelStyle}>Base / Text</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)' }}>
            <Text variant="heading">Heading Variant</Text>
            <Text variant="body">Body variant with default sizing.</Text>
            <Text variant="caption">Caption variant — smaller and muted.</Text>
            <Text variant="label">Label variant — semibold and tertiary.</Text>
            <Text variant="mono">Mono variant — monospace font.</Text>
            <Text variant="body" size="xl" weight="bold">Body XL Bold</Text>
          </div>
        </div>

        <div style={sectionStyle}>
          <div style={sectionLabelStyle}>Surfaces / GlassPanel</div>
          <GlassPanel>
            <div style={{ padding: 'var(--spacing-md)', color: 'var(--text-primary)', fontSize: 'var(--font-sm)' }}>
              Glass panel with backdrop blur
            </div>
          </GlassPanel>
        </div>

        <div style={sectionStyle}>
          <div style={sectionLabelStyle}>Surfaces / Card</div>
          <div style={rowStyle}>
            <Card variant="default"><span style={{ fontSize: 'var(--font-sm)' }}>Default</span></Card>
            <Card variant="raised"><span style={{ fontSize: 'var(--font-sm)' }}>Raised</span></Card>
            <Card variant="bordered"><span style={{ fontSize: 'var(--font-sm)' }}>Bordered</span></Card>
          </div>
        </div>

        <div style={sectionStyle}>
          <div style={sectionLabelStyle}>Surfaces / FloatingPanel</div>
          <FloatingPanel visible x={0} y={0}>
            <div style={{ padding: 'var(--spacing-md)', color: 'var(--text-primary)', fontSize: 'var(--font-sm)' }}>
              Floating panel (positioned inline)
            </div>
          </FloatingPanel>
        </div>

        <div style={sectionStyle}>
          <div style={sectionLabelStyle}>Surfaces / ElevatedBox</div>
          <div style={rowStyle}>
            <ElevatedBox elevation="sm"><span style={{ fontSize: 'var(--font-sm)' }}>SM</span></ElevatedBox>
            <ElevatedBox elevation="md"><span style={{ fontSize: 'var(--font-sm)' }}>MD</span></ElevatedBox>
            <ElevatedBox elevation="lg"><span style={{ fontSize: 'var(--font-sm)' }}>LG</span></ElevatedBox>
          </div>
        </div>

        <div style={sectionStyle}>
          <div style={sectionLabelStyle}>Layout / Stack</div>
          <Stack direction="horizontal" gap="var(--spacing-sm)">
            <div style={inlineDemoItem}>Item 1</div>
            <div style={inlineDemoItem}>Item 2</div>
            <div style={inlineDemoItem}>Item 3</div>
          </Stack>
        </div>

        <div style={sectionStyle}>
          <div style={sectionLabelStyle}>Layout / ScrollContainer</div>
          <ScrollContainer>
            <div style={{ height: 80, display: 'flex', flexDirection: 'column', gap: 4, padding: 'var(--spacing-xs) 0' }}>
              {Array.from({ length: 8 }, (_, i) => (
                <span key={i} style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Scrollable line {i + 1}
                </span>
              ))}
            </div>
          </ScrollContainer>
        </div>

        <div style={sectionStyle}>
          <div style={sectionLabelStyle}>Layout / DockPanel</div>
          <div style={{ position: 'relative', height: 48, border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
            <DockPanel position="top">
              <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>Docked Top Bar</span>
            </DockPanel>
          </div>
        </div>

        <div style={sectionStyle}>
          <div style={sectionLabelStyle}>Layout / SplitView</div>
          <div style={{ height: 120, border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
            <SplitView direction="horizontal" defaultRatio={0.4}>
              <div style={{ padding: 'var(--spacing-sm)', fontSize: 'var(--font-xs)', color: 'var(--text-secondary)' }}>Left panel</div>
              <div style={{ padding: 'var(--spacing-sm)', fontSize: 'var(--font-xs)', color: 'var(--text-secondary)' }}>Right panel</div>
            </SplitView>
          </div>
        </div>

        <div style={sectionStyle}>
          <div style={sectionLabelStyle}>Feedback / Toast</div>
          <div style={toastDemoStyle}>
            <Icon name="Success" size={14} />
            <span>Operation completed successfully</span>
          </div>
          <div style={{ marginTop: 'var(--spacing-xs)', display: 'flex', gap: 'var(--spacing-sm)' }}>
            <span style={inlineDemoItem}>StatusIndicator</span>
            <span style={{ ...inlineDemoItem, opacity: 0.5, animation: 'skeletonPulse 1.5s ease-in-out infinite' }}>
              LoadingSkeleton
            </span>
            <span style={inlineDemoItem}>ProgressIndicator</span>
          </div>
        </div>

        <div style={sectionStyle}>
          <div style={sectionLabelStyle}>Forms</div>
          <div style={rowStyle}>
            <input
              type="text"
              placeholder="TextInput..."
              style={{
                padding: 'var(--spacing-sm) var(--spacing-md)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-default)',
                background: 'var(--bg-surface)',
                color: 'var(--text-primary)',
                fontSize: 'var(--font-sm)',
                outline: 'none',
              }}
            />
            <div style={{
              width: 36,
              height: 20,
              borderRadius: 10,
              background: 'var(--accent-primary)',
              position: 'relative',
              cursor: 'pointer',
            }}>
              <div style={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                background: 'var(--text-on-accent)',
                position: 'absolute',
                top: 2,
                right: 2,
              }} />
            </div>
            <div style={inlineDemoItem}>Dropdown ▼</div>
            <div style={inlineDemoItem}><Icon name="Search" size={12} /> SearchField</div>
          </div>
        </div>

        <div style={sectionStyle}>
          <div style={sectionLabelStyle}>Navigation / NavigationItem</div>
          <div style={{ width: 200, display: 'flex', flexDirection: 'column' }}>
            <NavigationItem icon="Home" label="Home" active />
            <NavigationItem icon="Search" label="Explore" />
            <NavigationItem icon="Settings" label="Settings" />
          </div>
        </div>

        <div style={sectionStyle}>
          <div style={sectionLabelStyle}>Navigation / Breadcrumb</div>
          <Breadcrumb
            items={[
              { label: 'Home', onClick: () => {} },
              { label: 'Projects' },
              { label: 'Current' },
            ]}
          />
        </div>

        <div style={sectionStyle}>
          <div style={sectionLabelStyle}>Overlay / Tooltip</div>
          <Tooltip content="This is a tooltip">
            <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', cursor: 'pointer', borderBottom: '1px dashed var(--border-default)' }}>
              Hover me
            </span>
          </Tooltip>
        </div>

        <div style={sectionStyle}>
          <div style={sectionLabelStyle}>Overlay / Modal</div>
          <Button variant="primary" onClick={() => setModalOpen(true)}>Open Modal</Button>
          <Modal visible={modalOpen} onClose={() => setModalOpen(false)} title="Demo Modal">
            <Text variant="body">This is a modal dialog for demonstration purposes.</Text>
          </Modal>
        </div>

        <div style={sectionStyle}>
          <div style={sectionLabelStyle}>Overlay / ContextMenu</div>
          <Button
            variant="secondary"
            onClick={() => {
              setContextPos({ x: 100, y: 100 });
              setContextOpen(true);
            }}
          >
            Right-click (or click) to open
          </Button>
          {contextOpen && (
            <ContextMenu
              items={[
                { id: 'copy', label: 'Copy', icon: 'Copy', onClick: () => {} },
                { id: 'edit', label: 'Edit', icon: 'Edit', onClick: () => {} },
                { id: 'divider1', label: '', divider: true, onClick: () => {} },
                { id: 'delete', label: 'Delete', icon: 'Trash', onClick: () => {}, disabled: true },
              ]}
              x={contextPos.x}
              y={contextPos.y}
              onClose={() => setContextOpen(false)}
            />
          )}
        </div>

        <div style={sectionStyle}>
          <div style={sectionLabelStyle}>Code / CodeBox</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
            <CodeBox
              code={functionSnippet}
              language="typescript"
              header="fibonacci.ts"
              meta="TypeScript function"
            />
            <CodeBox
              code={classSnippet}
              language="typescript"
              header="GraphNode.ts"
            />
            <CodeBox
              code={jsxSnippet}
              language="tsx"
              header="App.tsx"
            />
          </div>
        </div>

        <div style={sectionStyle}>
          <div style={sectionLabelStyle}>Connectors / BezierConnector</div>
          <div style={relativeBox}>
            <div style={{ ...connectorCenterStyle, top: 80, left: 40 }}>A</div>
            <div style={{ ...connectorCenterStyle, top: 80, left: 340 }}>B</div>
            <BezierConnector
              from={{ x: 60, y: 90 }}
              to={{ x: 340, y: 90 }}
              animated
              arrowEnd
              highlighted
            />
          </div>
        </div>
      </div>
    </div>
  );
};
