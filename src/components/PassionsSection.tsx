import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Trees, Dog, Music, UtensilsCrossed, Landmark, Heart } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Trees,
  Dog,
  Music,
  UtensilsCrossed,
  Landmark,
};

export const PassionsSection: React.FC = () => {
  const { data, ui } = useLanguage();

  return (
    <section id="passions" className="py-24 sm:py-32 px-6 sm:px-12 max-w-7xl mx-auto border-t border-amber-900/20">
      <div className="mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/30 text-amber-300 text-xs font-mono uppercase tracking-wider mb-4">
          <Heart className="w-3.5 h-3.5 text-amber-400" />
          <span>{ui.passions.badge}</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold font-fraunces text-[#FDFBF7] tracking-tight">
          {ui.passions.titlePart1}<span className="italic text-amber-300">{ui.passions.titleHighlight}</span>.
        </h2>
        <p className="text-stone-300 text-base max-w-2xl mt-4 font-light leading-relaxed">
          {ui.passions.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.passions.map((card, idx) => {
          const IconComp = iconMap[card.icon] || Heart;
          const isSpan = idx === 0 || idx === 3;
          return (
            <div
              key={card.title}
              className={`p-8 rounded-3xl bg-[#1A1613] border border-white/10 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(229,152,58,0.08)] ${
                isSpan ? 'md:col-span-1' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#221C18] border border-amber-500/20 flex items-center justify-center text-amber-400 shadow-inner">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono text-amber-300/80 px-2.5 py-1 rounded-full bg-amber-950/40 border border-amber-500/20">
                    {card.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold font-fraunces text-white mb-1">
                  {card.title}
                </h3>
                <div className="text-xs font-mono text-stone-400 mb-4">
                  {card.subtitle}
                </div>
                <p className="text-sm text-stone-300 leading-relaxed font-light">
                  {card.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-[11px] font-mono text-stone-500">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>{ui.passions.footerNote}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
