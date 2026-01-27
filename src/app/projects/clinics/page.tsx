'use client';

import { useState } from 'react';
import ProjectNav from '@/components/ProjectNav';
import ProjectHeader from '@/components/ProjectHeader';
import Link from 'next/link';

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
  description?: string;
  tiers: PricingTier[];
  includes: string[] | { focus: React.ReactNode[]; requirements: React.ReactNode[] };
  idealFor?: string;
  color: string;
}

const programs: Program[] = [
  {
    id: 'self-defense',
    title: 'SELF DEFENSE CLINIC',
    subtitle: 'Educational · Practical · Empowering',
    tagline: 'Group-based, hands-on training rooted in wrestling, jiu jitsu and boxing fundamentals. Designed purely for self-defense in practical situations.',
    tiers: [
      {
        name: 'Mini Clinic',
        format: '1 × 3 hours (3 hours total)',
        participants: 'Minimum of 16 -- Maximum of 30 people',
        price: '$40/hour per person',
        perPersonCost: '$120 total per person for 3 Hours',
      },
      {
        name: 'Series Clinic',
        format: '3 × 2 hours (6 hours total)',
        participants: 'Minimum of 16 -- Maximum of 30 people',
        price: '$20/hour per person',
        perPersonCost: '$120 total per person for 6 Hours',
        highlight: 'Same price, +3 hours of training!',
      },
    ],
    includes: {
      focus: [
        <>Prioritizing <span style={{ color: '#FFD700' }}>personal safety</span> in real-world situations, emphasizing prevention, control, and minimizing harm to oneself and others.</>,
        <>Fundamentals of <span style={{ color: '#FFD700' }}>situational awareness</span>, including <span style={{ color: '#FFD700' }}>defensive movement, takedown defense, escapes, and safe, controlled grappling techniques</span> commonly encountered in everyday scenarios.</>,
        <>Introduction to the <span style={{ color: '#FFD700' }}>legal and ethical </span> consideration surrounding personal safety and <span style={{ color: '#FFD700' }}>self-defense</span>.</>,
        <>Learning <span style={{ color: '#FFD700' }}>appropriate response strategies</span>, including de-escalation techniques and recognizing behavioral and environmental risk indicators.</>,
      ],
      requirements: [
        <>Suitable for <span style={{ color: '#FFD700' }}>all experience levels</span>, no prior training required.</>,
        <>Designed for groups with <span style={{ color: '#FFD700' }}>grappling mats</span> or ability to travel to club facility.</>,
        <>Pricing includes <span style={{ color: '#FFD700' }}>planning, instruction, delivery and transportation</span>.</>,
        <>Optional <span style={{ color: '#FFD700' }}>take-home resource materials</span> for continued learning.</>,
      ],
    },
    color: '#FFD700',
  },
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
        price: '$500 flat',
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
    id: 'privates',
    title: 'WRESTLING PRIVATE TRAINING',
    subtitle: 'Technical · Personalized · Results-Driven',
    tagline: 'One-on-one technical development tailored to your goals.',
    tiers: [
      {
        name: 'Mini Private',
        format: '1 session (60 minutes)',
        price: '$100/athlete/hour',
        perPersonCost: '$100 total for 1 Hour',
      },
      {
        name: 'Series Private',
        format: '6 sessions x 60 minutes (6 hours total)',
        price: '$75/athlete/hour',
        perPersonCost: '$450 total for 6 Hours ',
        highlight: 'Save a total of $150 with the series package!',
      },
    ],
    includes: {
      focus: [
        <>Personalized <span style={{ color: '#F97316' }}>technical instruction</span> based on your current skill level and competitive goals.</>,
        <>Deep dive into <span style={{ color: '#F97316' }}>offensive and defensive techniques</span>, including takedowns, escapes, pins, and chain wrestling.</>,
        <>Video analysis and <span style={{ color: '#F97316' }}>match breakdown</span> to identify areas for improvement and develop game plans.</>,
        <>Mental preparation and <span style={{ color: '#F97316' }}>competition strategy</span> tailored to your wrestling style and upcoming opponents.</>,
      ],
      requirements: [
        <>Available for <span style={{ color: '#F97316' }}>all experience levels</span>, from beginners to elite competitors.</>,
        <>One-on-one or <span style={{ color: '#F97316' }}>a max of 4 people within group sessions</span> (price adjusted per athlete).</>,
        <>Sessions held at <span style={{ color: '#F97316' }}>club facility</span> or your training location with mats if within the greater toronto area.</>,
        <>Flexible scheduling to <span style={{ color: '#F97316' }}>fit your training calendar</span> and competition timeline.</>,
      ],
    },
    color: '#F97316',
  },
  {
    id: 'founder',
    title: 'INNOVATE FOR A PURPOSE',
    subtitle: 'Innovation · AI · Sustainability',
    tagline: 'An honest conversation about building a solution for the United Nations Sustainable Development Goals.',
    tiers: [
      {
        name: 'Mini Talk',
        format: '1 × 60 minutes',
        participants: '30-60 people',
        price: '$500 flat',
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
        <>Interactive with <span style={{ color: '#10B981' }}>real lessons learned</span> from building start-up's.</>,
        <>Covers both <span style={{ color: '#10B981' }}>technical and business perspectives</span> on AI-driven sustainability solutions.</>,
      ],
    },
    color: '#10B981',
  },
];

