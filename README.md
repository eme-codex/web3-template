# Web3 Next.js Template

A professional, production-ready template for building Web3 applications with **Next.js**, **Wagmi**, **RainbowKit**, **TanStack Query**, **Zustand**, and more.

## 🚀 Features

- **Next.js 16** - Latest Next.js with App Router
- **TypeScript** - Full type safety
- **Wagmi + RainbowKit** - Web3 wallet integration
- **TanStack Query** - Powerful data fetching and caching
- **Zustand** - Lightweight state management
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Reusable UI components
- **API Encapsulation** - Clean API service layer
- **Environment Configuration** - Multi-network support (testnet/mainnet)
- **Custom Hooks** - useWallet, useApi, useLocalStorage, useDebounce
- **Utility Functions** - Helpers for common tasks
- **Global CSS** - Pre-configured styles and animations

## 📋 Project Structure

```
web3-template/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout with providers
│   │   ├── page.tsx            # Home page
│   │   ├── dashboard/          # Dashboard page example
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── ui/                 # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   └── index.ts
│   │   ├── layout/             # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Layout.tsx
│   │   │   └── index.ts
│   │   ├── web3/               # Web3-specific components
│   │   │   ├── WalletConnect.tsx
│   │   │   ├── WalletInfo.tsx
│   │   │   └── index.ts
│   │   ├── providers/          # Context providers
│   │   │   └── Providers.tsx
│   │   └── index.ts
│   ├── config/                 # Configuration files
│   │   ├── networks.ts         # Network configuration
│   │   ├── api.ts              # API configuration
│   │   └── wagmi.ts            # Wagmi configuration
│   ├── hooks/                  # Custom React hooks
│   │   ├── useApi.ts           # API hooks
│   │   ├── useWallet.ts        # Wallet hooks
│   │   ├── useLocalStorage.ts  # Local storage hook
│   │   ├── useDebounce.ts      # Debounce hook
│   │   └── index.ts
│   ├── store/                  # Zustand stores
│   │   ├── walletStore.ts      # Wallet state
│   │   ├── appStore.ts         # App state
│   │   └── index.ts
│   ├── services/               # Service layer
│   │   ├── api.ts              # API service
│   │   ├── web3.ts             # Web3 service
│   │   └── index.ts
│   ├── types/                  # TypeScript types
│   │   └── index.ts
│   ├── utils/                  # Utility functions
│   │   ├── helpers.ts          # Helper functions
│   │   ├── cn.ts               # Class name utility
│   │   └── index.ts
│   ├── styles/                 # Global styles
│   │   └── globals.css
│   └── public/                 # Static assets
│       └── images/
├── .env.example                # Environment variables template
├── .env.local                  # Local environment variables
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── README.md
```

## 🛠️ Installation

### 1. Clone or Extract the Project

```bash
cd web3-template
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Configure Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
# Network Configuration
NEXT_PUBLIC_NETWORK_ENV=testnet
NEXT_PUBLIC_TESTNET_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
NEXT_PUBLIC_MAINNET_RPC_URL=https://mainnet.infura.io/v3/YOUR_INFURA_KEY

# Wallet Configuration
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=YOUR_WALLET_CONNECT_PROJECT_ID

# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
NEXT_PUBLIC_API_TIMEOUT=30000

```

### 4. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📚 Usage Examples

### Using the Wallet Hook

```typescript
'use client';

import { useWallet } from '@/hooks/useWallet';

export function MyComponent() {
  const { address, isConnected, balance, disconnect } = useWallet();

  if (!isConnected) {
    return <div>Please connect your wallet</div>;
  }

  return (
    <div>
      <p>Address: {address}</p>
      <p>Balance: {balance?.formatted} {balance?.symbol}</p>
      <button onClick={() => disconnect()}>Disconnect</button>
    </div>
  );
}
```

### Using API Query Hook

```typescript
'use client';

import { useApiQuery } from '@/hooks/useApi';

export function MyComponent() {
  const { data, isLoading, error } = useApiQuery(
    ['user', 'profile'],
    '/user/profile'
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{JSON.stringify(data)}</div>;
}
```

### Using Zustand Store

```typescript
'use client';

import { useAppStore } from '@/store/appStore';

export function MyComponent() {
  const { isDarkMode, toggleDarkMode, showNotification } = useAppStore();

  return (
    <div>
      <button onClick={toggleDarkMode}>
        Toggle Dark Mode
      </button>
      <button onClick={() => showNotification('success', 'Success!')}>
        Show Notification
      </button>
    </div>
  );
}
```

