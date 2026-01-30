# KOS UI Validation

A beverage selection and pouring application built with React, demonstrating both KOS-integrated and standalone implementations for performance testing on various hardware platforms.

## Overview

This monorepo contains multiple React applications for beverage dispensing UI:

| App | Description | Port |
|-----|-------------|------|
| `react` | KOS-integrated single screen | 4200 |
| `react-dual-screen` | KOS-integrated dual screen (768x1024 each) | 4201 |
| `react-standalone` | Standalone MobX (no KOS) single screen | 4210 |
| `react-dual-screen-standalone` | Standalone MobX dual screen | 4211 |

The **standalone** versions use pure MobX for state management without KOS dependencies, making them suitable for performance testing on resource-constrained devices like Raspberry Pi.

## Tech Stack

- **React 18** - UI framework
- **MobX** - State management (standalone apps)
- **KOS SDK** - Framework integration (KOS apps)
- **Emotion** - CSS-in-JS styling
- **Nx** - Monorepo build system
- **Vite/Webpack** - Bundling

## Prerequisites

- Node.js 18+
- npm or yarn

## Getting Started

```bash
# Install dependencies
npm install

# Start development server (choose one)
npx nx serve react                         # KOS single screen - http://localhost:4200
npx nx serve react-dual-screen             # KOS dual screen - http://localhost:4201
npx nx serve react-standalone              # Standalone single screen - http://localhost:4210
npx nx serve react-dual-screen-standalone  # Standalone dual screen - http://localhost:4211
```

## Building for Production

```bash
# Build all apps
npx nx run-many -t build --all

# Build specific app
npx nx build react-standalone --configuration=production
npx nx build react-dual-screen-standalone --configuration=production
```

Build outputs are in `dist/apps/<app-name>/`.

## Deploying to Raspberry Pi

### 1. Build the standalone app

```bash
npx nx build react-standalone --configuration=production
```

### 2. Copy to Pi

```bash
scp -r dist/apps/react-standalone/* pi@<pi-ip>:~/beverage-app/
```

### 3. Serve on Pi

```bash
# Using Python (pre-installed on Pi)
cd ~/beverage-app
python3 -m http.server 3000

# Or install and use serve
sudo npm install -g serve
serve -s ~/beverage-app -l 3000
```

### 4. Launch browser

```bash
# Standard launch
chromium http://localhost:3000

# Kiosk mode (fullscreen, no UI)
chromium --kiosk http://localhost:3000

# Minimal X session (no desktop environment)
sudo xinit /usr/bin/chromium --kiosk --no-sandbox --noerrdialogs --disable-infobars --no-first-run http://localhost:3000
```

### 5. Rotate screen (if needed)

```bash
DISPLAY=:0 xrandr --output HDMI-1 --rotate right
```

## Pi Performance Notes

- **Pi Zero/Zero W (512MB RAM)**: Struggles with modern browsers. Use minimal X setup, disable desktop environment.
- **Pi Zero 2 W**: Quad-core CPU handles React apps better despite same 512MB RAM.
- **Pi 4 (1-8GB RAM)**: Recommended for production kiosks.

### Chromium flags for low-memory devices

```bash
chromium --kiosk --no-sandbox \
  --disable-gpu \
  --disable-software-rasterizer \
  --disable-dev-shm-usage \
  --js-flags="--max-old-space-size=128" \
  http://localhost:3000
```

## Project Structure

```
kos-ui-validation/
├── apps/
│   ├── react/                         # KOS single screen app
│   ├── react-dual-screen/             # KOS dual screen app
│   ├── react-standalone/              # Standalone single screen app
│   └── react-dual-screen-standalone/  # Standalone dual screen app
├── libs/
│   ├── model-components/              # Shared UI components
│   │   ├── src/
│   │   │   ├── components/            # React components (BeverageGrid, PouringControls)
│   │   │   ├── hooks/                 # KOS hooks (useBeverageContainer)
│   │   │   ├── standalone/            # Standalone MobX models and hooks
│   │   │   ├── index.ts               # Main entry (shared components)
│   │   │   ├── kos.ts                 # KOS-specific exports
│   │   │   └── standalone.ts          # Standalone exports
│   └── kos-ui-validation-models/      # KOS model definitions
└── dist/                              # Build outputs
```

## Library Sub-path Exports

The `@kos-ui-validation/model-components` library uses sub-path exports to separate KOS and standalone code:

```typescript
// Shared components (both KOS and standalone)
import { BeverageGrid, PouringControls, type BeverageModelLike } from '@kos-ui-validation/model-components';

// KOS-specific
import { useBeverageContainer } from '@kos-ui-validation/model-components/kos';

// Standalone-specific
import { useStandaloneBeverageContainer } from '@kos-ui-validation/model-components/standalone';
```

## KOS Integration

### Install the kosui CLI

```bash
npm install -g @kosdev-code/kos-ui-cli
```

### Set up environment variables

```bash
kosui env
```

This discovers and stores Java and Studio paths in `.env.local`:

```
JAVA_CMD='/usr/bin/java'
KOS_INSTALL_PATH='/Users/dev/Applications/kosStudio.app'
```

### Building a Kab

```bash
npx nx run react:kab
```

### Running with KOS backend

Start the dev server and connect to a KOS host:

```bash
npx nx serve react
```

Navigate to `http://localhost:4200/?host=http://localhost:8081`

## Development

```bash
# Run linting
npx nx lint react-standalone

# Type check
npx tsc --noEmit -p apps/react-standalone/tsconfig.app.json

# Build library
npx nx build model-components
```

## License

Private
