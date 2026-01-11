import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useGamification } from './useGamification';

export function useGamificationTracking() {
  const location = useLocation();
  const { unlockAchievement, updateAchievementProgress, incrementStat } = useGamification();

  useEffect(() => {
    const labVisitorKey = 'cosmic-lab-visitor-unlocked';
    if ((location.pathname === '/lab' || location.pathname.includes('/lab')) && !localStorage.getItem(labVisitorKey)) {
      unlockAchievement('cosmic-lab-visitor', true);
      localStorage.setItem(labVisitorKey, 'true');
    }
  }, [location.pathname, unlockAchievement]);

  const trackThemeSwitch = useCallback(() => {
    const switchKey = 'portfolio-theme-switches';
    const currentCount = parseInt(localStorage.getItem(switchKey) || '0');
    const newCount = currentCount + 1;
    localStorage.setItem(switchKey, newCount.toString());
    updateAchievementProgress('theme-switcher', newCount);
  }, [updateAchievementProgress]);

  const trackLanguageSwitch = useCallback(() => {
    const switchKey = 'portfolio-language-switches';
    const currentCount = parseInt(localStorage.getItem(switchKey) || '0');
    const newCount = currentCount + 1;
    localStorage.setItem(switchKey, newCount.toString());
    updateAchievementProgress('language-explorer', newCount);
  }, [updateAchievementProgress]);

  const trackProjectView = useCallback((projectId: string) => {
    incrementStat('projectsViewed', 1);
    const viewedProjects = JSON.parse(localStorage.getItem('portfolio-viewed-projects') || '[]');
    if (!viewedProjects.includes(projectId)) {
      viewedProjects.push(projectId);
      localStorage.setItem('portfolio-viewed-projects', JSON.stringify(viewedProjects));
      
      const count = viewedProjects.length;
      if (count === 5) {
        unlockAchievement('portfolio-explorer', true);
      }
      if (count === 15) {
        unlockAchievement('project-master', true);
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
    const scrollKey = 'scroll-master-unlocked';
    if (localStorage.getItem(scrollKey)) {
      return;
    }

    let maxScroll = 0;
    let scrollChecked = false;
    const handleScroll = () => {
      const scrollDepth = window.scrollY + window.innerHeight;
      maxScroll = Math.max(maxScroll, scrollDepth);
      
      if ((maxScroll > 1000 || window.scrollY > 1000) && !scrollChecked) {
        scrollChecked = true;
        localStorage.setItem(scrollKey, 'true');
        unlockAchievement('scroll-master', true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleScroll, { passive: true });
    
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleScroll);
    };
  }, [unlockAchievement, location.pathname]);

  useEffect(() => {
    const hour = new Date().getHours();
    const nightOwlKey = 'night-owl-unlocked';
    if (hour >= 0 && hour < 6 && !localStorage.getItem(nightOwlKey)) {
      unlockAchievement('night-owl', true);
      localStorage.setItem(nightOwlKey, 'true');
    }
  }, [unlockAchievement]);

  useEffect(() => {
    const sessionKey = 'portfolio-session-start';
    const visitedKey = 'portfolio-visited-pages';
    const speedDemonKey = 'speed-demon-unlocked';
    
    if (localStorage.getItem(speedDemonKey)) {
      return;
    }

    const lastSession = localStorage.getItem(sessionKey);
    const now = Date.now();
    const sessionTimeout = 5 * 60 * 1000;

    if (!lastSession || (now - parseInt(lastSession)) > sessionTimeout) {
      localStorage.setItem(sessionKey, now.toString());
      localStorage.setItem(visitedKey, JSON.stringify([]));
    }

    const startTime = parseInt(localStorage.getItem(sessionKey) || now.toString());
    const visitedPages = new Set<string>(JSON.parse(localStorage.getItem(visitedKey) || '[]'));

    const checkSpeedDemon = () => {
      const timeSpent = (Date.now() - startTime) / 1000 / 60;
      const requiredPages = ['/', '/about', '/contact', '/portfolio/development', '/lab'];
      const allVisited = requiredPages.every(page => visitedPages.has(page));
      
      if (allVisited && timeSpent < 2) {
        unlockAchievement('speed-demon', true);
        localStorage.setItem(speedDemonKey, 'true');
      }
    };

    const currentPath = location.pathname;
    const normalizedPath = currentPath.endsWith('/') && currentPath.length > 1 
      ? currentPath.slice(0, -1) 
      : currentPath;
    
    if (!visitedPages.has(normalizedPath)) {
      visitedPages.add(normalizedPath);
      localStorage.setItem(visitedKey, JSON.stringify(Array.from(visitedPages)));
      checkSpeedDemon();
    } else {
      checkSpeedDemon();
    }

    const interval = setInterval(checkSpeedDemon, 2000);
    return () => clearInterval(interval);
  }, [location.pathname, unlockAchievement]);

  useEffect(() => {
    const timeKey = 'portfolio-time-spent-start';
    const lastCheckKey = 'portfolio-time-traveler-last-check';
    const sessionStartKey = 'portfolio-current-session-start';
    
    const now = Date.now();
    let startTime = parseInt(localStorage.getItem(timeKey) || '0');
    const sessionStart = parseInt(localStorage.getItem(sessionStartKey) || '0');
    
    if (!startTime || now - startTime > 86400000) {
      startTime = now;
      localStorage.setItem(timeKey, startTime.toString());
      localStorage.setItem(sessionStartKey, now.toString());
      localStorage.setItem(lastCheckKey, '0');
    } else if (!sessionStart) {
      localStorage.setItem(sessionStartKey, now.toString());
    }

    const lastCheck = parseInt(localStorage.getItem(lastCheckKey) || '0');

    const checkTimeTraveler = () => {
      const timeSpent = Math.floor((Date.now() - startTime) / 60000);
      if (timeSpent > lastCheck && timeSpent > 0) {
        localStorage.setItem(lastCheckKey, timeSpent.toString());
        updateAchievementProgress('time-traveler', timeSpent);
      }
    };

    checkTimeTraveler();
    const interval = setInterval(checkTimeTraveler, 60000);
    return () => clearInterval(interval);
  }, [updateAchievementProgress]);

  const trackSocialClick = useCallback((platform: string) => {
    const clicked = JSON.parse(localStorage.getItem('portfolio-social-clicks') || '[]');
    if (!clicked.includes(platform)) {
      clicked.push(platform);
      localStorage.setItem('portfolio-social-clicks', JSON.stringify(clicked));
      
      if (clicked.length === 3) {
        unlockAchievement('social-butterfly', true);
      }
    }
  }, [unlockAchievement]);

  const trackCVDownload = useCallback(() => {
    unlockAchievement('cv-downloader', true);
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
