'use client';

import { motion } from 'framer-motion';

interface ProjectHeaderProps {
  title: string;
  date: string;
  category: string;
}

export default function ProjectHeader({ title, date, category }: ProjectHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="pt-16 md:pt-32 px-4 md:px-8 mb-8 md:mb-16"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 md:gap-4 text-xs md:text-sm mb-4 md:mb-8">
          <span className="text-gray-500">{date}</span>
          <span className="w-[1px] h-4 bg-white/20"></span>
          <span className="text-gray-500">{category}</span>
        </div>
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-light">{title}</h1>
      </div>
    </motion.header>
  );
}