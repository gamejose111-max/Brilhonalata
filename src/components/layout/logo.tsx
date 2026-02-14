import React from 'react';

export const Logo = () => {
  return (
    <svg
      width="200"
      height="65"
      viewBox="0 0 200 65"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Brilho na Lata"
    >
      <style>
        {`
          .text-logo {
            font-family: 'Inter', sans-serif;
            font-size: 24px;
            font-weight: 900;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            fill: currentColor;
          }
          .small-logo {
            font-size: 11px;
            font-weight: 700;
          }
          .car-silhouette {
            fill: currentColor;
          }
        `}
      </style>
      
      {/* Car Silhouette */}
      <g className="car-silhouette" transform="translate(55, 0)">
        {/* Car Body */}
        <path d="M0 15 L5 15 L10 5 L40 5 L45 15 L90 15 L90 25 L0 25 Z" />
        {/* Wheels */}
        <circle cx="20" cy="25" r="5" />
        <circle cx="70" cy="25" r="5" />
      </g>
      
      {/* Text */}
      <text
        x="50%"
        y="45"
        dominantBaseline="middle"
        textAnchor="middle"
        className="text-logo"
      >
        Brilho
        <tspan className="small-logo" dy="-8" dx="2">
          na
        </tspan>
        {' '}Lata
      </text>

      {/* Lines */}
      <g transform="translate(0, 2)">
        <line
          x1="25"
          y1="58"
          x2="175"
          y2="58"
          stroke="currentColor"
          strokeWidth="2"
        />
        <line
          x1="30"
          y1="62"
          x2="170"
          y2="62"
          stroke="currentColor"
          strokeWidth="1"
        />
      </g>
    </svg>
  );
};
