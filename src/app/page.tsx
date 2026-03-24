'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Home() {
  const [showIntro, setShowIntro] = useState(false);
  const [currentVideo, setCurrentVideo] = useState('');
  const [servicesOpen, setServicesOpen] = useState(false);
  const [portfolioOpen, setPortfolioOpen] = useState(false);
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
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-0">
          <div
            className="group h-[50vh] md:h-screen flex flex-col items-center justify-center hover:bg-black/60 hover:shadow-[inset_0_0_80px_rgba(253,150,53,0.15)] transition-all duration-300 cursor-pointer relative"
            onMouseEnter={() => handleVideoHover('/clinics_landingpage.mp4')}
            onMouseLeave={handleVideoLeave}
            onClick={() => { setServicesOpen(!servicesOpen); setPortfolioOpen(false); }}
          >
            <div className="flex items-center gap-2 md:gap-3">
              <h2 className="text-xl md:text-3xl lg:text-5xl font-light tracking-wider group-hover:text-[#FD9635] transition-colors">
                SERVICES
              </h2>
              <svg
                className={`w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 transition-transform duration-300 group-hover:text-[#FD9635] ${servicesOpen ? 'rotate-180' : ''}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            <div
              className={`flex flex-col items-center gap-3 md:gap-4 overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
                servicesOpen ? 'max-h-96 opacity-100 mt-6 md:mt-10' : 'max-h-0 opacity-0 mt-0'
              }`}
            >
              {[
                { href: '/projects/clinics', label: 'CLINICS & TALKS' },
                { href: '/projects/web-development', label: 'WEB DEVELOPMENT' },
                { href: '/projects/artist', label: 'ARTIST' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-base md:text-xl font-light tracking-wider text-gray-300 hover:text-[#FD9635] transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div
            className="group h-[50vh] md:h-screen flex flex-col items-center justify-center hover:bg-black/60 hover:shadow-[inset_0_0_80px_rgba(253,150,53,0.15)] transition-all duration-300 cursor-pointer relative"
            onMouseEnter={() => handleVideoHover('/model_landingpage.MP4')}
            onMouseLeave={handleVideoLeave}
            onClick={() => { setPortfolioOpen(!portfolioOpen); setServicesOpen(false); }}
          >
            <div className="flex items-center gap-2 md:gap-3">
              <h2 className="text-xl md:text-3xl lg:text-5xl font-light tracking-wider group-hover:text-[#FD9635] transition-colors">
                PORTFOLIO
              </h2>
              <svg
                className={`w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 transition-transform duration-300 group-hover:text-[#FD9635] ${portfolioOpen ? 'rotate-180' : ''}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            <div
              className={`flex flex-col items-center gap-3 md:gap-4 overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
                portfolioOpen ? 'max-h-96 opacity-100 mt-6 md:mt-10' : 'max-h-0 opacity-0 mt-0'
              }`}
            >
              {[
                { href: '/projects/engineering', label: 'ENGINEER' },
                { href: '/projects/athletics', label: 'ATHLETE' },
                { href: '/projects/modelling', label: 'MODEL' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-base md:text-xl font-light tracking-wider text-gray-300 hover:text-[#FD9635] transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contact at bottom */}
      <div className="fixed bottom-6 left-0 right-0 z-50 flex items-center justify-center">
        <a
          href="mailto:kirti@kirtisaxena.com"
          className="flex items-center gap-2 text-sm md:text-base font-light tracking-wider text-gray-400 hover:text-[#FD9635] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
          kirti@kirtisaxena.com
        </a>
      </div>
    </div>
  );
}