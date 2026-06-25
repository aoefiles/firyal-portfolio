'use client';

import { useState } from 'react';
import { experienceData } from '@/data/experience'; 
import ExperienceModal from './ExperienceModal';

export default function Experience() {
  const [selectedExp, setSelectedExp] = useState(null);

  return (
    <section id="experience" className="py-24 px-5 max-w-[800px] mx-auto">
      <h2 className="text-center text-3xl font-semibold mb-12">
        What <i className="font-light text-text-muted">I've Explored</i>
      </h2>

      <div className="border-l-2 border-border-color pl-[30px] relative">
        {experienceData.map((exp) => (
          <div key={exp.id} className="group bg-bg-card backdrop-blur-xl border border-border-color rounded-xl pt-[25px] px-[25px] pb-[35px] mb-[25px] relative transition-all duration-300 hover:translate-x-[15px] hover:border-primary flex flex-col items-start gap-5">
            
            {/* Dot Timeline */}
            <div className="absolute -left-[37px] top-[35px] w-3 h-3 bg-primary rounded-full shadow-[0_0_15px_var(--color-primary)] transition-transform group-hover:scale-125"></div>

            <div className="flex flex-col md:flex-row gap-5 items-start w-full">
              <div className="w-[50px] h-[50px] bg-white rounded-[10px] flex items-center justify-center shrink-0 border border-border-color">
                <img src={exp.logo} alt={exp.role} className="w-full h-full object-cover rounded-[8px]" />
              </div>
              
              <div>
                <h4 className="text-[1.1rem] text-text-main font-semibold">{exp.role}</h4>
                <p className="text-primary text-[0.85rem] font-semibold">{exp.institution} | {exp.period}</p>
                <p className="text-[0.85rem] text-text-muted leading-relaxed mt-1.5">{exp.desc}</p>
              </div>
            </div>

            <span onClick={() => setSelectedExp(exp)} className="absolute bottom-3 right-5 text-[0.7rem] text-text-muted cursor-pointer hover:text-primary flex items-center gap-1.5">
              View Detail <i className="fa-solid fa-chevron-right text-[0.55rem]"></i>
            </span>
          </div>
        ))}
      </div>

      <ExperienceModal isOpen={!!selectedExp} onClose={() => setSelectedExp(null)} experience={selectedExp} />
    </section>
  );
}