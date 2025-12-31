import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { WalletInfo } from '@/types';

interface WalletState {
  walletInfo: WalletInfo | null;
  isConnecting: boolean;
  error: string | null;

  // Actions
  setWalletInfo: (info: WalletInfo | null) => void;
  setIsConnecting: (isConnecting: boolean) => void;
  setError: (error: string | null) => void;
  clearWallet: () => void;
  updateBalance: (balance: string) => void;
}

export const useWalletStore = create<WalletState>()(
  devtools((set) => ({
    walletInfo: null,
    isConnecting: false,
    error: null,

    setWalletInfo: (info) => set({ walletInfo: info, error: null }),
    setIsConnecting: (isConnecting) => set({ isConnecting }),
    setError: (error) => set({ error }),
    clearWallet: () => set({ walletInfo: null, error: null }),
    updateBalance: (balance) =>
      set((state) => ({
        walletInfo: state.walletInfo
          ? { ...state.walletInfo, balance }
          : null,
      })),
  }))
);
