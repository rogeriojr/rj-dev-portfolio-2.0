import { useState, useEffect } from 'react';

export interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const CONSENT_KEY = 'portfolio-cookie-consent';

export function useCookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [consent, setConsent] = useState<CookieConsent | null>(null);

  useEffect(() => {
    const savedConsent = localStorage.getItem(CONSENT_KEY);

    if (savedConsent) {
      try {
        setConsent(JSON.parse(savedConsent));
        setShowBanner(false);
      } catch (error) {
        console.error('Error parsing cookie consent:', error);
        setShowBanner(true);
      }
    } else {
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  const acceptAll = () => {
    const fullConsent: CookieConsent = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    saveConsent(fullConsent);
  };

  const acceptNecessary = () => {
    const necessaryConsent: CookieConsent = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    saveConsent(necessaryConsent);
  };

  const acceptCustom = (customConsent: CookieConsent) => {
    saveConsent({ ...customConsent, necessary: true });
  };

  const saveConsent = (consentData: CookieConsent) => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consentData));
    setConsent(consentData);
    setShowBanner(false);

    if (consentData.analytics && typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('consent', 'update', {
        analytics_storage: 'granted',
      });
    }
  };

  const resetConsent = () => {
    localStorage.removeItem(CONSENT_KEY);
    setConsent(null);
    setShowBanner(true);
  };

  return {
    showBanner,
    consent,
    acceptAll,
    acceptNecessary,
    acceptCustom,
    resetConsent,
  };
}
