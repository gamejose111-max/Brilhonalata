'use client';

import { LogOut, Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Logo } from './logo';
import { useAuth, useUser } from '@/firebase';
import { ThemeToggle } from './theme-toggle';

const navLinks = [
  { href: '/', label: 'Início' },
  { href: '/agendar', label: 'Agendar' },
  { href: '/admin', label: 'Admin' },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useUser();
  const auth = useAuth();

  const handleLogout = async () => {
    if (auth) {
      await auth.signOut();
      router.push('/login');
    }
  };


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-8 flex items-center text-primary">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {navLinks
            .filter((link) => link.href !== '/admin' || user)
            .map(({ href, label }) => (
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
          <ThemeToggle />
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <SheetDescription className="sr-only">
                Navegação principal do site
              </SheetDescription>
              <Link href="/" className="mb-8 flex items-center text-primary">
                <Logo />
              </Link>
              <nav className="flex flex-col gap-6 text-lg font-medium">
                {navLinks
                  .filter((link) => link.href !== '/admin' || user)
                  .map(({ href, label }) => (
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
                {user && (
                    <Button variant="ghost" onClick={handleLogout} className="justify-start text-lg text-foreground/60">
                      <LogOut className="mr-2 h-5 w-5" />
                      Sair
                    </Button>
                  )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        <div className="hidden flex-1 items-center justify-end gap-4 md:flex">
          <ThemeToggle />
          {user ? (
            <Button variant="ghost" onClick={handleLogout} size="sm">
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          ) : (
            <Button asChild>
              <Link href="/agendar">Agende seu Horário</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
