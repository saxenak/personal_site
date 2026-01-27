'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ProjectNav from '@/components/ProjectNav';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams?.get('session_id');
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    if (sessionId && !emailSent) {
      // Send confirmation email to customer
      fetch('/api/send-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      })
        .catch((err) => console.error('Failed to send confirmation:', err));

      // Send booking notification to clinics@kirtisaxena.com
      fetch('/api/send-clinics-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      })
        .then(() => setEmailSent(true))
        .catch((err) => console.error('Failed to send clinics booking notification:', err));
    }
  }, [sessionId, emailSent]);

  return (
    <main className="min-h-screen bg-black text-white">
      <ProjectNav />

      <div className="pt-32 pb-20 px-4 md:px-8 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">Booking Request Received!</h1>
          <p className="text-xl text-gray-400 mb-8">
            Thank you for your deposit. We&apos;ll confirm your program details within 1–2 business days.
          </p>

          {sessionId && (
            <div className="bg-white/10 border border-white/20 rounded-lg p-4 mb-8 inline-block">
              <p className="text-xs text-gray-400 mb-1">Order ID</p>
              <p className="text-lg font-mono font-bold text-yellow-400">{sessionId.substring(0, 24)}...</p>
            </div>
          )}

          {/* What's Next */}
          <div className="bg-white/5 rounded-xl p-6 mb-8 text-left">
            <h3 className="font-semibold text-lg mb-4 text-center">What&apos;s Next?</h3>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start gap-4">
                <span className="w-8 h-8 bg-yellow-600/20 rounded-full flex items-center justify-center flex-shrink-0 text-yellow-400 font-bold">
                  1
                </span>
                <span>
                  <strong>Pending Review:</strong> I will verify your booking details and reach out within 1–2 business days.
                </span>
              </li>
              <li className="flex items-start gap-4">
                <span className="w-8 h-8 bg-yellow-600/20 rounded-full flex items-center justify-center flex-shrink-0 text-yellow-400 font-bold">
                  2
                </span>
                <span>
                  <strong>Confirmation:</strong> We&apos;ll confirm dates, audience size, location, and any special requirements.
                </span>
              </li>
              <li className="flex items-start gap-4">
                <span className="w-8 h-8 bg-green-600/20 rounded-full flex items-center justify-center flex-shrink-0 text-green-400 font-bold">
                  3
                </span>
                <span>
                  <strong>Booking Confirmed:</strong> Once confirmed, your deposit becomes non-refundable and participants will receive waiver forms.
                </span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="bg-white/5 rounded-lg p-4 mb-8">
            <p className="text-gray-400 text-sm">
              Questions? Reach out at{' '}
              <a
                href="mailto:clinics@kirtisaxena.com"
                className="text-white hover:text-yellow-400 transition-colors"
              >
                clinics@kirtisaxena.com
              </a>
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Back to Home
            </Link>
            <Link
              href="/projects/clinics"
              className="px-8 py-3 border border-white/30 rounded-lg hover:border-white transition-colors font-medium"
            >
              View All Programs
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

export default function ClinicsCheckoutSuccess() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </main>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
