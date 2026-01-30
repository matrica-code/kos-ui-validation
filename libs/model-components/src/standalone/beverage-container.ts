import { makeAutoObservable, runInAction } from 'mobx';

import { Beverage } from './beverage';

interface UISchemaEntry {
  logo: string;
  brandColour: string;
  doneLogo: string;
  textColour: string;
  sizesColour: string;
}

interface UISchema {
  adUrl: string;
  beverages: Record<string, UISchemaEntry>;
}

export class BeverageContainer {
  id: string;
  video = '';
  beverages: Beverage[] = [];
  loaded = false;

  constructor(id = 'beverage-container') {
    this.id = id;
    makeAutoObservable(this);
  }

  get videoUrl(): string {
    return `./assets${this.video}`;
  }

  get limitedBeverages(): Beverage[] {
    return this.beverages.slice(0, 14);
  }

  // Alias for compatibility with KOS model interface
  get data(): Beverage[] {
    return this.beverages;
  }

  async load(): Promise<void> {
    const response = await fetch('./assets/ui-schema.json');
    const json = (await response.json()) as UISchema;

    runInAction(() => {
      this.video = json.adUrl;

      Object.entries(json.beverages).forEach(([key, beverage]) => {
        const beverageModel = new Beverage({
          id: `beverage-${key}`,
          position: parseInt(key, 10),
          logo: beverage.logo,
          brandColour: beverage.brandColour,
          doneLogo: beverage.doneLogo,
          textColour: beverage.textColour,
          sizesColour: beverage.sizesColour,
        });
        this.beverages.push(beverageModel);
      });

      this.loaded = true;
    });
  }
}

// Singleton instance
let instance: BeverageContainer | null = null;

export const getBeverageContainer = (): BeverageContainer => {
  if (!instance) {
    instance = new BeverageContainer();
  }
  return instance;
};

export const initBeverageContainer = async (): Promise<BeverageContainer> => {
  const container = getBeverageContainer();
  if (!container.loaded) {
    await container.load();
  }
  return container;
};
