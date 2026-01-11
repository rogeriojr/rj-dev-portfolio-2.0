import { Box, Text, HStack, VStack, useColorModeValue } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Achievement } from '../../types/gamification';
import { getRarityColor } from '../../data/achievements';
import { useTranslation } from '../../i18n/useTranslation';

interface AchievementNotificationProps {
  achievement: Achievement | null;
}

const MotionBox = motion(Box);

export function AchievementNotification({ achievement }: AchievementNotificationProps) {
  const { language } = useTranslation();
  const bg = useColorModeValue('white', 'gray.800');
  const rarityColor = achievement ? getRarityColor(achievement.rarity) : 'gray';

  return (
    <AnimatePresence>
      {achievement && (
        <MotionBox
          position="fixed"
          top={{ base: 4, md: 8 }}
          right={{ base: 4, md: 8 }}
          zIndex={9999}
          initial={{ opacity: 0, x: 300, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 300, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <Box
            bg={bg}
            border="2px solid"
            borderColor={`${rarityColor}.400`}
            borderRadius="xl"
            p={{ base: 3, md: 4 }}
            boxShadow="2xl"
            minW={{ base: 'auto', md: '320px' }}
            maxW={{ base: 'calc(100vw - 20px)', md: '400px' }}
            w={{ base: 'calc(100vw - 20px)', md: 'auto' }}
          >
            <HStack spacing={{ base: 2, md: 3 }} align="start">
              <Box
                fontSize={{ base: "2xl", md: "3xl" }}
                filter="drop-shadow(0 0 8px rgba(0,0,0,0.2))"
                animation="bounce 0.5s ease-in-out"
              >
                {achievement.icon}
              </Box>
              <VStack align="start" spacing={1} flex={1}>
                <HStack spacing={2} align="center" flexWrap="wrap">
                  <Text
                    fontSize={{ base: "2xs", md: "xs" }}
                    fontWeight="bold"
                    textTransform="uppercase"
                    color={`${rarityColor}.500`}
                    letterSpacing="wide"
                  >
                    {achievement.rarity === 'common' ? 'Comum' : 
                     achievement.rarity === 'rare' ? 'Raro' :
                     achievement.rarity === 'epic' ? 'Épico' : 'Lendário'}
                  </Text>
                  <Text fontSize={{ base: "2xs", md: "xs" }} color="gray.500" fontWeight="bold">
                    +{achievement.points} XP
                  </Text>
                </HStack>
                <Text 
                  fontWeight="bold" 
                  fontSize={{ base: "sm", md: "md" }} 
                  color={useColorModeValue('gray.800', 'white')}
                  wordBreak="break-word"
                >
                  {achievement.name[language]}
                </Text>
                <Text 
                  fontSize={{ base: "xs", md: "sm" }} 
                  color="gray.600" 
                  lineHeight={{ base: "1.4", md: "short" }}
                  wordBreak="break-word"
                >
                  {achievement.description[language]}
                </Text>
              </VStack>
            </HStack>
            <Box
              mt={3}
              h="2px"
              bgGradient={`linear(to-r, ${rarityColor}.400, ${rarityColor}.600)`}
              borderRadius="full"
            />
          </Box>
        </MotionBox>
      )}
    </AnimatePresence>
  );
}
