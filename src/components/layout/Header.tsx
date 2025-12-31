import Link from 'next/link';
import { cn } from '@/utils/cn';
import { WalletConnect } from '@/components/web3/WalletConnect';

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  return (
    <header className={cn('border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60', className)}>
      <div className="container-custom grid h-16 grid-cols-[auto_1fr_auto] items-center gap-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600" />
          <span className="font-bold text-lg">Web3 Template</span>
        </Link>
        {/* Centered navigation for desktop */}
        <nav className="hidden md:flex items-center justify-center space-x-6">
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
            Dashboard
          </Link>
          <Link href="/docs" className="text-sm font-medium hover:text-primary transition-colors">
            Docs
          </Link>
        </nav>
        {/* Wallet connect button aligned to the right */}
        <div className="flex items-center justify-end">
          <WalletConnect />
        </div>
      </div>
    </header>
  );
}
