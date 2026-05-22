'use client';

import { useRef, useEffect, useState } from 'react';

interface AutoplayVideoProps {
  src: string;
  className?: string;
}

export default function AutoplayVideo({ src, className }: AutoplayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showPlayButton, setShowPlayButton] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Try to play — if autoplay is blocked (battery saver, etc.), show a play button
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        setShowPlayButton(true);
      });
    }
  }, []);

  const handleTap = () => {
    const video = videoRef.current;
    if (!video) return;
    video.play().then(() => {
      setShowPlayButton(false);
    }).catch(() => {
      // Still blocked — nothing we can do
    });
  };

  return (
    <>
      <video
        ref={videoRef}
        className={className}
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src={src} type="video/mp4" />
      </video>
      {showPlayButton && (
        <button
          onClick={handleTap}
          className="absolute inset-0 z-10 flex items-center justify-center bg-black/40"
          aria-label="Play video"
        >
          <svg
            className="w-10 h-10 text-white/80 drop-shadow-lg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      )}
    </>
  );
}
