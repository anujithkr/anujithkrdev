'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function GSAPEffects() {
  const followerRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const follower = followerRef.current;
    const cursorDot = cursorDotRef.current;
    const cursorRing = cursorRingRef.current;
    
    if (!follower || !cursorDot || !cursorRing) return;

    // 1. Initial configuration
    gsap.set(follower, { xPercent: -50, yPercent: -50 });
    gsap.set(cursorDot, { xPercent: -50, yPercent: -50 });
    gsap.set(cursorRing, { xPercent: -50, yPercent: -50 });

    const handleMouseMove = (e: MouseEvent) => {
      // Background spotlight trail (slow fluid trail)
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 1.6,
        ease: 'power3.out',
        overwrite: 'auto'
      });

      // Custom cursor center dot (near-instant)
      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        overwrite: 'auto'
      });

      // Custom cursor outer ring (fluid trailing lag)
      gsap.to(cursorRing, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 2. Hide/Show cursor when leaving/entering browser window
    const handleMouseLeaveWindow = () => {
      gsap.to([cursorDot, cursorRing], {
        opacity: 0,
        scale: 0,
        duration: 0.3
      });
    };

    const handleMouseEnterWindow = () => {
      gsap.to([cursorDot, cursorRing], {
        opacity: 1,
        scale: 1,
        duration: 0.3
      });
    };

    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);

    // 3. Magnetic Buttons and Links Pull
    const magneticElements = document.querySelectorAll('.button-gradient, [data-magnetic]');
    const elementCleanup: { el: Element; move: EventListener; leave: EventListener }[] = [];

    magneticElements.forEach((el) => {
      const handleMagnetMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const elX = rect.left + rect.width / 2;
        const elY = rect.top + rect.height / 2;
        
        const dx = e.clientX - elX;
        const dy = e.clientY - elY;
        
        gsap.to(el, {
          x: dx * 0.35,
          y: dy * 0.35,
          scale: 1.04,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      };
      
      const handleMagnetLeave = () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: 'elastic.out(1.1, 0.4)',
          overwrite: 'auto'
        });
      };

      el.addEventListener('mousemove', handleMagnetMove as EventListener);
      el.addEventListener('mouseleave', handleMagnetLeave as EventListener);
      elementCleanup.push({
        el,
        move: handleMagnetMove as EventListener,
        leave: handleMagnetLeave as EventListener
      });
    });

    // 4. Cursor Hover Reactive Expansions
    const hoverTargets = document.querySelectorAll('a, button, .button-gradient, [data-magnetic], .glass-card, canvas');
    const hoverCleanup: { el: Element; enter: EventListener; leave: EventListener }[] = [];

    hoverTargets.forEach((target) => {
      const handleMouseEnter = () => {
        // Expand ring and turn it semi-transparent violet glass
        gsap.to(cursorRing, {
          scale: 1.6,
          borderColor: '#a78bfa',
          backgroundColor: 'rgba(139, 92, 246, 0.1)',
          borderWidth: '1.5px',
          duration: 0.25,
          ease: 'power2.out',
          overwrite: 'auto'
        });
        
        // Shrink center dot for a precision crosshair look
        gsap.to(cursorDot, {
          scale: 0.5,
          backgroundColor: '#a78bfa',
          duration: 0.25,
          overwrite: 'auto'
        });
      };

      const handleMouseLeave = () => {
        // Recoil back to clean, minimalistic state
        gsap.to(cursorRing, {
          scale: 1,
          borderColor: 'rgba(167, 139, 250, 0.6)',
          backgroundColor: 'transparent',
          borderWidth: '1px',
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto'
        });
        
        gsap.to(cursorDot, {
          scale: 1,
          backgroundColor: '#8b5cf6',
          duration: 0.3,
          overwrite: 'auto'
        });
      };

      target.addEventListener('mouseenter', handleMouseEnter as EventListener);
      target.addEventListener('mouseleave', handleMouseLeave as EventListener);
      hoverCleanup.push({
        el: target,
        enter: handleMouseEnter as EventListener,
        leave: handleMouseLeave as EventListener
      });
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
      
      elementCleanup.forEach(({ el, move, leave }) => {
        el.removeEventListener('mousemove', move);
        el.removeEventListener('mouseleave', leave);
      });

      hoverCleanup.forEach(({ el, enter, leave }) => {
        el.removeEventListener('mouseenter', enter);
        el.removeEventListener('mouseleave', leave);
      });
    };
  }, []);

  return (
    <>
      {/* Dynamic GSAP Trailing Glow Spotlight in Background */}
      <div 
        ref={followerRef}
        className="pointer-events-none fixed top-0 left-0 w-[450px] h-[450px] rounded-full cursor-follower-bg blur-[85px] -z-20 select-none hidden md:block" 
      />

      {/* Custom Precision Cursor Center Dot */}
      <div 
        ref={cursorDotRef}
        className="pointer-events-none fixed top-0 left-0 w-2 h-2 rounded-full bg-accent z-[9999] select-none hidden md:block transition-transform duration-100 ease-out shadow-[0_0_10px_rgba(139,92,246,0.6)]" 
      />
      
      {/* Custom Fluid Cursor Outer Ring */}
      <div 
        ref={cursorRingRef}
        className="pointer-events-none fixed top-0 left-0 w-9 h-9 rounded-full border border-accent/60 z-[9998] select-none hidden md:block transition-transform duration-100 ease-out backdrop-blur-[0.5px]" 
      />
    </>
  );
}
