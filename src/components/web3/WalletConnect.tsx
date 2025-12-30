'use client';

import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button } from '@/components/ui/Button';

export function WalletConnect() {
  return (
    <ConnectButton
      accountStatus="avatar"
      chainStatus="icon"
      showBalance={true}
    />
  );
}
