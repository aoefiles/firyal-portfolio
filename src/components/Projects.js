'use client';

import { useState } from 'react';
import TiltWrapper from './TiltWrapper'; 
import ProjectModal from './ProjectModal';
import CertificateModal from './CertificateModal';
import Certificates from './Certificates';
import TechStack from './TechStack';
import { projectsData } from '@/data/projects';



export default function Projects() {
  const [activeTab, setActiveTab] = useState('project');
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCert, setSelectedCert] = useState(null);

  const ITEMS_PER_PAGE = 4;

  const filteredProjects = projectsData.filter(p => 
    activeFilter === 'all' ? true : p.category === activeFilter
  );
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const currentProjects = filteredProjects.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <section id="projects" className="py-[80px] px-5 max-w-[1000px] mx-auto">
      <h2 className="text-center text-[2.2rem] font-semibold mb-[50px]">
        What <i className="font-light italic text-text-muted">I've Built</i>
      </h2>

      {/* TABS NAVIGATION */}
      <div className="flex justify-center bg-bg-card backdrop-blur-[12px] rounded-[12px] p-[5px] mb-[25px] border border-border-color max-w-[400px] mx-auto">
        {['project', 'certificate', 'techstack'].map((tab) => (
          <div key={tab} onClick={() => setActiveTab(tab)}
            className={`flex-1 text-center py-[12px] cursor-pointer rounded-[8px] transition-all capitalize text-[0.95rem] ${activeTab === tab ? 'bg-primary text-bg-dark font-semibold' : 'text-text-muted hover:text-text-main'}`}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* KONTEN TAB: PROJECT */}
      {activeTab === 'project' && (
        <div className="animate-fade-in-up">
          <div className="flex justify-center gap-[12px] mb-[35px] flex-wrap">
            {['all', 'data-science', 'apps-web'].map((filter) => (
              <button key={filter} onClick={() => { setActiveFilter(filter); setCurrentPage(1); }}
                className={`px-[18px] py-[6px] rounded-[50px] border text-[0.8rem] capitalize ${activeFilter === filter ? 'border-primary bg-primary/10 text-primary' : 'border-border-color text-text-muted'}`}
              >
                {filter.replace('-', ' ')}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[25px]">
            {currentProjects.map((project) => (
              <TiltWrapper key={project.id} className="bg-bg-card backdrop-blur-[12px] border border-border-color rounded-[15px] p-[15px] flex flex-col hover:border-primary">
                <div className="w-full h-[220px] bg-cover bg-center rounded-[10px] mb-[15px]" style={{ backgroundImage: `url(${project.img})` }}></div>
                <h3 className="text-[1.2rem] font-semibold mb-[8px]">{project.title}</h3>
                <p className="text-[0.85rem] text-text-muted mb-[15px] flex-grow">{project.desc}</p>
                <div className="flex justify-between items-center pt-[15px] border-t border-border-color">
                  <div className="flex gap-[8px] flex-wrap">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="bg-bg-tech-tag border border-border-color px-[10px] py-[4px] rounded-[50px] text-[0.7rem] text-primary">{tag}</span>
                    ))}
                  </div>
                  <button onClick={() => setSelectedProject(project)} className="px-[14px] py-[6px] text-[0.75rem] rounded-[30px] font-medium border border-border-color hover:border-primary hover:text-primary transition-all">
                    Details
                  </button>
                </div>
              </TiltWrapper>
            ))}
          </div>
        </div>
      )}

      {/* KONTEN TAB: CERTIFICATE */}
      {activeTab === 'certificate' && (
        <div className="animate-fade-in-up">
          <Certificates onOpenCert={setSelectedCert} />
        </div>
      )}

      {/* KONTEN TAB: TECHSTACK */}
      {activeTab === 'techstack' && (
        <div className="animate-fade-in-up">
          <TechStack />
        </div>
      )}

      {/* MODALS */}
      <ProjectModal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} project={selectedProject} />
      <CertificateModal isOpen={!!selectedCert} onClose={() => setSelectedCert(null)} imageUrl={selectedCert} />
      
    </section>
  );
}