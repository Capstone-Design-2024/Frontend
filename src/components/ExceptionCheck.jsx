import React from "react";

const ExceptionCheck = ({ text, validity }) => {
  return (
    <div className="mt-2 mx-2 flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke={validity ? "#8B00FF" : "#6B6B6B"}
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m4.5 12.75 6 6 9-13.5"
        />
      </svg>
      <p className="text-sm ml-2 text-gray-500">{text}</p>
    </div>
  );
};

export default ExceptionCheck;
