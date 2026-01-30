/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
import {
  IKosDataModel,
  IKosIdentifiable,
  PublicModelInterface,
  kosAction,
  kosContainerAware,
  kosLoggerAware,
  kosModel,
  type KosContainerAware,
  type KosLoggerAware,
  type KosModelRegistrationType,
} from '@kosdev-code/kos-ui-sdk';

import { Beverage, type BeverageModel } from './beverage-model';
import type { BeverageContainerOptions, UISchema } from './types';

export const MODEL_TYPE = 'beverage-container-model';

export type BeverageContainerModel =
  PublicModelInterface<BeverageContainerModelImpl>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BeverageContainerModelImpl
  extends KosLoggerAware,
    KosContainerAware<BeverageModel> {}

@kosModel({ modelTypeId: MODEL_TYPE, singleton: true })
@kosContainerAware<BeverageModel>()
@kosLoggerAware()
export class BeverageContainerModelImpl
  implements IKosIdentifiable, IKosDataModel
{
  // Registration property for type safety - actual value injected by @kosModel decorator
  static Registration: KosModelRegistrationType<
    BeverageContainerModel,
    BeverageContainerOptions
  >;

  id: string;
  video: string;
  constructor(modelId: string, _options: BeverageContainerOptions) {
    this.id = modelId;
    this.video = '';
  }

  get videoUrl(): string {
    return `./assets${this.video}`;
  }
  // -------------------LIFECYCLE----------------------------

  get limitedBeverages(): BeverageModel[] {
    return this.data.slice(0, 14);
  }
  async init(): Promise<void> {
    this.logger.debug(`initializing beverage-container container ${this.id}`);
  }

  async load(): Promise<void> {
    this.logger.debug(`loading beverage-container container ${this.id}`);

    const response = await fetch('./assets/ui-schema.json');
    const json = (await response.json()) as UISchema;

    kosAction(() => {
      this.video = json.adUrl;
    });
    Object.entries(json.beverages).forEach(([key, beverage]) => {
      const id = `${Beverage.type}-${key}`;
      const beverageModel = Beverage.instance(id)
        .options({
          position: parseInt(key, 10),
          logo: beverage.logo,
          brandColour: beverage.brandColour,
          doneLogo: beverage.doneLogo,
          textColour: beverage.textColour,
          sizesColour: beverage.sizesColour,
        })
        .build();
      this.container.addModel(beverageModel);
    });
  }
}
export const BeverageContainer = BeverageContainerModelImpl.Registration;

BeverageContainer.addRelatedModel(Beverage);
