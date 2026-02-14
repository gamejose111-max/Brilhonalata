import React from 'react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Brilho da Lata" width={150} height={40} />
        </div>
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Brilho da Lata. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
