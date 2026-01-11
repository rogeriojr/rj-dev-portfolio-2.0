import { Achievement } from '../types/gamification';

export const ALL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'konami-code',
    name: { pt: 'Código Konami', en: 'Konami Code' },
    description: { pt: 'Ativou o código Konami clássico', en: 'Activated the classic Konami code' },
    icon: '🎮',
    points: 100,
    rarity: 'epic',
    category: 'easter-egg',
  },
  {
    id: 'space-mode',
    name: { pt: 'Explorador Espacial', en: 'Space Explorer' },
    description: { pt: 'Ativou o modo exploração espacial', en: 'Activated space exploration mode' },
    icon: '🌌',
    points: 75,
    rarity: 'rare',
    category: 'easter-egg',
  },
  {
    id: 'rocket-launch',
    name: { pt: 'Piloto de Foguete', en: 'Rocket Pilot' },
    description: { pt: 'Lançou um foguete no portfólio', en: 'Launched a rocket in the portfolio' },
    icon: '🚀',
    points: 75,
    rarity: 'rare',
    category: 'easter-egg',
  },
  {
    id: 'star-discoverer',
    name: { pt: 'Descobridor de Estrelas', en: 'Star Discoverer' },
    description: { pt: 'Descobriu uma estrela rara', en: 'Discovered a rare star' },
    icon: '⭐',
    points: 50,
    rarity: 'common',
    category: 'easter-egg',
  },
  {
    id: 'planet-explorer',
    name: { pt: 'Explorador de Planetas', en: 'Planet Explorer' },
    description: { pt: 'Descobriu um novo planeta', en: 'Discovered a new planet' },
    icon: '🪐',
    points: 50,
    rarity: 'common',
    category: 'easter-egg',
  },
  {
    id: 'dev-mode',
    name: { pt: 'Desenvolvedor Curioso', en: 'Curious Developer' },
    description: { pt: 'Abriu as ferramentas de desenvolvedor', en: 'Opened developer tools' },
    icon: '🔧',
    points: 25,
    rarity: 'common',
    category: 'easter-egg',
  },
  {
    id: 'triple-click',
    name: { pt: 'Clique Triplo', en: 'Triple Click' },
    description: { pt: 'Descobriu o easter egg do perfil', en: 'Discovered the profile easter egg' },
    icon: '👆',
    points: 50,
    rarity: 'common',
    category: 'easter-egg',
  },
  {
    id: 'hello-world',
    name: { pt: 'Olá, Mundo!', en: 'Hello, World!' },
    description: { pt: 'Enviou mensagem para outra galáxia', en: 'Sent message to another galaxy' },
    icon: '👽',
    points: 100,
    rarity: 'epic',
    category: 'easter-egg',
  },
  
  {
    id: 'first-visit',
    name: { pt: 'Primeira Visita', en: 'First Visit' },
    description: { pt: 'Visitou o portfólio pela primeira vez', en: 'Visited the portfolio for the first time' },
    icon: '👋',
    points: 10,
    rarity: 'common',
    category: 'interaction',
  },
  {
    id: 'portfolio-explorer',
    name: { pt: 'Explorador de Portfólio', en: 'Portfolio Explorer' },
    description: { pt: 'Visualizou 5 projetos', en: 'Viewed 5 projects' },
    icon: '📂',
    points: 50,
    rarity: 'common',
    category: 'interaction',
    progress: 0,
    maxProgress: 5,
  },
  {
    id: 'project-master',
    name: { pt: 'Mestre de Projetos', en: 'Project Master' },
    description: { pt: 'Visualizou 15 projetos', en: 'Viewed 15 projects' },
    icon: '🏆',
    points: 150,
    rarity: 'rare',
    category: 'interaction',
    progress: 0,
    maxProgress: 15,
  },
  {
    id: 'cosmic-lab-visitor',
    name: { pt: 'Visitante do Lab Cósmico', en: 'Cosmic Lab Visitor' },
    description: { pt: 'Visitou o Laboratório Cósmico', en: 'Visited the Cosmic Lab' },
    icon: '🔬',
    points: 30,
    rarity: 'common',
    category: 'exploration',
  },
  {
    id: 'lab-explorer',
    name: { pt: 'Explorador do Lab', en: 'Lab Explorer' },
    description: { pt: 'Testou 3 experimentos no Lab', en: 'Tested 3 experiments in the Lab' },
    icon: '🧪',
    points: 75,
    rarity: 'rare',
    category: 'exploration',
    progress: 0,
    maxProgress: 3,
  },
  {
    id: 'filter-master',
    name: { pt: 'Mestre de Filtros', en: 'Filter Master' },
    description: { pt: 'Usou filtros avançados 10 vezes', en: 'Used advanced filters 10 times' },
    icon: '🔍',
    points: 50,
    rarity: 'common',
    category: 'interaction',
    progress: 0,
    maxProgress: 10,
  },
  {
    id: 'night-owl',
    name: { pt: 'Coruja Noturna', en: 'Night Owl' },
    description: { pt: 'Visitou o portfólio após meia-noite', en: 'Visited portfolio after midnight' },
    icon: '🦉',
    points: 25,
    rarity: 'common',
    category: 'interaction',
  },
  {
    id: 'speed-demon',
    name: { pt: 'Demônio da Velocidade', en: 'Speed Demon' },
    description: { pt: 'Navegou por todas as páginas em menos de 2 minutos', en: 'Navigated all pages in less than 2 minutes' },
    icon: '⚡',
    points: 100,
    rarity: 'epic',
    category: 'mastery',
  },
  {
    id: 'completionist',
    name: { pt: 'Completista', en: 'Completionist' },
    description: { pt: 'Desbloqueou todas as conquistas', en: 'Unlocked all achievements' },
    icon: '💯',
    points: 500,
    rarity: 'legendary',
    category: 'mastery',
  },
  {
    id: 'social-butterfly',
    name: { pt: 'Borboleta Social', en: 'Social Butterfly' },
    description: { pt: 'Clicou em todos os links sociais', en: 'Clicked all social links' },
    icon: '🦋',
    points: 50,
    rarity: 'common',
    category: 'social',
  },
  {
    id: 'cv-downloader',
    name: { pt: 'Baixador de CV', en: 'CV Downloader' },
    description: { pt: 'Baixou o currículo', en: 'Downloaded the resume' },
    icon: '📄',
    points: 75,
    rarity: 'rare',
    category: 'social',
  },
  {
    id: 'theme-switcher',
    name: { pt: 'Alternador de Tema', en: 'Theme Switcher' },
    description: { pt: 'Alternou entre temas 5 vezes', en: 'Switched themes 5 times' },
    icon: '🌓',
    points: 25,
    rarity: 'common',
    category: 'interaction',
    progress: 0,
    maxProgress: 5,
  },
  {
    id: 'language-explorer',
    name: { pt: 'Explorador de Idiomas', en: 'Language Explorer' },
    description: { pt: 'Alternou entre idiomas 3 vezes', en: 'Switched languages 3 times' },
    icon: '🌍',
    points: 30,
    rarity: 'common',
    category: 'interaction',
    progress: 0,
    maxProgress: 3,
  },
  {
    id: 'scroll-master',
    name: { pt: 'Mestre do Scroll', en: 'Scroll Master' },
    description: { pt: 'Rolou mais de 1000px em uma página', en: 'Scrolled more than 1000px on a page' },
    icon: '📜',
    points: 25,
    rarity: 'common',
    category: 'interaction',
  },
  {
    id: 'time-traveler',
    name: { pt: 'Viajante do Tempo', en: 'Time Traveler' },
    description: { pt: 'Passou mais de 30 minutos explorando', en: 'Spent more than 30 minutes exploring' },
    icon: '⏰',
    points: 100,
    rarity: 'epic',
    category: 'mastery',
    progress: 0,
    maxProgress: 30,
  },
];

