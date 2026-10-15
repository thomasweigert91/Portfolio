import React from 'react';
import type { ProjectItem } from '@/data/portfolioData';
import type { UiDictionary } from '@/i18n/dictionaries';
import { ProjectGrid } from './ProjectGrid';

interface ProjectsSectionProps {
  projects: ProjectItem[];
  ui: Pick<UiDictionary, 'projects'>;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects, ui }) => {

  return (
    <section id="projects" className="py-24 sm:py-32 px-6 sm:px-12 max-w-7xl mx-auto relative">
      
      {/* Section Header (Restrained Eyebrow) */}
      <div className="max-w-3xl mb-16">
        <div className="text-xs font-mono tracking-widest text-amber-300/85 uppercase mb-3 font-medium">
          {ui.projects.badge}
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold font-fraunces text-white tracking-tight leading-[1.25] sm:leading-[1.18]">
          {ui.projects.titlePart1}<span className="italic text-amber-300 inline-block pb-0.5">{ui.projects.titleHighlight}</span>.
        </h2>
        <p className="text-stone-100 text-base mt-4 font-light leading-relaxed sm:leading-7">
          {ui.projects.description}
        </p>
      </div>

      <ProjectGrid projects={projects} ui={ui} />
    </section>
  );
};
