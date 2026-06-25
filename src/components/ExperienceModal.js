'use client';

import { useState, useEffect } from 'react';

export default function ExperienceModal({ isOpen, onClose, experience }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setCurrentSlide(0);
      document.body.style.overflow = 'hidden'; 
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  if (!isOpen || !experience) return null;

  const slides = experience.gallery && experience.gallery.length > 0 
    ? experience.gallery 
    : [];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  // Navigasi Geser Layar Sentuh untuk Foto
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    if (touchStart - touchEnd > 50) nextSlide();
    if (touchStart - touchEnd < -50) prevSlide();
  };

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 sm:p-5 bg-black/80 backdrop-blur-sm transition-all duration-300" onClick={onClose}>
      
      {/* Container Utama Modal: 
          h-auto = tinggi mengikuti konten 
          max-h-[95dvh] = batas maksimal tinggi agar tidak keluar layar HP
      */}
      <div 
        className="bg-bg-dark/95 backdrop-blur-2xl w-full max-w-[600px] rounded-[20px] md:rounded-[24px] border border-border-color relative shadow-2xl h-auto max-h-[95dvh] md:max-h-[90vh] flex flex-col animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* ========================================================
            HEADER FIXED (Tidak ikut ter-scroll) 
            ======================================================== */}
        <div className="flex justify-between items-start px-5 py-4 md:px-8 md:py-6 border-b border-border-color shrink-0">
          <div>
            <h2 className="text-[1.2rem] md:text-[1.5rem] font-bold text-text-main mt-0 mb-1.5 leading-tight pr-2">
              {experience.role}
            </h2>
            <p className="text-primary font-semibold text-[13px] m-0 flex flex-wrap gap-1">
              {experience.institution} <span className="text-text-muted opacity-80 font-normal">| {experience.period}</span>
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="w-8 h-8 md:w-9 md:h-9 shrink-0 rounded-full flex items-center justify-center transition-all bg-white/5 border border-border-color text-text-main hover:bg-primary hover:text-bg-dark hover:border-primary"
          >
            <i className="fa-solid fa-xmark text-[14px]"></i>
          </button>
        </div>


        {/* ========================================================
            BODY SCROLLABLE 
            ======================================================== */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-5 md:p-8 flex flex-col gap-6">
          
          {/* FOKUS UTAMA: Key Achievements */}
          <div className="px-1">
            <h4 className="text-[13px] mb-[12px] tracking-wider text-text-main font-bold uppercase flex items-center gap-2">
               <i className="fa-solid fa-award text-primary"></i> Key Achievements
            </h4>
            <ul className="list-disc pl-[20px] text-text-muted leading-[1.7] text-[13.5px] md:text-[14px] space-y-[8px]">
              {experience.achievements?.map((item, i) => (
                <li key={i} className="pl-1 marker:text-primary">{item}</li>
              ))}
            </ul>
          </div>

          {/* PELENGKAP: Slider Dokumentasi */}
          {slides.length > 0 && (
            <div className="pt-2 mb-2">
              <h4 className="text-[11px] mb-[15px] tracking-widest text-text-muted font-bold uppercase text-center flex items-center justify-center gap-3">
                <span className="w-12 h-[1px] bg-border-color"></span>
                Documentation
                <span className="w-12 h-[1px] bg-border-color"></span>
              </h4>
              
              <div 
                className="relative w-full max-w-[400px] mx-auto overflow-hidden rounded-[12px] border border-border-color bg-black group aspect-video md:h-[200px]"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div className="flex transition-transform duration-500 ease-out h-full" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                  {slides.map((slide, idx) => (
                    <div key={idx} className="min-w-full h-full relative flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 bg-cover bg-center opacity-30 blur-xl scale-110" style={{ backgroundImage: `url(${slide})` }}></div>
                      <img src={slide} alt={`Documentation ${idx + 1}`} className="relative z-10 w-full h-full object-contain" />
                    </div>
                  ))}
                </div>
                
                {slides.length > 1 && (
                  <>
                    <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex justify-between opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                      <button onClick={(e) => { e.stopPropagation(); prevSlide(); }} className="w-[28px] h-[28px] rounded-full bg-black/60 backdrop-blur-sm text-white hover:bg-primary hover:text-bg-dark transition-all pointer-events-auto flex items-center justify-center text-[10px]"><i className="fa-solid fa-chevron-left"></i></button>
                      <button onClick={(e) => { e.stopPropagation(); nextSlide(); }} className="w-[28px] h-[28px] rounded-full bg-black/60 backdrop-blur-sm text-white hover:bg-primary hover:text-bg-dark transition-all pointer-events-auto flex items-center justify-center text-[10px]"><i className="fa-solid fa-chevron-right"></i></button>
                    </div>
                    <div className="absolute bottom-[8px] left-0 right-0 flex justify-center gap-[5px] z-20">
                      {slides.map((_, idx) => (
                        <div key={idx} onClick={(e) => { e.stopPropagation(); setCurrentSlide(idx); }} className={`h-[5px] rounded-full transition-all cursor-pointer ${currentSlide === idx ? 'bg-primary w-[16px]' : 'bg-white/60 w-[5px] hover:bg-white'}`}></div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}