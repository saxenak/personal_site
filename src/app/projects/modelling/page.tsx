'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import ProjectNav from '@/components/ProjectNav';

type Category = 'Fitness' | 'Commercial' | 'Cultural' | 'Beauty' | 'Editorial' | 'Publications' | 'Digitals' | 'Swimsuit' | 'Intimate' | 'Film' | 'Portraits';

interface Credits {
  photographer?: string;
  mua?: string;
  hair?: string;
  stylist?: string;
}

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: Category;
  tags?: Category[];
  height: 'short' | 'medium' | 'tall';
  border?: 'white' | 'black';
  credits?: Credits;
}

const FILTER_TABS = ['All', 'Fitness', 'Commercial', 'Cultural', 'Beauty', 'Editorial', 'Publications', 'Digitals', 'Swimsuit', 'Intimate', 'Film', 'Portraits'] as const;
type FilterTab = (typeof FILTER_TABS)[number];

const heightClasses: Record<GalleryImage['height'], string> = {
  short: 'h-[200px] md:h-[250px]',
  medium: 'h-[280px] md:h-[350px]',
  tall: 'h-[360px] md:h-[450px]',
};

const CATEGORIES: Category[] = ['Digitals', 'Editorial', 'Fitness', 'Commercial', 'Cultural', 'Beauty', 'Publications', 'Swimsuit', 'Intimate', 'Film', 'Portraits'];

const categoryNumbers: Record<Category, string> = {
  Fitness: '01',
  'Commercial': '02',
  Cultural: '03',
  Beauty: '04',
  Editorial: '05',
  Publications: '06',
  Digitals: '07',
  Swimsuit: '08',
  Intimate: '09',
  Film: '10',
  Portraits: '11',
};

