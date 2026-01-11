import { useState, useEffect } from 'react';
import { LayoutType } from '../components/PortfolioControls/LayoutSelector';
import { PaginationMode } from '../components/PortfolioControls/PaginationModeSelector';

export interface PortfolioSettings {
  layout: LayoutType;
  paginationMode: PaginationMode;
  itemsPerPage: number;
  showAnimations: boolean;
  easterEggsEnabled: boolean;
}

const DEFAULT_SETTINGS: PortfolioSettings = {
  layout: 'grid',
  paginationMode: 'paged',
  itemsPerPage: 9,
  showAnimations: true,
  easterEggsEnabled: true,
};

const STORAGE_KEY = 'portfolio-settings';

export function usePortfolioSettings() {
  const [settings, setSettings] = useState<PortfolioSettings>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
      }
    } catch (error) {
      console.error('Error loading portfolio settings:', error);
    }
    return DEFAULT_SETTINGS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving portfolio settings:', error);
    }
  }, [settings]);

  const updateSetting = <K extends keyof PortfolioSettings>(
    key: K,
    value: PortfolioSettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    settings,
    updateSetting,
    resetSettings,
  };
}
