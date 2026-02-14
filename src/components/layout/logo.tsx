import Image from 'next/image';
import React from 'react';

export const Logo = () => {
  return (
    <Image
      src="/logo.png"
      alt="Brilho na Lata Logo"
      width={180}
      height={58}
      priority
    />
  );
};
