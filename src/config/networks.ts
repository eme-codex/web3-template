import { sei, seiTestnet } from "wagmi/chains";

export const NETWORKS = {
  testnet: seiTestnet,
  mainnet: sei,
} as const;

export type NetworkEnv = keyof typeof NETWORKS;

const rawEnv = process.env.NEXT_PUBLIC_NETWORK_ENV;
export const NETWORK_ENV: NetworkEnv =
  rawEnv === "mainnet" || rawEnv === "testnet" ? rawEnv : "testnet";

export const CURRENT_NETWORK = NETWORKS[NETWORK_ENV];

export const WALLET_CONNECT_PROJECT_ID = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '';


// 只有一个 env 变量：NEXT_PUBLIC_RPC_URL
export const CURRENT_RPC_URL =
  process.env.NEXT_PUBLIC_RPC_URL ??
  (NETWORK_ENV === "mainnet"
    ? "https://evm-rpc.sei-apis.com/"
    : "https://evm-rpc-testnet.sei-apis.com");