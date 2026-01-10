import React from 'react';
import { Box, VStack, Text, Icon, Flex, useColorModeValue } from '@chakra-ui/react';
import {
  FaAtom, FaServer, FaBrain, FaMobileAlt, FaDraftingCompass,
  FaTools, FaCogs, FaShieldAlt, FaDatabase, FaCloud,
  FaFlask, FaLightbulb, FaHospital, FaBolt,
  FaDna, FaCrown, FaStar, FaCheckDouble, FaRulerCombined,
  FaProjectDiagram, FaSearchPlus, FaCheckCircle, FaFileAlt, FaPenNib
} from 'react-icons/fa';
import { LAB_CONTENT } from '../../data/lab-content';
import { motion } from 'framer-motion';
import { useTranslation } from '../../i18n/useTranslation';

interface LabSidebarProps {
  activeCategory: string;
  activeItem: string | null;
  onSelect: (category: string, item: string) => void;
}

const MotionBox = motion(Box);

const iconMap: Record<string, any> = {
  frontend: FaAtom,
  'frontend-mastery': FaCrown,
  backend: FaServer,
  'god-tier-backend': FaStar,
  'data-validation': FaCheckCircle,
  'media-pipeline': FaFileAlt,
  'interactive-logic': FaPenNib,
  ai: FaBrain,
  'ai-advanced': FaDna,
  mobile: FaMobileAlt,
  system: FaTools,
  architecture: FaProjectDiagram,
  devops: FaCogs,
  security: FaShieldAlt,
  data: FaDatabase,
  cloud: FaCloud,
  observability: FaSearchPlus,
  testing: FaFlask,
  'testing-lab': FaCheckDouble,
  leadership: FaLightbulb,
  utilities: FaTools,
  'mission-critical': FaHospital,
  iot: FaBolt,
  standards: FaRulerCombined,
  'design-patterns': FaDraftingCompass
};

export const LabSidebar: React.FC<LabSidebarProps> = ({ activeCategory, activeItem, onSelect }) => {
  const bg = useColorModeValue('white', 'gray.900');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
  const activeColor = 'cyan.400';
  const { language } = useTranslation();

  return (
    <Box
      w={{ base: 'full', md: '280px' }}
      h="calc(100vh - 80px)"
      pos="sticky"
      top="80px"
      overflowY="auto"
      borderRight="1px"
      borderColor={borderColor}
      bg={bg}
      py={6}
      px={4}
      css={{
        '&::-webkit-scrollbar': { width: '4px' },
        '&::-webkit-scrollbar-track': { width: '6px' },
        '&::-webkit-scrollbar-thumb': { background: '#4A5568', borderRadius: '24px' },
      }}
    >
      <VStack align="stretch" spacing={6}>
        <Text fontSize="xs" fontWeight="bold" letterSpacing="widest" color="gray.500" textTransform="uppercase">
          {language === 'pt' ? 'Módulos Cósmicos' : 'Cosmic Modules'}
        </Text>

        {LAB_CONTENT.map((category) => (
          <Box key={category.id}>
            <Flex align="center" mb={3} color={activeCategory === category.id ? activeColor : 'inherit'}>
              <Icon as={iconMap[category.id] || FaAtom} mr={2} />
              <Text fontWeight="bold">{category.title[language]}</Text>
            </Flex>

            <VStack align="stretch" pl={6} spacing={1} borderLeft="1px" borderColor={borderColor}>
              {category.items.map((item) => (
                <Box
                  key={item.id}
                  as="button"
                  py={1}
                  px={2}
                  textAlign="left"
                  fontSize="sm"
                  color={activeItem === item.id ? activeColor : 'gray.500'}
                  _hover={{ color: activeColor }}
                  onClick={() => onSelect(category.id, item.id)}
                  position="relative"
                >
                  {activeItem === item.id && (
                    <MotionBox
                      layoutId="sidebar-active"
                      position="absolute"
                      left="-1px"
                      top={0}
                      bottom={0}
                      w="2px"
                      bg={activeColor}
                      initial={false}
                    />
                  )}
                  {item.title[language]}
                </Box>
              ))}
            </VStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};
