'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import ProjectHeader from '@/components/ProjectHeader';
import ProjectNav from '@/components/ProjectNav';
import { useRef } from 'react';

const events = [
  {
    year: '2024',
    title: 'Coaching Excellence',
    description: 'Transitioned to coaching the next generation of athletes, sharing knowledge and passion for the sport.',
    media: '/videos/coaching-2024.mp4',
    mediaType: 'video',
  },
  {
    year: '2023',
    title: 'Championship Victory',
    description: 'Secured a podium finish at the national championships, culminating years of dedicated training.',
    media: '/images/championship-2023.jpg',
    mediaType: 'image',
  },
  {
    year: '2021',
    title: 'Olympic Games',
    description: 'Represented Canada at the Tokyo Olympics, competing against the world\'s best athletes.',
    media: '/videos/olympics-2021.mp4',
    mediaType: 'video',
  },
  {
    year: '2019',
    title: 'World Championships',
    description: 'Competed at the World Championships, gaining invaluable international experience.',
    media: '/images/worlds-2019.jpg',
    mediaType: 'image',
  },
  {
    year: '2018',
    title: 'Team Canada Selection',
    description: 'Selected for Team Canada, marking a significant milestone in my athletic career.',
    media: '/videos/team-canada-2018.mp4',
    mediaType: 'video',
  },
  {
    year: '2016',
    title: 'University Championships',
    description: 'Dominated university-level competition, setting multiple records and earning All-American honors.',
    media: '/images/university-2016.jpg',
    mediaType: 'image',
  },
  {
    year: '2014',
    title: 'Junior National Champion',
    description: 'Won my first national title at the junior level, establishing myself as a rising star.',
    media: '/videos/junior-nationals-2014.mp4',
    mediaType: 'video',
  },
  {
    year: '2012',
    title: 'High School Dominance',
    description: 'Set state records and led my high school team to multiple championships.',
    media: '/images/highschool-2012.jpg',
    mediaType: 'image',
  },
  {
    year: '2008',
    title: 'First Competition',
    description: 'Competed in my first official tournament, igniting a lifelong passion for competitive athletics.',
    media: '/images/first-competition-2008.jpg',
    mediaType: 'image',
  },
];

export default function Athletics() {
  return (
    <main className="min-h-screen bg-black text-white pb-20">
      <ProjectNav title="KIRTI SAXENA" />
      <div className="pt-20 md:pt-32 px-4 md:px-8 max-w-6xl mx-auto">
        <ProjectHeader
          title="ATHLETE"
          date="2023"
          category="Portfolio"
        />
        <div className="relative">
          {/* Timeline vertical line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#FD9635] via-[#FD9635]/70 to-[#FD9635]/30 z-0 shadow-[0_0_10px_rgba(253,150,53,0.5)]" style={{transform: 'translateX(-50%)'}} />

          <div className="flex flex-col gap-24 relative z-10">
            {events.map((event, idx) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0.7, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-150px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative"
              >
                {/* Timeline ball */}
                <motion.div
                  className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                  initial={{ scale: 0.8, opacity: 0.8 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <div className="w-6 h-6 bg-[#FD9635] rounded-full border-4 border-black shadow-lg shadow-[#FD9635]/50">
                  </div>
                </motion.div>

                {/* Alternating Layout */}
                {idx % 2 === 0 ? (
                  // Even index: Image on left, text on right
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    {/* Media - Left Side */}
                    <motion.div
                      className="w-full md:w-1/2 md:pr-8"
                      initial={{ opacity: 0.8, scale: 0.98 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                      <div className="relative group">
                        {event.mediaType === 'image' ? (
                          <Image
                            src={event.media}
                            alt={event.title}
                            width={500}
                            height={320}
                            className="rounded-xl shadow-2xl object-cover w-full group-hover:shadow-white/20 transition-shadow duration-300"
                          />
                        ) : (
                          <video
                            src={event.media}
                            controls
                            className="rounded-xl shadow-2xl w-full group-hover:shadow-white/20 transition-shadow duration-300"
                          />
                        )}
                      </div>
                    </motion.div>

                    {/* Text - Right Side */}
                    <motion.div
                      className="w-full md:w-1/2 md:pl-8"
                      initial={{ opacity: 0.8, scale: 0.98 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                    >
                      <div className="text-left">
                        <div className="text-4xl font-light text-white mb-3">{event.year}</div>
                        <div className="text-2xl font-semibold mb-4 text-white">{event.title}</div>
                        <div className="text-lg text-gray-300 leading-relaxed">{event.description}</div>
                      </div>
                    </motion.div>
                  </div>
                ) : (
                  // Odd index: Text on left, image on right
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    {/* Text - Left Side */}
                    <motion.div
                      className="w-full md:w-1/2 md:pr-8 order-2 md:order-1"
                      initial={{ opacity: 0.8, scale: 0.98 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                    >
                      <div className="text-left md:text-right">
                        <div className="text-4xl font-light text-white mb-3">{event.year}</div>
                        <div className="text-2xl font-semibold mb-4 text-white">{event.title}</div>
                        <div className="text-lg text-gray-300 leading-relaxed">{event.description}</div>
                      </div>
                    </motion.div>

                    {/* Media - Right Side */}
                    <motion.div
                      className="w-full md:w-1/2 md:pl-8 order-1 md:order-2"
                      initial={{ opacity: 0.8, scale: 0.98 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                      <div className="relative group">
                        {event.mediaType === 'image' ? (
                          <Image
                            src={event.media}
                            alt={event.title}
                            width={500}
                            height={320}
                            className="rounded-xl shadow-2xl object-cover w-full group-hover:shadow-white/20 transition-shadow duration-300"
                          />
                        ) : (
                          <video
                            src={event.media}
                            controls
                            className="rounded-xl shadow-2xl w-full group-hover:shadow-white/20 transition-shadow duration-300"
                          />
                        )}
                      </div>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
