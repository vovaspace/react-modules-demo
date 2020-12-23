import { makeModule } from '@core/utils';

export const OrderListModule = makeModule({
  component: () => import('./Module.component'),
  module: () => import('./module.ioc'),
});
