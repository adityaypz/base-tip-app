import { createConfig, http, createStorage, cookieStorage } from 'wagmi';
import { base } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';

// TODO: Replace with your actual Builder Code from base.dev after verification
// import { Attribution } from 'ox/erc8021';
// const DATA_SUFFIX = Attribution.toDataSuffix({ codes: ['YOUR-BUILDER-CODE'] });

export const config = createConfig({
  chains: [base],
  connectors: [
    injected(),
  ],
  storage: createStorage({ storage: cookieStorage }),
  ssr: true,
  transports: {
    [base.id]: http(),
  },
  // dataSuffix: DATA_SUFFIX, // Uncomment after getting Builder Code
});

declare module 'wagmi' {
  interface Register {
    config: typeof config;
  }
}
