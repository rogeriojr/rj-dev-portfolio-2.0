import { useState, useEffect, useCallback } from 'react';
import { Achievement, UserStats, GameificationState } from '../types/gamification';
import { ALL_ACHIEVEMENTS, calculateLevel, getXPProgress } from '../data/achievements';

const STORAGE_KEY = 'portfolio-gamification';

const getInitialState = (): GameificationState => {
  if (typeof window === 'undefined') {
    return {
      stats: {
        totalXP: 0,
        level: 1,
        achievementsUnlocked: 0,
        totalAchievements: ALL_ACHIEVEMENTS.length,
        easterEggsFound: 0,
        projectsViewed: 0,
        timeSpent: 0,
      },
      achievements: ALL_ACHIEVEMENTS.map(a => ({ ...a })),
      unlockedAchievementIds: new Set<string>(),
      xpHistory: [],
    };
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        ...parsed,
        unlockedAchievementIds: new Set(parsed.unlockedAchievementIds || []),
        achievements: ALL_ACHIEVEMENTS.map(a => {
          const storedAch = parsed.achievements?.find((sa: Achievement) => sa.id === a.id);
          return storedAch ? { ...a, ...storedAch } : { ...a };
        }),
        xpHistory: (parsed.xpHistory || []).map((h: { date: string; xp: number; reason?: string }) => ({
          date: new Date(h.date),
          xp: h.xp,
          reason: h.reason || '',
        })),
      };
    }
  } catch (error) {
    console.error('Error loading gamification state:', error);
  }

  return {
    stats: {
      totalXP: 0,
      level: 1,
      achievementsUnlocked: 0,
      totalAchievements: ALL_ACHIEVEMENTS.length,
      easterEggsFound: 0,
      projectsViewed: 0,
      timeSpent: 0,
    },
    achievements: ALL_ACHIEVEMENTS.map(a => ({ ...a })),
    unlockedAchievementIds: new Set<string>(),
    xpHistory: [],
  };
};

const saveState = (state: GameificationState) => {
  if (typeof window === 'undefined') return;
  
  try {
    const toSave = {
      ...state,
      unlockedAchievementIds: Array.from(state.unlockedAchievementIds),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch (error) {
    console.error('Error saving gamification state:', error);
  }
};

export function useGamification() {
  const [state, setState] = useState<GameificationState>(getInitialState);
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);

  // Salvar estado quando mudar
  useEffect(() => {
    saveState(state);
  }, [state]);

  // Atualizar nível baseado em XP
  useEffect(() => {
    const newLevel = calculateLevel(state.stats.totalXP);
    if (newLevel !== state.stats.level) {
      setState(prev => ({
        ...prev,
        stats: { ...prev.stats, level: newLevel },
      }));
    }
  }, [state.stats.totalXP, state.stats.level]);

  const addXP = useCallback((amount: number, reason: string) => {
    setState(prev => {
      const newXP = prev.stats.totalXP + amount;
      const newLevel = calculateLevel(newXP);
      
      return {
        ...prev,
        stats: {
          ...prev.stats,
          totalXP: newXP,
          level: newLevel,
        },
        xpHistory: [
          ...prev.xpHistory.slice(-49), // Manter últimas 50 entradas
          { date: new Date(), xp: amount, reason },
        ],
      };
    });
  }, []);

  const unlockAchievement = useCallback((achievementId: string, showNotification: boolean = true) => {
    if (state.unlockedAchievementIds.has(achievementId)) {
      return false; // Já desbloqueado
    }

    const achievement = ALL_ACHIEVEMENTS.find(a => a.id === achievementId);
    if (!achievement) {
      return false;
    }

    setState(prev => {
      const newUnlocked = new Set(prev.unlockedAchievementIds);
      newUnlocked.add(achievementId);

      const updatedAchievements = prev.achievements.map(a =>
        a.id === achievementId ? { ...a, unlockedAt: new Date() } : a
      );

      const newStats = {
        ...prev.stats,
        achievementsUnlocked: newUnlocked.size,
        easterEggsFound: achievement.category === 'easter-egg' 
          ? prev.stats.easterEggsFound + 1 
          : prev.stats.easterEggsFound,
      };

      return {
        ...prev,
        unlockedAchievementIds: newUnlocked,
        achievements: updatedAchievements,
        stats: newStats,
      };
    });

    // Adicionar XP
    addXP(achievement.points, `Conquista: ${achievement.name.pt}`);

    if (showNotification) {
      setNewAchievement(achievement);
      setTimeout(() => setNewAchievement(null), 5000);
    }

    return true;
  }, [state.unlockedAchievementIds, addXP]);

  const updateAchievementProgress = useCallback((achievementId: string, progress: number) => {
    setState(prev => {
      const updatedAchievements = prev.achievements.map(a => {
        if (a.id === achievementId && a.maxProgress) {
          const newProgress = Math.min(progress, a.maxProgress);
          const wasUnlocked = prev.unlockedAchievementIds.has(achievementId);
          
          // Se completou e ainda não estava desbloqueado
          if (newProgress >= a.maxProgress && !wasUnlocked) {
            setTimeout(() => unlockAchievement(achievementId), 100);
          }
          
          return { ...a, progress: newProgress };
        }
        return a;
      });

      return {
        ...prev,
        achievements: updatedAchievements,
      };
    });
  }, [unlockAchievement]);

  const incrementStat = useCallback((stat: keyof UserStats, amount: number = 1) => {
    setState(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        [stat]: (prev.stats[stat] as number) + amount,
      },
    }));
  }, []);

  const getUnlockedAchievements = useCallback(() => {
    return state.achievements.filter(a => state.unlockedAchievementIds.has(a.id));
  }, [state.achievements, state.unlockedAchievementIds]);

  const getLockedAchievements = useCallback(() => {
    return state.achievements.filter(a => !state.unlockedAchievementIds.has(a.id));
  }, [state.achievements, state.unlockedAchievementIds]);

  const getXPProgressData = useCallback(() => {
    return getXPProgress(state.stats.totalXP, state.stats.level);
  }, [state.stats.totalXP, state.stats.level]);

  const resetProgress = useCallback(() => {
    if (confirm('Tem certeza que deseja resetar todo o progresso? Esta ação não pode ser desfeita.')) {
      localStorage.removeItem(STORAGE_KEY);
      setState(getInitialState());
    }
  }, []);

  return {
    stats: state.stats,
    achievements: state.achievements,
    unlockedAchievementIds: state.unlockedAchievementIds,
    newAchievement,
    addXP,
    unlockAchievement,
    updateAchievementProgress,
    incrementStat,
    getUnlockedAchievements,
    getLockedAchievements,
    getXPProgressData,
    resetProgress,
  };
}
