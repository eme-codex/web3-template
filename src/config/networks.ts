import { sei, seiTestnet } from 'viem/chains';

export const NETWORKS = {
  testnet: seiTestnet,
  mainnet: sei,
} as const;

export const NETWORK_ENV = (process.env.NEXT_PUBLIC_NETWORK_ENV || 'testnet') as 'testnet' | 'mainnet';

export const RPC_URLS = {
  testnet: process.env.NEXT_PUBLIC_SEI_TESTNET_RPC_URL || 'https://evm-rpc-testnet.sei-apis.com',
  mainnet: process.env.NEXT_PUBLIC_SEI_MAINNET_RPC_URL || 'https://evm-rpc.sei-apis.com/',
} as const;

export const CURRENT_NETWORK = NETWORKS[NETWORK_ENV];
export const CURRENT_RPC_URL = RPC_URLS[NETWORK_ENV];

export const WALLET_CONNECT_PROJECT_ID = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '';

export const NETWORK_CONFIG = {
  testnet: {
    name: 'Sei Testnet',
    chainId: 1328,
    rpcUrl: RPC_URLS.testnet,
    blockExplorer: 'https://seitrace.com',
  },
  mainnet: {
    name: 'Sei Mainnet',
    chainId: 1329,
    rpcUrl: RPC_URLS.mainnet,
    blockExplorer: 'https://seitrace.com',
  },
} as const;
