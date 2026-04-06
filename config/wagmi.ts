import { createConfig, http, createStorage, cookieStorage } from 'wagmi';
import { base } from 'wagmi/chains';
import { injected, baseAccount } from 'wagmi/connectors';

// Builder Code integration from base.dev
import { Attribution } from 'ox/erc8021';
const DATA_SUFFIX = Attribution.toDataSuffix({ codes: ['bc_qbyukwvj'] });

export const config = createConfig({
  chains: [base],
  connectors: [
    injected(),
    baseAccount({
      appName: 'BaseTip',
    }),
  ],
  storage: createStorage({ storage: cookieStorage }),
  ssr: true,
  transports: {
    [base.id]: http(),
  },
  dataSuffix: DATA_SUFFIX,
});

declare module 'wagmi' {
  interface Register {
    config: typeof config;
  }
}
