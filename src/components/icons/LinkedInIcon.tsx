import React, { useState } from 'react';

export const LinkedInIcon: React.FC<{ linkedinUrl: string; altText: string; minimal?: boolean }> = ({
  linkedinUrl,
  altText,
  minimal = false
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a
        href={linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`fill-primary flex items-center justify-center rounded-lg transition duration-300 ease-in-out ${
          minimal ? '' : 'p-1 bg-background border border-secondary'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30px" height="30px">
          <path d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2V6C26,4.895,25.105,4,24,4z M10.954,22h-2.95 v-9.492h2.95V22z M9.449,11.151c-0.951,0-1.72-0.771-1.72-1.72c0-0.949,0.77-1.719,1.72-1.719c0.948,0,1.719,0.771,1.719,1.719 C11.168,10.38,10.397,11.151,9.449,11.151z M22.004,22h-2.948v-4.616c0-1.101-0.02-2.517-1.533-2.517 c-1.535,0-1.771,1.199-1.771,2.437V22h-2.948v-9.492h2.83v1.297h0.04c0.394-0.746,1.356-1.533,2.791-1.533 c2.987,0,3.539,1.966,3.539,4.522V22z" />
        </svg>
      </a>
      <div 
        className={`absolute left-1/2 transform -translate-x-1/2 translate-y-1 bg-neutral-800 text-white text-xs rounded-md p-1 mt-1 z-10 whitespace-nowrap transition-all duration-200 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
        }`}
      >
        {altText}
      </div>
    </div>
  );
};