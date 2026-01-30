export interface ScreenRegion {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface DualScreenConfig {
  screens: Record<string, ScreenRegion>;
}

// Default configuration for dual Pi monitors
// Each screen is 768x1024, positioned side by side
export const defaultDualScreenConfig: DualScreenConfig = {
  screens: {
    main: {
      id: 'main',
      x: 0,
      y: 0,
      width: 768,
      height: 1024,
    },
    video: {
      id: 'video',
      x: 768,
      y: 0,
      width: 768,
      height: 1024,
    },
  },
};