const galleryImages: GalleryImage[] = [
  // Digitals
  { id: 'dig-1', src: '/images/modelling/digitals1.jpg', alt: 'Digitals comp', category: 'Digitals', height: 'medium' },
  { id: 'dig-2', src: '/images/modelling/digitals2.jpg', alt: 'Digitals headshot', category: 'Digitals', height: 'tall' },
  { id: 'dig-3', src: '/images/modelling/digitals3.jpg', alt: 'Digitals studio', category: 'Digitals', height: 'medium' },
  { id: 'dig-4', src: '/images/modelling/digitals4.jpg', alt: 'Digitals full body', category: 'Digitals', height: 'tall' },
  { id: 'dig-5', src: '/images/modelling/digitals5.jpg', alt: 'Digitals portrait', category: 'Digitals', height: 'medium' },
  // Editorial
  { id: 'edit-1', src: '/images/modelling/editorial1.jpg', alt: 'Editorial shoot', category: 'Editorial', height: 'tall' },
  { id: 'edit-2', src: '/images/modelling/editorial2.jpg', alt: 'Editorial portrait', category: 'Editorial', height: 'medium' },
  { id: 'edit-3', src: '/images/modelling/editorial3.jpg', alt: 'Editorial concept', category: 'Editorial', height: 'tall' },
  { id: 'edit-4', src: '/images/modelling/editorial4.jpg', alt: 'Editorial styling', category: 'Editorial', height: 'medium' },
  { id: 'edit-5', src: '/images/modelling/editorial5.jpg', alt: 'Editorial outdoor', category: 'Editorial', height: 'tall' },
  { id: 'edit-6', src: '/images/modelling/editorial6.jpg', alt: 'Editorial studio', category: 'Editorial', height: 'medium' },
  { id: 'edit-7', src: '/images/modelling/editorial7.jpg', alt: 'Editorial creative', category: 'Editorial', height: 'tall' },
  { id: 'edit-8', src: '/images/modelling/editorial8.jpg', alt: 'Editorial artistic', category: 'Editorial', height: 'medium' },
  // Beauty
  { id: 'beau-1', src: '/images/modelling/beauty1.jpeg', alt: 'Beauty closeup', category: 'Beauty', height: 'medium' },
  { id: 'beau-2', src: '/images/modelling/beauty2.jpeg', alt: 'Beauty glam', category: 'Beauty', height: 'tall' },
  { id: 'beau-3', src: '/images/modelling/beauty3.jpg', alt: 'Beauty editorial', category: 'Beauty', height: 'medium' },
  // Commercial
  { id: 'comm-1', src: '/images/modelling/commercial1.jpg', alt: 'Commercial shoot', category: 'Commercial', height: 'tall' },
  { id: 'comm-2', src: '/images/modelling/commercial2.jpg', alt: 'Commercial campaign', category: 'Commercial', height: 'medium' },
  // Cultural
  { id: 'cult-1', src: '/images/modelling/cultural1.jpg', alt: 'Cultural shoot', category: 'Cultural', height: 'tall' },
  { id: 'cult-2', src: '/images/modelling/cultural2.jpg', alt: 'Cultural portrait', category: 'Cultural', height: 'medium' },
  { id: 'cult-3', src: '/images/modelling/cultural3.jpg', alt: 'Cultural editorial', category: 'Cultural', height: 'tall' },
  { id: 'cult-4', src: '/images/modelling/cultural4.jpg', alt: 'Cultural creative', category: 'Cultural', height: 'medium' },
  { id: 'cult-5', src: '/images/modelling/cultural5.jpg', alt: 'Cultural artistic', category: 'Cultural', height: 'tall' },
  { id: 'cult-6', src: '/images/modelling/cultural6.jpg', alt: 'Cultural lifestyle', category: 'Cultural', height: 'medium' },
  // Publications
  { id: 'pub-1', src: '/images/modelling/publications1.jpeg', alt: 'Magazine publication', category: 'Publications', height: 'medium' },
  // Swimsuit
  { id: 'swim-1', src: '/images/modelling/swimwear1.jpg', alt: 'Swimsuit shoot', category: 'Swimsuit', height: 'tall' },
  { id: 'swim-2', src: '/images/modelling/swimwear2.jpg', alt: 'Swimsuit editorial', category: 'Swimsuit', height: 'medium' },
  { id: 'swim-3', src: '/images/modelling/swimwear3.jpg', alt: 'Swimsuit campaign', category: 'Swimsuit', height: 'tall' },
  { id: 'swim-4', src: '/images/modelling/swimwear4.jpg', alt: 'Swimsuit lifestyle', category: 'Swimsuit', height: 'medium' },
  // Film
  { id: 'film-1', src: '/images/modelling/film1.jpg', alt: 'Film portrait', category: 'Film', height: 'tall' },
  { id: 'film-2', src: '/images/modelling/film2.jpg', alt: 'Film still', category: 'Film', height: 'medium' },
  { id: 'film-3', src: '/images/modelling/film3.jpg', alt: 'Film scene', category: 'Film', height: 'tall' },
  { id: 'film-4', src: '/images/modelling/film4.jpg', alt: 'Film creative', category: 'Film', height: 'medium' },
  { id: 'film-5', src: '/images/modelling/film5.jpg', alt: 'Film cinematic', category: 'Film', height: 'tall' },
  // Intimate
  { id: 'intm-1', src: '/images/modelling/intimate1.jpg', alt: 'Intimate shoot', category: 'Intimate', height: 'tall' },
  { id: 'intm-2', src: '/images/modelling/intimate2.jpg', alt: 'Intimate portrait', category: 'Intimate', height: 'medium' },
  { id: 'intm-3', src: '/images/modelling/intimate3.jpg', alt: 'Intimate studio', category: 'Intimate', height: 'tall' },
  { id: 'intm-5', src: '/images/modelling/intimate5.jpg', alt: 'Intimate editorial', category: 'Intimate', height: 'tall' },
  { id: 'intm-6', src: '/images/modelling/intimate6.jpg', alt: 'Intimate artistic', category: 'Intimate', height: 'medium' },
  { id: 'intm-7', src: '/images/modelling/intimate7.jpg', alt: 'Intimate lifestyle', category: 'Intimate', height: 'tall' },
  // Portraits
  { id: 'port-1', src: '/images/modelling/portraits1.jpg', alt: 'Portrait shoot', category: 'Portraits', height: 'tall' },
  { id: 'port-2', src: '/images/modelling/portraits2.jpg', alt: 'Portrait studio', category: 'Portraits', height: 'medium' },
  { id: 'port-3', src: '/images/modelling/portraits3.jpg', alt: 'Portrait creative', category: 'Portraits', height: 'tall' },
  { id: 'port-4', src: '/images/modelling/portraits4.jpg', alt: 'Portrait closeup', category: 'Portraits', height: 'medium' },
  { id: 'port-5', src: '/images/modelling/portraits5.jpg', alt: 'Portrait artistic', category: 'Portraits', height: 'tall' },
  { id: 'port-6', src: '/images/modelling/portraits6.jpg', alt: 'Portrait lifestyle', category: 'Portraits', height: 'medium' },
  { id: 'port-7', src: '/images/modelling/portraits7.jpg', alt: 'Portrait natural', category: 'Portraits', height: 'tall' },
  { id: 'port-8', src: '/images/modelling/portraits8.jpg', alt: 'Portrait editorial', category: 'Portraits', height: 'medium' },
];

