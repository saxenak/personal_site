'use client';

import { useState } from 'react';
import ProjectNav from '@/components/ProjectNav';
import ProjectHeader from '@/components/ProjectHeader';

export default function WebDevelopment() {
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
          subject: 'Web Development Inquiry',
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
      <div className="pt-20 md:pt-32 px-4 md:px-8 max-w-7xl mx-auto">
        <ProjectHeader
          title="Web Development"
          date="Available for Booking"
          category="Websites · Applications · Design"
        />

        {/* Portfolio Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-black text-white mb-3 tracking-wide">RECENT WORK</h2>
          <p className="text-white/70 text-base leading-relaxed max-w-2xl mb-8">
            A selection of websites and digital experiences I&apos;ve designed and built.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Project 1 - This site */}
            <a
              href="/"
              className="group rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '2px solid rgba(253, 150, 53, 0.2)',
              }}
            >
              <div className="aspect-video relative overflow-hidden">
                <iframe
                  src="/"
                  className="w-[200%] h-[200%] origin-top-left scale-50 pointer-events-none"
                  title="kirtisaxena.com preview"
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin"
                />
                <div className="absolute inset-0 bg-transparent group-hover:bg-black/10 transition-colors" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#FD9635] transition-colors">kirtisaxena.com</h3>
                <p className="text-sm text-white/50 mb-3">Portfolio site with Stripe checkout, service packages, and email integration</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: 'rgba(253, 150, 53, 0.2)', color: '#FD9635', border: '1px solid rgba(253, 150, 53, 0.4)' }}>Portfolio</span>
                  <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: 'rgba(253, 150, 53, 0.2)', color: '#FD9635', border: '1px solid rgba(253, 150, 53, 0.4)' }}>Checkout</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/60">Next.js</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/60">Stripe</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/60">Vercel</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/60">Framer Motion</span>
                </div>
              </div>
            </a>

            {/* Project 2 - The Akhara */}
            <a
              href="https://theakhara.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '2px solid rgba(255, 215, 0, 0.2)',
              }}
            >
              <div className="aspect-video relative overflow-hidden">
                <iframe
                  src="https://theakhara.com"
                  className="absolute top-1/2 left-1/2 w-[300%] h-[300%] -translate-x-1/2 -translate-y-1/2 scale-[0.333] pointer-events-none"
                  title="theakhara.com preview"
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin"
                />
                <div className="absolute inset-0 bg-transparent group-hover:bg-black/10 transition-colors" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#FFD700] transition-colors">theakhara.com</h3>
                <p className="text-sm text-white/50 mb-3">Wrestling club site with gym membership signup, Stripe payments, and scheduling</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: 'rgba(255, 215, 0, 0.2)', color: '#FFD700', border: '1px solid rgba(255, 215, 0, 0.4)' }}>Business</span>
                  <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: 'rgba(255, 215, 0, 0.2)', color: '#FFD700', border: '1px solid rgba(255, 215, 0, 0.4)' }}>Checkout</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/60">Next.js</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/60">Stripe</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/60">Vercel</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/60">Framer Motion</span>
                </div>
              </div>
            </a>

            {/* Project 3 - Ajna Materials */}
            <a
              href="https://ajnamaterials.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '2px solid rgba(147, 51, 234, 0.2)',
              }}
            >
              <div className="aspect-video relative overflow-hidden">
                <iframe
                  src="https://ajnamaterials.com"
                  className="w-[200%] h-[200%] origin-top-left scale-50 pointer-events-none"
                  title="ajnamaterials.com preview"
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin"
                />
                <div className="absolute inset-0 bg-transparent group-hover:bg-black/10 transition-colors" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#9333EA] transition-colors">ajnamaterials.com</h3>
                <p className="text-sm text-white/50 mb-3">E-commerce marketplace with product catalog, inventory management, and Stripe checkout</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: 'rgba(147, 51, 234, 0.2)', color: '#9333EA', border: '1px solid rgba(147, 51, 234, 0.4)' }}>E-Commerce</span>
                  <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: 'rgba(147, 51, 234, 0.2)', color: '#9333EA', border: '1px solid rgba(147, 51, 234, 0.4)' }}>Marketplace</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/60">Next.js</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/60">AWS</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/60">Stripe</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/60">Tailwind</span>
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
        </div>

        <div className="mb-16">
          {/* Web Dev Intro */}
          <div className="mb-10">
            <h2 className="text-3xl font-black text-white mb-3 tracking-wide">PACKAGES</h2>
            <p className="text-white/70 text-base leading-relaxed max-w-2xl">
              Custom websites built with modern technologies. From one-pagers to full-scale platforms.
            </p>
          </div>

          {/* Packages Comparison Table */}
          <div className="mb-12 rounded-xl overflow-hidden" style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '2px solid rgba(255, 255, 255, 0.1)' }}>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="sticky left-0 z-10 bg-black text-left py-3 px-4 font-bold text-white/50 text-xs uppercase tracking-wider w-[150px]">Feature</th>
                    <th className="py-3 px-3 text-center">
                      <span className="block text-sm font-black" style={{ color: '#3B82F6' }}>Starter</span>
                      <span className="block text-lg font-black text-white">$300</span>
                    </th>
                    <th className="py-3 px-3 text-center">
                      <span className="block text-sm font-black" style={{ color: '#10B981' }}>Essentials</span>
                      <span className="block text-lg font-black text-white">$600</span>
                    </th>
                    <th className="py-3 px-3 text-center" style={{ backgroundColor: 'rgba(168, 85, 247, 0.08)' }}>
                      <span className="block text-sm font-black" style={{ color: '#A855F7' }}>Growth</span>
                      <span className="block text-lg font-black text-white">$1,000</span>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider" style={{ backgroundColor: 'rgba(168, 85, 247, 0.2)', color: '#A855F7', border: '1px solid rgba(168, 85, 247, 0.4)' }}>Popular</span>
                    </th>
                    <th className="py-3 px-3 text-center">
                      <span className="block text-sm font-black" style={{ color: '#FFD700' }}>Custom</span>
                      <span className="block text-lg font-black text-white">$3,000+</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: 'Pages', values: ['1', 'Up to 3', 'Up to 5', 'Unlimited'] },
                    { feature: 'Custom Design', values: ['My Recommendation', 'Concept Board', 'check', 'check'] },
                    { feature: 'SEO', values: ['—', 'Basic', 'Enhanced', 'Full'] },
                    { feature: 'Contact / Leads', values: ['Button', 'Email', 'Lead capture', 'Custom'] },
                    { feature: 'Analytics (GA4)', values: ['—', '—', 'check', 'check'] },
                    { feature: 'Booking & Payments', values: ['—', '—', 'Add-on', 'check'] },
                    { feature: 'Revisions', values: ['1', '2', '3', 'Unlimited'] },
                  ].map((row, i) => {
                    const colors = ['#3B82F6', '#10B981', '#A855F7', '#FFD700'];
                    return (
                      <tr key={i} className="border-b border-white/[0.06]">
                        <td className="sticky left-0 z-10 bg-black py-2.5 px-4 text-white/60 font-medium text-sm">{row.feature}</td>
                        {row.values.map((val, j) => (
                          <td key={j} className="py-2.5 px-3 text-center text-sm" style={j === 2 ? { backgroundColor: 'rgba(168, 85, 247, 0.08)' } : undefined}>
                            {val === 'check' ? (
                              <span className="text-base" style={{ color: colors[j] }}>&#10003;</span>
                            ) : val === '—' ? (
                              <span className="text-white/20">—</span>
                            ) : (
                              <span className="text-white/80">{val}</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                  <tr className="border-t border-white/15">
                    <td className="sticky left-0 z-10 bg-black py-3 px-4 text-white/60 font-medium text-sm">Best for</td>
                    <td className="py-3 px-3 text-center text-xs italic leading-tight" style={{ color: '#3B82F6' }}>Simple online presence</td>
                    <td className="py-3 px-3 text-center text-xs italic leading-tight" style={{ color: '#10B981' }}>Local service businesses</td>
                    <td className="py-3 px-3 text-center text-xs italic leading-tight" style={{ backgroundColor: 'rgba(168, 85, 247, 0.08)', color: '#A855F7' }}>Converting visitors to clients</td>
                    <td className="py-3 px-3 text-center text-xs italic leading-tight" style={{ color: '#FFD700' }}>Full platforms & products</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Standard Terms */}
          <div
            className="rounded-xl p-4 md:p-5"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '2px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <h3 className="text-xl font-black text-white mb-4 tracking-wide">STANDARD TERMS</h3>
            <ul className="space-y-2 text-xs text-white/70">
              <li className="flex items-start gap-3"><span className="text-white/40">&#8226;</span>50% deposit to begin, 50% upon completion</li>
              <li className="flex items-start gap-3"><span className="text-white/40">&#8226;</span>Timeline depends on content readiness</li>
              <li className="flex items-start gap-3"><span className="text-white/40">&#8226;</span>Client provides branding, copy, and photos unless otherwise discussed</li>
              <li className="flex items-start gap-3"><span className="text-white/40">&#8226;</span>Hosting + domain fees paid separately</li>
            </ul>
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
                className="mt-4 text-blue-400 hover:text-blue-300 text-sm"
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
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 transition-colors"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Your Email *"
                    value={inquiryForm.email}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 transition-colors"
                    required
                  />
                </div>
                <input
                  type="tel"
                  placeholder="Phone Number (optional)"
                  value={inquiryForm.phone}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 transition-colors"
                />
                <textarea
                  placeholder="Your Message *"
                  value={inquiryForm.message}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 transition-colors resize-none"
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
                    background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
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
