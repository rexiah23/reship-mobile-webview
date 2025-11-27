import Constants from 'expo-constants';

/**
 * Get the base URL for the webview
 * Set via EAS build environment variables:
 * - Staging: https://ship.reship.rocks
 * - Production: https://ship.reship.com
 */
const getWebviewBaseUrl = (): string => {
  return Constants.expoConfig?.extra?.webviewBaseUrl || 'https://ship.reship.com';
};

/**
 * Environment configuration
 */
export const env = {
  webviewBaseUrl: getWebviewBaseUrl(),
  get dashboardUrl() {
    return `${this.webviewBaseUrl}/dashboard`;
  },
  get homeUrl() {
    return `${this.webviewBaseUrl}/`;
  },
} as const;

