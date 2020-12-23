import React, { FunctionComponent } from 'react';

import { OrderListModule } from '@modules/OrderList';

export const App: FunctionComponent = () => (
  <main style={{ padding: 32, fontFamily: 'sans-serif' }}>
    <h1>React Modules Demo</h1>
    <OrderListModule />
  </main>
);
