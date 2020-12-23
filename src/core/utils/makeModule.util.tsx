import React, {
  ComponentType,
  FunctionComponent,
  useState,
  useEffect,
} from 'react';
import { interfaces } from 'inversify';

import { IoCProvider } from '@core/react.ioc';

export interface MakeModuleParams {
  component: () => Promise<{ default: ComponentType<unknown>; }>;
  module: () => Promise<{ default: interfaces.ContainerModule }>;
}

export const makeModule = (params: MakeModuleParams): FunctionComponent => () => {
  const { component: componentImport, module: moduleImport } = params;

  const [hasError, setHasError] = useState(false);
  const [dependencies, setDependencies] = useState<{
    component: ComponentType<unknown> | null;
    module: interfaces.ContainerModule | null;
  }>({ component: null, module: null });

  useEffect(() => {
    const loadDependencies = async () => {
      try {
        const [component, module] = await Promise.all([componentImport(), moduleImport()]);
        setDependencies({ component: component.default, module: module.default });
      } catch(error) {
        console.error(error);
        setHasError(true);
      }
    };

    loadDependencies();
  }, []);

  if (hasError) {
    return <span>Error!</span>;
  }

  if (!dependencies.component || !dependencies.module) {
    return <span>Loading...</span>;
  }

  return (
    <IoCProvider module={dependencies.module}>
      <dependencies.component />
    </IoCProvider>
  );
};
