'use client';

import React, { useRef, useState } from 'react';

interface Tilt3DProps {
  children: React.ReactNode;
  className?: string;
  maxRotation?: number; // Maximum rotation angle in degrees
  scale?: number;       // Hover scale
}

export default function Tilt3D({
  children,
  className = '',
  maxRotation = 12,
  scale = 1.03
}: Tilt3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState('');
  const [glareStyle, setGlareStyle] = useState({ opacity: 0, left: '0%', top: '0%' });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    
    // Mouse position relative to the element
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalize mouse position between -0.5 and 0.5
    const normalizedX = (x / rect.width) - 0.5;
    const normalizedY = (y / rect.height) - 0.5;

    // Calculate rotation angles (invert Y rotation so it tilts toward the mouse)
    const rotateX = -normalizedY * maxRotation;
    const rotateY = normalizedX * maxRotation;

    setTransformStyle(
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`
    );

    // Dynamic glare effect calculation
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    
    setGlareStyle({
      opacity: 0.15,
      left: `${glareX}%`,
      top: `${glareY}%`
    });
  };

  const handleMouseLeave = () => {
    // Smoothly transition back
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)');
    setGlareStyle(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-all duration-300 ease-out ${className}`}
      style={{
        transform: transformStyle,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Glare overlay */}
      <div
        className="absolute -inset-[1px] pointer-events-none rounded-[inherit] transition-opacity duration-300 z-30"
        style={{
          opacity: glareStyle.opacity,
          background: `radial-gradient(circle 180px at ${glareStyle.left} ${glareStyle.top}, rgba(255, 255, 255, 0.25), transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
}
