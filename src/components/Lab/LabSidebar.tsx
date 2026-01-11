import React, { useState, useEffect, useMemo } from 'react';
import {
  Box, VStack, Text, Icon, Flex, useColorModeValue, Input, InputGroup, InputLeftElement,
  Collapse, HStack, Badge, IconButton, Tooltip, Divider, useDisclosure
} from '@chakra-ui/react';
import {
  FaAtom, FaServer, FaBrain, FaMobileAlt, FaDraftingCompass,
  FaTools, FaCogs, FaShieldAlt, FaDatabase, FaCloud,
  FaFlask, FaLightbulb, FaHospital, FaBolt,
  FaDna, FaCrown, FaCheckDouble, FaRulerCombined,
  FaProjectDiagram, FaSearchPlus, FaCheckCircle, FaFileAlt, FaPenNib,
  FaSearch, FaChevronDown, FaChevronUp, FaHeart, FaHistory, FaCompress, FaExpand,
  FaRocket, FaFilter
} from 'react-icons/fa';
import { LAB_CONTENT } from '../../data/lab-content';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../../i18n/useTranslation';
import { useDebounce } from '../../hooks/useDebounce';

const MotionBox = motion(Box);

interface LabSidebarProps {
  activeCategory: string;
  activeItem: string | null;
  onSelect: (category: string, item: string) => void;
}

import { IconType } from 'react-icons';

