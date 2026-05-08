'use client';

import { motion, Variants } from 'framer-motion';
import { Briefcase, GraduationCap, MapPin, Heart, Zap, Globe, MessageCircle } from 'lucide-react';
import Link from 'next/link';

const timeline = [
  {
    type: 'education',
    title: 'Bachelor of Computer Applications',
    organization: 'SEA College of Engineering and Technology',
    location: 'Bengaluru, India',
    date: '2021 - 2024',
    description: 'Pursued Bachelor of Engineering in Computer Science, laying a strong foundation in software principles and technology.',
    icon: <GraduationCap className="w-5 h-5" />,
    tags: ['Computer Science', 'Engineering']
  },
  {
    type: 'experience',
    title: 'Web Development Intern',
    organization: 'Luminar Technolab',
    location: 'Kochi, Kerala, India • On-site',
    date: 'Nov 2024 - Jul 2025',
    description: 'Gained hands-on experience in full-stack web development, working on various e-commerce and responsive UI projects.',
    icon: <Briefcase className="w-5 h-5" />,
    tags: ['React', 'Node.js', 'Express', 'MongoDB']
  },
  {
    type: 'experience',
    title: 'Software Developer',
    organization: 'TotalX',
    location: 'Nilambur, Kerala, India • On-site',
    date: 'Jan 2026 - Present',
    description: 'Working as a Software Developer, focusing on building high-quality digital products and modern web applications.',
    icon: <Briefcase className="w-5 h-5" />,
    tags: ['Next.js', 'Firebase', 'Redux', 'Tailwind CSS']
  }
];

export default function About() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="about" className="relative py-20 md:py-32 overflow-hidden selection:bg-accent/30">
      {/* Background Blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] -left-[10%] w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-[20%] -right-[10%] w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="space-y-20 md:space-y-32"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center space-y-3 md:space-y-4">
            <span className="text-accent text-[10px] md:text-xs font-mono tracking-[0.4em] uppercase">About Me</span>
            <h2 className="text-3xl md:text-6xl font-bold tracking-tight">
              Crafting With <span className="text-gradient">Purpose.</span>
            </h2>
          </motion.div>

          {/* Self Introduction */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            <motion.div variants={itemVariants} className="space-y-4 md:space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] md:text-sm font-medium">
                <Globe className="w-3.5 h-3.5 md:w-4 h-4" />
                <span>Based in India</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold">Hi, I'm Anujith KR</h3>
              <div className="space-y-3 md:space-y-4 text-muted text-base md:text-lg leading-relaxed">
                <p>
                  I’m passionate about technology and web development, especially building modern web applications using React, Next.js, and Firebase. I enjoy learning new technologies and improving my skills through real projects.
                </p>
                <p>
                  I have experience working on e-commerce and portfolio projects, including authentication systems, payment integrations, and responsive UI development. I’m also interested in cloud technologies and backend services.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-accent to-purple-600 rounded-xl md:rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
              <div className="relative glass-card rounded-xl md:rounded-2xl p-6 md:p-8 space-y-6 md:space-y-8">
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-1 md:space-y-2">
                    <div className="p-2 w-fit rounded-lg bg-accent/10 text-accent">
                      <Zap className="w-4 h-4 md:w-5 h-5" />
                    </div>
                    <h4 className="text-sm md:text-base font-bold">Fast Learner</h4>
                    <p className="text-[10px] md:text-sm text-muted">Quick to adapt to new stacks.</p>
                  </div>
                  <div className="space-y-1 md:space-y-2">
                    <div className="p-2 w-fit rounded-lg bg-accent/10 text-accent">
                      <Heart className="w-4 h-4 md:w-5 h-5" />
                    </div>
                    <h4 className="text-sm md:text-base font-bold">Passionate</h4>
                    <p className="text-[10px] md:text-sm text-muted">Love for clean code and UI.</p>
                  </div>
                </div>
                <p className="text-muted text-xs md:text-sm italic border-l-2 border-accent pl-4">
                  "Apart from technology, I’m a disciplined and hardworking person who likes taking on new challenges."
                </p>
              </div>
            </motion.div>
          </div>

          {/* Journey Timeline */}
          <div className="space-y-12 md:space-y-16">
            <motion.div variants={itemVariants} className="text-center space-y-3 md:space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold">My Journey</h3>
              <p className="text-muted text-base md:text-lg max-w-2xl mx-auto">
                A timeline of my professional growth and educational background.
              </p>
            </motion.div>

            <div className="relative border-l border-muted/20 ml-4 md:ml-0 md:before:absolute md:before:left-1/2 md:before:h-full md:before:w-px md:before:bg-muted/20 md:border-none">
              {timeline.map((item, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  className={`relative mb-12 md:mb-16 md:flex md:justify-between items-center w-full ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <div className="absolute left-[-17px] md:left-1/2 md:-ml-3.5 top-0 w-7 h-7 md:w-8 md:h-8 rounded-full bg-background border-2 border-accent flex items-center justify-center z-10">
                    <div className="text-accent scale-75 md:scale-100">{item.icon}</div>
                  </div>

                  <div className="md:w-[45%] pl-8 md:pl-0">
                    <div className={`glass-card p-5 md:p-6 rounded-xl md:rounded-2xl hover:border-accent/50 transition-all duration-300 group ${
                      index % 2 === 0 ? 'md:text-left' : 'md:text-right'
                    }`}>
                      <div className={`flex flex-col ${index % 2 === 0 ? '' : 'md:items-end'}`}>
                        <span className="text-accent font-mono text-[10px] md:text-sm mb-1.5 md:mb-2">{item.date}</span>
                        <h4 className="text-lg md:text-xl font-bold group-hover:text-accent transition-colors">{item.title}</h4>
                        <p className="text-foreground/80 text-xs md:text-sm font-medium mb-1">{item.organization}</p>
                        <div className={`flex items-center gap-1 text-[10px] md:text-sm text-muted mb-3 md:mb-4 ${
                          index % 2 === 0 ? '' : 'md:flex-row-reverse'
                        }`}>
                          <MapPin className="w-3 h-3" />
                          <span>{item.location}</span>
                        </div>
                        <p className="text-muted text-[11px] md:text-sm leading-relaxed mb-4">
                          {item.description}
                        </p>
                        <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? '' : 'md:justify-end'}`}>
                          {item.tags.map(tag => (
                            <span key={tag} className="text-[9px] md:text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-secondary text-muted font-bold">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block md:w-[45%]"></div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Goal Section */}
          <motion.div variants={itemVariants} className="text-center py-10 md:py-16 px-6 md:px-8 rounded-2xl md:rounded-3xl bg-accent/5 border border-accent/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px] -z-10 group-hover:bg-accent/10 transition-colors duration-500" />
            
            <h3 className="text-lg md:text-3xl font-bold mb-8 md:mb-10 italic max-w-4xl mx-auto leading-tight text-foreground/90">
              "My goal is to build a successful career in the tech industry while creating useful and high-quality digital products."
            </h3>

            <div className="flex justify-center">
              <Link 
                href="https://wa.me/919744731202" 
                target="_blank"
                className="button-gradient px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl text-sm md:text-base font-bold flex items-center gap-2 md:gap-3 transition-transform hover:scale-105 active:scale-95"
              >
                <MessageCircle className="w-4 h-4 md:w-5 h-5 fill-white/20" />
                Connect via WhatsApp
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
