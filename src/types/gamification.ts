export interface Achievement {
  id: string;
  name: {
    pt: string;
    en: string;
  };
  description: {
    pt: string;
    en: string;
  };
  icon: string;
  points: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  category: 'easter-egg' | 'interaction' | 'exploration' | 'mastery' | 'social';
  unlockedAt?: Date;
  progress?: number;
  maxProgress?: number;
}

export interface UserStats {
  totalXP: number;
  level: number;
  achievementsUnlocked: number;
  totalAchievements: number;
  easterEggsFound: number;
  projectsViewed: number;
  timeSpent: number; // em minutos
  lastActivity?: Date;
}

export interface GameificationState {
  stats: UserStats;
  achievements: Achievement[];
  unlockedAchievementIds: Set<string>;
  xpHistory: Array<{ date: Date; xp: number; reason: string }>;
}
