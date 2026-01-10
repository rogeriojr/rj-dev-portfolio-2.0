import { useLanguage } from './LanguageContext';

export function useTranslation() {
  const { language, setLanguage, t } = useLanguage();

  return {
    t,
    language,
    setLanguage,
    isPortuguese: language === 'pt',
    isEnglish: language === 'en',
  };
}
