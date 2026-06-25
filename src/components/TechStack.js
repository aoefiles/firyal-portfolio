'use client';

import { techStackData } from '@/data/techstack';
import TiltWrapper from './TiltWrapper';

export default function TechStack() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-[25px] max-w-[900px] mx-auto animate-fade-in-up">
      {techStackData.map((category, idx) => (
        <TiltWrapper key={idx} className="bg-bg-card backdrop-blur-[12px] border border-border-color rounded-[15px] p-[25px] flex flex-col gap-[15px]">
          <h3 className="text-[1.1rem] font-semibold text-text-main">{category.category}</h3>
          <div className="flex gap-[15px] flex-wrap">
            {category.skills.map((skill, sIdx) => (
              <div 
                key={sIdx} 
                title={skill.name}
                className="w-[60px] h-[60px] bg-white/5 border border-white/10 rounded-[14px] flex items-center justify-center text-[2rem] hover:scale-110 hover:border-primary transition-all cursor-help"
              >
                <i className={skill.icon} style={{ color: skill.color }}></i>
              </div>
            ))}
          </div>
        </TiltWrapper>
      ))}
    </div>
  );
}