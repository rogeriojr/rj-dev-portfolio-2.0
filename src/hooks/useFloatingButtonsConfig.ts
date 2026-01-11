import { useState, useEffect, useCallback } from 'react';

export type ButtonPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
export type ButtonSide = 'left' | 'right';

export interface FloatingButtonConfig {
  id: string;
  enabled: boolean;
  position: ButtonPosition;
  customX?: number;
  customY?: number;
  side: ButtonSide;
  zIndex: number;
}

export interface FloatingButtonsConfig {
  whatsapp: FloatingButtonConfig;
  gamification: FloatingButtonConfig;
  commandBar: FloatingButtonConfig;
}

const DEFAULT_CONFIG: FloatingButtonsConfig = {
  whatsapp: {
    id: 'whatsapp',
    enabled: true,
    position: 'bottom-right',
    side: 'right',
    zIndex: 10000,
  },
  gamification: {
    id: 'gamification',
    enabled: true,
    position: 'bottom-right',
    side: 'right',
    zIndex: 9999,
  },
  commandBar: {
    id: 'commandBar',
    enabled: true,
    position: 'bottom-left',
    side: 'left',
    zIndex: 9996,
  },
};

const STORAGE_KEY = 'floating-buttons-config';

export function useFloatingButtonsConfig() {
  const [config, setConfig] = useState<FloatingButtonsConfig>(() => {
    if (typeof window === 'undefined') return DEFAULT_CONFIG;
    
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_CONFIG, ...parsed };
      }
    } catch (error) {
      console.error('Error loading floating buttons config:', error);
    }
    
    return DEFAULT_CONFIG;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch (error) {
      console.error('Error saving floating buttons config:', error);
    }
  }, [config]);

  const updateButtonConfig = useCallback((
    buttonId: keyof FloatingButtonsConfig,
    updates: Partial<FloatingButtonConfig>
  ) => {
    setConfig(prev => ({
      ...prev,
      [buttonId]: {
        ...prev[buttonId],
        ...updates,
      },
    }));
  }, []);

  const toggleButton = useCallback((buttonId: keyof FloatingButtonsConfig) => {
    setConfig(prev => ({
      ...prev,
      [buttonId]: {
        ...prev[buttonId],
        enabled: !prev[buttonId].enabled,
      },
    }));
  }, []);

  const resetConfig = useCallback(() => {
    setConfig(DEFAULT_CONFIG);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const getButtonStyle = useCallback((buttonId: keyof FloatingButtonsConfig) => {
    const buttonConfig = config[buttonId];
    if (!buttonConfig.enabled) {
      return { display: 'none' };
    }

    const style: React.CSSProperties = {
      position: 'fixed',
      zIndex: buttonConfig.zIndex,
    };

    if (buttonConfig.customX !== undefined && buttonConfig.customY !== undefined) {
      style.left = `${buttonConfig.customX}px`;
      style.top = `${buttonConfig.customY}px`;
      style.right = 'auto';
      style.bottom = 'auto';
      return style;
    }

    switch (buttonConfig.position) {
      case 'top-left':
        style.top = '20px';
        style.left = '20px';
        style.right = 'auto';
        style.bottom = 'auto';
        break;
      case 'top-right':
        style.top = '20px';
        style.right = '20px';
        style.left = 'auto';
        style.bottom = 'auto';
        break;
      case 'bottom-left':
        style.bottom = '20px';
        style.left = '20px';
        style.right = 'auto';
        style.top = 'auto';
        break;
      case 'bottom-right':
        style.bottom = '20px';
        style.right = '20px';
        style.left = 'auto';
        style.top = 'auto';
        break;
    }

    return style;
  }, [config]);

  return {
    config,
    updateButtonConfig,
    toggleButton,
    resetConfig,
    getButtonStyle,
  };
}
