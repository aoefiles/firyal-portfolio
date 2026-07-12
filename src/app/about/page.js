// src/app/about/page.js
"use client";

import Navbar from '../../components/Navbar';
import { aboutData } from '@/data/about';

export default function AboutPage() {
  return (
    <>
      <Navbar />
      
      <main className="container" style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        
        {/* ==========================================
            BARIS 1: ABOUT ME & PHOTO 
            ========================================== */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', alignItems: 'stretch' }}>
          
          {/* About Me Card */}
          <div className="card fade-in delay-1 visible" style={{ flex: '1.5 1 350px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h1 className="pixel-text" style={{ fontSize: '2.4rem', marginBottom: '1.2rem', color: 'var(--text-primary)', lineHeight: '1.2' }}>
              {aboutData.name}
            </h1>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.65', fontSize: '0.8rem', margin: '0' }}>
              {aboutData.summary}
            </p>
          </div>

          {/* Photo Card */}
          <div className="card fade-in delay-1 visible" style={{ 
            flex: '1 1 250px', 
            padding: 0, 
            minHeight: '350px', 
            position: 'relative',
            overflow: 'hidden'
          }}>
            <img 
              src={aboutData.profileImg} 
              alt={aboutData.name} 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover', 
                position: 'absolute',
                top: 0, left: 0
              }} 
            />
            <div style={{
              position: 'absolute', inset: 0,
              boxShadow: 'inset 0 0 30px rgba(0,0,0,0.2)',
              pointerEvents: 'none'
            }}></div>
          </div>

        </div>

        {/* ==========================================
            BARIS 2: FOCUSED AREAS & EDUCATION 
            ========================================== */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', alignItems: 'stretch' }}>
          
          {/* Focused Areas Card */}
          <div className="card fade-in delay-2 visible" style={{ flex: '1.5 1 350px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="card-header" style={{ fontSize: '0.7rem', marginBottom: '1.3rem' }}>Focused Areas</div>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '1rem' }}>
              {aboutData.focusedAreas.map((area, idx) => (
                <div key={idx} style={{ 
                  display: 'flex', alignItems: 'center', gap: '0.4rem' 
                }}>
                  <i className={area.icon} style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}></i>
                  <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-primary)' }}>{area.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Education Card */}
          <div className="card fade-in delay-2 visible" style={{ flex: '1 1 250px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="card-header" style={{ fontSize: '0.7rem', marginBottom: '1rem' }}>Education</div>
            {aboutData.education.map((edu, idx) => (
              <div key={idx}>
                <h3 style={{ fontSize: '1rem', marginBottom: '0.2rem', color: 'var(--text-primary)' }}>{edu.institution}</h3>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: '500', lineHeight: '1.6' }}>
                  {edu.degree} <br/> {edu.period}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* ==========================================
            BARIS 3: MY STACK
            ========================================== */}
        <div className="card fade-in delay-3 visible" style={{ width: '100%' }}>
          <div className="card-header" style={{ marginBottom: '1.5rem' }}>My Stack</div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
            gap: '1.5rem' 
          }}>
            {aboutData.techStacks.map((category, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column' }}>
                <h4 style={{ 
                  fontSize: '0.7rem', 
                  color: 'var(--text-secondary)', 
                  marginBottom: '1rem', 
                  textTransform: 'uppercase', 
                  letterSpacing: '1px',
                  borderBottom: '1px solid var(--glass-border)',
                  paddingBottom: '0.5rem'
                }}>
                  {category.category}
                </h4>
                
                <div className="pills-container" style={{ gap: '0.6rem' }}>
                  {category.items.map((tech, i) => (
                    <div key={i} className={`pill pill-${tech.type}`}>
                      <i className={tech.icon}></i> {tech.name}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

      <footer className="fade-in visible">
        <p>&copy; 2026 Firyal Aufa F. All rights reserved.</p>
      </footer>
    </>
  );
}