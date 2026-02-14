import React from 'react';

export const Logo = () => {
  return (
    <svg
      width="200"
      height="100"
      viewBox="0 0 320 165"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Brilho na Lata"
      role="img"
    >
      <style>
        {`
          .logo-text {
            font-family: 'Anton', sans-serif;
            font-size: 48px;
            fill: #212529;
            text-anchor: middle;
          }
          .logo-text-highlight {
            font-family: 'Anton', sans-serif;
            font-size: 48px;
            fill: white;
            text-anchor: middle;
            stroke: #e9ecef;
            stroke-width: 0.5px;
          }
          .car-body {
            fill: #adb5bd;
            stroke: #212529;
            stroke-width: 2.5;
            stroke-linejoin: round;
          }
          .car-window {
            fill: #343a40;
            stroke: #212529;
            stroke-width: 1.5;
          }
           .polisher {
            fill: #ced4da;
            stroke: #212529;
            stroke-width: 2;
          }
        `}
      </style>
      
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.4"/>
        </filter>
      </defs>

      <g style={{ filter: 'url(#shadow)' }}>
        <circle cx="160" cy="65" r="60" fill="white" stroke="#212529" strokeWidth="4" />
        <g transform="translate(160, 70) scale(0.6)">
          <path className="car-body" d="M -75,15 C -80,-5 -70,-25 -40,-30 C -10,-35 30,-30 60,-15 C 80,-5 85,15 70,25 L -70,25 Z" />
          <path className="car-window" d="M -45,12 L 15,12 L 35,-5 L -25,-5 Z" />
          <path fill="white" opacity="0.7" d="M 45,0 C 55,-5, 60,0, 55,8" />
          <circle cx="-60" cy="22" r="10" className="car-body" />
          <circle cx="50" cy="22" r="10" className="car-body" />
        </g>
        
        <g transform="translate(205, 75) rotate(20)">
           <path className="polisher" d="M 0,-20 L 20,-20 L 25,-5 L -5,-5 Z" />
           <rect x="-10" y="-5" width="40" height="10" rx="3" className="polisher" />
           <circle cx="10" cy="18" r="14" className="polisher" />
           <circle cx="10" cy="18" r="12" fill="white" />
           <path d="M 30,0 L 60,-15" stroke="#212529" strokeWidth="3" />
        </g>
        
        <g fill="white" stroke="#212529" strokeWidth="1">
           <path d="M95 45 l 5 5 l 5 -5 l -5 -5 z" />
           <path d="M225 55 l 3 3 l 3 -3 l -3 -3 z" />
        </g>
      </g>
      
      <text x="162" y="147" className="logo-text">BRILHO NA LATA</text>
      <text x="160" y="145" className="logo-text-highlight">BRILHO NA LATA</text>

      <rect x="80" y="155" width="160" height="2.5" fill="#212529" />
      <rect x="90" y="161" width="140" height="1.5" fill="#212529" />
    </svg>
  );
};
