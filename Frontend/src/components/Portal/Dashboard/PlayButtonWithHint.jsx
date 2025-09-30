import React, { useState } from "react";
import PlayIcon from "../../Icons/PlayIcon";

export default function PlayButtonWithHint() {
  const [showHint, setShowHint] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShowHint(true)}
      onMouseLeave={() => setShowHint(false)}
    >
      {/* Play button */}
      <button
        type="button"
        className="p-2 rounded-full bg-white shadow hover:shadow-lg transition"
        onClick={() => {
          // TODO: Video playback logic will be added here later.
          console.log("Play video");
        }}
      >
        <PlayIcon fillColor="#4F46E5" width={24} height={24} />
      </button>

      {/* Floating Tooltip Window */}
      {showHint && (
        <div className="absolute z-50 top-full mt-2 left-1/2 -translate-x-1/2 w-64
                        bg-gray-800 text-white text-sm rounded-lg shadow-lg p-3">
          🎥 Not sure where to start? Click me to watch the video! 🚀
        </div>
      )}
    </div>
  );
}