### Using Utility Functions

```typescript
import { 
  formatNumber, 
  formatCurrency, 
  copyToClipboard,
  retry 
} from '@/utils/helpers';

// Format number
const formatted = formatNumber(1234.56, 2); // "1,234.56"

// Format currency
const currency = formatCurrency(100, 'USD'); // "$100.00"

// Copy to clipboard
await copyToClipboard('text to copy');

// Retry function
const result = await retry(
  () => fetchData(),
  3, // max attempts
  1000 // delay in ms
);
```

## 🔧 Configuration

### Network Configuration

Edit `src/config/networks.ts` to configure your networks:

```typescript
export const NETWORKS = {
  testnet: sepolia,
  mainnet: mainnet,
};

export const RPC_URLS = {
  testnet: 'https://sepolia.infura.io/v3/YOUR_KEY',
  mainnet: 'https://mainnet.infura.io/v3/YOUR_KEY',
};
```

### API Configuration

Edit `src/config/api.ts` to configure your API:

```typescript
export const API_CONFIG = {
  baseURL: 'http://localhost:3000/api',
  timeout: 30000,
  retryAttempts: 3,
  retryDelay: 1000,
};
```

### Wagmi Configuration

Edit `src/config/wagmi.ts` to customize Wagmi setup:

```typescript
export const wagmiConfig = getDefaultConfig({
  appName: 'Web3 Template',
  projectId: 'YOUR_WALLET_CONNECT_PROJECT_ID',
  chains: [sepolia, mainnet],
  ssr: true,
});
```

## 📦 Dependencies

### Core
- **next** - React framework
- **react** - UI library
- **react-dom** - DOM rendering

### Web3
- **wagmi** - Ethereum library
- **viem** - TypeScript Ethereum library
- **@rainbow-me/rainbowkit** - Wallet connection UI

### State Management & Data Fetching
- **zustand** - State management
- **@tanstack/react-query** - Data fetching and caching
- **axios** - HTTP client

### Styling
- **tailwindcss** - CSS framework
- **class-variance-authority** - Component variants
- **clsx** - Class name utility
- **tailwind-merge** - Merge Tailwind classes

### UI & Icons
- **lucide-react** - Icon library

### Development
- **typescript** - Type safety
- **eslint** - Code linting

## 🚀 Build for Production

```bash
pnpm build
```

Start production server:

```bash
pnpm start
```

## 📝 Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## 🎨 Customization

### Add New UI Components

Create new components in `src/components/ui/`:

```typescript
// src/components/ui/Modal.tsx
import * as React from 'react';
import { cn } from '@/utils/cn';

export interface ModalProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('modal', className)}
      {...props}
    />
  )
);
Modal.displayName = 'Modal';

export { Modal };
```

### Add New Hooks

Create new hooks in `src/hooks/`:

```typescript
// src/hooks/useMyHook.ts
import { useEffect, useState } from 'react';

export function useMyHook() {
  const [state, setState] = useState(null);

  useEffect(() => {
    // Hook logic
  }, []);

  return state;
}
```

### Add New API Endpoints

Update `src/config/api.ts`:

```typescript
export const API_ENDPOINTS = {
  // ... existing endpoints
  myEndpoint: '/my-endpoint',
};
```

## 🔐 Security Considerations

1. **Never commit `.env.local`** - Add to `.gitignore`
2. **Keep private keys secure** - Use environment variables
3. **Validate user input** - Always validate on both client and server
4. **Use HTTPS** - Always use HTTPS in production
5. **Keep dependencies updated** - Regularly update packages

## 📖 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Wagmi Documentation](https://wagmi.sh/)
- [RainbowKit Documentation](https://www.rainbowkit.com/)
- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤝 Contributing

Feel free to customize this template for your needs. Some ideas:

- Add more UI components
- Implement additional hooks
- Add authentication
- Integrate with backend APIs
- Add testing setup
- Deploy to Vercel or other platforms

## 📄 License

MIT License - feel free to use this template for your projects.

## 🆘 Support

For issues or questions:

1. Check the documentation links above
2. Review the example pages in the template
3. Check the inline comments in the code
4. Visit the official documentation for the libraries used

## 🎯 Next Steps

1. Customize the branding (logo, colors, fonts)
2. Add your own pages and components
3. Implement your Web3 features
4. Connect to your backend API
5. Deploy to production

Happy coding! 🚀
