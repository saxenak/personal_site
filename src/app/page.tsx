'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Home() {
  const [showIntro, setShowIntro] = useState(false);
  const introVideoRef = useRef<HTMLVideoElement>(null);

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
          {/* Services - top row */}
          <div className="flex flex-col items-center justify-center py-8 md:py-0 md:h-screen">
            <h2 className="text-xl md:text-3xl lg:text-5xl font-light tracking-wider mb-6 md:mb-10">
              SERVICES
            </h2>
            <div className="grid grid-cols-3 gap-3 md:gap-4 w-full px-4 md:px-8">
              {/* Web Development Card - Live ajnamaterials.com embed */}
              <Link
                href="/projects/web-development"
                className="group/card rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 aspect-square relative"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(253, 150, 53, 0.2)',
                }}
              >
                <div className="absolute inset-0 overflow-hidden">
                  <iframe
                    src="https://ajnamaterials.com"
                    className="absolute top-0 left-0 w-[400%] h-[400%] scale-[0.25] origin-top-left pointer-events-none"
                    title="ajnamaterials.com preview"
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin"
                  />
                </div>
                <div className="absolute inset-0 bg-black/30 group-hover/card:bg-black/10 transition-colors" />
                <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3 text-center bg-gradient-to-t from-black/70 to-transparent">
                  <h3 className="text-[10px] md:text-sm font-bold tracking-wider text-gray-200 group-hover/card:text-[#FD9635] transition-colors">
                    WEB DEVELOPMENT
                  </h3>
                </div>
              </Link>

              {/* Other service cards */}
              {[
                { href: '/projects/clinics', label: 'CLINICS & TALKS', video: '/clinics_landingpage.mp4' },
                { href: '/projects/artist', label: 'ARTIST', video: '/artist_landingpage.mp4' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group/card rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 aspect-square relative"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(253, 150, 53, 0.2)',
                  }}
                >
                  <video
                    className="absolute inset-0 w-full h-full object-cover"
                    muted
                    loop
                    autoPlay
                    playsInline
                  >
                    <source src={item.video} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-black/30 group-hover/card:bg-black/10 transition-colors" />
                  <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3 text-center bg-gradient-to-t from-black/70 to-transparent">
                    <h3 className="text-[10px] md:text-sm font-bold tracking-wider text-gray-200 group-hover/card:text-[#FD9635] transition-colors">
                      {item.label}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Portfolio - bottom row */}
          <div className="flex flex-col items-center justify-center py-8 md:py-0 md:h-screen">
            <h2 className="text-xl md:text-3xl lg:text-5xl font-light tracking-wider mb-6 md:mb-10">
              PORTFOLIO
            </h2>
            <div className="grid grid-cols-3 gap-3 md:gap-4 w-full px-4 md:px-8">
              {[
                { href: '/projects/engineering', label: 'ENGINEER', video: '/engineering_landingpage.mp4' },
                { href: '/projects/athletics', label: 'ATHLETE', video: '/wrestling_landingpage.mp4' },
                { href: '/projects/modelling', label: 'MODEL', video: '/model_landingpage.MP4' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group/card rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 aspect-square relative"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(253, 150, 53, 0.2)',
                  }}
                >
                  <video
                    className="absolute inset-0 w-full h-full object-cover"
                    muted
                    loop
                    autoPlay
                    playsInline
                  >
                    <source src={item.video} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-black/30 group-hover/card:bg-black/10 transition-colors" />
                  <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3 text-center bg-gradient-to-t from-black/70 to-transparent">
                    <h3 className="text-[10px] md:text-sm font-bold tracking-wider text-gray-200 group-hover/card:text-[#FD9635] transition-colors">
                      {item.label}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contact at bottom */}
      <div className="fixed bottom-6 left-0 right-0 z-50 flex items-center justify-center">
        <a
          href="mailto:info@kirtisaxena.com"
          className="flex items-center gap-2 text-sm md:text-base font-light tracking-wider text-gray-400 hover:text-[#FD9635] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
          info@kirtisaxena.com
        </a>
      </div>
    </div>
  );
}