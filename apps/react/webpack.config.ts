import { composePlugins, withNx } from '@nx/webpack';
import { withReact } from '@nx/react';
import * as webpack from 'webpack';
import { withModuleFederation } from '@nx/react/module-federation';

import baseConfig from './module-federation.config';

import * as dotenv from 'dotenv';

dotenv.config({
  path: '.env',
});

const config = {
  ...baseConfig,
};

function getKosEnv() {
  const kosKeys = Object.keys(process.env).filter((key) =>
    key.startsWith('KOS_')
  );
  return kosKeys;
}

// Nx plugins for webpack to build config object from Nx options and context.
export default composePlugins(
  withNx({}),
  withReact(),
  withModuleFederation(config),
  (config, { options, context }) => {
    if (config) {
      config.resolve = config.resolve || {};
      config.resolve.fallback = {
        ...config.resolve.fallback,
        path: false,
      };
    }
    config.mode = (process.env.NODE_ENV || config.mode) as any;
    // customize webpack config here
    config?.plugins?.push(
      new webpack.EnvironmentPlugin(['NODE_ENV', ...getKosEnv()])
    );
    return config;
  }
);
