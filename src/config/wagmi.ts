import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import { sei, seiTestnet } from 'wagmi/chains';
import { WALLET_CONNECT_PROJECT_ID, NETWORK_ENV, CURRENT_RPC_URL } from './networks';

const primaryChain = NETWORK_ENV === 'testnet' ? seiTestnet : sei;
const secondaryChain = NETWORK_ENV === 'testnet' ? sei : seiTestnet;

const chains = [primaryChain, secondaryChain] as const;

export const wagmiConfig = getDefaultConfig({
  appName: 'Web3 Dapp',
  projectId: WALLET_CONNECT_PROJECT_ID,
  chains,
  transports: {
    [primaryChain.id]: http(CURRENT_RPC_URL), // 当前环境的链走指定的 RPC
    [secondaryChain.id]: http(),              // 另一条链走默认 public RPC（也可自己填）
  },
  ssr: true,
});

export const defaultChain = primaryChain;