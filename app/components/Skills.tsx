'use client';

import { motion } from 'framer-motion';
import { 
  Code2, 
  Layers, 
  Terminal, 
  Palette, 
  Zap, 
  Database, 
  Globe,
  Smartphone,
  Cpu
} from 'lucide-react';

const skills = [
  { name: 'React', icon: <Code2 className="w-6 h-6" />, color: 'text-blue-400' },
  { name: 'Next.js', icon: <Layers className="w-6 h-6" />, color: 'text-white' },
  { name: 'TypeScript', icon: <Terminal className="w-6 h-6" />, color: 'text-blue-500' },
  { name: 'Tailwind', icon: <Palette className="w-6 h-6" />, color: 'text-cyan-400' },
  { name: 'Firebase', icon: <Database className="w-6 h-6" />, color: 'text-orange-400' },
  { name: 'Node.js', icon: <Cpu className="w-6 h-6" />, color: 'text-green-500' },
  { name: 'Bootstrap', icon: <Zap className="w-6 h-6" />, color: 'text-purple-500' },
  { name: 'MongoDB', icon: <Database className="w-6 h-6" />, color: 'text-emerald-500' },
];

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-8 max-w-7xl mx-auto">
      <div className="flex flex-col items-center text-center mb-20">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-accent text-sm font-mono tracking-[0.3em] uppercase mb-4"
        >
          Expertise
        </motion.span>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Technical Arsenal</h2>
        <p className="text-muted text-lg max-w-2xl">
          A curated selection of technologies I use to build high-performance, 
          scalable, and visually stunning digital experiences.
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {skills.map((skill, index) => (
          <motion.div 
            key={skill.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="glass-card p-8 rounded-3xl flex flex-col items-center justify-center text-center group relative overflow-hidden"
          >
            {/* Hover Glow */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br from-white to-transparent`} />
            
            <div className={`${skill.color} mb-4 transform transition-transform duration-300 group-hover:scale-110`}>
              {skill.icon}
            </div>
            
            <span className="font-semibold text-foreground/90 tracking-tight group-hover:text-foreground transition-colors">
              {skill.name}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
