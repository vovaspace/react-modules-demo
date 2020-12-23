import 'reflect-metadata';

import React from 'react';
import ReactDOM from 'react-dom';

import { module } from '@core/module.ioc';
import { IoCProvider } from '@core/react.ioc';
import { App } from '@core/App.component';

ReactDOM.render(
  (
    <IoCProvider module={module}>
      <App />
    </IoCProvider>
  ),
  document.getElementById('root'),
);
