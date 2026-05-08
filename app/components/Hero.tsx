'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Terminal } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden bg-hero-gradient">
      {/* Decorative background elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px] -z-10 animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-[120px] -z-10 animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center text-center max-w-4xl px-6"
      >

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
          Building <span className="text-accent italic font-medium">Premium</span> <br />
          Web Experiences With React & Next.js
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-muted max-w-2xl mb-12 leading-relaxed">
          I create fast, scalable, and visually polished web applications focused on performance, user experience, and modern design.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Link href="#contact" className="button-gradient flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold group">
            Get in touch
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
  
          <Link href="#about" className="flex items-center gap-2 px-8 py-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all font-semibold group">
            About me
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
