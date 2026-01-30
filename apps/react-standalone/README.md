# React Standalone (Single Screen)

Standalone beverage selection and pouring application using pure MobX state management without KOS dependencies. Designed for performance testing on resource-constrained devices like Raspberry Pi.

## Display Requirements

- **Resolution:** 768x1024 (portrait orientation)
- Designed for portrait-mounted displays

## Features

- 3x5 grid of beverage options
- Animated beverage selection with GPU-accelerated transitions
- Pouring screen with pulsating ring animation
- Pure MobX state management (no KOS)
- Lightweight bundle size (~2KB for standalone logic)

## Tech Stack

- React 18
- MobX + mobx-react-lite
- Emotion styled components

## Getting Started

### Development

```bash
npx nx serve react-standalone
```

Open http://localhost:4210

### Build

```bash
npx nx build react-standalone --configuration=production
```

Output: `dist/apps/react-standalone/`

## Deploying to Raspberry Pi

### 1. Build

```bash
npx nx build react-standalone --configuration=production
```

### 2. Copy to Pi

```bash
scp -r dist/apps/react-standalone/* pi@<pi-ip>:~/beverage-app/
```

### 3. Serve

```bash
# On Pi
cd ~/beverage-app
python3 -m http.server 3000
```

### 4. Launch Browser

```bash
# Standard
chromium http://localhost:3000

# Kiosk mode
chromium --kiosk http://localhost:3000

# Minimal X (best for Pi Zero)
sudo xinit /usr/bin/chromium --kiosk --no-sandbox --noerrdialogs --disable-infobars --no-first-run http://localhost:3000
```

### 5. Rotate Screen to Portrait

```bash
# List connected displays to find output name
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

Add to `~/.xinitrc` before the browser launch:

```bash
#!/bin/bash
xrandr --output HDMI-1 --rotate right
exec chromium --kiosk http://localhost:3000
```

Or create `/etc/X11/xorg.conf.d/10-monitor.conf`:

```
Section "Monitor"
    Identifier "HDMI-1"
    Option "Rotate" "right"
EndSection
```

## Configuration

Port: 4210 (configurable in `project.json`)

## Imports

```typescript
import { BeverageGrid, PouringControls, type BeverageModelLike } from '@kos-ui-validation/model-components';
import { useStandaloneBeverageContainer } from '@kos-ui-validation/model-components/standalone';
import { observer } from 'mobx-react-lite';
```

## Data Source

The app loads beverage data from `/assets/ui-schema.json`. Ensure this file exists in the build output.

## Performance Tips

For low-memory devices (Pi Zero):

```bash
chromium --kiosk --no-sandbox \
  --disable-dev-shm-usage \
  --js-flags="--max-old-space-size=128" \
  http://localhost:3000
```

Consider using a minimal X session instead of full desktop environment.
