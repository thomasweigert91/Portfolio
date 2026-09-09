import React, { useEffect } from 'react';
import { ProjectItem } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { X, CheckCircle2, Layers, Cpu, Mail } from 'lucide-react';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const { ui } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div 
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-2xl"
    >
      {/* 1. FIXED FLOATING CLOSE BUTTON (Immer im Viewport sichtbar, egal wohin gescrollt wird) */}
      <button
        onClick={onClose}
        className="fixed top-5 right-5 sm:top-6 sm:right-8 z-[60] flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1E1916] hover:bg-amber-500 text-amber-300 hover:text-[#14110F] border-2 border-amber-500 shadow-[0_4px_30px_rgba(0,0,0,0.8)] backdrop-blur-md transition-all active:scale-95 group cursor-pointer"
        title={`${ui.projects.modalClose} (Esc)`}
        aria-label={ui.projects.modalClose}
      >
        <span className="text-xs font-mono font-bold uppercase tracking-wider">{ui.projects.modalClose}</span>
        <div className="w-5 h-5 rounded-full bg-amber-500/20 group-hover:bg-black/20 flex items-center justify-center">
          <X className="w-3.5 h-3.5 text-amber-300 group-hover:text-black stroke-[3]" />
        </div>
      </button>

      {/* 2. MODAL WRAPPER (Verhindert das Abschneiden am oberen Rand durch flex items-start) */}
      <div 
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
        className="min-h-full w-full flex items-start justify-center p-4 sm:p-6 md:py-12 md:px-8 cursor-pointer"
      >
        <div 
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl bg-[#1A1613] border border-amber-500/30 rounded-3xl overflow-hidden shadow-[0_0_90px_rgba(0,0,0,0.9)] text-stone-200 cursor-default my-auto"
        >
          
          {/* Hero Media Showcase (Kompaktere Höhe h-56 / sm:h-72, damit der Inhalt sofort im Blick ist) */}
          <div className="relative h-56 sm:h-72 w-full overflow-hidden bg-black">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1613] via-transparent to-black/40" />

            {/* In-Card Close Icon als zusätzliche Redundanz */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#14110F]/80 hover:bg-amber-500 text-stone-200 hover:text-black border border-amber-500/40 transition-all sm:hidden"
              title="Schließen"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="absolute bottom-5 left-5 sm:left-8 right-5">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-1 rounded-md bg-amber-950/90 border border-amber-500/40 text-amber-300 text-[11px] font-mono uppercase tracking-wider backdrop-blur-md">
                  {project.category}
                </span>
                <span className="px-2.5 py-1 rounded-md bg-black/70 text-stone-300 text-[11px] font-mono backdrop-blur-md">
                  {project.period}
                </span>
                <span className="px-2.5 py-1 rounded-md bg-black/70 text-stone-300 text-[11px] font-mono backdrop-blur-md">
                  {project.client}
                </span>
              </div>
              <h3 className="text-xl sm:text-3xl font-bold font-fraunces text-white drop-shadow-md leading-tight">
                {project.title}
              </h3>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-6 sm:p-8 space-y-7">
            
            {/* Key Metrics Strip */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-white/[0.03] border border-amber-500/20 text-center">
              {project.metrics.map((m, idx) => (
                <div key={idx}>
                  <div className="text-lg sm:text-2xl font-bold font-fraunces text-amber-300">{m.value}</div>
                  <div className="text-[10px] sm:text-[11px] font-mono text-stone-400 uppercase tracking-wider mt-0.5">{m.label}</div>
                </div>
              ))}
            </div>

            {/* Project Narrative */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-amber-300 mb-2 flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>{ui.projects.modalOverview}</span>
              </h4>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-light">
                {project.fullDesc}
              </p>
            </div>

            {/* Architectural Highlights */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-amber-300 mb-3 flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-amber-400" />
                <span>{ui.projects.modalMilestones}</span>
              </h4>
              <div className="space-y-2.5">
                {project.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-stone-200">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Chips */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-stone-400 mb-2">
                {ui.projects.modalTech}
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-stone-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs font-mono text-stone-400">
                {ui.projects.modalRole} <span className="text-white font-medium">{project.role}</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-stone-200 hover:text-white font-medium text-xs font-mono border border-white/10 transition-all cursor-pointer"
                >
                  {ui.projects.modalClose}
                </button>

                <a
                  href={project.liveUrl}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#14110F] font-semibold text-xs tracking-wide transition-all shadow-[0_0_20px_rgba(229,152,58,0.3)]"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{ui.projects.modalInquiry}</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
