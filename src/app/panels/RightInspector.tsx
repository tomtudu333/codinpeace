import React from 'react';
import { Icon, IconButton, Divider, InspectorSection, PropertyRow, StatusIndicator, MetricDisplay, MetricGrid, MiniStatusWidget } from '@/design-system';
import { SceneNode, isModuleNode, getModuleMetadata, isFeatureNode, getFeatureMetadata } from '@/scene';
import './RightInspector.css';

interface RightInspectorProps {
  selectedNode: SceneNode | null;
}

const coverageColor = (pct: number): 'success' | 'warning' | 'error' => {
  if (pct >= 80) return 'success';
  if (pct >= 50) return 'warning';
  return 'error';
};

const docStatusColor = (status: string): 'success' | 'warning' | 'error' => {
  if (status === 'complete') return 'success';
  if (status === 'partial') return 'warning';
  return 'error';
};

export const RightInspector: React.FC<RightInspectorProps> = ({ selectedNode }) => {
  const moduleMeta = selectedNode && isModuleNode(selectedNode) ? getModuleMetadata(selectedNode) : null;
  const featureMeta = selectedNode && isFeatureNode(selectedNode) ? getFeatureMetadata(selectedNode) : null;

  const renderSelectionEmpty = () => (
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
  );

  const renderModuleData = () => {
    if (!moduleMeta) return null;
    return (
      <>
        <InspectorSection title="Selection">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '4px 0' }}>
            <div style={{ color: moduleMeta.accentColor, display: 'flex' }}>
              <Icon name={moduleMeta.icon as any} size={20} />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>{moduleMeta.name}</div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{moduleMeta.description}</div>
            </div>
          </div>
        </InspectorSection>

        <Divider />

        <InspectorSection title="General">
          <PropertyRow label="Name" value={moduleMeta.name} />
          <PropertyRow label="Type" value="Module" />
          <PropertyRow label="Status" value={<StatusIndicator status={moduleMeta.healthScore >= 80 ? 'success' : moduleMeta.healthScore >= 60 ? 'warning' : 'error'} size="sm" />} />
          <PropertyRow label="ID" value={selectedNode?.id ?? '—'} />
          <PropertyRow label="Files" value={`${moduleMeta.fileCount}`} />
        </InspectorSection>

        <Divider />

        <InspectorSection title="Metrics">
          <MetricGrid columns={2}>
            <MetricDisplay label="Features" value={moduleMeta.featureCount} size="sm" />
            <MetricDisplay label="Functions" value={moduleMeta.totalFunctions} size="sm" />
            <MetricDisplay label="Complexity" value={moduleMeta.complexityScore} size="sm" color={moduleMeta.complexityScore > 70 ? 'var(--status-warning)' : 'var(--text-primary)'} />
            <MetricDisplay label="Health" value={`${moduleMeta.healthScore}%`} size="sm" color={`var(--status-${moduleMeta.healthScore >= 80 ? 'success' : moduleMeta.healthScore >= 60 ? 'warning' : 'error'})`} />
          </MetricGrid>
        </InspectorSection>

        <Divider />

        <InspectorSection title="System">
          <MiniStatusWidget status="info" label="Mode" value="Select" />
          <MiniStatusWidget status="success" label="Renderer" value="Canvas 2D" />
          <MiniStatusWidget status="none" label="Children" value={`${selectedNode?.children.length ?? 0} features`} />
        </InspectorSection>
      </>
    );
  };

  const renderFeatureData = () => {
    if (!featureMeta) return null;
    return (
      <>
        <InspectorSection title="Selection">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '4px 0' }}>
            <div style={{ opacity: 0.7, display: 'flex' }}>
              <Icon name="Code" size={20} />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>{featureMeta.name}</div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{featureMeta.description}</div>
            </div>
          </div>
        </InspectorSection>

        <Divider />

        <InspectorSection title="General">
          <PropertyRow label="Name" value={featureMeta.name} />
          <PropertyRow label="Type" value="Feature" />
          <PropertyRow label="ID" value={selectedNode?.id ?? '—'} />
          <PropertyRow label="Module" value={selectedNode?.parent?.name ?? '—'} />
        </InspectorSection>

        <Divider />

        <InspectorSection title="Metrics">
          <MetricGrid columns={2}>
            <MetricDisplay label="Functions" value={featureMeta.functionCount} size="sm" />
            <MetricDisplay label="Classes" value={featureMeta.classCount} size="sm" />
            <MetricDisplay label="Complexity" value={featureMeta.complexityScore} size="sm" />
            <MetricDisplay label="API Routes" value={featureMeta.apiCount} size="sm" />
          </MetricGrid>
        </InspectorSection>

        <Divider />

        <InspectorSection title="Quality">
          <MetricGrid columns={2}>
            <MetricDisplay label="Test Coverage" value={`${featureMeta.testCoverage}%`} size="sm" color={`var(--status-${coverageColor(featureMeta.testCoverage)})`} />
            <MetricDisplay label="DB Tables" value={featureMeta.dbTableCount} size="sm" />
            <MetricDisplay label="Documentation" value={featureMeta.documentationStatus} size="sm" color={`var(--status-${docStatusColor(featureMeta.documentationStatus)})`} />
          </MetricGrid>
        </InspectorSection>
      </>
    );
  };

  return (
    <aside className="right-inspector">
      <div className="inspector-header-bar">
        <span className="inspector-label">Properties</span>
        <IconButton icon="X" variant="ghost" size={12} />
      </div>

      <div className="inspector-scroll">
        {!selectedNode && renderSelectionEmpty()}
        {moduleMeta && renderModuleData()}
        {featureMeta && renderFeatureData()}
      </div>
    </aside>
  );
};
