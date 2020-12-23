import { injectable, inject } from 'inversify';
import { makeObservable, observable, flow } from 'mobx';

import { SYMBOLS as CORE_SYMBOLS } from '@core/symbols.ioc';
import { OrderModel } from '@core/models';
import { OrderService } from '@core/services';

export interface OrderListModel {
  isLoading: boolean;
  orders: OrderModel[];
  addOrder(): void;
}

@injectable()
export class OrderListModel implements OrderListModel {
  public isLoading: boolean = false;
  public orders: OrderModel[] = [];

  constructor(
    @inject(CORE_SYMBOLS.OrderService) private orderService: OrderService,
  ) {
    this.addOrder = this.addOrder.bind(this);

    makeObservable(this, {
      isLoading: observable,
      orders: observable,
      addOrder: flow,
    });

    this.addOrder();
  }

  public *addOrder() {
    this.isLoading = true;
    const order = yield this.orderService.create();
    this.orders.push(order);
    this.isLoading = false;
  }
}
