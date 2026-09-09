import React from 'react';
import { ProjectItem } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { ArrowUpRight, Sparkles } from 'lucide-react';

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const { data, ui } = useLanguage();
  const projects = data.projects;

  return (
    <section id="projects" className="py-24 sm:py-32 px-6 sm:px-12 max-w-7xl mx-auto relative">
      
      {/* Section Header (Without Category Filter) */}
      <div className="max-w-3xl mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/30 text-amber-300 text-xs font-mono uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{ui.projects.badge}</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold font-fraunces text-[#FDFBF7] tracking-tight">
          {ui.projects.titlePart1}<span className="italic text-amber-300">{ui.projects.titleHighlight}</span>.
        </h2>
        <p className="text-stone-300 text-base mt-3 font-light leading-relaxed">
          {ui.projects.description}
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => onSelectProject(project)}
            className="group cursor-pointer rounded-3xl bg-[#1A1613] border border-white/10 hover:border-amber-500/50 transition-all duration-300 overflow-hidden flex flex-col justify-between hover:shadow-[0_0_40px_rgba(229,152,58,0.12)] hover:-translate-y-1.5"
          >
            <div>
              {/* Media Plate */}
              <div className="relative aspect-[16/10] overflow-hidden bg-black/50">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1613] via-transparent to-transparent opacity-85" />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-[#14110F]/85 backdrop-blur-md border border-amber-500/30 text-[11px] font-mono text-amber-300">
                    {project.category}
                  </span>
                  <span className="px-2 py-1 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-mono text-stone-300">
                    {project.period}
                  </span>
                </div>

                {/* Inspect Icon */}
                <div className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-amber-500 text-[#14110F] flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Text Info */}
              <div className="p-6">
                <div className="text-xs font-mono text-amber-400/90 mb-2">
                  {project.client}
                </div>
                <h3 className="text-xl font-bold font-fraunces text-white group-hover:text-amber-300 transition-colors mb-3 leading-snug">
                  {project.title}
                </h3>
                <p className="text-sm text-stone-300 leading-relaxed line-clamp-3 mb-6 font-light">
                  {project.shortDesc}
                </p>

                {/* Metrics Highlight */}
                <div className="grid grid-cols-2 gap-3 py-3 px-4 rounded-xl bg-white/[0.02] border border-white/5 mb-4">
                  {project.metrics.slice(0, 2).map((m, i) => (
                    <div key={i}>
                      <div className="text-[11px] text-stone-400 font-mono">{m.label}</div>
                      <div className="text-sm font-semibold font-fraunces text-amber-300">{m.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tags & Action Footer */}
            <div className="px-6 pb-6 pt-2 border-t border-white/5 flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {project.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-[10px] font-mono text-stone-300 bg-white/5 px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
                {project.tags.length > 3 && (
                  <span className="text-[10px] font-mono text-stone-500 py-0.5">
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
        ))}
      </div>
    </section>
  );
};
