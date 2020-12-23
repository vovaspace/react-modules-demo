import React, { FunctionComponent } from 'react';
import { observer } from 'mobx-react-lite';

import { useInjection } from '@core/react.ioc';
import { Modal } from '@core/components/Modal';

import { OrderEditingModule } from '@modules/OrderEditing';

import { SYMBOLS } from '../../symbols.ioc';
import type { OrderEditingModel } from '../../models';

export const OrderEditingModal: FunctionComponent = observer(() => {
  const orderEditingModel = useInjection<OrderEditingModel>(SYMBOLS.OrderEditingModel);

  return (
    <Modal
      isOpen={orderEditingModel.isActive}
      onClose={orderEditingModel.endEditing}
    >
      {() => orderEditingModel.order && <OrderEditingModule order={orderEditingModel.order} />}
    </Modal>
  );
});
