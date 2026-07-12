// src/components/modals/CertModal.js
'use client';

import { useEffect } from 'react';

export default function CertModal({ isOpen, onClose, cert }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen || !cert) return null;

  return (
    <div 
      style={{
        position: 'fixed', inset: 0, zIndex: 999999,
        backgroundColor: 'rgba(0, 0, 0, 0.85)', 
        backdropFilter: 'blur(15px)', WebkitBackdropFilter: 'blur(15px)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '2rem',
        opacity: 1, transition: 'opacity 0.4s ease',
        cursor: 'pointer' 
      }}
    
      onClick={onClose} 
    >
      <style>{`
        @keyframes imagePop {
          0% { opacity: 0; transform: scale(0.95) translateY(10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>

      {/* Tombol Close */}
      <button 
        onClick={onClose}
        style={{
          position: 'absolute', top: '2rem', right: '2rem', zIndex: 10,
          background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '50%', 
          width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#ffffff', cursor: 'pointer', transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <i className="ph ph-x" style={{ fontSize: '1.2rem' }}></i>
      </button>

      {/* PEMBUNGKUS KONTEN (Shrink-wrap) */}
      <div 
        style={{ 
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          animation: 'imagePop 0.4s cubic-bezier(0.32, 0.72, 0, 1)',
          cursor: 'default' 
        }}
       
        onClick={(e) => e.stopPropagation()} 
      >
        
        {/* GAMBAR SERTIFIKAT */}
        <img
          src={cert.image}
          alt={cert.title}
          style={{
            maxHeight: '75vh', 
            maxWidth: '90vw', 
            objectFit: 'contain',
            borderRadius: '10px', 
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.08)', 
            marginBottom: '1.5rem',
            background: 'transparent'
          }}
        />

        {/* TEKS CAPTION */}
        <div style={{ textAlign: 'center', color: '#ffffff' }}>
          <h3 style={{ 
            fontSize: '1.5rem', 
            fontWeight: '700', 
            marginBottom: '0.4rem', 
            letterSpacing: '-0.3px',
            textShadow: '0 2px 10px rgba(0,0,0,0.8)' 
          }}>
            {cert.title}
          </h3>
          <p style={{ 
            fontSize: '1rem', 
            color: 'rgba(255, 255, 255, 0.7)', 
            fontWeight: '500', 
            margin: 0 
          }}>
            {cert.issuer} <span style={{ margin: '0 0.5rem', opacity: 0.5 }}>•</span> {cert.year}
          </p>
        </div>

      </div>
    </div>
  );
}