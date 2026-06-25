'use client';

import { useState, useEffect } from 'react';

export default function ProjectModal({ isOpen, onClose, project }) {
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

  if (!isOpen || !project) return null;

  const gallery = project.gallery || [project.img];

  const nextSlide = () => setCurrentSlide(p => (p + 1) % gallery.length);
  const prevSlide = () => setCurrentSlide(p => (p - 1 + gallery.length) % gallery.length);

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

  const isSingleButton = (project.githubLink && !project.liveLink) || (!project.githubLink && project.liveLink);

  // Komponen Tombol agar tidak menulis ulang kode untuk versi Mobile & Desktop
  const ActionButtons = ({ isMobile }) => (
    <>
      {project.githubLink && (
        <a 
          href={project.githubLink} 
          target="_blank" 
          rel="noopener noreferrer" 
          className={`flex-1 font-semibold ${isMobile ? 'py-3' : 'py-2.5'} rounded-[6px] flex items-center justify-center gap-2 transition-all duration-300 ease-out transform hover:-translate-y-1 hover:shadow-lg active:scale-95 text-[13px] ${
            isSingleButton 
              ? 'bg-primary text-bg-dark hover:brightness-110 shadow-primary/20' 
              : 'bg-transparent border border-border-color text-text-main hover:bg-white/5 hover:border-text-main'
          }`}
        >
          <i className="fa-brands fa-github text-[14px]"></i> Link Project
        </a>
      )}
      
      {project.liveLink && (
        <a 
          href={project.liveLink} 
          target="_blank" 
          rel="noopener noreferrer" 
          className={`flex-1 bg-primary text-bg-dark font-semibold ${isMobile ? 'py-3' : 'py-2.5'} rounded-[6px] flex items-center justify-center gap-2 transition-all duration-300 ease-out transform hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/20 hover:brightness-110 active:scale-95 text-[13px]`}
        >
          <i className="fa-solid fa-arrow-up-right-from-square text-[13px]"></i> Live Demo
        </a>
      )}
    </>
  );

  return (
    // Background Overlay: Menggunakan h-full agar responsif sempurna di HP
    <div className="fixed inset-0 z-[999999] flex items-center justify-center p-0 sm:p-4 lg:p-6 bg-black/90 sm:bg-black/80 backdrop-blur-sm transition-all duration-300 h-full w-full" onClick={onClose}>
      
      {/* Container Utama: 
          HP: Tinggi penuh (h-full), tanpa rounded.
          Desktop: h-[85vh], rounded.
      */}
      <div 
        className="bg-bg-dark sm:bg-bg-dark/95 sm:backdrop-blur-2xl w-full max-w-[1100px] rounded-none sm:rounded-[16px] md:rounded-[20px] border-none sm:border border-border-color relative sm:shadow-2xl flex flex-col h-full sm:h-[90vh] md:h-[85vh] animate-fade-in-up overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* ==========================================
            HEADER FIXED
            ========================================== */}
        <div className="flex justify-between items-center px-4 sm:px-5 py-4 md:px-6 border-b border-border-color shrink-0 z-10 bg-bg-dark sm:bg-transparent">
          <h2 className="text-[1.1rem] sm:text-lg md:text-[1.4rem] font-semibold text-text-main tracking-tight leading-tight line-clamp-1 pr-4">
            {project.title}
          </h2>
          <button onClick={onClose} className="w-8 h-8 shrink-0 rounded-full border border-border-color text-text-muted hover:text-text-main hover:bg-white/5 transition-all flex items-center justify-center bg-bg-dark sm:bg-transparent">
            <i className="fa-solid fa-xmark text-[14px]"></i>
          </button>
        </div>

        {/* ==========================================
            BODY (Kunci Scroll Responsif)
            HP: Seluruh area ini bisa di-scroll dari atas ke bawah.
            Desktop: Area ini disembunyikan overflow-nya, karena Kiri & Kanan akan scroll sendiri.
            ========================================== */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden custom-scrollbar bg-bg-dark sm:bg-transparent">
          
          {/* ------------------------------------------
              PANE KIRI: Visual & Tags
              ------------------------------------------ */}
          <div className="w-full lg:w-1/2 h-auto lg:h-full lg:overflow-y-auto custom-scrollbar p-4 sm:p-5 md:p-6 flex flex-col gap-6 border-b lg:border-b-0 lg:border-r border-border-color shrink-0">
            
            {/* Slider */}
            <div 
              className="relative w-full overflow-hidden rounded-[8px] border border-border-color aspect-video bg-black shrink-0 group"
              onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}
            >
              <div className="flex transition-transform duration-500 ease-out h-full" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {gallery.map((img, idx) => (
                  <div key={idx} className="min-w-full h-full relative flex items-center justify-center overflow-hidden">
                    <img src={img} alt={`${project.title} slide ${idx + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              
              {gallery.length > 1 && (
                <>
                  <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex justify-between opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                    <button onClick={(e) => { e.stopPropagation(); prevSlide(); }} className="w-8 h-8 sm:w-7 sm:h-7 rounded-full bg-black/60 text-white pointer-events-auto flex items-center justify-center backdrop-blur-sm hover:scale-110 active:scale-90 transition-all"><i className="fa-solid fa-chevron-left text-[11px]"></i></button>
                    <button onClick={(e) => { e.stopPropagation(); nextSlide(); }} className="w-8 h-8 sm:w-7 sm:h-7 rounded-full bg-black/60 text-white pointer-events-auto flex items-center justify-center backdrop-blur-sm hover:scale-110 active:scale-90 transition-all"><i className="fa-solid fa-chevron-right text-[11px]"></i></button>
                  </div>
                  <div className="absolute bottom-2 sm:bottom-3 left-0 right-0 flex justify-center gap-1.5 z-20">
                    {gallery.map((_, idx) => (
                      <div key={idx} onClick={(e) => { e.stopPropagation(); setCurrentSlide(idx); }} className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${currentSlide === idx ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/80'}`}></div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Tags Section */}
            <div className="flex flex-col gap-5">
              <div>
                <h4 className="text-[11px] uppercase tracking-widest font-bold mb-2 text-text-muted">TechStack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.techtools?.map((t, i) => (
                    <span key={i} className="font-mono px-2.5 py-[3px] rounded-[4px] bg-white/5 border border-border-color text-text-main text-[11px] tracking-tight">{t}</span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-[11px] uppercase tracking-widest font-bold mb-2 text-text-muted">Role & Skill</h4>
                <div className="flex flex-wrap gap-2">
                  {project.role?.map((r, i) => (
                    <span key={i} className="font-mono px-2.5 py-[3px] rounded-[4px] bg-primary/10 border border-primary/20 text-primary text-[11px] tracking-tight">{r}</span>
                  ))}
                </div>
              </div>
            </div>

          </div>


          {/* ------------------------------------------
              PANE KANAN: Penjelasan (Dinamis)
              ------------------------------------------ */}
          <div className="w-full lg:w-1/2 h-auto lg:h-full flex flex-col bg-transparent lg:bg-white/[0.01]">
            
            {/* AREA TEKS */}
            <div className="flex-1 lg:overflow-y-auto custom-scrollbar p-4 sm:p-5 md:p-6 flex flex-col gap-6">
              
              {project.problem && (
                <div>
                  <h4 className="text-[13px] font-bold text-text-main mb-1.5 flex items-center">
                    <i className="fa-solid fa-triangle-exclamation text-primary mr-2 opacity-80 text-[12px]"></i> 
                    {project.problemTitle || 'Problem'}
                  </h4>
                  <p className="text-[12.5px] md:text-[13px] leading-[1.65] text-text-muted text-justify">
                    {project.problem}
                  </p>
                </div>
              )}

              {project.solution && (
                <div>
                  <h4 className="text-[13px] font-bold text-text-main mb-1.5 flex items-center">
                    <i className="fa-solid fa-lightbulb text-primary mr-2 opacity-80 text-[12px]"></i> 
                    {project.solutionTitle || 'Solution'}
                  </h4>
                  <p className="text-[12.5px] md:text-[13px] leading-[1.65] text-text-muted text-justify whitespace-pre-line">
                    {project.solution}
                  </p>
                </div>
              )}

              {project.desc && (
                <div>
                  <h4 className="text-[13px] font-bold text-text-main mb-1.5 flex items-center">
                    <i className="fa-solid fa-layer-group text-primary mr-2 opacity-80 text-[12px]"></i> 
                    {project.descTitle || 'Overview'}
                  </h4>
                  <p className="text-[12.5px] md:text-[13px] leading-[1.65] text-text-muted text-justify">
                    {project.desc}
                  </p>
                </div>
              )}
              
            </div>

            {/* ACTION BUTTONS (Khusus DESKTOP - Muncul di bawah teks kanan) */}
            <div className="hidden lg:flex shrink-0 px-6 pb-6 pt-2 bg-transparent gap-3 z-20">
              <ActionButtons isMobile={false} />
            </div>

          </div>

        </div>

        {/* ==========================================
            ACTION BUTTONS (Khusus MOBILE)
            Tombol diletakkan di paling luar agar 100% Sticky di bawah
            serta tidak akan pernah ikut ke-scroll atau tertutup.
            ========================================== */}
        <div className="flex lg:hidden shrink-0 p-4 pb-6 sm:pb-4 border-t border-border-color bg-bg-dark z-20 gap-3">
          <ActionButtons isMobile={true} />
        </div>

      </div>
    </div>
  );
}