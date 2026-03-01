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
      <div className="pt-20 md:pt-32 px-4 md:px-8 max-w-5xl mx-auto">
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
                border: '2px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <div className="aspect-video bg-gradient-to-br from-[#FD9635]/20 to-black/60 flex items-center justify-center overflow-hidden">
                <img src="/KIRTILOGO.PNG" alt="kirtisaxena.com" className="h-16 w-auto object-contain group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#FD9635] transition-colors">kirtisaxena.com</h3>
                <p className="text-sm text-white/50">Personal portfolio &amp; services platform</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/60">Next.js</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/60">Stripe</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/60">Framer Motion</span>
                </div>
              </div>
            </a>

            {/* Project 2 - Placeholder */}
            <div
              className="group rounded-xl overflow-hidden"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '2px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <div className="aspect-video bg-gradient-to-br from-blue-500/10 to-black/60 flex items-center justify-center">
                <span className="text-white/20 text-sm">Coming Soon</span>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-white/40 mb-1">Client Project</h3>
                <p className="text-sm text-white/30">Business website</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-white/30">React</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-white/30">Tailwind</span>
                </div>
              </div>
            </div>

            {/* Project 3 - Placeholder */}
            <div
              className="group rounded-xl overflow-hidden"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '2px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <div className="aspect-video bg-gradient-to-br from-purple-500/10 to-black/60 flex items-center justify-center">
                <span className="text-white/20 text-sm">Coming Soon</span>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-white/40 mb-1">Client Project</h3>
                <p className="text-sm text-white/30">E-commerce platform</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-white/30">Next.js</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-white/30">Stripe</span>
                </div>
              </div>
            </div>
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

          {/* Packages - Side by Side Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">

            {/* 1 - Starter One-Pager */}
            <div
              className="rounded-xl p-6 md:p-8"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '2px solid rgba(59, 130, 246, 0.3)',
                boxShadow: '0 0 20px rgba(59, 130, 246, 0.1)',
              }}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div>
                  <div
                    className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3"
                    style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)', color: '#3B82F6', border: '1px solid rgba(59, 130, 246, 0.4)' }}
                  >
                    Starter
                  </div>
                  <h3 className="text-2xl font-black tracking-wider" style={{ color: '#3B82F6' }}>STARTER ONE-PAGER</h3>
                  <p className="text-gray-300 text-sm mt-2">A clean, professional landing page to get your business online fast.</p>
                </div>
                <p className="text-3xl font-black whitespace-nowrap" style={{ color: '#3B82F6' }}>$200</p>
              </div>

              <div
                className="rounded-lg p-4 mb-4"
                style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)' }}
              >
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3 text-white"><span style={{ color: '#3B82F6' }}>&#10003;</span><span className="font-medium">1-page website (Hero, About, Services, Testimonials, CTA)</span></li>
                  <li className="flex items-start gap-3 text-white"><span style={{ color: '#3B82F6' }}>&#10003;</span><span className="font-medium">Mobile-optimized</span></li>
                  <li className="flex items-start gap-3 text-white"><span style={{ color: '#3B82F6' }}>&#10003;</span><span className="font-medium">Clean layout with basic styling</span></li>
                  <li className="flex items-start gap-3 text-white"><span style={{ color: '#3B82F6' }}>&#10003;</span><span className="font-medium">Contact button (Email / Phone / Instagram)</span></li>
                  <li className="flex items-start gap-3 text-white"><span style={{ color: '#3B82F6' }}>&#10003;</span><span className="font-medium">Domain + hosting setup assistance</span></li>
                  <li className="flex items-start gap-3 text-white"><span style={{ color: '#3B82F6' }}>&#10003;</span><span className="font-medium">1 revision round</span></li>
                </ul>
              </div>

              <p className="text-sm text-white/60 mb-4">Custom visual styling upgrade: <span style={{ color: '#3B82F6' }}>+$100</span> (Total $300)</p>
              <p className="text-xs text-white/40 italic">Best for: Small businesses that just need a strong, simple online presence.</p>
            </div>

            {/* 2 - Essentials */}
            <div
              className="rounded-xl p-6 md:p-8"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '2px solid rgba(16, 185, 129, 0.3)',
                boxShadow: '0 0 20px rgba(16, 185, 129, 0.1)',
              }}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div>
                  <div
                    className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3"
                    style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)', color: '#10B981', border: '1px solid rgba(16, 185, 129, 0.4)' }}
                  >
                    Essentials
                  </div>
                  <h3 className="text-2xl font-black tracking-wider" style={{ color: '#10B981' }}>ESSENTIALS</h3>
                  <p className="text-gray-300 text-sm mt-2">A simple but professional multi-page business website.</p>
                </div>
                <p className="text-3xl font-black whitespace-nowrap" style={{ color: '#10B981' }}>$600</p>
              </div>

              <div
                className="rounded-lg p-4 mb-4"
                style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)' }}
              >
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3 text-white"><span style={{ color: '#10B981' }}>&#10003;</span><span className="font-medium">Up to 3 pages (Home, About, Services, Contact)</span></li>
                  <li className="flex items-start gap-3 text-white"><span style={{ color: '#10B981' }}>&#10003;</span><span className="font-medium">Mobile responsive</span></li>
                  <li className="flex items-start gap-3 text-white"><span style={{ color: '#10B981' }}>&#10003;</span><span className="font-medium">Basic SEO setup (titles + meta descriptions)</span></li>
                  <li className="flex items-start gap-3 text-white"><span style={{ color: '#10B981' }}>&#10003;</span><span className="font-medium">Contact form (email integration)</span></li>
                  <li className="flex items-start gap-3 text-white"><span style={{ color: '#10B981' }}>&#10003;</span><span className="font-medium">Google Maps integration</span></li>
                  <li className="flex items-start gap-3 text-white"><span style={{ color: '#10B981' }}>&#10003;</span><span className="font-medium">2 revision rounds</span></li>
                </ul>
              </div>

              <p className="text-sm text-white/60 mb-4">Custom design version: <span style={{ color: '#10B981' }}>$700</span></p>
              <p className="text-xs text-white/40 italic">Best for: Local service businesses that want credibility and structure.</p>
            </div>

            {/* 3 - Growth */}
            <div
              className="rounded-xl p-6 md:p-8 relative"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '3px solid rgba(168, 85, 247, 0.5)',
                boxShadow: '0 0 30px rgba(168, 85, 247, 0.15)',
              }}
            >
              <div className="absolute -top-3 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                style={{ backgroundColor: '#A855F7', color: '#000' }}>
                Popular
              </div>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div>
                  <div
                    className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3"
                    style={{ backgroundColor: 'rgba(168, 85, 247, 0.2)', color: '#A855F7', border: '1px solid rgba(168, 85, 247, 0.4)' }}
                  >
                    Growth
                  </div>
                  <h3 className="text-2xl font-black tracking-wider" style={{ color: '#A855F7' }}>GROWTH</h3>
                  <p className="text-gray-300 text-sm mt-2">Built for businesses that want real lead generation.</p>
                </div>
                <p className="text-3xl font-black whitespace-nowrap" style={{ color: '#A855F7' }}>$1,000</p>
              </div>

              <div
                className="rounded-lg p-4 mb-4"
                style={{ backgroundColor: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.3)' }}
              >
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3 text-white"><span style={{ color: '#A855F7' }}>&#10003;</span><span className="font-medium">Up to 5 pages</span></li>
                  <li className="flex items-start gap-3 text-white"><span style={{ color: '#A855F7' }}>&#10003;</span><span className="font-medium">Cohesive design system (fonts, spacing, branding consistency)</span></li>
                  <li className="flex items-start gap-3 text-white"><span style={{ color: '#A855F7' }}>&#10003;</span><span className="font-medium">Enhanced SEO setup + image optimization</span></li>
                  <li className="flex items-start gap-3 text-white"><span style={{ color: '#A855F7' }}>&#10003;</span><span className="font-medium">Lead capture form + thank-you page</span></li>
                  <li className="flex items-start gap-3 text-white"><span style={{ color: '#A855F7' }}>&#10003;</span><span className="font-medium">Google Analytics (GA4) setup</span></li>
                  <li className="flex items-start gap-3 text-white"><span style={{ color: '#A855F7' }}>&#10003;</span><span className="font-medium">2 revision rounds</span></li>
                  <li className="flex items-start gap-3 text-white"><span style={{ color: '#A855F7' }}>&#10003;</span><span className="font-medium">Custom branding + design consultation included</span></li>
                </ul>
              </div>

              <p className="text-xs text-white/40 italic">Best for: Businesses ready to convert visitors into clients.</p>
            </div>

            {/* 4 - Pro */}
            <div
              className="rounded-xl p-6 md:p-8"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '2px solid rgba(249, 115, 22, 0.3)',
                boxShadow: '0 0 20px rgba(249, 115, 22, 0.1)',
              }}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div>
                  <div
                    className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3"
                    style={{ backgroundColor: 'rgba(249, 115, 22, 0.2)', color: '#F97316', border: '1px solid rgba(249, 115, 22, 0.4)' }}
                  >
                    Pro
                  </div>
                  <h3 className="text-2xl font-black tracking-wider" style={{ color: '#F97316' }}>PRO</h3>
                  <p className="text-gray-300 text-sm mt-2">For businesses that need bookings, payments, and automation.</p>
                </div>
                <p className="text-3xl font-black whitespace-nowrap" style={{ color: '#F97316' }}>$2,500</p>
              </div>

              <div
                className="rounded-lg p-4 mb-4"
                style={{ backgroundColor: 'rgba(249, 115, 22, 0.1)', border: '1px solid rgba(249, 115, 22, 0.3)' }}
              >
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3 text-white"><span style={{ color: '#F97316' }}>&#10003;</span><span className="font-medium">Up to 8 pages (or 5 pages + advanced features)</span></li>
                  <li className="flex items-start gap-3 text-white"><span style={{ color: '#F97316' }}>&#10003;</span><span className="font-medium">Booking system integration (TidyCal / Calendly)</span></li>
                  <li className="flex items-start gap-3 text-white"><span style={{ color: '#F97316' }}>&#10003;</span><span className="font-medium">Stripe payment setup (including deposits)</span></li>
                  <li className="flex items-start gap-3 text-white"><span style={{ color: '#F97316' }}>&#10003;</span><span className="font-medium">Email list integration (Brevo / Mailchimp)</span></li>
                  <li className="flex items-start gap-3 text-white"><span style={{ color: '#F97316' }}>&#10003;</span><span className="font-medium">Basic automation workflows</span></li>
                  <li className="flex items-start gap-3 text-white"><span style={{ color: '#F97316' }}>&#10003;</span><span className="font-medium">3-4 revision rounds</span></li>
                </ul>
              </div>

              <p className="text-xs text-white/40 italic">Best for: Clinics, coaches, beauty brands, consultants, and event-based businesses.</p>
            </div>

            {/* 5 - Custom / Scale - spans full width */}
            <div
              className="rounded-xl p-6 md:p-8 md:col-span-2"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '2px solid rgba(255, 215, 0, 0.3)',
                boxShadow: '0 0 20px rgba(255, 215, 0, 0.1)',
              }}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div>
                  <div
                    className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3"
                    style={{ backgroundColor: 'rgba(255, 215, 0, 0.2)', color: '#FFD700', border: '1px solid rgba(255, 215, 0, 0.4)' }}
                  >
                    Enterprise
                  </div>
                  <h3 className="text-2xl font-black tracking-wider" style={{ color: '#FFD700' }}>CUSTOM / SCALE</h3>
                  <p className="text-gray-300 text-sm mt-2">For startups and advanced digital platforms.</p>
                </div>
                <p className="text-3xl font-black whitespace-nowrap" style={{ color: '#FFD700' }}>From $4,000</p>
              </div>

              <div
                className="rounded-lg p-4 mb-4"
                style={{ backgroundColor: 'rgba(255, 215, 0, 0.1)', border: '1px solid rgba(255, 215, 0, 0.3)' }}
              >
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3 text-white"><span style={{ color: '#FFD700' }}>&#10003;</span><span className="font-medium">Custom UI/UX design</span></li>
                  <li className="flex items-start gap-3 text-white"><span style={{ color: '#FFD700' }}>&#10003;</span><span className="font-medium">Advanced integrations (portals, dashboards, memberships, multi-vendor)</span></li>
                  <li className="flex items-start gap-3 text-white"><span style={{ color: '#FFD700' }}>&#10003;</span><span className="font-medium">Performance optimization + security hardening</span></li>
                  <li className="flex items-start gap-3 text-white"><span style={{ color: '#FFD700' }}>&#10003;</span><span className="font-medium">Scalable architecture</span></li>
                  <li className="flex items-start gap-3 text-white"><span style={{ color: '#FFD700' }}>&#10003;</span><span className="font-medium">Optional ongoing development roadmap</span></li>
                </ul>
              </div>

              <p className="text-xs text-white/40 italic">Best for: Founders building full platforms or digital products.</p>
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
            <h3 className="text-xl font-black text-white mb-4 tracking-wide">STANDARD TERMS</h3>
            <ul className="space-y-3 text-sm text-white/70">
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
