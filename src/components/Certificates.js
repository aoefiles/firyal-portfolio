'use client';

import { certificatesData } from '@/data/certificates';

export default function Certificates({ onOpenCert }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[25px] animate-fade-in-up">
      {certificatesData.map((cert) => (
        <div 
          key={cert.id} 
          onClick={() => onOpenCert(cert.img)}
          className="bg-bg-card backdrop-blur-[12px] border border-border-color rounded-[15px] p-[15px] flex flex-col gap-[15px] group cursor-pointer transition-all hover:border-primary"
        >
          <div className="relative w-full h-[200px] rounded-[10px] overflow-hidden border border-border-color">
            <div 
              className="w-full h-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
              style={{ backgroundImage: `url(${cert.img})` }}
            ></div>
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-primary font-semibold text-[0.9rem]">View Certificate</span>
            </div>
          </div>
          <div>
            <h4 className="text-[1.1rem] font-semibold text-text-main">{cert.title}</h4>
            <p className="text-[0.85rem] text-text-muted mt-1">{cert.issuer} | {cert.year}</p>
          </div>
        </div>
      ))}
    </div>
  );
}