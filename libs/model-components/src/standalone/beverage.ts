import { makeAutoObservable, runInAction } from 'mobx';

export interface BeverageOptions {
  id: string;
  position: number;
  logo: string;
  brandColour: string;
  doneLogo: string;
  textColour: string;
  sizesColour: string;
}

export class Beverage {
  id: string;
  logo: string;
  brandColour: string;
  doneLogo: string;
  textColour: string;
  sizesColour: string;
  position: number;
  pouring = false;

  constructor(options: BeverageOptions) {
    this.id = options.id;
    this.logo = options.logo;
    this.brandColour = options.brandColour;
    this.doneLogo = options.doneLogo;
    this.textColour = options.textColour;
    this.sizesColour = options.sizesColour;
    this.position = options.position;

    makeAutoObservable(this);
  }

  get logoUrl(): string {
    return `./assets/webp/${this.logo}.webp`;
  }

  get doneLogoUrl(): string {
    return `./assets/done/${this.doneLogo}.webp`;
  }

  async pour(): Promise<void> {
    runInAction(() => {
      this.pouring = true;
    });
    await new Promise((resolve) => setTimeout(resolve, 5000));
    runInAction(() => {
      this.pouring = false;
    });
  }
}
