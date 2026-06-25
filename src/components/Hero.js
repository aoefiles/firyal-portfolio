'use client';

import { useEffect, useRef } from 'react';

export default function Hero() {
  const canvasRef = useRef(null);

  // Efek Typing
  useEffect(() => {
    const words = ["Data", "Design", "Decision", "Business"];
    let wordIndex = 0, charIndex = 0, isDeleting = false;
    const typingElement = document.getElementById("hero-typing-text");
    let typingTimer;

    function typeEffect() {
      if (!typingElement) return;
      const currentWord = words[wordIndex];
      
      if (isDeleting) { 
        typingElement.textContent = currentWord.substring(0, charIndex - 1); 
        charIndex--; 
      } else { 
        typingElement.textContent = currentWord.substring(0, charIndex + 1); 
        charIndex++; 
      }
      
      let typeSpeed = isDeleting ? 50 : 100;
      if (!isDeleting && charIndex === currentWord.length) { 
        typeSpeed = 2000; 
        isDeleting = true; 
      } else if (isDeleting && charIndex === 0) { 
        isDeleting = false; 
        wordIndex = (wordIndex + 1) % words.length; 
        typeSpeed = 500; 
      }
      typingTimer = setTimeout(typeEffect, typeSpeed);
    }
    typingTimer = setTimeout(typeEffect, 1000);
    return () => clearTimeout(typingTimer);
  }, []);

  // Efek Animasi Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height, points = [], bars = [];
    const numPoints = 25, numBars = 40;
    let animationFrameId;

    function initCanvas() {
      width = canvas.width = window.innerWidth; 
      height = canvas.height = window.innerHeight;
      points = []; 
      for(let i=0; i<=numPoints; i++) { 
        points.push({ x: (i/numPoints) * width, y: height/2 + (Math.random() * 150 - 75), targetY: height/2 + (Math.random() * 150 - 75) }); 
      }
      bars = []; 
      for(let i=0; i<numBars; i++) { 
        bars.push({ x: (i/numBars) * width, w: (width/numBars) - (width > 768 ? 8 : 2), h: Math.random() * (height/3), targetH: Math.random() * (height/3) }); 
      }
    }

    function animateDataBg() {
      const isLightMode = document.body.classList.contains('light-mode');
      const canvasColor = isLightMode ? '109, 81, 163' : '195, 180, 227';

      ctx.clearRect(0, 0, width, height); 
      ctx.fillStyle = `rgba(${canvasColor}, 0.03)`;
      
      bars.forEach(bar => { 
        bar.h += (bar.targetH - bar.h) * 0.02; 
        if(Math.abs(bar.targetH - bar.h) < 1) bar.targetH = Math.random() * (height/3); 
        ctx.fillRect(bar.x, height - bar.h, bar.w, bar.h); 
      });
      
      ctx.beginPath(); 
      ctx.moveTo(points[0].x, points[0].y);
      for(let i=0; i<points.length - 1; i++) {
        points[i].y += (points[i].targetY - points[i].y) * 0.01;
        if(Math.abs(points[i].targetY - points[i].y) < 1) points[i].targetY = height/2 + (Math.random() * 200 - 100);
        let xc = (points[i].x + points[i+1].x) / 2, yc = (points[i].y + points[i+1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
      }
      
      let last = points[points.length-1]; 
      last.y += (last.targetY - last.y) * 0.01;
      if(Math.abs(last.targetY - last.y) < 1) last.targetY = height/2 + (Math.random() * 200 - 100);
      
      ctx.lineTo(last.x, last.y); 
      ctx.strokeStyle = `rgba(${canvasColor}, 0.15)`; 
      ctx.lineWidth = 2; 
      ctx.stroke();
      ctx.lineTo(width, height); 
      ctx.lineTo(0, height); 
      ctx.fillStyle = `rgba(${canvasColor}, 0.02)`; 
      ctx.fill();
      
      animationFrameId = requestAnimationFrame(animateDataBg);
    }

    window.addEventListener('resize', initCanvas); 
    initCanvas();
    animateDataBg();

    return () => {
      window.removeEventListener('resize', initCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden px-5 transition-colors duration-300" style={{ background: 'var(--hero-bg)' }}>
      {/* Canvas Background */}
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"></canvas>
      
      {/* Konten Hero */}
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-[3.5rem] font-semibold mb-2.5">
          hi! I'm <i className="font-light italic text-text-muted">Firyal</i>
        </h1>
        
        <h1 className="text-[3.5rem] font-semibold mb-6">
          Making Sense of <span id="hero-typing-text" className="text-primary"></span>
          <span className="cursor">&nbsp;</span>
        </h1>
        
        <p className="text-[0.9rem] mb-[30px] max-w-[600px] text-text-muted">
          Using analytics, research, and visual communication to uncover insights that matter.
        </p>
        
        <div className="flex gap-[15px] mt-4">
          {/* Tombol Resume */}
          <a 
            href="/resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="px-[25px] py-[10px] rounded-[50px] text-[0.9rem] font-semibold bg-primary text-bg-dark hover:scale-[1.02] hover:shadow-[0_0_20px_var(--color-primary)] transition-all duration-300 flex items-center gap-[8px] group"
          >
            <i className="fa-solid fa-download transition-transform duration-300 group-hover:-translate-y-1"></i> Resume
          </a>

          {/* Tombol My Works */}
          <a 
            href="#projects" 
            className="px-[25px] py-[10px] rounded-[50px] text-[0.9rem] font-semibold bg-transparent border border-border-color text-text-main hover:border-primary hover:text-primary transition-all duration-300 flex items-center gap-[8px] group backdrop-blur-[5px]"
          >
            My Works <i className="fa-solid fa-arrow-right transition-transform duration-300 group-hover:translate-x-1"></i>
          </a>
        </div>
      </div>
    </section>
  );
}