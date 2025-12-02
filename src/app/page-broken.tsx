'use client';

import { useState } from 'react';
import Nav from '@/components/Nav';

export default function Home() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects = [
    { 
      id: 1, 
      title: 'ENGINEER', 
      href: '/projects/engineering'
    },
    { 
      id: 2, 
      title: 'ATHLETE', 
      href: '/projects/athletics'
    },
    { 
      id: 3, 
      title: 'MODEL', 
      href: '/projects/modelling'
    },
    { 
      id: 4, 
      title: 'ARTIST', 
      href: '/projects/artistry'
    },
    { 
      id: 5, 
      title: 'CLINICS', 
      href: '/projects/clinics'
    },
  ];

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Simple background with gradient */}
      <div className={`absolute inset-0 transition-all duration-1000 ${
        hoveredProject === 1 ? 'bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900' :
        hoveredProject === 2 ? 'bg-gradient-to-br from-red-900 via-orange-900 to-gray-900' :
        hoveredProject === 3 ? 'bg-gradient-to-br from-pink-900 via-purple-900 to-gray-900' :
        hoveredProject === 4 ? 'bg-gradient-to-br from-yellow-900 via-red-900 to-gray-900' :
        hoveredProject === 5 ? 'bg-gradient-to-br from-green-900 via-blue-900 to-gray-900' :
        'bg-gradient-to-br from-gray-900 via-black to-gray-800'
      }`} style={{ opacity: 0.7 }} />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>

      {/* Navigation */}
      <Nav />

      {/* Content - Horizontal layout side by side, no borders */}
      <div className="relative z-20 flex items-center justify-center min-h-screen px-8">
        <div className="flex space-x-16 max-w-7xl w-full justify-center">
          {projects.map((project, index) => (
            <a
              key={project.id}
              href={project.href}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              className="group flex-1 text-center opacity-0 animate-fade-in"
              style={{ animationDelay: `${0.8 + index * 0.1}s`, animationFillMode: 'forwards' }}
            >
              <h2 className="text-2xl md:text-4xl font-light group-hover:text-gray-300 transition-colors">
                {project.title}
              </h2>
            </a>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </main>
  );
}