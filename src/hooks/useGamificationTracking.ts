import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useGamification } from './useGamification';

export function useGamificationTracking() {
  const location = useLocation();
  const { unlockAchievement, updateAchievementProgress, incrementStat } = useGamification();

  useEffect(() => {
    if (location.pathname === '/lab' || location.pathname.includes('/lab')) {
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
    let scrollChecked = false;
    const handleScroll = () => {
      const scrollDepth = window.scrollY + window.innerHeight;
      maxScroll = Math.max(maxScroll, scrollDepth);
      
      if (maxScroll > 1000 && !scrollChecked) {
        scrollChecked = true;
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

  useEffect(() => {
    const sessionKey = 'portfolio-session-start';
    const visitedKey = 'portfolio-visited-pages';
    
    if (!localStorage.getItem(sessionKey)) {
      localStorage.setItem(sessionKey, Date.now().toString());
      localStorage.setItem(visitedKey, JSON.stringify([]));
    }

    const startTime = parseInt(localStorage.getItem(sessionKey) || Date.now().toString());
    const visitedPages = new Set<string>(JSON.parse(localStorage.getItem(visitedKey) || '[]'));

    const checkSpeedDemon = () => {
      const timeSpent = (Date.now() - startTime) / 1000 / 60;
      const requiredPages = ['/', '/about', '/contact', '/portfolio/development', '/lab'];
      const allVisited = requiredPages.every(page => visitedPages.has(page));
      
      if (allVisited && timeSpent < 2 && !localStorage.getItem('speed-demon-unlocked')) {
        unlockAchievement('speed-demon', false);
        localStorage.setItem('speed-demon-unlocked', 'true');
      }
    };

    const currentPath = location.pathname;
    if (!visitedPages.has(currentPath)) {
      visitedPages.add(currentPath);
      localStorage.setItem(visitedKey, JSON.stringify(Array.from(visitedPages)));
      checkSpeedDemon();
    }

    const interval = setInterval(checkSpeedDemon, 5000);
    return () => clearInterval(interval);
  }, [location.pathname, unlockAchievement]);

  useEffect(() => {
    const timeKey = 'portfolio-time-spent-start';
    const lastCheckKey = 'portfolio-time-traveler-last-check';
    
    if (!localStorage.getItem(timeKey)) {
      localStorage.setItem(timeKey, Date.now().toString());
    }

    const startTime = parseInt(localStorage.getItem(timeKey) || Date.now().toString());
    const lastCheck = parseInt(localStorage.getItem(lastCheckKey) || '0');
    const now = Date.now();

    const checkTimeTraveler = () => {
      const timeSpent = Math.floor((Date.now() - startTime) / 60000);
      if (timeSpent >= 30 && timeSpent !== lastCheck) {
        localStorage.setItem(lastCheckKey, timeSpent.toString());
        updateAchievementProgress('time-traveler', timeSpent);
      }
    };

    if (now - startTime >= 1800000) {
      checkTimeTraveler();
    }

    const interval = setInterval(checkTimeTraveler, 60000);
    return () => clearInterval(interval);
  }, [updateAchievementProgress]);

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

  const trackLabExperiment = useCallback((experimentId: string) => {
    const tested = JSON.parse(localStorage.getItem('portfolio-lab-experiments') || '[]');
    if (!tested.includes(experimentId)) {
      tested.push(experimentId);
      localStorage.setItem('portfolio-lab-experiments', JSON.stringify(tested));
      
      const count = tested.length;
      updateAchievementProgress('lab-explorer', count);
    }
  }, [updateAchievementProgress]);

  return {
    trackThemeSwitch,
    trackLanguageSwitch,
    trackProjectView,
    trackFilterUsage,
    trackSocialClick,
    trackCVDownload,
    trackLabExperiment,
  };
}
