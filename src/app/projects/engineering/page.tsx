'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import ProjectHeader from '@/components/ProjectHeader';
import ProjectNav from '@/components/ProjectNav';
import { useState, Fragment } from 'react';

interface Project {
  title: string;
  organization?: string;
  description?: string;
  school?: string;
  major?: string;
  awards?: string[];
  extracurriculars?: string[];
  academicHighlights?: string[];
  skills?: string[];
  achieved?: string;
  how?: string;
  outcome?: string;
  images: string[];
  keyTakeaway?: string;
  keyTakeawayAudio?: string;
  link?: string;
  year?: string;
  startDate?: string; // Format: "Jan 2018" or "2018-01"
  endDate?: string; // Format: "Dec 2025" or "Present"
  category?: 'work' | 'design-team' | 'research' | 'extracurricular' | 'education' | 'current';
}

// Category colors for unique glows
const categoryColors = {
  work: {
    glow: 'rgba(253, 150, 53, 0.3)', // Orange - Work Experience
    border: '#FD9635',
    label: 'Work Experience',
  },
  'design-team': {
    glow: 'rgba(199, 124, 191, 0.3)', // #C77CBF - Design Teams
    border: '#C77CBF',
    label: 'Design Team',
  },
  research: {
    glow: 'rgba(159, 72, 79, 0.3)', // #9F484F - Research
    border: '#9F484F',
    label: 'Research',
  },
  extracurricular: {
    glow: 'rgba(2, 74, 162, 0.3)', // #024AA2 - Extracurriculars
    border: '#024AA2',
    label: 'Extracurricular',
  },
  education: {
    glow: 'rgba(236, 72, 153, 0.3)', // Pink - Education
    border: '#EC4899',
    label: 'Education',
  },
  current: {
    glow: 'rgba(255, 215, 0, 0.3)', // Gold - Current Position
    border: '#FFD700',
    label: 'Current Position',
  },
};

// Helper function to parse date to month index (0 = Jan 2018)
const parseDate = (dateStr: string): number => {
  if (!dateStr) return 0;

  const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  const parts = dateStr.toLowerCase().split(' ');

  let month = 0;
  let year = 2018;

  if (parts.length === 2) {
    // Format: "Jan 2018"
    month = months.indexOf(parts[0].substring(0, 3));
    year = parseInt(parts[1]);
  } else if (dateStr.includes('-')) {
    // Format: "2018-01"
    const [yearStr, monthStr] = dateStr.split('-');
    year = parseInt(yearStr);
    month = parseInt(monthStr) - 1;
  }

  const monthsSince2018 = (year - 2018) * 12 + month;
  return monthsSince2018;
};

// Generate timeline months from Jan 2018 to Dec 2025
const generateTimelineMonths = () => {
  const months = [];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  for (let year = 2018; year <= 2025; year++) {
    const endMonth = year === 2025 ? 12 : 12;
    for (let month = 0; month < endMonth; month++) {
      months.push({
        label: `${monthNames[month]} ${year}`,
        year,
        month,
        index: months.length
      });
    }
  }
  return months;
};

