import React from 'react';
import { GraduationCap, Quote, CheckCircle2, Globe } from 'lucide-react';
import type { PortfolioData } from '@/data/portfolioData';
import type { Language, UiDictionary } from '@/i18n/dictionaries';

interface ExperienceAndSkillsProps {
  lang: Language;
  data: Pick<PortfolioData, 'referenceLetter' | 'experience' | 'education' | 'skillCategories' | 'languages'>;
  ui: Pick<UiDictionary, 'experience'>;
}

export const ExperienceAndSkills: React.FC<ExperienceAndSkillsProps> = ({ lang, data, ui }) => {

  return (
    <section id="experience" className="py-24 sm:py-32 px-6 sm:px-12 max-w-7xl mx-auto border-t border-white/5">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left Column: Werdegang & Arbeitszeugnis (7 cols) */}
        <div className="lg:col-span-7 space-y-12">
          <div>
            <div className="text-xs font-mono tracking-widest text-amber-300/85 uppercase mb-3 font-medium">
              {ui.experience.badge}
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-fraunces text-white tracking-tight leading-[1.25] sm:leading-[1.18]">
              {ui.experience.titlePart1}<span className="italic text-amber-300 inline-block pb-0.5">{ui.experience.titleHighlight}</span>.
            </h2>
          </div>

          {/* Arbeitszeugnis Highlight Card (Double-Bezel) */}
          <div className="p-1.5 rounded-[2rem] bg-white/[0.03] ring-1 ring-amber-500/25 shadow-xl">
            <div className="p-5 sm:p-8 rounded-[calc(2rem-0.375rem)] bg-[#191512] relative overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
              <Quote className="w-12 h-12 text-amber-500/15 absolute -bottom-2 -right-2 pointer-events-none" />
              
              {/* Badges: Zwei getrennte, saubere Chips ohne Zeilenumbruch im Pill */}
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <span className="px-3 py-1 rounded-full bg-amber-950/70 border border-amber-500/30 text-amber-300 text-xs font-mono uppercase tracking-wider">
                  {data.referenceLetter.badge}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-mono uppercase tracking-wider font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>{lang === 'de' ? `Note: ${data.referenceLetter.rating}` : `Grade: ${data.referenceLetter.rating}`}</span>
                </span>
              </div>

              <p className="text-sm sm:text-base text-stone-200 italic font-light leading-relaxed sm:leading-8 mb-6 text-pretty">
                „{data.referenceLetter.quote}“
              </p>

              {/* Responsiver Footer: Kein Zusammenquetschen von Name und langer Firmenbezeichnung auf Mobile */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 sm:gap-4 border-t border-white/10 pt-4 text-xs font-mono">
                <div className="flex flex-wrap items-baseline gap-1.5">
                  <span className="text-white font-medium">{data.referenceLetter.author}</span>
                  <span className="text-stone-400">({data.referenceLetter.role})</span>
                </div>
                <span className="text-amber-300/85 sm:text-right">{data.referenceLetter.company}</span>
              </div>
            </div>
          </div>

          {/* Timeline Stationen */}
          <div className="relative border-l border-white/10 pl-6 sm:pl-8 space-y-12">
            {data.experience.map((item, idx) => (
              <div key={idx} className="relative group">
                {/* Timeline Node */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#14110F] border-2 border-amber-400 group-hover:scale-125 group-hover:bg-amber-400 transition-all shadow-[0_0_10px_rgba(229,152,58,0.4)]" />

                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                  <h3 className="text-xl font-bold font-fraunces text-white group-hover:text-amber-300 transition-colors leading-snug">
                    {item.role}
                  </h3>
                  <span className="text-xs font-mono text-amber-300 px-2.5 py-0.5 rounded-md bg-amber-950/60 border border-amber-500/20">
                    {item.period}
                  </span>
                </div>

                <div className="text-sm font-mono text-stone-400 mb-4 flex items-center gap-2">
                  <span className="text-white font-medium">{item.company}</span>
                  <span>•</span>
                  <span>{item.location}</span>
                </div>

                <p className="text-sm text-stone-300 leading-relaxed sm:leading-7 font-light mb-4">
                  {item.description}
                </p>

                <div className="space-y-2.5 mb-5">
                  {item.achievements.map((ach, aIdx) => (
                    <div key={aIdx} className="flex items-start gap-3 text-xs sm:text-sm text-stone-300">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                      <span className="leading-relaxed sm:leading-6">{ach}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {item.skills.map((s) => (
                    <span key={s} className="px-2.5 py-1 rounded-lg text-xs font-mono text-stone-300 bg-white/5 border border-white/10">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Ausbildung Section */}
          <div className="pt-8 border-t border-white/10">
            <h3 className="text-lg font-bold font-fraunces text-white mb-6 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-amber-400" />
              <span>{ui.experience.educationTitle}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.education.map((edu, eIdx) => (
                <div key={eIdx} className="p-4 rounded-2xl bg-[#191512] border border-white/10">
                  <div className="text-xs font-mono text-amber-400 mb-1">{edu.period}</div>
                  <div className="text-sm font-bold font-fraunces text-white">{edu.title}</div>
                  <div className="text-xs text-stone-400 mt-1">{edu.institution} ({edu.location})</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Fähigkeiten-Matrix & Sprachen (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <div className="text-xs font-mono tracking-widest text-amber-300/85 uppercase mb-3 font-medium">
              {ui.experience.skillsBadge}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-fraunces text-white mb-6">
              {ui.experience.skillsTitle}
            </h2>
          </div>

          {/* Skill Kategorien aus Lebenslauf */}
          <div className="space-y-5">
            {data.skillCategories.map((cat, cIdx) => (
              <div key={cIdx} className="p-1.5 rounded-[1.75rem] bg-white/[0.02] ring-1 ring-white/10">
                <div className="p-5 sm:p-6 rounded-[calc(1.75rem-0.375rem)] bg-[#191512] space-y-3 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
                  <h3 className="text-sm font-bold font-fraunces text-amber-300 tracking-wide">
                    {cat.title}
                  </h3>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {cat.skills.map((skill) => (
                      <span 
                        key={skill} 
                        className="px-3 py-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-stone-200 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sprachen Card (Optimiertes, entzerrtes Layout) */}
          <div className="p-6 rounded-3xl bg-[#1A1613] border border-white/10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-950/60 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold font-fraunces text-white">{ui.experience.languagesTitle}</div>
                <div className="text-xs text-stone-400">{ui.experience.languagesSubtitle}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {data.languages.map((langItem, lIdx) => (
                <div key={lIdx} className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-fraunces text-white">{langItem.language}</span>
                    <span
                      className={`w-2 h-2 rounded-full ${langItem.isNative ? 'bg-emerald-400' : 'bg-amber-400'}`}
                      title={langItem.level}
                    />
                  </div>
                  <div className="text-xs font-mono text-amber-300">{langItem.level}</div>
                  <div className="text-xs text-stone-400 leading-normal">{langItem.desc}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
