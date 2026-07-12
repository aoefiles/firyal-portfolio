// src/components/Home.js
import Link from 'next/link'; 
import { heroData, techStackData, collabData, featuredProjects } from '../data/home';

export default function Home() {
  return (
    <div className="container">
      {/* Hero Card */}
      <div className="card hero-card fade-in delay-1 visible">
        <div className="hero-info">
          <h1>
            {heroData.title} <span className="pixel-text">{heroData.name}</span>
          </h1>
          <p>{heroData.subtitle}</p>
          <div className="hero-actions">
            <a href={heroData.github} className="social-icon"><i className="ph ph-github-logo"></i></a>
            <a href={heroData.linkedin} className="social-icon"><i className="ph ph-linkedin-logo"></i></a>
            <a href={heroData.instagram} className="social-icon"><i className="ph ph-instagram-logo"></i></a>
            <button className="btn-resume">
              <i className="ph ph-download-simple"></i> Resume
            </button>
          </div>
        </div>
        <img src={heroData.profileImg} alt="Profile" className="profile-img" />
      </div>

      {/* Left Column (Tech Stack & Collab) */}
      <div className="left-col">
        {/* Tech Stack Card */}
        <div className="card fade-in delay-2 visible">
          <div className="card-header">
            Tech Stack <i className="ph ph-stack"></i>
          </div>
          <div className="pills-container">
            {techStackData.map((tech) => (
              <div key={tech.id} className={`pill pill-${tech.type}`}>
                {/* Icon */}
                {tech.icon && <i className={tech.icon}></i>}
                {/* Nama Tech */}
                --{tech.name}
              </div>
            ))}
          </div>
        </div>

        {/* Collaboration Card */}
        <div className="card collab-card fade-in delay-2 visible">
          <h3>{collabData.title}</h3>
          <p>{collabData.description}</p>
          <a href={`mailto:${collabData.email}`} className="collab-link">
            {collabData.email} <i className="ph ph-arrow-up-right"></i>
          </a>
        </div>
      </div>

      {/* ==========================================
          FEATURED PROJECTS SECTION
          ========================================== */}
      <Link href="/project" className="card works-card fade-in delay-3 visible" style={{ textDecoration: 'none', color: 'inherit', display: 'flex' }}>
        
        {/* IKON DIKEMBALIKAN MENJADI PANAH */}
        <div className="card-header">
          Featured Works <i className="ph ph-arrow-up-right"></i>
        </div>

        {/* 1. MAPPING GAMBAR MELAYANG */}
        <div className="floating-works-container">
          {featuredProjects.map((project) => (
            <div 
              key={project.id} 
              className={`mockup-card ${project.bgClass}`} 
              style={{ backgroundImage: `url(${project.image})` }}
            ></div>
          ))}
        </div>

        {/* 2. MAPPING TEKS CAPTION */}
        <div className="project-captions">
          {featuredProjects.map((project, index) => {
            const captionClass = `cap-${index + 1}`;
            
            return (
              <div key={project.id} className={`caption-text ${captionClass}`}>
                {project.title}
                <span>{project.tech}</span>
              </div>
            );
          })}
        </div>

      </Link>
    </div>
  );
}