'use client';

import React from 'react';
import { useWallet } from '@/hooks/useWallet';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Copy, LogOut } from 'lucide-react';
import { copyToClipboard } from '@/utils/helpers';

export function WalletInfo() {
  const { address, isConnected, balance, shortenAddress, disconnect } = useWallet();
  const [copied, setCopied] = React.useState(false);

  const handleCopyAddress = async () => {
    if (address) {
      const success = await copyToClipboard(address);
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  if (!isConnected || !address) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Wallet Information</CardTitle>
        <CardDescription>Your connected wallet details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Address</p>
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <code className="text-sm font-mono">{shortenAddress}</code>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopyAddress}
              className="h-8 w-8 p-0"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          {copied && <p className="text-xs text-green-600">Copied!</p>}
        </div>

        {balance && (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Balance</p>
            <p className="text-2xl font-bold">{balance.formatted} {balance.symbol}</p>
          </div>
        )}

        <Button
          variant="destructive"
          className="w-full"
          onClick={() => disconnect()}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Disconnect
        </Button>
      </CardContent>
    </Card>
  );
}
