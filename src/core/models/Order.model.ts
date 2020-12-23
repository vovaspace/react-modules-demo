import { injectable, inject } from 'inversify';
import { flow, makeObservable, observable } from 'mobx';

import { SYMBOLS } from '../symbols.ioc';
import type { UuidGetter } from '../utils';
import type { OrderService } from '../services';

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
  updateName(name: string): void;
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
      updateName: flow,
    });
  }

  public* toggleStatus() {
    this.isLoading = true;
    this.status = yield this.orderService.toggle(this.status);
    this.isLoading = false;
  }

  public* updateName(name: string) {
    this.isLoading = true;
    this.name = yield this.orderService.updateName(name);
    this.isLoading = false;
  }
}
