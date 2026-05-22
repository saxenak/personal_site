'use client';

import { useRef, useEffect } from 'react';

interface AutoplayVideoProps {
  src: string;
  className?: string;
}

export default function AutoplayVideo({ src, className }: AutoplayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Seek to a small offset so the browser renders the first frame as a still
    video.currentTime = 0.1;

    // Try to autoplay — if blocked (battery saver, etc.), the first frame stays visible as a still image
    video.play().catch(() => {});
  }, []);

  return (
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
  );
}
