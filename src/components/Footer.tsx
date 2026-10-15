import React from 'react';
import Image from 'next/image';
import { ArrowUp } from 'lucide-react';
import type { Language, UiDictionary } from '@/i18n/dictionaries';
import { LocalClock } from './LocalClock';

interface FooterProps {
  lang: Language;
  name: string;
  location: string;
  ui: Pick<UiDictionary, 'footer'>;
}

export const Footer: React.FC<FooterProps> = ({ lang, name, location, ui }) => {

  return (
    <footer className="bg-[#0D0B0A] border-t border-white/10 py-16 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Brand & Monogram */}
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-2xl bg-[#1C1714] border border-amber-500/30 p-1.5 flex items-center justify-center shadow-md">
            <Image src="/logo.svg" alt="" width={32} height={32} className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="font-fraunces font-bold text-white text-base tracking-tight">
              {name}
            </div>
            <div className="text-xs font-mono text-amber-300/85">
              Frontend Engineer • {location}
            </div>
          </div>
        </div>

        {/* Telemetry & Time */}
        <div className="flex items-center gap-2 text-xs font-mono text-stone-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>HAMBURG (HENSTEDT-ULZBURG) · <LocalClock lang={lang} /> {lang === 'de' ? 'MEZ' : 'CET'}</span>
        </div>

        {/* Back to Top */}
        <a
          href="#story"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-stone-200 hover:text-white transition-all duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-95 shadow-sm group"
        >
          <span>{ui.footer.backToTop}</span>
          <ArrowUp className="w-3.5 h-3.5 text-amber-400 group-hover:-translate-y-0.5 transition-transform duration-200" />
        </a>

      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-stone-400 gap-4">
        <div>
          © {new Date().getFullYear()} {ui.footer.copyright}
        </div>
        <div>
          {ui.footer.location}
        </div>
      </div>
    </footer>
  );
};