type GalleryItem =
  | { type: 'header'; category: Category; id: string }
  | { type: 'image'; image: GalleryImage };

function getBorderClass(border?: 'white' | 'black') {
  if (border === 'white') return 'p-2 bg-white';
  if (border === 'black') return 'p-2 bg-black';
  return '';
}

function buildGalleryItems(images: GalleryImage[], filter: FilterTab): GalleryItem[] {
  const items: GalleryItem[] = [];
  const cats = filter === 'All' ? CATEGORIES : [filter as Category];

  for (const cat of cats) {
    const catImages = images.filter(img => img.category === cat);
    if (catImages.length === 0) continue;
    items.push({ type: 'header', category: cat, id: `header-${cat}` });
    for (const img of catImages) {
      items.push({ type: 'image', image: img });
    }
  }
  return items;
}

export default function Modelling() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('All');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);

  const filteredImages = useMemo(() => {
    if (activeFilter === 'All') return galleryImages;
    return galleryImages.filter(img =>
      img.category === activeFilter || (img.tags && img.tags.includes(activeFilter as Category))
    );
  }, [activeFilter]);

  return (
    <main className="min-h-screen bg-black text-white">
      <ProjectNav title="KIRTI SAXENA" onMenuToggle={setIsMenuOpen} />

      {/* Social Media Icons at Navigation Level */}
      <AnimatePresence>
        {!isMenuOpen && (
          <motion.div
            key="social-media"
            className="w-full pt-32"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="max-w-7xl mx-auto px-8 flex justify-center">
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-8">
                  <motion.div className="flex flex-col items-center gap-1" whileHover={{ scale: 1.1, y: -3 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                    <motion.a href="https://instagram.com/kirti.sxena" target="_blank" rel="noopener noreferrer" className="group">
                      <svg className="w-6 h-6 text-gray-400 group-hover:text-pink-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </motion.a>
                    <span className="text-xs text-gray-500">2K</span>
                  </motion.div>
                  <motion.div className="flex flex-col items-center gap-1" whileHover={{ scale: 1.1, y: -3 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                    <motion.a href="https://tiktok.com/@kirtisxena" target="_blank" rel="noopener noreferrer" className="group">
                      <svg className="w-6 h-6 text-gray-400 group-hover:text-red-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                      </svg>
                    </motion.a>
                    <span className="text-xs text-gray-500">1K</span>
                  </motion.div>
                  <motion.div className="flex flex-col items-center gap-1" whileHover={{ scale: 1.1, y: -3 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                    <motion.a href="https://youtube.com/@kirtisxena" target="_blank" rel="noopener noreferrer" className="group">
                      <svg className="w-6 h-6 text-gray-400 group-hover:text-red-500 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </motion.a>
                    <span className="text-xs text-gray-500">&gt;1K</span>
                  </motion.div>
                  <motion.div className="flex flex-col items-center gap-1" whileHover={{ scale: 1.1, y: -3 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                    <motion.a href="https://x.com/kirtisxena" target="_blank" rel="noopener noreferrer" className="group">
                      <svg className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </motion.a>
                    <span className="text-xs text-gray-500">&gt;1K</span>
                  </motion.div>
                  <motion.div className="flex flex-col items-center gap-1" whileHover={{ scale: 1.1, y: -3 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                    <motion.a href="https://www.facebook.com/profile.php?id=61569017578092" target="_blank" rel="noopener noreferrer" className="group">
                      <svg className="w-6 h-6 text-gray-400 group-hover:text-blue-600 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </motion.a>
                    <span className="text-xs text-gray-500">&gt;1K</span>
                  </motion.div>
                </div>

                {/* Engagement Stats */}
                <div className="mt-5 pt-4 border-t border-white/10 flex items-center gap-8">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-base text-gray-300 tracking-wide font-medium">IG @kirti.sxena</span>
                      <span className="text-sm text-gray-500">≈ 2K</span>
                      <span className="text-sm text-[#FD9635] font-semibold">10.5%</span>
                    </div>
                    <span className="text-xs text-gray-500 mt-1">195 avg likes · 15 comments/post</span>
                  </div>
                  <div className="w-px h-8 bg-white/10"></div>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-base text-gray-300 tracking-wide font-medium">TT @kirtisxena</span>
                      <span className="text-sm text-gray-500">≈ 1.2K</span>
                      <span className="text-sm text-[#FD9635] font-semibold">5.5%</span>
                    </div>
                    <span className="text-xs text-gray-500 mt-1">905 avg likes · 6 comments/post</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pt-8 md:pt-12 px-4 md:px-8 pb-20">
        <div className="max-w-7xl mx-auto">

          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-light mb-6">MODEL</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              After being scouted on an airplane after wrestling a world championship when I was 16,
              <br />I got signed in Toronto, Canada at age 19.
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center mb-12"
          >
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
              {FILTER_TABS.map((tab) => (
                <motion.button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={`px-4 py-2 text-sm font-light border transition-all duration-300 ${
                    activeFilter === tab
                      ? 'bg-[#FD9635] border-[#FD9635] text-black'
                      : 'border-white/20 text-gray-400 hover:border-[#FD9635] hover:text-[#FD9635]'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Category Sections */}
          {(activeFilter === 'All' ? CATEGORIES : [activeFilter as Category]).map((cat) => {
            const catImages = galleryImages.filter(img =>
              img.category === cat || (img.tags && img.tags.includes(cat))
            );
            if (catImages.length === 0) return null;
            return (
              <div key={cat} className="mb-8">
                <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
                  {catImages.map((image, index) => (
                    <motion.div
                      key={image.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.05,
                        type: 'spring',
                        stiffness: 200,
                        damping: 25,
                      }}
                      className="break-inside-avoid mb-4"
                    >
                      <div
                        className={`group ${getBorderClass(image.border)} relative cursor-pointer`}
                        onClick={() => setLightboxImage(image)}
                      >
                        <div className="relative w-full overflow-hidden bg-gray-900">
                          <Image
                            src={image.src}
                            alt={image.alt}
                            width={0}
                            height={0}
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            className="w-full h-auto"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-3">
                            <span className="text-[10px] tracking-[0.2em] text-[#FD9635] uppercase font-bold">
                              {[image.category, ...(image.tags || [])].filter((v, i, a) => a.indexOf(v) === i).join(' · ')}
                            </span>
                            {image.credits && (
                              <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-0.5">
                                {image.credits.photographer && (
                                  <span className="text-[9px] text-gray-300">
                                    <span className="text-gray-500">PH</span> {image.credits.photographer}
                                  </span>
                                )}
                                {image.credits.mua && (
                                  <span className="text-[9px] text-gray-300">
                                    <span className="text-gray-500">MUA</span> {image.credits.mua}
                                  </span>
                                )}
                                {image.credits.hair && (
                                  <span className="text-[9px] text-gray-300">
                                    <span className="text-gray-500">HAIR</span> {image.credits.hair}
                                  </span>
                                )}
                                {image.credits.stylist && (
                                  <span className="text-[9px] text-gray-300">
                                    <span className="text-gray-500">STYLE</span> {image.credits.stylist}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}

        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center cursor-pointer"
            onClick={() => setLightboxImage(null)}
          >
            {/* Close button */}
            <button
              className="absolute top-6 right-6 text-white/60 hover:text-white text-3xl font-light z-10 transition-colors"
              onClick={() => setLightboxImage(null)}
            >
              ✕
            </button>

            {/* Category + Credits */}
            <div className="absolute bottom-6 left-6 z-10">
              <span className="text-sm tracking-[0.2em] text-[#FD9635] uppercase font-bold">
                {[lightboxImage.category, ...(lightboxImage.tags || [])].filter((v, i, a) => a.indexOf(v) === i).join(' · ')}
              </span>
              {lightboxImage.credits && (
                <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
                  {lightboxImage.credits.photographer && (
                    <span className="text-xs text-gray-400"><span className="text-gray-600">PH</span> {lightboxImage.credits.photographer}</span>
                  )}
                  {lightboxImage.credits.mua && (
                    <span className="text-xs text-gray-400"><span className="text-gray-600">MUA</span> {lightboxImage.credits.mua}</span>
                  )}
                  {lightboxImage.credits.hair && (
                    <span className="text-xs text-gray-400"><span className="text-gray-600">HAIR</span> {lightboxImage.credits.hair}</span>
                  )}
                  {lightboxImage.credits.stylist && (
                    <span className="text-xs text-gray-400"><span className="text-gray-600">STYLE</span> {lightboxImage.credits.stylist}</span>
                  )}
                </div>
              )}
            </div>

            {/* Image */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, type: 'spring', stiffness: 200, damping: 25 }}
              className="relative max-w-[90vw] max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightboxImage.src}
                alt={lightboxImage.alt}
                width={0}
                height={0}
                sizes="90vw"
                className="w-auto h-auto max-w-[90vw] max-h-[90vh] object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