export const getAchievementById = (id: string): Achievement | undefined => {
  return ALL_ACHIEVEMENTS.find(a => a.id === id);
};

export const getAchievementsByCategory = (category: Achievement['category']): Achievement[] => {
  return ALL_ACHIEVEMENTS.filter(a => a.category === category);
};

export const getRarityColor = (rarity: Achievement['rarity']): string => {
  const colors = {
    common: 'gray',
    rare: 'blue',
    epic: 'purple',
    legendary: 'yellow',
  };
  return colors[rarity];
};

export const calculateLevel = (totalXP: number): number => {
  return Math.floor(Math.sqrt(totalXP / 100)) + 1;
};

export const getXPForNextLevel = (currentLevel: number): number => {
  return Math.pow(currentLevel, 2) * 100;
};

export const getXPProgress = (totalXP: number, currentLevel: number): { current: number; next: number; percentage: number } => {
  const xpForCurrentLevel = currentLevel > 1 ? Math.pow(currentLevel - 1, 2) * 100 : 0;
  const xpForNextLevel = getXPForNextLevel(currentLevel);
  const currentXP = totalXP - xpForCurrentLevel;
  const neededXP = xpForNextLevel - xpForCurrentLevel;
  const percentage = (currentXP / neededXP) * 100;
  
  return {
    current: currentXP,
    next: neededXP,
    percentage: Math.min(100, Math.max(0, percentage)),
  };
};
