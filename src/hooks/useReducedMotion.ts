import { useState, useEffect } from 'react';
import { useAccessibility } from '../contexts/AccessibilityContext';

export function useReducedMotion() {
  const { state } = useAccessibility();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches || state.reducedMotion);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches || state.reducedMotion);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [state.reducedMotion]);

  useEffect(() => {
    const root = document.documentElement;
    if (root.classList.contains('reduced-motion')) {
      setPrefersReducedMotion(true);
    }
  }, []);

  return prefersReducedMotion || state.reducedMotion;
}
