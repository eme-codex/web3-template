export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
  timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '30000', 10),
  retryAttempts: 3,
  retryDelay: 1000,
} as const;

export const RELAYER_BASE_URL =
  process.env.NEXT_PUBLIC_RELAYER_BASE_URL || 'https://vault.echo-protocol.xyz';

export const API_ENDPOINTS = {
  // Example endpoints
  health: '/health',
  user: {
    profile: '/user/profile',
    settings: '/user/settings',
  },
  web3: {
    balance: '/web3/balance',
    transaction: '/web3/transaction',
  },
} as const;
