'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Success() {
  const [isLoading, setIsLoading] = useState(true);
  const [emailSent, setEmailSent] = useState(false);
  const searchParams = useSearchParams();
  const sessionId = searchParams?.get('session_id');

  useEffect(() => {
    if (sessionId) {
      // Send confirmation email
      fetch('/api/send-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            setEmailSent(true);
          }
        })
        .catch(error => {
          console.error('Email error:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [sessionId]);

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl mx-auto"
      >
        <div className="mb-8">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl font-light mb-4">Payment Successful!</h1>
          <p className="text-xl text-gray-400 mb-8">
            Thank you for your purchase. Your payment has been processed successfully.
          </p>
        </div>

        {isLoading ? (
          <div className="text-gray-400 mb-8">
            <p>Sending confirmation email...</p>
          </div>
        ) : emailSent ? (
          <div className="text-green-400 mb-8">
            <p>✓ Confirmation email sent successfully</p>
          </div>
        ) : (
          <div className="text-yellow-400 mb-8">
            <p>⚠ Email sending failed, but your payment was successful</p>
          </div>
        )}

        <div className="space-y-4">
          <p className="text-gray-300">
            I will contact you within 24 hours to arrange next steps.
          </p>
          <p className="text-sm text-gray-500">
            You should receive a confirmation email shortly. If you don't see it, 
            please check your spam folder or contact me directly.
          </p>
        </div>

        <div className="mt-12 space-x-4">
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-white text-black hover:bg-gray-200 transition-colors rounded"
          >
            Back to Home
          </Link>
          <Link
            href="/projects/artistry"
            className="inline-block px-8 py-3 border border-gray-600 hover:border-gray-400 transition-colors rounded"
          >
            View More Art
          </Link>
        </div>

        {sessionId && (
          <div className="mt-8 text-xs text-gray-600">
            <p>Order ID: {sessionId.substring(0, 20)}...</p>
          </div>
        )}
      </motion.div>
    </main>
  );
}