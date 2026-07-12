// src/components/modals/ProjectModal.js
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

  const gallery = project.gallery || [];
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

  // Komponen Tombol Aksi (Mobile & Desktop)
  const ActionButtons = () => (
    <>
      {project.githubLink && (
        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="modal-action-btn btn-secondary">
          <i className="ph ph-github-logo" style={{ fontSize: '1.2rem' }}></i> Link Project
        </a>
      )}
      {project.liveLink && (
        <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="modal-action-btn btn-primary">
          Live Demo <i className="ph ph-arrow-up-right" style={{ fontSize: '1.2rem' }}></i>
        </a>
      )}
    </>
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        
        {/* HEADER */}
        <div className="modal-header">
          <h2 style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '1rem' }}>
            {project.title}
          </h2>
          <button onClick={onClose} style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="ph ph-x"></i>
          </button>
        </div>

        {/* BODY LAYOUT 2-PANE */}
        <div className="modal-body-wrapper custom-scrollbar">
          
          {/* KIRI: Visual & Tags */}
          <div className="modal-left custom-scrollbar">
            
            {/* Slider Images */}
            <div className="slider-container" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
              <div className="slider-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {gallery.map((img, idx) => (
                  <div key={idx} className="slider-slide">
                    <img src={img} alt={`Slide ${idx}`} />
                  </div>
                ))}
              </div>
              {gallery.length > 1 && (
                <>
                  <div style={{ position: 'absolute', top: '50%', left: '10px', right: '10px', transform: 'translateY(-50%)', display: 'flex', justifyContent: 'space-between', zIndex: 10, pointerEvents: 'none' }}>
                    <button onClick={(e) => { e.stopPropagation(); prevSlide(); }} className="slider-btn"><i className="ph ph-caret-left"></i></button>
                    <button onClick={(e) => { e.stopPropagation(); nextSlide(); }} className="slider-btn"><i className="ph ph-caret-right"></i></button>
                  </div>
                  <div className="slider-dots">
                    {gallery.map((_, idx) => (
                      <div key={idx} onClick={(e) => { e.stopPropagation(); setCurrentSlide(idx); }} style={{ width: currentSlide === idx ? '16px' : '6px', height: '6px', borderRadius: '6px', cursor: 'pointer', pointerEvents: 'auto', background: currentSlide === idx ? '#fff' : 'rgba(255,255,255,0.4)', transition: 'all 0.3s' }}></div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Tags (Techstack & Role) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <h4 style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>TechStack</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {project.techtools?.map((t, i) => (
                    <span key={i} style={{ fontFamily: 'monospace', padding: '0.3rem 0.6rem', borderRadius: '6px', background: 'var(--element-bg)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', fontSize: '0.75rem' }}>{t}</span>
                  ))}
                </div>
              </div>
              <div>
                <h4 style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Role & Skill</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {project.role?.map((r, i) => (
                    <span key={i} style={{ fontFamily: 'monospace', padding: '0.3rem 0.6rem', borderRadius: '6px', background: 'rgba(141, 164, 247, 0.1)', border: '1px solid rgba(141, 164, 247, 0.2)', color: '#8da4f7', fontSize: '0.75rem' }}>{r}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* KANAN: Text Details */}
          <div className="modal-right">
            <div className="modal-right-content custom-scrollbar">
              
              {project.descTitle1 && (
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <i className="ph ph-stack text-primary" style={{ color: '#8da4f7' }}></i> {project.descTitle1}
                  </h4>
                  <p style={{ fontSize: '0.85rem', lineHeight: '1.7', color: 'var(--text-secondary)', margin: 0, textAlign: 'justify' }}>{project.desc1}</p>
                </div>
              )}

              {project.descTitle2 && (
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <i className="ph ph-warning text-primary" style={{ color: '#8da4f7' }}></i> {project.descTitle2}
                  </h4>
                  <p style={{ fontSize: '0.85rem', lineHeight: '1.7', color: 'var(--text-secondary)', margin: 0, textAlign: 'justify' }}>{project.desc2}</p>
                </div>
              )}

              {project.descTitle3 && (
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <i className="ph ph-lightbulb text-primary" style={{ color: '#8da4f7' }}></i> {project.descTitle3}
                  </h4>
                  <p style={{ fontSize: '0.85rem', lineHeight: '1.7', color: 'var(--text-secondary)', margin: 0, textAlign: 'justify', whiteSpace: 'pre-line' }}>{project.desc3}</p>
                </div>
              )}

            </div>
            
            {/* Action Buttons (Desktop) */}
            <div className="desktop-actions">
              <ActionButtons />
            </div>
          </div>

        </div>

        {/* Action Buttons (Mobile) */}
        <div className="mobile-actions">
           <ActionButtons />
        </div>

      </div>
    </div>
  );
}