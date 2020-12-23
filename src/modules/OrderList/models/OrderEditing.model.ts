import { injectable } from 'inversify';
import { makeObservable, observable, action } from 'mobx';

import { OrderModel } from '@core/models';

export interface OrderEditingModel {
  order: OrderModel | null;
  isActive: boolean;
  startEditing(order: OrderModel): void;
  endEditing(): void;
}

@injectable()
export class OrderEditingModel implements OrderEditingModel {
  public order: OrderModel | null = null;
  public isActive: boolean = false;

  constructor() {
    makeObservable(this, {
      order: observable,
      isActive: observable,
      startEditing: action,
      endEditing: action,
    });
  }

  public startEditing(order: OrderModel) {
    this.isActive = true;
    this.order = order;
  }

  public endEditing() {
    this.isActive = false;
    this.order = null;
  }
}
