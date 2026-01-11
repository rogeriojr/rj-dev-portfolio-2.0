import { useEffect, useState } from 'react';
import { Box, Text, VStack, Icon, useColorModeValue } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRocket } from 'react-icons/fa';
import { IoPlanet, IoRocketSharp } from 'react-icons/io5';

interface EasterEgg {
  id: string;
  trigger: string;
  message: string;
  icon: any;
  color: string;
}

const EASTER_EGGS: EasterEgg[] = [
  {
    id: 'konami',
    trigger: 'ArrowUp,ArrowUp,ArrowDown,ArrowDown,ArrowLeft,ArrowRight,ArrowLeft,ArrowRight,KeyB,KeyA',
    message: '🚀 Código Konami ativado! Sistema de propulsão máximo!',
    icon: FaRocket,
    color: 'orange.400',
  },
  {
    id: 'space',
    trigger: 'KeyS,KeyP,KeyA,KeyC,KeyE',
    message: '🌌 Modo exploração espacial ativado!',
    icon: IoPlanet,
    color: 'purple.400',
  },
  {
    id: 'rocket',
    trigger: 'KeyR,KeyO,KeyC,KeyK,KeyE,KeyT',
    message: '🚀 Foguete lançado! Preparando para decolagem!',
    icon: IoRocketSharp,
    color: 'blue.400',
  },
];

export function useSpaceEasterEggs(enabled: boolean = true) {
  const [activeEgg, setActiveEgg] = useState<EasterEgg | null>(null);
  const [, setKeySequence] = useState<string[]>([]);

  useEffect(() => {
    if (!enabled) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.code;
      setKeySequence(prev => {
        const newSequence = [...prev, key].slice(-20); // Mantém últimas 20 teclas
        
        // Verifica cada easter egg
        EASTER_EGGS.forEach(egg => {
          const sequenceString = newSequence.join(',');
          
          if (sequenceString.includes(egg.trigger)) {
            setActiveEgg(egg);
            setTimeout(() => setActiveEgg(null), 3000);
            setKeySequence([]);
          }
        });
        
        return newSequence;
      });
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [enabled]);

  return { activeEgg };
}

export function EasterEggNotification({ egg }: { egg: EasterEgg | null }) {
  const bg = useColorModeValue('white', 'gray.800');

  if (!egg) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.8 }}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 9999,
        }}
      >
        <Box
          bg={bg}
          borderWidth="2px"
          borderColor={egg.color}
          borderRadius="xl"
          p={4}
          boxShadow="2xl"
          minW="300px"
        >
          <VStack spacing={2} align="center">
            <Icon as={egg.icon} w={8} h={8} color={egg.color} />
            <Text
              fontWeight="bold"
              fontSize="sm"
              textAlign="center"
              color={egg.color}
            >
              {egg.message}
            </Text>
          </VStack>
        </Box>
      </motion.div>
    </AnimatePresence>
  );
}
