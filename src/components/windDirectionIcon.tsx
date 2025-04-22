import React from 'react';

const WindArrow = ({ direction }: { direction: number }) => {
  const rotation = direction; // Rotasjon i grader

  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <polygon
        points="50,10 40,40 50,35 60,40"
        fill="black"
        stroke="black"
        strokeWidth="0"
      />
      <line
        x1="50"
        y1="35"
        x2="50"
        y2="90"
        stroke="black"
        strokeWidth="4"
      />
    </svg>
  );
};

export default WindArrow;