'use client';

import { useState, useEffect } from 'react';
import ProjectNav from '@/components/ProjectNav';
import ProjectHeader from '@/components/ProjectHeader';
import WebDevCardForm from '@/components/WebDevCardForm';
import AutoplayVideo from '@/components/AutoplayVideo';

export default function WebDevelopment() {
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [inquiryStatus, setInquiryStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [showStarterPopup, setShowStarterPopup] = useState(true);
  const [cardFormPkg, setCardFormPkg] = useState<{ name: string; price: string; color: string } | null>(null);

  useEffect(() => {
    if (showStarterPopup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [showStarterPopup]);

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryForm.name || !inquiryForm.email || !inquiryForm.phone || !inquiryForm.message) {
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

      {/* $300 Starter Popup */}
      {showStarterPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowStarterPopup(false)} />
          <div
            className="relative w-full max-w-lg rounded-2xl overflow-hidden"
            style={{
              backgroundColor: '#0a0a0a',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 0 80px rgba(59, 130, 246, 0.15), 0 0 160px rgba(147, 51, 234, 0.08), 0 25px 50px rgba(0, 0, 0, 0.5)',
            }}
          >
            {/* Gradient accent bar at top */}
            <div className="h-1" style={{ background: 'linear-gradient(90deg, #3B82F6, #8B5CF6, #3B82F6)' }} />

            <button
              onClick={() => setShowStarterPopup(false)}
              className="absolute top-5 right-5 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/15 transition-colors text-white/40 hover:text-white"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="px-8 pt-10 pb-8 text-center">
              {/* Price hero */}
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-4">Starter Package</p>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-3xl font-black text-white/40 line-through">$400</span>
                  <span className="text-sm font-medium" style={{ color: '#3B82F6' }}>$</span>
                  <span className="text-7xl font-black leading-none" style={{ color: '#3B82F6' }}>300</span>
                </div>
                <p className="text-lg font-black text-white/50 mt-3 uppercase tracking-widest">one-time flat rate</p>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

              {/* Features */}
              <div className="space-y-3 mb-8">
                {[
                  { icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z', text: '1-page custom design' },
                  { icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z', text: 'Mobile-friendly & responsive' },
                  { icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15', text: '1 revision included' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 justify-center">
                    <svg className="w-4 h-4 flex-shrink-0" style={{ color: '#3B82F6' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                    </svg>
                    <span className="text-sm text-white/70">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button
                onClick={() => {
                  setShowStarterPopup(false);
                  setCardFormPkg({ name: 'Starter', price: '$300', color: '#3B82F6' });
                }}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #3B82F6 0%, #6366F1 50%, #8B5CF6 100%)',
                  color: '#fff',
                  boxShadow: '0 4px 20px rgba(59, 130, 246, 0.3)',
                }}
              >
                Get Started
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>

              <p className="text-sm font-semibold text-white/60 mt-5">Full payment upfront</p>
            </div>
          </div>
        </div>
      )}

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
                <AutoplayVideo
                  src="/kirtisaxena_web.mp4"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-transparent group-hover:bg-black/10 transition-colors" />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-bold text-white group-hover:text-[#FD9635] transition-colors">kirtisaxena.com</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: 'rgba(253, 150, 53, 0.2)', color: '#FD9635', border: '1px solid rgba(253, 150, 53, 0.4)' }}>Portfolio</span>
                  <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: 'rgba(253, 150, 53, 0.2)', color: '#FD9635', border: '1px solid rgba(253, 150, 53, 0.4)' }}>Checkout</span>
                </div>
                <div className="flex flex-wrap gap-2">
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
                <AutoplayVideo
                  src="/AOC Edit 2 (1).mp4"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-transparent group-hover:bg-black/10 transition-colors" />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-bold text-white group-hover:text-[#FFD700] transition-colors">theakhara.com</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: 'rgba(255, 215, 0, 0.2)', color: '#FFD700', border: '1px solid rgba(255, 215, 0, 0.4)' }}>Business</span>
                  <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: 'rgba(255, 215, 0, 0.2)', color: '#FFD700', border: '1px solid rgba(255, 215, 0, 0.4)' }}>Gym</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/60">Next.js</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/60">Stripe</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/60">Vercel</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/60">Framer Motion</span>
                </div>
              </div>
            </a>

            {/* Project 3 - Ajna Materials */}
            <a
              href="https://www.ajnamarket.com/products"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '2px solid rgba(147, 51, 234, 0.2)',
              }}
            >
              <div className="aspect-video relative overflow-hidden">
                <AutoplayVideo
                  src="/ajnamarket.com.mp4"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-transparent group-hover:bg-black/10 transition-colors" />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-bold text-white group-hover:text-[#9333EA] transition-colors">ajnamarket.com</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: 'rgba(147, 51, 234, 0.2)', color: '#9333EA', border: '1px solid rgba(147, 51, 234, 0.4)' }}>E-Commerce</span>
                  <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: 'rgba(147, 51, 234, 0.2)', color: '#9333EA', border: '1px solid rgba(147, 51, 234, 0.4)' }}>Marketplace</span>
                </div>
                <div className="flex flex-wrap gap-2">
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

          {/* Packages - Cards on mobile, Table on desktop */}
          {/* Mobile cards */}
          <div className="mb-12 md:hidden grid grid-cols-2 gap-3">
            {[
              { name: 'Starter', color: '#3B82F6', price: '$300', oldPrice: '$400', pages: '1', design: 'My Recommendation', seo: '—', contact: 'Button', analytics: '—', booking: '—', revisions: '1', best: 'Simple online presence' },
              { name: 'Essentials', color: '#10B981', price: '$600', pages: 'Up to 3', design: 'Concept Board', seo: 'Basic', contact: 'Email', analytics: '—', booking: '—', revisions: '2', best: 'Local service businesses' },
              { name: 'Growth', color: '#A855F7', price: '$1,000', pages: 'Up to 5', design: '✓', seo: 'Enhanced', contact: 'Lead capture', analytics: '✓', booking: 'Add-on', revisions: '3', best: 'Converting visitors to clients', popular: true },
              { name: 'Custom', color: '#FFD700', price: '$3,000+', pages: 'Unlimited', design: '✓', seo: 'Full', contact: 'Custom', analytics: '✓', booking: '✓', revisions: 'Unlimited', best: 'Full platforms & products' },
            ].map((pkg) => (
              <div
                key={pkg.name}
                className="rounded-xl p-3 relative"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: `1px solid ${pkg.color}33`,
                }}
              >
                {pkg.popular && (
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider" style={{ backgroundColor: `${pkg.color}33`, color: pkg.color, border: `1px solid ${pkg.color}66` }}>Popular</span>
                )}
                <h4 className="text-xs font-black mb-1" style={{ color: pkg.color }}>{pkg.name}</h4>
                <div className="text-lg font-black text-white mb-2">
                  {pkg.oldPrice && <span className="text-sm line-through text-white/40 mr-1">{pkg.oldPrice}</span>}
                  <span style={pkg.oldPrice ? { color: pkg.color } : undefined}>{pkg.price}</span>
                </div>
                <div className="space-y-1 text-[10px] text-white/70">
                  <div className="flex justify-between"><span className="text-white/40">Pages</span><span>{pkg.pages}</span></div>
                  <div className="flex justify-between"><span className="text-white/40">Design</span><span>{pkg.design}</span></div>
                  <div className="flex justify-between"><span className="text-white/40">SEO</span><span>{pkg.seo === '—' ? <span className="text-white/20">—</span> : pkg.seo}</span></div>
                  <div className="flex justify-between"><span className="text-white/40">Contact</span><span>{pkg.contact}</span></div>
                  <div className="flex justify-between"><span className="text-white/40">Analytics</span><span>{pkg.analytics === '—' ? <span className="text-white/20">—</span> : pkg.analytics}</span></div>
                  <div className="flex justify-between"><span className="text-white/40">Booking</span><span>{pkg.booking === '—' ? <span className="text-white/20">—</span> : pkg.booking}</span></div>
                  <div className="flex justify-between"><span className="text-white/40">Revisions</span><span>{pkg.revisions}</span></div>
                </div>
                <p className="mt-2 text-[9px] italic text-center" style={{ color: pkg.color }}>{pkg.best}</p>
                <button
                  onClick={() => setCardFormPkg({ name: pkg.name, price: pkg.price, color: pkg.color })}
                  className="mt-3 w-full py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all hover:scale-[1.03] active:scale-[0.97]"
                  style={{
                    background: `linear-gradient(135deg, ${pkg.color}, ${pkg.color}cc)`,
                    color: '#fff',
                  }}
                >
                  Book Service
                </button>
              </div>
            ))}
          </div>

          {/* Desktop table */}
          <div className="mb-12 rounded-xl overflow-hidden hidden md:block" style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '2px solid rgba(255, 255, 255, 0.1)' }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="sticky left-0 z-10 bg-black text-left py-3 px-4 font-bold text-white/50 text-xs uppercase tracking-wider w-[150px]">Feature</th>
                    <th className="py-3 px-3 text-center">
                      <span className="block text-sm font-black" style={{ color: '#3B82F6' }}>Starter</span>
                      <span className="block text-lg font-black text-white"><span className="line-through text-white/40">$400</span> <span style={{ color: '#3B82F6' }}>$300</span></span>
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
                  <tr>
                    <td className="sticky left-0 z-10 bg-black py-3 px-4"></td>
                    {[
                      { name: 'Starter', price: '$300', color: '#3B82F6' },
                      { name: 'Essentials', price: '$600', color: '#10B981' },
                      { name: 'Growth', price: '$1,000', color: '#A855F7' },
                      { name: 'Custom', price: '$3,000+', color: '#FFD700' },
                    ].map((pkg, j) => (
                      <td key={j} className="py-3 px-3 text-center" style={j === 2 ? { backgroundColor: 'rgba(168, 85, 247, 0.08)' } : undefined}>
                        <button
                          onClick={() => setCardFormPkg(pkg)}
                          className="px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all hover:scale-105 active:scale-95"
                          style={{
                            background: `linear-gradient(135deg, ${pkg.color}, ${pkg.color}cc)`,
                            color: '#fff',
                          }}
                        >
                          Book Service
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Standard Terms */}
          <div
            className="rounded-xl p-6 md:p-8"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '2px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <h3 className="text-2xl font-black text-white mb-6 tracking-wide">STANDARD TERMS</h3>
            <ul className="space-y-3 text-base text-white/70">
              <li className="flex items-start gap-3">
                <span className="text-white/40">&#8226;</span>
                <div>
                  Packages: 50% deposit to begin, 50% upon completion
                  <p className="text-sm text-white/40 mt-1 ml-2">&#8212; Exception: Starter package is full payment upfront</p>
                </div>
              </li>
              <li className="flex items-start gap-3"><span className="text-white/40">&#8226;</span>Timeline depends on content readiness</li>
              <li className="flex items-start gap-3"><span className="text-white/40">&#8226;</span>Client provides branding, copy, and photos unless otherwise discussed</li>
              <li className="flex items-start gap-3">
                <span className="text-white/40">&#8226;</span>
                <div>
                  Revisions are dependant on package size
                  <p className="text-sm text-white/40 mt-1 ml-2">&#8212; For every extra revision or change, additional charges will be relayed</p>
                </div>
              </li>
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
                  placeholder="Phone Number *"
                  value={inquiryForm.phone}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 transition-colors"
                  required
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

      {cardFormPkg && (
        <WebDevCardForm
          packageName={cardFormPkg.name}
          packagePrice={cardFormPkg.price}
          packageColor={cardFormPkg.color}
          onClose={() => setCardFormPkg(null)}
        />
      )}
    </main>
  );
}
