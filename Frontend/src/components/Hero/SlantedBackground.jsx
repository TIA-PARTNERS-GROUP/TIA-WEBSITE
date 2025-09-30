// SlantedBackground.jsx
import React from "react";

const SlantedBackground = ({
  top = "70%",
  height = "120%",
  width = "150%",
  rotate = -12,
  gradientAngle = 150,
  startColor = "#E0F2FE",
  endColor = "transparent",
  endPercentage = 60,
  className = "",
  zIndex = -10
}) => {
  return (
    <div
      className={`absolute left-0 -z-10 transform origin-top-left ${className}`}
      style={{
        top,
        height,
        width,
        transform: `rotate(${rotate}deg)`,
        zIndex,
        background: `linear-gradient(${gradientAngle}deg, ${startColor} 0%, ${endColor} ${endPercentage}%)`,
      }}
    ></div>
  );
};

export default SlantedBackground;