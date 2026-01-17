'use client';

import ProjectNav from '@/components/ProjectNav';
import WaiverCheckoutButton from '@/components/WaiverCheckoutButton';
import { motion } from 'framer-motion';

export default function Clinics() {
  const offerings = [
    {
      id: 'self-defence',
      name: 'Self Defence',
      category: 'Schools',
      description: 'Empower students with practical self-defence skills and confidence. Learn situational awareness, de-escalation techniques, and physical defence fundamentals in an engaging, age-appropriate format.',
      features: ['Situational awareness training', 'De-escalation techniques', 'Physical defence fundamentals', 'Confidence building exercises'],
      price: null,
      priceLabel: 'Contact for pricing',
    },
    {
      id: 'mindset-talk',
      name: 'High Performance Mindset',
      category: 'Schools',
      description: 'An inspiring talk on the mental frameworks that create champions. Drawing from Olympic experience, learn how to develop resilience, set goals, and perform under pressure.',
      features: ['Goal setting frameworks', 'Dealing with pressure', 'Building resilience', 'Olympic journey insights'],
      price: null,
      priceLabel: 'Contact for pricing',
    },
    {
      id: 'individual-elite',
      name: 'Individual Elite Training',
      category: 'Athletes',
      description: 'One-on-one sessions designed for serious athletes. Personalized technical development, video analysis, competition preparation, and periodized training plans tailored to your goals.',
      features: ['Technique analysis & correction', 'Video breakdown sessions', 'Competition preparation', 'Personalized training plans'],
      price: 120,
      priceLabel: '$120 / session',
    },
    {
      id: 'team-training',
      name: 'Team Training',
      category: 'Athletes',
      description: 'Elevate your entire team with group sessions focused on technical skills, team dynamics, and competitive drills. Perfect for clubs and competitive programs.',
      features: ['Team-based drills', 'Technical skill development', 'Competition simulation', 'Team culture building'],
      price: null,
      priceLabel: 'Contact for pricing',
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <ProjectNav title="CLINICS" />

      {/* Hero Section */}
      <section className="pt-32 md:pt-40 pb-20 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8">
              CLINICS
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl leading-relaxed mb-12">
              Train with an Olympian. Whether you&apos;re a school looking to inspire students or an athlete chasing excellence, I bring world-class experience to every session.
            </p>
            <div className="flex flex-wrap gap-8 text-sm text-gray-500 uppercase tracking-wider">
              <span>Olympic Experience</span>
              <span>Team Canada</span>
              <span>15+ Years</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Offerings - Full Width Stacked */}
      <section className="border-t border-white/10">
        {offerings.map((offering, index) => (
          <motion.div
            key={offering.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className={`border-b border-white/10 ${index % 2 === 1 ? 'bg-zinc-950' : 'bg-black'}`}
          >
            <div className="max-w-5xl mx-auto px-6 md:px-12 py-16 md:py-24">
              {/* Category Tag */}
              <span className="text-xs uppercase tracking-widest text-gray-500 mb-4 block">
                {offering.category}
              </span>

              {/* Main Content */}
              <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
                {/* Left: Title & Description */}
                <div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                    {offering.name}
                  </h2>
                  <p className="text-gray-400 text-lg leading-relaxed">
                    {offering.description}
                  </p>
                </div>

                {/* Right: Features & CTA */}
                <div>
                  <ul className="space-y-3 mb-8">
                    {offering.features.map((feature, idx) => (
                      <li key={idx} className="text-gray-300 flex items-start gap-3">
                        <span className="w-1.5 h-1.5 bg-white rounded-full mt-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    {offering.price ? (
                      <WaiverCheckoutButton
                        productType="clinics"
                        productId={offering.id}
                        price={offering.price}
                        className="px-8 py-4 bg-white text-black font-medium uppercase tracking-wider hover:bg-gray-200 transition-colors text-center"
                      >
                        Book Now — {offering.priceLabel}
                      </WaiverCheckoutButton>
                    ) : (
                      <a
                        href="/#contact"
                        className="px-8 py-4 border border-white/30 text-white font-medium uppercase tracking-wider hover:bg-white hover:text-black transition-colors text-center"
                      >
                        {offering.priceLabel}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Bottom CTA */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-zinc-950">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
            Ready to Train?
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Have questions or want to discuss custom training programs? Let&apos;s talk.
          </p>
          <a
            href="/#contact"
            className="inline-block px-8 py-4 bg-white text-black font-medium uppercase tracking-wider hover:bg-gray-200 transition-colors"
          >
            Get In Touch
          </a>
        </motion.div>
      </section>
    </main>
  );
}
