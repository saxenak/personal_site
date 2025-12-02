'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface InquiryPopupProps {
  isOpen: boolean;
  onClose: () => void;
  artworkTitle?: string;
}

export default function InquiryPopup({ isOpen, onClose, artworkTitle }: InquiryPopupProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: artworkTitle ? `Inquiry about "${artworkTitle}"` : 'General Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          onClose();
          setIsSubmitted(false);
          setFormData({
            name: '',
            email: '',
            phone: '',
            subject: artworkTitle ? `Inquiry about "${artworkTitle}"` : 'General Inquiry',
            message: ''
          });
        }, 2000);
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      alert('Failed to send message. Please try again.');
    }

    setIsSubmitting(false);
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-gray-200 rounded-lg p-8 max-w-md w-full max-h-[90vh] overflow-y-auto border border-gray-300"
            onClick={(e) => e.stopPropagation()}
          >
            {!isSubmitted ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-light text-gray-800">Send Inquiry</h2>
                  <button
                    onClick={onClose}
                    className="text-gray-600 hover:text-gray-800 transition-colors text-2xl"
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:border-gray-500 focus:outline-none text-gray-800"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:border-gray-500 focus:outline-none text-gray-800"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:border-gray-500 focus:outline-none text-gray-800"
                      placeholder="Your phone number (optional)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Subject</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:border-gray-500 focus:outline-none text-gray-800"
                      placeholder="What is this regarding?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Message *</label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      rows={4}
                      className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:border-gray-500 focus:outline-none text-gray-800 resize-none"
                      placeholder="Please share your question or inquiry..."
                    />
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 px-6 py-3 border border-gray-400 rounded-lg hover:border-gray-600 transition-colors text-gray-700"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="text-green-600 text-5xl mb-4">✓</div>
                <h3 className="text-xl font-light mb-2 text-gray-800">Message Sent!</h3>
                <p className="text-gray-600">Thank you for your inquiry. I'll get back to you soon.</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}