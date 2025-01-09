// eslint-disable-next-line no-unused-vars
import React from "react";
// import "..";

export default function Preloader() {
  return (
    <div className="preloader">
      <div className="preloader-content">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <circle className="inner-circle" cx="50" cy="50" r="42" />
        <circle className="inner-circle" cx="50" cy="50" r="30" />
        <g className="spinner">
          <circle className="circle" cx="50" cy="50" r="35" />
          <path
            d="M50,25 L50,15"
            stroke="rgba(194, 65, 12, 1)"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </g>
        <g className="food-icon">
          <path
            d="M45,45 L55,55 M45,55 L55,45"
            stroke="rgba(194, 65, 12, 0.8)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle className="accent-dots" cx="38" cy="50" r="2" />
          <circle className="accent-dots" cx="62" cy="50" r="2" />
          <circle className="accent-dots" cx="50" cy="38" r="2" />
          <circle className="accent-dots" cx="50" cy="62" r="2" />
        </g>
      </svg>
      </div>
    </div>
  );
}