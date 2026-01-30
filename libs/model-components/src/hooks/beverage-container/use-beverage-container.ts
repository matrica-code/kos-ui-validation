import { useKosModel } from '@kosdev-code/kos-ui-sdk';
import {
  BeverageContainer,
  BeverageContainerModel,
} from '@kos-ui-validation/kos-ui-validation-models';

export const useBeverageContainer = () => {
  const modelId = BeverageContainer.type;
  const result = useKosModel<BeverageContainerModel>({
    modelId,
    modelType: BeverageContainer.type,
    options: {},
  });

  return result;
};
