'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { href: '/projects/athletics', label: 'ATHLETE' },
    { href: '/projects/engineering', label: 'ENGINEER' },
    { href: '/projects/modelling', label: 'MODEL' },
    { href: '/projects/artistry', label: 'ARTIST' },
    { href: '/projects/clinics', label: 'CLINICS' },
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 w-full bg-black/90 backdrop-blur-sm border-t border-gray-800"
          >
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-6">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-center py-4 text-lg font-light hover:text-gray-300 transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}