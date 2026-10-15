'use client';

import React, { useEffect, useRef, useState } from 'react';

interface HeroCanvasProps {
  /** Scroll progress of the hero (0..1), written by HeroStage without re-rendering the canvas. */
  progressRef: React.RefObject<number>;
  telemetryTag: string;
  locationTag: string;
}

interface DustParticle {
  x: number;
  y: number;
  z: number;
  size: number;
  alpha: number;
  speed: number;
  angle: number;
}

const SCENE_PLATES = {
  scene1: '/assets/scene1.jpg',
  scene2: '/assets/scene2.jpg',
  scene3: '/assets/scene3.jpg',
} as const;

function createParticles(count: number): DustParticle[] {
  return Array.from({ length: count }, () => ({
    x: (Math.random() - 0.5) * 2000,
    y: (Math.random() - 0.5) * 2000,
    z: Math.random() * 1000 + 100,
    size: Math.random() * 2.5 + 1.0,
    alpha: Math.random() * 0.6 + 0.2,
    speed: Math.random() * 0.4 + 0.15,
    angle: Math.random() * Math.PI * 2,
  }));
}

/**
 * Client-only canvas layer of the cinematic hero (loaded via next/dynamic with ssr: false).
 * All text lives in HeroStage as real HTML; this component only paints the backdrop.
 */
