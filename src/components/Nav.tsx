'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [portfolioOpen, setPortfolioOpen] = useState(false);

  const serviceItems = [
    { href: '/projects/clinics', label: 'CLINICS & TALKS' },
    { href: '/projects/web-development', label: 'WEB DEVELOPMENT' },
    { href: '/projects/artist', label: 'ARTIST' },
  ];

  const portfolioItems = [
    { href: '/projects/engineering', label: 'ENGINEER' },
    { href: '/projects/athletics', label: 'ATHLETE' },
    { href: '/projects/modelling', label: 'MODEL' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-black/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-6 flex justify-between items-center">
        {/* Clickable Name/Title on Left */}
        <Link href="/" className="text-xl md:text-2xl font-light hover:text-gray-300 transition-colors">
          KIRTI SAXENA
        </Link>

        {/* Menu Button on Right */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-sm hover:text-gray-400 transition-colors"
        >
          MENU
        </button>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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