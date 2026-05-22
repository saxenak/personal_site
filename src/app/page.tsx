'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import AutoplayVideo from '@/components/AutoplayVideo';

export default function Home() {
  const contentRef = useRef<HTMLDivElement>(null);

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-black text-white">
      {/* ===== FULL-SCREEN HERO SECTION ===== */}
      <section className="relative h-screen w-full overflow-hidden flex flex-col">
        {/* B&W hero background - collage pieces laying down */}
        <div className="absolute inset-0 z-0">
          {[
            // 4x3 grid = 12 smaller pieces, scattered random order
            { clip: 'polygon(50% 33%, 75% 33%, 75% 66%, 50% 66%)', rotate: 1.5, delay: 0 },
            { clip: 'polygon(0% 0%, 25% 0%, 25% 33%, 0% 33%)', rotate: -2, delay: 0.18 },
            { clip: 'polygon(75% 66%, 100% 66%, 100% 100%, 75% 100%)', rotate: -2, delay: 0.32 },
            { clip: 'polygon(25% 33%, 50% 33%, 50% 66%, 25% 66%)', rotate: -2.5, delay: 0.48 },
            { clip: 'polygon(75% 0%, 100% 0%, 100% 33%, 75% 33%)', rotate: 2, delay: 0.6 },
            { clip: 'polygon(0% 66%, 25% 66%, 25% 100%, 0% 100%)', rotate: 2, delay: 0.75 },
            { clip: 'polygon(50% 0%, 75% 0%, 75% 33%, 50% 33%)', rotate: -1, delay: 0.9 },
            { clip: 'polygon(25% 66%, 50% 66%, 50% 100%, 25% 100%)', rotate: -1.5, delay: 1.05 },
            { clip: 'polygon(75% 33%, 100% 33%, 100% 66%, 75% 66%)', rotate: -1, delay: 1.18 },
            { clip: 'polygon(25% 0%, 50% 0%, 50% 33%, 25% 33%)', rotate: 1.5, delay: 1.32 },
            { clip: 'polygon(0% 33%, 25% 33%, 25% 66%, 0% 66%)', rotate: 1, delay: 1.48 },
            { clip: 'polygon(50% 66%, 75% 66%, 75% 100%, 50% 100%)', rotate: 1, delay: 1.65 },
          ].map((piece, i) => (
            <motion.div
              key={i}
              className="absolute inset-0"
              style={{ clipPath: piece.clip }}
              initial={{ opacity: 0, scale: 1.1, rotate: piece.rotate, y: -30 }}
              animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
              transition={{
                duration: 0.8,
                delay: piece.delay,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <img
                src="/hero.png"
                alt=""
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
          {/* Dark overlay for text readability */}
          <motion.div
            className="absolute inset-0 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 2.5 }}
          />
        </div>

        {/* Logo top-left */}
        <div className="absolute top-4 left-4 md:top-8 md:left-8 z-10">
          <img
            src="/KIRTILOGO.PNG"
            alt="Kirti Saxena Logo"
            className="h-16 md:h-24 w-auto object-contain"
          />
        </div>

        {/* Name top-right - hidden on mobile */}
        <div className="absolute top-4 right-4 md:top-8 md:right-8 z-10 hidden md:block">
          <h1 className="text-sm md:text-base font-bold">KIRTI SAXENA</h1>
        </div>

        {/* "create your own odds" centered - fades in after collage lands */}
        <motion.div
          className="flex-1 flex items-center justify-center z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: 'easeOut', delay: 2.8 }}
        >
          <img
            src="/writing.png"
            alt="create your own odds"
            className="w-[80vw] md:w-[50vw] max-w-[700px] h-auto"
          />
        </motion.div>

        {/* Scroll-down indicator */}
        <div
          className="absolute bottom-20 md:bottom-10 left-1/2 -translate-x-1/2 z-10 cursor-pointer flex flex-col items-center gap-2 md:gap-3"
          onClick={scrollToContent}
        >
          <span className="text-xs md:text-base font-semibold tracking-[0.2em] text-yellow-200 uppercase">
            Scroll for more
          </span>
          <div className="scroll-chevron">
            <svg
              className="w-8 h-8 md:w-12 md:h-12 text-yellow-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        <style jsx>{`
          .scroll-chevron {
            animation: bounceDown 2s ease-in-out infinite;
          }
          @keyframes bounceDown {
            0%, 100% { transform: translateY(0); opacity: 1; }
            50% { transform: translateY(8px); opacity: 0.5; }
          }
        `}</style>
      </section>

      {/* ===== MAIN CONTENT (SERVICES + PORTFOLIO) ===== */}
      <div ref={contentRef} className="relative z-10">
        {/* Fixed header elements that appear over content */}
        <div className="sticky top-0 z-50 pointer-events-none">
          <div className="absolute top-4 left-4 md:top-8 md:left-8 pointer-events-auto cursor-pointer hover:opacity-80 transition-opacity">
            <img
              src="/KIRTILOGO.PNG"
              alt="Kirti Saxena Logo"
              className="h-16 md:h-24 w-auto object-contain"
            />
          </div>
          <div className="absolute top-4 right-4 md:top-8 md:right-8 pointer-events-auto cursor-pointer hover:opacity-80 transition-opacity hidden md:block">
            <h1 className="text-sm md:text-base font-bold">KIRTI SAXENA</h1>
          </div>
        </div>

        {/* Staircase layout - cards staggered from top-left to bottom-right */}
        <div className="min-h-screen flex items-center relative py-8 md:py-0">

          {/* Mobile: 2-column grid layout */}
          <div className="w-full px-6 md:hidden">
            {/* SERVICES label */}
            <p className="text-[10px] font-bold tracking-[0.3em] text-white/30 uppercase mb-3 text-center">Services</p>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { href: '/projects/artist', mobileLabel: 'ARTIST', src: '/artist_landingpage.mp4' },
                { href: '/projects/clinics', mobileLabel: 'CLINICS', src: '/clinics_landingpage.mp4' },
                { href: '/projects/web-development', mobileLabel: 'WEB DEV', src: '/ajnamarket.com.mp4' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group/card rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.05] relative block aspect-square"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(253, 150, 53, 0.2)',
                  }}
                >
                  <AutoplayVideo
                    src={item.src}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover/card:bg-black/10 transition-colors" />
                  <div className="absolute bottom-0 left-0 right-0 p-1.5 text-center bg-gradient-to-t from-black/70 to-transparent">
                    <h3 className="text-[8px] font-bold tracking-wider text-gray-200 group-hover/card:text-[#FD9635] transition-colors">
                      {item.mobileLabel}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
            {/* PORTFOLIO label */}
            <p className="text-[10px] font-bold tracking-[0.3em] text-white/30 uppercase mb-3 text-center">Portfolio</p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { href: '/projects/engineering', mobileLabel: 'ENGINEER', src: '/engineering_landingpage.mp4' },
                { href: '/projects/athletics', mobileLabel: 'ATHLETE', src: '/wrestling_landingpage.mp4' },
                { href: '/projects/modelling', mobileLabel: 'MODEL', src: '/model_landingpage.MP4' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group/card rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.05] relative block aspect-square"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(253, 150, 53, 0.2)',
                  }}
                >
                  <AutoplayVideo
                    src={item.src}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover/card:bg-black/10 transition-colors" />
                  <div className="absolute bottom-0 left-0 right-0 p-1.5 text-center bg-gradient-to-t from-black/70 to-transparent">
                    <h3 className="text-[8px] font-bold tracking-wider text-gray-200 group-hover/card:text-[#FD9635] transition-colors">
                      {item.mobileLabel}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop: 3x2 grid layout */}
          <div className="w-full max-w-3xl mx-auto px-12 hidden md:block">
            <p className="text-xs font-bold tracking-[0.3em] text-white/30 uppercase mb-4 text-center">Services</p>
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { href: '/projects/artist', label: 'ARTIST', src: '/artist_landingpage.mp4' },
                { href: '/projects/clinics', label: 'CLINICS & TALKS', src: '/clinics_landingpage.mp4' },
                { href: '/projects/web-development', label: 'WEB DEVELOPMENT', src: '/ajnamarket.com.mp4' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group/card rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.05] hover:-translate-y-1 relative block aspect-square"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(253, 150, 53, 0.2)',
                  }}
                >
                  <AutoplayVideo
                    src={item.src}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover/card:bg-black/10 transition-colors" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-center bg-gradient-to-t from-black/70 to-transparent">
                    <h3 className="text-sm font-bold tracking-wider text-gray-200 group-hover/card:text-[#FD9635] transition-colors">
                      {item.label}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
            <p className="text-xs font-bold tracking-[0.3em] text-white/30 uppercase mb-4 text-center">Portfolio</p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { href: '/projects/engineering', label: 'ENGINEER', src: '/engineering_landingpage.mp4' },
                { href: '/projects/athletics', label: 'ATHLETE', src: '/wrestling_landingpage.mp4' },
                { href: '/projects/modelling', label: 'MODEL', src: '/model_landingpage.MP4' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group/card rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.05] hover:-translate-y-1 relative block aspect-square"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(253, 150, 53, 0.2)',
                  }}
                >
                  <AutoplayVideo
                    src={item.src}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover/card:bg-black/10 transition-colors" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-center bg-gradient-to-t from-black/70 to-transparent">
                    <h3 className="text-sm font-bold tracking-wider text-gray-200 group-hover/card:text-[#FD9635] transition-colors">
                      {item.label}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Contact at bottom of content */}
        <div className="py-8 flex items-center justify-center">
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
    </div>
  );
}
