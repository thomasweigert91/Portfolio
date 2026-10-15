"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ArrowRight, Sparkles } from "lucide-react";
import type { VisualStoryScene } from "@/data/portfolioData";
import type { Language, UiDictionary } from "@/i18n/dictionaries";

// The canvas only paints the atmosphere; it is loaded on the client after the HTML is visible.
const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

interface CinematicHeroProps {
  lang: Language;
  name: string;
  email: string;
  stats: { label: string; value: string }[];
  scenes: VisualStoryScene[];
  ui: Pick<UiDictionary, "hero">;
}

export const CinematicHero: React.FC<CinematicHeroProps> = ({
  lang,
  name,
  email,
  stats,
  scenes,
  ui,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeBeat, setActiveBeat] = useState<
    "scene1" | "trans1" | "scene2" | "trans2" | "scene3"
  >("scene1");

  // Native scroll listener without hijacking
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable =
        containerRef.current.offsetHeight - window.innerHeight;

      if (totalScrollable <= 0) return;

      const current = -rect.top;
      const progress = Math.max(0, Math.min(1, current / totalScrollable));
      progressRef.current = progress;
      setScrollProgress(progress);

      if (progress < 0.26) {
        setActiveBeat("scene1");
      } else if (progress < 0.44) {
        setActiveBeat("trans1");
      } else if (progress < 0.72) {
        setActiveBeat("scene2");
      } else if (progress < 0.86) {
        setActiveBeat("trans2");
      } else {
        setActiveBeat("scene3");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Jump to specific scene
  const scrollToScene = (sceneIndex: number) => {
    if (!containerRef.current) return;
    const total = containerRef.current.offsetHeight - window.innerHeight;
    const targets = [0.05, 0.55, 0.95];
    const targetScroll =
      containerRef.current.offsetTop + total * targets[sceneIndex];
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };


  // Scene Opacities & Transforms
  const scene1Opacity =
    scrollProgress <= 0.22
      ? Math.min(1, Math.max(0, 1 - (scrollProgress - 0.15) / 0.08))
      : 0;
  const scene1TranslateY = scrollProgress * 100;

  let scene2Opacity = 0;
  if (scrollProgress >= 0.4 && scrollProgress <= 0.72) {
    if (scrollProgress < 0.48) scene2Opacity = (scrollProgress - 0.4) / 0.08;
    else if (scrollProgress <= 0.64) scene2Opacity = 1;
    else scene2Opacity = 1 - (scrollProgress - 0.64) / 0.08;
  }
  const scene2TranslateY = (scrollProgress - 0.5) * 60;

  const scene3Opacity =
    scrollProgress >= 0.8 ? Math.min(1, (scrollProgress - 0.8) / 0.08) : 0;
  const scene3TranslateY = Math.max(0, (0.95 - scrollProgress) * 50);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#14110F]"
      style={{ height: "480vh" }}
      id="story"
    >
      {/* Sticky Fullscreen Warm Canvas Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Canvas Layer (client-only, never blocks the HTML text below) */}
        <HeroCanvas
          progressRef={progressRef}
          telemetryTag={lang === "de" ? "NATUR & HANDWERK" : "NATURE & CRAFT"}
          locationTag="HAMBURG (HENSTEDT-ULZBURG)"
        />

        {/* Cinematic Backdrop Scrim (Subtle on mobile so subjects shine through; deeper on desktop) */}
        <div className="absolute inset-0 bg-[#14110F]/20 sm:bg-[#14110F]/35 pointer-events-none z-10" />

        {/* Top Warm Progress Indicator */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-transparent z-20">
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500 transition-all duration-75"
            style={{ width: `${Math.round(scrollProgress * 100)}%` }}
          />
        </div>

        {/* Right-Hand Navigation Dots */}
        <div className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col gap-6 z-20">
          {scenes.map((s, idx) => {
            const isActive =
              (idx === 0 && scrollProgress < 0.35) ||
              (idx === 1 && scrollProgress >= 0.35 && scrollProgress < 0.78) ||
              (idx === 2 && scrollProgress >= 0.78);
            return (
              <button
                key={s.id}
                onClick={() => scrollToScene(idx)}
                className="group flex items-center gap-3 text-left focus:outline-none cursor-pointer"
                title={`${s.sceneNumber}: ${s.sceneName}`}
              >
                <span
                  className={`text-xs font-mono tracking-widest transition-colors duration-300 ${
                    isActive
                      ? "text-amber-400 font-semibold"
                      : "text-stone-400 group-hover:text-stone-300"
                  }`}
                >
                  {s.sceneNumber}
                </span>
                <span
                  className={`h-7 w-[2px] transition-all duration-300 rounded-full ${
                    isActive
                      ? "bg-amber-400 shadow-[0_0_12px_#E5983A]"
                      : "bg-white/10 group-hover:bg-white/25"
                  }`}
                />
                <span
                  className={`text-xs tracking-wider font-medium max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover:max-w-xs group-hover:opacity-100 transition-all duration-300 ${
                    isActive ? "text-amber-100" : "text-stone-300"
                  }`}
                >
                  {s.sceneName}
                </span>
              </button>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* SEMANTISCHER HTML-CONTENT (Warm, Lesbar, Mobile-Optimiert) */}
        {/* ======================================================== */}

        {/* SZENE 01: WURZELN & NATUR (Desktop: links / Mobile: zentriert) */}
        <div
          className="absolute inset-0 pointer-events-none flex flex-col justify-center items-center sm:items-start px-4 sm:px-12 lg:px-20 max-w-7xl mx-auto"
          style={{
            opacity: scene1Opacity,
            transform: `translateY(${-scene1TranslateY}px)`,
            visibility: scene1Opacity > 0.01 ? "visible" : "hidden",
            transition: "opacity 0.2s ease-out",
          }}
        >
          {/* Double-Bezel Outer Shell */}
          <div className="max-w-2xl w-full p-2 rounded-[2.25rem] bg-amber-500/[0.07] ring-1 ring-amber-500/20 shadow-2xl pointer-events-auto">
            {/* Inner Core */}
            <div className="rounded-[calc(2.25rem-0.5rem)] p-6 sm:p-10 bg-[#171310]/95 backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1c1815]/90 border border-amber-500/30 text-amber-300 text-xs font-mono tracking-wider mb-4 sm:mb-6 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>
                  {scenes[0].sceneNumber} · {name} · Frontend
                  Engineer
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-fraunces leading-[1.2] sm:leading-[1.18] mb-4 sm:mb-6 break-words">
                {scenes[0].heading}
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-stone-100 font-normal leading-relaxed sm:leading-8 mb-6 sm:mb-8 max-w-xl">
                {scenes[0].description}
              </p>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                {scenes[0].ctaText && (
                  <a
                    href={scenes[0].ctaHref || "#projects"}
                    className="group inline-flex items-center gap-3 pl-6 pr-2.5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-[#14110F] font-semibold text-sm tracking-wide transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-[0_4px_20px_rgba(229,152,58,0.25)] hover:shadow-[0_6px_28px_rgba(229,152,58,0.35)] active:scale-[0.98]"
                  >
                    <span>{scenes[0].ctaText}</span>
                    <span className="w-8 h-8 rounded-full bg-[#14110F]/15 flex items-center justify-center group-hover:translate-x-0.5 transition-transform duration-200">
                      <ArrowRight className="w-3.5 h-3.5 text-[#14110F]" />
                    </span>
                  </a>
                )}

                {scenes[0].secondaryCtaText && (
                  <a
                    href={scenes[0].secondaryCtaHref || "#contact"}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.08] hover:bg-white/[0.14] text-white font-medium text-sm tracking-wide border border-white/15 hover:border-white/25 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] backdrop-blur-md active:scale-[0.98]"
                  >
                    <span>{scenes[0].secondaryCtaText}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* TRANSITION 1 BEAT */}
        {activeBeat === "trans1" && (
          <div className="absolute top-20 sm:bottom-12 left-1/2 -translate-x-1/2 text-center pointer-events-none z-10 transition-opacity duration-300">
            <p className="text-[11px] sm:text-xs font-mono tracking-widest text-amber-300/80 uppercase">
              {ui.hero.trans1}
            </p>
          </div>
        )}

        {/* SZENE 02: PRÄZISION & KOCHKUNST (Desktop: rechts / Mobile: zentriert) */}
        <div
          className="absolute inset-0 pointer-events-none flex flex-col justify-center items-center sm:items-end px-4 sm:px-12 lg:px-20 max-w-7xl mx-auto"
          style={{
            opacity: scene2Opacity,
            transform: `translateY(${-scene2TranslateY}px)`,
            visibility: scene2Opacity > 0.01 ? "visible" : "hidden",
            transition: "opacity 0.2s ease-out",
          }}
        >
          {/* Double-Bezel Outer Shell */}
          <div className="max-w-2xl w-full p-2 rounded-[2.25rem] bg-amber-500/[0.07] ring-1 ring-amber-500/20 shadow-2xl pointer-events-auto">
            {/* Inner Core */}
            <div className="rounded-[calc(2.25rem-0.5rem)] p-6 sm:p-10 text-left sm:text-right bg-[#171310]/95 backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1c1815]/90 border border-amber-500/30 text-amber-300 text-xs font-mono tracking-wider mb-4 sm:mb-6 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>
                  {scenes[1].sceneNumber} · {scenes[1].sceneName}
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-fraunces leading-[1.2] sm:leading-[1.18] mb-4 sm:mb-6 break-words">
                {scenes[1].heading}
              </h2>

              <p className="text-sm sm:text-base lg:text-lg text-stone-100 font-normal leading-relaxed sm:leading-8 mb-6 sm:mb-8 max-w-xl sm:ml-auto">
                {scenes[1].description}
              </p>

              <div className="flex flex-wrap items-center justify-start sm:justify-end gap-3 sm:gap-4">
                {scenes[1].ctaText && (
                  <a
                    href={scenes[1].ctaHref || "#projects"}
                    className="group inline-flex items-center gap-3 pl-6 pr-2.5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-[#14110F] font-semibold text-sm tracking-wide transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-[0_4px_20px_rgba(229,152,58,0.25)] hover:shadow-[0_6px_28px_rgba(229,152,58,0.35)] active:scale-[0.98]"
                  >
                    <span>{scenes[1].ctaText}</span>
                    <span className="w-8 h-8 rounded-full bg-[#14110F]/15 flex items-center justify-center group-hover:translate-x-0.5 transition-transform duration-200">
                      <ArrowRight className="w-3.5 h-3.5 text-[#14110F]" />
                    </span>
                  </a>
                )}

                {scenes[1].secondaryCtaText && (
                  <a
                    href={scenes[1].secondaryCtaHref || "#experience"}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.08] hover:bg-white/[0.14] text-white font-medium text-sm tracking-wide border border-white/15 hover:border-white/25 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] backdrop-blur-md active:scale-[0.98]"
                  >
                    <span>{scenes[1].secondaryCtaText}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* TRANSITION 2 BEAT */}
        {activeBeat === "trans2" && (
          <div className="absolute top-20 sm:bottom-12 left-1/2 -translate-x-1/2 text-center pointer-events-none z-10 transition-opacity duration-300">
            <p className="text-[11px] sm:text-xs font-mono tracking-widest text-amber-300/80 uppercase">
              {ui.hero.trans2}
            </p>
          </div>
        )}

        {/* SZENE 03: RESOLUTION & KAMINFEUER (Zentriert) */}
        <div
          className="absolute inset-0 pointer-events-none flex flex-col justify-center items-center px-4 sm:px-6 max-w-4xl mx-auto"
          style={{
            opacity: scene3Opacity,
            transform: `translateY(${scene3TranslateY}px)`,
            visibility: scene3Opacity > 0.01 ? "visible" : "hidden",
            transition: "opacity 0.2s ease-out",
          }}
        >
          {/* Double-Bezel Outer Shell */}
          <div className="w-full p-2 rounded-[2.25rem] bg-amber-500/[0.07] ring-1 ring-amber-500/20 shadow-2xl pointer-events-auto">
            {/* Inner Core */}
            <div className="rounded-[calc(2.25rem-0.5rem)] p-6 sm:p-11 text-center bg-[#171310]/95 backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/60 border border-amber-400/30 text-amber-300 text-xs font-mono tracking-wider mb-4 sm:mb-5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  {scenes[2].sceneNumber} · {scenes[2].sceneName}
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-fraunces mb-4 sm:mb-6 leading-[1.2] sm:leading-[1.18] break-words">
                {scenes[2].heading}
              </h2>

              <p className="text-sm sm:text-base lg:text-lg text-stone-100 font-normal leading-relaxed sm:leading-8 max-w-xl mx-auto mb-6 sm:mb-8">
                {scenes[2].description}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                {scenes[2].ctaText && (
                  <a
                    href={scenes[2].ctaHref || "#contact"}
                    className="group inline-flex items-center gap-3 pl-6 pr-2.5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-[#14110F] font-semibold text-sm tracking-wide transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-[0_4px_20px_rgba(229,152,58,0.25)] hover:shadow-[0_6px_28px_rgba(229,152,58,0.35)] active:scale-[0.98]"
                  >
                    <span>{scenes[2].ctaText}</span>
                    <span className="w-8 h-8 rounded-full bg-[#14110F]/15 flex items-center justify-center group-hover:translate-x-0.5 transition-transform duration-200">
                      <ArrowRight className="w-3.5 h-3.5 text-[#14110F]" />
                    </span>
                  </a>
                )}

                <a
                  href={`mailto:${email}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.08] hover:bg-white/[0.14] text-stone-200 font-mono text-xs border border-white/15 hover:border-white/25 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] backdrop-blur-md active:scale-[0.98]"
                >
                  <span>{email}</span>
                </a>
              </div>

              {/* Stats aus Lebenslauf */}
              <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-center">
                {stats.map((stat, i) => (
                  <div key={i} className="p-1 sm:p-0">
                    <div className="text-lg sm:text-2xl font-bold font-fraunces text-amber-300 tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-xs font-mono text-stone-300 uppercase tracking-wider mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
