'use client';

import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [showIntro, setShowIntro] = useState(false);
  const [currentVideo, setCurrentVideo] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const introVideoRef = useRef<HTMLVideoElement>(null);

  const handleVideoHover = (videoName: string) => {
    setCurrentVideo(videoName);
  };

  const handleVideoLeave = () => {
    setCurrentVideo('');
  };

  useEffect(() => {
    if (currentVideo && videoRef.current) {
      videoRef.current.play();
    } else if (videoRef.current) {
      videoRef.current.pause();
    }
  }, [currentVideo]);

  // Check if intro should be shown
  useEffect(() => {
    const hasSeenIntro = localStorage.getItem('hasSeenIntro');
    const shouldShowIntro = localStorage.getItem('showIntro');

    // DEVELOPMENT MODE: Always show intro (comment out the condition below for production)
    setShowIntro(true);

    // PRODUCTION MODE: Uncomment this for production
    // if (!hasSeenIntro || shouldShowIntro === 'true') {
    //   setShowIntro(true);
    //   localStorage.removeItem('showIntro');
    // }
  }, []);

  // Handle intro video playback with error handling
  useEffect(() => {
    if (showIntro && introVideoRef.current) {
      const playPromise = introVideoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          // Silently handle play interruption - this is expected when component unmounts
          console.log('Video play interrupted:', error.message);
        });
      }
    }
  }, [showIntro]);

  // Auto-transition after intro - extended duration for screen wipe
  useEffect(() => {
    if (showIntro) {
      const timer = setTimeout(() => {
        setShowIntro(false);
        localStorage.setItem('hasSeenIntro', 'true');
      }, 3000); // Extended to 3.0s for longer animation
      return () => clearTimeout(timer);
    }
  }, [showIntro]);

  if (showIntro) {
    return (
      <div className="fixed inset-0 bg-black text-white z-50 overflow-hidden">
        {/* Logo Animation - simple fade effect */}
        <div className="absolute inset-0 flex items-center justify-center"
          style={{
            animation: 'logoFade 3.5s ease-out forwards'
          }}
        >
          <img
            src="/KIRTILOGO.PNG"
            alt="Kirti Saxena Logo"
            className="h-32 md:h-48 lg:h-64 w-auto object-contain"
            style={{
              animation: 'logoReveal 1.5s ease-out forwards'
            }}
          />
        </div>

        {/* Full-screen transitional video */}
        <video
          ref={introVideoRef}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          playsInline
          onEnded={() => {
            setTimeout(() => {
              setShowIntro(false);
              localStorage.setItem('hasSeenIntro', 'true');
            }, 500);
          }}
          style={{
            animationDelay: '1s',
            opacity: 0,
            animation: 'fadeInVideo 0.5s ease-in-out 1s forwards'
          }}
        >
          <source src="/videos/intro-video.mp4" type="video/mp4" />
        </video>

        <style jsx>{`
          @keyframes fadeInVideo {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes logoReveal {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes logoFade {
            0% {
              opacity: 1;
            }
            85% {
              opacity: 1;
            }
            100% {
              opacity: 0;
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div 
      className={`min-h-screen bg-black text-white relative transition-opacity duration-1000 ${
        !showIntro ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Background Video */}
      {currentVideo && (
        <video
          key={currentVideo}
          ref={videoRef}
          className="fixed inset-0 w-full h-full object-cover z-0 opacity-50"
          muted
          loop
          autoPlay
          playsInline
        >
          <source src={currentVideo.startsWith('/') ? currentVideo : `/videos/${currentVideo}`} type="video/mp4" />
        </video>
      )}

      {/* Logo in top-left corner */}
      <div
        className="fixed top-4 left-4 md:top-8 md:left-8 z-50 cursor-pointer hover:opacity-80 transition-opacity"
        onClick={() => setShowIntro(true)}
      >
        <img
          src="/KIRTILOGO.PNG"
          alt="Kirti Saxena Logo"
          className="h-16 md:h-24 w-auto object-contain"
        />
      </div>

      {/* Name in top-right corner - hidden on mobile */}
      <div
        className="fixed top-4 right-4 md:top-8 md:right-8 z-50 cursor-pointer hover:opacity-80 transition-opacity hidden md:block"
        onClick={() => setShowIntro(true)}
      >
        <h1 className="text-sm md:text-base font-bold">KIRTI SAXENA</h1>
      </div>

      {/* Full-width horizontal layout - vertical on mobile, horizontal on desktop */}
      <div className="min-h-screen flex items-center relative z-10">
        <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-0">
          <a
            href="/projects/engineering"
            className="group h-[20vh] md:h-screen flex items-center justify-center hover:bg-black/60 hover:shadow-[inset_0_0_80px_rgba(253,150,53,0.15)] transition-all duration-300"
            onMouseEnter={() => handleVideoHover('/engineering_landingpage.mp4')}
            onMouseLeave={handleVideoLeave}
          >
            <h2 className="text-xl md:text-3xl lg:text-4xl font-light tracking-wider group-hover:text-[#FD9635] transition-colors">
              ENGINEER
            </h2>
          </a>

          <a
            href="/projects/athletics"
            className="group h-[20vh] md:h-screen flex items-center justify-center hover:bg-black/60 hover:shadow-[inset_0_0_80px_rgba(253,150,53,0.15)] transition-all duration-300"
            onMouseEnter={() => handleVideoHover('/wrestling_landingpage.mp4')}
            onMouseLeave={handleVideoLeave}
          >
            <h2 className="text-xl md:text-3xl lg:text-4xl font-light tracking-wider group-hover:text-[#FD9635] transition-colors">
              ATHLETE
            </h2>
          </a>

          <a
            href="/projects/modelling"
            className="group h-[20vh] md:h-screen flex items-center justify-center hover:bg-black/60 hover:shadow-[inset_0_0_80px_rgba(253,150,53,0.15)] transition-all duration-300"
            onMouseEnter={() => handleVideoHover('/model_landingpage.MP4')}
            onMouseLeave={handleVideoLeave}
          >
            <h2 className="text-xl md:text-3xl lg:text-4xl font-light tracking-wider group-hover:text-[#FD9635] transition-colors">
              MODEL
            </h2>
          </a>

          <a
            href="/projects/artistry"
            className="group h-[20vh] md:h-screen flex items-center justify-center hover:bg-black/60 hover:shadow-[inset_0_0_80px_rgba(253,150,53,0.15)] transition-all duration-300"
            onMouseEnter={() => handleVideoHover('/artist_landingpage.mp4')}
            onMouseLeave={handleVideoLeave}
          >
            <h2 className="text-xl md:text-3xl lg:text-4xl font-light tracking-wider group-hover:text-[#FD9635] transition-colors">
              ARTIST
            </h2>
          </a>

          <a
            href="/projects/clinics"
            className="group h-[20vh] md:h-screen flex items-center justify-center hover:bg-black/60 hover:shadow-[inset_0_0_80px_rgba(253,150,53,0.15)] transition-all duration-300"
            onMouseEnter={() => handleVideoHover('/clinics_landingpage.mp4')}
            onMouseLeave={handleVideoLeave}
          >
            <h2 className="text-xl md:text-3xl lg:text-4xl font-light tracking-wider group-hover:text-[#FD9635] transition-colors">
              CLINICS
            </h2>
          </a>
        </div>
      </div>
    </div>
  );
}