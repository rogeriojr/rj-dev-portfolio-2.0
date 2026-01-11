import { IconButton, Badge, Tooltip, useColorModeValue, Box } from '@chakra-ui/react';
import { FaTrophy } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useGamification } from '../../hooks/useGamification';
import { useTranslation } from '../../i18n/useTranslation';
import { useFloatingButtonsConfig } from '../../hooks/useFloatingButtonsConfig';

interface GamificationBadgeProps {
  onOpen: () => void;
}

const MotionBadge = motion(Badge);
const MotionBox = motion(Box);

export function GamificationBadge({ onOpen }: GamificationBadgeProps) {
  const { language } = useTranslation();
  const { stats } = useGamification();
  const { config, getButtonStyle } = useFloatingButtonsConfig();
  const bg = useColorModeValue('yellow.400', 'yellow.500');
  const color = useColorModeValue('gray.800', 'white');

  const hasNewAchievements = stats.achievementsUnlocked > 0;
  const completionPercentage = (stats.achievementsUnlocked / stats.totalAchievements) * 100;

  if (!config.gamification.enabled) return null;

  const hasCustomPosition = config.gamification.position !== 'bottom-right' || 
                            config.gamification.customX !== undefined || 
                            config.gamification.customY !== undefined;

  const whatsappBottom = 24; // bottom do WhatsApp em desktop
  const whatsappHeight = 56; // altura do botão lg
  const spacing = 16; // espaçamento entre botões
  const gamificationBottom = whatsappBottom + whatsappHeight + spacing;

  return (
    <MotionBox
      style={hasCustomPosition ? getButtonStyle('gamification') : undefined}
      position={hasCustomPosition ? undefined : "fixed"}
      bottom={hasCustomPosition ? undefined : { base: '92px', md: `${gamificationBottom}px` }}
      right={hasCustomPosition ? undefined : { base: '20px', md: '24px' }}
      zIndex={hasCustomPosition ? undefined : 9999}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      css={{ 
        pointerEvents: 'auto',
        isolation: 'isolate'
      }}
    >
      <Tooltip
        label={`${language === 'pt' ? 'Gamificação' : 'Gamification'} - ${stats.achievementsUnlocked}/${stats.totalAchievements} ${language === 'pt' ? 'conquistas' : 'achievements'} - Nível ${stats.level}`}
        placement="left"
        hasArrow
      >
        <Box position="relative" display="inline-block">
          <IconButton
            aria-label={language === 'pt' ? 'Abrir gamificação' : 'Open gamification'}
            icon={<FaTrophy />}
            onClick={onOpen}
            colorScheme="yellow"
            size="md"
            borderRadius="full"
            boxShadow="2xl"
            bg={bg}
            color={color}
            _hover={{
              boxShadow: '0 0 20px rgba(255, 193, 7, 0.6)',
            }}
            transition="all 0.2s ease-in-out"
            cursor="pointer"
          />
          {hasNewAchievements && (
            <MotionBadge
              position="absolute"
              top="-2px"
              right="-2px"
              bg="red.500"
              color="white"
              borderRadius="full"
              fontSize="xs"
              px={1.5}
              minW="20px"
              h="20px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {stats.achievementsUnlocked}
            </MotionBadge>
          )}
          {completionPercentage >= 50 && (
            <MotionBadge
              position="absolute"
              bottom="-4px"
              left="50%"
              transform="translateX(-50%)"
              bg="green.500"
              color="white"
              fontSize="2xs"
              px={1}
              borderRadius="sm"
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              {Math.round(completionPercentage)}%
            </MotionBadge>
          )}
        </Box>
      </Tooltip>
    </MotionBox>
  );
}
