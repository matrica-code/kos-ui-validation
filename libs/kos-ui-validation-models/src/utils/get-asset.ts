import { getQueryParams } from '@kosdev-code/kos-ui-sdk';

export const getDefaultHost = () => {
  const defaultHost = window.location.origin;
  const params = getQueryParams();
  const hostUrl = (params as Record<string, unknown>)?.['host'];
  const result = hostUrl || defaultHost;
  return result;
};

// const DEV_URL = "http://localhost:8081"
// const DEV_URL = "http://172.16.143.133:8081"
const DEV_URL = 'http://localhost:8081';

export const HOST_URL =
  process.env['NODE_ENV'] === 'development' ? DEV_URL : getDefaultHost();

export const ASSETS_BASE_PATH = `${HOST_URL}/system/brandset/ui/`;

export const getAsset = (url: string) => {
  return `${ASSETS_BASE_PATH}${url}`;
};
