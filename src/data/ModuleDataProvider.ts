export interface ModuleRecord {
  id: string;
  name: string;
  icon: string;
  accentColor: string;
  featureCount: number;
  totalFunctions: number;
  complexityScore: number;
  healthScore: number;
  fileCount: number;
  description: string;
}

export interface FeatureRecord {
  id: string;
  moduleId: string;
  name: string;
  functionCount: number;
  classCount: number;
  complexityScore: number;
  apiCount: number;
  dbTableCount: number;
  testCoverage: number;
  documentationStatus: 'complete' | 'partial' | 'missing';
  description: string;
}

export interface LogicIconDef {
  category: 'control-flow' | 'database' | 'network' | 'auth' | 'performance' | 'error-handling' | 'utility';
  name: string;
  count: number;
  accentColor: string;
}

export interface FunctionMetadataFields {
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
}

export interface FunctionRecord {
  id: string;
  featureId: string;
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
  position: { x: number; y: number };
  width: number;
  height: number;
  logicIcons: LogicIconDef[];
  accentColor: string;
  metadata: FunctionMetadataFields;
}

export interface ModuleDataProvider {
  getModules(): ModuleRecord[];
  getFeatures(moduleId: string): FeatureRecord[];
  getFunctions(featureId: string): FunctionRecord[];
}
