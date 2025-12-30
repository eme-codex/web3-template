'use client'

import { useAccount, useBalance, useChainId, useConnect, useDisconnect } from 'wagmi';
import { useEffect } from 'react';
import { useWalletStore } from '@/store/walletStore';
import { web3Service } from '@/services/web3';

export function useWallet() {
  const { address, isConnected, chainId } = useAccount();
  const { data: balanceData } = useBalance({ address, chainId });
  const { connect, connectors, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();

  const { walletInfo, setWalletInfo, setIsConnecting, clearWallet } = useWalletStore();

  // Update wallet info when account changes
  useEffect(() => {
    if (isConnected && address) {
      setWalletInfo({
        address,
        chainId: chainId || 1,
        isConnected: true,
        balance: balanceData?.formatted,
      });
    } else {
      clearWallet();
    }
  }, [isConnected, address, chainId, balanceData, setWalletInfo, clearWallet]);

  // Update connecting state
  useEffect(() => {
    setIsConnecting(isConnecting);
  }, [isConnecting, setIsConnecting]);

  return {
    address,
    isConnected,
    chainId,
    balance: balanceData,
    walletInfo,
    connect,
    connectors,
    disconnect,
    isConnecting,
    shortenAddress: address ? web3Service.shortenAddress(address) : null,
  };
}
