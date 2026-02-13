import React from 'react';
import { Car } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
        <div className="flex items-center gap-2">
          <Car className="h-6 w-6 text-primary" />
          <span className="font-bold">Brilho da Lata</span>
        </div>
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Brilho da Lata. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
