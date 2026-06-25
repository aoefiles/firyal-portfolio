'use client';

import { useRef } from 'react';

export default function TiltWrapper({ children, className }) {
  const tiltRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = tiltRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Sudut Miring
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -10;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 10;
    
    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    el.style.transition = 'none';
  };

  const handleMouseLeave = () => {
    const el = tiltRef.current;
    if (!el) return;
    el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    el.style.transition = `transform 0.5s ease`;
  };

  return (
    <div
      ref={tiltRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`tilt-element ${className}`}
    >
      {children}
    </div>
  );
}