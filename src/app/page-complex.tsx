'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Nav from '@/components/Nav';

export default function Home() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects = [
    { 
      id: 1, 
      title: 'ENGINEER', 
      date: '2023', 
      href: '/projects/engineering',
      video: '/videos/engineering-bg.mp4'
    },
    { 
      id: 2, 
      title: 'ATHLETE', 
      date: '2023', 
      href: '/projects/athletics',
      video: '/videos/athletics-bg.mp4'
    },
    { 
      id: 3, 
      title: 'MODEL', 
      date: '2023', 
      href: '/projects/modelling',
      video: '/videos/modelling-bg.mp4'
    },
    { 
      id: 4, 
      title: 'ARTIST', 
      date: '2023', 
      href: '/projects/artistry',
      video: '/videos/artistry-bg.mp4'
    },
    { 
      id: 5, 
      title: 'CLINICS', 
      date: '2023', 
      href: '/projects/clinics',
    },
  ];

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background Videos - Only show if video exists */}
      <AnimatePresence>
        {hoveredProject && (
          <motion.div
            key={`background-${hoveredProject}`}
            className="absolute inset-0 w-full h-full opacity-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Gradient backgrounds as placeholders for videos */}
            <div className={`w-full h-full bg-gradient-to-br ${
              hoveredProject === 1 ? 'from-blue-900 via-purple-900 to-gray-900' :
              hoveredProject === 2 ? 'from-red-900 via-orange-900 to-gray-900' :
              hoveredProject === 3 ? 'from-pink-900 via-purple-900 to-gray-900' :
              hoveredProject === 4 ? 'from-yellow-900 via-red-900 to-gray-900' :
              'from-green-900 via-blue-900 to-gray-900'
            }`} />
            {/* You can add videos here when available */}
            <video
              className="w-full h-full object-cover absolute inset-0"
              autoPlay
              muted
              loop
              onError={(e) => {
                // Hide video if it fails to load, gradient background will show
                e.currentTarget.style.display = 'none';
              }}
            >
              <source src={projects[hoveredProject - 1]?.video} type="video/mp4" />
            </video>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>

      {/* Navigation */}
      <Nav />

      {/* Content - Horizontal layout side by side, no borders */}
      <div className="relative z-20 flex items-center justify-center min-h-screen px-8">
        <div className="flex space-x-16 max-w-7xl w-full justify-center">
          {projects.map((project, index) => (
            <motion.a
              key={project.id}
              href={project.href}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              className="group flex-1 text-center"
            >
              <h2 className="text-2xl md:text-4xl font-light group-hover:text-gray-300 transition-colors">
                {project.title}
              </h2>
            </motion.a>
          ))}
        </div>
      </div>
    </main>
  );
}
