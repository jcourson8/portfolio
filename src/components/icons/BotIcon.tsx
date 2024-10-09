import React from 'react';

const BotIcon = ({ className = '', size = 24 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`robot-icon ${className}`}
    >
      {/* Body */}
      <rect x="7" y="10" width="10" height="8" />
      
      {/* Head */}
      <rect x="8" y="5" width="8" height="5" rx="1" />
      
      {/* Eyes */}
      <circle cx="10" cy="7.5" r="0.5" />
      <circle cx="14" cy="7.5" r="0.5" />
      
      {/* Antenna */}
      <line x1="12" y1="5" x2="12" y2="3" />
      <circle cx="12" cy="3" r="0.5" />
      
      {/* Arms */}
      <line x1="7" y1="12" x2="5" y2="12" />
      <line x1="17" y1="12" x2="19" y2="12" />
      
      {/* Legs */}
      <line x1="9" y1="18" x2="9" y2="21" />
      <line x1="15" y1="18" x2="15" y2="21" />
    </svg>
  );
};

export default BotIcon;