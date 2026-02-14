import React from 'react';
import { Logo } from './logo';


export default function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
        <div className="flex items-center gap-2 text-primary">
          <Logo />
        </div>
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Brilho na Lata, Cascais. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
