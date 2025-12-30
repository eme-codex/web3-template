'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WalletInfo } from '@/components/web3/WalletInfo';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useWallet } from '@/hooks/useWallet';
import { useApiQuery } from '@/hooks/useApi';
import { NETWORK_CONFIG, NETWORK_ENV } from '@/config/networks';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function Dashboard() {
  const { isConnected, address } = useWallet();
  const networkConfig = NETWORK_CONFIG[NETWORK_ENV];

  if (!isConnected) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Card className="max-w-md">
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
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
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

            {/* Example API Usage */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-6">API Integration Example</h2>
              <ApiExample />
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
  const { address, isConnected, balance } = useWallet();
  
  return (
    <div>
      <p>Address: {address}</p>
      <p>Connected: {isConnected ? 'Yes' : 'No'}</p>
      <p>Balance: {balance?.formatted}</p>
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
                    Using TanStack Query with the custom useApiQuery hook
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs">
                    {`// Using useApiQuery hook
import { useApiQuery } from '@/hooks/useApi';

export function MyComponent() {
  const { data, isLoading, error } = useApiQuery(
    'health',
    '/health'
  );
  
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
      </main>
      <Footer />
    </div>
  );
}

function ApiExample() {
  const { data, isLoading, error } = useApiQuery(['health'], '/health');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Health Check</CardTitle>
        <CardDescription>
          Example API call using TanStack Query
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && <p>Loading...</p>}
        {error && <p className="text-red-500">Error: {error.message}</p>}
        {data && (
          <div className="space-y-2">
            <p className="text-sm">
              <span className="font-medium">Status:</span> {data.success ? 'Success' : 'Failed'}
            </p>
            {data.data && (
              <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">
                {JSON.stringify(data.data, null, 2)}
              </pre>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
