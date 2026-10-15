'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import type { ProjectItem } from '@/data/portfolioData';
import type { UiDictionary } from '@/i18n/dictionaries';
import { ProjectModal } from './ProjectModal';

interface ProjectGridProps {
  projects: ProjectItem[];
  ui: Pick<UiDictionary, 'projects'>;
}

/** Interactive project cards + case-study modal. Card content is still prerendered as HTML. */
export const ProjectGrid: React.FC<ProjectGridProps> = ({ projects, ui }) => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <>
      {/* Projects Grid with Double-Bezel Hardware Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="group cursor-pointer p-1.5 rounded-[2rem] bg-white/[0.03] ring-1 ring-white/10 hover:ring-amber-500/40 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_16px_48px_rgba(229,152,58,0.12)] hover:-translate-y-1 active:scale-[0.99]"
          >
            <div className="rounded-[calc(2rem-0.375rem)] bg-[#191512] overflow-hidden flex flex-col justify-between h-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)]">
              <div>
                {/* Media Plate */}
                <div className="relative aspect-[16/10] overflow-hidden bg-black/50">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(min-width: 1024px) 400px, 100vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#191512] via-transparent to-transparent opacity-90" />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-md bg-[#14110F]/85 backdrop-blur-md border border-amber-500/30 text-xs font-mono text-amber-300">
                      {project.category}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-xs font-mono text-stone-300">
                      {project.period}
                    </span>
                  </div>

                  {/* Inspect Icon */}
                  <div className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-amber-500 text-[#14110F] flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-lg">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Text Info */}
                <div className="p-6">
                  <div className="text-xs font-mono text-amber-300/85 mb-2">
                    {project.client}
                  </div>
                  <h3 className="text-xl font-bold font-fraunces text-white group-hover:text-amber-300 transition-colors mb-3 leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-sm text-stone-300 leading-relaxed sm:leading-7 line-clamp-3 mb-6 font-light">
                    {project.shortDesc}
                  </p>

                  {/* Metrics Highlight */}
                  <div className="grid grid-cols-2 gap-3 py-3 px-4 rounded-xl bg-white/[0.02] border border-white/5 mb-4">
                    {project.metrics.slice(0, 2).map((m, i) => (
                      <div key={i}>
                        <div className="text-xs text-stone-400 font-mono">{m.label}</div>
                        <div className="text-sm font-semibold font-fraunces text-amber-300 mt-0.5">{m.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tags & Action Footer */}
              <div className="px-6 pb-6 pt-2 border-t border-white/5 flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-xs font-mono text-stone-300 bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg">
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="text-xs font-mono text-stone-400 py-1 px-1">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>

                <span className="text-xs font-mono text-amber-300 group-hover:underline flex items-center gap-1">
                  <span>{ui.projects.detailsButton}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ProjectModal
        project={selectedProject}
        ui={ui}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
};
