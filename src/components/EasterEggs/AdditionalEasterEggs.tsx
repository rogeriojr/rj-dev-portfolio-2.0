import { useEffect, useState } from 'react';
import { Box, Text, VStack, Icon, useColorModeValue, useBreakpointValue } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSatellite, FaStar } from 'react-icons/fa';
import { IoPlanet } from 'react-icons/io5';

interface EasterEggTrigger {
  id: string;
  trigger: string | ((e: MouseEvent | KeyboardEvent) => boolean);
  message: string;
  icon: any;
  color: string;
  duration?: number;
}

type EventHandler = (e: MouseEvent | KeyboardEvent) => boolean;

const ADDITIONAL_EASTER_EGGS: EasterEggTrigger[] = [
  {
    id: 'click-planet',
    trigger: ((e: MouseEvent | KeyboardEvent) => {
      if (e instanceof MouseEvent) {
        const target = e.target as HTMLElement;
        return target.closest('[data-planet]') !== null;
      }
      return false;
    }) as EventHandler,
    message: '🪐 Planeta descoberto! Nova missão iniciada!',
    icon: IoPlanet,
    color: 'purple.400',
  },
  {
    id: 'triple-click',
    trigger: ((e: MouseEvent | KeyboardEvent) => {
      if (e instanceof MouseEvent) {
        return (e as any).detail === 3;
      }
      return false;
    }) as EventHandler,
    message: '⭐ Três cliques! Você encontrou uma estrela rara!',
    icon: FaStar,
    color: 'yellow.400',
  },
  {
    id: 'devtools',
    trigger: ((e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent) {
        return e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I');
      }
      return false;
    }) as EventHandler,
    message: '🔧 Modo desenvolvedor ativado! Explorando o código-fonte...',
    icon: FaSatellite,
    color: 'cyan.400',
  },
];

export function useAdditionalEasterEggs(enabled: boolean = true) {
  const [activeEgg, setActiveEgg] = useState<EasterEggTrigger | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const handleClick = (e: MouseEvent) => {
      ADDITIONAL_EASTER_EGGS.forEach(egg => {
        if (typeof egg.trigger === 'function' && egg.trigger(e)) {
          setActiveEgg(egg);
          setTimeout(() => setActiveEgg(null), egg.duration || 3000);
        }
      });
    };

    const handleKeyPress = (e: KeyboardEvent) => {
      ADDITIONAL_EASTER_EGGS.forEach(egg => {
        if (typeof egg.trigger === 'function' && egg.trigger(e)) {
          setActiveEgg(egg);
          setTimeout(() => setActiveEgg(null), egg.duration || 3000);
        } else if (typeof egg.trigger === 'string') {
        }
      });
    };

    window.addEventListener('click', handleClick);
    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [enabled]);

  return { activeEgg };
}

export function AdditionalEasterEggNotification({ egg }: { egg: EasterEggTrigger | null }) {
  const bg = useColorModeValue('white', 'gray.800');
  const bottom = useBreakpointValue({ base: '10px', md: '20px' }) || '20px';
  const left = useBreakpointValue({ base: '10px', md: '20px' }) || '20px';
  const maxWidth = useBreakpointValue({ base: 'calc(100vw - 20px)', md: '300px' }) || '300px';

  if (!egg) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        exit={{ opacity: 0, scale: 0.5, rotate: 180 }}
        style={{
          position: 'fixed',
          bottom,
          left,
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
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Icon as={egg.icon} w={{ base: 6, md: 8 }} h={{ base: 6, md: 8 }} color={egg.color} />
            </motion.div>
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
