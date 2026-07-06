import React from 'react';
import { Panel } from '@/components/base/Panel';
import { Card } from '@/components/base/Card';
import { GlassContainer } from '@/components/base/GlassContainer';
import { Badge } from '@/components/base/Badge';
import { Tag } from '@/components/base/Tag';
import { Chip } from '@/components/base/Chip';
import { Button } from '@/components/base/Button';
import { IconButton } from '@/components/base/IconButton';
import { Divider } from '@/components/base/Divider';
import { MetricDisplay } from '@/components/base/MetricDisplay';
import { StatusIndicator } from '@/components/base/StatusIndicator';
import { SectionHeader } from '@/components/base/SectionHeader';
import { CollapsiblePanel } from '@/components/base/CollapsiblePanel';
import { PropertyRow } from '@/components/base/PropertyRow';
import { InformationBox } from '@/components/base/InformationBox';
import { MetricGrid } from '@/components/base/MetricGrid';
import { LoadingSkeleton } from '@/components/base/LoadingSkeleton';
import { EmptyState } from '@/components/base/EmptyState';
import { Tooltip } from '@/components/base/Tooltip';
import { FloatingToolbar } from '@/components/base/FloatingToolbar';
import { InspectorSection } from '@/components/base/InspectorSection';
import { MiniStatusWidget } from '@/components/base/MiniStatusWidget';
import { StackLayout } from '@/components/layout/StackLayout';
import { ScrollableContainer } from '@/components/layout/ScrollableContainer';
import { SearchField } from '@/components/forms/SearchField';
import { Accordion } from '@/components/navigation/Accordion';
import { Icon } from '@/icons';

interface ComponentShowcaseProps {
  visible: boolean;
  onClose: () => void;
}

