import { useEffect, useState, useCallback } from 'react';

export interface EasterEgg {
  id: string;
  name: string;
  trigger: string | ((e: MouseEvent | KeyboardEvent) => boolean);
  message: string;
  icon?: string;
  effect?: () => void;
  cooldown?: number;
}

export const GLOBAL_EASTER_EGGS: EasterEgg[] = [
  {
    id: 'konami',
    name: 'Código Konami',
    trigger: 'ArrowUp,ArrowUp,ArrowDown,ArrowDown,ArrowLeft,ArrowRight,ArrowLeft,ArrowRight,KeyB,KeyA',
    message: '🚀 Código Konami ativado! Sistema de propulsão máximo!',
    icon: '🚀',
    effect: () => {
      document.body.style.animation = 'rocketLaunch 2s ease-in-out';
      setTimeout(() => {
        document.body.style.animation = '';
      }, 2000);
    },
  },
  {
    id: 'space',
    name: 'Modo Espaço',
    trigger: 'KeyS,KeyP,KeyA,KeyC,KeyE',
    message: '🌌 Modo exploração espacial ativado!',
    icon: '🌌',
  },
  {
    id: 'rocket',
    name: 'Foguete',
    trigger: 'KeyR,KeyO,KeyC,KeyK,KeyE,KeyT',
    message: '🚀 Foguete lançado! Preparando para decolagem!',
    icon: '🚀',
  },
  {
    id: 'star',
    name: 'Estrela',
    trigger: 'KeyS,KeyT,KeyA,KeyR',
    message: '⭐ Estrela descoberta! Nova constelação encontrada!',
    icon: '⭐',
  },
  {
    id: 'planet',
    name: 'Planeta',
    trigger: 'KeyP,KeyL,KeyA,KeyN,KeyE,KeyT',
    message: '🪐 Planeta descoberto! Missão de exploração iniciada!',
    icon: '🪐',
  },
  {
    id: 'dev',
    name: 'Modo Dev',
    trigger: (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent) {
        return e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I');
      }
      return false;
    },
    message: '🔧 Modo desenvolvedor ativado! Explorando o código-fonte...',
    icon: '🔧',
  },
  {
    id: 'triple-click',
    name: 'Três Cliques',
    trigger: (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof MouseEvent) {
        return (e as any).detail === 3;
      }
      return false;
    },
    message: '⭐ Três cliques! Você encontrou uma estrela rara!',
    icon: '⭐',
  },
  {
    id: 'secret-combo',
    name: 'Combo Secreto',
    trigger: 'KeyH,KeyE,KeyL,KeyL,KeyO,Space,KeyW,KeyO,KeyR,KeyL,KeyD',
    message: '👽 Mensagem recebida de outra galáxia! Olá, mundo!',
    icon: '👽',
  },
];

export function useGlobalEasterEggs(enabled: boolean = true) {
  const [activeEgg, setActiveEgg] = useState<EasterEgg | null>(null);
  const [, setKeySequence] = useState<string[]>([]);
  const [triggeredEggs, setTriggeredEggs] = useState<Set<string>>(new Set());

  const triggerEasterEgg = useCallback((egg: EasterEgg) => {
    if (triggeredEggs.has(egg.id)) return;

    setActiveEgg(egg);
    setTriggeredEggs(prev => new Set(prev).add(egg.id));

    if (egg.effect) {
      egg.effect();
    }

    setTimeout(() => {
      setActiveEgg(null);
    }, egg.cooldown || 3000);
  }, [triggeredEggs]);

  useEffect(() => {
    if (!enabled) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.code;
      setKeySequence(prev => {
        const newSequence = [...prev, key].slice(-30);

        // Verificar easter eggs com sequência de teclas
        GLOBAL_EASTER_EGGS.forEach(egg => {
          if (typeof egg.trigger === 'string') {
            const sequenceString = newSequence.join(',');

            if (sequenceString.includes(egg.trigger)) {
              triggerEasterEgg(egg);
              setKeySequence([]);
            }
          } else if (typeof egg.trigger === 'function') {
            if (egg.trigger(e)) {
              triggerEasterEgg(egg);
            }
          }
        });

        return newSequence;
      });
    };

    const handleClick = (e: MouseEvent) => {
      GLOBAL_EASTER_EGGS.forEach(egg => {
        if (typeof egg.trigger === 'function' && egg.trigger(e)) {
          triggerEasterEgg(egg);
        }
      });
    };

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('click', handleClick);
    };
  }, [enabled, triggerEasterEgg]);

  return { activeEgg, triggeredEggs };
}
