# React (KOS Single Screen)

KOS-integrated beverage selection and pouring application for single screen displays.

## Display Requirements

- **Resolution:** 768x1024 (portrait orientation)
- Designed for portrait-mounted displays

## Features

- 3x5 grid of beverage options
- Animated beverage selection with GPU-accelerated transitions
- Pouring screen with pulsating ring animation
- Full KOS SDK integration for state management

## Tech Stack

- React 18
- KOS UI SDK (`kosComponent`, `useModel`)
- Emotion styled components
- KOS Models using KOS UI SDK

## Getting Started

### Development

```bash
npx nx serve react
```

Open http://localhost:4200

To connect to a KOS backend:

```
http://localhost:4200/?host=http://localhost:8081
```

### Build

```bash
npx nx build react --configuration=production
```

Output: `dist/apps/react/`

### Build KAB

```bash
npx nx run react:kab
```

## Configuration

Port: 4200 (configurable in `project.json`)

## Raspberry Pi Display Setup

### Rotate Screen to Portrait

```bash
# List connected displays
DISPLAY=:0 xrandr

# Rotate HDMI output 90° clockwise (landscape → portrait)
DISPLAY=:0 xrandr --output HDMI-1 --rotate right

# Rotate 90° counter-clockwise
DISPLAY=:0 xrandr --output HDMI-1 --rotate left

# Rotate 180°
DISPLAY=:0 xrandr --output HDMI-1 --rotate inverted

# Reset to landscape
DISPLAY=:0 xrandr --output HDMI-1 --rotate normal
```

### Make Rotation Persistent

Add to `/etc/X11/xorg.conf.d/10-monitor.conf`:

```
Section "Monitor"
    Identifier "HDMI-1"
    Option "Rotate" "right"
EndSection
```

Or add to `~/.xinitrc` before the browser launch:

```bash
xrandr --output HDMI-1 --rotate right
```

## Dependencies

- `@kos-ui-validation/model-components` - Shared UI components
- `@kos-ui-validation/kos-ui-validation-models` - KOS model definitions
- `@kosdev-code/kos-ui-sdk` - KOS framework

## Imports

```typescript
import { BeverageGrid, PouringControls, type BeverageModelLike } from '@kos-ui-validation/model-components';
import { useBeverageContainer } from '@kos-ui-validation/model-components/kos';
import { kosComponent } from '@kosdev-code/kos-ui-sdk';
```
