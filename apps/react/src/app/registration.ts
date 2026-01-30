import { KosModelRegistry } from '@kosdev-code/kos-dispense-sdk';

import { BeverageContainer } from '@kos-ui-validation/kos-ui-validation-models';
import { initKosProvider } from '@kosdev-code/kos-ui-sdk';

KosModelRegistry.dispense.models().model(BeverageContainer);

const { KosCoreContextProvider } = initKosProvider();

export { KosCoreContextProvider };
