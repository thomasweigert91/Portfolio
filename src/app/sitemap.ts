import type { MetadataRoute } from 'next';
import { locales } from '@/i18n/dictionaries';
import { absoluteUrl } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(locales.map((lang) => [lang, absoluteUrl(`/${lang}/`)]));

  return locales.map((lang) => ({
    url: absoluteUrl(`/${lang}/`),
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: lang === 'de' ? 1 : 0.9,
    alternates: { languages },
  }));
}
