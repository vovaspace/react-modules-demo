import React, {
  FunctionComponent, useState, useCallback, FormEventHandler, ChangeEventHandler,
} from 'react';
import { observer } from 'mobx-react-lite';

import type { OrderModel } from '@core/models';

export interface EditingFormProps {
  order: OrderModel;
}

export const EditingForm: FunctionComponent<EditingFormProps> = observer(({ order }) => {
  const [orderNextName, setOrderNextName] = useState(() => order.name);

  const handleSave = useCallback<FormEventHandler>((event) => {
    event.preventDefault();
    order.updateName(orderNextName);
  }, [orderNextName, order]);

  const handleNameChange = useCallback<ChangeEventHandler<HTMLInputElement>>((event) => {
    setOrderNextName(event.target.value);
  }, []);

  return (
    <form
      style={{
        padding: 8,
        marginTop: 16,
        marginBottom: 16,
        border: '1px solid lightgray',
      }}
      onSubmit={handleSave}
    >
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label>
        New Name
        <br />
        <input
          type="text"
          value={orderNextName}
          onChange={handleNameChange}
        />
      </label>
      <br />
      <button
        style={{ marginTop: 16 }}
        type="submit"
        disabled={order.isLoading}
      >
        Save
      </button>
    </form>
  );
});
