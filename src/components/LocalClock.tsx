'use client';

import { useEffect, useState } from 'react';
import type { Language } from '@/i18n/dictionaries';

/** Live Hamburg time. Renders empty on the server to avoid hydration mismatches. */
export function LocalClock({ lang }: { lang: Language }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const format = () =>
      new Date().toLocaleTimeString(lang === 'de' ? 'de-DE' : 'en-GB', {
        timeZone: 'Europe/Berlin',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
    const update = () => setTime(format());
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [lang]);

  return <span suppressHydrationWarning>{time}</span>;
}
