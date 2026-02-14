import React from 'react';

const Logo = () => (
    <svg
        width="150"
        height="40"
        viewBox="0 0 150 40"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Brilho na Lata"
    >
        <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            className="font-bold"
            style={{ fontSize: '18px' }}
        >
            Brilho na Lata
        </text>
    </svg>
);


export default function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
        <div className="flex items-center gap-2 text-primary">
          <Logo />
        </div>
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Brilho na Lata. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
