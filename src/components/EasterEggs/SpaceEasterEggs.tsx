import { useEffect, useState } from 'react';
import { Box, Text, VStack, Icon, useColorModeValue, useBreakpointValue } from '@chakra-ui/react';
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
        const newSequence = [...prev, key].slice(-20);
        
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
  const top = useBreakpointValue({ base: '10px', md: '20px' }) || '20px';
  const right = useBreakpointValue({ base: '10px', md: '20px' }) || '20px';
  const maxWidth = useBreakpointValue({ base: 'calc(100vw - 20px)', md: '300px' }) || '300px';

  if (!egg) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.8 }}
        style={{
          position: 'fixed',
          top,
          right,
          zIndex: 9999,
          maxWidth,
        }}
      >
        <Box
          bg={bg}
          borderWidth={{ base: "2px", md: "2px" }}
          borderColor={egg.color}
          borderRadius="xl"
          p={{ base: 3, md: 4 }}
          boxShadow="2xl"
          minW={{ base: "auto", md: "300px" }}
          maxW={maxWidth}
          w={{ base: "calc(100vw - 20px)", md: "auto" }}
        >
          <VStack spacing={{ base: 1.5, md: 2 }} align="center">
            <Icon as={egg.icon} w={{ base: 6, md: 8 }} h={{ base: 6, md: 8 }} color={egg.color} />
            <Text
              fontWeight="bold"
              fontSize={{ base: "xs", md: "sm" }}
              textAlign="center"
              color={egg.color}
              px={{ base: 3, md: 0 }}
              py={{ base: 1, md: 0 }}
              wordBreak="break-word"
              lineHeight={{ base: "1.4", md: "1.5" }}
            >
              {egg.message}
            </Text>
          </VStack>
        </Box>
      </motion.div>
    </AnimatePresence>
  );
}
