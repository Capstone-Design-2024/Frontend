import React from "react";
import "./SuccessAnimation.css";

const SuccessAnimation = () => {
  return (
    <div className="content" style={{ maxWidth: "50px", margin: "0 auto" }}>
      <svg width="100%" height="100%" viewBox="0 0 400 400">
        <circle
          fill="none"
          stroke="#753ee9"
          strokeWidth="25"
          cx="200"
          cy="200"
          r="190"
          strokeLinecap="round"
          transform="rotate(-90 200 200)"
          className="circle"
        />
        <polyline
          fill="none"
          stroke="#753ee9"
          points="88,214 173,284 304,138"
          strokeWidth="25"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="tick"
        />
      </svg>
    </div>
  );
};

export default SuccessAnimation;
