'use client';

import { useEffect, useState } from 'react';
import TiltWrapper from './TiltWrapper';
import { aboutData } from '@/data/about'; 

export default function About() {
  const [roleText, setRoleText] = useState('');
  
  // Typing Effect
  useEffect(() => {
    const roleWords = aboutData.roles;
    let roleWordIndex = 0, roleCharIndex = 0, isRoleDeleting = false;
    let typingTimer;

    function typeRoleEffect() {
      const currentRole = roleWords[roleWordIndex];
      setRoleText(isRoleDeleting ? currentRole.substring(0, roleCharIndex - 1) : currentRole.substring(0, roleCharIndex + 1));
      roleCharIndex = isRoleDeleting ? roleCharIndex - 1 : roleCharIndex + 1;
      
      let typeSpeed = isRoleDeleting ? 40 : 80;
      if (!isRoleDeleting && roleCharIndex === currentRole.length) { 
        typeSpeed = 2000; isRoleDeleting = true; 
      } else if (isRoleDeleting && roleCharIndex === 0) { 
        isRoleDeleting = false; roleWordIndex = (roleWordIndex + 1) % roleWords.length; typeSpeed = 500; 
      }
      typingTimer = setTimeout(typeRoleEffect, typeSpeed);
    }
    typingTimer = setTimeout(typeRoleEffect, 1000);
    return () => clearTimeout(typingTimer);
  }, []);

  return (
    <section id="about" className="py-[100px] px-5 max-w-[1050px] mx-auto">
      <h2 className="text-center text-[2.2rem] font-semibold mb-[50px] relative">
        About <i className="font-light italic text-text-muted">Me</i>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_350px] gap-[25px]">
        
        {/* Kartu Utama */}
        <TiltWrapper className="bg-bg-card backdrop-blur-[12px] p-[30px] rounded-[20px] border border-border-color flex flex-col md:flex-row gap-[30px] items-stretch">
          <img src="/profile.jpg" alt={aboutData.name} className="w-full md:w-[220px] h-auto object-cover rounded-[15px] bg-[#d9d9d9] shrink-0 border border-border-color" style={{ transform: 'translateZ(20px)' }} />
          
          <div className="flex flex-col justify-center" style={{ transform: 'translateZ(15px)' }}>
            <h3 className="text-[2rem] text-text-main mb-1.5 font-semibold">{aboutData.name}</h3>
            <div className="text-[1rem] text-text-muted font-normal mb-[15px]">
              Interested in <span className="text-text-main italic font-medium">{roleText}</span>
              <span className="cursor inline-block w-[2px] h-[1em] align-middle ml-[2px] bg-text-main">&nbsp;</span>
            </div>
            <p className="text-[0.9rem] text-text-muted leading-[1.6] mb-[20px]">{aboutData.description}</p>
            
            <div className="flex flex-col md:flex-row items-center gap-[25px] mt-auto">
              <div className="flex gap-[15px] text-[1.6rem]">
                <a href={aboutData.socials.github} className="text-text-main hover:text-primary transition-all hover:-translate-y-[3px]"><i className="fa-brands fa-github"></i></a>
                <a href={aboutData.socials.linkedin} className="text-text-main hover:text-primary transition-all hover:-translate-y-[3px]"><i className="fa-brands fa-linkedin"></i></a>
                <a href={aboutData.socials.instagram} className="text-text-main hover:text-primary transition-all hover:-translate-y-[3px]"><i className="fa-brands fa-instagram"></i></a>
              </div>
              <a href={aboutData.resumeUrl} className="md:ml-auto w-full md:w-auto px-[25px] py-[10px] rounded-[50px] text-[0.9rem] font-semibold bg-primary text-bg-dark hover:-translate-y-[3px] hover:shadow-[0_5px_15px_rgba(195,180,227,0.4)] flex items-center justify-center gap-2">
                <i className="fa-solid fa-download"></i> Resume
              </a>
            </div>
          </div>
        </TiltWrapper>

        {/* Kolom Kanan */}
        <div className="flex flex-col gap-[25px]">
          <TiltWrapper className="bg-bg-card backdrop-blur-[12px] p-[25px] rounded-[20px] border border-border-color text-center flex-1">
            <h4 className="text-[1.1rem] text-text-main mb-[15px] font-semibold" style={{ transform: 'translateZ(15px)' }}>Education</h4>
            <p className="text-[0.85rem] text-text-muted leading-[1.6]" style={{ transform: 'translateZ(10px)' }}>
              {aboutData.education.university}<br />{aboutData.education.degree}<br />{aboutData.education.period}
            </p>
          </TiltWrapper>
          
          <TiltWrapper className="bg-bg-card backdrop-blur-[12px] p-[25px] rounded-[20px] border border-border-color text-center flex-1">
            <h4 className="text-[1.1rem] text-text-main mb-[15px] font-semibold" style={{ transform: 'translateZ(15px)' }}>Interest</h4>
            <div className="flex flex-wrap gap-[10px] justify-center" style={{ transform: 'translateZ(10px)' }}>
              {aboutData.interests.map((interest, i) => (
                <span key={i} className="bg-bg-tech-tag border border-border-color px-[16px] py-[6px] rounded-[50px] text-[0.75rem] text-text-main font-medium hover:bg-primary hover:text-bg-dark hover:border-primary transition-all">
                  {interest}
                </span>
              ))}
            </div>
          </TiltWrapper>
        </div>
      </div>
    </section>
  );
}