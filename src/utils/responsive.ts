import { useBreakpointValue } from '@chakra-ui/react';

export const breakpoints = {
  sm: '30em',     // 480px
  md: '48em',     // 768px
  lg: '62em',     // 992px
  xl: '80em',     // 1280px
  '2xl': '96em',  // 1536px
};

export const containerMaxWidths = {
  sm: '100%',
  md: '720px',
  lg: '960px',
  xl: '1140px',
  '2xl': '1320px',
};

export const spacing = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',   // 48px
};

export const useResponsiveValue = (values: { [key: string]: any }) => {
  return useBreakpointValue(values);
};

export const mobileBreakpoint = '48em';

export const isDesktop = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= parseInt(mobileBreakpoint);
};

export const isMobile = () => {
  if (typeof window === 'undefined') return true;
  return window.innerWidth < parseInt(mobileBreakpoint);
};

export const getResponsiveValue = (mobileValue: any, desktopValue: any) => {
  return {
    base: mobileValue,
    md: desktopValue,
  };
};