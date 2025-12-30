import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sei, seiTestnet } from 'viem/chains';
import { WALLET_CONNECT_PROJECT_ID, NETWORK_ENV } from './networks';

const chains = NETWORK_ENV === 'testnet' ? [seiTestnet, sei] : [sei, seiTestnet];

export const wagmiConfig = getDefaultConfig({
  appName: 'Web3 Dapp',
  projectId: WALLET_CONNECT_PROJECT_ID,
  chains,
  ssr: true,
});

export const defaultChain = NETWORK_ENV === 'testnet' ? seiTestnet : sei;
