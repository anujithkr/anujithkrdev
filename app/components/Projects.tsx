'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Code, ShoppingCart, GraduationCap, Briefcase, Layout } from 'lucide-react';
import Link from 'next/link';

const projects = [
  {
    title: 'Modern E-commerce Platform',
    category: 'E-commerce',
    description: 'A full-featured digital storefront with real-time inventory, secure checkout integration, and a comprehensive admin dashboard.',
    tech: ['Next.js', 'Firebase', 'Stripe', 'Tailwind'],
    icon: <ShoppingCart className="w-5 h-5" />,
    links: { github: '#', live: '#' }
  },
  {
    title: 'Educational Learning System',
    category: 'Educational',
    description: 'An interactive learning management system featuring course progress tracking, video streaming, and student assessment modules.',
    tech: ['React', 'Firebase', 'Node.js', 'Bootstrap'],
    icon: <GraduationCap className="w-5 h-5" />,
    links: { github: '#', live: '#' }
  },
  {
    title: 'Premium Developer Portfolio',
    category: 'Portfolio',
    description: 'A high-performance personal brand showcase with fluid animations, custom design tokens, and optimized user experience.',
    tech: ['Next.js', 'Framer Motion', 'TypeScript', 'CSS'],
    icon: <Layout className="w-5 h-5" />,
    links: { github: '#', live: '#' }
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 md:py-32 px-6 md:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6 md:gap-8">
        <div className="max-w-2xl">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-accent text-[10px] md:text-sm font-mono tracking-[0.3em] uppercase mb-3 md:mb-4 block"
          >
            Showcase
          </motion.span>
          <h2 className="text-3xl md:text-6xl font-bold tracking-tight">
            Selected <span className="text-gradient">Projects.</span>
          </h2>
          <p className="text-muted text-base md:text-lg mt-4 md:mt-6 leading-relaxed">
            Due to privacy and company policies, I showcase generic representations of the core architectures 
            I've built in E-commerce, Education, and Personal Branding.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group relative glass-card rounded-2xl md:rounded-[2rem] overflow-hidden flex flex-col h-full hover:border-accent/30 transition-all duration-500"
          >
            {/* Project Header */}
            <div className="p-6 md:p-8 pb-0 flex justify-between items-start">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                {project.icon}
              </div>
            </div>

            {/* Project Info */}
            <div className="p-6 md:p-8 flex-grow flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-accent/60 mb-2 block">
                  {project.category}
                </span>
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted text-xs md:text-sm leading-relaxed mb-6 md:mb-8">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tech.map(t => (
                  <span key={t} className="text-[10px] font-mono py-1 px-3 rounded-lg bg-white/5 border border-white/10 text-muted uppercase tracking-wider">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-20 p-8 rounded-3xl border border-white/5 bg-white/5 text-center"
      >
        <p className="text-muted/60 text-sm italic">
          More projects and specific case studies are available upon direct request via email or LinkedIn.
        </p>
      </motion.div>
    </section>
  );
}
