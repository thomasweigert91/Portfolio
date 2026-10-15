import {
  type Language,
  portfolioDataDE,
  portfolioDataEN,
  uiTranslations,
} from '@/data/portfolioData';

export type { Language };
export type UiDictionary = (typeof uiTranslations)['de'];

export const locales: readonly Language[] = ['de', 'en'];
export const defaultLocale: Language = 'de';

export function isLocale(value: string): value is Language {
  return (locales as readonly string[]).includes(value);
}

export function getDictionary(lang: Language) {
  return {
    data: lang === 'de' ? portfolioDataDE : portfolioDataEN,
    ui: uiTranslations[lang],
  };
}
