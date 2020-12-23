import React, { FunctionComponent } from 'react';
import { observer } from 'mobx-react-lite';

import { useInjection } from '@core/react.ioc';
import type { OrderModel } from '@core/models';

import { SYMBOLS } from '../../symbols.ioc';
import type { OrderEditingModel } from '../../models';

export interface OrderProps {
  order: OrderModel;
}

export const Order: FunctionComponent<OrderProps> = observer(({ order }) => {
  const orderEditingModel = useInjection<OrderEditingModel>(SYMBOLS.OrderEditingModel);

  return (
    <tr style={{ borderBottom: '1px solid lightgray' }}>
      <td style={{ padding: 8 }}>{order.id}</td>
      <td style={{ padding: 8 }}>{order.status}</td>
      <td style={{ padding: 8 }}>{order.name}</td>
      <td style={{ padding: 8 }}>{order.createdAt.toDateString()}</td>
      <td style={{ padding: 8 }}>
        <button
          type="button"
          disabled={order.isLoading}
          onClick={order.toggleStatus}
        >
          Toggle Status
        </button>
      </td>
      <td style={{ padding: 8 }}>
        <button
          type="button"
          disabled={order.isLoading || orderEditingModel.isActive}
          onClick={() => orderEditingModel.startEditing(order)}
        >
          Edit
        </button>
      </td>
    </tr>
  );
});
