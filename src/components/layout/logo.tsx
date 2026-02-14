import Image from 'next/image';
import React from 'react';

const logoSvg = `<svg width="200" height="50" viewBox="0 0 200 50" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="Brilho na Lata"><style>.text { font-family: 'Inter', sans-serif; font-size: 24px; font-weight: 900; letter-spacing: 0.5px; text-transform: uppercase; } .small { font-size: 11px; font-weight: 700; } </style><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" class="text">Brilho<tspan class="small" dy="-8" dx="2">na</tspan> Lata</text><line x1="25" y1="40" x2="175" y2="40" stroke="currentColor" stroke-width="2"/><line x1="30" y1="45" x2="170" y2="45" stroke="currentColor" stroke-width="1"/></svg>`;
const logoDataUri = `data:image/svg+xml;utf8,${encodeURIComponent(logoSvg)}`;

export const Logo = () => {
  return (
    <Image
      src={logoDataUri}
      width={180}
      height={45}
      alt="Brilho na Lata Logo"
      aria-label="Brilho na Lata"
    />
  );
};
