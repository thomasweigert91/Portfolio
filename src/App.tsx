import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { CinematicHero } from './components/CinematicHero';
import { ProjectsSection } from './components/ProjectsSection';
import { PassionsSection } from './components/PassionsSection';
import { ExperienceAndSkills } from './components/ExperienceAndSkills';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ProjectItem } from './data/portfolioData';
import { Sliders, ArrowRight } from 'lucide-react';

const PortfolioApp: React.FC = () => {
  const { data, ui } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Check OS reduced motion preference on mount
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setReducedMotion(true);
    }
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <div className="min-h-screen bg-[#14110F] text-[#F3EFEA] selection:bg-amber-500/25 selection:text-amber-300">
      {/* Top Navbar */}
      <Navbar
        reducedMotion={reducedMotion}
        onToggleReducedMotion={() => setReducedMotion(!reducedMotion)}
      />

      <main>
        {/* Cinematic Scroll Story Pinned Stage OR Static Reduced-Motion Alternative */}
        {!reducedMotion ? (
          <CinematicHero />
        ) : (
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
              {data.visualStory.map((scene, idx) => (
                <div key={scene.id} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className={`lg:col-span-6 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="relative aspect-[16/9] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                      <img src={scene.imagePlate} alt={scene.sceneName} className="w-full h-full object-cover" />
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-xs font-mono text-amber-300 border border-white/10">
                        {scene.sceneNumber} · {scene.sceneName}
                      </div>
                    </div>
                  </div>

                  <div className={`lg:col-span-6 space-y-6 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="text-xs font-mono text-amber-400 tracking-wider uppercase">
                      {scene.visualNote}
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold font-fraunces text-white leading-snug">
                      {scene.heading}
                    </h2>
                    <p className="text-base text-stone-300 leading-relaxed sm:leading-7 font-light">
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
        )}

        {/* Echte Projekte */}
        <ProjectsSection onSelectProject={(project) => setSelectedProject(project)} />

        {/* Werte & Leidenschaften (Natur, Hunde, Country-Musik, Kochen, Finanzen) */}
        <PassionsSection />

        {/* Werdegang & Fähigkeiten */}
        <ExperienceAndSkills />

        {/* Direkter Kontakt & Anfragen */}
        <ContactSection />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Projekt Case-Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <PortfolioApp />
    </LanguageProvider>
  );
};

