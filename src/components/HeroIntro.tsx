import React from 'react';
import { ArrowRight, Download } from 'lucide-react';
import type { PortfolioData, VisualStoryScene } from '@/data/portfolioData';

interface HeroIntroProps {
  profile: Pick<PortfolioData['profile'], 'name' | 'title' | 'subtitle' | 'status' | 'valueProp'>;
  scene: VisualStoryScene;
}

/**
 * First screen content: name, role, value proposition, stack, availability and two CTAs.
 * Shared by the cinematic hero and the static reduced-motion layout. No hooks, so it
 * renders as plain HTML in the static export.
 */
export const HeroIntro: React.FC<HeroIntroProps> = ({ profile, scene }) => {
  const isDownload = scene.secondaryCtaHref?.endsWith('.pdf');

  return (
    <>
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1c1815]/90 border border-emerald-500/30 text-emerald-300 text-xs font-mono tracking-wide mb-4 sm:mb-6 backdrop-blur-md">
        <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 motion-safe:animate-ping" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <span>{profile.status}</span>
      </div>

      <h1 className="font-fraunces font-bold tracking-tight text-white mb-3 sm:mb-5">
        <span className="block text-3xl sm:text-5xl lg:text-6xl leading-[1.1]">{profile.name}</span>
        <span className="block mt-1.5 sm:mt-2 text-base sm:text-xl font-mono font-medium text-amber-300 tracking-wide">
          {profile.title}
        </span>
      </h1>

      <p className="text-base sm:text-lg lg:text-xl text-stone-100 leading-relaxed sm:leading-8 mb-3 sm:mb-4 max-w-xl">
        {profile.valueProp}
      </p>

      <p className="text-xs sm:text-sm font-mono text-amber-200/90 leading-relaxed mb-3 sm:mb-5">
        {profile.subtitle}
      </p>

      <p className="text-sm sm:text-base font-fraunces italic text-stone-300 leading-snug mb-2 sm:mb-3 max-w-xl">
        {scene.heading}
      </p>

      {/* Longer intro only where there is room; still part of the HTML on mobile. */}
      <p className="hidden sm:block text-sm lg:text-base text-stone-300 font-light leading-relaxed sm:leading-7 mb-6 max-w-xl">
        {scene.description}
      </p>

      <div className="flex flex-wrap items-center gap-3 mt-5 sm:mt-0">
        {scene.ctaText && (
          <a
            href={scene.ctaHref || '#projects'}
            className="group inline-flex items-center gap-3 pl-6 pr-2.5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-[#14110F] font-semibold text-sm tracking-wide transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-[0_4px_20px_rgba(229,152,58,0.25)] hover:shadow-[0_6px_28px_rgba(229,152,58,0.35)] active:scale-[0.98]"
          >
            <span>{scene.ctaText}</span>
            <span className="w-8 h-8 rounded-full bg-[#14110F]/15 flex items-center justify-center group-hover:translate-x-0.5 transition-transform duration-200">
              <ArrowRight className="w-3.5 h-3.5 text-[#14110F]" aria-hidden="true" />
            </span>
          </a>
        )}

        {scene.secondaryCtaText && (
          <a
            href={scene.secondaryCtaHref || '#contact'}
            {...(isDownload ? { download: 'CV_Thomas_Weigert.pdf', type: 'application/pdf' } : {})}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.08] hover:bg-white/[0.14] text-white font-medium text-sm tracking-wide border border-white/15 hover:border-white/25 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] backdrop-blur-md active:scale-[0.98]"
          >
            {isDownload && <Download className="w-4 h-4 text-amber-300" aria-hidden="true" />}
            <span>{scene.secondaryCtaText}</span>
          </a>
        )}
      </div>
    </>
  );
};
