import { injectable, inject } from 'inversify';

import { SYMBOLS } from '../symbols.ioc';
import { OrderModel, OrderStatusEnum } from '../models';
import { FetchService } from '.';

export interface OrderService {
  toggle(status: OrderStatusEnum): Promise<OrderStatusEnum>;
  create(): Promise<OrderModel>;
}

@injectable()
export class OrderService implements OrderService {
  constructor(
    @inject(SYMBOLS.FetchService) private fetchService: FetchService,
    @inject(SYMBOLS.OrderModelFactory) private orderModelFactory: () => OrderModel,
  ) {}

  public toggle = (status: OrderStatusEnum) => {
    if (status === OrderStatusEnum.New) {
      return this.fetchService.put(OrderStatusEnum.Approved);
    }

    if (status === OrderStatusEnum.Approved) {
      return this.fetchService.put(OrderStatusEnum.Done);
    }

    return this.fetchService.put(OrderStatusEnum.New);
  }

  public create = () => {
    return this.fetchService.put(this.orderModelFactory());
  }
}
