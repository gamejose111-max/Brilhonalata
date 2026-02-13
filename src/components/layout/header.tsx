'use client';

import { Car, Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Início' },
  { href: '/#servicos', label: 'Serviços' },
  { href: '/agendar', label: 'Agendar' },
  { href: '/admin', label: 'Admin' },
];

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-8 flex items-center gap-2">
          <Car className="h-6 w-6 text-primary" />
          <span className="hidden font-bold sm:inline-block">
            Brilho da Lata
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'transition-colors hover:text-foreground/80',
                pathname === href ? 'text-foreground' : 'text-foreground/60'
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end gap-2 md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <Link href="/" className="mb-8 flex items-center gap-2">
                <Car className="h-6 w-6 text-primary" />
                <span className="font-bold">Brilho da Lata</span>
              </Link>
              <nav className="flex flex-col gap-6 text-lg font-medium">
                {navLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      'transition-colors hover:text-foreground/80',
                      pathname === href
                        ? 'text-foreground'
                        : 'text-foreground/60'
                    )}
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        <div className="hidden flex-1 justify-end md:flex">
          <Button asChild>
            <Link href="/agendar">Agende seu Horário</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
