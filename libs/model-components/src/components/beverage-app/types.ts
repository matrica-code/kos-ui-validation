// Common interface that both KOS BeverageModel and standalone Beverage satisfy
export interface BeverageModelLike {
  id: string;
  logoUrl: string;
  brandColour: string;
  textColour: string;
  pouring: boolean;
  pour(): Promise<void>;
}
