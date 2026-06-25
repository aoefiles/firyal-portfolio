'use client';

import { useEffect } from 'react';

export default function CertificateModal({ isOpen, onClose, imageUrl }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; 
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center p-5 bg-[var(--bg-overlay)] backdrop-blur-md transition-all duration-300" onClick={onClose}>
      <div 
        className="bg-bg-card backdrop-blur-[20px] w-full max-w-[850px] rounded-[20px] border border-border-color p-[25px] md:px-[30px] relative shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform transition-transform duration-500 animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-[20px] border-b border-border-color pb-[15px]">
          <span className="text-[0.9rem] font-semibold text-text-muted tracking-[2px] uppercase">Certificate</span>
          <button onClick={onClose} className="bg-white/5 border border-border-color text-text-main w-[40px] h-[40px] rounded-full flex items-center justify-center text-[1.1rem] transition-all hover:bg-primary hover:text-bg-dark">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        
        <div className="flex justify-center items-center w-full">
          <img 
            src={imageUrl || "https://via.placeholder.com/800x600?text=Certificate+Image"} 
            className="max-w-full max-h-[65vh] object-contain rounded-[8px] shadow-[0_5px_15px_rgba(0,0,0,0.3)]" 
            alt="Sertifikat" 
          />
        </div>
      </div>
    </div>
  );
}