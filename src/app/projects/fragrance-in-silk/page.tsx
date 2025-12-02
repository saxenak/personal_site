'use client';

import ProjectNav from '@/components/ProjectNav';
import ProjectHeader from '@/components/ProjectHeader';
import VideoSection from '@/components/VideoSection';

export default function FragranceInSilk() {
  return (
    <main className="min-h-screen bg-black text-white pb-20">
      <ProjectNav title="KIRTI SAXENA" />
      
      <ProjectHeader 
        title="FRAGRANCE IN SILK"
        date="20.06.23"
        category="Fashion Film"
      />
      
      <div className="px-8">
        <div className="max-w-6xl mx-auto space-y-16">
          <VideoSection 
            src="/videos/fragrance-1.mp4"
            poster="/images/fragrance-1-poster.jpg"
            className="aspect-video"
          />
          
          <div className="grid grid-cols-2 gap-8">
            <VideoSection 
              src="/videos/fragrance-2.mp4"
              poster="/images/fragrance-2-poster.jpg"
              className="aspect-[4/5]"
            />
            <VideoSection 
              src="/videos/fragrance-3.mp4"
              poster="/images/fragrance-3-poster.jpg"
              className="aspect-[4/5]"
            />
          </div>
          
          <p className="text-xl text-gray-400 max-w-2xl">
            A sensory journey through the art of silk-making, where traditional craftsmanship 
            meets contemporary fashion. This piece captures the ethereal nature of silk and 
            the delicate process of its creation.
          </p>
        </div>
      </div>
    </main>
  );
}