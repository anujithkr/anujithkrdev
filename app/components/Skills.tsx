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
  Cpu,
  Server,
  Layout,
  FileCode,
  Code
} from 'lucide-react';
import Tilt3D from './Tilt3D';

const skills = [
  { name: 'HTML5', icon: <Layout className="w-6 h-6" />, color: 'text-orange-500', glow: 'bg-orange-500/20' },
  { name: 'CSS3', icon: <FileCode className="w-6 h-6" />, color: 'text-blue-500', glow: 'bg-blue-500/20' },
  { name: 'JavaScript', icon: <Code className="w-6 h-6" />, color: 'text-yellow-400', glow: 'bg-yellow-400/20' },
  { name: 'React', icon: <Code2 className="w-6 h-6" />, color: 'text-blue-400', glow: 'bg-blue-400/20' },
  { name: 'Next.js', icon: <Layers className="w-6 h-6" />, color: 'text-white', glow: 'bg-white/10' },
  { name: 'Node.js', icon: <Cpu className="w-6 h-6" />, color: 'text-green-500', glow: 'bg-green-500/20' },
  { name: 'Express.js', icon: <Server className="w-6 h-6" />, color: 'text-gray-400', glow: 'bg-gray-400/20' },
  { name: 'MongoDB', icon: <Database className="w-6 h-6" />, color: 'text-emerald-500', glow: 'bg-emerald-500/20' },
  { name: 'Firebase', icon: <Database className="w-6 h-6" />, color: 'text-orange-400', glow: 'bg-orange-400/20' },
  { name: 'TypeScript', icon: <Terminal className="w-6 h-6" />, color: 'text-blue-500', glow: 'bg-blue-500/20' },
  { name: 'Tailwind', icon: <Palette className="w-6 h-6" />, color: 'text-cyan-400', glow: 'bg-cyan-400/20' },
  { name: 'Bootstrap', icon: <Zap className="w-6 h-6" />, color: 'text-purple-500', glow: 'bg-purple-500/20' },
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 md:py-32 px-6 md:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col items-center text-center mb-12 md:mb-20">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-accent text-[10px] md:text-sm font-mono tracking-[0.3em] uppercase mb-3 md:mb-4"
        >
          Expertise
        </motion.span>
        <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">Technical Arsenal</h2>
        <p className="text-muted text-base md:text-lg max-w-2xl">
          A curated selection of technologies I use to build high-performance, 
          scalable, and visually stunning digital experiences.
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
        {skills.map((skill, index) => (
          <motion.div 
            key={skill.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            viewport={{ once: true }}
            className="h-full"
          >
            <Tilt3D className="h-full">
              <div className="glass-card p-6 md:p-8 rounded-2xl md:rounded-3xl flex flex-col items-center justify-center text-center group relative overflow-hidden transition-colors hover:border-accent/30 h-full">
                {/* Dynamic Glow Effect */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl -z-10 ${skill.glow}`} />
                
                <div className={`${skill.color} mb-3 md:mb-4 transform transition-all duration-500 group-hover:scale-125 group-hover:rotate-[10deg]`}>
                  <div className="scale-90 md:scale-100 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                    {skill.icon}
                  </div>
                </div>
                
                <span className="text-sm md:text-base font-semibold text-foreground/90 tracking-tight group-hover:text-foreground transition-colors group-hover:tracking-widest duration-500">
                  {skill.name}
                </span>
                
                {/* Corner Accent */}
                <div className={`absolute top-0 right-0 w-12 h-12 ${skill.glow} opacity-0 group-hover:opacity-40 blur-xl transition-opacity`} />
              </div>
            </Tilt3D>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
