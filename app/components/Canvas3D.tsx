'use client';

import React, { useEffect, useRef, useState } from 'react';

// 3D Point
interface Point3D {
  x: number;
  y: number;
  z: number;
}

// 3D Polygon (Face) for solid-looking parts
interface Face {
  indices: number[];      // Vertices index matching the points array
  color: string;          // Face fill color
  strokeColor: string;    // Outline stroke color
  glow?: boolean;         // Add ambient glow to face
  type?: 'face' | 'screen' | 'eye' | 'mouth';
}

export default function Canvas3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, rx: 0, ry: 0, targetRx: 0, targetRy: 0, isHovering: false, isMouseDown: false, startX: 0, startY: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    
    // 3D parameters
    const focalLength = 350;
    let scaleMultiplier = 1;

    // Define Robot 3D model vertices relative to robot center (0,0,0)
    // Head center is around (0, -45, 0), Torso center is around (0, 15, 0)
    const baseVertices: Point3D[] = [
      // --- HEAD (Index 0 to 7) ---
      { x: -22, y: -65, z: -20 }, // 0: Top-Left-Front
      { x: 22,  y: -65, z: -20 }, // 1: Top-Right-Front
      { x: 22,  y: -30, z: -20 }, // 2: Bottom-Right-Front
      { x: -22, y: -30, z: -20 }, // 3: Bottom-Left-Front
      { x: -22, y: -65, z: 20 },  // 4: Top-Left-Back
      { x: 22,  y: -65, z: 20 },  // 5: Top-Right-Back
      { x: 22,  y: -30, z: 20 },  // 6: Bottom-Right-Back
      { x: -22, y: -30, z: 20 },  // 7: Bottom-Left-Back

      // --- TORSO (Index 8 to 15) ---
      { x: -30, y: -20, z: -25 }, // 8: Top-Left-Front
      { x: 30,  y: -20, z: -25 }, // 9: Top-Right-Front
      { x: 30,  y: 35,  z: -25 }, // 10: Bottom-Right-Front
      { x: -30, y: 35,  z: -25 }, // 11: Bottom-Left-Front
      { x: -30, y: -20, z: 25 },  // 12: Top-Left-Back
      { x: 30,  y: -20, z: 25 },  // 13: Top-Right-Back
      { x: 30,  y: 35,  z: 25 },  // 14: Bottom-Right-Back
      { x: -30, y: 35,  z: 25 },  // 15: Bottom-Left-Back

      // --- CHEST SCREEN (Index 16 to 19) Sits slightly out on front face of Torso
      { x: -18, y: -10, z: -25.5 }, // 16: Top-Left
      { x: 18,  y: -10, z: -25.5 }, // 17: Top-Right
      { x: 18,  y: 20,  z: -25.5 }, // 18: Bottom-Right
      { x: -18, y: 20,  z: -25.5 }, // 19: Bottom-Left

      // --- LEFT EYE (Index 20 to 21) Sits slightly forward on head front
      { x: -10, y: -52, z: -20.5 }, // 20: Eye Center Left

      // --- RIGHT EYE (Index 21) Sits slightly forward on head front
      { x: 10,  y: -52, z: -20.5 }, // 21: Eye Center Right

      // --- ANTENNA (Index 22 to 24)
      { x: 0,   y: -65, z: 0 },    // 22: Base on top of head
      { x: 0,   y: -85, z: 0 },    // 23: Top tip
      { x: 0,   y: -92, z: 0 },    // 24: Glowing bulb sphere center

      // --- LEFT BOLT EAR (Index 25 to 26)
      { x: -22, y: -48, z: 0 },    // 25: Head attach
      { x: -28, y: -48, z: 0 },    // 26: Bolt tip

      // --- RIGHT BOLT EAR (Index 27 to 28)
      { x: 22,  y: -48, z: 0 },    // 27: Head attach
      { x: 28,  y: -48, z: 0 },    // 28: Bolt tip

      // --- LEFT SHOULDER JOINT & ARM (Index 29 to 31)
      { x: -34, y: -10, z: 0 },    // 29: Left Shoulder
      { x: -48, y: 10,  z: -5 },   // 30: Left Elbow
      { x: -44, y: 30,  z: -10 },  // 31: Left Hand

      // --- RIGHT SHOULDER JOINT & ARM (Index 32 to 34)
      { x: 34,  y: -10, z: 0 },    // 32: Right Shoulder
      { x: 48,  y: 10,  z: -5 },   // 33: Right Elbow
      { x: 44,  y: 30,  z: -10 },  // 34: Right Hand

      // --- LEFT LEG (Index 35 to 37)
      { x: -15, y: 35,  z: 0 },    // 35: Left Hip
      { x: -15, y: 65,  z: 0 },    // 36: Left Ankle
      { x: -20, y: 65,  z: -12 },  // 37: Left Toe

      // --- RIGHT LEG (Index 38 to 40)
      { x: 15,  y: 35,  z: 0 },    // 38: Right Hip
      { x: 15,  y: 65,  z: 0 },    // 39: Right Ankle
      { x: 20,  y: 65,  z: -12 },  // 40: Right Toe
    ];

    // Define the solid faces for Painter's Algorithm Depth-Sorting
    const faces: Face[] = [
      // --- HEAD FACES ---
      { indices: [0, 1, 2, 3], color: 'rgba(124, 58, 237, 0.04)', strokeColor: 'rgba(167, 139, 250, 0.8)', glow: true, type: 'face' },     // Head Front
      { indices: [5, 4, 7, 6], color: 'rgba(124, 58, 237, 0.02)', strokeColor: 'rgba(139, 92, 246, 0.4)', type: 'face' },                 // Head Back
      { indices: [4, 5, 1, 0], color: 'rgba(124, 58, 237, 0.03)', strokeColor: 'rgba(139, 92, 246, 0.4)', type: 'face' },                 // Head Top
      { indices: [3, 2, 6, 7], color: 'rgba(124, 58, 237, 0.03)', strokeColor: 'rgba(139, 92, 246, 0.4)', type: 'face' },                 // Head Bottom
      { indices: [4, 0, 3, 7], color: 'rgba(124, 58, 237, 0.03)', strokeColor: 'rgba(139, 92, 246, 0.4)', type: 'face' },                 // Head Left
      { indices: [1, 5, 6, 2], color: 'rgba(124, 58, 237, 0.03)', strokeColor: 'rgba(139, 92, 246, 0.4)', type: 'face' },                 // Head Right

      // --- TORSO FACES ---
      { indices: [8, 9, 10, 11], color: 'rgba(139, 92, 246, 0.03)', strokeColor: 'rgba(167, 139, 250, 0.7)', glow: true, type: 'face' },   // Torso Front
      { indices: [13, 12, 15, 14], color: 'rgba(139, 92, 246, 0.02)', strokeColor: 'rgba(139, 92, 246, 0.4)', type: 'face' },             // Torso Back
      { indices: [12, 13, 9, 8], color: 'rgba(139, 92, 246, 0.02)', strokeColor: 'rgba(139, 92, 246, 0.4)', type: 'face' },               // Torso Top
      { indices: [11, 10, 14, 15], color: 'rgba(139, 92, 246, 0.02)', strokeColor: 'rgba(139, 92, 246, 0.4)', type: 'face' },             // Torso Bottom
      { indices: [12, 8, 11, 15], color: 'rgba(139, 92, 246, 0.02)', strokeColor: 'rgba(139, 92, 246, 0.4)', type: 'face' },             // Torso Left
      { indices: [9, 13, 14, 10], color: 'rgba(139, 92, 246, 0.02)', strokeColor: 'rgba(139, 92, 246, 0.4)', type: 'face' },             // Torso Right

      // --- CHEST SCREEN ---
      { indices: [16, 17, 18, 19], color: 'rgba(9, 9, 15, 0.9)', strokeColor: 'rgba(167, 139, 250, 0.8)', glow: true, type: 'screen' },    // Dark high-tech monitor bezel
    ];

    // Blinking eye parameter
    let blinkTimer = 0;
    let isBlinking = false;

    // Pulse rate for screens & antenna lights
    let tickCount = 0;

    // Resize handler
    const handleResize = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height || 450;

      // Make robot scale fit nicely
      if (width < 380) scaleMultiplier = 1.0;
      else if (width < 500) scaleMultiplier = 1.3;
      else scaleMultiplier = 1.5;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Mouse control bindings
    const handleMouseDown = (e: MouseEvent) => {
      mouseRef.current.isMouseDown = true;
      mouseRef.current.startX = e.clientX;
      mouseRef.current.startY = e.clientY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - width / 2;
      const y = e.clientY - rect.top - height / 2;
      
      mouseRef.current.x = x;
      mouseRef.current.y = y;

      if (mouseRef.current.isMouseDown) {
        const dx = e.clientX - mouseRef.current.startX;
        const dy = e.clientY - mouseRef.current.startY;
        
        mouseRef.current.targetRy += dx * 0.01;
        mouseRef.current.targetRx += dy * 0.01;
        
        mouseRef.current.startX = e.clientX;
        mouseRef.current.startY = e.clientY;
      } else {
        // Organic responsive look towards cursor
        mouseRef.current.targetRy = (x / (width / 2)) * 0.5;
        mouseRef.current.targetRx = -(y / (height / 2)) * 0.3;
      }
    };

    const handleMouseUp = () => {
      mouseRef.current.isMouseDown = false;
    };

    const handleMouseEnter = () => {
      mouseRef.current.isHovering = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.isHovering = false;
      mouseRef.current.isMouseDown = false;
      mouseRef.current.targetRx = 0.2; // Return to cool rest tilt
      mouseRef.current.targetRy = 0.5; // Return to cool rest rotate
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseenter', handleMouseEnter);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Initial default viewing angles
    mouseRef.current.rx = 0.2;
    mouseRef.current.ry = 0.5;
    mouseRef.current.targetRx = 0.2;
    mouseRef.current.targetRy = 0.5;

    // Blinking logic loop
    const updateBlink = () => {
      blinkTimer++;
      if (isBlinking && blinkTimer > 8) {
        isBlinking = false;
        blinkTimer = 0;
      } else if (!isBlinking && blinkTimer > 180 + Math.random() * 200) {
        isBlinking = true;
        blinkTimer = 0;
      }
    };

    // Main animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      tickCount += 0.05;

      updateBlink();

      const mouse = mouseRef.current;
      
      // Interpolate angles for liquid smooth 3D inertia rotation
      mouse.rx += (mouse.targetRx - mouse.rx) * 0.08;
      mouse.ry += (mouse.targetRy - mouse.ry) * 0.08;

      const cosY = Math.cos(mouse.ry);
      const sinY = Math.sin(mouse.ry);
      const cosX = Math.cos(mouse.rx);
      const sinX = Math.sin(mouse.rx);

      const centerX = width / 2;
      const centerY = height / 2;

      // Project vertices to 2D screen
      const projected: { px: number; py: number; pz: number; scale: number }[] = [];

      for (let i = 0; i < baseVertices.length; i++) {
        let v = baseVertices[i];
        let rx = v.x;
        let ry = v.y;
        let rz = v.z;

        // Subtle breathing animation applied to shoulders and arms dynamically
        if (i >= 29 && i <= 34) {
          ry += Math.sin(tickCount) * 1.2;
        }
        // Subtle antenna bobble
        if (i === 23 || i === 24) {
          rx += Math.cos(tickCount * 1.5) * 0.8;
        }

        // Apply rotation Y axis (horizontal rotation)
        let x1 = rx * cosY - rz * sinY;
        let z1 = rx * sinY + rz * cosY;

        // Apply rotation X axis (vertical tilt)
        let y2 = ry * cosX - z1 * sinX;
        let z2 = ry * sinX + z1 * cosX;

        // Calculate perspective
        const scale = focalLength / (focalLength + z2);
        const px = centerX + x1 * scale * scaleMultiplier;
        const py = centerY + y2 * scale * scaleMultiplier;

        projected.push({ px, py, pz: z2, scale });
      }

      // --- PAINTER'S ALGORITHM FOR DEPTH SORTING ---
      // We will sort all elements (Faces, Lines, Circles) by their calculated average Z value (pz)
      // and then draw them in order (back to front).
      
      const renderQueue: any[] = [];

      // Add faces to render queue
      faces.forEach((face, idx) => {
        // Average Z depth of all face vertices
        const avgZ = face.indices.reduce((sum, val) => sum + projected[val].pz, 0) / face.indices.length;
        renderQueue.push({
          type: 'face',
          depth: avgZ,
          draw: () => {
            ctx.beginPath();
            ctx.moveTo(projected[face.indices[0]].px, projected[face.indices[0]].py);
            for (let i = 1; i < face.indices.length; i++) {
              ctx.lineTo(projected[face.indices[i]].px, projected[face.indices[i]].py);
            }
            ctx.closePath();

            // Setup face fill style
            if (face.type === 'screen') {
              ctx.fillStyle = face.color;
              ctx.fill();
              
              // CHEST SCREEN OSCILLOSCOPE EFFECT
              // Find screen coordinates and clip rendering inside bezel
              ctx.save();
              ctx.beginPath();
              ctx.moveTo(projected[16].px, projected[16].py);
              ctx.lineTo(projected[17].px, projected[17].py);
              ctx.lineTo(projected[18].px, projected[18].py);
              ctx.lineTo(projected[19].px, projected[19].py);
              ctx.closePath();
              ctx.clip();

              // Draw screen grid
              ctx.strokeStyle = 'rgba(139, 92, 246, 0.15)';
              ctx.lineWidth = 0.5;
              const step = 8 * scaleMultiplier;
              const screenTop = Math.min(projected[16].py, projected[17].py);
              const screenBottom = Math.max(projected[18].py, projected[19].py);
              const screenLeft = Math.min(projected[16].px, projected[19].px);
              const screenRight = Math.max(projected[17].px, projected[18].px);
              
              for (let lx = screenLeft; lx < screenRight; lx += step) {
                ctx.beginPath(); ctx.moveTo(lx, screenTop); ctx.lineTo(lx, screenBottom); ctx.stroke();
              }
              for (let ly = screenTop; ly < screenBottom; ly += step) {
                ctx.beginPath(); ctx.moveTo(screenLeft, ly); ctx.lineTo(screenRight, ly); ctx.stroke();
              }

              // Draw green-cyan pulse sine wave
              ctx.beginPath();
              ctx.lineWidth = 1.5;
              ctx.strokeStyle = '#22c55e';
              ctx.shadowColor = '#22c55e';
              ctx.shadowBlur = 4;
              
              const screenWidth = screenRight - screenLeft;
              const screenCenterY = (screenTop + screenBottom) / 2;
              const amp = (screenBottom - screenTop) * 0.28;
              
              for (let sx = 0; sx <= screenWidth; sx += 2) {
                const sRatio = sx / screenWidth;
                const waveY = screenCenterY + Math.sin(sRatio * Math.PI * 4 - tickCount * 4) * amp * Math.sin(tickCount + sRatio * Math.PI);
                if (sx === 0) ctx.moveTo(screenLeft + sx, waveY);
                else ctx.lineTo(screenLeft + sx, waveY);
              }
              ctx.stroke();
              ctx.shadowBlur = 0; // reset glow
              ctx.restore();
            } else {
              ctx.fillStyle = face.color;
              ctx.fill();
            }

            // Outline face border
            ctx.lineWidth = 1.0;
            ctx.strokeStyle = face.strokeColor;
            ctx.stroke();

            // Glow overlay
            if (face.glow && face.type === 'face') {
              ctx.save();
              ctx.shadowColor = 'rgba(167, 139, 250, 0.2)';
              ctx.shadowBlur = 12;
              ctx.strokeStyle = face.strokeColor;
              ctx.stroke();
              ctx.restore();
            }
          }
        });
      });

      // Add Antenna Rod & Light to queue
      renderQueue.push({
        type: 'wire',
        depth: (projected[22].pz + projected[23].pz) / 2,
        draw: () => {
          ctx.beginPath();
          ctx.moveTo(projected[22].px, projected[22].py);
          ctx.lineTo(projected[23].px, projected[23].py);
          ctx.lineWidth = 1.5 * scaleMultiplier;
          ctx.strokeStyle = 'rgba(167, 139, 250, 0.8)';
          ctx.stroke();
        }
      });

      renderQueue.push({
        type: 'sphere',
        depth: projected[24].pz - 1, // Sits frontward
        draw: () => {
          // Antenna glowing head
          const rad = 5 * projected[24].scale * scaleMultiplier;
          ctx.beginPath();
          ctx.arc(projected[24].px, projected[24].py, rad, 0, Math.PI * 2);
          
          // Flashing antenna light
          const flash = Math.abs(Math.sin(tickCount * 6));
          ctx.fillStyle = `rgba(167, 139, 250, ${0.4 + flash * 0.6})`;
          ctx.shadowBlur = 10 * flash;
          ctx.shadowColor = '#8b5cf6';
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // Add Bolt Ears
      renderQueue.push({
        type: 'wire',
        depth: projected[25].pz,
        draw: () => {
          ctx.beginPath();
          ctx.moveTo(projected[25].px, projected[25].py);
          ctx.lineTo(projected[26].px, projected[26].py);
          ctx.lineWidth = 2.5 * scaleMultiplier;
          ctx.strokeStyle = 'rgba(139, 92, 246, 0.6)';
          ctx.stroke();
          
          // Ear caps
          ctx.beginPath();
          ctx.arc(projected[26].px, projected[26].py, 2.5 * scaleMultiplier, 0, Math.PI * 2);
          ctx.fillStyle = '#a78bfa';
          ctx.fill();
        }
      });
      renderQueue.push({
        type: 'wire',
        depth: projected[27].pz,
        draw: () => {
          ctx.beginPath();
          ctx.moveTo(projected[27].px, projected[27].py);
          ctx.lineTo(projected[28].px, projected[28].py);
          ctx.lineWidth = 2.5 * scaleMultiplier;
          ctx.strokeStyle = 'rgba(139, 92, 246, 0.6)';
          ctx.stroke();

          // Ear caps
          ctx.beginPath();
          ctx.arc(projected[28].px, projected[28].py, 2.5 * scaleMultiplier, 0, Math.PI * 2);
          ctx.fillStyle = '#a78bfa';
          ctx.fill();
        }
      });

      // Add Arms (Left & Right)
      renderQueue.push({
        type: 'wire',
        depth: (projected[29].pz + projected[30].pz + projected[31].pz) / 3,
        draw: () => {
          // Left Arm Lines
          ctx.beginPath();
          ctx.moveTo(projected[29].px, projected[29].py);
          ctx.lineTo(projected[30].px, projected[30].py);
          ctx.lineTo(projected[31].px, projected[31].py);
          ctx.lineWidth = 2 * scaleMultiplier;
          ctx.strokeStyle = 'rgba(167, 139, 250, 0.8)';
          ctx.stroke();

          // Hand and shoulder joints
          ctx.beginPath();
          ctx.arc(projected[29].px, projected[29].py, 3.5 * scaleMultiplier, 0, Math.PI * 2);
          ctx.arc(projected[30].px, projected[30].py, 2.5 * scaleMultiplier, 0, Math.PI * 2);
          ctx.arc(projected[31].px, projected[31].py, 3 * scaleMultiplier, 0, Math.PI * 2);
          ctx.fillStyle = '#8b5cf6';
          ctx.fill();
        }
      });
      
      renderQueue.push({
        type: 'wire',
        depth: (projected[32].pz + projected[33].pz + projected[34].pz) / 3,
        draw: () => {
          // Right Arm Lines
          ctx.beginPath();
          ctx.moveTo(projected[32].px, projected[32].py);
          ctx.lineTo(projected[33].px, projected[33].py);
          ctx.lineTo(projected[34].px, projected[34].py);
          ctx.lineWidth = 2 * scaleMultiplier;
          ctx.strokeStyle = 'rgba(167, 139, 250, 0.8)';
          ctx.stroke();

          // Hand and shoulder joints
          ctx.beginPath();
          ctx.arc(projected[32].px, projected[32].py, 3.5 * scaleMultiplier, 0, Math.PI * 2);
          ctx.arc(projected[33].px, projected[33].py, 2.5 * scaleMultiplier, 0, Math.PI * 2);
          ctx.arc(projected[34].px, projected[34].py, 3 * scaleMultiplier, 0, Math.PI * 2);
          ctx.fillStyle = '#8b5cf6';
          ctx.fill();
        }
      });

      // Add Legs (Left & Right)
      renderQueue.push({
        type: 'wire',
        depth: (projected[35].pz + projected[36].pz + projected[37].pz) / 3,
        draw: () => {
          ctx.beginPath();
          ctx.moveTo(projected[35].px, projected[35].py);
          ctx.lineTo(projected[36].px, projected[36].py);
          ctx.lineTo(projected[37].px, projected[37].py);
          ctx.lineWidth = 3.5 * scaleMultiplier;
          ctx.strokeStyle = 'rgba(139, 92, 246, 0.6)';
          ctx.stroke();

          // Knee joint cap
          ctx.beginPath();
          ctx.arc(projected[35].px, projected[35].py, 3.5 * scaleMultiplier, 0, Math.PI * 2);
          ctx.fillStyle = '#8b5cf6';
          ctx.fill();
        }
      });
      renderQueue.push({
        type: 'wire',
        depth: (projected[38].pz + projected[39].pz + projected[40].pz) / 3,
        draw: () => {
          ctx.beginPath();
          ctx.moveTo(projected[38].px, projected[38].py);
          ctx.lineTo(projected[39].px, projected[39].py);
          ctx.lineTo(projected[40].px, projected[40].py);
          ctx.lineWidth = 3.5 * scaleMultiplier;
          ctx.strokeStyle = 'rgba(139, 92, 246, 0.6)';
          ctx.stroke();

          // Knee joint cap
          ctx.beginPath();
          ctx.arc(projected[38].px, projected[38].py, 3.5 * scaleMultiplier, 0, Math.PI * 2);
          ctx.fillStyle = '#8b5cf6';
          ctx.fill();
        }
      });

      // Add Eyes (Left & Right)
      renderQueue.push({
        type: 'eye',
        depth: projected[20].pz - 0.5, // Force in front of head face
        draw: () => {
          if (isBlinking) return; // Draw closed eye if blinking

          // Left Eye glowing circular core
          const rad = 3.5 * projected[20].scale * scaleMultiplier;
          ctx.beginPath();
          ctx.arc(projected[20].px, projected[20].py, rad, 0, Math.PI * 2);
          ctx.fillStyle = '#a78bfa';
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#c084fc';
          ctx.fill();
          
          // High-tech circular scanner around eye
          ctx.beginPath();
          ctx.arc(projected[20].px, projected[20].py, rad * 1.8, 0, Math.PI * 2);
          ctx.lineWidth = 0.5;
          ctx.strokeStyle = 'rgba(167, 139, 250, 0.5)';
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      });

      renderQueue.push({
        type: 'eye',
        depth: projected[21].pz - 0.5,
        draw: () => {
          if (isBlinking) return;

          // Right Eye glowing circular core
          const rad = 3.5 * projected[21].scale * scaleMultiplier;
          ctx.beginPath();
          ctx.arc(projected[21].px, projected[21].py, rad, 0, Math.PI * 2);
          ctx.fillStyle = '#a78bfa';
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#c084fc';
          ctx.fill();

          // High-tech circular scanner around eye
          ctx.beginPath();
          ctx.arc(projected[21].px, projected[21].py, rad * 1.8, 0, Math.PI * 2);
          ctx.lineWidth = 0.5;
          ctx.strokeStyle = 'rgba(167, 139, 250, 0.5)';
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      });

      // --- RENDER ACCORDING TO SORTED DEPTH ---
      renderQueue.sort((a, b) => b.depth - a.depth);
      renderQueue.forEach(item => item.draw());
      
      // Floating particles floating around the robot in the grid sphere
      ctx.lineWidth = 0.5;
      for (let pIdx = 0; pIdx < 8; pIdx++) {
        const pRatio = pIdx / 8;
        const pAngle = pRatio * Math.PI * 2 + tickCount * 0.5;
        const pRadius = 130 * scaleMultiplier;
        const px = centerX + Math.cos(pAngle) * pRadius + Math.sin(tickCount + pIdx) * 15;
        const py = centerY + Math.sin(pAngle * 2.3) * (pRadius * 0.4) + Math.cos(tickCount * 0.8 + pIdx) * 20;
        
        ctx.beginPath();
        ctx.arc(px, py, 1.5 * scaleMultiplier, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167, 139, 250, ${0.15 + Math.sin(tickCount + pIdx) * 0.1})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseenter', handleMouseEnter);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isClient]);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[350px] md:min-h-[450px] relative flex items-center justify-center">
      {/* Decorative background radar lines */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden -z-10">
        <div className="w-[85%] h-[85%] border border-accent/5 rounded-full absolute animate-pulse-slow" />
        <div className="w-[60%] h-[60%] border border-accent/5 rounded-full absolute" style={{ animationDelay: '1s' }} />
        <div className="w-[35%] h-[35%] border border-accent/5 rounded-full absolute" style={{ animationDelay: '2s' }} />
      </div>
      
      {/* Glow orb */}
      <div className="absolute inset-0 bg-radial from-accent/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <canvas
        ref={canvasRef}
        className="block cursor-grab active:cursor-grabbing max-w-full max-h-full drop-shadow-[0_0_40px_rgba(139,92,246,0.18)]"
      />
    </div>
  );
}
