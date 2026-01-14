import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type ColorBlindnessType = 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia';
export type FontSize = 'normal' | 'large' | 'extra-large';

interface AccessibilityState {
  fontSize: FontSize;
  highContrast: boolean;
  colorBlindness: ColorBlindnessType;
  reducedMotion: boolean;
  showToolbar: boolean;
  vLibrasEnabled: boolean;
}

interface AccessibilityContextType {
  state: AccessibilityState;
  setFontSize: (size: FontSize) => void;
  setHighContrast: (enabled: boolean) => void;
  setColorBlindness: (type: ColorBlindnessType) => void;
  setReducedMotion: (enabled: boolean) => void;
  toggleToolbar: () => void;
  toggleVLibras: () => void;
  reset: () => void;
}

const defaultState: AccessibilityState = {
  fontSize: 'normal',
  highContrast: false,
  colorBlindness: 'none',
  reducedMotion: false,
  showToolbar: true,
  vLibrasEnabled: false,
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

const STORAGE_KEY = 'portfolio-accessibility-settings';

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AccessibilityState>(() => {
    if (typeof window === 'undefined') return defaultState;
    
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...defaultState, ...JSON.parse(saved) };
      }
    } catch (error) {
    }
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return { ...defaultState, reducedMotion: prefersReducedMotion };
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        fontSize: state.fontSize,
        highContrast: state.highContrast,
        colorBlindness: state.colorBlindness,
        reducedMotion: state.reducedMotion,
        vLibrasEnabled: state.vLibrasEnabled,
      }));
    } catch (error) {
    }
  }, [state]);

  useEffect(() => {
    const root = document.documentElement;
    
    root.style.setProperty('--font-size-multiplier', 
      state.fontSize === 'normal' ? '1' : 
      state.fontSize === 'large' ? '1.25' : '1.5'
    );
    
    root.classList.toggle('high-contrast', state.highContrast);
    root.classList.toggle('reduced-motion', state.reducedMotion);
    root.classList.remove('colorblind-protanopia', 'colorblind-deuteranopia', 'colorblind-tritanopia');
    
    if (state.colorBlindness !== 'none') {
      root.classList.add(`colorblind-${state.colorBlindness}`);
    }
  }, [state.fontSize, state.highContrast, state.colorBlindness, state.reducedMotion]);

  const setFontSize = useCallback((size: FontSize) => {
    setState(prev => ({ ...prev, fontSize: size }));
  }, []);

  const setHighContrast = useCallback((enabled: boolean) => {
    setState(prev => ({ ...prev, highContrast: enabled }));
  }, []);

  const setColorBlindness = useCallback((type: ColorBlindnessType) => {
    setState(prev => ({ ...prev, colorBlindness: type }));
  }, []);

  const setReducedMotion = useCallback((enabled: boolean) => {
    setState(prev => ({ ...prev, reducedMotion: enabled }));
  }, []);

  const toggleToolbar = useCallback(() => {
    setState(prev => ({ ...prev, showToolbar: !prev.showToolbar }));
  }, []);

  const toggleVLibras = useCallback(() => {
    setState(prev => ({ ...prev, vLibrasEnabled: !prev.vLibrasEnabled }));
  }, []);

  const reset = useCallback(() => {
    setState(defaultState);
  }, []);

  return (
    <AccessibilityContext.Provider
      value={{
        state,
        setFontSize,
        setHighContrast,
        setColorBlindness,
        setReducedMotion,
        toggleToolbar,
        toggleVLibras,
        reset,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}
