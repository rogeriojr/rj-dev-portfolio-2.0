import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useGamification } from './useGamification';

export function useGamificationTracking() {
  const location = useLocation();
  const { unlockAchievement, updateAchievementProgress, incrementStat } = useGamification();

  useEffect(() => {
    if (location.pathname === '/cosmic-lab' || location.pathname.includes('/cosmic-lab')) {
      unlockAchievement('cosmic-lab-visitor', false);
    }
  }, [location.pathname, unlockAchievement]);

  const trackThemeSwitch = useCallback(() => {
    const current = localStorage.getItem('chakra-ui-color-mode-switches') || '0';
    const newCount = parseInt(current) + 1;
    localStorage.setItem('chakra-ui-color-mode-switches', newCount.toString());
    updateAchievementProgress('theme-switcher', newCount);
  }, [updateAchievementProgress]);

  const trackLanguageSwitch = useCallback(() => {
    const current = localStorage.getItem('portfolio-language-switches') || '0';
    const newCount = parseInt(current) + 1;
    localStorage.setItem('portfolio-language-switches', newCount.toString());
    updateAchievementProgress('language-explorer', newCount);
  }, [updateAchievementProgress]);

  const trackProjectView = useCallback((projectId: string) => {
    incrementStat('projectsViewed', 1);
    const viewedProjects = JSON.parse(localStorage.getItem('portfolio-viewed-projects') || '[]');
    if (!viewedProjects.includes(projectId)) {
      viewedProjects.push(projectId);
      localStorage.setItem('portfolio-viewed-projects', JSON.stringify(viewedProjects));
      
      const count = viewedProjects.length;
      if (count >= 5) {
        unlockAchievement('portfolio-explorer', false);
      }
      if (count >= 15) {
        unlockAchievement('project-master', false);
      }
      updateAchievementProgress('portfolio-explorer', count);
      updateAchievementProgress('project-master', count);
    }
  }, [incrementStat, unlockAchievement, updateAchievementProgress]);

  const trackFilterUsage = useCallback(() => {
    const current = localStorage.getItem('portfolio-filter-uses') || '0';
    const newCount = parseInt(current) + 1;
    localStorage.setItem('portfolio-filter-uses', newCount.toString());
    updateAchievementProgress('filter-master', newCount);
  }, [updateAchievementProgress]);

  useEffect(() => {
    let maxScroll = 0;
    const handleScroll = () => {
      const scrollDepth = window.scrollY + window.innerHeight;
      maxScroll = Math.max(maxScroll, scrollDepth);
      
      if (maxScroll > 1000) {
        unlockAchievement('scroll-master', false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [unlockAchievement]);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 6) {
      unlockAchievement('night-owl', false);
    }
  }, [unlockAchievement]);

  const trackSocialClick = useCallback((platform: string) => {
    const clicked = JSON.parse(localStorage.getItem('portfolio-social-clicks') || '[]');
    if (!clicked.includes(platform)) {
      clicked.push(platform);
      localStorage.setItem('portfolio-social-clicks', JSON.stringify(clicked));
      
      if (clicked.length >= 3) {
        unlockAchievement('social-butterfly', false);
      }
    }
  }, [unlockAchievement]);

  const trackCVDownload = useCallback(() => {
    unlockAchievement('cv-downloader', false);
  }, [unlockAchievement]);

  return {
    trackThemeSwitch,
    trackLanguageSwitch,
    trackProjectView,
    trackFilterUsage,
    trackSocialClick,
    trackCVDownload,
  };
}
