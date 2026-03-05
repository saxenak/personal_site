'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectNav from '@/components/ProjectNav';
import ProjectHeader from '@/components/ProjectHeader';
import Link from 'next/link';

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' as const },
  transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const },
};

interface PricingTier {
  name: string;
  format: string;
  participants?: string;
  price: string;
  additionalParticipants?: string;
  perPersonCost?: string;
  highlight?: string;
}

interface Program {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  tiers: PricingTier[];
  includes: { focus: React.ReactNode[]; requirements: React.ReactNode[] };
  color: string;
}

const programs: Program[] = [
  {
    id: 'mindset',
    title: 'HIGH-PERFORMANCE MINDSET',
    subtitle: 'Mindset · Discipline · Resilience',
    tagline: 'How to maintain a high performance mindset throughout all aspects of your life.',
    tiers: [
      {
        name: 'Mini Talk',
        format: '1 × 60 minutes',
        participants: '30-60 people',
        price: '$750 flat',
        perPersonCost: 'Single session for smaller groups',
      },
      {
        name: 'Series Talk',
        format: '3 × 60 minutes',
        participants: '30-80 people',
        price: '$1,800 flat',
        perPersonCost: 'Deeper engagement and reinforcement',
        highlight: 'Best value for lasting impact!',
      },
    ],
    includes: {
      focus: [
        <>How to develop a <span style={{ color: '#A855F7' }}>high-performance mindset</span> through lessons from elite sport, engineering, and fashion modelling experiences.</>,
        <>Understanding <span style={{ color: '#A855F7' }}>performance under pressure</span>, including mental strategies for high-stakes situations.</>,
        <>Cultivating <span style={{ color: '#A855F7' }}>confidence and resilience</span> to overcome setbacks, handle failure constructively, and bounce back stronger.</>,
      ],
      requirements: [
        <>Ideal for <span style={{ color: '#A855F7' }}>students, leadership groups, and teams</span> looking to elevate their performance.</>,
        <>Interactive format with <span style={{ color: '#A855F7' }}>Q&A sessions</span> and real personal examples.</>,
        <>Includes <span style={{ color: '#A855F7' }}>actionable takeaways</span> participants can implement immediately.</>,
      ],
    },
    color: '#A855F7',
  },
  {
    id: 'founder',
    title: 'INNOVATE FOR A PURPOSE',
    subtitle: 'Innovation · AI · Sustainability',
    tagline: 'An honest, interactive conversation about building a solution for the United Nations Sustainable Development Goals.',
    tiers: [
      {
        name: 'Mini Talk',
        format: '1 × 60 minutes',
        participants: '30-60 people',
        price: '$750 flat',
        perPersonCost: 'Single session for smaller groups',
      },
      {
        name: 'Series Talk',
        format: '3 × 60 minutes',
        participants: '30-80 people',
        price: '$1,800 flat',
        perPersonCost: 'Deeper engagement and reinforcement',
        highlight: 'Best value for lasting impact!',
      },
    ],
    includes: {
      focus: [
        <>Understanding the <span style={{ color: '#10B981' }}>intersection of AI and sustainability</span> — where technology meets environmental and social impact.</>,
        <>How to identify <span style={{ color: '#10B981' }}>meaningful problems</span> worth solving and validate ideas before building.</>,
        <>Navigating <span style={{ color: '#10B981' }}>self doubt during early stage development</span> while staying true to your mission.</>,
      ],
      requirements: [
        <>For <span style={{ color: '#10B981' }}>aspiring founders, students, and corporate innovation teams</span> interested in building solutions.</>,
        <>Interactive with <span style={{ color: '#10B981' }}>real lessons learned</span> from building start-up&apos;s.</>,
        <>Covers both <span style={{ color: '#10B981' }}>technical and business perspectives</span> on AI-driven sustainability solutions.</>,
      ],
    },
    color: '#10B981',
  },
];

