import React, { FunctionComponent } from 'react';
import { observer } from 'mobx-react-lite';

import { useInjection } from '@core/react.ioc';

import { SYMBOLS } from '../../symbols.ioc';
import { OrderListModel, OrderEditingModel } from '../../models';
import { Order } from '../Order';

export const OrderList: FunctionComponent = observer(() => {
  const orderListModel = useInjection<OrderListModel>(SYMBOLS.OrderListModel);
  const orderEditingModel = useInjection<OrderEditingModel>(SYMBOLS.OrderEditingModel);

  return (
    <section>
      <h2>Order List</h2>
      <table style={{
        tableLayout: 'fixed',
        borderCollapse: 'collapse',
        width: '100%',
        padding: 8,
        border: '1px solid black',
      }}>
        <thead style={{ textAlign: 'left' }}>
          <tr style={{ borderBottom: '1px solid gray' }}>
            <th style={{ width: 80, padding: 8 }}>ID</th>
            <th style={{ width: 112, padding: 8 }}>Status</th>
            <th style={{ padding: 8 }}>Name</th>
            <th style={{ width: 144, padding: 8 }}>Created At</th>
            <th style={{ width: 104, padding: 8 }} />
            <th style={{ width: 40, padding: 8 }} />
          </tr>
        </thead>
        <tbody>
          {orderListModel.orders.map((order) => (
            <Order key={order.id} order={order} />
          ))}
        </tbody>
      </table>
      <button
        style={{ marginTop: 12 }}
        type="button"
        disabled={orderListModel.isLoading || orderEditingModel.isActive}
        onClick={orderListModel.addOrder}
      >
        {orderListModel.isLoading ? 'Loading...' : 'Add Order'}
      </button>
    </section>
  );
});
