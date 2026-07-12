// src/components/modals/ExpModal.js
'use client';
import { useEffect } from 'react';

export default function ExpModal({ isOpen, onClose, exp }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen || !exp) return null;

  const gallery = exp.gallery && exp.gallery.length > 0 ? exp.gallery : [];

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 999999,
      backgroundColor: 'rgba(0, 0, 0, 0.65)',
      backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem',
      opacity: 1, transition: 'opacity 0.4s ease',
      cursor: 'pointer' 
    }} onClick={onClose}>
      
      {/* Animasi Pop-up */}
      <style>{`
        @keyframes scaleUpFade {
          0% { opacity: 0; transform: scale(0.95) translateY(10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        /* Menyembunyikan scrollbar bawaan browser untuk galeri horizontal */
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* KONTAINER MODAL (Simple Squircle) */}
      <div style={{
        background: 'var(--bg-body)', width: '100%', maxWidth: '700px',
        borderRadius: '24px', overflow: 'hidden',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
        border: '1px solid var(--glass-border)',
        display: 'flex', flexDirection: 'column',
        animation: 'scaleUpFade 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        maxHeight: '90vh', cursor: 'default',
        position: 'relative'
      }} onClick={e => e.stopPropagation()}>

        {/* Tombol Close */}
        <button onClick={onClose} style={{
            position: 'absolute', top: '1.5rem', right: '1.5rem', zIndex: 10,
            background: 'var(--element-bg)', border: '1px solid var(--glass-border)',
            borderRadius: '50%', width: '36px', height: '36px', display: 'flex',
            alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)',
            cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: 'var(--element-shadow)'
        }} onMouseEnter={e => e.currentTarget.style.transform='scale(1.1)'} onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}>
            <i className="ph ph-x"></i>
        </button>

        {/* AREA KONTEN */}
        <div className="custom-scrollbar" style={{ padding: '2.5rem', overflowY: 'auto' }}>
            
            {/* 1. HEADER INFORMASI */}
            <div style={{ paddingRight: '3rem', marginBottom: '1.5rem' }}>
                
                {/* Meta data (Logo, Perusahaan, Waktu) */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.9rem', flexWrap: 'wrap' }}>
                    {exp.logo && (
                      <img src={exp.logo} alt="logo" style={{ width:'28px', height:'28px', borderRadius:'6px', objectFit:'cover', border: '1px solid var(--glass-border)' }}/>
                    )}
                    <span style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-primary)' }}>{exp.company}</span>
                    <span style={{ color: 'var(--glass-border)' }}>|</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{exp.period}</span>
                </div>
                
                {/* Judul Peran */}
                <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-primary)', lineHeight: '1', letterSpacing: '-0.5px' }}>
                    {exp.role}
                </h2>
            </div>

            {/* 2. DESKRIPSI UTAMA */}
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginTop: '1.5rem', marginBottom: '1.5rem',textAlign: 'justify' }}>
                {exp.desc}
            </p>

            {/* 3. KEY ACHIEVEMENTS */}
            {exp.achievements && exp.achievements.length > 0 && (
                <div style={{ marginBottom: '2.5rem' }}>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Key Achievements
                    </h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {exp.achievements.map((achieve, idx) => (
                            <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                                {/* Ikon check monokrom */}
                                <i className="ph ph-check-circle" style={{ color: 'var(--text-primary)', fontSize: '1.2rem', marginTop: '2px', opacity: 0.7, flexShrink: 0 }}></i>
                                <span>{achieve}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* 4. DOKUMENTASI*/}
            {gallery.length > 0 && (
                <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem' }}>
                    <h4 style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Documentation
                    </h4>
                    
                    {/* Galeri Horizontal (Swipe-able) */}
                    <div className="hide-scroll" style={{ 
                        display: 'flex', gap: '1rem', overflowX: 'auto', 
                        paddingBottom: '0.5rem', scrollSnapType: 'x mandatory' 
                    }}>
                        {gallery.map((img, idx) => (
                            <img 
                              key={idx} 
                              src={img} 
                              alt={`doc-${idx}`} 
                              style={{ 
                                height: '150px', 
                                minWidth: '240px', 
                                objectFit: 'cover', 
                                borderRadius: '12px', 
                                border: '1px solid var(--glass-border)', 
                                scrollSnapAlign: 'start', 
                                flexShrink: 0 
                              }} 
                            />
                        ))}
                    </div>
                </div>
            )}

        </div>
      </div>
    </div>
  );
}