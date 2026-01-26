'use client';

import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function CartDrawer() {
  const { items, removeItem, getTotal, isCartOpen, setIsCartOpen } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
    }).format(price);
  };

  const clinicItems = items.filter(item => item.type === 'clinic');
  const artItems = items.filter(item => item.type === 'art');

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-black border-l border-white/10 z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-xl font-semibold text-white">Shop</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Build Your Package Card */}
              <div
                className="rounded-xl overflow-hidden"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Build Your Package
                  </h3>
                  <p className="text-white/60 text-sm mb-4">
                    Self Defense, High-Performance Mindset, Wrestling Privates & AI Sustainability talks.
                  </p>

                  {/* Cart items preview */}
                  {clinicItems.length > 0 && (
                    <div className="mb-4 space-y-2">
                      <p className="text-xs text-white/40 uppercase tracking-wider">In Cart ({clinicItems.length})</p>
                      {clinicItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between items-center py-2 border-b border-white/10"
                        >
                          <div className="flex-1">
                            <p className="text-white text-sm">{item.name}</p>
                            <p className="text-white/50 text-xs">{item.tier}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-white">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-1 hover:bg-white/10 rounded transition-colors"
                            >
                              <svg className="w-3 h-3 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <Link
                    href="/projects/clinics/checkout"
                    onClick={() => setIsCartOpen(false)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-white/20 bg-white/10 text-white"
                  >
                    Browse Clinics & Talks
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Art Card */}
              <div
                className="rounded-xl overflow-hidden"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Art Collection
                  </h3>
                  <p className="text-white/60 text-sm mb-4">
                    Original paintings, prints, and custom commissions.
                  </p>

                  {/* Preview images */}
                  <div className="flex gap-2 mb-4">
                    <div
                      className="w-16 h-16 rounded-lg overflow-hidden"
                      style={{ border: '1px solid rgba(255, 255, 255, 0.2)' }}
                    >
                      <img
                        src="/images/artistry/This that splah.png"
                        alt="This that splash"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div
                      className="w-16 h-16 rounded-lg overflow-hidden"
                      style={{ border: '1px solid rgba(255, 255, 255, 0.2)' }}
                    >
                      <img
                        src="/images/artistry/WE THE NORTH.png"
                        alt="We The North"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Cart items preview */}
                  {artItems.length > 0 && (
                    <div className="mb-4 space-y-2">
                      <p className="text-xs text-white/40 uppercase tracking-wider">In Cart ({artItems.length})</p>
                      {artItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between items-center py-2 border-b border-white/10"
                        >
                          <div className="flex-1">
                            <p className="text-white text-sm">{item.name}</p>
                            {item.size && <p className="text-white/50 text-xs">{item.size}</p>}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-white">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-1 hover:bg-white/10 rounded transition-colors"
                            >
                              <svg className="w-3 h-3 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <Link
                    href="/projects/artistry"
                    onClick={() => setIsCartOpen(false)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-white/20 bg-white/10 text-white"
                  >
                    Browse Art
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-white/10">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-white/60">Total</span>
                  <span className="text-xl font-bold text-white">{formatPrice(getTotal())}</span>
                </div>
                <Link
                  href="/projects/clinics/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="block w-full py-3 text-center font-semibold rounded-lg transition-all duration-300 hover:bg-white/90 bg-white text-black"
                >
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
