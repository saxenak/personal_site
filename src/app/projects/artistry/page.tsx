'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectHeader from '@/components/ProjectHeader';
import ProjectNav from '@/components/ProjectNav';
import VideoSection from '@/components/VideoSection';
import CheckoutButton from '@/components/CheckoutButton';
import InquiryPopup from '@/components/InquiryPopup';

export default function Artistry() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState<string | undefined>();
  const latestWorks = [
    {
      id: 1,
      title: "Resilient Spirit",
      medium: "Oil on Canvas",
      size: "48\" x 36\"",
      year: "2024",
      description: "A powerful piece exploring themes of perseverance and inner strength through bold brushstrokes and dynamic composition.",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=800&fit=crop",
      processVideo: "/videos/artistry/process-1.mp4"
    },
    {
      id: 2,
      title: "Urban Rhythms",
      medium: "Acrylic Mixed Media",
      size: "60\" x 40\"",
      year: "2024",
      description: "Contemporary cityscape capturing the energy and movement of urban life through layered textures and vibrant colors.",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=800&fit=crop",
      processVideo: "/videos/artistry/process-2.mp4"
    },
    {
      id: 3,
      title: "Confluence",
      medium: "Watercolor on Paper",
      size: "24\" x 18\"",
      year: "2024",
      description: "An exploration of water and movement, representing the flow of life and the meeting of different journeys.",
      image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=600&h=800&fit=crop",
      processVideo: "/videos/artistry/process-3.mp4"
    }
  ];

  const availableWorks = [
    {
      id: 'abstract-blue',
      title: "Abstract Blue",
      medium: "Acrylic on Canvas",
      size: "24\" x 36\"",
      price: 1200,
      year: "2024",
      description: "Original acrylic painting on canvas featuring flowing blue forms and dynamic brushwork.",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
      available: true
    },
    {
      id: 'sunset-series',
      title: "Sunset Series #3",
      medium: "Oil on Canvas",
      size: "18\" x 24\"",
      price: 800,
      year: "2023",
      description: "Part of the sunset series capturing the warm glow and peaceful transition of day to night.",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=600&fit=crop",
      available: true
    },
    {
      id: 'geometric-modern',
      title: "Geometric Modern",
      medium: "Mixed Media on Canvas",
      size: "20\" x 30\"",
      price: 950,
      year: "2024",
      description: "Contemporary geometric composition exploring balance and harmony through clean lines and bold colors.",
      image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=600&fit=crop",
      available: true
    },
    {
      id: 'nature-study',
      title: "Nature Study",
      medium: "Watercolor",
      size: "16\" x 20\"",
      price: 650,
      year: "2024",
      description: "Delicate watercolor study capturing the essence and movement of natural forms.",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
      available: true
    }
  ];

  return (
    <main className="min-h-screen bg-black text-white pb-20">
      <ProjectNav title="KIRTI SAXENA" />
      <div className="pt-20 md:pt-32 px-4 md:px-8 max-w-6xl mx-auto">
        <ProjectHeader
          title="ARTIST"
          date="2024"
          category="Fine Arts"
        />

        {/* Artist Journey Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <div className="text-center mb-16">
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              I started doing canvas paintings during COVID-19, and turned it into a small art business. 
            </p>
          </div>

          <div className="space-y-20">
            {latestWorks.map((work, index) => (
              <motion.div
                key={work.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="relative group">
                    <div className="aspect-[4/3] relative overflow-hidden rounded-lg">
                      <VideoSection
                        src={work.processVideo}
                        poster={work.image}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div className={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-3xl font-light mb-2">{work.title}</h3>
                      <div className="text-gray-400 text-sm">
                        <p>{work.medium} • {work.size} • {work.year}</p>
                      </div>
                    </div>
                    <p className="text-gray-300 leading-relaxed">{work.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Available Works Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-6">Available Works</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              Original paintings and artworks currently available for purchase.
              Each piece comes with a certificate of authenticity and professional packaging.
            </p>

            {/* Purchase Policies */}
            <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-300">
                <div className="text-center">
                  <h4 className="font-medium text-white mb-2">🎨 Certification Included</h4>
                  <p>Certificate of authenticity provided with every original piece</p>
                </div>
                <div className="text-center">
                  <h4 className="font-medium text-red-300 mb-2">⚠️ No Refunds Policy</h4>
                  <p>All sales are final due to the unique nature of original artworks</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {availableWorks.map((work, index) => (
              <motion.div
                key={work.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group flex flex-col h-full"
              >
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <div className="aspect-[3/4] relative">
                    <img
                      src={work.image}
                      alt={work.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {!work.available && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="text-2xl font-light text-red-400">SOLD</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex-1 flex flex-col space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-light">{work.title}</h3>
                    <div className="text-right">
                      {work.available ? (
                        <div>
                          <div className="text-xs text-gray-400 mb-1">Base Price</div>
                          <span className="text-lg font-medium text-green-400">
                            ${work.price.toLocaleString()}
                          </span>
                        </div>
                      ) : (
                        <span className="text-lg font-medium text-red-400">SOLD</span>
                      )}
                    </div>
                  </div>

                  <div className="text-gray-400 text-sm">
                    <p>{work.medium} • {work.size} • {work.year}</p>
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed flex-grow">{work.description}</p>

                  {work.available && (
                    <div className="mt-auto pt-4">
                      <div className="flex gap-3">
                        <CheckoutButton
                          productType="paintings"
                          productId={work.id}
                          price={work.price}
                          className="flex-1 text-center"
                        >
                          Buy Now - ${work.price.toLocaleString()}
                        </CheckoutButton>
                        <button
                          onClick={() => {
                            setSelectedArtwork(work.title);
                            setIsInquiryOpen(true);
                          }}
                          className="px-6 py-3 border border-white/20 rounded hover:border-white/40 transition-colors text-sm"
                        >
                          Inquire
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contact for Commissions */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-24 text-center"
        >
          <div className="border border-gray-800 rounded-lg p-12">
            <h2 className="text-3xl font-light mb-6">Commission Work</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Interested in a custom piece? I accept select commissions for original artworks.
              Let&apos;s discuss your vision and create something unique together.
            </p>
            <button
              onClick={() => {
                setSelectedArtwork('Commission Work');
                setIsInquiryOpen(true);
              }}
              className="px-8 py-3 border border-white/20 rounded hover:border-white/40 transition-colors"
            >
              Contact for Commissions
            </button>
          </div>
        </motion.section>
      </div>

      {/* Inquiry Popup */}
      <InquiryPopup
        isOpen={isInquiryOpen}
        onClose={() => {
          setIsInquiryOpen(false);
          setSelectedArtwork(undefined);
        }}
        artworkTitle={selectedArtwork}
      />
    </main>
  );
}
