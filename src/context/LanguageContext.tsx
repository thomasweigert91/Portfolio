import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Language, 
  PortfolioData, 
  portfolioDataDE, 
  portfolioDataEN, 
  uiTranslations 
} from '../data/portfolioData';

type UiType = typeof uiTranslations['de'];

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  data: PortfolioData;
  ui: UiType;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('portfolio_lang');
    if (saved === 'de' || saved === 'en') return saved;
    return 'de';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('portfolio_lang', newLang);
    document.documentElement.lang = newLang;
  };

  const toggleLang = () => {
    setLang(lang === 'de' ? 'en' : 'de');
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value: LanguageContextType = {
    lang,
    setLang,
    toggleLang,
    data: lang === 'de' ? portfolioDataDE : portfolioDataEN,
    ui: uiTranslations[lang],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