const ProjectDropdown = ({ project, startMonth, durationMonths, barOffset, opacity, cardIndex, absoluteTop, horizontalOffset, adjustedTop }: {
  project: Project;
  startMonth: number;
  durationMonths: number;
  barOffset: number; // offset position to prevent overlap (0, 1, 2, etc.)
  opacity: number; // opacity for the bar (0.5 to 1.0)
  cardIndex: number; // unique index for each card
  absoluteTop: number; // absolute top position in pixels
  horizontalOffset: number; // horizontal offset in pixels
  adjustedTop: number; // adjusted top position to prevent card overlap
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Use the pre-calculated adjusted position for the card
  const cardTopPosition = adjustedTop - 8;

  // Determine if this is an end-positioned category (for date label display)
  const positionAtEnd = project.category === 'education' || project.category === 'current';

  // Get category-specific colors (with fallback)
  const categoryColor = categoryColors[project.category || 'work'] || categoryColors.work;

  return (
    <Fragment>
      {/* Duration bar with category color - extends from start date to end date */}
      <div
        className="absolute w-6 rounded-sm"
        style={{
          height: `${durationMonths * 60}px`,
          top: `${absoluteTop}px`,
          left: `${-300}px`,
          backgroundColor: categoryColor.glow,
          zIndex: 3,
        }}
      />

      {/* Dot and label - positioned based on category */}
      <div
        className="absolute w-4 h-4 rounded-full border-2 border-black shadow-lg"
        style={{
          top: `${cardTopPosition}px`,
          left: `${-108}px`,
          backgroundColor: categoryColor.border,
          boxShadow: `0 0 10px ${categoryColor.glow}`,
          zIndex: 10,
        }}
      />
      <div
        className="absolute text-white text-lg font-semibold whitespace-nowrap text-right flex items-center"
        style={{
          top: `${cardTopPosition}px`,
          left: `${-230}px`,
          width: '110px',
          height: '16px',
          zIndex: 10,
        }}
      >
        {positionAtEnd ? project.endDate : project.startDate}
      </div>

      {/* Card positioned based on card type */}
      <div
        className="absolute"
        style={{
          top: `${cardTopPosition}px`,
          left: `${50 + horizontalOffset}px`,
          width: '600px',
          zIndex: isExpanded ? 50 : 10,
        }}
      >
        <motion.div
          className="relative flex items-start"
          initial={{ opacity: 0.7, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-150px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
        {/* Card content */}
        <motion.div
          className="border-2 rounded-lg transition-all duration-300 flex-1 bg-black"
          style={{
            borderColor: categoryColor.border,
            boxShadow: `0 0 15px ${categoryColor.glow}`,
          }}
          initial={false}
          whileHover={{
            scale: 1.01,
            boxShadow: `0 0 25px ${categoryColor.glow}`,
          }}
          transition={{ duration: 0.2 }}
        >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 text-left hover:bg-gray-800/70 hover:border-gray-600 transition-all duration-300 group relative"
      >
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <h3
              className="text-2xl font-semibold group-hover:text-white transition-colors duration-300"
              dangerouslySetInnerHTML={{ __html: project.title }}
            />
            {project.organization && (
              <p className="text-gray-500 group-hover:text-gray-400 mt-1 text-lg transition-colors duration-300">
                {project.organization}
              </p>
            )}
            {project.school && (
              <p className="text-gray-500 group-hover:text-gray-400 mt-1 text-lg transition-colors duration-300">
                {project.school}
              </p>
            )}
          </div>
          <div className="flex flex-col items-center gap-1">
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-gray-400 group-hover:text-gray-200 transition-colors duration-300 text-2xl"
            >
              ↓
            </motion.div>
            <span className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
              {isExpanded ? 'Click to close' : 'Click to expand'}
            </span>
          </div>
        </div>

        {/* Hover highlight border */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-gray-600/50 rounded-lg transition-all duration-300 pointer-events-none"></div>
      </button>

      <motion.div
        initial={false}
        animate={{ height: isExpanded ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="p-6 pt-4 border-t border-gray-800">
          {/* Education-specific fields */}
          {project.awards && project.awards.length > 0 && (
            <div className="mb-6 mt-2">
              <h4 className="text-lg font-semibold text-gray-300 mb-3">Awards</h4>
              <ul className="space-y-2">
                {project.awards.map((award, idx) => (
                  <li key={idx} className="text-gray-400 text-base flex items-start">
                    <span style={{ color: categoryColor.border }} className="mr-2">•</span>
                    {award}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.extracurriculars && project.extracurriculars.length > 0 && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-300 mb-3">Extracurriculars</h4>
              <ul className="space-y-2">
                {project.extracurriculars.map((activity, idx) => (
                  <li key={idx} className="text-gray-400 text-base flex items-start">
                    <span style={{ color: categoryColor.border }} className="mr-2">•</span>
                    {activity}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.academicHighlights && project.academicHighlights.length > 0 && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-300 mb-3">Academic Highlights</h4>
              <ul className="space-y-2">
                {project.academicHighlights.map((highlight, idx) => (
                  <li key={idx} className="text-gray-400 text-base flex items-start">
                    <span style={{ color: categoryColor.border }} className="mr-2">•</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Startup/Work-specific fields */}
          {project.skills && (
            <div className="mb-6 mt-2">
              <h4 className="text-sm font-semibold text-gray-400 mb-3">SKILLS</h4>
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-base"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {(project.achieved || project.how || project.outcome) && (
            <div className="mb-6">
              {project.achieved && (
                <div className="mb-4">
                  <h4 className="text-base font-semibold text-gray-300 mb-2">Achieved:</h4>
                  <p className="text-gray-400 text-base">{project.achieved}</p>
                </div>
              )}
              {project.how && (
                <div className="mb-4">
                  <h4 className="text-base font-semibold text-gray-300 mb-2">How:</h4>
                  <p className="text-gray-400 text-base">{project.how}</p>
                </div>
              )}
              {project.outcome && (
                <div className="mb-4">
                  <h4 className="text-base font-semibold text-gray-300 mb-2">Outcome:</h4>
                  <p className="text-gray-400 text-base">{project.outcome}</p>
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {project.images.map((image, idx) => (
              <div key={idx} className="relative group">
                <Image
                  src={image}
                  alt={`${project.title} - Image ${idx + 1}`}
                  width={400}
                  height={250}
                  className="rounded-lg object-cover w-full h-48 group-hover:shadow-lg transition-shadow"
                />
              </div>
            ))}
          </div>

          {project.keyTakeaway && (
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-2">
                <h4 className="text-base font-semibold text-gray-300">Key Takeaway:</h4>
                {project.keyTakeawayAudio && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const audio = new Audio(project.keyTakeawayAudio);
                      audio.play();
                    }}
                    className="flex items-center gap-2 px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors text-sm"
                  >
                    <svg className="w-4 h-4 text-[#FD9635]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M7 4a3 3 0 016 0v6a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"/>
                    </svg>
                    <span className="text-gray-300">Listen</span>
                  </button>
                )}
              </div>
              <p className="text-gray-400 text-base">{project.keyTakeaway}</p>
            </div>
          )}

          {project.link && (
            <div className="mt-4">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors text-base"
              >
                View Project →
              </a>
            </div>
          )}
        </div>
        </motion.div>
      </motion.div>
      </motion.div>
      </div>
    </Fragment>
  );
};

export default function Engineering() {
  const timelineMonths = generateTimelineMonths();

  // All projects in a flat array with their dates
  const allProjects: Project[] = [
    {
      title: 'Bachelor of Applied Sciences in Engineering',
      school: 'University of Toronto (2018 -- 2025)',
      major: 'Mechanical Engineering',
      awards: [
        'Lisa Anne Hamman (2020 & 2022)',
        'C. William Daniels Award (2021)',
        'Varsity Blues Diamond Award (2023)'
      ],
      extracurriculars: [
        'Womens Varsity Wrestling Team Captain (2019-2023)',
        'Varsity Board Member (2019-2023)',
        'Biomedical Engineering Board '
      ],
      academicHighlights: [
        'University of Toronto Autonomous Rover Team (2019-2023)',
        'University of Toronto BAJA SAE (2018-2020)',
        'Senior Thesis',
        '90% in ECE'
      ],
      images: ['/images/engineering/graduation-1.jpg', '/images/engineering/graduation-2.jpg'],
      keyTakeaway: 'Education provides the foundation, but real learning happens through application, collaboration, and continuous growth beyond the classroom.',
      startDate: 'Sep 2018',
      endDate: 'June 2025',
      category: 'education'
    },
    {
      title: 'CEO & Founder',
      organization: 'AJNA Materials',
      description: 'Founded and leading AJNA, a startup focused on AI-powered life cycle assessment and sustainable procurement solutions.',
      skills: ['Leadership', 'Product Strategy', 'AI/ML', 'Sustainability', 'Business Development'],
      achieved: 'Designed and launched AJNA\'s AI-LCA procurement architecture, successfully navigating complex technical and business challenges',
      how: 'Led cross-functional team, developed product vision, secured initial funding, and built strategic partnerships with industry leaders',
      outcome: 'Successfully brought product to market, onboarded first customers, and positioned company for growth in sustainable tech sector',
      images: ['/images/engineering/ajna-1.jpg', '/images/engineering/ajna-2.jpg'],
      keyTakeaway: 'Building a startup requires resilience, adaptability, and unwavering commitment to your vision.',
      keyTakeawayAudio: '/audio/ajna-takeaway.mp3',
      link: 'https://ajnamaterials.com',
      startDate: 'August 2025',
      endDate: 'Present',
      category: 'current'
    },
   {
      title: 'Technical Co-Founder',
      organization: 'HER2HER',
      description: 'Founded and leading AJNA, a startup focused on AI-powered life cycle assessment and sustainable procurement solutions.',
      skills: ['Leadership', 'Product Strategy', 'AI/ML', 'Sustainability', 'Business Development'],
      achieved: 'Designed and launched AJNA\'s AI-LCA procurement architecture, successfully navigating complex technical and business challenges',
      how: 'Led cross-functional team, developed product vision, secured initial funding, and built strategic partnerships with industry leaders',
      outcome: 'Successfully brought product to market, onboarded first customers, and positioned company for growth in sustainable tech sector',
      images: ['/images/engineering/ajna-1.jpg', '/images/engineering/ajna-2.jpg'],
      keyTakeaway: 'Building a startup requires resilience, adaptability, and unwavering commitment to your vision.',
      keyTakeawayAudio: '/audio/ajna-takeaway.mp3',
      link: 'https://ajnamaterials.com',
      startDate: 'January 2025',
      endDate: 'August 2025',
      category: 'work'
    },
   {
      title: 'R&D Engineering Intern',
      organization: 'Seaspan ULC',
      description: 'Founded and leading AJNA, a startup focused on AI-powered life cycle assessment and sustainable procurement solutions.',
      skills: ['Leadership', 'Product Strategy', 'AI/ML', 'Sustainability', 'Business Development'],
      achieved: 'Designed and launched AJNA\'s AI-LCA procurement architecture, successfully navigating complex technical and business challenges',
      how: 'Led cross-functional team, developed product vision, secured initial funding, and built strategic partnerships with industry leaders',
      outcome: 'Successfully brought product to market, onboarded first customers, and positioned company for growth in sustainable tech sector',
      images: ['/images/engineering/ajna-1.jpg', '/images/engineering/ajna-2.jpg'],
      keyTakeaway: 'Building a startup requires resilience, adaptability, and unwavering commitment to your vision.',
      keyTakeawayAudio: '/audio/ajna-takeaway.mp3',
      link: 'https://ajnamaterials.com',
      startDate: 'September 2024',
      endDate: 'January 2025',
      category: 'work'
    },
   {
      title: 'Cell Manufacturing Engineering Intern',
      organization: 'Tesla Inc.',
      description: 'Founded and leading AJNA, a startup focused on AI-powered life cycle assessment and sustainable procurement solutions.',
      skills: ['Leadership', 'Product Strategy', 'AI/ML', 'Sustainability', 'Business Development'],
      achieved: 'Designed and launched AJNA\'s AI-LCA procurement architecture, successfully navigating complex technical and business challenges',
      how: 'Led cross-functional team, developed product vision, secured initial funding, and built strategic partnerships with industry leaders',
      outcome: 'Successfully brought product to market, onboarded first customers, and positioned company for growth in sustainable tech sector',
      images: ['/images/engineering/ajna-1.jpg', '/images/engineering/ajna-2.jpg'],
      keyTakeaway: 'Building a startup requires resilience, adaptability, and unwavering commitment to your vision.',
      keyTakeawayAudio: '/audio/ajna-takeaway.mp3',
      link: 'https://ajnamaterials.com',
      startDate: 'September 2023',
      endDate: 'June 2024',
      category: 'work'
    },
   {
      title: 'Technical Project Manager',
      organization: 'University of Toronto Robotics Association Autonomous Rover',
      description: 'Founded and leading AJNA, a startup focused on AI-powered life cycle assessment and sustainable procurement solutions.',
      skills: ['Leadership', 'Product Strategy', 'AI/ML', 'Sustainability', 'Business Development'],
      achieved: 'Designed and launched AJNA\'s AI-LCA procurement architecture, successfully navigating complex technical and business challenges',
      how: 'Led cross-functional team, developed product vision, secured initial funding, and built strategic partnerships with industry leaders',
      outcome: 'Successfully brought product to market, onboarded first customers, and positioned company for growth in sustainable tech sector',
      images: ['/images/engineering/ajna-1.jpg', '/images/engineering/ajna-2.jpg'],
      keyTakeaway: 'Building a startup requires resilience, adaptability, and unwavering commitment to your vision.',
      keyTakeawayAudio: '/audio/ajna-takeaway.mp3',
      link: 'https://ajnamaterials.com',
      startDate: 'June 2019',
      endDate: 'June 2023',
      category: 'design-team'
    },
     {
      title: 'Mechanical Engineer',
      organization: 'University of Toronto Baja SAE',
      description: 'Founded and leading AJNA, a startup focused on AI-powered life cycle assessment and sustainable procurement solutions.',
      skills: ['Leadership', 'Product Strategy', 'AI/ML', 'Sustainability', 'Business Development'],
      achieved: 'Designed and launched AJNA\'s AI-LCA procurement architecture, successfully navigating complex technical and business challenges',
      how: 'Led cross-functional team, developed product vision, secured initial funding, and built strategic partnerships with industry leaders',
      outcome: 'Successfully brought product to market, onboarded first customers, and positioned company for growth in sustainable tech sector',
      images: ['/images/engineering/ajna-1.jpg', '/images/engineering/ajna-2.jpg'],
      keyTakeaway: 'Building a startup requires resilience, adaptability, and unwavering commitment to your vision.',
      keyTakeawayAudio: '/audio/ajna-takeaway.mp3',
      link: 'https://ajnamaterials.com',
      startDate: 'September 2018',
      endDate: 'September 2020',
      category: 'design-team'
    }, 
     {
      title: 'Machine Learning Engineer',
      organization: 'Pnemonia Detection Research Project',
      description: 'Founded and leading AJNA, a startup focused on AI-powered life cycle assessment and sustainable procurement solutions.',
      skills: ['Leadership', 'Product Strategy', 'AI/ML', 'Sustainability', 'Business Development'],
      achieved: 'Designed and launched AJNA\'s AI-LCA procurement architecture, successfully navigating complex technical and business challenges',
      how: 'Led cross-functional team, developed product vision, secured initial funding, and built strategic partnerships with industry leaders',
      outcome: 'Successfully brought product to market, onboarded first customers, and positioned company for growth in sustainable tech sector',
      images: ['/images/engineering/ajna-1.jpg', '/images/engineering/ajna-2.jpg'],
      keyTakeaway: 'Building a startup requires resilience, adaptability, and unwavering commitment to your vision.',
      keyTakeawayAudio: '/audio/ajna-takeaway.mp3',
      link: 'https://ajnamaterials.com',
      startDate: 'May 2023',
      endDate: 'August 2023',
      category: 'research'
    }, 
     {
      title: 'Capstone Researcher',
      organization: 'University of Toronto Baja SAE',
      description: 'Founded and leading AJNA, a startup focused on AI-powered life cycle assessment and sustainable procurement solutions.',
      skills: ['Leadership', 'Product Strategy', 'AI/ML', 'Sustainability', 'Business Development'],
      achieved: 'Designed and launched AJNA\'s AI-LCA procurement architecture, successfully navigating complex technical and business challenges',
      how: 'Led cross-functional team, developed product vision, secured initial funding, and built strategic partnerships with industry leaders',
      outcome: 'Successfully brought product to market, onboarded first customers, and positioned company for growth in sustainable tech sector',
      images: ['/images/engineering/ajna-1.jpg', '/images/engineering/ajna-2.jpg'],
      keyTakeaway: 'Building a startup requires resilience, adaptability, and unwavering commitment to your vision.',
      keyTakeawayAudio: '/audio/ajna-takeaway.mp3',
      link: 'https://ajnamaterials.com',
      startDate: 'September 2022',
      endDate: 'April 2023',
      category: 'research'
    }, 
     {
      title: 'Senior Thesis Researcher',
      organization: 'University of Toronto Baja SAE',
      description: 'Founded and leading AJNA, a startup focused on AI-powered life cycle assessment and sustainable procurement solutions.',
      skills: ['Leadership', 'Product Strategy', 'AI/ML', 'Sustainability', 'Business Development'],
      achieved: 'Designed and launched AJNA\'s AI-LCA procurement architecture, successfully navigating complex technical and business challenges',
      how: 'Led cross-functional team, developed product vision, secured initial funding, and built strategic partnerships with industry leaders',
      outcome: 'Successfully brought product to market, onboarded first customers, and positioned company for growth in sustainable tech sector',
      images: ['/images/engineering/ajna-1.jpg', '/images/engineering/ajna-2.jpg'],
      keyTakeaway: 'Building a startup requires resilience, adaptability, and unwavering commitment to your vision.',
      keyTakeawayAudio: '/audio/ajna-takeaway.mp3',
      link: 'https://ajnamaterials.com',
      startDate: 'January 2025',
      endDate: 'April 2025',
      category: 'research'
    }, 
     {
      title: 'Technical Co-Founder',
      organization: 'HER2HER',
      description: 'Founded and leading AJNA, a startup focused on AI-powered life cycle assessment and sustainable procurement solutions.',
      skills: ['Leadership', 'Product Strategy', 'AI/ML', 'Sustainability', 'Business Development'],
      achieved: 'Designed and launched AJNA\'s AI-LCA procurement architecture, successfully navigating complex technical and business challenges',
      how: 'Led cross-functional team, developed product vision, secured initial funding, and built strategic partnerships with industry leaders',
      outcome: 'Successfully brought product to market, onboarded first customers, and positioned company for growth in sustainable tech sector',
      images: ['/images/engineering/ajna-1.jpg', '/images/engineering/ajna-2.jpg'],
      keyTakeaway: 'Building a startup requires resilience, adaptability, and unwavering commitment to your vision.',
      keyTakeawayAudio: '/audio/ajna-takeaway.mp3',
      link: 'https://ajnamaterials.com',
      startDate: 'January 2025',
      endDate: 'August 2025',
      category: 'work'
    },
 {
      title: 'Operations Engineer',
      organization: 'Bombardier Aerospace',
      description: 'Founded and leading AJNA, a startup focused on AI-powered life cycle assessment and sustainable procurement solutions.',
      skills: ['Leadership', 'Product Strategy', 'AI/ML', 'Sustainability', 'Business Development'],
      achieved: 'Designed and launched AJNA\'s AI-LCA procurement architecture, successfully navigating complex technical and business challenges',
      how: 'Led cross-functional team, developed product vision, secured initial funding, and built strategic partnerships with industry leaders',
      outcome: 'Successfully brought product to market, onboarded first customers, and positioned company for growth in sustainable tech sector',
      images: ['/images/engineering/ajna-1.jpg', '/images/engineering/ajna-2.jpg'],
      keyTakeaway: 'Building a startup requires resilience, adaptability, and unwavering commitment to your vision.',
      keyTakeawayAudio: '/audio/ajna-takeaway.mp3',
      link: 'https://ajnamaterials.com',
      startDate: 'May 2023',
      endDate: 'September 2023',
      category: 'work'
    },
  {
      title: 'Supply Chain Engineering Intern',
      organization: 'Bombardier Aerospace',
      description: 'Founded and leading AJNA, a startup focused on AI-powered life cycle assessment and sustainable procurement solutions.',
      skills: ['Leadership', 'Product Strategy', 'AI/ML', 'Sustainability', 'Business Development'],
      achieved: 'Designed and launched AJNA\'s AI-LCA procurement architecture, successfully navigating complex technical and business challenges',
      how: 'Led cross-functional team, developed product vision, secured initial funding, and built strategic partnerships with industry leaders',
      outcome: 'Successfully brought product to market, onboarded first customers, and positioned company for growth in sustainable tech sector',
      images: ['/images/engineering/ajna-1.jpg', '/images/engineering/ajna-2.jpg'],
      keyTakeaway: 'Building a startup requires resilience, adaptability, and unwavering commitment to your vision.',
      keyTakeawayAudio: '/audio/ajna-takeaway.mp3',
      link: 'https://ajnamaterials.com',
      startDate: 'September 2021',
      endDate: 'January 2022',
      category: 'work'
    },
  {
      title: 'Fashion Model',
      organization: 'Bombardier Aerospace',
      description: 'Founded and leading AJNA, a startup focused on AI-powered life cycle assessment and sustainable procurement solutions.',
      skills: ['Leadership', 'Product Strategy', 'AI/ML', 'Sustainability', 'Business Development'],
      achieved: 'Designed and launched AJNA\'s AI-LCA procurement architecture, successfully navigating complex technical and business challenges',
      how: 'Led cross-functional team, developed product vision, secured initial funding, and built strategic partnerships with industry leaders',
      outcome: 'Successfully brought product to market, onboarded first customers, and positioned company for growth in sustainable tech sector',
      images: ['/images/engineering/ajna-1.jpg', '/images/engineering/ajna-2.jpg'],
      keyTakeaway: 'Building a startup requires resilience, adaptability, and unwavering commitment to your vision.',
      keyTakeawayAudio: '/audio/ajna-takeaway.mp3',
      link: 'https://ajnamaterials.com',
      startDate: 'September 2020',
      endDate: 'Current',
      category: 'work'
    },
  {
      title: 'Art Freelance',
      organization: 'Bombardier Aerospace',
      description: 'Founded and leading AJNA, a startup focused on AI-powered life cycle assessment and sustainable procurement solutions.',
      skills: ['Leadership', 'Product Strategy', 'AI/ML', 'Sustainability', 'Business Development'],
      achieved: 'Designed and launched AJNA\'s AI-LCA procurement architecture, successfully navigating complex technical and business challenges',
      how: 'Led cross-functional team, developed product vision, secured initial funding, and built strategic partnerships with industry leaders',
      outcome: 'Successfully brought product to market, onboarded first customers, and positioned company for growth in sustainable tech sector',
      images: ['/images/engineering/ajna-1.jpg', '/images/engineering/ajna-2.jpg'],
      keyTakeaway: 'Building a startup requires resilience, adaptability, and unwavering commitment to your vision.',
      keyTakeawayAudio: '/audio/ajna-takeaway.mp3',
      link: 'https://ajnamaterials.com',
      startDate: 'January 2021',
      endDate: 'Current',
      category: 'work'
    },
  {
      title: 'Assistant Coach',
      organization: 'Bombardier Aerospace',
      description: 'Founded and leading AJNA, a startup focused on AI-powered life cycle assessment and sustainable procurement solutions.',
      skills: ['Leadership', 'Product Strategy', 'AI/ML', 'Sustainability', 'Business Development'],
      achieved: 'Designed and launched AJNA\'s AI-LCA procurement architecture, successfully navigating complex technical and business challenges',
      how: 'Led cross-functional team, developed product vision, secured initial funding, and built strategic partnerships with industry leaders',
      outcome: 'Successfully brought product to market, onboarded first customers, and positioned company for growth in sustainable tech sector',
      images: ['/images/engineering/ajna-1.jpg', '/images/engineering/ajna-2.jpg'],
      keyTakeaway: 'Building a startup requires resilience, adaptability, and unwavering commitment to your vision.',
      keyTakeawayAudio: '/audio/ajna-takeaway.mp3',
      link: 'https://ajnamaterials.com',
      startDate: 'August 2025',
      endDate: 'Current',
      category: 'work'
    },
{
      title: 'Varisty Board Member & Womens Team Captain',
      organization: 'University of Toronto Baja SAE',
      description: 'Founded and leading AJNA, a startup focused on AI-powered life cycle assessment and sustainable procurement solutions.',
      skills: ['Leadership', 'Product Strategy', 'AI/ML', 'Sustainability', 'Business Development'],
      achieved: 'Designed and launched AJNA\'s AI-LCA procurement architecture, successfully navigating complex technical and business challenges',
      how: 'Led cross-functional team, developed product vision, secured initial funding, and built strategic partnerships with industry leaders',
      outcome: 'Successfully brought product to market, onboarded first customers, and positioned company for growth in sustainable tech sector',
      images: ['/images/engineering/ajna-1.jpg', '/images/engineering/ajna-2.jpg'],
      keyTakeaway: 'Building a startup requires resilience, adaptability, and unwavering commitment to your vision.',
      keyTakeawayAudio: '/audio/ajna-takeaway.mp3',
      link: 'https://ajnamaterials.com',
      startDate: 'August 2019',
      endDate: 'April 2023',
      category: 'extracurricular'
    }, 
     {
      title: 'Biomedical Engineering Board Member',
      organization: 'University of Toronto Baja SAE',
      description: 'Founded and leading AJNA, a startup focused on AI-powered life cycle assessment and sustainable procurement solutions.',
      skills: ['Leadership', 'Product Strategy', 'AI/ML', 'Sustainability', 'Business Development'],
      achieved: 'Designed and launched AJNA\'s AI-LCA procurement architecture, successfully navigating complex technical and business challenges',
      how: 'Led cross-functional team, developed product vision, secured initial funding, and built strategic partnerships with industry leaders',
      outcome: 'Successfully brought product to market, onboarded first customers, and positioned company for growth in sustainable tech sector',
      images: ['/images/engineering/ajna-1.jpg', '/images/engineering/ajna-2.jpg'],
      keyTakeaway: 'Building a startup requires resilience, adaptability, and unwavering commitment to your vision.',
      keyTakeawayAudio: '/audio/ajna-takeaway.mp3',
      link: 'https://ajnamaterials.com',
      startDate: 'September 2021',
      endDate: 'April 2022',
      category: 'design-team'
    }, 
     {
      title: 'Frosh Leader',
      organization: 'University of Toronto Baja SAE',
      description: 'Founded and leading AJNA, a startup focused on AI-powered life cycle assessment and sustainable procurement solutions.',
      skills: ['Leadership', 'Product Strategy', 'AI/ML', 'Sustainability', 'Business Development'],
      achieved: 'Designed and launched AJNA\'s AI-LCA procurement architecture, successfully navigating complex technical and business challenges',
      how: 'Led cross-functional team, developed product vision, secured initial funding, and built strategic partnerships with industry leaders',
      outcome: 'Successfully brought product to market, onboarded first customers, and positioned company for growth in sustainable tech sector',
      images: ['/images/engineering/ajna-1.jpg', '/images/engineering/ajna-2.jpg'],
      keyTakeaway: 'Building a startup requires resilience, adaptability, and unwavering commitment to your vision.',
      keyTakeawayAudio: '/audio/ajna-takeaway.mp3',
      link: 'https://ajnamaterials.com',
      startDate: 'July 2023',
      endDate: 'September 2023',
      category: 'design-team'
    }, 
  {
      title: 'Olympic Trials 2020',
      organization: 'Bombardier Aerospace',
      description: 'Founded and leading AJNA, a startup focused on AI-powered life cycle assessment and sustainable procurement solutions.',
      skills: ['Leadership', 'Product Strategy', 'AI/ML', 'Sustainability', 'Business Development'],
      achieved: 'Designed and launched AJNA\'s AI-LCA procurement architecture, successfully navigating complex technical and business challenges',
      how: 'Led cross-functional team, developed product vision, secured initial funding, and built strategic partnerships with industry leaders',
      outcome: 'Successfully brought product to market, onboarded first customers, and positioned company for growth in sustainable tech sector',
      images: ['/images/engineering/ajna-1.jpg', '/images/engineering/ajna-2.jpg'],
      keyTakeaway: 'Building a startup requires resilience, adaptability, and unwavering commitment to your vision.',
      keyTakeawayAudio: '/audio/ajna-takeaway.mp3',
      link: 'https://ajnamaterials.com',
      startDate: 'December 2019',
      endDate: 'December 2019',
      category: 'extracurricular'
    },
  {
      title: 'Olympic Trials 2024',
      organization: 'Bombardier Aerospace',
      description: 'Founded and leading AJNA, a startup focused on AI-powered life cycle assessment and sustainable procurement solutions.',
      skills: ['Leadership', 'Product Strategy', 'AI/ML', 'Sustainability', 'Business Development'],
      achieved: 'Designed and launched AJNA\'s AI-LCA procurement architecture, successfully navigating complex technical and business challenges',
      how: 'Led cross-functional team, developed product vision, secured initial funding, and built strategic partnerships with industry leaders',
      outcome: 'Successfully brought product to market, onboarded first customers, and positioned company for growth in sustainable tech sector',
      images: ['/images/engineering/ajna-1.jpg', '/images/engineering/ajna-2.jpg'],
      keyTakeaway: 'Building a startup requires resilience, adaptability, and unwavering commitment to your vision.',
      keyTakeawayAudio: '/audio/ajna-takeaway.mp3',
      link: 'https://ajnamaterials.com',
      startDate: 'December 2023',
      endDate: 'December 2023',
      category: 'extracurricular'
    },
  {
      title: 'U23 World Championships 2022',
      organization: 'Bombardier Aerospace',
      description: 'Founded and leading AJNA, a startup focused on AI-powered life cycle assessment and sustainable procurement solutions.',
      skills: ['Leadership', 'Product Strategy', 'AI/ML', 'Sustainability', 'Business Development'],
      achieved: 'Designed and launched AJNA\'s AI-LCA procurement architecture, successfully navigating complex technical and business challenges',
      how: 'Led cross-functional team, developed product vision, secured initial funding, and built strategic partnerships with industry leaders',
      outcome: 'Successfully brought product to market, onboarded first customers, and positioned company for growth in sustainable tech sector',
      images: ['/images/engineering/ajna-1.jpg', '/images/engineering/ajna-2.jpg'],
      keyTakeaway: 'Building a startup requires resilience, adaptability, and unwavering commitment to your vision.',
      keyTakeawayAudio: '/audio/ajna-takeaway.mp3',
      link: 'https://ajnamaterials.com',
      startDate: 'September 2022',
      endDate: 'October 2022',
      category: 'extracurricular'
    },
  {
      title: 'University Sports Championships 2020',
      organization: 'Bombardier Aerospace',
      description: 'Founded and leading AJNA, a startup focused on AI-powered life cycle assessment and sustainable procurement solutions.',
      skills: ['Leadership', 'Product Strategy', 'AI/ML', 'Sustainability', 'Business Development'],
      achieved: 'Designed and launched AJNA\'s AI-LCA procurement architecture, successfully navigating complex technical and business challenges',
      how: 'Led cross-functional team, developed product vision, secured initial funding, and built strategic partnerships with industry leaders',
      outcome: 'Successfully brought product to market, onboarded first customers, and positioned company for growth in sustainable tech sector',
      images: ['/images/engineering/ajna-1.jpg', '/images/engineering/ajna-2.jpg'],
      keyTakeaway: 'Building a startup requires resilience, adaptability, and unwavering commitment to your vision.',
      keyTakeawayAudio: '/audio/ajna-takeaway.mp3',
      link: 'https://ajnamaterials.com',
      startDate: 'March 2020',
      endDate: 'March 2020',
      category: 'extracurricular'
    },
 {
      title: 'University Sports Championships 2023',
      organization: 'Bombardier Aerospace',
      description: 'Founded and leading AJNA, a startup focused on AI-powered life cycle assessment and sustainable procurement solutions.',
      skills: ['Leadership', 'Product Strategy', 'AI/ML', 'Sustainability', 'Business Development'],
      achieved: 'Designed and launched AJNA\'s AI-LCA procurement architecture, successfully navigating complex technical and business challenges',
      how: 'Led cross-functional team, developed product vision, secured initial funding, and built strategic partnerships with industry leaders',
      outcome: 'Successfully brought product to market, onboarded first customers, and positioned company for growth in sustainable tech sector',
      images: ['/images/engineering/ajna-1.jpg', '/images/engineering/ajna-2.jpg'],
      keyTakeaway: 'Building a startup requires resilience, adaptability, and unwavering commitment to your vision.',
      keyTakeawayAudio: '/audio/ajna-takeaway.mp3',
      link: 'https://ajnamaterials.com',
      startDate: 'March 2023',
      endDate: 'March 2023',
      category: 'extracurricular'
    },
  ];

  // Calculate the total height needed (96 months from Jan 2018 to Dec 2025)
  const totalHeight = timelineMonths.length * 60;

  // Calculate bar offsets and opacities to prevent overlap
  const projectsWithPositioning = allProjects.map((project, idx) => {
    const startMonth = parseDate(project.startDate || '');
    const endDateLower = project.endDate?.toLowerCase();
    const endMonth = (endDateLower === 'present' || endDateLower === 'current')
      ? timelineMonths.length - 1
      : parseDate(project.endDate || '');
    const durationMonths = Math.max(1, endMonth - startMonth);

    // Reverse the position (Dec 2025 at top = 0, Sep 2018 at bottom)
    const reversedStartMonth = timelineMonths.length - 1 - endMonth;
    const absoluteTop = reversedStartMonth * 60;

    // For education and current cards, card position is at END (absoluteTop)
    // For regular cards, card position is at START (absoluteTop + duration)
    const positionAtEnd = project.category === 'education' || project.category === 'current';
    const cardPosition = positionAtEnd ? absoluteTop : absoluteTop + (durationMonths * 60);

    return {
      project,
      startMonth: reversedStartMonth,
      durationMonths,
      barOffset: idx % 4, // Cycle through 4 positions
      opacity: 0.6 + (idx % 5) * 0.1, // Vary opacity from 0.6 to 1.0
      cardIndex: idx,
      absoluteTop, // Absolute position in pixels
      cardPosition, // Where the card actually appears
    };
  });

  // Sort by card position and add vertical offset for overlapping cards
  const CARD_HEIGHT = 200; // Approximate height of collapsed card
  const sortedByPosition = [...projectsWithPositioning].sort((a, b) => a.cardPosition - b.cardPosition);

  // Track adjusted positions to prevent overlap
  const adjustedPositions: { cardPosition: number; adjustedTop: number }[] = [];

  type ProjectWithOffset = typeof projectsWithPositioning[0] & { horizontalOffset: number; adjustedTop: number };
  const projectsWithOffsets: ProjectWithOffset[] = sortedByPosition.map((item) => {
    let adjustedTop = item.cardPosition;

    // Check if this card overlaps with any previous card
    for (const prev of adjustedPositions) {
      if (Math.abs(adjustedTop - prev.adjustedTop) < CARD_HEIGHT) {
        // Push this card down to avoid overlap
        adjustedTop = prev.adjustedTop + CARD_HEIGHT;
      }
    }

    adjustedPositions.push({ cardPosition: item.cardPosition, adjustedTop });

    return {
      ...item,
      horizontalOffset: 0,
      adjustedTop,
    };
  });

  // Calculate the actual height needed based on the last card's position
  const maxCardPosition = Math.max(...projectsWithOffsets.map(p => p.adjustedTop)) + CARD_HEIGHT + 100;
  const actualTimelineHeight = Math.max(maxCardPosition, totalHeight);

  return (
    <main className="min-h-screen bg-black text-white pb-20">
      <ProjectNav title="KIRTI SAXENA" />
      <div className="pt-32 px-8 max-w-7xl mx-auto">
        <ProjectHeader
          title="My Engineering Journey"
          date="Updated November 2025"
          category="Technical Portfolio"
        />

        {/* Blurb Section */}
        <div className="mb-16 max-w-4xl mx-auto">
          <p className="text-gray-300 text-lg leading-relaxed">
            From academic research to leading tech teams at Fortune 500 companies, my engineering journey has been driven by curiosity and a passion for solving complex problems. This timeline showcases the milestones that have shaped my career—from groundbreaking research projects to building scalable systems used by millions.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-64" style={{ minHeight: `${actualTimelineHeight}px` }}>
          {/* White Central Vertical Line */}
          <div
            className="absolute top-0 w-1 bg-white shadow-lg shadow-white/30"
            style={{
              left: '250px',
              height: `${actualTimelineHeight}px`,
              zIndex: 5,
            }}
          />


          {/* Project Cards with Duration Bars - stacked vertically */}
          <div className="relative ml-24">
            {projectsWithOffsets.map((item, idx) => (
              <ProjectDropdown
                key={idx}
                project={item.project}
                startMonth={item.startMonth}
                durationMonths={item.durationMonths}
                barOffset={item.barOffset}
                opacity={item.opacity}
                cardIndex={item.cardIndex}
                absoluteTop={item.absoluteTop}
                horizontalOffset={item.horizontalOffset}
                adjustedTop={item.adjustedTop}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
