'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProjectNav({ onMenuToggle }: { title?: string; onMenuToggle?: (isOpen: boolean) => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { href: '/', label: 'HOME' },
    { href: '/projects/athletics', label: 'ATHLETE' },
    { href: '/projects/engineering', label: 'ENGINEER' },
    { href: '/projects/modelling', label: 'MODEL' },
    { href: '/projects/artistry', label: 'ARTIST' },
    { href: '/projects/clinics', label: 'CLINICS' },
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

        {/* Menu Button on Right */}
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
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => {
                      setIsMenuOpen(false);
                      onMenuToggle?.(false);
                    }}
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