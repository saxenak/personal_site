'use client';

import { useState } from 'react';
import ProjectNav from '@/components/ProjectNav';
import ProjectHeader from '@/components/ProjectHeader';

export default function Artist() {
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [inquiryStatus, setInquiryStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryForm.name || !inquiryForm.email || !inquiryForm.message) {
      alert('Please fill in all required fields');
      return;
    }

    setInquiryStatus('sending');
    try {
      const res = await fetch('/api/send-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: inquiryForm.name,
          email: inquiryForm.email,
          phone: inquiryForm.phone,
          subject: 'Art Commission Inquiry',
          message: inquiryForm.message,
        }),
      });

      if (res.ok) {
        setInquiryStatus('sent');
        setInquiryForm({ name: '', email: '', phone: '', message: '' });
      } else {
        setInquiryStatus('error');
      }
    } catch {
      setInquiryStatus('error');
    }
  };

  return (
    <main className="min-h-screen bg-black text-white pb-20">
      <ProjectNav title="KIRTI SAXENA" />
      <div className="pt-20 md:pt-32 px-4 md:px-8 max-w-5xl mx-auto">
        <ProjectHeader
          title="Art Commissions"
          date="Available for Booking"
          category="Paintings · Prints · Custom Work"
        />

        <div className="mb-16">
          <div className="mb-10">
            <h2 className="text-3xl font-black text-white mb-3 tracking-wide">ART COMMISSIONS</h2>
            <p className="text-white/70 text-base leading-relaxed max-w-2xl">
              Original paintings, prints, and custom commissions. Each piece is hand-crafted with care and attention to detail.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Custom Portrait */}
            <div
              className="rounded-xl p-6 flex flex-col"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '2px solid rgba(249, 115, 22, 0.3)',
                boxShadow: '0 0 20px rgba(249, 115, 22, 0.1)',
              }}
            >
              <div
                className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 w-fit"
                style={{ backgroundColor: 'rgba(249, 115, 22, 0.2)', color: '#F97316', border: '1px solid rgba(249, 115, 22, 0.4)' }}
              >
                Commission
              </div>
              <h3 className="text-2xl font-black mb-2 tracking-wider" style={{ color: '#F97316' }}>CUSTOM PORTRAIT</h3>
              <p className="text-base tracking-wide mb-3" style={{ color: '#F97316' }}>Personalized · Hand-Painted</p>

              <div
                className="rounded-lg p-4 mb-4"
                style={{ backgroundColor: 'rgba(249, 115, 22, 0.1)', border: '1px solid rgba(249, 115, 22, 0.3)' }}
              >
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3 text-white"><span style={{ color: '#F97316' }}>&#10003;</span><span className="font-medium">Based on your reference photo</span></li>
                  <li className="flex items-start gap-3 text-white"><span style={{ color: '#F97316' }}>&#10003;</span><span className="font-medium">Acrylic or oil on canvas</span></li>
                  <li className="flex items-start gap-3 text-white"><span style={{ color: '#F97316' }}>&#10003;</span><span className="font-medium">Multiple sizes available</span></li>
                  <li className="flex items-start gap-3 text-white"><span style={{ color: '#F97316' }}>&#10003;</span><span className="font-medium">2 rounds of revisions</span></li>
                </ul>
              </div>

              <div className="mt-auto pt-4 border-t border-white/10">
                <p className="text-2xl font-bold mb-3" style={{ color: '#F97316' }}>Starting at $300</p>
                <a
                  href="mailto:kirtisaxena18@gmail.com?subject=Art%20Commission%20-%20Custom%20Portrait"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                  style={{ backgroundColor: 'rgba(249, 115, 22, 0.2)', color: '#F97316', border: '1px solid #F97316' }}
                >
                  Inquire
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </a>
              </div>
            </div>

            {/* Original Painting */}
            <div
              className="rounded-xl p-6 flex flex-col relative"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '3px solid rgba(249, 115, 22, 0.5)',
                boxShadow: '0 0 30px rgba(249, 115, 22, 0.15)',
              }}
            >
              <div className="absolute -top-3 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                style={{ backgroundColor: '#F97316', color: '#000' }}>
                Most Requested
              </div>
              <div
                className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 w-fit"
                style={{ backgroundColor: 'rgba(249, 115, 22, 0.2)', color: '#F97316', border: '1px solid rgba(249, 115, 22, 0.4)' }}
              >
                Original
              </div>
              <h3 className="text-2xl font-black mb-2 tracking-wider" style={{ color: '#F97316' }}>ORIGINAL PAINTING</h3>
              <p className="text-base tracking-wide mb-3" style={{ color: '#F97316' }}>One-of-a-Kind · Canvas</p>

              <div
                className="rounded-lg p-4 mb-4"
                style={{ backgroundColor: 'rgba(249, 115, 22, 0.1)', border: '1px solid rgba(249, 115, 22, 0.3)' }}
              >
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3 text-white"><span style={{ color: '#F97316' }}>&#10003;</span><span className="font-medium">Original concept & composition</span></li>
                  <li className="flex items-start gap-3 text-white"><span style={{ color: '#F97316' }}>&#10003;</span><span className="font-medium">Mixed media or acrylic on canvas</span></li>
                  <li className="flex items-start gap-3 text-white"><span style={{ color: '#F97316' }}>&#10003;</span><span className="font-medium">Signed & ready to hang</span></li>
                  <li className="flex items-start gap-3 text-white"><span style={{ color: '#F97316' }}>&#10003;</span><span className="font-medium">Certificate of authenticity</span></li>
                  <li className="flex items-start gap-3 text-white"><span style={{ color: '#F97316' }}>&#10003;</span><span className="font-medium">Custom sizing available</span></li>
                </ul>
              </div>

              <div className="mt-auto pt-4 border-t border-white/10">
                <p className="text-2xl font-bold mb-3" style={{ color: '#F97316' }}>Starting at $500</p>
                <a
                  href="mailto:kirtisaxena18@gmail.com?subject=Art%20Commission%20-%20Original%20Painting"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                  style={{ backgroundColor: 'rgba(249, 115, 22, 0.2)', color: '#F97316', border: '1px solid #F97316' }}
                >
                  Inquire
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </a>
              </div>
            </div>

            {/* Print */}
            <div
              className="rounded-xl p-6 flex flex-col"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '2px solid rgba(249, 115, 22, 0.3)',
                boxShadow: '0 0 20px rgba(249, 115, 22, 0.1)',
              }}
            >
              <div
                className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 w-fit"
                style={{ backgroundColor: 'rgba(249, 115, 22, 0.2)', color: '#F97316', border: '1px solid rgba(249, 115, 22, 0.4)' }}
              >
                Prints
              </div>
              <h3 className="text-2xl font-black mb-2 tracking-wider" style={{ color: '#F97316' }}>ART PRINTS</h3>
              <p className="text-base tracking-wide mb-3" style={{ color: '#F97316' }}>High Quality · Limited Runs</p>

              <div
                className="rounded-lg p-4 mb-4"
                style={{ backgroundColor: 'rgba(249, 115, 22, 0.1)', border: '1px solid rgba(249, 115, 22, 0.3)' }}
              >
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3 text-white"><span style={{ color: '#F97316' }}>&#10003;</span><span className="font-medium">Giclée prints on archival paper</span></li>
                  <li className="flex items-start gap-3 text-white"><span style={{ color: '#F97316' }}>&#10003;</span><span className="font-medium">Multiple sizes (8×10 to 24×36)</span></li>
                  <li className="flex items-start gap-3 text-white"><span style={{ color: '#F97316' }}>&#10003;</span><span className="font-medium">Signed & numbered</span></li>
                  <li className="flex items-start gap-3 text-white"><span style={{ color: '#F97316' }}>&#10003;</span><span className="font-medium">Ships worldwide</span></li>
                </ul>
              </div>

              <div className="mt-auto pt-4 border-t border-white/10">
                <p className="text-2xl font-bold mb-3" style={{ color: '#F97316' }}>Starting at $50</p>
                <a
                  href="mailto:kirtisaxena18@gmail.com?subject=Art%20Inquiry%20-%20Prints"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                  style={{ backgroundColor: 'rgba(249, 115, 22, 0.2)', color: '#F97316', border: '1px solid #F97316' }}
                >
                  Inquire
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Inquiry Section */}
        <div id="inquiry" className="max-w-2xl mx-auto mt-20 scroll-mt-24">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-12"></div>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Have a Question?</h2>
            <p className="text-sm text-white/60">Send us an inquiry and we&apos;ll get back to you as soon as possible</p>
          </div>

          {inquiryStatus === 'sent' ? (
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-8 text-center">
              <svg className="w-12 h-12 text-green-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
              <p className="text-white/60">We&apos;ll get back to you within 24-48 hours.</p>
              <button
                onClick={() => setInquiryStatus('idle')}
                className="mt-4 text-orange-400 hover:text-orange-300 text-sm"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleInquirySubmit} className="bg-white/5 rounded-xl p-6 border border-white/10">
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Name *"
                    value={inquiryForm.name}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-400 transition-colors"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Your Email *"
                    value={inquiryForm.email}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-400 transition-colors"
                    required
                  />
                </div>
                <input
                  type="tel"
                  placeholder="Phone Number (optional)"
                  value={inquiryForm.phone}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-400 transition-colors"
                />
                <textarea
                  placeholder="Your Message *"
                  value={inquiryForm.message}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-400 transition-colors resize-none"
                  required
                />
                {inquiryStatus === 'error' && (
                  <p className="text-red-400 text-sm">Failed to send message. Please try again.</p>
                )}
                <button
                  type="submit"
                  disabled={inquiryStatus === 'sending'}
                  className="w-full py-4 rounded-lg font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                  style={{
                    background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
                    color: '#fff',
                  }}
                >
                  {inquiryStatus === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
