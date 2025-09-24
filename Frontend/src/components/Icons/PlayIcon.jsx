import React from "react";

export default function PlayIcon({ fillColor = "#000000", width = 24, height = 24, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={fillColor}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* 外圆 */}
      <circle cx="12" cy="12" r="10" />
      {/* 三角形（播放箭头） */}
      <polygon points="10 8 16 12 10 16 10 8" fill={fillColor} />
    </svg>
  );
}
