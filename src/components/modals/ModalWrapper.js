// src/components/modals/ModalWrapper.js
"use client";
import { useEffect } from 'react';

export default function ModalWrapper({ isOpen, onClose, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', 
        zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1.5rem', opacity: 1, transition: 'opacity 0.4s ease'
      }}
      onClick={onClose}
    >
  
      <style>{`
        @keyframes iosPop {
          0% { opacity: 0; transform: translateY(100px) scale(0.92); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      <div 
        style={{
          background: 'var(--bg-body)',
          border: '1px solid var(--glass-border)',
          borderRadius: '32px', 
          width: '100%', maxWidth: '750px', maxHeight: '85vh',
          overflowY: 'auto', position: 'relative',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          display: 'flex', flexDirection: 'column',
          animation: 'iosPop 0.5s cubic-bezier(0.32, 0.72, 0, 1)' 
        }}
        onClick={(e) => e.stopPropagation()} 
      >
        {/* Tombol Close */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute', top: '1.2rem', right: '1.2rem', zIndex: 50,
            background: 'var(--element-bg)', 
            backdropFilter: 'blur(15px)', WebkitBackdropFilter: 'blur(15px)',
            border: '1px solid var(--glass-border)', 
            borderRadius: '50%', 
            width: '34px', height: '34px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--text-primary)', 
            cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
            boxShadow: 'var(--element-shadow)' 
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.background = 'var(--element-hover)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.background = 'var(--element-bg)';
          }}
        >
          <i className="ph ph-x" style={{ fontSize: '1.05rem', fontWeight: 'bold' }}></i>
        </button>

        {children}
      </div>
    </div>
  );
}