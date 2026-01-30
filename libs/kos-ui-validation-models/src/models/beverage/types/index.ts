import { AvailabilityModel } from '@kosdev-code/kos-dispense-sdk';

// ---------------  Beverage ---------------
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BeverageOptions {
  logo: string;
  brandColour: string;
  doneLogo: string;
  textColour: string;
  sizesColour: string;
  position: number;
}

// ---------------  BeverageContainer ---------------
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BeverageContainerOptions {}

export interface UISchema {
  adUrl: string;
  beverages: Record<
    string,
    {
      logo: string;
      brandColour: string;
      doneLogo: string;
      textColour: string;
      sizesColour: string;
    }
  >;
}

export type SizeInfo = { key: string; size: number }[];

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface BeverageInfo {
  sizes: SizeInfo;
  name: string;
  logo: string;
  doneLogo: string;
  sizesColour: string;
  sizesColourRgb: RGB;
  brandColour: string;
  brandColourRgb: RGB;
  textColour: string;
}

export type AvailabilityBeverage = AvailabilityModel<
  BeverageInfo,
  Record<string, unknown>
>;
