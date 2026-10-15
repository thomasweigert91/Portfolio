'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

interface MotionContextValue {
  reducedMotion: boolean;
  setReducedMotion: (value: boolean) => void;
  toggleReducedMotion: () => void;
}

const MotionContext = createContext<MotionContextValue | undefined>(undefined);

export function MotionProvider({ children }: { children: ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState(false);

  // Follow the OS "reduce motion" preference; the toggle in the navbar can override it.
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    // Syncing with an external system (media query) after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (mediaQuery.matches) setReducedMotion(true);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <MotionContext.Provider
      value={{
        reducedMotion,
        setReducedMotion,
        toggleReducedMotion: () => setReducedMotion((v) => !v),
      }}
    >
      {children}
    </MotionContext.Provider>
  );
}

export function useMotion(): MotionContextValue {
  const context = useContext(MotionContext);
  if (!context) throw new Error('useMotion must be used within a MotionProvider');
  return context;
}
