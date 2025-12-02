'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface VideoSectionProps {
  src: string;
  poster?: string;
  title?: string;
  className?: string;
}

export default function VideoSection({ src, poster, title, className = '' }: VideoSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsHovering(true);
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsHovering(false);
    }
  };

  return (
    <motion.div 
      className={`relative overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video 
        ref={videoRef}
        className="w-full"
        poster={poster}
        playsInline
        muted
        loop
      >
        <source src={src} type="video/mp4" />
      </video>
      {title && (
        <motion.div 
          className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovering ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-2xl font-light">{title}</h3>
        </motion.div>
      )}
    </motion.div>
  );
}