import { Box, Text, VStack, Icon, useColorModeValue, useBreakpointValue } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { EasterEgg } from '../../hooks/useGlobalEasterEggs';
import { FaRocket, FaSatellite, FaStar } from 'react-icons/fa';
import { IoPlanet } from 'react-icons/io5';
import { IconType } from 'react-icons';

interface GlobalEasterEggNotificationProps {
  egg: EasterEgg | null;
}

const iconMap: Record<string, IconType> = {
  '🚀': FaRocket,
  '🌌': FaSatellite,
  '⭐': FaStar,
  '🪐': IoPlanet,
  '🔧': FaSatellite,
  '👽': FaSatellite,
};

export function GlobalEasterEggNotification({ egg }: GlobalEasterEggNotificationProps) {
  const bg = useColorModeValue('white', 'gray.800');
  const top = useBreakpointValue({ base: '10px', md: '20px' }) || '20px';
  const right = useBreakpointValue({ base: '10px', md: '20px' }) || '20px';
  const left = useBreakpointValue({ base: '10px', md: 'auto' }) || 'auto';
  const maxWidth = useBreakpointValue({ base: 'calc(100vw - 20px)', md: '350px' }) || '350px';

  if (!egg) return null;

  const IconComponent = egg.icon && iconMap[egg.icon] ? iconMap[egg.icon] : FaStar;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.8, rotate: -180 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
        exit={{ opacity: 0, y: -50, scale: 0.8, rotate: 180 }}
        style={{
          position: 'fixed',
          top,
          right,
          left,
          zIndex: 9999,
          maxWidth,
        }}
      >
        <Box
          bg={bg}
          borderWidth={{ base: "2px", md: "3px" }}
          borderColor={egg.icon === '🚀' ? 'orange.400' : egg.icon === '🌌' ? 'purple.400' : 'cyan.400'}
          borderRadius="xl"
          p={{ base: 4, md: 6 }}
          boxShadow="2xl"
          minW={{ base: "auto", md: "350px" }}
          maxW={{ base: "calc(100vw - 20px)", md: "350px" }}
          w={{ base: "calc(100vw - 20px)", md: "auto" }}
          backdropFilter="blur(10px)"
        >
          <VStack spacing={{ base: 2, md: 3 }} align="center">
            <motion.div
              initial={{ scale: 0.8, rotate: -180 }}
              animate={{ 
                scale: 1,
                rotate: 0,
              }}
              transition={{ 
                duration: 0.5,
                ease: "easeOut" 
              }}
            >
              <Icon 
                as={IconComponent} 
                w={{ base: 8, md: 10 }} 
                h={{ base: 8, md: 10 }} 
                color={egg.icon === '🚀' ? 'orange.400' : egg.icon === '🌌' ? 'purple.400' : 'cyan.400'} 
              />
            </motion.div>
            <Text
              fontWeight="bold"
              fontSize={{ base: "xs", md: "md" }}
              textAlign="center"
              px={{ base: 3, md: 0 }}
              py={{ base: 1, md: 0 }}
              wordBreak="break-word"
              lineHeight={{ base: "1.4", md: "1.5" }}
              bgGradient={
                egg.icon === '🚀' 
                  ? 'linear(to-r, orange.400, red.500)'
                  : egg.icon === '🌌'
                  ? 'linear(to-r, purple.400, blue.500)'
                  : 'linear(to-r, cyan.400, blue.500)'
              }
              bgClip="text"
            >
              {egg.message}
            </Text>
            <Text 
              fontSize={{ base: "2xs", md: "xs" }} 
              color="gray.500" 
              textAlign="center" 
              px={{ base: 3, md: 0 }}
              wordBreak="break-word"
            >
              {egg.name}
            </Text>
          </VStack>
        </Box>
      </motion.div>
    </AnimatePresence>
  );
}
