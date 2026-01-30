import { BeverageContainerModel } from '@kos-ui-validation/kos-ui-validation-models';
import { useBeverageContainer } from './use-beverage-container';

interface BeverageContainerProps {
  beverageContainer: BeverageContainerModel;
}

type HoCBeverageContainerProps = BeverageContainerProps;
// react HOC to provide a BeverageContainer to a component
export function withBeverageContainer<
  T extends HoCBeverageContainerProps = HoCBeverageContainerProps
>(WrappedComponent: React.ComponentType<T>) {
  return (props: Omit<T, keyof BeverageContainerProps>) => {
    const { model, status, KosModelLoader } = useBeverageContainer();

    return (
      <KosModelLoader {...status}>
        <WrappedComponent {...(props as T)} beverageContainer={model} />
      </KosModelLoader>
    );
  };
}
