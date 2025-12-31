'use client';

import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export function WalletConnect() {
  return (
    <ConnectButton
      accountStatus="address"
      chainStatus="icon"
      showBalance={false}
    />
  );
}
