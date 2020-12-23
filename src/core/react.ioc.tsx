import React, { FunctionComponent, useContext, useMemo } from 'react';
import { Container, interfaces } from 'inversify';

interface IoCProviderProps {
  module: interfaces.ContainerModule;
}

const createContainer = (
  module: interfaces.ContainerModule,
  parent: interfaces.Container | null,
): interfaces.Container => {
  const container: interfaces.Container = new Container();
  container.load(module);

  if (parent) {
    container.parent = parent;
  }

  return container;
};

const IoCContext = React.createContext<interfaces.Container | null>(null);

export const IoCProvider: FunctionComponent<IoCProviderProps> = (props) => {
  const { children, module } = props;

  const contextContainer = useContext(IoCContext);
  const container = useMemo(
    () => createContainer(module, contextContainer),
    [module, contextContainer],
  );

  return (
    <IoCContext.Provider value={container}>
      {children}
    </IoCContext.Provider>
  );
};

export function useInjection<T>(identifier: interfaces.ServiceIdentifier<T>) {
  const container = useContext(IoCContext);

  if (!container) {
    throw new Error();
  }

  return useMemo(
    () => container.get<T>(identifier),
    [identifier, container],
  );
}
