import React from 'react';

interface ArrowUpperRightIconProps {
    className?: string;
}

export const ArrowUpperRightIcon: React.FC<ArrowUpperRightIconProps> = ({
    className = ''
}) => {
  return (
    <svg
      viewBox="0 0 69.66 69.66"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} transform transition-transform duration-300 ease-in-out group-hover:translate-x-[2px] group-hover:-translate-y-[2px]`}
    >
      <g
        id="Isolation_Mode"
        data-name="Isolation Mode"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="7"
      >
        <polyline points="67.16 61.84 67.16 2.5 2.5 67.16" />
        <path d="M67.16,2.5H7.81h59.34Z" />
      </g>
    </svg>
  );
};