import { ModuleRecord, FeatureRecord, FunctionRecord, ModuleDataProvider } from '../ModuleDataProvider';
import { mockModules } from './mockModules';
import { mockFeatures } from './mockFeatures';
import { mockFunctions } from './mockFunctions';

export class MockModuleDataProvider implements ModuleDataProvider {
  getModules(): ModuleRecord[] {
    return [...mockModules] as unknown as ModuleRecord[];
  }

  getFeatures(moduleId: string): FeatureRecord[] {
    return [...(mockFeatures[moduleId] ?? [])];
  }

  getFunctions(featureId: string): FunctionRecord[] {
    return [...(mockFunctions[featureId] ?? [])];
  }
}
