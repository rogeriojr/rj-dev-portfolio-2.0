import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  VStack,
  HStack,
  Text,
  Progress,
  Badge,
  SimpleGrid,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
  Divider,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Icon,
} from '@chakra-ui/react';
import { FaTrophy, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useGamification } from '../../hooks/useGamification';
import { Achievement } from '../../types/gamification';
import { getRarityColor } from '../../data/achievements';
import { useTranslation } from '../../i18n/useTranslation';

interface GamificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const MotionBox = motion(Box);

export function GamificationPanel({ isOpen, onClose }: GamificationPanelProps) {
  const { language } = useTranslation();
  const {
    stats,
    achievements,
    unlockedAchievementIds,
    getUnlockedAchievements,
    getLockedAchievements,
    getXPProgressData,
    resetProgress,
  } = useGamification();

  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const cardBg = useColorModeValue('gray.50', 'gray.700');
  const { isOpen: isResetOpen, onOpen: onResetOpen, onClose: onResetClose } = useDisclosure();

  const unlocked = getUnlockedAchievements();
  const locked = getLockedAchievements();
  const xpProgress = getXPProgressData();

  const AchievementCard = ({ achievement, isUnlocked }: { achievement: Achievement; isUnlocked: boolean }) => {
    const rarityColor = getRarityColor(achievement.rarity);
    const opacity = isUnlocked ? 1 : 0.5;

    return (
      <MotionBox
        p={4}
        bg={cardBg}
        borderRadius="lg"
        border="1px solid"
        borderColor={isUnlocked ? `${rarityColor}.400` : borderColor}
        opacity={opacity}
        position="relative"
        whileHover={{ scale: isUnlocked ? 1.02 : 1 }}
        transition="all 0.2s"
      >
        <HStack spacing={3} align="start">
          <Box fontSize="2xl" filter={isUnlocked ? 'none' : 'grayscale(100%)'}>
            {achievement.icon}
          </Box>
          <VStack align="start" spacing={1} flex={1}>
            <HStack spacing={2} flexWrap="wrap">
              <Text fontWeight="bold" fontSize="sm" color={isUnlocked ? 'inherit' : 'gray.500'}>
                {achievement.name[language]}
              </Text>
              <Badge
                size="sm"
                colorScheme={rarityColor}
                variant={isUnlocked ? 'solid' : 'outline'}
              >
                {achievement.points} XP
              </Badge>
            </HStack>
            <Text fontSize="xs" color="gray.500" lineHeight="short">
              {achievement.description[language]}
            </Text>
            {achievement.maxProgress && (
              <Box w="full" mt={2}>
                <Progress
                  value={((achievement.progress || 0) / achievement.maxProgress) * 100}
                  colorScheme={rarityColor}
                  size="sm"
                  borderRadius="full"
                />
                <Text fontSize="2xs" color="gray.500" mt={1}>
                  {achievement.progress || 0} / {achievement.maxProgress}
                </Text>
              </Box>
            )}
            {isUnlocked && achievement.unlockedAt && (
              <Text fontSize="2xs" color="gray.400" mt={1}>
                {new Date(achievement.unlockedAt).toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US')}
              </Text>
            )}
          </VStack>
        </HStack>
        {!isUnlocked && (
          <Box
            position="absolute"
            top={2}
            right={2}
            fontSize="lg"
            opacity={0.3}
          >
            🔒
          </Box>
        )}
      </MotionBox>
    );
  };

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={{ base: 'full', md: 'md' }}>
        <DrawerOverlay />
        <DrawerContent bg={bg}>
          <DrawerCloseButton />
          <DrawerHeader borderBottom="1px" borderColor={borderColor}>
            <HStack spacing={2}>
              <Icon as={FaTrophy} color="yellow.400" />
              <Text>{language === 'pt' ? 'Gamificação' : 'Gamification'}</Text>
            </HStack>
          </DrawerHeader>
          <DrawerBody p={4}>
            <VStack spacing={6} align="stretch">
              <Box
                p={4}
                bgGradient="linear(to-r, purple.500, pink.500)"
                borderRadius="xl"
                color="white"
              >
                <VStack spacing={3} align="stretch">
                  <HStack justify="space-between">
                    <VStack align="start" spacing={0}>
                      <Text fontSize="xs" opacity={0.9}>
                        {language === 'pt' ? 'Nível' : 'Level'}
                      </Text>
                      <Text fontSize="3xl" fontWeight="bold">
                        {stats.level}
                      </Text>
                    </VStack>
                    <VStack align="end" spacing={0}>
                      <Text fontSize="xs" opacity={0.9}>
                        {language === 'pt' ? 'XP Total' : 'Total XP'}
                      </Text>
                      <Text fontSize="2xl" fontWeight="bold">
                        {stats.totalXP.toLocaleString()}
                      </Text>
                    </VStack>
                  </HStack>
                  <Box>
                    <HStack justify="space-between" mb={1}>
                      <Text fontSize="xs" opacity={0.9}>
                        {xpProgress.current} / {xpProgress.next} XP
                      </Text>
                      <Text fontSize="xs" opacity={0.9}>
                        {Math.round(xpProgress.percentage)}% {language === 'pt' ? 'próximo nível' : 'next level'}
                      </Text>
                    </HStack>
                    <Progress
                      value={xpProgress.percentage}
                      colorScheme="whiteAlpha"
                      size="lg"
                      borderRadius="full"
                      bg="whiteAlpha.200"
                    />
                  </Box>
                </VStack>
              </Box>

              <SimpleGrid columns={2} spacing={3}>
                <Stat p={3} bg={cardBg} borderRadius="lg">
                  <StatLabel fontSize="xs">{language === 'pt' ? 'Conquistas' : 'Achievements'}</StatLabel>
                  <StatNumber fontSize="lg">
                    {stats.achievementsUnlocked}/{stats.totalAchievements}
                  </StatNumber>
                </Stat>
                <Stat p={3} bg={cardBg} borderRadius="lg">
                  <StatLabel fontSize="xs">{language === 'pt' ? 'Easter Eggs' : 'Easter Eggs'}</StatLabel>
                  <StatNumber fontSize="lg">{stats.easterEggsFound}</StatNumber>
                </Stat>
                <Stat p={3} bg={cardBg} borderRadius="lg">
                  <StatLabel fontSize="xs">{language === 'pt' ? 'Projetos Vistos' : 'Projects Viewed'}</StatLabel>
                  <StatNumber fontSize="lg">{stats.projectsViewed}</StatNumber>
                </Stat>
                <Stat p={3} bg={cardBg} borderRadius="lg">
                  <StatLabel fontSize="xs">{language === 'pt' ? 'Tempo' : 'Time'}</StatLabel>
                  <StatNumber fontSize="lg">{Math.floor(stats.timeSpent)}m</StatNumber>
                </Stat>
              </SimpleGrid>

              <Divider />

              <Tabs variant="soft-rounded" colorScheme="purple">
                <TabList>
                  <Tab fontSize="sm">{language === 'pt' ? 'Todas' : 'All'}</Tab>
                  <Tab fontSize="sm">{language === 'pt' ? 'Desbloqueadas' : 'Unlocked'}</Tab>
                  <Tab fontSize="sm">{language === 'pt' ? 'Bloqueadas' : 'Locked'}</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel px={0}>
                    <VStack spacing={3} align="stretch" maxH="400px" overflowY="auto">
                      {achievements.map(ach => (
                        <AchievementCard
                          key={ach.id}
                          achievement={ach}
                          isUnlocked={unlockedAchievementIds.has(ach.id)}
                        />
                      ))}
                    </VStack>
                  </TabPanel>
                  <TabPanel px={0}>
                    <VStack spacing={3} align="stretch" maxH="400px" overflowY="auto">
                      {unlocked.length > 0 ? (
                        unlocked.map(ach => (
                          <AchievementCard key={ach.id} achievement={ach} isUnlocked={true} />
                        ))
                      ) : (
                        <Text textAlign="center" color="gray.500" py={8}>
                          {language === 'pt' ? 'Nenhuma conquista desbloqueada ainda' : 'No achievements unlocked yet'}
                        </Text>
                      )}
                    </VStack>
                  </TabPanel>
                  <TabPanel px={0}>
                    <VStack spacing={3} align="stretch" maxH="400px" overflowY="auto">
                      {locked.length > 0 ? (
                        locked.map(ach => (
                          <AchievementCard key={ach.id} achievement={ach} isUnlocked={false} />
                        ))
                      ) : (
                        <Text textAlign="center" color="gray.500" py={8}>
                          {language === 'pt' ? 'Todas as conquistas desbloqueadas!' : 'All achievements unlocked!'}
                        </Text>
                      )}
                    </VStack>
                  </TabPanel>
                </TabPanels>
              </Tabs>

              <Divider />

              <Button
                size="sm"
                variant="ghost"
                colorScheme="red"
                onClick={onResetOpen}
                leftIcon={<FaTimes />}
              >
                {language === 'pt' ? 'Resetar Progresso' : 'Reset Progress'}
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Modal isOpen={isResetOpen} onClose={onResetClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{language === 'pt' ? 'Resetar Progresso?' : 'Reset Progress?'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text mb={4}>
              {language === 'pt'
                ? 'Tem certeza que deseja resetar todo o progresso? Esta ação não pode ser desfeita.'
                : 'Are you sure you want to reset all progress? This action cannot be undone.'}
            </Text>
            <HStack spacing={3} justify="flex-end">
              <Button variant="ghost" onClick={onResetClose}>
                {language === 'pt' ? 'Cancelar' : 'Cancel'}
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  resetProgress();
                  onResetClose();
                }}
              >
                {language === 'pt' ? 'Resetar' : 'Reset'}
              </Button>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