export default function HeroCanvas({ progressRef, telemetryTag, locationTag }: HeroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<Partial<Record<keyof typeof SCENE_PLATES, HTMLImageElement>>>({});
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Load the scene plates after the page (and its text) has loaded, so the large
  // images never compete with fonts and scripts for the first paint.
  // Scene 1 comes first; the canvas fades in as soon as it is ready.
  useEffect(() => {
    let cancelled = false;

    const loadPlate = (key: keyof typeof SCENE_PLATES) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.decoding = 'async';
        img.onload = () => {
          if (!cancelled) imagesRef.current[key] = img;
          resolve();
        };
        img.onerror = () => resolve();
        img.src = SCENE_PLATES[key];
      });

    const loadAll = async () => {
      await loadPlate('scene1');
      if (cancelled) return;
      setImagesLoaded(true);
      await Promise.all([loadPlate('scene2'), loadPlate('scene3')]);
    };

    const schedule = () => {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => void loadAll(), { timeout: 1500 });
      } else {
        setTimeout(() => void loadAll(), 200);
      }
    };

    if (document.readyState === 'complete') schedule();
    else window.addEventListener('load', schedule, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener('load', schedule);
    };
  }, []);

  // Render loop (warm golden dust, smooth camera dolly, cursor parallax)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles = createParticles(120);
    // next/font hashes the family name, so resolve it from the CSS variable.
    const monoFamily =
      getComputedStyle(document.documentElement).getPropertyValue('--font-jetbrains-src').trim() ||
      'ui-monospace, monospace';
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let smoothProgress = progressRef.current ?? 0;
    let frameId: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 25;
      mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 25;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const render = () => {
      const scrollProgress = progressRef.current ?? 0;

      // Mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      // Smooth progress lerp
      smoothProgress += (scrollProgress - smoothProgress) * 0.1;
      const p = smoothProgress;

      // High DPI resize
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      // Warm background base
      ctx.fillStyle = '#14110F';
      ctx.fillRect(0, 0, width, height);

      // 1. Draw visual plates with seamless blending, subtle camera breathing & mobile-adaptive focal alignment
      const drawPlate = (
        img: HTMLImageElement | undefined,
        alpha: number,
        scale: number,
        panX: number,
        panY: number,
        mobileFocalX = 0.5,
        mobileFocalY = 0.5,
        desktopFocalX = 0.5,
        desktopFocalY = 0.5,
      ) => {
        if (!img || alpha <= 0.001) return;
        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, alpha));

        const imgRatio = img.width / img.height;
        const screenRatio = width / height;
        let renderW = width;
        let renderH = height;

        if (screenRatio > imgRatio) {
          renderW = width * scale;
          renderH = (width / imgRatio) * scale;
        } else {
          renderH = height * scale;
          renderW = height * imgRatio * scale;
        }

        const isMobile = width < 768;
        const focalX = isMobile ? mobileFocalX : desktopFocalX;
        const focalY = isMobile ? mobileFocalY : desktopFocalY;

        // When image width exceeds screen width (portrait/mobile), center on target focalX
        let offsetX: number;
        if (renderW > width) {
          offsetX = width * 0.5 - renderW * focalX + panX;
          // Clamp so image always covers the entire viewport seamlessly
          offsetX = Math.min(0, Math.max(width - renderW, offsetX));
        } else {
          offsetX = (width - renderW) / 2 + panX;
        }

        // When image height exceeds screen height, center on target focalY
        let offsetY: number;
        if (renderH > height) {
          offsetY = height * 0.5 - renderH * focalY + panY;
          offsetY = Math.min(0, Math.max(height - renderH, offsetY));
        } else {
          offsetY = (height - renderH) / 2 + panY;
        }

        ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
        ctx.restore();
      };

      const { scene1: img1, scene2: img2, scene3: img3 } = imagesRef.current;

      // Piecewise scene alphas
      // Scene 1: 0.0 -> 0.35
      let a1 = 1;
      const s1 = 1.0 + p * 0.12;
      if (p > 0.22) {
        a1 = Math.max(0, 1 - (p - 0.22) / 0.18);
      }

      // Scene 2: 0.22 -> 0.76
      let a2 = 0;
      const s2 = 1.04 - (p - 0.24) * 0.06;
      if (p >= 0.22 && p <= 0.42) {
        a2 = (p - 0.22) / 0.2;
      } else if (p > 0.42 && p <= 0.68) {
        a2 = 1;
      } else if (p > 0.68) {
        a2 = Math.max(0, 1 - (p - 0.68) / 0.16);
      }

      // Scene 3: 0.70 -> 1.0
      let a3 = 0;
      const s3 = 1.06 - (p - 0.7) * 0.06;
      if (p > 0.7) {
        a3 = Math.min(1, (p - 0.7) / 0.18);
      }

      const mx = mouse.x;
      const my = mouse.y;

      // Scene 1: Cabin deck with laptop, coffee mug, and forest sunlight
      drawPlate(img1, a1, s1, mx * 0.5, my * 0.5, 0.5, 0.58, 0.5, 0.5);
      // Scene 2: Thomas cooking on left + skillet
      drawPlate(img2, a2, s2, mx * 0.6, my * 0.6, 0.32, 0.3, 0.5, 0.5);
      // Scene 3: Dogs resting by fireplace
      drawPlate(img3, a3, s3, mx * 0.4, my * 0.4, 0.5, 0.4, 0.5, 0.5);

      // 2. Warm sunlit / hearth vignette overlay (calibrated for mobile clarity)
      const isMobile = width < 768;
      const maxDim = Math.max(width, height);
      const grad = ctx.createRadialGradient(
        width / 2,
        isMobile ? height * 0.35 : height / 2,
        isMobile ? width * 0.3 : width * 0.25,
        width / 2,
        isMobile ? height * 0.35 : height / 2,
        isMobile ? maxDim * 0.75 : width * 0.85,
      );
      grad.addColorStop(0, 'rgba(20, 17, 15, 0)');
      grad.addColorStop(0.65, isMobile ? 'rgba(20, 17, 15, 0.25)' : 'rgba(20, 17, 15, 0.45)');
      grad.addColorStop(1, isMobile ? 'rgba(15, 12, 10, 0.75)' : 'rgba(15, 12, 10, 0.90)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // 3. Warm floating golden dust motes / sunlight particles
      const scrollDrift = Math.abs(scrollProgress - smoothProgress) * 80;

      for (let i = 0; i < particles.length; i++) {
        const pt = particles[i];

        pt.z -= pt.speed + scrollDrift * 0.08;
        pt.angle += 0.01;

        if (pt.z <= 20) {
          pt.z = 1000;
          pt.x = (Math.random() - 0.5) * 2000;
          pt.y = (Math.random() - 0.5) * 2000;
        }

        const k = 400 / pt.z;
        const driftX = Math.cos(pt.angle) * 15;
        const driftY = Math.sin(pt.angle) * 15;
        const screenX = width / 2 + (pt.x + mx * 4 + driftX) * k;
        const screenY = height / 2 + (pt.y + my * 4 + driftY) * k;

        if (screenX >= 0 && screenX <= width && screenY >= 0 && screenY <= height) {
          const depthAlpha = Math.min(1, (1000 - pt.z) / 800) * pt.alpha;

          // Warm amber & honey tones for organic sunlight feel
          const isHoney = i % 3 === 0;
          ctx.fillStyle = isHoney
            ? `rgba(245, 158, 11, ${depthAlpha * 0.75})`
            : `rgba(229, 152, 58, ${depthAlpha * 0.65})`;

          ctx.beginPath();
          ctx.arc(screenX, screenY, Math.max(0.6, pt.size * k), 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 4. Subtle telemetry badge
      ctx.save();
      ctx.font = `10px ${monoFamily}`;
      ctx.fillStyle = 'rgba(243, 239, 234, 0.22)';
      ctx.fillText(`${telemetryTag} · ${(p * 100).toFixed(0)}%`, 24, height - 16);
      if (width >= 640) {
        ctx.textAlign = 'right';
        ctx.fillText(locationTag, width - 24, height - 16);
      }
      ctx.restore();

      ctx.restore();
      frameId = requestAnimationFrame(render);
    };

    // Only animate while the tab is visible and the hero is on screen.
    let inView = true;
    const start = () => {
      if (frameId === null && inView && !document.hidden) {
        frameId = requestAnimationFrame(render);
      }
    };
    const stop = () => {
      if (frameId !== null) cancelAnimationFrame(frameId);
      frameId = null;
    };

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) start();
      else stop();
    });
    observer.observe(canvas);

    const handleVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', handleVisibility);

    start();

    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [progressRef, telemetryTag, locationTag]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full block select-none pointer-events-none transition-opacity duration-700"
      style={{ opacity: imagesLoaded ? 1 : 0 }}
    />
  );
}
