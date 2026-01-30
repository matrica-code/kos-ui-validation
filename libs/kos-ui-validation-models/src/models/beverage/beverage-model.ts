/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */

import type {
  IKosDataModel,
  IKosIdentifiable,
  KosModelRegistrationType,
  PublicModelInterface,
} from '@kosdev-code/kos-ui-sdk';
import {
  kosLoggerAware,
  KosLoggerAware,
  kosModel,
} from '@kosdev-code/kos-ui-sdk';

import type { BeverageOptions } from './types';

export const MODEL_TYPE = 'beverage-model';

export type BeverageModel = PublicModelInterface<BeverageModelImpl>;

// Interface merging for decorator type safety
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BeverageModelImpl extends KosLoggerAware {}

@kosModel({ modelTypeId: MODEL_TYPE, singleton: false })
@kosLoggerAware()
export class BeverageModelImpl implements IKosDataModel, IKosIdentifiable {
  // Registration property for type safety - actual value injected by @kosModel decorator
  static Registration: KosModelRegistrationType<BeverageModel, BeverageOptions>;

  id: string;
  logo: string;
  brandColour: string;
  doneLogo: string;
  textColour: string;
  sizesColour: string;
  position: number;
  pouring: boolean;

  constructor(modelId: string, options: BeverageOptions) {
    this.id = modelId;
    this.logo = options.logo;
    this.brandColour = options.brandColour;
    this.doneLogo = options.doneLogo;
    this.textColour = options.textColour;
    this.sizesColour = options.sizesColour;
    this.position = options.position;
    this.pouring = false;
  }

  get logoUrl(): string {
    return `./assets/webp/${this.logo}.webp`;
  }

  get doneLogoUrl(): string {
    return `./assets/done/${this.doneLogo}.webp`;
  }

  async pour(): Promise<void> {
    this.pouring = true;
    await new Promise((resolve) => setTimeout(resolve, 5000));
    this.pouring = false;
  }
}

export const Beverage = BeverageModelImpl.Registration;