export default function Clinics() {
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
          subject: 'Clinics Inquiry',
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
  
  const ProgramCard = ({ program, isLarge = false }: { program: Program; isLarge?: boolean }) => {
    return (
      <div
        id={program.id}
        className="rounded-xl overflow-hidden"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          border: `${isLarge ? '3px' : '2px'} solid ${program.color}`,
          boxShadow: `0 0 ${isLarge ? '30px' : '20px'} ${program.color}30`,
        }}
      >
        {/* Header */}
        <div className={isLarge ? "p-8 pb-6" : "p-6 pb-4"}>
          {/* Badge for Talks vs Clinics */}
          <div
            className={`inline-block ${isLarge ? 'px-4 py-1.5' : 'px-3 py-1'} rounded-full ${isLarge ? 'text-sm' : 'text-xs'} font-bold uppercase tracking-wider mb-3`}
            style={{
              backgroundColor: `${program.color}20`,
              color: program.color,
              border: `1px solid ${program.color}60`,
            }}
          >
            {program.id === 'mindset' || program.id === 'founder' ? 'Talk' : 'Clinic'}
          </div>
          <h3
                className={`${isLarge ? 'text-5xl' : 'text-3xl'} font-black text-white mb-2 tracking-wider uppercase`}
                style={{
                  textShadow: isLarge
                    ? `0 0 10px ${program.color}, 0 0 20px ${program.color}, 0 0 40px ${program.color}, 0 0 80px ${program.color}80`
                    : `0 0 8px ${program.color}, 0 0 15px ${program.color}, 0 0 30px ${program.color}80`,
                  color: program.color,
                  letterSpacing: isLarge ? '0.15em' : '0.1em',
                  WebkitTextStroke: isLarge ? `1px ${program.color}` : `0.5px ${program.color}`,
                }}
              >{program.title}</h3>
          <p className={`${isLarge ? 'text-base' : 'text-base'} tracking-wide mb-3`} style={{ color: program.color }}>
            {program.subtitle}
          </p>
          <p className={`text-gray-300 ${isLarge ? 'text-base' : 'text-base'} leading-relaxed font-semibold`}>{program.tagline}</p>
        </div>

        {/* Pricing Tiers */}
        <div className={isLarge ? "px-8 pb-8" : "px-6 pb-6"}>
          {/* Includes - moved above tiers */}
          <div className={`${isLarge ? 'mb-6 pb-6' : 'mb-4 pb-4'} border-b border-white/10`}>
            {Array.isArray(program.includes) ? (
              <>
                <h4 className={`${isLarge ? 'text-lg' : 'text-base'} font-semibold text-white mb-3`}>What's Included</h4>
                <ul className={`${isLarge ? 'space-y-3' : 'space-y-2'}`}>
                  {program.includes.map((item, idx) => (
                    <li key={idx} className={`flex items-start gap-3 ${isLarge ? 'text-base' : 'text-sm'} text-white/90`}>
                      <span className="mt-0.5" style={{ color: program.color }}>✔</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                {/* Focus section */}
                <div
                  className={`rounded-lg ${isLarge ? 'p-6' : 'p-4'} mb-6`}
                  style={{
                    backgroundColor: `${program.color}10`,
                    border: `1px solid ${program.color}40`,
                    boxShadow: `0 0 20px ${program.color}15`,
                  }}
                >
                  <h4 className={`${isLarge ? 'text-xl' : 'text-lg'} font-bold text-white mb-4`} style={{ color: program.color }}>Focus</h4>
                  <ul className={`${isLarge ? 'space-y-4' : 'space-y-3'}`}>
                    {program.includes.focus.map((item, idx) => (
                      <li key={idx} className={`flex items-start gap-3 ${isLarge ? 'text-base' : 'text-sm'} text-white`}>
                        <span className="mt-0.5 text-lg" style={{ color: program.color }}>✔</span>
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Photos between Focus and Requirements - for self-defense and privates */}
                {program.id === 'self-defense' && (
                  <div className="my-6 flex gap-4 items-center">
                    <img
                      src="/images/clinics/271A0332.jpg"
                      alt="Self Defense Clinic"
                      className="rounded-lg object-cover"
                      style={{
                        width: '180px',
                        height: '280px',
                        border: `2px solid ${program.color}40`,
                        boxShadow: `0 0 20px ${program.color}15`,
                      }}
                    />
                    <img
                      src="/images/clinics/271A0141.jpg"
                      alt="Self Defense Clinic"
                      className="flex-1 rounded-lg object-cover"
                      style={{
                        height: '280px',
                        border: `2px solid ${program.color}40`,
                        boxShadow: `0 0 20px ${program.color}15`,
                      }}
                    />
                    <img
                      src="/images/clinics/271A0435.jpg"
                      alt="Self Defense Clinic"
                      className="rounded-lg object-cover"
                      style={{
                        width: '180px',
                        height: '280px',
                        border: `2px solid ${program.color}40`,
                        boxShadow: `0 0 20px ${program.color}15`,
                      }}
                    />
                  </div>
                )}
                {program.id === 'privates' && (
                  <div className="my-6 flex gap-4 items-center">
                    <img
                      src="/images/clinics/271A0484.jpg"
                      alt="Wrestling Private Training"
                      className="rounded-lg object-cover"
                      style={{
                        width: '180px',
                        height: '280px',
                        border: `2px solid ${program.color}40`,
                        boxShadow: `0 0 20px ${program.color}15`,
                      }}
                    />
                    <img
                      src="/images/clinics/271A1120.jpg"
                      alt="Wrestling Private Training"
                      className="flex-1 rounded-lg object-cover"
                      style={{
                        height: '280px',
                        border: `2px solid ${program.color}40`,
                        boxShadow: `0 0 20px ${program.color}15`,
                      }}
                    />
                    <img
                      src="/images/clinics/271A0133.jpg"
                      alt="Wrestling Private Training"
                      className="rounded-lg object-cover"
                      style={{
                        width: '180px',
                        height: '280px',
                        border: `2px solid ${program.color}40`,
                        boxShadow: `0 0 20px ${program.color}15`,
                      }}
                    />
                  </div>
                )}

                {/* Requirements section */}
                <div
                  className={`rounded-lg ${isLarge ? 'p-6' : 'p-4'}`}
                  style={{
                    backgroundColor: `${program.color}10`,
                    border: `1px solid ${program.color}40`,
                    boxShadow: `0 0 20px ${program.color}15`,
                  }}
                >
                  <h4 className={`${isLarge ? 'text-xl' : 'text-lg'} font-bold text-white mb-4`} style={{ color: program.color }}>Requirements</h4>
                  <ul className={`${isLarge ? 'space-y-4' : 'space-y-3'}`}>
                    {program.includes.requirements.map((item, idx) => (
                      <li key={idx} className={`flex items-start gap-3 ${isLarge ? 'text-base' : 'text-sm'} text-white`}>
                        <span className="mt-0.5 text-lg" style={{ color: program.color }}>✔</span>
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>

          {/* Custom pricing tables for wrestling privates */}
          {program.id === 'privates' ? (
            <div className="grid md:grid-cols-2 gap-6">
              {/* Single Session Pricing */}
              <div
                className="rounded-lg p-6"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: `1px solid ${program.color}40`,
                }}
              >
                <h4 className="text-xl font-semibold text-white mb-2">Single Session</h4>
                <p className="text-sm text-white/60 mb-4">60-Minute Session Pricing</p>

                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 text-white/60 font-medium">Group Size</th>
                      <th className="text-right py-2 text-white/60 font-medium">Total</th>
                      <th className="text-right py-2 text-white/60 font-medium">Per Athlete</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/5">
                      <td className="py-2 text-white">1 athlete</td>
                      <td className="py-2 text-right text-gray-300">$100</td>
                      <td className="py-2 text-right font-semibold" style={{ color: program.color }}>$100</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 text-white">2 athletes</td>
                      <td className="py-2 text-right text-gray-300">$150</td>
                      <td className="py-2 text-right font-semibold" style={{ color: program.color }}>$75</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 text-white">3 athletes</td>
                      <td className="py-2 text-right text-gray-300">$180</td>
                      <td className="py-2 text-right font-semibold" style={{ color: program.color }}>$60</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-white">4 athletes (max)</td>
                      <td className="py-2 text-right text-gray-300">$200</td>
                      <td className="py-2 text-right font-semibold" style={{ color: program.color }}>$50</td>
                    </tr>
                  </tbody>
                </table>

                <p className="text-xs text-white/50 mt-4 italic">
                  Bring training partners and save per athlete!
                </p>
              </div>

              {/* Series Package Pricing */}
              <div
                className="rounded-lg p-6"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: `1px solid ${program.color}40`,
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="text-xl font-semibold text-white">6-Session Package</h4>
                  <span
                    className="px-2 py-0.5 rounded text-xs font-bold"
                    style={{ backgroundColor: `${program.color}30`, color: program.color }}
                  >
                    RECOMMENDED
                  </span>
                </div>
                <p className="text-sm text-white/60 mb-4">6 × 60 min sessions</p>

                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 text-white/60 font-medium">Group Size</th>
                      <th className="text-right py-2 text-white/60 font-medium">Total</th>
                      <th className="text-right py-2 text-white/60 font-medium">Savings</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/5">
                      <td className="py-2 text-white">1 athlete</td>
                      <td className="py-2 text-right text-gray-300">$500</td>
                      <td className="py-2 text-right font-semibold" style={{ color: '#10B981' }}>Save $100</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 text-white">2 athletes</td>
                      <td className="py-2 text-right text-gray-300">$750</td>
                      <td className="py-2 text-right font-semibold" style={{ color: '#10B981' }}>Save $150</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 text-white">3 athletes</td>
                      <td className="py-2 text-right text-gray-300">$900</td>
                      <td className="py-2 text-right font-semibold" style={{ color: '#10B981' }}>Save $180</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-white">4 athletes (max)</td>
                      <td className="py-2 text-right text-gray-300">$1,000</td>
                      <td className="py-2 text-right font-semibold" style={{ color: '#10B981' }}>Save $200</td>
                    </tr>
                  </tbody>
                </table>

                <p className="text-xs mt-4 font-medium" style={{ color: program.color }}>
                  Best value for serious development!
                </p>
              </div>
            </div>
          ) : (
            <div className={`grid md:grid-cols-2 ${isLarge ? 'gap-6' : 'gap-4'}`}>
              {program.tiers.map((tier, idx) => (
                <div
                  key={idx}
                  className={`rounded-lg ${isLarge ? 'p-6' : 'p-4'}`}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    border: `1px solid ${program.color}40`,
                  }}
                >
                  <h4 className={`${isLarge ? 'text-xl' : 'text-lg'} font-semibold text-white mb-3`}>{tier.name}</h4>

                  <div className={`space-y-3 ${isLarge ? 'text-base' : 'text-sm'}`}>
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

                    {/* Price display */}
                    <div className="flex justify-between items-center pt-3 border-t border-white/10 mt-3">
                      <span className="text-white/60">Price:</span>
                      <span className={`${isLarge ? 'text-2xl' : 'text-xl'} font-bold`} style={{ color: program.color }}>
                        {tier.price}
                      </span>
                    </div>

                    {tier.additionalParticipants && (
                      <div className={`${isLarge ? 'text-sm' : 'text-xs'} text-white/50 pt-2`}>
                        {tier.additionalParticipants}
                      </div>
                    )}

                    {tier.perPersonCost && (
                      <div className={`${isLarge ? 'text-sm' : 'text-xs'} text-white/70 pt-2`}>
                        {tier.perPersonCost}
                      </div>
                    )}

                    {tier.highlight && (
                      <div className={`${isLarge ? 'text-sm' : 'text-xs'} font-medium pt-2`} style={{ color: program.color }}>
                        {tier.highlight}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Contact CTA */}
          <div className={isLarge ? "mt-8" : "mt-6"}>
            <Link
              href={`/projects/clinics/checkout?program=${program.id}`}
              className={`inline-flex items-center gap-2 ${isLarge ? 'px-6 py-3 text-base' : 'px-4 py-2 text-sm'} rounded-lg font-medium transition-all duration-300 hover:scale-110 hover:-translate-y-1`}
              style={{
                backgroundColor: `${program.color}20`,
                color: program.color,
                border: `1px solid ${program.color}`,
              }}
            >
              Book This Program
              <svg className={isLarge ? "w-5 h-5" : "w-4 h-4"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-black text-white pb-20">
      <ProjectNav title="KIRTI SAXENA" />
      <div className="pt-20 md:pt-32 px-4 md:px-8 max-w-5xl mx-auto">
        <ProjectHeader
          title="Clinics & Talks"
          date="Available for Booking"
          category="Mentorship · Training · Speaking"
        />

        {/* Discount Cards - Side by Side */}
        <div className="grid md:grid-cols-2 gap-6 mb-12 items-stretch">
          {/* Bundle Card */}
          <div
            className="rounded-xl p-6 h-full flex flex-col"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.15) 0%, rgba(2, 74, 162, 0.15) 100%)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 0 40px rgba(255, 215, 0, 0.1), 0 0 40px rgba(2, 74, 162, 0.1)',
            }}
          >
            <div className="text-center mb-6">
              <h3 className="text-3xl font-black text-white mb-3 tracking-wide">BUNDLE & SAVE</h3>
              <p className="text-white/70 text-base">Combine multiple programs for a custom package</p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="rounded-lg p-3 text-center h-[72px] flex flex-col justify-center" style={{ backgroundColor: 'rgba(255, 215, 0, 0.1)', border: '1px solid rgba(255, 215, 0, 0.4)' }}>
                <div className="text-sm text-white/60 mb-1">Self Defense</div>
                <div className="text-base font-bold" style={{ color: '#FFD700' }}>Clinic</div>
              </div>
              <div className="rounded-lg p-3 text-center h-[72px] flex flex-col justify-center" style={{ backgroundColor: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.4)' }}>
                <div className="text-sm text-white/60 mb-1">High-Performance</div>
                <div className="text-base font-bold" style={{ color: '#A855F7' }}>Talk</div>
              </div>
              <div className="rounded-lg p-3 text-center h-[72px] flex flex-col justify-center" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.4)' }}>
                <div className="text-sm text-white/60 mb-1">Innovate for a</div>
                <div className="text-base font-bold" style={{ color: '#10B981' }}>Purpose</div>
              </div>
              <div className="rounded-lg p-3 text-center h-[72px] flex flex-col justify-center" style={{ backgroundColor: 'rgba(249, 115, 22, 0.1)', border: '1px solid rgba(249, 115, 22, 0.4)' }}>
                <div className="text-sm text-white/60 mb-1">Wrestling</div>
                <div className="text-base font-bold" style={{ color: '#F97316' }}>Clinic</div>
              </div>
            </div>

            <div className="text-center mb-6 flex-grow">
              <div className="inline-block px-5 py-3 rounded-full mb-4" style={{ background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)' }}>
                <span className="text-2xl font-black text-black">SAVE 15%</span>
              </div>
              <p className="text-white/80 text-base mb-4">
                Book 2 or more programs together and use BUNDLE at checkout
              </p>
              <div className="flex flex-col items-center gap-2 text-m text-white/60">
              </div>
            </div>

            <div className="text-center mt-auto">
              <Link
                href="/projects/clinics/checkout"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-base font-semibold transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                style={{
                  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                  color: '#000',
                }}
              >
                Build Your Bundle
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* School Discount Card */}
          <div
            className="rounded-xl p-6 h-full flex flex-col"
            style={{
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(147, 51, 234, 0.15) 100%)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 0 40px rgba(59, 130, 246, 0.1), 0 0 40px rgba(147, 51, 234, 0.1)',
            }}
          >
            <div className="text-center mb-6">
              <h3 className="text-3xl font-black text-white mb-3 tracking-wide">SCHOOL DISCOUNT</h3>
              <p className="text-white/70 text-base">Special pricing for educational institutions</p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="rounded-lg p-3 text-center h-[72px] flex flex-col justify-center" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.4)' }}>
                <div className="text-2xl mb-1">🏫</div>
                <div className="text-sm font-bold text-white">K-12</div>
              </div>
              <div className="rounded-lg p-3 text-center h-[72px] flex flex-col justify-center" style={{ backgroundColor: 'rgba(147, 51, 234, 0.1)', border: '1px solid rgba(147, 51, 234, 0.4)' }}>
                <div className="text-2xl mb-1">🎓</div>
                <div className="text-sm font-bold text-white">University</div>
              </div>
              <div className="rounded-lg p-3 text-center h-[72px] flex flex-col justify-center" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.4)' }}>
                <div className="text-2xl mb-1">📚</div>
                <div className="text-sm font-bold text-white">Organizations</div>
              </div>
              <div className="rounded-lg p-3 text-center h-[72px] flex flex-col justify-center" style={{ backgroundColor: 'rgba(147, 51, 234, 0.1)', border: '1px solid rgba(147, 51, 234, 0.4)' }}>
                <div className="text-2xl mb-1">🎯</div>
                <div className="text-sm font-bold text-white">Workshops</div>
              </div>
            </div>

            <div className="text-center mb-6 flex-grow">
              <div className="inline-block px-5 py-3 rounded-full mb-4" style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #9333EA 100%)' }}>
                <span className="text-2xl font-black text-white">SAVE 35%</span>
              </div>
              <p className="text-white/80 text-base mb-4">
                When you bundle two or more programs use SKULE2 at checkout
              </p>
              <div className="flex flex-col items-center gap-2 text-m text-white/60">
              </div>
            </div>

            <div className="text-center mt-auto">
              <Link
                href="/projects/clinics/checkout"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-base font-semibold transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                style={{
                  background: 'linear-gradient(135deg, #3B82F6 0%, #9333EA 100%)',
                  color: '#fff',
                }}
              >
                School Pricing
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
        </div>

        {/* Instructor Bio Card */}
        <div className="mb-16">
          <div
            className="rounded-xl p-8 flex items-center gap-8"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '2px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 0 40px rgba(255, 215, 0, 0.05)',
            }}
          >
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div
                className="w-32 h-32 rounded-lg overflow-hidden"
                style={{
                  border: '2px solid rgba(255, 215, 0, 0.3)',
                  boxShadow: '0 0 20px rgba(255, 215, 0, 0.1)',
                }}
              >
                <img
                  src="/images/clinics/3.png"
                  alt="Kirti Saxena"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Bio Content */}
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-2">
                Taught by Kirti <span className="text-sm font-normal text-white/60">(she/her) · (pronounced k-eer-th-i)</span>
              </h3>
              <p className="text-white/80 mb-4 leading-relaxed">
                A Team Canada athlete who has represented the country at the World Championships three times and was a 2024 Olympic Alternate. Alongside these achievements, Kirti completed her engineering degree at the University of Toronto & while supporting herself through school as one of the few South Asian fashion models signed to an agency.              </p>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm text-white/60">Trusted by schools, teams, and organizations</span>
              </div>
            </div>
          </div>
        </div>

        {/* Programs */}
        <div className="mb-16">
          {/* Self Defense Clinic - Full Width */}
          <ProgramCard program={programs.find(p => p.id === 'self-defense')!} isLarge={true} />

          {/* Divider */}
          <div className="max-w-3xl mx-auto my-12">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
          </div>

          {/* Talks - Side by Side */}
          <div className="grid md:grid-cols-2 gap-6">
            <ProgramCard program={programs.find(p => p.id === 'mindset')!} isLarge={false} />
            <ProgramCard program={programs.find(p => p.id === 'founder')!} isLarge={false} />
          </div>

          {/* Divider */}
          <div className="max-w-3xl mx-auto my-12">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
          </div>

          {/* Wrestling Privates - Full Width */}
          <ProgramCard program={programs.find(p => p.id === 'privates')!} isLarge={true} />
        </div>

        {/* Add-On Note */}
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <p className="text-sm text-white/50 italic">
            Travel and facility coordination fees may apply for locations outside the Greater Toronto Area.
          </p>
        </div>

        {/* Location Section */}
        <div className="max-w-5xl mx-auto">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-12"></div>
          <h2 className="text-2xl font-bold text-white mb-6 text-center">No Mats or Space, No Worries!</h2>
          <p className="text-sm text-white/60 text-center mb-8">
            Akhara of Champions Wrestling Club is our official host for clinics and talks. Located in Mississauga, Ontario. 
          </p>

          {/* Map and Address */}
          <div className="grid md:grid-cols-2 gap-6 items-stretch">
            {/* Google Maps Embed */}
            <div className="rounded-xl overflow-hidden h-[300px] md:h-[350px]" style={{ border: '2px solid rgba(255, 255, 255, 0.1)' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2884.8461891595385!2d-79.66059492346!3d43.70892597109!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b3e2a4e5f3a9d%3A0x1234567890abcdef!2s7195%20Tranmere%20Dr%20%234%2C%20Mississauga%2C%20ON%20L5S%201N4%2C%20Canada!5e0!3m2!1sen!2sca!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Akhara of Champions Location"
              />
            </div>

            {/* Address and Contact Info */}
            <div
              className="rounded-xl p-6 flex flex-col justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(249, 115, 22, 0.1) 100%)',
                border: '2px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <h3 className="text-xl font-bold text-white mb-4">Akhara of Champions</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#FFD700] mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="text-white font-medium">7195 Tranmere Dr #4</p>
                    <p className="text-gray-400">Mississauga, ON L5S 1N4</p>
                    <p className="text-gray-400">Canada</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#FFD700] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  <a href="https://theakhara.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#FFD700] transition-colors">
                    theakhara.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#FFD700] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <a href="https://instagram.com/akhara.of.champions" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#FFD700] transition-colors">
                    @akhara.of.champions
                  </a>
                </div>
              </div>

              <a
                href="https://www.google.com/maps/dir/?api=1&destination=7195+Tranmere+Dr+%234,+Mississauga,+ON+L5S+1N4,+Canada"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-base font-semibold transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                  color: '#000',
                }}
              >
                Get Directions
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="max-w-5xl mx-auto mt-20">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-12"></div>
          <h2 className="text-2xl font-bold text-white mb-2 text-center">Client Reviews</h2>
          <p className="text-sm text-white/60 text-center mb-12">What past clients are saying</p>

          {/* Reviews Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Review 1 */}
            <div
              className="rounded-xl p-6"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
                border: '2px solid rgba(255, 215, 0, 0.2)',
              }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0"
                  style={{
                    border: '2px solid rgba(255, 215, 0, 0.4)',
                    boxShadow: '0 0 15px rgba(255, 215, 0, 0.1)',
                  }}
                >
                  <img
                    src="/images/clinics/mantej.png"
                    alt="Mantej C."
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect fill="%23FFD700" width="100" height="100"/%3E%3Ctext x="50" y="55" font-size="50" fill="white" text-anchor="middle" dominant-baseline="middle" font-weight="bold"%3EMC%3C/text%3E%3C/svg%3E';
                    }}
                  />
                </div>
                <div>
                  <p className="font-semibold text-white text-lg">Mantej C.</p>
                  <p className="text-sm text-white/70">Student</p>
                </div>
              </div>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-white/90 text-base mb-4 leading-relaxed italic">
                "Kirti's self-defense clinic was transformative. The techniques were practical and the instruction was clear. I felt empowered after just the first session."
              </p>
            </div>

            {/* Review 2 */}
            <div
              className="rounded-xl p-6"
              style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
                border: '2px solid rgba(16, 185, 129, 0.2)',
              }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0"
                  style={{
                    border: '2px solid rgba(16, 185, 129, 0.4)',
                    boxShadow: '0 0 15px rgba(16, 185, 129, 0.1)',
                  }}
                >
                  <img
                    src="/images/clinics/rahul.png"
                    alt="Rahul G."
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect fill="%2310B981" width="100" height="100"/%3E%3Ctext x="50" y="55" font-size="50" fill="white" text-anchor="middle" dominant-baseline="middle" font-weight="bold"%3ERG%3C/text%3E%3C/svg%3E';
                    }}
                  />
                </div>
                <div>
                  <p className="font-semibold text-white text-lg">Rahul G.</p>
                  <p className="text-sm text-white/70">Corporate Team Leader</p>
                </div>
              </div>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-white/90 text-base mb-4 leading-relaxed italic">
                "The high-performance mindset talk was exactly what our team needed. Kirti's real-world examples and actionable strategies have directly impacted our performance."
              </p>
            </div>

            {/* Review 3 */}
            <div
              className="rounded-xl p-6"
              style={{
                background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
                border: '2px solid rgba(249, 115, 22, 0.2)',
              }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0"
                  style={{
                    border: '2px solid rgba(249, 115, 22, 0.4)',
                    boxShadow: '0 0 15px rgba(249, 115, 22, 0.1)',
                  }}
                >
                  <img
                    src="/images/clinics/prabhleen.png"
                    alt="Prabhleen Randhawa"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect fill="%23F97316" width="100" height="100"/%3E%3Ctext x="50" y="55" font-size="50" fill="white" text-anchor="middle" dominant-baseline="middle" font-weight="bold"%3EPR%3C/text%3E%3C/svg%3E';
                    }}
                  />
                </div>
                <div>
                  <p className="font-semibold text-white text-lg">Prabhleen Randhawa</p>
                  <p className="text-sm text-white/70">Competitive Wrestler</p>
                </div>
              </div>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-white/90 text-base mb-4 leading-relaxed italic">
                "The wrestling private training sessions have improved my technique dramatically. Kirti's detailed feedback and personalized approach makes all the difference."
              </p>
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
                className="mt-4 text-yellow-400 hover:text-yellow-300 text-sm"
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
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition-colors"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Your Email *"
                    value={inquiryForm.email}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition-colors"
                    required
                  />
                </div>
                <input
                  type="tel"
                  placeholder="Phone Number (optional)"
                  value={inquiryForm.phone}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition-colors"
                />
                <textarea
                  placeholder="Your Message *"
                  value={inquiryForm.message}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition-colors resize-none"
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
                    background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                    color: '#000',
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
