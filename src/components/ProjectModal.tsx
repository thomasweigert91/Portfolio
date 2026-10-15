'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { X, CheckCircle2, Layers, Cpu, Mail, ExternalLink, Lock } from 'lucide-react';
import type { ProjectItem } from '@/data/portfolioData';
import type { UiDictionary } from '@/i18n/dictionaries';

interface ProjectModalProps {
  project: ProjectItem | null;
  ui: Pick<UiDictionary, 'projects'>;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, ui, onClose }) => {

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
        className="fixed top-5 right-5 sm:top-6 sm:right-8 z-[60] flex items-center gap-2 pl-4 pr-3 py-2 rounded-full bg-[#1c1815] hover:bg-amber-500 text-amber-300 hover:text-[#14110F] ring-1 ring-amber-500/50 hover:ring-amber-400 shadow-[0_8px_32px_rgba(0,0,0,0.7)] backdrop-blur-md transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-95 group cursor-pointer"
        title={`${ui.projects.modalClose} (Esc)`}
        aria-label={ui.projects.modalClose}
      >
        <span className="text-xs font-mono font-semibold uppercase tracking-wider">{ui.projects.modalClose}</span>
        <div className="w-5 h-5 rounded-full bg-amber-500/20 group-hover:bg-[#14110F]/20 flex items-center justify-center transition-colors">
          <X className="w-3.5 h-3.5 text-amber-300 group-hover:text-[#14110F] stroke-[2.5]" />
        </div>
      </button>

      {/* 2. MODAL WRAPPER (Verhindert das Abschneiden am oberen Rand durch flex items-start) */}
      <div 
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
        className="min-h-full w-full flex items-start justify-center p-4 sm:p-6 md:py-12 md:px-8 cursor-pointer"
      >
        {/* Double-Bezel Outer Shell */}
        <div 
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl p-1.5 sm:p-2 bg-white/[0.04] ring-1 ring-white/10 rounded-[2.25rem] shadow-[0_24px_80px_rgba(0,0,0,0.85)] cursor-default my-auto"
        >
          {/* Inner Core */}
          <div className="rounded-[calc(2.25rem-0.5rem)] bg-[#171310] overflow-hidden text-stone-200 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
            
            {/* Hero Media Showcase */}
            <div className="relative h-56 sm:h-72 w-full overflow-hidden bg-black">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171310] via-transparent to-black/40" />

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
                  <span className="px-3 py-1 rounded-md bg-amber-950/90 border border-amber-500/40 text-amber-300 text-xs font-mono uppercase tracking-wider backdrop-blur-md">
                    {project.category}
                  </span>
                  <span className="px-3 py-1 rounded-md bg-black/70 text-stone-300 text-xs font-mono backdrop-blur-md">
                    {project.period}
                  </span>
                  <span className="px-3 py-1 rounded-md bg-black/70 text-stone-300 text-xs font-mono backdrop-blur-md">
                    {project.client}
                  </span>
                </div>
                <h3 className="text-xl sm:text-3xl font-bold font-fraunces text-white drop-shadow-md leading-snug">
                  {project.title}
                </h3>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-5 sm:p-8 space-y-7">
              
              {/* Key Metrics Strip (Responsive, no text collision on mobile, perfectly centered on desktop) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 p-3.5 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/5 sm:text-center">
                {project.metrics.map((m, idx) => (
                  <div 
                    key={idx} 
                    className="flex sm:flex-col items-center justify-between sm:justify-center p-3 sm:p-3 bg-white/[0.02] sm:bg-transparent rounded-xl sm:rounded-none border border-white/5 sm:border-0 text-left sm:text-center"
                  >
                    <span className="text-xs font-mono text-stone-300 uppercase tracking-wider order-1 sm:order-2 sm:mt-2 text-left sm:text-center sm:w-full">
                      {m.label}
                    </span>
                    <span className="text-base sm:text-xl md:text-2xl font-bold font-fraunces text-amber-300 order-2 sm:order-1 text-right sm:text-center sm:w-full leading-tight">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Project Narrative */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-amber-300 mb-2.5 flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-amber-400" />
                  <span>{ui.projects.modalOverview}</span>
                </h4>
                <p className="text-stone-300 text-sm sm:text-base leading-relaxed sm:leading-7 font-light">
                  {project.fullDesc}
                </p>
              </div>

              {/* Architectural Highlights */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-amber-300 mb-3 flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-amber-400" />
                  <span>{project.highlightsTitle ?? ui.projects.modalMilestones}</span>
                </h4>
                <div className="space-y-2.5">
                  {project.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3.5 sm:p-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                      <span className="text-xs sm:text-sm text-stone-200 leading-relaxed sm:leading-6">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Chips */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-stone-400 mb-2.5">
                  {ui.projects.modalTech}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs sm:text-sm font-mono text-stone-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="text-xs font-mono text-stone-400">
                    {ui.projects.modalRole} <span className="text-white font-medium">{project.role}</span>
                  </div>
                  {project.nda && (
                    <div className="flex items-center gap-1.5 text-xs font-mono text-stone-400">
                      <Lock className="w-3 h-3 text-amber-400" />
                      <span>{ui.projects.ndaNotice}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-stone-200 hover:text-white font-medium text-xs font-mono border border-white/10 transition-all active:scale-95 cursor-pointer"
                  >
                    {ui.projects.modalClose}
                  </button>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-[#14110F] font-semibold text-xs tracking-wide transition-all shadow-[0_0_20px_rgba(229,152,58,0.25)]"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>{ui.projects.liveButton}</span>
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-[#14110F] font-semibold text-xs tracking-wide transition-all shadow-[0_0_20px_rgba(229,152,58,0.25)]"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>{ui.projects.codeButton}</span>
                    </a>
                  )}
                  {project.inquiryUrl && (
                    <a
                      href={project.inquiryUrl}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-[#14110F] font-semibold text-xs tracking-wide transition-all shadow-[0_0_20px_rgba(229,152,58,0.25)]"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>{ui.projects.inquiryButton}</span>
                    </a>
                  )}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
