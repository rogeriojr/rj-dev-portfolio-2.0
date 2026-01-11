import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Text, VStack, Icon, useColorModeValue, useBreakpointValue } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaUser, FaEnvelope, FaCertificate, FaFlask } from 'react-icons/fa';

export interface PageEasterEgg {
  path: string;
  trigger: string;
  message: string;
  icon: any;
  color: string;
}

export const PAGE_EASTER_EGGS: PageEasterEgg[] = [
  {
    path: '/',
    trigger: 'KeyH,KeyO,KeyM,KeyE',
    message: '🏠 Bem-vindo ao centro de comando! Base espacial ativada!',
    icon: FaHome,
    color: 'blue.400',
  },
  {
    path: '/about',
    trigger: 'KeyA,KeyB,KeyO,KeyU,KeyT',
    message: '👤 Perfil do explorador espacial carregado! Missão pessoal iniciada!',
    icon: FaUser,
    color: 'purple.400',
  },
  {
    path: '/contact',
    trigger: 'KeyC,KeyO,KeyN,KeyT,KeyA,KeyC,KeyT',
    message: '📡 Estabelecendo comunicação intergaláctica... Sinal enviado!',
    icon: FaEnvelope,
    color: 'cyan.400',
  },
  {
    path: '/certificates',
    trigger: 'KeyC,KeyE,KeyR,KeyT,KeyI,KeyF,KeyI,KeyC,KeyA,KeyT,KeyE',
    message: '🏆 Certificados de missões espaciais descobertos! Conquistas reveladas!',
    icon: FaCertificate,
    color: 'yellow.400',
  },
  {
    path: '/lab',
    trigger: 'KeyL,KeyA,KeyB',
    message: '🔬 Laboratório Cósmico ativado! Experiências iniciadas!',
    icon: FaFlask,
    color: 'green.400',
  },
];

export function usePageSpecificEasterEggs(enabled: boolean = true) {
  const location = useLocation();
  const [activeEgg, setActiveEgg] = useState<PageEasterEgg | null>(null);
  const [, setKeySequence] = useState<string[]>([]);

  useEffect(() => {
    if (!enabled) return;

    const pageEgg = PAGE_EASTER_EGGS.find(egg => location.pathname === egg.path);
    if (!pageEgg) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.code;
      setKeySequence(prev => {
        const newSequence = [...prev, key].slice(-20);
        const sequenceString = newSequence.join(',');
        
        if (sequenceString.includes(pageEgg.trigger)) {
          setActiveEgg(pageEgg);
          setTimeout(() => setActiveEgg(null), 3000);
          setKeySequence([]);
        }
        
        return newSequence;
      });
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [location.pathname, enabled]);

  return { activeEgg };
}

export function PageEasterEggNotification({ egg }: { egg: PageEasterEgg | null }) {
  const bg = useColorModeValue('white', 'gray.800');
  const bottom = useBreakpointValue({ base: '10px', md: '20px' }) || '20px';
  const left = useBreakpointValue({ base: '10px', md: '20px' }) || '20px';
  const maxWidth = useBreakpointValue({ base: 'calc(100vw - 20px)', md: '300px' }) || '300px';

  if (!egg) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 100, scale: 0.5 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 100, scale: 0.5 }}
        style={{
          position: 'fixed',
          bottom,
          left,
          zIndex: 9995,
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
              initial={{ scale: 0.8, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
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
