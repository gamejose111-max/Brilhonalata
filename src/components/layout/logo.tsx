import React from 'react';

export const Logo = () => {
  return (
    <svg
      width="180"
      height="58"
      viewBox="0 0 180 58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-primary"
      aria-label="Brilho na Lata"
      role="img"
    >
      <g transform="translate(0, -8)">
        {/* Car silhouette */}
        <path
          d="M178.9,25.2c-2.3-1.6-5.1-2.4-8-2.4H155c-2.1,0-4.1,0.5-5.9,1.4l-11.2,5.6c-1,0.5-2.1,0.8-3.2,0.8H45.2c-1.1,0-2.2-0.3-3.2-0.8L30.8,29.2c-1.8-0.9-3.8-1.4-5.9-1.4H10.1c-2.9,0-5.7,0.8-8,2.4C0.8,25.9,0,27.2,0,28.6v8.8C0,41,1.6,42.9,3.8,43.8l5.6,2.3c2.4,1,5.1,1.5,7.8,1.5h145.6c2.7,0,5.4-0.5,7.8-1.5l5.6-2.3c2.2-0.9,3.8-2.8,3.8-4.9v-8.8C180,27.2,179.2,25.9,178.9,25.2z M25.9,40.1c-3.1,0-5.6-2.5-5.6-5.6s2.5-5.6,5.6-5.6s5.6,2.5,5.6,5.6S29,40.1,25.9,40.1z M154.1,40.1c-3.1,0-5.6-2.5-5.6-5.6s2.5-5.6,5.6-5.6s5.6,2.5,5.6,5.6S157.2,40.1,154.1,40.1z M170,20.5l-10-10c-0.8-0.8-2-1.2-3.2-1.2H23.2c-1.2,0-2.4,0.5-3.2,1.2l-10,10c-0.6,0.6-1,1.5-1,2.4v3h162v-3C171,22,170.6,21.1,170,20.5z"
          fill="currentColor"
        ></path>
      </g>
      <text
        x="90"
        y="52"
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontSize="18"
        fontWeight="900"
        fill="currentColor"
      >
        Brilho na Lata
      </text>
    </svg>
  );
};
