'use client';

import ProjectNav from '@/components/ProjectNav';
import ProjectHeader from '@/components/ProjectHeader';
import WaiverCheckoutButton from '@/components/WaiverCheckoutButton';
import { motion } from 'framer-motion';

export default function Clinics() {
  const trainingOptions = [
    {
      id: 'One on One',
      name: 'Individual Training Session',
      price: 120,
      duration: '60 minutes',
      description: 'Personalized one-on-one training session tailored to your specific goals and skill level.',
      features: ['Technique analysis', 'Personalized training plan', 'Video feedback', 'Nutrition guidance']
    },
    {
      id: 'group-session',
      name: 'Group Training Session',
      price: 150,
      duration: '90 minutes',
      description: 'Small group training (max 6 people) focusing on fundamentals and team building.',
      features: ['Group dynamics', 'Fundamental techniques', 'Partner drills', 'Team building exercises']
    },
    {
      id: 'elite-clinic',
      name: 'Elite Training Clinic',
      price: 300,
      duration: 'Half day',
      description: 'Intensive training clinic for advanced athletes preparing for competition.',
      features: ['Advanced techniques', 'Competition preparation', 'Mental training', 'Recovery strategies']
    },
    {
      id: 'analysis',
      name: 'Video Analysis',
      price: 20,
      duration: '4 Matches',
      description: 'kkk',
      features: ['Skill assessment', 'Goal setting', 'Training plan creation', 'Resource recommendations']
    }
  ];

  return (
    <main className="min-h-screen bg-black text-white pb-20">
      <ProjectNav title="CLINICS" />

      <div className="pt-20 md:pt-32 px-4 md:px-8 max-w-6xl mx-auto">
        <ProjectHeader
          title="CLINICS"
          date="2024"
          category="Training & Coaching"
        />

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-20 mb-16 text-center"
        >
          <h2 className="text-3xl font-light mb-6">TRAIN WITH AN OLYMPIAN</h2>
          <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto mb-8">
            Transform your athletic potential with personalized training from Olympic athlete Kirti Saxena.
            Whether you&apos;re a beginner or elite competitor, I&apos;ll help you reach your next level.
          </p>

          <motion.a
            href="/book-training"
            className="inline-block bg-white text-black px-8 py-3 rounded-lg font-medium transition-all hover:bg-gray-200 mb-12"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Book Your Session
          </motion.a>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center max-w-4xl mx-auto">
            <div className="space-y-2">
              <div className="text-2xl">🥇</div>
              <p className="text-sm text-gray-400">Olympic Experience</p>
            </div>
            <div className="space-y-2">
              <div className="text-2xl">🇨🇦</div>
              <p className="text-sm text-gray-400">Team Canada</p>
            </div>
            <div className="space-y-2">
              <div className="text-2xl">📈</div>
              <p className="text-sm text-gray-400">15+ Years Experience</p>
            </div>
          </div>
        </motion.div>

        {/* Training Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <h2 className="text-2xl font-light mb-12 text-center">TRAINING PROGRAMS</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {trainingOptions.map((option, index) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-900/30 p-8 rounded-lg border border-gray-800"
              >
                <div className="mb-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-light">{option.name}</h3>
                    <span className="text-2xl font-light text-green-400">${option.price}</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">{option.duration} • {option.description}</p>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-3 text-gray-300">INCLUDES:</h4>
                  <ul className="space-y-1">
                    {option.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-gray-400 flex items-center gap-2">
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <WaiverCheckoutButton
                  productType="clinics"
                  productId={option.id}
                  price={option.price}
                  className="w-full"
                >
                  Book Session - ${option.price}
                </WaiverCheckoutButton>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
