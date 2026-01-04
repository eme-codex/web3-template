'use client';

import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { WalletInfo } from '@/components/web3/WalletInfo';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useWallet } from '@/hooks/useWallet';
import { useWithdrawLimit } from '@/hooks/relayer/useWithdrawLimit';
import { CURRENT_NETWORK, NETWORK_ENV } from '@/config/networks';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function Dashboard() {
  const { isConnected, address } = useWallet();
  const networkConfig = CURRENT_NETWORK;
  const limitQuery = useWithdrawLimit(address);

  if (!isConnected) {
    return (
      <Layout>
        <div className="flex flex-1 items-center justify-center py-12">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle>Wallet Not Connected</CardTitle>
              <CardDescription>
                Please connect your wallet to access the dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/">
                <Button className="w-full">
                  Back to Home
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="container-custom">
          <div className="mb-8">
            <Link href="/">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-4xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Manage your Web3 wallet and view your assets
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Wallet Info */}
            <div className="lg:col-span-2">
              <WalletInfo />
            </div>

            {/* Quick Stats */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Network</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{networkConfig.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {NETWORK_ENV === 'testnet' ? 'Testnet' : 'Mainnet'}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Withdraw Limit</CardTitle>
                </CardHeader>
                <CardContent>
                  {limitQuery.isLoading && <p className="text-sm text-muted-foreground">Loading...</p>}
                  {limitQuery.error && (
                    <p className="text-sm text-red-500">Error: {limitQuery.error.message}</p>
                  )}
                  {!limitQuery.isLoading && !limitQuery.error && limitQuery.data && (
                    <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">
                      {JSON.stringify(limitQuery.data, null, 2)}
                    </pre>
                  )}
                  {!limitQuery.isLoading && !limitQuery.error && !limitQuery.data && (
                    <p className="text-sm text-muted-foreground">No data</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                    <p className="font-medium">Connected</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Code Examples */}
          <div className="mt-8 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Hooks Usage Example</CardTitle>
                <CardDescription>
                  Examples of how to use the custom hooks in your components
                </CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs">
                  {`// Using useWallet hook
import { useWallet } from '@/hooks/useWallet';

export function MyComponent() {
  const { address, isConnected } = useWallet();
  
  return (
    <div>
      <p>Address: {address}</p>
      <p>Connected: {isConnected ? 'Yes' : 'No'}</p>
    </div>
  );
}`}
                </pre>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>API Query Example</CardTitle>
                <CardDescription>
                  Using TanStack Query with a custom hook
                </CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs">
                  {`// Using a custom query hook
import { useWithdrawLimit } from '@/hooks/relayer/useWithdrawLimit';

export function MyComponent({ address }: { address: string }) {
  const { data, isLoading, error } = useWithdrawLimit(address);
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return <div>{JSON.stringify(data)}</div>;
}`}
                </pre>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Zustand Store Example</CardTitle>
                <CardDescription>
                  Using Zustand for state management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs">
                  {`// Using Zustand store
import { useAppStore } from '@/store/appStore';

export function MyComponent() {
  const { isDarkMode, toggleDarkMode } = useAppStore();
  
  return (
    <button onClick={toggleDarkMode}>
      Toggle Dark Mode: {isDarkMode ? 'On' : 'Off'}
    </button>
  );
}`}
                </pre>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}
