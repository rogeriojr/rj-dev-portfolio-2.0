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

  useEffect(() => {
    saveState(state);
  }, [state]);

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
    setState(prev => {
      if (prev.unlockedAchievementIds.has(achievementId)) {
        return prev;
      }

      const achievement = ALL_ACHIEVEMENTS.find(a => a.id === achievementId);
      if (!achievement) {
        return prev;
      }

      const newUnlocked = new Set(prev.unlockedAchievementIds);
      newUnlocked.add(achievementId);

      const updatedAchievements = prev.achievements.map(a =>
        a.id === achievementId ? { ...a, unlockedAt: new Date() } : a
      );

      const newXP = prev.stats.totalXP + achievement.points;
      const newLevel = calculateLevel(newXP);

      const newStats = {
        ...prev.stats,
        totalXP: newXP,
        level: newLevel,
        achievementsUnlocked: newUnlocked.size,
        easterEggsFound: achievement.category === 'easter-egg' 
          ? prev.stats.easterEggsFound + 1 
          : prev.stats.easterEggsFound,
      };

      const achievementsWithoutCompletionist = ALL_ACHIEVEMENTS.filter(a => a.id !== 'completionist');
      const unlockedWithoutCompletionist = achievementsWithoutCompletionist.filter(a => newUnlocked.has(a.id));
      
      if (unlockedWithoutCompletionist.length === achievementsWithoutCompletionist.length) {
        const completionist = ALL_ACHIEVEMENTS.find(a => a.id === 'completionist');
        if (completionist && !newUnlocked.has('completionist')) {
          newUnlocked.add('completionist');
          const finalXP = newXP + completionist.points;
          const finalLevel = calculateLevel(finalXP);
          newStats.totalXP = finalXP;
          newStats.level = finalLevel;
          newStats.achievementsUnlocked = newUnlocked.size;
          
          const finalAchievements = prev.achievements.map(a =>
            a.id === 'completionist' ? { ...a, unlockedAt: new Date() } : a
          );
          
          if (!prev.achievements.find(a => a.id === 'completionist')) {
            finalAchievements.push({
              ...completionist,
              unlockedAt: new Date(),
            });
          }

          setTimeout(() => {
            setNewAchievement(completionist);
            setTimeout(() => setNewAchievement(null), 5000);
          }, showNotification ? 6000 : 0);

          return {
            ...prev,
            unlockedAchievementIds: newUnlocked,
            achievements: finalAchievements,
            stats: newStats,
            xpHistory: [
              ...prev.xpHistory.slice(-49),
              { date: new Date(), xp: achievement.points, reason: `Conquista: ${achievement.name.pt}` },
              { date: new Date(), xp: completionist.points, reason: `Conquista: ${completionist.name.pt}` },
            ],
          };
        }
      }

      if (showNotification) {
        setTimeout(() => {
          setNewAchievement(achievement);
          setTimeout(() => setNewAchievement(null), 5000);
        }, 0);
      }

      return {
        ...prev,
        unlockedAchievementIds: newUnlocked,
        achievements: updatedAchievements,
        stats: newStats,
        xpHistory: [
          ...prev.xpHistory.slice(-49),
          { date: new Date(), xp: achievement.points, reason: `Conquista: ${achievement.name.pt}` },
        ],
      };
    });

    return true;
  }, []);

  const updateAchievementProgress = useCallback((achievementId: string, progress: number) => {
    setState(prev => {
      const wasUnlocked = prev.unlockedAchievementIds.has(achievementId);
      if (wasUnlocked) {
        return prev;
      }

      const achievement = ALL_ACHIEVEMENTS.find(a => a.id === achievementId);
      if (!achievement || !achievement.maxProgress) {
        return prev;
      }

      const newProgress = Math.min(progress, achievement.maxProgress);
      const shouldUnlock = newProgress >= achievement.maxProgress;

      if (shouldUnlock) {
        const newUnlocked = new Set(prev.unlockedAchievementIds);
        newUnlocked.add(achievementId);

        const updatedAchievements = prev.achievements.map(a =>
          a.id === achievementId ? { ...a, progress: newProgress, unlockedAt: new Date() } : a
        );

        const newStats = {
          ...prev.stats,
          achievementsUnlocked: newUnlocked.size,
          easterEggsFound: achievement.category === 'easter-egg' 
            ? prev.stats.easterEggsFound + 1 
            : prev.stats.easterEggsFound,
        };

        const newXP = prev.stats.totalXP + achievement.points;
        const newLevel = calculateLevel(newXP);

        setTimeout(() => {
          setNewAchievement(achievement);
          setTimeout(() => setNewAchievement(null), 5000);
        }, 0);

        const achievementsWithoutCompletionist = ALL_ACHIEVEMENTS.filter(a => a.id !== 'completionist');
        const unlockedWithoutCompletionist = achievementsWithoutCompletionist.filter(a => newUnlocked.has(a.id));
        
        let finalAchievements = updatedAchievements;
        let finalStats = {
          ...newStats,
          totalXP: newXP,
          level: newLevel,
        };
        let finalUnlocked = newUnlocked;
        let finalXPHistory = [
          ...prev.xpHistory.slice(-49),
          { date: new Date(), xp: achievement.points, reason: `Conquista: ${achievement.name.pt}` },
        ];

        if (unlockedWithoutCompletionist.length === achievementsWithoutCompletionist.length) {
          const completionist = ALL_ACHIEVEMENTS.find(a => a.id === 'completionist');
          if (completionist && !finalUnlocked.has('completionist')) {
            finalUnlocked.add('completionist');
            const completionistXP = newXP + completionist.points;
            const completionistLevel = calculateLevel(completionistXP);
            finalStats.totalXP = completionistXP;
            finalStats.level = completionistLevel;
            finalStats.achievementsUnlocked = finalUnlocked.size;
            
            finalAchievements = finalAchievements.map(a =>
              a.id === 'completionist' ? { ...a, unlockedAt: new Date() } : a
            );
            
            if (!finalAchievements.find(a => a.id === 'completionist')) {
              finalAchievements.push({
                ...completionist,
                unlockedAt: new Date(),
              });
            }

            finalXPHistory.push({
              date: new Date(),
              xp: completionist.points,
              reason: `Conquista: ${completionist.name.pt}`,
            });

            setTimeout(() => {
              setNewAchievement(completionist);
              setTimeout(() => setNewAchievement(null), 5000);
            }, 6000);
          }
        }

        return {
          ...prev,
          unlockedAchievementIds: finalUnlocked,
          achievements: finalAchievements,
          stats: finalStats,
          xpHistory: finalXPHistory,
        };
      }

      const updatedAchievements = prev.achievements.map(a =>
        a.id === achievementId ? { ...a, progress: newProgress } : a
      );

      return {
        ...prev,
        achievements: updatedAchievements,
      };
    });
  }, []);

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
