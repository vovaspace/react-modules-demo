import React, { FunctionComponent } from 'react';

import type { OrderModel } from '@core/models';

import { OrderInfo } from './components/OrderInfo';
import { EditingForm } from './components/EditingForm';

export interface ModuleComponentProps {
  order: OrderModel;
}

const Module: FunctionComponent<ModuleComponentProps> = ({ order }) => (
  <>
    <OrderInfo order={order} />
    <EditingForm order={order} />
  </>
);

export default Module;
