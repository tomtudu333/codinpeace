import { ModuleRecord, FeatureRecord, ModuleDataProvider } from '../ModuleDataProvider';
import { mockModules } from './mockModules';
import { mockFeatures } from './mockFeatures';

export class MockModuleDataProvider implements ModuleDataProvider {
  getModules(): ModuleRecord[] {
    return [...mockModules] as unknown as ModuleRecord[];
  }

  getFeatures(moduleId: string): FeatureRecord[] {
    return [...(mockFeatures[moduleId] ?? [])];
  }
}
