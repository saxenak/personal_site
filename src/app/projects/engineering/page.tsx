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

// Mobile-friendly card component
const MobileProjectCard = ({ project, categoryColor }: {
  project: Project;
  categoryColor: { glow: string; border: string; label: string };
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className="border-2 rounded-lg bg-black"
      style={{
        borderColor: categoryColor.border,
        boxShadow: `0 0 15px ${categoryColor.glow}`,
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 text-left"
      >
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-lg font-semibold" dangerouslySetInnerHTML={{ __html: project.title }} />
            {project.organization && (
              <p className="text-gray-500 text-sm mt-1">{project.organization}</p>
            )}
            {project.school && (
              <p className="text-gray-500 text-sm mt-1">{project.school}</p>
            )}
            {(project.startDate || project.endDate) && (
              <p className="text-xs mt-1" style={{ color: categoryColor.border }}>
                {project.startDate} {project.endDate && `— ${project.endDate}`}
              </p>
            )}
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            className="text-gray-400 text-xl ml-2"
          >
            ↓
          </motion.div>
        </div>
      </button>

      <motion.div
        initial={false}
        animate={{ height: isExpanded ? 'auto' : 0 }}
        className="overflow-hidden"
      >
        <div className="p-4 pt-0 border-t border-gray-800">
          {project.description && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-300 mb-1">Description:</h4>
              <p className="text-gray-400 text-sm">{project.description}</p>
            </div>
          )}

          {project.skills && project.skills.length > 0 && (
            <div className="mb-4">
              <h4 className="text-xs font-semibold text-gray-400 mb-2">SKILLS</h4>
              <div className="flex flex-wrap gap-1">
                {project.skills.map((skill) => (
                  <span key={skill} className="px-2 py-0.5 bg-gray-800 text-gray-300 rounded-full text-xs">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {project.achieved && (
            <div className="mb-3">
              <h4 className="text-sm font-semibold text-gray-300 mb-1">Achieved:</h4>
              <p className="text-gray-400 text-sm">{project.achieved}</p>
            </div>
          )}

          {project.how && (
            <div className="mb-3">
              <h4 className="text-sm font-semibold text-gray-300 mb-1">How:</h4>
              <p className="text-gray-400 text-sm">{project.how}</p>
            </div>
          )}

          {project.outcome && (
            <div className="mb-3">
              <h4 className="text-sm font-semibold text-gray-300 mb-1">Outcome:</h4>
              <p className="text-gray-400 text-sm">{project.outcome}</p>
            </div>
          )}

          {project.images && project.images.length > 0 && (
            <div className="grid grid-cols-2 gap-2 mb-3">
              {project.images.map((image, idx) => (
                <Image
                  key={idx}
                  src={image}
                  alt={`${project.title} - Image ${idx + 1}`}
                  width={300}
                  height={200}
                  className="rounded-lg object-contain w-full h-auto"
                />
              ))}
            </div>
          )}

          {project.keyTakeaway && (
            <div className="mb-3">
              <h4 className="text-sm font-semibold text-gray-300 mb-1">Key Takeaway:</h4>
              <p className="text-gray-400 text-sm italic">{project.keyTakeaway}</p>
            </div>
          )}

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm underline mt-2"
              style={{ color: categoryColor.border }}
            >
              Learn more →
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
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

          {/* Description */}
          {project.description && (
            <div className="mb-6 mt-2">
              <h4 className="text-base font-semibold text-gray-300 mb-2">Description:</h4>
              <p className="text-gray-400 text-base leading-relaxed">{project.description}</p>
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

          {project.images.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {project.images.map((image, idx) => (
                <div key={idx} className="relative group">
                  <Image
                    src={image}
                    alt={`${project.title} - Image ${idx + 1}`}
                    width={600}
                    height={450}
                    className="rounded-lg object-contain w-full h-auto group-hover:shadow-lg transition-shadow"
                  />
                </div>
              ))}
            </div>
          )}

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
      school: 'University of Toronto [2018 -- 2025]',
      major: 'Mechanical Engineering',
      awards: [
        'Lisa Anne Hamman (2020 & 2022)',
        'C. William Daniels Award (2021)',
        'Varsity Blues Diamond Award (2023)'
      ],
      extracurriculars: [
        'Womens Varsity Wrestling Team Captain & Varsity Board Member (2019-2023)',
        'Frosh Leader (2023)',
        'Outreach Director for the Biomedical Engineering Board (2021-2022)'
      ],
      academicHighlights: [
        'University of Toronto Autonomous Rover Team (2019-2023)',
        'University of Toronto BAJA SAE Team (2018-2020)',
        'Machine Learning Research on Pneumonia Detection (2023)',
        'Capstone Design Project on Cold Spray Coatings (2023)',
        'Senior Thesis on PDMS Coatings on Recyclable PET (2025)'
      ],
      images: ['/images/engineering/ajna-g1.JPG', '/images/engineering/ajna-g2.png'],
      startDate: 'Sep 2018',
      endDate: 'June 2025',
      category: 'education'
    },
    {
      title: 'CEO & Founder',
      organization: 'AJNA Materials [May 2025 -- Present • Toronto]',
      description: 'Founded and leading AJNA, a startup focused on AI-powered life cycle assessment and sustainable procurement solutions.',
      skills: ['CEO', 'Product Strategy', 'AI/ML', 'Sustainable Systems Design', 'Business Development', 'React', 'Python', 'JavaScript', 'Human Centered Design', 'Marketplace Development', 'AWS Console'],
      achieved: 'Designed and launched AJNA\'s AI-LCA procurement architecture, successfully navigating complex technical and business challenges.',
      how: 'Led cross-functional team, developed product vision, and built strategic partnerships with industry leaders.',
      outcome: 'Successfully brought product to market, onboarded first customers, and positioned company for growth in sustainable tech sector.',
      images: ['/images/engineering/ajna-1.png', '/images/engineering/ajna-2.png'],
      keyTakeaway: 'Building a startup requires resilience, adaptability, and unwavering commitment to your vision.',
      keyTakeawayAudio: '/audio/ajna-takeaway.mp3',
      link: 'https://ajnamaterials.com',
      startDate: 'August 2025',
      endDate: 'Present',
      category: 'current'
    },
   {
      title: 'Technical Co-Founder',
      organization: 'HER2HER [January 2025 -- September 2025 • Toronto]',
      description: 'Focussed on product development of an at home saliva based tool that tests for breast cancer biomarkers.',
      skills: ['CTO', 'Research and Development','Technical Product Strategy', 'AI/ML', 'Biosensor Technology', 'Revenue Strategy', 'Micro-Controller Programming'],
      achieved: 'Researched and prototyped a saliva based breast cancer detection tool. Next steps involve clinical trials and regulatory approval.',
      how: 'Led cross-functional team, developed product vision, and finalized research while being apart of the University of Toronto\'s Accelerators (Hatchery & H2i).',
      outcome: 'Successfully protyped the product and developed a fluid connection between amplification methods and micro-controller processing. Participated in pitch competitions and gained initial traction.',
      images: ['/images/engineering/HER2HER1.png', '/images/engineering/HER2HER2.png'],
      keyTakeaway: 'Building a hardware start-up with a solution that does not exist and comes purely from research is challenging but so rewarding when you see it come to life.',
      keyTakeawayAudio: '/audio/ajna-takeaway.mp3',
      link: '/pdfs/engineering/HER2HER.pdf',
      startDate: 'January 2025',
      endDate: 'August 2025',
      category: 'work'
    },
   {
      title: 'R&D Engineering Intern',
      organization: 'Seaspan ULC [September 2024 -- January 2025 • Vancouver]',
      description: 'Researched autonomous robotic systems for ship inspection and welding tasks. Worked on the backend of Digital Twin software called Digital Ship.',
      skills: ['Autonomous Robotics', 'AI/ML', 'Python', 'JavaScript', 'HTML', 'Research and Development', 'Digital Twin Software', 'Mechanical Design'],
      achieved: 'Researched and reccomended manufacturing and in water robotic systems. Analyzed each robots functions, how implementation would work on a technical and business level as well as the quotes provided by companies. Worked on data processing the main dataset of Digital Ship to improve for launch.',
      how: 'Processed and assigned data types and conducted server database migration to improve software performance. Focussed on welding, painting and inspection robots to be implemented on the floor.',
      outcome: 'Successfully improved Digital Ship\'s performance and reccomended autonomous systems for Seaspan to invest in for future manufacturing and in water tasks.',
      images: ['/images/engineering/seaspan1.png', '/images/engineering/seaspan2.png'],
      keyTakeaway: 'Being able to research and recommend new technology for a traditional industry like shipbuilding showed me the importance of innovation and adaptability in engineering. The future of manufacturing is autonomous and digital, and being able to be part of that transition was an invaluable experience.',
      keyTakeawayAudio: '/audio/ajna-takeaway.mp3',
      link: '/pdfs/engineering/SeaspanReport.pdf',
      startDate: 'September 2024',
      endDate: 'January 2025',
      category: 'work'
    },
   {
      title: 'Cell Manufacturing Engineering Intern',
      organization: 'Tesla Inc. [September 2023 -- June 2024 • Austin]',
      description: 'Worked within the Cell Manufacturing Assembly Line and helped the deployment of a new production line for the Cybertruck battery cells.',
      skills: ['Battery Cell Engineering', 'Manufacturing Line Deployment', 'AI/ML', 'Tableau Dashboards','EV Vehicles', 'Technical Program Managememnt', 'Mechanical Design Optimization'],
      achieved: 'Deployed a new production line for the Cybertruck battery cells, successfully navigating complex technical and logistical challenges. ',
      how: 'Processed data from the manufacturing line to optimize performance by making Tableau dashboards for real-time monitoring. Worked on mechanical design changes to improve assembly line efficiency and reduce downtime.',
      outcome: 'Successfully launched the Cybertruck battery cell production line, contributing to Tesla\'s ability to meet increasing demand for electric vehicles.', 
      images: ['/images/engineering/ajna-t1.png', '/images/engineering/ajna-t2.png'],
      keyTakeaway: 'Working at Tesla taught me that time means everything. Whatever reduces time is worth investing in, as in the long-term, the benefit outweighs the cost.',
      keyTakeawayAudio: '/audio/ajna-takeaway.mp3',
      link: 'https://www.tesla.com/manufacturing',
      startDate: 'September 2023',
      endDate: 'June 2024',
      category: 'work'
    },
   {
      title: 'Technical Project Manager',
      organization: 'UofT Robotics Association [June 2019 -- June 2023 • Toronto]',
      description: 'Led the build of an autonomous rover and specifically assisted with lane navigation and and object detection tasks.',
      skills: ['Leadership', 'Autonomous Vehicles', 'OpenCV', 'Python', 'ROS', 'Ardunio', 'PCB Design', 'Teaching'],
      achieved: 'Placed 1st in IGVC 2023 for the International University division, successfully leading an on-site team of 15 and off-site team of over 70 members through design, build, and testing phases.',
      how: 'Managed the Computer Vision, Electrical, Mechanical and ROS teams. Coordinated project timelines, and facilitated collaboration among team members to ensure successful project completion. Focussed on perfecting the lane navigation and object detection algorithms using OpenCV and ROS.',
      outcome: 'Managed to make the rover run the course autonomously for about 70% of the time',
      images: ['/images/engineering/ajna-u1.png', '/images/engineering/ajna-u2.png'],
      keyTakeaway: ' I joined UTRA as a way to learn more about robotics and autonomous systems. As a mechanical engineering undergradute student, I wanted to expand my knowledge in areas of engineering that I was less familiar with. I first started off of on the electrical team of the rover, working on PCB circuit design. I then moved to software, and realized I loved Computer Vision. From there, I worked my way up to eventually leading the entire project as Technical Project Manager. This experience taught me the importance of effective communication, delegation, and adaptability in leading a successful engineering project. It was also one of the most rewarding experiences of my undergraduate career because I stuck with a design team for multiple years and saw the growth of both myself and the team.',
      keyTakeawayAudio: '/audio/ajna-takeaway.mp3',
      link: '/pdfs/engineering/UTRA.pdf',
      startDate: 'June 2019',
      endDate: 'June 2023',
      category: 'design-team'
    },
     {
      title: 'Mechanical Engineer',
      organization: 'UofT Baja SAE [September 2018 -- September 2020 • Toronto]',
      description: 'Worked on the design of an off-road vehicles for the Baja SAE competition.',
      skills: ['Electrical Circuits and Signals', 'Pneumatic Breaks', 'Mechanical Design', 'CAD', 'Safety Standards', 'Insulation and Vibration Analysis'],
      achieved: 'Designed and implemented the braking system and electrical circuits for headlights and backlights for the vehicle, ensuring compliance with safety standards and competition regulations.', 
      how: 'Developed the brakes on CAD, selected appropriate materials, and conducted simulations to validate performance under various conditions. Designed electrical circuits for lighting systems, ensuring reliability and efficiency.',
      outcome: 'Succesfully passed all technical inspections and contributed to the vehicle\'s overall performance in the competition.', 
      images: ['/images/engineering/ajna-ba1.png', '/images/engineering/ajna-ba2.png'],
      keyTakeaway: 'Building a moving vehicle from scratch is a challenging but rewarding experience. It requires a deep understanding of mechanical systems, attention to detail, and the ability to work effectively in a team environment. I realized from this experience that I am not a grease monkey and prefer design and management roles within engineering projects.', 
      keyTakeawayAudio: '/audio/ajna-takeaway.mp3',
      link: 'https://www.facebook.com/UofTBaja/',
      startDate: 'September 2018',
      endDate: 'September 2020',
      category: 'design-team'
    }, 
     {
      title: 'Machine Learning Engineer',
      organization: 'Pneumonia Research Project [May 2023 -- August 2023 • Toronto]',
      description: 'Created a pneumonia detection algorithm using a binary classification model trained on chest x-ray images.',
      skills: ['AI/ML', 'Image Classification', 'Predictative Models', 'Python', 'TensorFlow', 'GoogLeNet','Data Analysis and Visualization'],
      achieved: 'Developed and trained a convolutional neural network (CNN) model achieving over 90% accuracy in detecting pneumonia from chest x-ray images.',
      how: 'Utilized TensorFlow and GoogLeNet to build the CNN architecture, preprocess the image dataset, and implement data augmentation techniques to enhance model robustness.',
      outcome: 'Achieved an accuracy of 95% and reliability in pneumonia detection, demonstrating the potential of AI in medical diagnostics and contributing to improved patient outcomes.',
      images: ['/images/engineering/ajna-pd1.png', '/images/engineering/ajna-pd2.png'],
      keyTakeaway: 'Building effective machine learning models requires a deep understanding of both the technical aspects and the real-world applications. Specifically within healthcare, where there are high stakes involved, ethically sourced data and rigorous validation is crucial.',
      keyTakeawayAudio: '/audio/ajna-takeaway.mp3',
      link: '/pdfs/engineering/PnemoniaDetection.pdf',
      startDate: 'May 2023',
      endDate: 'August 2023',
      category: 'research'
    }, 
     {
      title: 'Capstone Engineering Design',
      organization: 'C.A.C.T Lab [September 2022 -- April 2023 • Toronto]',
      description: 'Developed a Schlierian System to analyze cold spray surface coatings accuracy on various substrates. Apart of the Advanced Coatings and Surface Treatments (C.A.C.T) Lab at the University of Toronto.',
      skills: ['Surface Coatings', 'Schlierian System', 'Light Refraction', 'Image Analysis', 'Fresnel Equations', 'Laboratory Research', 'Matlab', 'Soldering and Welding'],
      achieved: 'Built a Schlierian System capable of detecting coating thickness variations as small as 10 micrometers on different substrates.',
      how: 'Helped analyze and design the optical setup, mechanically made and assembled the system, and developed image processing algorithms to quantify coating uniformity using Fresnel equations.',
      outcome: 'Successfully was able to see the outcome of different cold spray coatings on various substrates and analyze their thickness variations.', 
      images: ['/images/engineering/ajna-cp1.png', '/images/engineering/ajna-cp2.png'],
      keyTakeaway: 'When I started this research thesis on surface coatings, I thought the actual experiment would be easy to complete. I then realized that small adjusments in the optical setup could drastically change the results. Patience and attention to detail was key, and we as a team iterated on the actual setup of the design many times before getting usable results.',
      keyTakeawayAudio: '/audio/ajna-takeaway.mp3',
      link: '/pdfs/engineering/Capstone.pdf',
      startDate: 'September 2022',
      endDate: 'April 2023',
      category: 'research'
    }, 
     {
      title: 'Senior Thesis Researcher',
      organization: 'D.R.E.A.M Lab - Sustainable Material Innovation [2025 • Toronto]',
      description: ' Assessing the recyclability of polyethylene terephthalate when treated with an advanced coating.',
      skills: ['Sustainable Materials', 'Recyclable Materials', 'Life Cycle Assessment', 'Laboratory Research', 'FTIR', 'Hot-Pressing', 'Tensile Testing', 'Python'],
      achieved: 'The coating successfully did not alter PET’s chemical backbone, although it may have contributed to polymer chain scission.',
      how:'Mechanically manipulated the PET samples with and without the coating, and then analyzed the results using FTIR and Tensile Testing techniques.',
      outcome: 'Found uncoated PET samples to exhibit a higher tensile strength compared to coated PET samples, although the crystalline structure remained intact.',
      images: ['/images/engineering/PET1.png', '/images/engineering/PET2.png'],
      keyTakeaway: 'Research is unpredictable and often leads to unexpected results, but it is essential to remain open-minded and persistent in your research. A negative outcomes is still a new finding.',
      keyTakeawayAudio: '/audio/ajna-takeaway.mp3',
      link: '/pdfs/engineering/SeniorThesis.pdf',
      startDate: 'January 2025',
      endDate: 'April 2025',
      category: 'research'
    },  
 {
      title: 'Operations Engineer',
      organization: 'Bombardier Aerospace [May 2023 -- September 2023 • Toronto]',
      description: 'Created the transition plan of a manufacturing plant to a destination 21 kilometres away. Facilitating reimbursements from suppliers due to late deliveries and damages.',
      skills: ['Leadership', 'Strategy Planning', 'Microsoft Excel', 'Microsoft Power BI', 'Aircraft Design', 'Financial Analysis', 'FMEA', 'SQL', 'Python'],
      achieved: 'Facilitated supplier reimbursements worth over $500,000 by conducting detailed damage assessments and negotiating effectively with suppliers. Successfully planned out moving two active aircraft assembly lines.',
      how: 'Used Microsoft excel and project to track and plan. Used FMEA to identify potential risks and develop mitigation strategies during the transition. Collaborated with cross-functional teams to ensure a smooth move with minimal disruption to production schedules.',
      outcome: 'The plant move happened on time and on budget with minimal production downtime. Gained reimbursement with suppliers through effective communication and proof of damages, resulting in improved future collaboration.', 
      images: ['/images/engineering/ajna-b1.png', '/images/engineering/ajna-b2.png'],
      keyTakeaway: ' ',
      keyTakeawayAudio: '/audio/ajna-takeaway.mp3',
      link: 'https://bombardier.com/en/magazine/innovation',
      startDate: 'May 2023',
      endDate: 'September 2023',
      category: 'work'
    },
  {
      title: 'Supply Chain Engineering Intern',
      organization: 'Pepsico Canada [September 2021 -- January 2022 • Vancouver] ',
      description: 'Worked on quality control and supply chain optimization projects within the beverage division.',
      skills: ['Machine Design', 'CAD', 'ANSYS', 'Supply Chain', 'Process Optimization', 'Data Analysis', 'Microsoft Excel'],
      achieved: 'Optimized a machine design used in the hot fill bottling process, resulting in a 3% increase in efficiency.',
      how: 'Discovered a corroding bearing ball within the mechanism that caused for overfilling. Redesigned the part in CAD and simulated the new design in Ansys to ensure durability.',
      outcome: 'Helped improve overall production efficiency and reduce downtime within the bottling plant.',
      images: ['/images/engineering/pepsi1.png', '/images/engineering/pepsi2.png'],
      keyTakeaway: 'Sometimes a small piece in a machine can have a big impact on overall performance. Attention to detail is crucial in engineering.',
      keyTakeawayAudio: '/audio/ajna-takeaway.mp3',
      link: 'https://www.pepsicojobs.com/main/careerareas/procurementdistribution',
      startDate: 'September 2021',
      endDate: 'January 2022',
      category: 'work'
    },
  {
      title: 'Fashion Model',
      organization: 'Icon Model Management [2020 -- Present •  Toronto]',
      description: 'Scouted within an airport at age 16 and then  decided to sign with a modelling agency in Toronto at age 19.', 
      skills: ['Versatility', 'Adaptability', 'Presentation', 'Fashion', 'Creative Direction'],
      achieved: 'Became one of the only South Asian Models signed in Toronto. Published in Vogue, National Geographic and worked throughout school.',
      images: [],
      keyTakeaway: 'People think models are full of themselves but genuinely, for me, it is the most humbling experience. Imagine someone looking at you up and down and you not getting the job, purely based off of things you cannot really control. This experience taught me that even though I could be very successful and talented in some peoples eyes, in others I may not appear to be much. So I learned to be to be confident in myself and embrace rejection.',
      keyTakeawayAudio: '/audio/ajna-takeaway.mp3',
      link: 'https://www.kirtisaxena.com/projects/modelling',
      startDate: 'September 2020',
      endDate: 'Current',
      category: 'work'
    },
  {
      title: 'Art Creator',
      organization: 'Xena Designs [2021 -- Present •  Toronto]',
      description: 'Started painting canvases as a hobby during the pandemic and turned it into a small business selling canvas art pieces.', 
      skills: ['Adobe Photoshop', 'Adobe Illustrator', 'Business Development', 'Modelling Paste', 'Acrylic Painting', 'Creative Direction'],
      how: 'Sold art pieces for law firms, local businesses and individuals. Created custom pieces for clients based off of their vision and turned it into digital art.', 
      outcome: 'Was able to make a small profit off of my art pieces and learned the basics of running a small business.',
      images: [],
      keyTakeaway: 'Although COVID hit Toronto really hard, it gave me the oppurtunity to explore my creative side. I always painted during highschool but never took it seriously. During the pandemic, I started selling my art pieces locally and it turned into a small business. This experience taught me that sometimes the best ideas come from unexpected places.',
      keyTakeawayAudio: '/audio/ajna-takeaway.mp3',
      link: 'https://www.kirtisaxena.com/projects/artistry',
      startDate: 'January 2021',
      endDate: 'Current',
      category: 'work'
    },
  {
      title: 'Wrestling Instructor',
      organization: 'Akhara of Champions Wrestling Club [Toronto]',
      description: 'Teach wrestling techniques, focus on a high-performance mentality and strategies to aspiring athletes.',
      skills: ['Leadership', 'Teaching', 'Mentorship', 'Discipline', 'High-Performance', 'Diversity and Inclusion'],
      achieved: 'Teach ages 8-21 the fundamentals of wrestling, their advanced techniques, and mental strategies for competition.',
      how: 'Analyze videos of athletes, create personalized training plans, and provide one-on-one coaching to improve performance.',
      outcome: 'Successfully taught athletes who have gone on to compete at provincial and national levels, instilling confidence and discipline.',
      images: ['/images/engineering/wrestlinginstructor2.jpg', '/images/engineering/wrestlinginstructor3.JPG'],
      keyTakeaway: 'Being able to teach others is one of the most rewarding experiences, as it allows you to give back and inspire the next generation.',
      keyTakeawayAudio: '/audio/ajna-takeaway.mp3',
      link: 'https://www.kirtisaxena.com/projects/athletics',
      startDate: 'August 2025',
      endDate: 'Current',
      category: 'work'
    },
{
      title: 'Varsity Board Member & Womens Team Captain',
      organization: 'Varsity Blues [September 2019 -- April 2023 • Toronto]',
      description: 'Served as team captain for the women\'s wrestling team while also contributing as a board member for varsity athletics.',
      skills: ['Leadership', 'Discipline', 'Mentor', 'Team Player', 'Responsibility', 'Event Planning', 'Mental Health Advocate'],
      achieved: 'Led the women\'s wrestling team to multiple competitive seasons while balancing academic and athletic responsibilities.',
      images: [],
      keyTakeaway: 'Being a team captain taught me the importance of training individually while fostering a good team environment. This in conjunction with being on the varsity board taught me how to balance athletics and academics effectively.',
      keyTakeawayAudio: '/audio/ajna-takeaway.mp3',
      link: 'https://www.utoronto.ca/news/be-ahead-game-how-two-accomplished-athletes-balance-sport-and-studying-u-t',
      startDate: 'August 2019',
      endDate: 'April 2023',
      category: 'extracurricular'
    }, 
     {
      title: 'Operations Director',
      organization: 'CUBE [September 2021 -- April 2022 • Toronto]',
      description: 'Responsible for organizing and leading outreach events to promote biomedical engineering within the university and local community. CUBE is a student run biomedical engineering board.', 
      skills: ['Leadership', 'Events Planning', 'Sponsor Outreach' , 'Partnership Development'],
      achieved: 'Successfully organized multiple outreach events, including workshops, guest lectures, and networking sessions, attracting over 200 participants and fostering collaboration between students and industry professionals.', 
      images: [],
      keyTakeaway: 'Being able to host lectures and mentorship events that individuals will think are worth the time and effort require finding good mentors and matching them with students who are willing to learn. This made me figure out the best way to help someone grow.',
      keyTakeawayAudio: '/audio/ajna-takeaway.mp3',
      link: 'https://cube.skule.ca/',
      startDate: 'September 2021',
      endDate: 'April 2022',
      category: 'design-team'
    }, 
     {
      title: 'Frosh Leader',
      organization: 'UofT Engineering Society [July 2023 -- September 2023 • Toronto]',
      description: 'One of the leaders responsible for guiding first-year engineering students through their transition into university life. Focused on being the campus tourguide and map expert.',
      outcome: 'Helped first-year students acclimate to university life, providing support and guidance during their initial weeks on campus.',
      images: [],
      keyTakeaway: 'Being able to mentor incoming students is a rewarding experience that allows you to give back to the community and help others succeed.',
      keyTakeawayAudio: '/audio/ajna-takeaway.mp3',
      link: 'https://www.google.com/search?q=uoft+engineering+frosh+&sca_esv=a0bb12506671175f&udm=2&biw=1512&bih=823&sxsrf=AE3TifNW0r5NQMtrc69XG89JzghWzA30Lg%3A1765745591462&ei=tyM_aZX_G_CF0PEPyLSkoQs&ved=0ahUKEwjVtvj1-r2RAxXwAjQIHUgaKbQQ4dUDCBI&uact=5&oq=uoft+engineering+frosh+&gs_lp=Egtnd3Mtd2l6LWltZyIXdW9mdCBlbmdpbmVlcmluZyBmcm9zaCAyBBAAGB4yBhAAGAgYHkiZD1D4A1jsDHABeACQAQCYAW2gAZYDqgEDNC4xuAEDyAEA-AEBmAICoALAAZgDAIgGAZIHAzEuMaAHiQOyBwMxLjG4B8ABwgcDMi0yyAcHgAgA&sclient=gws-wiz-img',
      startDate: 'July 2023',
      endDate: 'September 2023',
      category: 'design-team'
    }, 
  {
      title: 'Olympic Trials 2020',
      organization: 'Wrestling Canada [December 2019 • Montreal]',
      description: 'Competed in Olympic Trials while recovering from ACL, Meniscus, PCL and MCL surgery.',
      skills: ['Discipline', 'Resilience', 'Strategy', 'Time Management', 'Injury Management'],
      achieved: 'Scored within the first round. Competed against the top wrestlers in Canada while recovering from an knee surgery.',
      images: [],
      keyTakeaway: 'Being a Junior wrestling a Senior level competition taught me to never back down from a challenge, even if the odds are against you. It is important to always give your best effort and learn from every experience, regardless of the outcome.',
      keyTakeawayAudio: '/audio/ajna-takeaway.mp3',
      link: 'https://www.facebook.com/loveengill/videos/wrestling-phenom-kirti-saxena-from-gta/362208641350244/',
      startDate: 'December 2019',
      endDate: 'December 2019',
      category: 'extracurricular'
    },
  {
      title: 'Olympic Trials 2024',
      organization: 'Wrestling Canada [December 2023 • Edmonton] ',
      description: 'Competed in Olympic Trials while working at Tesla as an intern during Cybertruck launch and recovering from my second meniscus surgery.',
      skills: ['Discipline', 'Resilience', 'Strategy', 'Time Management', 'Pressure Handling', 'Injury Management'],
      achieved: 'Placed in the top 5 in a highly competitive Olympic Trials, becoming one of the Olympic team alternates for Paris 2024.',
      how: 'Balanced rigorous training with a demanding Tesla internship, managing recovery from meniscus surgery while maintaining peak performance for competition.',
      outcome: 'Secured position as an Olympic team alternate, demonstrating ability to compete at the highest level while managing multiple commitments.',
      images: ['/images/engineering/ajna-o1.png', '/images/engineering/ajna-o2.png'],
      keyTakeaway: 'Having a strong support system and effective time management are crucial when balancing high-level athletics with demanding professional commitments.',
      keyTakeawayAudio: '/audio/ajna-takeaway.mp3',
      link: 'https://www.mie.utoronto.ca/austin-to-paris-meche-student-kirti-saxena-balances-tesla-internship-and-team-canada-competitions/',
      startDate: 'December 2023',
      endDate: 'December 2023',
      category: 'extracurricular'
    },
  {
      title: 'U23 World Championships',
      organization: 'United World Wrestling [2022 • Pontevedra]',
      description: 'Competed at the U23 World Championships in Pontevedra, Spain.', 
      skills: ['Discipline', 'Resilience', 'Strategy', 'Time Management', 'Pressure Handling'],
      achieved: 'Placed 11th in the World after suffering a third to second degree burn incident a few months prior to the competition.',
      images: [],
      keyTakeaway: 'Overcoming adversity and setbacks is a crucial part of athletic development. Sometimes things out of your control happen, and you don\'t know when things will return to normal or if that is a possibility. It is important that you come back harder, stronger and more determined than before.',
      keyTakeawayAudio: '/audio/ajna-takeaway.mp3',
      link: 'https://globalnews.ca/video/9208833/canadian-female-wrestler-set-to-compete-at-the-u23-world-championships-in-spain',
      startDate: 'October 2022',
      endDate: 'October 2022',
      category: 'extracurricular'
    },
  {
      title: 'University Sports Championships',
      organization: 'U SPORTS [September 2019 -- March 2020 • Toronto]',
      description: 'Competed at the National University Sports Championships within my first year of varsity wrestling.',
      skills: ['Discipline', 'Resilience', 'High Performance', 'Time Management', 'Pressure Handling'],
      achieved: 'Placed 5th in the Nation, earning All-Canadian status in my first year of varsity wrestling.',
      images: [],
      keyTakeaway: 'Within my first year of varsity wrestling I would wake up at 5 AM, commute for an hour and have mat practise in the mornings. Then I would go to morning classes, nap on a couch around campus, and head to my midday weight lift. I then would have afternoon classes and then commute for an hour to my evening mat practise. Eat, go to sleep. Repeat. Time management and discipline were crucial to balancing academics and athletics successfully, although the injuries were tough to deal with.',
      keyTakeawayAudio: '/audio/ajna-takeaway.mp3',
      link: 'https://varsityblues.ca/news/2020/2/19/wrestling-off-to-st-catharines-for-national-championships.aspx',
      startDate: 'September 2019',
      endDate: 'March 2020',
      category: 'extracurricular'
    },
 {
      title: 'University Sports Championships',
      organization: 'U SPORTS [September 2022 -- March 2023 • Toronto]',
      description: 'National University Sports Championships for my second year of varsity wrestling. Last year as Womens Team Captain.',
      skills: ['Discipline', 'Resilience', 'Strategy', 'Time Management', 'Pressure Handling'],
      achieved: 'Qualified for the USPORTS National Championships but had to withdraw due to a second bucket tear in my Meniscus.',
      images: [],
      keyTakeaway: 'Even though I had to withdraw from the competition, I learned the importance of listening to my body and prioritizing long-term health over short-term goals. Recovery and rehabilitation are essential aspects of an athlete\'s journey.',
      keyTakeawayAudio: '/audio/ajna-takeaway.mp3',
      link: 'https://www.utoronto.ca/news/it-s-ok-struggle-student-overcomes-injury-compete-wrestling-world-championships',
      startDate: 'September 2022', 
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
      <div className="pt-20 md:pt-32 px-4 md:px-8 max-w-7xl mx-auto">
        <ProjectHeader
          title="My Engineering Journey"
          date="Updated December 2025"
          category="Technical Portfolio"
        />

        {/* Blurb Section */}
        <div className="mb-16 max-w-4xl mx-auto space-y-4">
          <p className="text-gray-300 text-lg leading-relaxed">
            My engineering journey is a <span style={{ color: '#FFD700' }}>unique</span> one.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            It consists of me forming myself as an individual and as an engineer. I would say all of my experiences, both within and external of <span style={{ color: '#EC4899' }}>school</span> helped shape what I truly want to invest my time in.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            From doing <span style={{ color: '#C77CBF' }}>extracurriculars</span> like being a frosh leader to being a dedicated <span style={{ color: '#024AA2' }}>athlete</span> and competing in World Championships all the way to working at multiple <span style={{ color: '#FD9635' }}>companies</span> like Tesla, taking on <span style={{ color: '#FD9635' }}>part time jobs</span> like being a signed model in the city to indulging in <span style={{ color: '#9F484F' }}>research</span> on coatings and materials to being the project manager of a <span style={{ color: '#C77CBF' }}>design team</span> that builds an autonomous rover.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            <span style={{ color: '#FFD700' }}>Every single thing</span> ; very setback, every win, every mistake, every award, every learning experience and every person has shaped who I am today and my decision making. Although my pathway was not conventional or easy, <span style={{ color: '#FFD700' }}>I would never change it</span>.
          </p>
        </div>

        {/* Timeline Container - Desktop */}
        <div className="hidden md:block relative pl-64" style={{ minHeight: `${actualTimelineHeight}px` }}>
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

        {/* Mobile Timeline - Simple stacked cards */}
        <div className="md:hidden space-y-4 px-4">
          {projectsWithOffsets.map((item, idx) => {
            const categoryColor = categoryColors[item.project.category || 'work'] || categoryColors.work;
            return (
              <MobileProjectCard
                key={idx}
                project={item.project}
                categoryColor={categoryColor}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}
