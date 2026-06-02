'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Terminal } from 'lucide-react';
import Link from 'next/link';
import Canvas3D from './Canvas3D';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 md:pt-32 pb-16 overflow-hidden bg-hero-gradient">
      {/* Decorative background elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px] -z-10 animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-[120px] -z-10 animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Column: Heading and CTA */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 md:space-y-8"
        >
          {/* Badge / Accent */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[11px] font-semibold uppercase tracking-wider">
            <Terminal className="w-3.5 h-3.5 animate-pulse" />
            <span>Interactive 3D Portfolio</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-foreground">
            Building <span className="text-accent italic font-semibold">Premium</span> <br />
            Web Experiences
          </h1>

          <p className="text-base md:text-xl text-muted max-w-2xl leading-relaxed">
            I create fast, scalable, and visually polished web applications focused on performance, user experience, and modern 3D designs.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto">
            <Link href="#contact" className="button-gradient flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 rounded-lg md:rounded-xl text-sm md:text-base font-semibold group w-full sm:w-auto">
              Get in touch
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
    
            <Link href="#about" className="flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 rounded-lg md:rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all text-sm md:text-base font-semibold group w-full sm:w-auto">
              About me
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>

        {/* Right Column: Interactive 3D Canvas Sphere */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 w-full flex items-center justify-center"
        >
          <div className="w-full max-w-[450px] lg:max-w-[480px] aspect-square relative">
            {/* Holographic grid container */}
            <div className="absolute inset-0 border border-white/5 rounded-[2.5rem] bg-white/[0.01] backdrop-blur-[2px] overflow-hidden flex flex-col justify-between">
              <Canvas3D />
              
              {/* Floating micro indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[10px] text-muted/60 font-mono tracking-widest uppercase pointer-events-none select-none">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                <span>Hover & Drag Robot</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

