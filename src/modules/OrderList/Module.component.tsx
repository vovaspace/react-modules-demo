import React, { FunctionComponent } from 'react';

import { OrderList } from './components/OrderList';
import { OrderEditingModal } from './components/OrderEditingModal';


const Module: FunctionComponent = () => (
  <>
    <OrderList />
    <OrderEditingModal />
  </>
);

export default Module;
