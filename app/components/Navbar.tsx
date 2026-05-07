'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto backdrop-blur-sm">
      <div className="text-2xl font-bold tracking-tight">
      Anujith KR
      </div>
      
      <div className="flex items-center gap-8">
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted">
          <Link href="#projects" className="hover:text-foreground transition-colors relative group">
            Projects
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full"></span>
          </Link>
          <Link href="#skills" className="hover:text-foreground transition-colors">Skills</Link>
          <Link href="#contact" className="hover:text-foreground transition-colors">Contact</Link>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Toggle theme"
          >
            {mounted && (theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />)}
          </button>
          
          <button className="button-gradient px-6 py-2 rounded-full text-sm font-semibold">
            Resume
          </button>
        </div>
      </div>
    </nav>
  );
}