export const ComponentShowcase: React.FC<ComponentShowcaseProps> = ({ visible, onClose }) => {
  if (!visible) return null;

  const [search, setSearch] = React.useState('');

  const sectionStyle: React.CSSProperties = {
    padding: 'var(--spacing-lg)',
    borderBottom: '1px solid var(--border-subtle)',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '10px',
    fontWeight: 600,
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    marginBottom: '8px',
  };

  const rowStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    alignItems: 'center',
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--bg-primary)',
        animation: 'fadeIn var(--anim-normal) var(--ease-out) forwards',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px var(--spacing-xl)',
          borderBottom: '1px solid var(--border-subtle)',
          background: 'var(--bg-surface)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Icon name="Grid" size={18} />
          <span style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>
            Component Library
          </span>
          <Badge variant="accent">v0.1.0</Badge>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '240px' }}>
          <SearchField value={search} onChange={setSearch} placeholder="Filter components..." />
          <IconButton icon="X" onClick={onClose} title="Close (Ctrl+Shift+D)" />
        </div>
      </div>

      <ScrollableContainer>
        <div style={{ padding: 'var(--spacing-xl)', maxWidth: '1200px', margin: '0 auto' }}>
          {search && (
            <div style={{ marginBottom: 'var(--spacing-lg)', color: 'var(--text-secondary)', fontSize: '13px' }}>
              Showing components matching "{search}"
            </div>
          )}

          {/* Panels & Containers */}
          <div style={sectionStyle}>
            <div style={labelStyle}>Panels & Containers</div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Panel elevation="flat" padding="md"><div style={{ fontSize: '12px' }}>Flat Panel</div></Panel>
              <Panel elevation="raised" padding="md"><div style={{ fontSize: '12px' }}>Raised Panel</div></Panel>
              <Panel elevation="overlay" padding="md"><div style={{ fontSize: '12px' }}>Overlay Panel</div></Panel>
              <Card hoverable padding="md"><div style={{ fontSize: '12px' }}>Hoverable Card</div></Card>
              <GlassContainer style={{ padding: '12px' }}><div style={{ fontSize: '12px' }}>Glass Container</div></GlassContainer>
            </div>
          </div>

          {/* Badges, Tags, Chips */}
          <div style={sectionStyle}>
            <div style={labelStyle}>Badges, Tags & Chips</div>
            <div style={rowStyle}>
              <Badge>Default</Badge>
              <Badge variant="info">Info</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="error">Error</Badge>
              <Badge variant="accent">Accent</Badge>
              <Tag>Tag</Tag>
              <Tag variant="info">Info Tag</Tag>
              <Tag variant="success">Success Tag</Tag>
              <Tag removable>Removable</Tag>
              <Chip>Chip</Chip>
              <Chip active>Active Chip</Chip>
            </div>
          </div>

          {/* Buttons */}
          <div style={sectionStyle}>
            <div style={labelStyle}>Buttons</div>
            <div style={rowStyle}>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="primary" size="sm">Small</Button>
              <Button variant="secondary" size="lg">Large</Button>
              <Button variant="secondary" icon="Search">With Icon</Button>
              <Button variant="primary" icon="Plus" iconPosition="right">Icon Right</Button>
              <Button variant="secondary" disabled>Disabled</Button>
              <Button icon="Plus" />
              <IconButton icon="Settings" />
              <IconButton icon="Settings" variant="primary" />
              <IconButton icon="Trash" variant="ghost" />
            </div>
          </div>

          {/* Status & Metrics */}
          <div style={sectionStyle}>
            <div style={labelStyle}>Status & Metrics</div>
            <div style={rowStyle}>
              <StatusIndicator status="info" label="Info" />
              <StatusIndicator status="success" label="Online" />
              <StatusIndicator status="warning" label="Warning" />
              <StatusIndicator status="error" label="Error" />
              <StatusIndicator status="none" label="Offline" />
              <StatusIndicator status="success" label="Pulse" pulse />
            </div>
            <div style={{ ...rowStyle, marginTop: '12px' }}>
              <MetricDisplay label="CPU" value="45.2%" trend="up" />
              <MetricDisplay label="Memory" value="1.4 GB" trend="down" />
              <MetricDisplay label="Latency" value="12ms" trend="neutral" />
              <MetricDisplay label="Requests" value="1,234" size="sm" />
            </div>
            <div style={{ marginTop: '12px', maxWidth: '300px' }}>
              <MetricGrid columns={2}>
                <MetricDisplay label="FPS" value="60" size="sm" />
                <MetricDisplay label="Frame" value="16.7ms" size="sm" />
                <MetricDisplay label="Objects" value="0" size="sm" />
                <MetricDisplay label="Draw Calls" value="2" size="sm" />
              </MetricGrid>
            </div>
          </div>

          {/* Indicators */}
          <div style={sectionStyle}>
            <div style={labelStyle}>Mini Status Widgets</div>
            <div style={{ maxWidth: '300px' }}>
              <MiniStatusWidget status="success" label="Renderer" value="WebGL" />
              <MiniStatusWidget status="info" label="Mode" value="Select" />
              <MiniStatusWidget status="warning" label="Memory" value="47.2 MB" />
              <MiniStatusWidget status="error" label="Errors" value="3" />
            </div>
          </div>

          {/* Information Boxes */}
          <div style={sectionStyle}>
            <div style={labelStyle}>Information Boxes</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '400px' }}>
              <InformationBox variant="info">This is an informational message.</InformationBox>
              <InformationBox variant="success" title="Completed">Operation completed successfully.</InformationBox>
              <InformationBox variant="warning">This action may have side effects.</InformationBox>
              <InformationBox variant="error" title="Error">Something went wrong. Please try again.</InformationBox>
            </div>
          </div>

          {/* Property Row */}
          <div style={sectionStyle}>
            <div style={labelStyle}>Property Rows</div>
            <div style={{ maxWidth: '300px' }}>
              <PropertyRow label="Name" value="app.module" />
              <PropertyRow label="Type" value="Component" />
              <PropertyRow label="Status" value={<StatusIndicator status="success" size="sm" />} />
              <PropertyRow label="Version" value="2.1.4" />
              <PropertyRow label="Path" value="/src/core/" />
            </div>
          </div>

          {/* Section Header & Inspector Section */}
          <div style={sectionStyle}>
            <div style={labelStyle}>Headers & Sections</div>
            <SectionHeader title="Overview" subtitle="Module details" />
            <SectionHeader title="Metrics" actions={<Button size="sm" variant="ghost" icon="Refresh" />} />
            <InspectorSection title="General Info">
              <PropertyRow label="ID" value="mdl_001" />
              <PropertyRow label="Status" value="Active" />
            </InspectorSection>
          </div>

          {/* Collapsible Panel */}
          <div style={sectionStyle}>
            <div style={labelStyle}>Collapsible Panel</div>
            <CollapsiblePanel title="Details">
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                This content can be shown or hidden.
              </div>
            </CollapsiblePanel>
            <CollapsiblePanel title="Configuration" defaultOpen={false}>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                Configuration options go here.
              </div>
            </CollapsiblePanel>
          </div>

          {/* Accordion */}
          <div style={sectionStyle}>
            <div style={labelStyle}>Accordion</div>
            <div style={{ maxWidth: '350px', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)' }}>
              <Accordion
                items={[
                  { id: '1', title: 'General', content: <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>General settings content.</div> },
                  { id: '2', title: 'Appearance', content: <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Theme and visual options.</div> },
                  { id: '3', title: 'Advanced', content: <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Advanced configuration.</div> },
                ]}
              />
            </div>
          </div>

          {/* Tooltip */}
          <div style={sectionStyle}>
            <div style={labelStyle}>Tooltip</div>
            <div style={rowStyle}>
              <Tooltip content="This is a tooltip">
                <Button variant="secondary" size="sm">Hover me</Button>
              </Tooltip>
              <Tooltip content="Top tooltip" position="top">
                <Button variant="secondary" size="sm">Top</Button>
              </Tooltip>
              <Tooltip content="Bottom tooltip" position="bottom">
                <Button variant="secondary" size="sm">Bottom</Button>
              </Tooltip>
              <Tooltip content="Right tooltip" position="right">
                <Button variant="secondary" size="sm">Right</Button>
              </Tooltip>
            </div>
          </div>

          {/* Empty State */}
          <div style={sectionStyle}>
            <div style={labelStyle}>Empty State</div>
            <Panel padding="lg" style={{ maxWidth: '300px' }}>
              <EmptyState icon="Search" title="No results found" description="Try adjusting your search terms or filters." />
            </Panel>
            <div style={{ marginTop: '8px' }}>
              <Panel padding="lg" style={{ maxWidth: '300px' }}>
                <EmptyState icon="Folder" title="No modules loaded" description="Open a project to get started." action={<Button variant="primary" size="sm">Open Project</Button>} />
              </Panel>
            </div>
          </div>

          {/* Loading */}
          <div style={sectionStyle}>
            <div style={labelStyle}>Loading States</div>
            <Panel padding="md" style={{ maxWidth: '300px' }}>
              <LoadingSkeleton count={3} />
            </Panel>
          </div>

          {/* Floating Toolbar */}
          <div style={sectionStyle}>
            <div style={labelStyle}>Floating Toolbar</div>
            <FloatingToolbar>
              <IconButton icon="Plus" variant="ghost" />
              <IconButton icon="Edit" variant="ghost" />
              <IconButton icon="Trash" variant="ghost" />
              <Divider orientation="vertical" />
              <IconButton icon="Copy" variant="ghost" />
              <IconButton icon="Download" variant="ghost" />
            </FloatingToolbar>
          </div>

          {/* Icons Grid */}
          <div style={sectionStyle}>
            <div style={labelStyle}>Icon Set</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {(['Home', 'Search', 'Layers', 'Settings', 'Help', 'Bookmark', 'History', 'Folder', 'File', 'Plus', 'Minus', 'X', 'Check', 'ChevronDown', 'ChevronRight', 'ChevronLeft', 'ChevronUp', 'Menu', 'MoreHorizontal', 'MoreVertical', 'Edit', 'Trash', 'Copy', 'Info', 'Warning', 'Error', 'Success', 'AlertCircle', 'Refresh', 'Eye', 'EyeOff', 'Code', 'Terminal', 'Command', 'Filter', 'Clock', 'User', 'Star', 'Grid', 'List', 'Maximize', 'Minimize', 'Expand', 'Collapse', 'Lock', 'Unlock', 'Link', 'ExternalLink', 'Sliders', 'Panel', 'Sidebar', 'Download', 'Upload', 'Play', 'Pause'] as const).map((name) => (
                <Tooltip key={name} content={name} position="top">
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-secondary)',
                      cursor: 'default',
                    }}
                  >
                    <Icon name={name} size={16} />
                  </div>
                </Tooltip>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div style={sectionStyle}>
            <div style={labelStyle}>Dividers</div>
            <div style={{ width: '200px' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Above</div>
              <Divider />
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>Below</div>
            </div>
          </div>

          {/* Stack Layout */}
          <div style={sectionStyle}>
            <div style={labelStyle}>Stack Layout</div>
            <StackLayout gap="8px">
              <div style={{ padding: '8px', background: 'rgba(255,255,255,0.03)', borderRadius: '4px', fontSize: '12px', color: 'var(--text-secondary)' }}>Item 1</div>
              <div style={{ padding: '8px', background: 'rgba(255,255,255,0.03)', borderRadius: '4px', fontSize: '12px', color: 'var(--text-secondary)' }}>Item 2</div>
              <div style={{ padding: '8px', background: 'rgba(255,255,255,0.03)', borderRadius: '4px', fontSize: '12px', color: 'var(--text-secondary)' }}>Item 3</div>
            </StackLayout>
          </div>

          {/* Form Elements */}
          <div style={sectionStyle}>
            <div style={labelStyle}>Form Elements</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '280px' }}>
              <SearchField value="" onChange={() => {}} placeholder="Search field..." />
            </div>
          </div>
        </div>
      </ScrollableContainer>
    </div>
  );
};
