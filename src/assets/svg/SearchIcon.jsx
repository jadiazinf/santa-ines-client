import React from 'react';

export const SearchIcon = ({
  size = '17px',
  className = 'cursor-pointer',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 17 17"
    className={className}
  >
    <path
      stroke="#C8C2BE"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M8.146 14.875a6.73 6.73 0 100-13.458 6.73 6.73 0 000 13.458zM15.583 15.583l-1.417-1.416"
    />
  </svg>
);