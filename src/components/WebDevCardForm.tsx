'use client';

import { useState, useEffect } from 'react';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface WebDevCardFormProps {
  packageName: string;
  packagePrice: string;
  packageColor: string;
  onClose: () => void;
}

function CardForm({ packageName, packagePrice, packageColor, onClose }: WebDevCardFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [form, setForm] = useState({ name: '', email: '', phone: '', businessName: '', sitePurpose: '', referenceSites: '', notes: '' });
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    if (!form.name || !form.email || !form.businessName || !form.sitePurpose) {
      setErrorMsg('Name, email, business name, and site purpose are required.');
      return;
    }

    setStatus('saving');
    setErrorMsg('');

    try {
      // 1. Create Customer + SetupIntent on backend
      const res = await fetch('/api/webdev-setup-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          packageName,
          packagePrice,
          businessName: form.businessName,
          sitePurpose: form.sitePurpose,
          referenceSites: form.referenceSites,
          notes: form.notes,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to initialize');
      }

      const { clientSecret } = await res.json();

      // 2. Confirm card setup with Stripe (no charge)
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) throw new Error('Card element not found');

      const { error } = await stripe.confirmCardSetup(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: form.name,
            email: form.email,
            phone: form.phone || undefined,
          },
        },
      });

      if (error) {
        throw new Error(error.message || 'Card setup failed');
      }

      // 3. Send confirmation emails
      await fetch('/api/webdev-confirm-save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          packageName,
          packagePrice,
          businessName: form.businessName,
          sitePurpose: form.sitePurpose,
          referenceSites: form.referenceSites,
          notes: form.notes,
        }),
      });

      setStatus('success');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
        <div
          className="relative w-full max-w-md rounded-2xl overflow-hidden"
          style={{
            backgroundColor: '#0a0a0a',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: `0 0 80px ${packageColor}26, 0 25px 50px rgba(0, 0, 0, 0.5)`,
          }}
        >
          <div className="h-1" style={{ background: `linear-gradient(90deg, ${packageColor}, ${packageColor}88, ${packageColor})` }} />
          <div className="px-8 py-12 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: `${packageColor}20` }}>
              <svg className="w-8 h-8" style={{ color: packageColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Service Booked!</h3>
            <p className="text-white/60 text-sm mb-6">
              You won&apos;t be charged until your project is complete and approved.
            </p>
            <p className="text-white/40 text-xs mb-6">
              A confirmation email has been sent to <strong className="text-white/70">{form.email}</strong>
            </p>
            <button
              onClick={onClose}
              className="px-8 py-3 rounded-full text-sm font-semibold transition-all hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${packageColor}, ${packageColor}cc)`,
                color: '#fff',
              }}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl"
        style={{
          backgroundColor: '#0a0a0a',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: `0 0 80px ${packageColor}26, 0 25px 50px rgba(0, 0, 0, 0.5)`,
        }}
      >
        <div className="sticky top-0 z-10 h-1" style={{ background: `linear-gradient(90deg, ${packageColor}, ${packageColor}88, ${packageColor})` }} />

        <button
          onClick={onClose}
          className="sticky top-3 float-right mr-5 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/15 transition-colors text-white/40 hover:text-white"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <form onSubmit={handleSubmit} className="px-8 pt-8 pb-8">
          <div className="text-center mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-1">{packageName} Package</p>
            <p className="text-2xl font-black" style={{ color: packageColor }}>{packagePrice}</p>
            <p className="text-xs text-white/40 mt-1">Book your project &mdash; pay after it&apos;s done</p>
          </div>

          <div className="space-y-3 mb-5">
            <input
              type="text"
              placeholder="Full Name *"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
              required
            />
            <input
              type="email"
              placeholder="Email *"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
              required
            />
            <input
              type="tel"
              placeholder="Phone (optional)"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
            />

            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-1" />

            <input
              type="text"
              placeholder="Business / Brand Name *"
              value={form.businessName}
              onChange={(e) => setForm({ ...form, businessName: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
              required
            />
            <textarea
              placeholder="What is the site for? *"
              value={form.sitePurpose}
              onChange={(e) => setForm({ ...form, sitePurpose: e.target.value })}
              rows={2}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors resize-none"
              required
            />
            <input
              type="text"
              placeholder="Any websites you like? (optional)"
              value={form.referenceSites}
              onChange={(e) => setForm({ ...form, referenceSites: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
            />
            <textarea
              placeholder="Additional notes (optional)"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              rows={2}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors resize-none"
            />
          </div>

          <div className="mb-5">
            <label className="block text-xs text-white/40 mb-2 uppercase tracking-wider">Card Details</label>
            <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-3">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '14px',
                      color: '#ffffff',
                      '::placeholder': { color: '#6b7280' },
                    },
                    invalid: { color: '#ef4444' },
                  },
                }}
              />
            </div>
          </div>

          {errorMsg && (
            <p className="text-red-400 text-xs mb-4">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={!stripe || status === 'saving'}
            className="w-full py-3.5 rounded-lg font-semibold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: `linear-gradient(135deg, ${packageColor}, ${packageColor}cc)`,
              color: '#fff',
            }}
          >
            {status === 'saving' ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Booking...
              </span>
            ) : (
              'Book Service'
            )}
          </button>

          <p className="text-center text-[10px] text-white/30 mt-3">
            Your card will not be charged. Payment is collected only after project completion.
          </p>
        </form>
      </div>
    </div>
  );
}

export default function WebDevCardForm(props: WebDevCardFormProps) {
  return (
    <Elements stripe={stripePromise}>
      <CardForm {...props} />
    </Elements>
  );
}
