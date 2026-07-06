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

export interface ModuleDataProvider {
  getModules(): ModuleRecord[];
  getFeatures(moduleId: string): FeatureRecord[];
}
