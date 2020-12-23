import { injectable, inject } from 'inversify';
import { flow, makeObservable, observable } from 'mobx';

import { SYMBOLS } from '../symbols.ioc';
import { UuidGetter } from '../utils';
import { OrderService } from '../services';

export enum OrderStatusEnum {
  New = 'NEW',
  Approved = 'APPROVED',
  Done = 'DONE',
}

export interface OrderModel {
  id: string;
  isLoading: boolean;
  name: string;
  status: OrderStatusEnum;
  createdAt: Date,
  toggleStatus(): void;
}

@injectable()
export class OrderModel implements OrderModel {
  public id = this.uuid();
  public isLoading = false;
  public name = 'Unnamed';
  public status = OrderStatusEnum.New;
  public createdAt = new Date();

  constructor(
    @inject(SYMBOLS.OrderService) private orderService: OrderService,
    @inject(SYMBOLS.uuid) private uuid: UuidGetter,
  ) {
    this.toggleStatus = this.toggleStatus.bind(this);

    makeObservable(this, {
      isLoading: observable,
      name: observable,
      status: observable,
      toggleStatus: flow,
    });
  }

  public *toggleStatus() {
    this.isLoading = true;
    this.status = yield this.orderService.toggle(this.status);
    this.isLoading = false;
  }
}
