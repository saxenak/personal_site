'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import ProjectNav from '@/components/ProjectNav';

interface ModelMedia {
  id: string;
  image: string;
  video?: string;
  alt: string;
}

interface Category {
  id: number;
  title: string;
  coverVideo: string;
  coverImage: string;
  media: ModelMedia[];
}

export default function Modelling() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const modellingProjects = [
    {
      id: 1,
      title: 'Digitals',
      coverVideo: '/videos/modelling-bg.mp4',
      coverImage: '/images/artistry/sculpture-2.jpg',
      media: [
        {
          id: 'digitals-1',
          image: '/images/artistry/sculpture-1.jpg',
          video: '/videos/modelling-bg.mp4',
          alt: 'Digital portfolio shot 1'
        },
        {
          id: 'digitals-2',
          image: '/images/artistry/sculpture-2.jpg',
          video: '/videos/modelling-bg.mp4',
          alt: 'Digital portfolio image 2'
        }
      ]
    },
    {
      id: 2,
      title: 'Publications',
      coverVideo: '/videos/modelling-bg.mp4',
      coverImage: '/images/artistry/sculpture-3.jpg',
      media: [
        {
          id: 'publications-1',
          image: '/images/artistry/sculpture-3.jpg',
          video: '/videos/modelling-bg.mp4',
          alt: 'Magazine publication 1'
        },
        {
          id: 'publications-2',
          image: '/images/artistry/sculpture-1.jpg',
          video: '/videos/modelling-bg.mp4',
          alt: 'Magazine publication 2'
        }
      ]
    },
    {
      id: 3,
      title: 'Editorial',
      coverVideo: '/videos/modelling-bg.mp4',
      coverImage: '/images/artistry/sculpture-2.jpg',
      media: [
        {
          id: 'editorial-1',
          image: '/images/artistry/sculpture-2.jpg',
          video: '/videos/modelling-bg.mp4',
          alt: 'Editorial shoot 1'
        },
        {
          id: 'editorial-2',
          image: '/images/artistry/sculpture-3.jpg',
          video: '/videos/modelling-bg.mp4',
          alt: 'Editorial shoot 2'
        }
      ]
    },
    {
      id: 4,
      title: 'Fitness',
      coverVideo: '/videos/modelling-bg.mp4',
      coverImage: '/images/artistry/sculpture-1.jpg',
      media: [
        {
          id: 'fitness-1',
          image: '/images/artistry/sculpture-1.jpg',
          video: '/videos/modelling-bg.mp4',
          alt: 'Fitness modeling 1'
        },
        {
          id: 'fitness-2',
          image: '/images/artistry/sculpture-2.jpg',
          video: '/videos/modelling-bg.mp4',
          alt: 'Fitness modeling 2'
        }
      ]
    },
    {
      id: 5,
      title: 'Beauty',
      coverVideo: '/videos/modelling-bg.mp4',
      coverImage: '/images/artistry/sculpture-3.jpg',
      media: [
        {
          id: 'beauty-1',
          image: '/images/artistry/sculpture-3.jpg',
          video: '/videos/modelling-bg.mp4',
          alt: 'Beauty shot 1'
        },
        {
          id: 'beauty-2',
          image: '/images/artistry/sculpture-1.jpg',
          video: '/videos/modelling-bg.mp4',
          alt: 'Beauty shot 2'
        }
      ]
    },
    {
      id: 6,
      title: 'E-Commerce',
      coverVideo: '/videos/modelling-bg.mp4',
      coverImage: '/images/artistry/sculpture-2.jpg',
      media: [
        {
          id: 'ecommerce-1',
          image: '/images/artistry/sculpture-2.jpg',
          video: '/videos/modelling-bg.mp4',
          alt: 'E-commerce shoot 1'
        },
        {
          id: 'ecommerce-2',
          image: '/images/artistry/sculpture-3.jpg',
          video: '/videos/modelling-bg.mp4',
          alt: 'E-commerce shoot 2'
        }
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <ProjectNav title="KIRTI SAXENA" onMenuToggle={setIsMenuOpen} />

      {/* Social Media Icons at Navigation Level */}
      <AnimatePresence>
        {!isMenuOpen && (
          <motion.div
            key="social-media"
            className="fixed w-full z-50 top-20 pointer-events-none"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="max-w-7xl mx-auto px-8 flex justify-center">
              <div className="flex flex-col items-center pointer-events-auto">
            <div className="flex items-center gap-8">
              <motion.div
                className="flex flex-col items-center gap-1"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.a
                  href="https://instagram.com/kirti.sxena"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <svg className="w-6 h-6 text-gray-400 group-hover:text-pink-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </motion.a>
                <span className="text-xs text-gray-500">2K</span>
              </motion.div>

              <motion.div
                className="flex flex-col items-center gap-1"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.a
                  href="https://tiktok.com/@kirtisxena"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <svg className="w-6 h-6 text-gray-400 group-hover:text-red-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </motion.a>
                <span className="text-xs text-gray-500">1K</span>
              </motion.div>

              <motion.div
                className="flex flex-col items-center gap-1"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.a
                  href="https://youtube.com/@kirtisxena"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <svg className="w-6 h-6 text-gray-400 group-hover:text-red-500 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </motion.a>
                <span className="text-xs text-gray-500">&gt;1K</span>
              </motion.div>

              <motion.div
                className="flex flex-col items-center gap-1"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.a
                  href="https://x.com/kirtisxena"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <svg className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </motion.a>
                <span className="text-xs text-gray-500">&gt;1K</span>
              </motion.div>

              <motion.div
                className="flex flex-col items-center gap-1"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.a
                  href="https://www.facebook.com/profile.php?id=61569017578092"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <svg className="w-6 h-6 text-gray-400 group-hover:text-blue-600 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </motion.a>
                <span className="text-xs text-gray-500">&gt;1K</span>
              </motion.div>
            </div>

            {/* Engagement Score */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <div className="flex items-center justify-center gap-3">
                <span className="text-xs text-gray-500 uppercase tracking-wider">Engagement Rate</span>
                <span className="text-lg font-medium text-[#FD9635]">40%</span>
              </div>
            </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>

      <div className="pt-24 md:pt-40 px-4 md:px-8 pb-20">
        {!selectedCategory ? (
          // Category Grid View
          <div className="max-w-6xl mx-auto">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center mb-16 mt-16"
            >
              <h1 className="text-5xl font-light mb-6">MODEL</h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                After being scouted on an airplane after wrestling a world championship when I was 16,
                <p> </p>I got signed in Toronto, Canada at age 19. 
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {modellingProjects.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedCategory(category)}
                  onMouseEnter={() => setHoveredVideo(category.id.toString())}
                  onMouseLeave={() => setHoveredVideo(null)}
                >
                  <div className="relative aspect-[3/4] mb-4 overflow-hidden rounded-lg border border-transparent group-hover:border-[#FD9635] group-hover:shadow-lg group-hover:shadow-[#FD9635]/30 transition-all duration-300">
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-300 z-10" />
                    {hoveredVideo === category.id.toString() ? (
                      <video
                        src={category.coverVideo}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <Image
                        src={category.coverImage}
                        alt={category.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                      <div className="text-center">
                        <h3 className="text-2xl font-light mb-2 text-white group-hover:text-gray-200 transition-colors">
                          {category.title}
                        </h3>
                        <span className="text-sm text-gray-300 group-hover:text-gray-400 transition-colors">
                          {category.media.length} Items
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          // Individual Category View
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 flex justify-between items-center">
              <h2 className="text-3xl font-light">MODEL</h2>
              <button
                onClick={() => setSelectedCategory(null)}
                className="flex items-center gap-2 px-4 py-2 text-sm border border-white/30 rounded-lg hover:bg-[#FD9635]/20 hover:border-[#FD9635] hover:text-[#FD9635] transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Portfolio
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {selectedCategory.media.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                  onMouseEnter={() => item.video && setHoveredVideo(item.id)}
                  onMouseLeave={() => setHoveredVideo(null)}
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10" />
                    {item.video && hoveredVideo === item.id ? (
                      <video
                        src={item.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
