import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, sepolia, sei } from 'wagmi/chains';
import { WALLET_CONNECT_PROJECT_ID, NETWORK_ENV } from './networks';

export const wagmiConfig = getDefaultConfig({
  appName: 'Web3 Dapp',
  projectId: WALLET_CONNECT_PROJECT_ID,
  chains: [sei, sepolia, mainnet],
  ssr: true,
});

export const defaultChain = NETWORK_ENV === 'sei' ? sei : NETWORK_ENV === 'testnet' ? sepolia : mainnet;
