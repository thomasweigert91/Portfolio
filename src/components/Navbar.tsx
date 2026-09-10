import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Sliders, Menu, X, Globe, Download } from 'lucide-react';

interface NavbarProps {
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  reducedMotion,
  onToggleReducedMotion
}) => {
  const { lang, setLang, data, ui } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: ui.nav.story, href: '#story' },
    { label: ui.nav.projects, href: '#projects' },
    { label: ui.nav.passions, href: '#passions' },
    { label: ui.nav.experience, href: '#experience' },
    { label: ui.nav.contact, href: '#contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#14110F]/95 backdrop-blur-xl py-3.5 shadow-[0_10px_35px_rgba(0,0,0,0.55)]' 
        : 'bg-gradient-to-b from-[#14110F]/90 via-[#14110F]/40 to-transparent py-5'
    }`}>
      <div className="max-w-[92rem] mx-auto px-6 sm:px-10 lg:px-12 flex items-center justify-between gap-6">
        
        {/* Brand / Logo Lockup */}
        <a href="#story" className="group flex items-center gap-3.5 focus:outline-none shrink-0">
          <div className="relative w-10 h-10 flex items-center justify-center rounded-2xl bg-[#1E1916] border border-amber-500/30 p-1.5 group-hover:border-amber-400 transition-all duration-300 shadow-[0_0_15px_rgba(229,152,58,0.15)] shrink-0">
            <img src="/logo.svg" alt="Thomas Weigert Logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col whitespace-nowrap">
            <span className="font-fraunces font-bold text-base tracking-tight text-white group-hover:text-amber-300 transition-colors whitespace-nowrap">
              {data.profile.name}
            </span>
            <span className="text-xs font-mono text-amber-400/90 tracking-wider uppercase whitespace-nowrap">
              Frontend Engineer
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6 2xl:gap-8 ml-4 xl:ml-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-medium uppercase tracking-wider text-stone-300 hover:text-amber-300 transition-colors duration-200 whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Controls: Language Toggle, Motion Mode & CV Download CTA */}
        <div className="hidden lg:flex items-center gap-2.5 xl:gap-3 ml-auto shrink-0 pl-4">
          {/* Language Toggle */}
          <div className="flex items-center p-0.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono shrink-0">
            <button
              onClick={() => setLang('de')}
              className={`px-2.5 py-1 rounded-lg transition-all duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] font-semibold cursor-pointer active:scale-95 ${
                lang === 'de'
                  ? 'bg-amber-500 text-[#14110F] shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
              title="Auf Deutsch wechseln"
              aria-label="Auf Deutsch wechseln"
            >
              DE
            </button>
            <span className="text-stone-600 text-xs px-0.5 select-none">|</span>
            <button
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 rounded-lg transition-all duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] font-semibold cursor-pointer active:scale-95 ${
                lang === 'en'
                  ? 'bg-amber-500 text-[#14110F] shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
              title="Switch to English"
              aria-label="Switch to English"
            >
              EN
            </button>
          </div>

          {/* Motion Mode Control */}
          <button
            onClick={onToggleReducedMotion}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-95 cursor-pointer shrink-0 ${
              reducedMotion
                ? 'bg-amber-950/60 border-amber-500/50 text-amber-300 shadow-[0_0_15px_rgba(229,152,58,0.2)]'
                : 'bg-white/[0.04] border-white/10 text-stone-300 hover:text-white hover:border-white/20'
            }`}
            title={ui.motion.title}
          >
            <Sliders className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="hidden xl:inline">{reducedMotion ? ui.motion.static : ui.motion.motion}</span>
            <span className="xl:hidden">{reducedMotion ? (lang === 'de' ? 'Statisch' : 'Static') : '60 FPS'}</span>
          </button>

          {/* Download CV CTA Button (Right-aligned) */}
          <a
            href="/CV_Thomas_Weigert.pdf"
            download="CV_Thomas_Weigert.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 hover:border-amber-400/50 text-amber-300 hover:text-amber-200 text-xs font-mono transition-all duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-95 shadow-[0_0_15px_rgba(229,152,58,0.12)] group cursor-pointer shrink-0 whitespace-nowrap"
            title={lang === 'de' ? 'Lebenslauf herunterladen (PDF)' : 'Download CV (PDF)'}
          >
            <Download className="w-3.5 h-3.5 text-amber-400 group-hover:translate-y-0.5 transition-transform duration-200 shrink-0" />
            <span className="font-semibold">{ui.nav.downloadCv}</span>
          </a>
        </div>

        {/* Mobile Controls (Quick DE|EN + Quick CV + Hamburger) */}
        <div className="flex items-center gap-2.5 lg:hidden">
          {/* Mobile quick language toggle */}
          <div className="flex items-center p-0.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono">
            <button
              onClick={() => setLang('de')}
              className={`px-2.5 py-1 rounded-lg font-semibold active:scale-95 transition-all ${
                lang === 'de' ? 'bg-amber-500 text-[#14110F]' : 'text-stone-400'
              }`}
            >
              DE
            </button>
            <span className="text-stone-600 text-xs px-0.5 select-none">|</span>
            <button
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 rounded-lg font-semibold active:scale-95 transition-all ${
                lang === 'en' ? 'bg-amber-500 text-[#14110F]' : 'text-stone-400'
              }`}
            >
              EN
            </button>
          </div>

          {/* Mobile Quick CV Download */}
          <a
            href="/CV_Thomas_Weigert.pdf"
            download="CV_Thomas_Weigert.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 active:scale-95 transition-transform"
            title={ui.nav.downloadCv}
            aria-label={ui.nav.downloadCv}
          >
            <Download className="w-4 h-4" />
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-stone-300 cursor-pointer active:scale-95 transition-transform"
            aria-label="Navigation umschalten"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#1A1613] border-b border-white/10 px-6 py-6 space-y-4">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-stone-200 hover:text-amber-300 py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
            {/* CV Download button */}
            <a
              href="/CV_Thomas_Weigert.pdf"
              download="CV_Thomas_Weigert.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 font-mono text-xs font-semibold active:scale-95 transition-all shadow-[0_0_15px_rgba(229,152,58,0.15)]"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>{ui.nav.downloadCv} (PDF)</span>
            </a>

            {/* Motion toggle */}
            <button
              onClick={() => { onToggleReducedMotion(); setMobileMenuOpen(false); }}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-stone-200"
            >
              <Sliders className="w-4 h-4 text-amber-400" />
              <span>{reducedMotion ? ui.motion.static : ui.motion.motion}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
