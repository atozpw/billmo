import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'billing-mobile',
  webDir: 'www',
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
  },
};

export default config;
