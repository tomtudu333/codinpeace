import React from 'react';
import { InspectorSection } from '@/components/base/InspectorSection';
import { PropertyRow } from '@/components/base/PropertyRow';
import { StatusIndicator } from '@/components/base/StatusIndicator';
import { MetricDisplay } from '@/components/base/MetricDisplay';
import { MetricGrid } from '@/components/base/MetricGrid';
import { MiniStatusWidget } from '@/components/base/MiniStatusWidget';
import { Divider } from '@/components/base/Divider';
import { Icon } from '@/icons';
import { IconButton } from '@/components/base/IconButton';
import './RightInspector.css';

export const RightInspector: React.FC = () => {
  return (
    <aside className="right-inspector">
      <div className="inspector-header-bar">
        <span className="inspector-label">Properties</span>
        <IconButton icon="X" variant="ghost" size={12} />
      </div>

      <div className="inspector-scroll">
        {/* Selection Info */}
        <InspectorSection title="Selection">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center', padding: '12px 0' }}>
            <div style={{ opacity: 0.3 }}>
              <Icon name="Info" size={24} />
            </div>
            <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-muted)' }}>Nothing selected</span>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.4 }}>
              Select an object on the canvas to inspect its properties
            </span>
          </div>
        </InspectorSection>

        <Divider />

        {/* General Info */}
        <InspectorSection title="General">
          <PropertyRow label="Name" value="—" />
          <PropertyRow label="Type" value="—" />
          <PropertyRow label="Status" value={<StatusIndicator status="none" size="sm" />} />
          <PropertyRow label="ID" value="—" />
        </InspectorSection>

        <Divider />

        {/* Position */}
        <InspectorSection title="Transform">
          <PropertyRow label="X" value="0 px" />
          <PropertyRow label="Y" value="0 px" />
          <PropertyRow label="Width" value="—" />
          <PropertyRow label="Height" value="—" />
          <PropertyRow label="Rotation" value="0\u00b0" />
        </InspectorSection>

        <Divider />

        {/* Metrics */}
        <InspectorSection title="Metrics">
          <MetricGrid columns={2}>
            <MetricDisplay label="Complexity" value="—" size="sm" />
            <MetricDisplay label="Dependents" value="—" size="sm" />
            <MetricDisplay label="Health" value={<StatusIndicator status="none" size="sm" />} size="sm" />
            <MetricDisplay label="Coverage" value="—" size="sm" />
          </MetricGrid>
        </InspectorSection>

        <Divider />

        {/* Status Widgets */}
        <InspectorSection title="System">
          <MiniStatusWidget status="info" label="Mode" value="Select" />
          <MiniStatusWidget status="success" label="Renderer" value="Canvas 2D" />
          <MiniStatusWidget status="none" label="Workspace" value="Local" />
        </InspectorSection>
      </div>
    </aside>
  );
};
