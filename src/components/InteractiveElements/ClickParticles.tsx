import { useEffect, useState, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
}

export const ClickParticles = memo(() => {
  const [particles, setParticles] = useState<Particle[]>([]);

  const handleClick = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button, a, [role="button"]')) {
      const newParticle: Particle = {
        id: Date.now() + Math.random(), // Garantir ID único
        x: e.clientX,
        y: e.clientY,
      };
      setParticles(prev => {
        const updated = [...prev, newParticle].slice(-10);
        return updated;
      });
      setTimeout(() => {
        setParticles(prev => prev.filter(p => p.id !== newParticle.id));
      }, 1000);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('click', handleClick, { passive: true });
    return () => window.removeEventListener('click', handleClick);
  }, [handleClick]);

  return (
    <AnimatePresence>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ 
            opacity: 1, 
            scale: 0,
            x: particle.x,
            y: particle.y,
          }}
          animate={{ 
            opacity: 0,
            scale: 2,
            x: particle.x + (Math.random() - 0.5) * 100,
            y: particle.y + (Math.random() - 0.5) * 100,
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          style={{
            position: 'fixed',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,215,0,0.8) 0%, rgba(255,140,0,0.4) 100%)',
            boxShadow: '0 0 10px rgba(255,215,0,0.6)',
            pointerEvents: 'none',
            zIndex: 9999,
          }}
        />
      ))}
    </AnimatePresence>
  );
});

ClickParticles.displayName = 'ClickParticles';
