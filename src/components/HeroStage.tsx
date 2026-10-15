'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, Sliders } from 'lucide-react';
import type { VisualStoryScene } from '@/data/portfolioData';
import type { Language, UiDictionary } from '@/i18n/dictionaries';
import { CinematicHero } from './CinematicHero';
import { useMotion } from './MotionProvider';

interface HeroStageProps {
  lang: Language;
  name: string;
  email: string;
  stats: { label: string; value: string }[];
  scenes: VisualStoryScene[];
  ui: Pick<UiDictionary, 'hero' | 'motion'>;
}

/** Cinematic scroll story, or the static editorial layout when reduced motion is active. */
export const HeroStage: React.FC<HeroStageProps> = (props) => {
  const { reducedMotion, setReducedMotion } = useMotion();
  const { scenes, ui } = props;

  if (!reducedMotion) {
    return <CinematicHero {...props} />;
  }

  return (
    <section id="story" className="pt-32 pb-24 px-6 sm:px-12 max-w-7xl mx-auto space-y-16">
      <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 text-xs font-mono text-amber-300">
          <Sliders className="w-4 h-4" />
          <span>{ui.motion.reducedNotice}</span>
        </div>
        <button
          onClick={() => setReducedMotion(false)}
          className="text-xs font-mono underline text-amber-300 hover:text-amber-200 cursor-pointer"
        >
          {ui.motion.enableMotion}
        </button>
      </div>

      {/* Static Editorial Layout */}
      <div className="space-y-20">
        {scenes.map((scene, idx) => (
          <div key={scene.id} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className={`lg:col-span-6 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
              <div className="relative aspect-[16/9] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <Image
                  src={scene.imagePlate}
                  alt={scene.visualNote}
                  fill
                  sizes="(min-width: 1024px) 600px, 100vw"
                  preload={idx === 0}
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-xs font-mono text-amber-300 border border-white/10">
                  {scene.sceneNumber} · {scene.sceneName}
                </div>
              </div>
            </div>

            <div className={`lg:col-span-6 space-y-6 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
              <div className="text-xs font-mono text-amber-300/85 tracking-wider uppercase">
                {scene.visualNote}
              </div>
              {idx === 0 ? (
                <h1 className="text-3xl sm:text-4xl font-bold font-fraunces text-white leading-snug">
                  {scene.heading}
                </h1>
              ) : (
                <h2 className="text-3xl sm:text-4xl font-bold font-fraunces text-white leading-snug">
                  {scene.heading}
                </h2>
              )}
              <p className="text-base text-stone-100 leading-relaxed sm:leading-7 font-light">
                {scene.description}
              </p>
              {scene.ctaText && (
                <a
                  href={scene.ctaHref}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-[0.98] transition-all duration-200 text-[#14110F] font-semibold text-xs tracking-wide shadow-md"
                >
                  <span>{scene.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
