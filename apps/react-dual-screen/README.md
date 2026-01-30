# React Dual Screen (KOS)

KOS-integrated beverage application designed for dual screen setups (e.g., Raspberry Pi with two 768x1024 displays).

## Features

- Dual screen layout (main screen + video screen)
- Main screen: Beverage selection grid and pouring controls
- Video screen: Looping advertisement video
- GPU-accelerated animations
- Full KOS SDK integration

## Screen Configuration

| Screen | Resolution | Purpose |
|--------|------------|---------|
| Main | 768x1024 | Beverage selection & pouring |
| Video | 768x1024 | Advertisement video loop |

### Default Layout

The default configuration assumes two portrait displays (768x1024) positioned side by side:

```
┌─────────────┬─────────────┐
│             │             │
│    Main     │    Video    │
│   Screen    │   Screen    │
│  (768x1024) │  (768x1024) │
│             │             │
│   x: 0      │   x: 768    │
│   y: 0      │   y: 0      │
│             │             │
└─────────────┴─────────────┘
       Total: 1536x1024
```

### Customizing Screen Sizes

Edit `src/app/components/dual-screen/screen-config.ts`:

```typescript
export const defaultDualScreenConfig: DualScreenConfig = {
  screens: {
    main: {
      id: 'main',
      x: 0,        // Horizontal position (pixels from left)
      y: 0,        // Vertical position (pixels from top)
      width: 768,  // Screen width
      height: 1024 // Screen height
    },
    video: {
      id: 'video',
      x: 768,      // Positioned to the right of main
      y: 0,
      width: 768,
      height: 1024
    }
  }
};
```

### Common Configurations

**Stacked Vertically (landscape displays):**
```typescript
screens: {
  main:  { id: 'main',  x: 0, y: 0,    width: 1024, height: 768 },
  video: { id: 'video', x: 0, y: 768,  width: 1024, height: 768 }
}
```

**Different Size Displays:**
```typescript
screens: {
  main:  { id: 'main',  x: 0,    y: 0, width: 800,  height: 600 },
  video: { id: 'video', x: 800,  y: 0, width: 1920, height: 1080 }
}
```

### Runtime Configuration

You can also pass a custom config at runtime:

```tsx
import { DualScreenLayout } from './components/dual-screen';

const customConfig = {
  screens: {
    main:  { id: 'main',  x: 0,   y: 0, width: 1080, height: 1920 },
    video: { id: 'video', x: 1080, y: 0, width: 1080, height: 1920 }
  }
};

<DualScreenLayout config={customConfig}>
  {/* ... */}
</DualScreenLayout>
```

## Tech Stack

- React 18
- KOS UI SDK
- Emotion styled components
- MobX (via KOS)

## Getting Started

### Development

```bash
npx nx serve react-dual-screen
```

Open http://localhost:4201

To connect to a KOS backend:
```
http://localhost:4201/?host=http://localhost:8081
```

### Build

```bash
npx nx build react-dual-screen --configuration=production
```

Output: `dist/apps/react-dual-screen/`

### Build KAB

```bash
npx nx run react-dual-screen:kab
```

## Configuration

Port: 4201 (configurable in `project.json`)

## Components

- `DualScreenLayout` - Container for two screen regions
- `ScreenRegionContainer` - Individual screen container
- `VideoScreen` - Looping video player

## Imports

```typescript
import { BeverageGrid, PouringControls, type BeverageModelLike } from '@kos-ui-validation/model-components';
import { useBeverageContainer } from '@kos-ui-validation/model-components/kos';
import { DualScreenLayout, ScreenRegionContainer, VideoScreen } from './components/dual-screen';
```

## Raspberry Pi Display Setup

### Configure Dual Displays

```bash
# List connected displays
DISPLAY=:0 xrandr

# Position second screen to right of first
DISPLAY=:0 xrandr --output HDMI-1 --auto --output HDMI-2 --auto --right-of HDMI-1
```

### Rotate Both Screens to Portrait

```bash
# Rotate both displays 90° clockwise
DISPLAY=:0 xrandr --output HDMI-1 --rotate right
DISPLAY=:0 xrandr --output HDMI-2 --rotate right

# Combined command: position and rotate
DISPLAY=:0 xrandr \
  --output HDMI-1 --auto --rotate right \
  --output HDMI-2 --auto --rotate right --right-of HDMI-1
```

### Rotation Options

| Option | Effect |
|--------|--------|
| `--rotate right` | 90° clockwise (landscape → portrait) |
| `--rotate left` | 90° counter-clockwise |
| `--rotate inverted` | 180° |
| `--rotate normal` | Reset to landscape |

### Make Configuration Persistent

Create `~/.xinitrc`:

```bash
#!/bin/bash
xrandr --output HDMI-1 --auto --rotate right \
       --output HDMI-2 --auto --rotate right --right-of HDMI-1
exec chromium --kiosk http://localhost:3000
```

Or create `/etc/X11/xorg.conf.d/10-dual-monitor.conf`:

```
Section "Monitor"
    Identifier "HDMI-1"
    Option "Rotate" "right"
    Option "Primary" "true"
EndSection

Section "Monitor"
    Identifier "HDMI-2"
    Option "Rotate" "right"
    Option "RightOf" "HDMI-1"
EndSection
```
