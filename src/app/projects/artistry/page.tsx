'use client';

import Link from 'next/link';
import ProjectNav from '@/components/ProjectNav';

export default function Artistry() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <ProjectNav title="KIRTI SAXENA" />
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-20">
        {/* Header Card */}
        <div
          className="rounded-xl p-6 md:p-8 mb-8 w-full max-w-2xl"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <div className="flex items-start gap-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center w-10 h-10 text-gray-400 hover:text-white transition-colors flex-shrink-0"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-2">
                BUY YOUR ARTWORK
              </h1>
              <p className="text-white/60">
                Original paintings, prints, and custom commissions
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="text-center">
          <p className="text-white/60 text-lg">
            Under Construction
          </p>
        </div>
      </div>
    </main>
  );
}