const iconMap: Record<string, IconType> = {
  frontend: FaAtom,
  'frontend-mastery': FaCrown,
  backend: FaServer,
  'god-tier-backend': FaRocket,
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

const STORAGE_KEYS = {
  FAVORITES: 'cosmic-lab-favorites',
  RECENT: 'cosmic-lab-recent',
  COLLAPSED: 'cosmic-lab-collapsed',
  COMPACT: 'cosmic-lab-compact',
  SIDEBAR_SEARCH: 'cosmic-lab-sidebar-search'
};

export const LabSidebar: React.FC<LabSidebarProps> = ({ activeCategory, activeItem, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [recentItems, setRecentItems] = useState<string[]>([]);
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set());
  const [isCompact, setIsCompact] = useState(false);
  const [filterType, setFilterType] = useState<string>('all');
  
  const { language } = useTranslation();
  const debouncedSearch = useDebounce(searchTerm, 300);
  const { isOpen: showFilters, onToggle: toggleFilters } = useDisclosure();

  // Load preferences from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    const savedRecent = localStorage.getItem(STORAGE_KEYS.RECENT);
    const savedCollapsed = localStorage.getItem(STORAGE_KEYS.COLLAPSED);
    const savedCompact = localStorage.getItem(STORAGE_KEYS.COMPACT);
    
    if (savedFavorites) setFavorites(new Set(JSON.parse(savedFavorites)));
    if (savedRecent) setRecentItems(JSON.parse(savedRecent));
    if (savedCollapsed) setCollapsedCategories(new Set(JSON.parse(savedCollapsed)));
    if (savedCompact) setIsCompact(JSON.parse(savedCompact));
  }, []);

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(Array.from(favorites)));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.RECENT, JSON.stringify(recentItems));
  }, [recentItems]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COLLAPSED, JSON.stringify(Array.from(collapsedCategories)));
  }, [collapsedCategories]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COMPACT, JSON.stringify(isCompact));
    // Dispatch custom event to notify layout of width change
    window.dispatchEvent(new CustomEvent('cosmic-lab-compact-changed'));
  }, [isCompact]);

  // Track recent items
  useEffect(() => {
    if (activeItem) {
      setRecentItems(prev => {
        const filtered = prev.filter(id => id !== activeItem);
        return [activeItem, ...filtered].slice(0, 10);
      });
    }
  }, [activeItem]);

  const toggleFavorite = (itemId: string) => {
    setFavorites(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const toggleCategory = (categoryId: string) => {
    setCollapsedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  // Filter content
  const filteredContent = useMemo(() => {
    return LAB_CONTENT.map(category => ({
      ...category,
      items: category.items.filter(item => {
        const matchesSearch = !debouncedSearch ||
          item.title[language].toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          item.description[language].toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          item.type.toLowerCase().includes(debouncedSearch.toLowerCase());
        
        const matchesType = filterType === 'all' || item.type === filterType;
        
        return matchesSearch && matchesType;
      })
    })).filter(category => category.items.length > 0);
  }, [debouncedSearch, filterType, language]);

  // Get all unique types
  const allTypes = useMemo(() => {
    const types = new Set(LAB_CONTENT.flatMap(cat => cat.items.map(item => item.type)));
    return Array.from(types).sort();
  }, []);

  const bg = useColorModeValue('white', 'gray.900');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
  const activeColor = 'cyan.400';
  const hoverBg = useColorModeValue('gray.50', 'whiteAlpha.50');
  const cardBg = useColorModeValue('gray.50', 'gray.800');
  const searchBg = useColorModeValue('white', 'gray.800');

  return (
    <Box
      w="100%"
      h="100%"
      overflowY="auto"
      overflowX="hidden"
      bg={bg}
      py={{ base: 4, md: 4 }}
      px={{ base: 3, md: 3 }}
      css={{
        '&::-webkit-scrollbar': { width: '6px' },
        '&::-webkit-scrollbar-track': { 
          background: useColorModeValue('#f7fafc', '#1a202c'),
          borderRadius: '24px'
        },
        '&::-webkit-scrollbar-thumb': { 
          background: useColorModeValue('#cbd5e0', '#4a5568'),
          borderRadius: '24px',
          '&:hover': {
            background: useColorModeValue('#a0aec0', '#718096')
          }
        },
      }}
      position="relative"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: useColorModeValue(
          'linear-gradient(180deg, rgba(66, 153, 225, 0.02) 0%, transparent 100%)',
          'linear-gradient(180deg, rgba(66, 153, 225, 0.05) 0%, transparent 100%)'
        ),
        pointerEvents: 'none',
        zIndex: 0
      }}
    >
      <VStack align="stretch" spacing={3} position="relative" zIndex={1}>
        {/* Header with Controls */}
        <Flex justify="space-between" align="center" mb={2}>
          <HStack spacing={2}>
            <Icon as={FaRocket} w={4} h={4} color={activeColor} />
            <Text fontSize="xs" fontWeight="bold" letterSpacing="widest" color="gray.500" textTransform="uppercase">
              {language === 'pt' ? 'Navegação' : 'Navigation'}
            </Text>
          </HStack>
          <HStack spacing={1}>
            <Tooltip label={isCompact ? (language === 'pt' ? 'Expandir' : 'Expand') : (language === 'pt' ? 'Compactar' : 'Compact')} placement="left">
              <IconButton
                aria-label="Toggle compact"
                icon={isCompact ? <FaExpand /> : <FaCompress />}
                size="xs"
                variant="ghost"
                onClick={() => setIsCompact(!isCompact)}
                colorScheme="cyan"
              />
            </Tooltip>
          </HStack>
        </Flex>

        {/* Search Bar */}
        <InputGroup size="sm">
          <InputLeftElement pointerEvents="none" h="full">
            <Icon as={FaSearch} color="gray.400" w={3} h={3} />
          </InputLeftElement>
          <Input
            placeholder={language === 'pt' ? 'Buscar...' : 'Search...'}
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            bg={searchBg}
            borderColor={borderColor}
            fontSize="xs"
            pl={8}
            _focus={{
              borderColor: activeColor,
              boxShadow: `0 0 0 1px ${useColorModeValue('#38b2ac', '#4fd1c5')}`
            }}
            _hover={{
              borderColor: useColorModeValue('gray.300', 'whiteAlpha.200')
            }}
          />
        </InputGroup>

        {/* Quick Filters */}
        {showFilters && (
          <Collapse in={showFilters} animateOpacity>
            <VStack align="stretch" spacing={2} p={2} bg={cardBg} borderRadius="md" border="1px" borderColor={borderColor}>
              <HStack justify="space-between" w="100%">
                <Text fontSize="2xs" fontWeight="bold" color="gray.500" textTransform="uppercase">
                  {language === 'pt' ? 'Filtros' : 'Filters'}
                </Text>
                <IconButton
                  aria-label="Close filters"
                  icon={<FaFilter />}
                  size="xs"
                  variant="ghost"
                  onClick={toggleFilters}
                />
              </HStack>
              <Box
                as="select"
                value={filterType}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilterType(e.target.value)}
                fontSize="2xs"
                p={1}
                bg={bg}
                borderColor={borderColor}
                borderRadius="sm"
                w="100%"
              >
                <option value="all">{language === 'pt' ? 'Todos os Tipos' : 'All Types'}</option>
                {allTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </Box>
            </VStack>
          </Collapse>
        )}

        {!showFilters && (
          <HStack justify="center">
            <IconButton
              aria-label="Show filters"
              icon={<FaFilter />}
              size="xs"
              variant="ghost"
              onClick={toggleFilters}
              colorScheme="cyan"
            />
          </HStack>
        )}

        <Divider borderColor={borderColor} />

        {/* Favorites Section */}
        {favorites.size > 0 && (
          <Box>
            <HStack mb={2} justify="space-between">
              <HStack spacing={1}>
                <Icon as={FaHeart} w={3} h={3} color="red.400" />
                <Text fontSize="2xs" fontWeight="bold" color="gray.500" textTransform="uppercase">
                  {language === 'pt' ? 'Favoritos' : 'Favorites'}
                </Text>
              </HStack>
              <Badge colorScheme="red" variant="subtle" fontSize="2xs">
                {favorites.size}
              </Badge>
            </HStack>
            <VStack align="stretch" spacing={1} pl={2}>
              {LAB_CONTENT.flatMap(cat => cat.items)
                .filter(item => favorites.has(item.id))
                .slice(0, 5)
                .map(item => (
                  <MotionBox
                    key={item.id}
                    as="button"
                    py={1}
                    px={2}
                    textAlign="left"
                    fontSize="2xs"
                    color={activeItem === item.id ? activeColor : 'gray.400'}
                    bg={activeItem === item.id ? hoverBg : 'transparent'}
                    borderRadius="sm"
                    _hover={{ color: activeColor, bg: hoverBg }}
                    onClick={() => {
                      const category = LAB_CONTENT.find(c => c.items.some(i => i.id === item.id));
                      if (category) onSelect(category.id, item.id);
                    }}
                    position="relative"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {activeItem === item.id && (
                      <MotionBox
                        layoutId="sidebar-active-item"
                        position="absolute"
                        left={0}
                        top={0}
                        bottom={0}
                        w="2px"
                        bg={activeColor}
                        initial={false}
                      />
                    )}
                    <Text noOfLines={1} fontSize="2xs">
                      {item.title[language]}
                    </Text>
                  </MotionBox>
                ))}
            </VStack>
            <Divider borderColor={borderColor} mt={2} />
          </Box>
        )}

        {/* Recent Items */}
        {recentItems.length > 0 && !isCompact && (
          <Box>
            <HStack mb={2} justify="space-between">
              <HStack spacing={1}>
                <Icon as={FaHistory} w={3} h={3} color="purple.400" />
                <Text fontSize="2xs" fontWeight="bold" color="gray.500" textTransform="uppercase">
                  {language === 'pt' ? 'Recentes' : 'Recent'}
                </Text>
              </HStack>
            </HStack>
            <VStack align="stretch" spacing={1} pl={2}>
              {recentItems.slice(0, 3).map(itemId => {
                const item = LAB_CONTENT.flatMap(cat => cat.items).find(i => i.id === itemId);
                if (!item) return null;
                return (
                  <MotionBox
                    key={itemId}
                    as="button"
                    py={1}
                    px={2}
                    textAlign="left"
                    fontSize="2xs"
                    color={activeItem === itemId ? activeColor : 'gray.400'}
                    bg={activeItem === itemId ? hoverBg : 'transparent'}
                    borderRadius="sm"
                    _hover={{ color: activeColor, bg: hoverBg }}
                    onClick={() => {
                      const category = LAB_CONTENT.find(c => c.items.some(i => i.id === itemId));
                      if (category) onSelect(category.id, itemId);
                    }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Text noOfLines={1} fontSize="2xs">
                      {item.title[language]}
                    </Text>
                  </MotionBox>
                );
              })}
            </VStack>
            <Divider borderColor={borderColor} mt={2} />
          </Box>
        )}

        {/* Categories */}
        <Text fontSize="2xs" fontWeight="bold" letterSpacing="widest" color="gray.500" textTransform="uppercase" mb={1}>
          {language === 'pt' ? 'Categorias' : 'Categories'}
        </Text>

        <VStack align="stretch" spacing={2}>
          <AnimatePresence>
            {filteredContent.map((category) => {
              const isCollapsed = collapsedCategories.has(category.id);
              const isActive = activeCategory === category.id;
              const CategoryIcon = iconMap[category.id] || FaAtom;
              const itemCount = category.items.length;

              return (
                <MotionBox
                  key={category.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Category Header */}
                  <MotionBox
                    as="button"
                    w="100%"
                    py={2}
                    px={2}
                    borderRadius="md"
                    bg={isActive ? hoverBg : 'transparent'}
                    borderLeft="3px solid"
                    borderColor={isActive ? activeColor : 'transparent'}
                    _hover={{
                      bg: hoverBg,
                      borderColor: activeColor,
                      transform: 'translateX(4px)'
                    }}
                    onClick={() => toggleCategory(category.id)}
                    transition="all 0.2s"
                    position="relative"
                    overflow="hidden"
                    _before={{
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: isActive
                        ? `linear-gradient(90deg, ${useColorModeValue('rgba(66, 153, 225, 0.1)', 'rgba(79, 209, 197, 0.1)')} 0%, transparent 100%)`
                        : 'transparent',
                      pointerEvents: 'none'
                    }}
                  >
                    <Flex align="center" justify="space-between" position="relative" zIndex={1}>
                      <HStack spacing={2} flex={1} minW={0}>
                        <Icon
                          as={CategoryIcon}
                          w={isCompact ? 3 : 4}
                          h={isCompact ? 3 : 4}
                          color={isActive ? activeColor : 'gray.400'}
                          flexShrink={0}
                        />
                        {!isCompact && (
                          <VStack align="start" spacing={0} flex={1} minW={0}>
                            <Text
                              fontWeight="bold"
                              fontSize="xs"
                              color={isActive ? activeColor : 'gray.300'}
                              noOfLines={1}
                              textAlign="left"
                            >
                              {category.title[language]}
                            </Text>
                            <Text fontSize="2xs" color="gray.500">
                              {itemCount} {language === 'pt' ? 'itens' : 'items'}
                            </Text>
                          </VStack>
                        )}
                      </HStack>
                      <HStack spacing={1} flexShrink={0}>
                        {!isCompact && (
                          <Badge colorScheme="cyan" variant="subtle" fontSize="2xs">
                            {itemCount}
                          </Badge>
                        )}
                        <Icon
                          as={isCollapsed ? FaChevronDown : FaChevronUp}
                          w={3}
                          h={3}
                          color="gray.400"
                        />
                      </HStack>
                    </Flex>
                  </MotionBox>

                  {/* Category Items */}
                  <Collapse in={!isCollapsed} animateOpacity>
                    <VStack
                      align="stretch"
                      pl={isCompact ? 1 : 4}
                      spacing={1}
                      mt={1}
                      borderLeft={isCompact ? 'none' : '1px'}
                      borderColor={borderColor}
                    >
                      {category.items.map((item) => {
                        const isItemActive = activeItem === item.id;
                        const isFavorite = favorites.has(item.id);

                        return (
                          <MotionBox
                            key={item.id}
                            as="button"
                            py={1}
                            px={2}
                            textAlign="left"
                            fontSize={isCompact ? '2xs' : 'xs'}
                            color={isItemActive ? activeColor : 'gray.400'}
                            bg={isItemActive ? hoverBg : 'transparent'}
                            borderRadius="sm"
                            _hover={{
                              color: activeColor,
                              bg: hoverBg,
                              transform: 'translateX(4px)'
                            }}
                            onClick={() => onSelect(category.id, item.id)}
                            position="relative"
                            transition="all 0.2s"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            whileHover={{ x: 4 }}
                          >
                            {isItemActive && (
                              <MotionBox
                                layoutId="sidebar-active-item"
                                position="absolute"
                                left={isCompact ? 0 : '-1px'}
                                top={0}
                                bottom={0}
                                w="2px"
                                bg={activeColor}
                                initial={false}
                              />
                            )}
                            <Flex align="center" justify="space-between" w="100%">
                              <Text noOfLines={1} flex={1} minW={0} textAlign="left">
                                {item.title[language]}
                              </Text>
                              <HStack spacing={1} flexShrink={0} ml={2}>
                                <IconButton
                                  aria-label={isFavorite ? (language === 'pt' ? 'Remover dos favoritos' : 'Remove from favorites') : (language === 'pt' ? 'Adicionar aos favoritos' : 'Add to favorites')}
                                  icon={<FaHeart />}
                                  size="xs"
                                  variant="ghost"
                                  colorScheme="red"
                                  color={isFavorite ? 'red.400' : 'gray.400'}
                                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                    e.stopPropagation();
                                    toggleFavorite(item.id);
                                  }}
                                  _hover={{
                                    color: 'red.400',
                                    transform: 'scale(1.2)'
                                  }}
                                  transition="all 0.2s"
                                />
                                {!isCompact && (
                                  <Badge
                                    colorScheme="cyan"
                                    variant="outline"
                                    fontSize="2xs"
                                    px={1}
                                  >
                                    {item.type}
                                  </Badge>
                                )}
                              </HStack>
                            </Flex>
                          </MotionBox>
                        );
                      })}
                    </VStack>
                  </Collapse>
                </MotionBox>
              );
            })}
          </AnimatePresence>
        </VStack>

        {/* Empty State */}
        {filteredContent.length === 0 && (
          <Box textAlign="center" py={8}>
            <Icon as={FaSearch} w={8} h={8} color="gray.400" mb={2} />
            <Text fontSize="xs" color="gray.500">
              {language === 'pt' ? 'Nenhum resultado encontrado' : 'No results found'}
            </Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
};
