import { makeModule } from '@core/utils';

import type { ModuleComponentProps } from './Module.component';

export const OrderEditingModule = makeModule<ModuleComponentProps>({
  component: () => import('./Module.component'),
  module: () => import('./module.ioc'),
});
