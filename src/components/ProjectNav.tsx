'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CartIcon from './CartIcon';

export default function ProjectNav({ onMenuToggle }: { title?: string; onMenuToggle?: (isOpen: boolean) => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [portfolioOpen, setPortfolioOpen] = useState(false);

  const serviceItems = [
    { href: '/projects/artist', label: 'ARTIST' },
    { href: '/projects/web-development', label: 'WEB DEVELOPMENT' },
    { href: '/projects/talks', label: 'TALKS' },
    { href: '/projects/clinics', label: 'CLINICS' },
  ];

  const portfolioItems = [
    { href: '/projects/engineering', label: 'ENGINEER' },
    { href: '/projects/athletics', label: 'ATHLETE' },
    { href: '/projects/modelling', label: 'MODEL' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-black/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-6 flex justify-between items-center">
        {/* Clickable Logo on Left */}
        <Link
          href="/"
          className="hover:opacity-80 transition-opacity cursor-pointer"
          onClick={() => {
            // Trigger intro sequence when clicking logo
            localStorage.setItem('showIntro', 'true');
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/KIRTILOGO.PNG"
            alt="Kirti Saxena Logo"
            className="h-16 w-auto object-contain"
          />
        </Link>

        {/* Right side: Cart + Menu */}
        <div className="flex items-center gap-4">
          <CartIcon />
          <button
            onClick={() => {
              const newState = !isMenuOpen;
              setIsMenuOpen(newState);
              onMenuToggle?.(newState);
            }}
            className="text-xl font-light hover:text-gray-400 transition-colors"
          >
            MENU
          </button>
        </div>
      </div>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute top-full left-0 w-full bg-black/90 backdrop-blur-sm border-t border-gray-800"
          >
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  href="/"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onMenuToggle?.(false);
                  }}
                  className="text-center py-4 text-lg font-light hover:text-gray-300 transition-colors"
                >
                  HOME
                </Link>
                <div className="text-center">
                  <button
                    onClick={() => { setServicesOpen(!servicesOpen); setPortfolioOpen(false); }}
                    className="py-4 text-lg font-light hover:text-gray-300 transition-colors"
                  >
                    SERVICES {servicesOpen ? '−' : '+'}
                  </button>
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col gap-2 pb-4">
                          {serviceItems.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => {
                                setIsMenuOpen(false);
                                setServicesOpen(false);
                                onMenuToggle?.(false);
                              }}
                              className="text-sm font-light text-gray-400 hover:text-white transition-colors"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="text-center">
                  <button
                    onClick={() => { setPortfolioOpen(!portfolioOpen); setServicesOpen(false); }}
                    className="py-4 text-lg font-light hover:text-gray-300 transition-colors"
                  >
                    PORTFOLIO {portfolioOpen ? '−' : '+'}
                  </button>
                  <AnimatePresence>
                    {portfolioOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col gap-2 pb-4">
                          {portfolioItems.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => {
                                setIsMenuOpen(false);
                                setPortfolioOpen(false);
                                onMenuToggle?.(false);
                              }}
                              className="text-sm font-light text-gray-400 hover:text-white transition-colors"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}