import { ContainerModule } from 'inversify';

import { SYMBOLS } from './symbols.ioc';
import { OrderEditingModel, OrderListModel } from './models';

export default new ContainerModule((bind) => {
  bind<OrderEditingModel>(SYMBOLS.OrderEditingModel).to(OrderEditingModel).inSingletonScope();
  bind<OrderListModel>(SYMBOLS.OrderListModel).to(OrderListModel).inSingletonScope();
});
