'use client';

import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Mail, Phone, MapPin, Send, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background selection:bg-accent/30">
      <Navbar />
      
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-900/5 rounded-full blur-[120px] -z-10" />

      <section className="pt-40 pb-20 px-8 max-w-5xl mx-auto">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-muted/60 hover:text-accent transition-colors mb-16 group text-xs font-mono uppercase tracking-widest"
        >
          <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
          Back to home
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Left Side: Contact Info */}
          <div className="space-y-12">
            <div>
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-accent text-[10px] font-mono tracking-[0.4em] uppercase mb-4 block"
              >
                Inquiries
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-4xl font-bold mb-6 tracking-tight"
              >
                Let's build your <br />
                <span className="text-accent italic font-medium">next vision.</span>
              </motion.h1>
              <p className="text-muted text-base leading-relaxed max-w-sm">
                I'm currently available for new projects and collaborations. 
                Let's discuss how we can work together.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-5">
                <div className="w-11 h-11 rounded-xl bg-accent/5 border border-accent/10 flex items-center justify-center text-accent">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-muted/50 uppercase tracking-[0.2em] mb-0.5 font-mono">Email</p>
                  <a href="mailto:anujithkr5@gmail.com" className="text-sm hover:text-accent transition-colors font-medium">
                    anujithkr5@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="w-11 h-11 rounded-xl bg-accent/5 border border-accent/10 flex items-center justify-center text-accent">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-muted/50 uppercase tracking-[0.2em] mb-0.5 font-mono">Phone</p>
                  <a href="tel:+919744731202" className="text-sm hover:text-accent transition-colors font-medium">
                    +91 9744 731 202
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="w-11 h-11 rounded-xl bg-accent/5 border border-accent/10 flex items-center justify-center text-accent">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-muted/50 uppercase tracking-[0.2em] mb-0.5 font-mono">Location</p>
                  <p className="text-sm font-medium">Kerala, India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Minimal Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-8 md:p-10 rounded-[2.5rem] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-[40px] -z-10" />
            
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-muted/60 font-mono ml-1">Full Name</label>
                <input 
                  type="text" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-accent/30 transition-colors"
                  placeholder="Your Name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-muted/60 font-mono ml-1">Email Address</label>
                <input 
                  type="email" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-accent/30 transition-colors"
                  placeholder="email@example.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-muted/60 font-mono ml-1">Your Message</label>
                <textarea 
                  rows={4} 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-accent/30 transition-colors resize-none"
                  placeholder="How can I help?"
                />
              </div>

              <button className="button-gradient w-full py-4 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 group transition-transform hover:scale-[1.02] active:scale-[0.98]">
                Send Message
                <Send className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
