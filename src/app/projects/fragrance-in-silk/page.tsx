'use client';

import ProjectNav from '@/components/ProjectNav';

export default function FragranceInSilk() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <ProjectNav title="KIRTI SAXENA" />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-4">
            FRAGRANCE IN SILK
          </h1>
          <p className="text-white/60 text-lg">
            Being Built
          </p>
        </div>
      </div>
    </main>
  );
}
