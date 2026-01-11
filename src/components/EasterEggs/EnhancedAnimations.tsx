import { memo, useMemo } from 'react';
import { Box, Icon } from '@chakra-ui/react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { FaRocket } from 'react-icons/fa';
import { IoPlanet } from 'react-icons/io5';

// Animação otimizada de partículas estelares
export const StarParticles = memo(() => {
  const stars = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2,
    }));
  }, []);

  return (
    <Box position="fixed" top={0} left={0} w="100%" h="100%" pointerEvents="none" zIndex={0}>
      {stars.map((star) => (
        <motion.div
          key={star.id}
          style={{
            position: 'absolute',
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.8)',
            boxShadow: '0 0 6px rgba(255, 255, 255, 0.8)',
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </Box>
  );
});

StarParticles.displayName = 'StarParticles';

// Animação otimizada de foguete
export const RocketAnimation = memo(({ active }: { active: boolean }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 100, damping: 30 });
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  if (!active) return null;

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: '50%',
        left: '-100px',
        zIndex: 10000,
        x: springX,
        y: springY,
      }}
      animate={{
        x: [0, window.innerWidth + 200],
        y: [0, -100, 0],
        rotate: [0, 15, 0],
      }}
      transition={{
        duration: 3,
        ease: 'easeInOut',
      }}
      onAnimationComplete={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <Icon as={FaRocket} w={12} h={12} color="orange.400" />
    </motion.div>
  );
});

RocketAnimation.displayName = 'RocketAnimation';

// Animação de planeta flutuante otimizada
export const FloatingPlanet = memo(({ delay = 0 }: { delay?: number }) => {
  const size = useMemo(() => 40 + Math.random() * 20, []);
  const startX = useMemo(() => Math.random() * 100, []);
  const startY = useMemo(() => Math.random() * 100, []);

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: `${startX}%`,
        top: `${startY}%`,
        width: `${size}px`,
        height: `${size}px`,
      }}
      animate={{
        y: [0, -20, 0],
        x: [0, 10, 0],
        rotate: [0, 360],
      }}
      transition={{
        duration: 4 + Math.random() * 2,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
    >
      <Icon as={IoPlanet} w="100%" h="100%" color="purple.400" opacity={0.3} />
    </motion.div>
  );
});

FloatingPlanet.displayName = 'FloatingPlanet';

// Sistema de partículas otimizado com requestAnimationFrame
export const OptimizedParticles = memo(({ count = 10 }: { count?: number }) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 3,
      duration: 2 + Math.random() * 3,
    }));
  }, [count]);

  return (
    <Box position="fixed" top={0} left={0} w="100%" h="100%" pointerEvents="none" zIndex={1}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          style={{
            position: 'absolute',
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)',
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </Box>
  );
});

OptimizedParticles.displayName = 'OptimizedParticles';
