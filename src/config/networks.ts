import { mainnet, sepolia } from 'viem/chains';

export const NETWORKS = {
  testnet: sepolia,
  mainnet: mainnet,
} as const;

export const NETWORK_ENV = (process.env.NEXT_PUBLIC_NETWORK_ENV || 'testnet') as 'testnet' | 'mainnet';

export const RPC_URLS = {
  testnet: process.env.NEXT_PUBLIC_TESTNET_RPC_URL || 'https://sepolia.infura.io/v3/YOUR_KEY',
  mainnet: process.env.NEXT_PUBLIC_MAINNET_RPC_URL || 'https://mainnet.infura.io/v3/YOUR_KEY',
} as const;

export const CURRENT_NETWORK = NETWORKS[NETWORK_ENV];
export const CURRENT_RPC_URL = RPC_URLS[NETWORK_ENV];

export const WALLET_CONNECT_PROJECT_ID = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '';

export const NETWORK_CONFIG = {
  testnet: {
    name: 'Sepolia Testnet',
    chainId: 11155111,
    rpcUrl: RPC_URLS.testnet,
    blockExplorer: 'https://sepolia.etherscan.io',
  },
  mainnet: {
    name: 'Ethereum Mainnet',
    chainId: 1,
    rpcUrl: RPC_URLS.mainnet,
    blockExplorer: 'https://etherscan.io',
  },
} as const;
