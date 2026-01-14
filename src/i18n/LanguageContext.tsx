import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import ptTranslations from './locales/pt.json';
import enTranslations from './locales/en.json';

export type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  pt: ptTranslations,
  en: enTranslations,
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('portfolio-language');
    return (saved === 'pt' || saved === 'en') ? saved : 'pt';
  });

  useEffect(() => {
    localStorage.setItem('portfolio-language', language);
    const langCode = language === 'pt' ? 'pt-BR' : 'en-US';
    document.documentElement.lang = langCode;
    document.documentElement.setAttribute('lang', langCode);
    
    const liveRegion = document.getElementById('language-announcement');
    if (liveRegion) {
      liveRegion.textContent = language === 'pt' 
        ? 'Idioma alterado para Português' 
        : 'Language changed to English';
      setTimeout(() => {
        liveRegion.textContent = '';
      }, 1000);
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];

    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key;
      }
    }

    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
