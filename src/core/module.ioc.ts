import { ContainerModule, interfaces } from 'inversify';

import { SYMBOLS } from '@core/symbols.ioc';
import { OrderModel } from '@core/models';
import { FetchService, OrderService } from '@core/services';
import { uuid } from '@core/utils';

export const module: interfaces.ContainerModule = new ContainerModule((bind) => {
  bind<OrderModel>(SYMBOLS.OrderModel).to(OrderModel);
  bind<interfaces.Factory<OrderModel>>(SYMBOLS.OrderModelFactory).toAutoFactory<OrderModel>(SYMBOLS.OrderModel);
  bind<FetchService>(SYMBOLS.FetchService).to(FetchService).inSingletonScope();
  bind<OrderService>(SYMBOLS.OrderService).to(OrderService).inSingletonScope();
  bind<typeof uuid>(SYMBOLS.uuid).toFunction(uuid);
});
