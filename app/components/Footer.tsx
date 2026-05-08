'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const socialLinks = [
  { 
    name: 'Instagram', 
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    ), 
    href: 'https://www.instagram.com/anujithkr0?igsh=MXgxbmRxdjh5MmVuMg==', 
    color: 'hover:text-pink-500' 
  },
  { 
    name: 'LinkedIn', 
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
      </svg>
    ), 
    href: 'https://www.linkedin.com/in/anujith-kr/', 
    color: 'hover:text-blue-500' 
  },
  { 
    name: 'GitHub', 
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
      </svg>
    ), 
    href: 'https://github.com/anujithkr', 
    color: 'hover:text-white' 
  },
  { 
    name: 'WhatsApp', 
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-7.6 8.38 8.38 0 0 1 3.8.9L21 4.5z"></path>
      </svg>
    ), 
    href: 'https://wa.me/919744731202', 
    color: 'hover:text-green-500' 
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20 border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-16">
          <div>
            <div className="text-2xl font-bold tracking-tight mb-4">
              Anujith <span className="text-accent">KR</span>
            </div>
            <p className="text-muted text-sm max-w-xs leading-relaxed">
              Designing and developing premium digital experiences that push the boundaries of modern web.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent">Contact</span>
            <div className="flex flex-col gap-2">
              <Link 
                href="mailto:anujithkr5@gmail.com" 
                className="text-lg md:text-xl font-medium hover:text-accent transition-colors flex items-center gap-2 group"
              >
                anujithkr5@gmail.com
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
              <Link 
                href="tel:+919744731202" 
                className="text-lg md:text-xl font-medium hover:text-accent transition-colors flex items-center gap-2 group"
              >
                +91 9744 731 202
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-10 border-t border-white/5 gap-8">
          <div className="flex gap-8 text-[11px] font-medium text-muted uppercase tracking-widest order-2 md:order-1">
            <Link href="/#about" className="hover:text-foreground transition-colors">About</Link>
            <Link href="/#projects" className="hover:text-foreground transition-colors">Projects</Link>
            <Link href="/#skills" className="hover:text-foreground transition-colors">Skills</Link>
            <Link href="/#contact" className="hover:text-foreground transition-colors">Contact</Link>
          </div>

          <div className="flex gap-6 order-1 md:order-2">
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                className={`text-muted transition-colors ${social.color}`}
                aria-label={social.name}
              >
                {social.icon}
              </Link>
            ))}
          </div>

          <p className="text-[10px] text-muted/40 uppercase tracking-widest order-3">
            © {currentYear} — KERALA, INDIA
          </p>
        </div>
      </div>
    </footer>
  );
}
