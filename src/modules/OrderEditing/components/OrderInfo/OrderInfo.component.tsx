import React, { FunctionComponent } from 'react';

import type { OrderModel } from '@core/models';

export interface OrderInfoProps {
  order: OrderModel;
}

export const OrderInfo: FunctionComponent<OrderInfoProps> = ({ order }) => (
  <header>
    <h2>Order Editing</h2>
    <div>
      ID:
      {' '}
      {order.id}
    </div>
    <div>
      Created At:
      {' '}
      {order.createdAt.toDateString()}
    </div>
  </header>
);
