// src/app/project/page.js
"use client";

import { useState } from 'react';
import Navbar from '../../components/Navbar';
import { projectsData } from '@/data/project';
import { certificatesData } from '@/data/certificates';
import { experienceData } from '@/data/experience';
import ProjectModal from '@/components/modals/ProjectModal';
import CertModal from '@/components/modals/CertModal';
import ExpModal from '@/components/modals/ExpModal';

const getPillClass = (tech) => {
  const t = tech.toLowerCase();
  if (t.includes('python') || t.includes('scikit') || t.includes('pandas')) return 'pill-python';
  if (t.includes('react') || t.includes('ionic') || t.includes('tailwind')) return 'pill-ionic';
  if (t.includes('sql') || t.includes('mysql') || t.includes('firebase')) return 'pill-mysql';
  if (t.includes('power bi') || t.includes('data')) return 'pill-ubuntu';
  return 'pill-base';
};

// Konstanta untuk Pagination
const ITEMS_PER_PAGE = 4;

export default function ProjectPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeModal, setActiveModal] = useState({ type: null, data: null });
  const [hoveredCert, setHoveredCert] = useState(null);
  
  // State untuk Pagination
  const [currentPage, setCurrentPage] = useState(1);

  const closeModal = () => setActiveModal({ type: null, data: null });

  // Fungsi untuk mengganti filter dan me-reset halaman ke 1
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setCurrentPage(1); 
  };

  // 1. Filter data berdasarkan kategori
  const filteredProjects = activeFilter === 'All' 
    ? projectsData 
    : projectsData.filter(project => project.category === activeFilter);

  // 2. Hitung total halaman
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);

  // 3. Potong (slice) data untuk ditampilkan pada halaman saat ini saja
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE, 
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <Navbar />
      
      <main className="container" style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', gap: '4.5rem' }}>
        
        {/* ==========================================
            SECTION 1: PROJECTS & FILTER
            ========================================== */}
        <section className="fade-in delay-1 visible">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <h1 className="pixel-text" style={{ fontSize: '2.4rem', color: 'var(--text-primary)', margin: 0 }}>
              My Projects
            </h1>
            
            {/* Filter Buttons */}
            <div style={{ 
              display: 'inline-flex', 
              gap: '0.2rem', 
              background: 'var(--glass-surface)', 
              padding: '0.35rem', 
              borderRadius: 'var(--radius-pill)', 
              border: '1px solid var(--glass-border)',
              boxShadow: 'inset 0 4px 10px rgba(0,0,0,0.15)' 
            }}>
              {['All', 'Data & ML', 'Apps & Web'].map(filter => (
                <button 
                  key={filter}
                  onClick={() => handleFilterChange(filter)}
                  style={{
                    background: activeFilter === filter ? 'var(--text-primary)' : 'transparent',
                    color: activeFilter === filter ? 'var(--bg-body)' : 'var(--text-secondary)',
                    border: 'none',
                    padding: '0.55rem 1.5rem',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: '0.85rem',
                    fontWeight: activeFilter === filter ? '700' : '500',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
                    boxShadow: activeFilter === filter ? '0 4px 12px rgba(0,0,0,0.25)' : 'none',
                  }}
                  onMouseEnter={(e) => {
                    if(activeFilter !== filter) e.currentTarget.style.color = 'var(--text-primary)';
                  }}
                  onMouseLeave={(e) => {
                    if(activeFilter !== filter) e.currentTarget.style.color = 'var(--text-secondary)';
                  }}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Project Card */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {paginatedProjects.map(project => (
              <div 
                key={project.id} 
                className="card" 
                style={{ padding: 0, display: 'flex', flexDirection: 'column', cursor: 'pointer', animation: 'fadeInUp 0.4s ease' }}
                onClick={() => setActiveModal({ type: 'project', data: project })}
              >
                <div style={{ 
                  position: 'relative', 
                  width: '100%', 
                  paddingTop: '56.25%', 
                  overflow: 'hidden', 
                  borderBottom: '1px solid var(--glass-border)',
                  flexShrink: 0
                }}>
                  <img 
                    src={project.gallery && project.gallery.length > 0 ? project.gallery[0] : ""} 
                    alt={project.title} 
                    style={{ 
                      position: 'absolute', 
                      top: 0, 
                      left: 0, 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover', 
                      transition: 'transform 0.5s ease' 
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </div>

                <div style={{ padding: '1.8rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '0.6rem' }}>{project.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.6', flexGrow: 1 }}>{project.descCover}</p>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '1.5rem', gap: '1rem' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {project.techtools && project.techtools.map((t, idx) => (
                        <span key={idx} className={`pill ${getPillClass(t)}`} style={{ padding: '0.3rem 0.8rem', fontSize: '0.7rem' }}>
                          {t}
                        </span>
                      ))}
                    </div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '1.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease', flexShrink: 0 }}>
                      <i className="ph ph-arrow-up-right"></i>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ==========================================
              PAGINATION CARD PROJECT
              ========================================== */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '3rem', gap: '8px' }}>
              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1;
                const isActive = currentPage === pageNum;
                
                return (
                  <div
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    style={{
                      width: isActive ? '24px' : '8px', /* Melar saat aktif */
                      height: '8px',
                      borderRadius: '8px',
                      background: isActive ? '#8da4f7' : 'var(--glass-border)',
                      cursor: 'pointer',
                      transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
                      boxShadow: isActive ? '0 2px 8px rgba(141, 164, 247, 0.4)' : 'none'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.background = 'rgba(141, 164, 247, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.background = 'var(--glass-border)';
                    }}
                  />
                );
              })}
            </div>
          )}
        </section>

        {/* ==========================================
            SECTION 2: CERTIFICATES
            ========================================== */}
        <section className="fade-in delay-2 visible">
          <h2 className="pixel-text" style={{ fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
            Certifications
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.25rem' }}>
            {certificatesData.map(cert => (
              <div 
                key={cert.id} 
                style={{ 
                  position: 'relative', 
                  overflow: 'hidden',   
                  display: 'flex', alignItems: 'center', gap: '1rem', 
                  background: 'var(--glass-surface)', padding: '1.2rem', 
                  borderRadius: 'var(--radius-lg)', border: '1px solid var(--glass-border)',
                  boxShadow: 'var(--shadow-soft)', 
                  transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  setHoveredCert(cert.id); 
                  e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                }}
                onMouseLeave={(e) => {
                  setHoveredCert(null); 
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-soft)';
                  e.currentTarget.style.borderColor = 'var(--glass-border)';
                }}
                onClick={() => setActiveModal({ type: 'cert', data: cert })}
              >
                
                {/* Badge Certificate */}
                <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'var(--element-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--element-border)', boxShadow: 'var(--element-shadow)' }}>
                  <i className={cert.icon} style={{ fontSize: '1.5rem', color: '#8da4f7' }}></i>
                </div>
                <div>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>{cert.title}</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>{cert.issuer} • {cert.year}</p>
                </div>

                {/* Overlay Certificate */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'rgba(128, 128, 128, 0.05)',
                  backdropFilter: hoveredCert === cert.id ? 'blur(4px)' : 'blur(0px)', 
                  WebkitBackdropFilter: hoveredCert === cert.id ? 'blur(3px)' : 'blur(0px)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  opacity: hoveredCert === cert.id ? 1 : 0, 
                  transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
                  pointerEvents: 'none'
                }}>
                  
                  {/* Teks Melayang */}
                  <div style={{
                    color: 'var(--text-primary)',
                    fontSize: '0.8rem',
                    fontWeight: '800',
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    transform: hoveredCert === cert.id ? 'translateY(0) scale(1)' : 'translateY(15px) scale(0.9)',
                    transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
                  }}>
                    <i className="ph ph-corners-out" style={{ fontSize: '1rem' }}></i> View Certificate
                  </div>
                  
                </div>

              </div>
            ))}
          </div>
        </section>

        {/* ==========================================
            SECTION 3: EXPERIENCE
            ========================================== */}
        <section className="fade-in delay-3 visible">
          <h2 className="pixel-text" style={{ fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '2rem' }}>
            Experience Track
          </h2>
          
          <div style={{ 
            marginLeft: '1rem', 
            paddingLeft: '2rem', 
            borderLeft: '2px solid var(--glass-border)',
            display: 'flex', 
            flexDirection: 'column', 
            gap: '2.5rem'
          }}>
            {experienceData.map(item => (
              <div key={item.id} style={{ position: 'relative' }}>
                <div style={{ 
                  position: 'absolute', left: 'calc(-2rem - 9px)', top: '1.5rem', 
                  width: '16px', height: '16px', borderRadius: '50%', 
                  background: 'var(--text-secondary)', border: '3px solid var(--bg-body)',
                  boxShadow: '0 0 0 2px var(--glass-border)'
                }}></div>

                <div 
                  className="card" 
                  style={{ padding: '1.5rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start', cursor: 'pointer' }}
                  onClick={() => setActiveModal({ type: 'exp', data: item })}
                >
                  {item.logo && (
                    <img src={item.logo} alt={`${item.company} logo`} style={{ width: '55px', height: '55px', borderRadius: '12px', objectFit: 'cover', background: '#ffffff', border: '1px solid var(--element-border)', flexShrink: 0 }} />
                  )}
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <div>
                        <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '0.3rem' }}>{item.role}</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                          <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{item.company}</span>
                          <span style={{ fontSize: '0.7rem', background: 'rgba(141, 164, 247, 0.1)', color: '#8da4f7', padding: '0.2rem 0.6rem', borderRadius: '6px', fontWeight: 600, border: '1px solid rgba(141, 164, 247, 0.2)' }}>{item.type}</span>
                        </div>
                      </div>
                      <span style={{ fontSize: '0.75rem', background: 'var(--element-bg)', padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-pill)', color: 'var(--text-secondary)', border: '1px solid var(--element-border)', fontWeight: 500 }}>{item.period}</span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0, marginTop: '0.8rem' }}>{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* ==========================================
          MODAL RENDERER
          ========================================== */}
      {activeModal.type === 'project' && (
        <ProjectModal isOpen={true} onClose={closeModal} project={activeModal.data} />
      )}
      
      {activeModal.type === 'cert' && (
        <CertModal isOpen={true} onClose={closeModal} cert={activeModal.data} />
      )}

      {activeModal.type === 'exp' && (
        <ExpModal isOpen={true} onClose={closeModal} exp={activeModal.data} />
      )}

      <footer className="fade-in visible" style={{ marginTop: '4rem' }}>
        <p>&copy; 2026 Firyal Aufa F. All rights reserved.</p>
      </footer>
    </>
  );
}