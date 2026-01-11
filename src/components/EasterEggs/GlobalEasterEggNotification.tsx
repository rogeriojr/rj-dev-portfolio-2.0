import { Box, Text, VStack, Icon, useColorModeValue } from '@chakra-ui/react';
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
          top: '20px',
          right: '20px',
          zIndex: 9999,
        }}
      >
        <Box
          bg={bg}
          borderWidth="3px"
          borderColor={egg.icon === '🚀' ? 'orange.400' : egg.icon === '🌌' ? 'purple.400' : 'cyan.400'}
          borderRadius="xl"
          p={6}
          boxShadow="2xl"
          minW="350px"
          backdropFilter="blur(10px)"
        >
          <VStack spacing={3} align="center">
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
                w={10} 
                h={10} 
                color={egg.icon === '🚀' ? 'orange.400' : egg.icon === '🌌' ? 'purple.400' : 'cyan.400'} 
              />
            </motion.div>
            <Text
              fontWeight="bold"
              fontSize="md"
              textAlign="center"
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
            <Text fontSize="xs" color="gray.500" textAlign="center">
              {egg.name}
            </Text>
          </VStack>
        </Box>
      </motion.div>
    </AnimatePresence>
  );
}