const ProgramCard = ({ program }: { program: Program }) => {
  return (
    <div
      id={program.id}
      className="rounded-xl overflow-hidden"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        border: `2px solid ${program.color}`,
        boxShadow: `0 0 20px ${program.color}30`,
      }}
    >
      {/* Header */}
      <div className="p-6 pb-4">
        <div
          className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3"
          style={{
            backgroundColor: `${program.color}20`,
            color: program.color,
            border: `1px solid ${program.color}60`,
          }}
        >
          Talk
        </div>
        <h3
          className="text-3xl font-black mb-2 tracking-wider uppercase"
          style={{
            color: program.color,
            letterSpacing: '0.1em',
          }}
        >{program.title}</h3>
        <p className="text-base tracking-wide mb-3" style={{ color: program.color }}>
          {program.subtitle}
        </p>
        <p className="text-gray-300 text-base leading-relaxed font-semibold">{program.tagline}</p>
      </div>

      {/* Content */}
      <div className="px-6 pb-6">
        {/* Focus */}
        <div className="mb-4 pb-4 border-b border-white/10">
          <div
            className="rounded-lg p-4 mb-6"
            style={{
              backgroundColor: `${program.color}10`,
              border: `1px solid ${program.color}40`,
              boxShadow: `0 0 20px ${program.color}15`,
            }}
          >
            <h4 className="text-lg font-bold text-white mb-4" style={{ color: program.color }}>Focus</h4>
            <ul className="space-y-3">
              {program.includes.focus.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-white">
                  <span className="mt-0.5 text-lg" style={{ color: program.color }}>&#10004;</span>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Founder photo */}
          {program.id === 'founder' && (
            <div className="my-6 flex gap-4 items-center overflow-hidden">
              <img
                src="/images/clinics/founder-talk.png"
                alt="Innovate for a Purpose Talk"
                className="rounded-lg object-cover w-full flex-shrink-0"
                style={{
                  height: '280px',
                  border: `2px solid ${program.color}40`,
                  boxShadow: `0 0 20px ${program.color}15`,
                }}
              />
            </div>
          )}

          {/* Requirements */}
          <div
            className="rounded-lg p-4"
            style={{
              backgroundColor: `${program.color}10`,
              border: `1px solid ${program.color}40`,
              boxShadow: `0 0 20px ${program.color}15`,
            }}
          >
            <h4 className="text-lg font-bold text-white mb-4" style={{ color: program.color }}>Requirements</h4>
            <ul className="space-y-3">
              {program.includes.requirements.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-white">
                  <span className="mt-0.5 text-lg" style={{ color: program.color }}>&#10004;</span>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pricing Tiers */}
        <div className="grid md:grid-cols-2 gap-4">
          {program.tiers.map((tier, idx) => (
            <div
              key={idx}
              className="rounded-lg p-4"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: `1px solid ${program.color}40`,
              }}
            >
              <h4 className="text-lg font-semibold text-white mb-3">{tier.name}</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/60">Format:</span>
                  <span className="text-gray-300">{tier.format}</span>
                </div>
                {tier.participants && (
                  <div className="flex justify-between">
                    <span className="text-white/60">Audience:</span>
                    <span className="text-gray-300">{tier.participants}</span>
                  </div>
                )}
                <div className="flex justify-between items-center pt-3 border-t border-white/10 mt-3">
                  <span className="text-white/60">Price:</span>
                  <span className="text-xl font-bold" style={{ color: program.color }}>
                    {tier.price}
                  </span>
                </div>
                {tier.perPersonCost && (
                  <div className="text-xs text-white/70 pt-2">{tier.perPersonCost}</div>
                )}
                {tier.highlight && (
                  <div className="text-xs font-medium pt-2" style={{ color: program.color }}>{tier.highlight}</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-6">
          <Link
            href={`/projects/clinics/checkout?program=${program.id}`}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-lg font-medium transition-all duration-300 hover:scale-110 hover:-translate-y-1"
            style={{
              backgroundColor: `${program.color}20`,
              color: program.color,
              border: `1px solid ${program.color}`,
            }}
          >
            Book This Program
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function Talks() {
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
          subject: 'Talks Inquiry',
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
          title="Talks"
          date="Available for Booking"
          category="Speaking · Mindset · Innovation"
        />

        {/* Programs — Talks */}
        <motion.div {...fadeIn} className="mb-16">
          <div className="grid md:grid-cols-2 gap-6">
            <ProgramCard program={programs[0]} />
            <ProgramCard program={programs[1]} />
          </div>
        </motion.div>

        {/* Add-On Note */}
        <motion.div {...fadeIn} className="max-w-3xl mx-auto mb-12 text-center">
          <p className="text-sm text-white/50 italic">
            Travel and facility coordination fees may apply for locations outside the Greater Toronto Area.
          </p>
        </motion.div>

        {/* Inquiry Section */}
        <motion.div {...fadeIn} id="inquiry" className="max-w-2xl mx-auto mt-20 scroll-mt-24">
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
                className="mt-4 text-purple-400 hover:text-purple-300 text-sm"
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
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-colors"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Your Email *"
                    value={inquiryForm.email}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-colors"
                    required
                  />
                </div>
                <input
                  type="tel"
                  placeholder="Phone Number (optional)"
                  value={inquiryForm.phone}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-colors"
                />
                <textarea
                  placeholder="Your Message *"
                  value={inquiryForm.message}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-colors resize-none"
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
                    background: 'linear-gradient(135deg, #A855F7 0%, #7C3AED 100%)',
                    color: '#fff',
                  }}
                >
                  {inquiryStatus === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </main>
  );
}
