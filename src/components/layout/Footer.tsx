import { cn } from '@/utils/cn';

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn('border-t bg-background', className)}>
      <div className="container-custom py-6">
        <p className="text-sm text-muted-foreground text-center">
          © {currentYear} Web3 Template. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
