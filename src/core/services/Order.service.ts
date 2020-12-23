import { injectable, inject } from 'inversify';

import { SYMBOLS } from '../symbols.ioc';
import type { OrderModel } from '../models';
import { OrderStatusEnum } from '../models';

import type { FetchService } from './Fetch.service';

export interface OrderService {
  toggle(status: OrderStatusEnum): Promise<OrderStatusEnum>;
  create(): Promise<OrderModel>;
  updateName(name: string): Promise<string>;
}

@injectable()
export class OrderService implements OrderService {
  constructor(
    @inject(SYMBOLS.FetchService) private fetchService: FetchService,
    @inject(SYMBOLS.OrderModelFactory) private orderModelFactory: () => OrderModel,
  ) {}

  public create = () => this.fetchService.put(this.orderModelFactory());

  public toggle = (status: OrderStatusEnum) => {
    if (status === OrderStatusEnum.New) {
      return this.fetchService.put(OrderStatusEnum.Approved);
    }

    if (status === OrderStatusEnum.Approved) {
      return this.fetchService.put(OrderStatusEnum.Done);
    }

    return this.fetchService.put(OrderStatusEnum.New);
  };

  public updateName = (name: string) => this.fetchService.put(name);
}
