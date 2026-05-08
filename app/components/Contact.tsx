'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-32 px-8 max-w-7xl mx-auto relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] -z-10" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
        {/* Left Side: Contact Info */}
        <div className="space-y-12">
          <div>
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-accent text-[10px] font-mono tracking-[0.4em] uppercase mb-4 block"
            >
              Contact
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-6 tracking-tight"
            >
              Let's build your <br />
              <span className="text-accent italic font-medium">next vision.</span>
            </motion.h2>
            <p className="text-muted text-lg leading-relaxed max-w-md">
              I'm currently available for new projects and collaborations. 
              Let's discuss how we can work together.
            </p>
          </div>

          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-6 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-accent/5 border border-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] text-muted/50 uppercase tracking-[0.2em] mb-1 font-mono">Email</p>
                <a href="mailto:anujithkr5@gmail.com" className="text-lg hover:text-accent transition-colors font-semibold">
                  anujithkr5@gmail.com
                </a>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-6 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-accent/5 border border-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] text-muted/50 uppercase tracking-[0.2em] mb-1 font-mono">Phone</p>
                <a href="tel:+919744731202" className="text-lg hover:text-accent transition-colors font-semibold">
                  +91 9744 731 202
                </a>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-6 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-accent/5 border border-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] text-muted/50 uppercase tracking-[0.2em] mb-1 font-mono">Location</p>
                <p className="text-lg font-semibold">Kerala, India</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Side: Minimal Contact Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 md:p-10 rounded-[2rem] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-accent/5 rounded-full blur-[50px] -z-10" />
          
          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-muted/60 font-mono ml-2">Full Name</label>
              <input 
                type="text" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:border-accent/30 transition-all placeholder:text-muted/30"
                placeholder="What should I call you?"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-muted/60 font-mono ml-2">Email Address</label>
              <input 
                type="email" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:border-accent/30 transition-all placeholder:text-muted/30"
                placeholder="Where can I reach you?"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-muted/60 font-mono ml-2">Your Message</label>
              <textarea 
                rows={4} 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:border-accent/30 transition-all resize-none placeholder:text-muted/30"
                placeholder="Tell me about your project or just say hi!"
              />
            </div>

            <button className="button-gradient w-full py-4 rounded-xl text-sm font-bold flex items-center justify-center gap-3 group transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-accent/20">
              Send Message
              <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
