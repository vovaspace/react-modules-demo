import React, { FunctionComponent } from 'react';
import { observer } from 'mobx-react-lite';

import { useInjection } from '@core/react.ioc';
import { Modal } from '@core/components/Modal';

import { SYMBOLS } from '../../symbols.ioc';
import { OrderEditingModel } from '../../models';

export const OrderEditingModal: FunctionComponent = observer(() => {
  const orderEditingModel = useInjection<OrderEditingModel>(SYMBOLS.OrderEditingModel);

  return (
    <Modal isOpen={orderEditingModel.isActive}>
      {() => 'adad'}
    </Modal>
  );
});
