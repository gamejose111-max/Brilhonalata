import React from 'react';

export const Logo = () => {
  return (
    <svg
      width="200"
      height="50"
      viewBox="0 0 200 50"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Brilho na Lata"
      role="img"
    >
      <style>
        {`
          .logo-text {
            font-family: 'Anton', sans-serif;
            font-size: 28px;
            fill: currentColor;
            text-anchor: start;
          }
        `}
      </style>
      <text x="0" y="35" className="logo-text">BRILHO NA LATA</text>
    </svg>
  );
};
