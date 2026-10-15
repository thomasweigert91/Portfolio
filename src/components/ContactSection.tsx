import React from "react";
import { MapPin, ExternalLink } from "lucide-react";
import type { PortfolioData } from "@/data/portfolioData";
import type { Language, UiDictionary } from "@/i18n/dictionaries";
import { ContactForm } from "./ContactForm";
import { CopyButton } from "./CopyButton";

interface ContactSectionProps {
  lang: Language;
  profile: PortfolioData["profile"];
  ui: Pick<UiDictionary, "contact">;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ lang, profile, ui }) => {
  const { email } = profile;

  return (
    <section
      id="contact"
      className="py-24 sm:py-32 px-6 sm:px-12 max-w-7xl mx-auto border-t border-white/5"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left Info Column (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <div className="text-xs font-mono tracking-widest text-amber-300/85 uppercase mb-3 font-medium">
              {ui.contact.badge}
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold font-fraunces text-white tracking-tight leading-[1.25] sm:leading-[1.18] mb-4">
              {ui.contact.titlePart1}
              <span className="italic text-amber-300 inline-block pb-0.5">
                {ui.contact.titleHighlight}
              </span>
              .
            </h2>
            <p className="text-stone-100 text-base leading-relaxed sm:leading-7 font-light">
              {ui.contact.description}
            </p>
          </div>

          {/* Contact Details Card (Double-Bezel) */}
          <div className="p-1.5 rounded-[2rem] bg-white/[0.03] ring-1 ring-white/10 shadow-lg">
            <div className="rounded-[calc(2rem-0.375rem)] bg-[#191512] p-6 space-y-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-mono text-emerald-400 tracking-wider uppercase font-semibold">
                  {profile.status}
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono text-stone-300">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{profile.location}</span>
              </div>

              {/* Email Box */}
              <div className="pt-2 border-t border-white/5">
                <div className="text-xs text-stone-400 font-mono mb-1.5">
                  {ui.contact.emailLabel}
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/10">
                  <a
                    href={`mailto:${email}`}
                    className="font-mono text-sm text-amber-300 hover:underline select-all"
                  >
                    {email}
                  </a>
                  <CopyButton value={email} label={ui.contact.emailLabel} />
                </div>
              </div>

            </div>
          </div>

          {/* Social Profiles */}
          <div>
            <div className="text-xs font-mono text-stone-400 uppercase tracking-wider mb-3">
              {ui.contact.profilesLabel}
            </div>
            <div className="flex flex-wrap gap-2.5">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-stone-200 hover:text-white border border-white/10 text-xs font-mono transition-all active:scale-[0.98]"
              >
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3 text-amber-400" />
              </a>

              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-stone-200 hover:text-white border border-white/10 text-xs font-mono transition-all active:scale-[0.98]"
              >
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3 text-amber-400" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Form Column (7 cols, Double-Bezel) */}
        <div className="lg:col-span-7">
          <div className="p-1.5 sm:p-2 rounded-[2.25rem] bg-white/[0.03] ring-1 ring-white/10 shadow-2xl">
            <div className="rounded-[calc(2.25rem-0.5rem)] bg-[#191512] p-7 sm:p-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
              <ContactForm email={email} lang={lang} ui={ui} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
