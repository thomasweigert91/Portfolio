import React from 'react';
import type { PassionItem } from '@/data/portfolioData';
import type { UiDictionary } from '@/i18n/dictionaries';
import { Trees, Dog, Music, UtensilsCrossed, Landmark, Heart } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Trees,
  Dog,
  Music,
  UtensilsCrossed,
  Landmark,
};

interface PassionsSectionProps {
  passions: PassionItem[];
  ui: Pick<UiDictionary, 'passions'>;
}

export const PassionsSection: React.FC<PassionsSectionProps> = ({ passions, ui }) => {

  return (
    <section id="passions" className="py-24 sm:py-32 px-6 sm:px-12 max-w-7xl mx-auto border-t border-amber-900/20">
      <div className="mb-16">
        <div className="text-xs font-mono tracking-widest text-amber-300/85 uppercase mb-3 font-medium">
          {ui.passions.badge}
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold font-fraunces text-white tracking-tight leading-[1.25] sm:leading-[1.18]">
          {ui.passions.titlePart1}<span className="italic text-amber-300 inline-block pb-0.5">{ui.passions.titleHighlight}</span>.
        </h2>
        <p className="text-stone-100 text-base max-w-2xl mt-4 font-light leading-relaxed sm:leading-7">
          {ui.passions.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {passions.map((card, idx) => {
          const IconComp = iconMap[card.icon] || Heart;
          const isSpan = idx === 0 || idx === 3;
          return (
            <div
              key={card.title}
              className={`p-1.5 rounded-[2rem] bg-white/[0.03] ring-1 ring-white/10 hover:ring-amber-500/40 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_16px_40px_rgba(229,152,58,0.1)] hover:-translate-y-1 ${
                isSpan ? 'md:col-span-1' : ''
              }`}
            >
              <div className="rounded-[calc(2rem-0.375rem)] bg-[#191512] p-7 sm:p-8 flex flex-col justify-between h-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#221C18] border border-amber-500/20 flex items-center justify-center text-amber-400 shadow-inner">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono text-amber-300/90 px-3 py-1 rounded-full bg-amber-950/40 border border-amber-500/20">
                      {card.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-fraunces text-white mb-1.5 leading-snug">
                    {card.title}
                  </h3>
                  <div className="text-xs font-mono text-stone-400 mb-4 leading-normal">
                    {card.subtitle}
                  </div>
                  <p className="text-sm text-stone-300 leading-relaxed sm:leading-7 font-light">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
