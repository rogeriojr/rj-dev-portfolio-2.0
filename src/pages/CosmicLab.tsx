import { useState, useEffect, useMemo } from 'react';
import { Box, Heading, Text, Container, Icon, Input, VStack, SimpleGrid, useColorModeValue, InputGroup, InputLeftElement, Select, Flex } from '@chakra-ui/react';
import { LabLayout } from '../components/Lab/LabLayout';
import { DocSection } from '../components/Lab/DocSection';
import { LAB_CONTENT } from '../data/lab-content';
import { FaRocket, FaSearch, FaFlask, FaCode, FaChartLine } from 'react-icons/fa';
import { useTranslation } from '../i18n/useTranslation';
import { useDebounce } from '../hooks/useDebounce';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const CosmicLab = () => {
  const [activeCategory, setActiveCategory] = useState(() => {
    // Initialize with first category if available
    return LAB_CONTENT.length > 0 ? LAB_CONTENT[0].id : 'god-tier-backend';
  });
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const { language } = useTranslation();

  const debouncedSearch = useDebounce(searchTerm, 300);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalItems = LAB_CONTENT.reduce((sum, cat) => sum + cat.items.length, 0);
    const totalCategories = LAB_CONTENT.length;
    const types = new Set(LAB_CONTENT.flatMap(cat => cat.items.map(item => item.type)));
    
    return {
      totalItems,
      totalCategories,
      totalTypes: types.size,
    };
  }, []);

  // Filter items based on search and type
  const filteredContent = useMemo(() => {
    return LAB_CONTENT.map(category => ({
      ...category,
      items: category.items.filter(item => {
        const matchesSearch = !debouncedSearch ||
          item.title[language].toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          item.description[language].toLowerCase().includes(debouncedSearch.toLowerCase());
        
        const matchesType = typeFilter === 'all' || item.type === typeFilter;
        
        return matchesSearch && matchesType;
      })
    })).filter(category => category.items.length > 0);
  }, [debouncedSearch, typeFilter, language]);

  const currentCategory = useMemo(() => {
    if (filteredContent.length === 0) return null;
    return filteredContent.find(c => c.id === activeCategory) || filteredContent[0];
  }, [filteredContent, activeCategory]);

  // Auto-scroll to section on selection
  useEffect(() => {
    if (activeItem) {
      const element = document.getElementById(activeItem);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [activeItem]);

  // Reset active item when category changes or when filtered content changes
  useEffect(() => {
    if (filteredContent.length === 0) {
      setActiveItem(null);
      return;
    }

    if (currentCategory && currentCategory.items.length > 0) {
      setActiveItem(currentCategory.items[0].id);
    } else if (filteredContent.length > 0) {
      const firstCategory = filteredContent[0];
      if (firstCategory && firstCategory.items.length > 0) {
        setActiveCategory(firstCategory.id);
        setActiveItem(firstCategory.items[0].id);
      }
    }
  }, [activeCategory, currentCategory, filteredContent]);

  const bgColor = useColorModeValue('white', 'gray.900');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const cardBg = useColorModeValue('gray.50', 'gray.800');

  const allTypes = useMemo(() => {
    const types = new Set(LAB_CONTENT.flatMap(cat => cat.items.map(item => item.type)));
    return Array.from(types).sort();
  }, []);

  return (
    <LabLayout
      activeCategory={activeCategory}
      activeItem={activeItem}
      onSelect={(cat, item) => {
        setActiveCategory(cat);
        setActiveItem(item);
      }}
    >
      <Container 
        maxW="4xl" 
        py={{ base: 0, md: 8 }} 
        px={{ base: 4, md: 6 }}
        pt={0}
      >
        {/* Header with Stats */}
        <MotionBox
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          mb={8}
          textAlign="center"
          mt={{ base: 0, md: 0 }}
        >
          <VStack spacing={6}>
            <Box>
              <Icon as={FaRocket} w={{ base: 8, md: 12 }} h={{ base: 8, md: 12 }} color="cyan.400" mb={4} />
              <Heading
                as="h1"
                size={{ base: "xl", md: "2xl" }}
                mb={4}
                bgGradient="linear(to-r, cyan.400, purple.500)"
                bgClip="text"
                fontFamily="Share Tech Mono"
                px={{ base: 2, md: 0 }}
              >
                {language === 'pt' ? 'LABORATÓRIO CÓSMICO' : 'COSMIC LAB'}
              </Heading>
              <Text fontSize={{ base: "md", md: "xl" }} color="gray.500" maxW="2xl" mx="auto" px={{ base: 4, md: 0 }}>
                {language === 'pt'
                  ? 'Instalação de pesquisa experimental para padrões avançados de UI, blueprints de arquitetura e protótipos de IA.'
                  : 'Experimental research facility for advanced UI patterns, architecture blueprints, and AI prototypes.'}
              </Text>
            </Box>

            {/* Statistics */}
            <SimpleGrid columns={{ base: 1, sm: 3 }} spacing={{ base: 3, md: 4 }} w="full" maxW="600px" mx="auto">
              <Box p={{ base: 3, md: 4 }} bg={cardBg} borderRadius="xl" border="1px" borderColor={borderColor}>
                <VStack spacing={1}>
                  <Icon as={FaFlask} w={{ base: 5, md: 6 }} h={{ base: 5, md: 6 }} color="cyan.400" />
                  <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold">
                    {stats.totalItems}
                  </Text>
                  <Text fontSize={{ base: "2xs", md: "xs" }} color="gray.500" textTransform="uppercase" textAlign="center">
                    {language === 'pt' ? 'Experimentos' : 'Experiments'}
                  </Text>
                </VStack>
              </Box>
              <Box p={{ base: 3, md: 4 }} bg={cardBg} borderRadius="xl" border="1px" borderColor={borderColor}>
                <VStack spacing={1}>
                  <Icon as={FaCode} w={{ base: 5, md: 6 }} h={{ base: 5, md: 6 }} color="purple.400" />
                  <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold">
                    {stats.totalCategories}
                  </Text>
                  <Text fontSize={{ base: "2xs", md: "xs" }} color="gray.500" textTransform="uppercase" textAlign="center">
                    {language === 'pt' ? 'Categorias' : 'Categories'}
                  </Text>
                </VStack>
              </Box>
              <Box p={{ base: 3, md: 4 }} bg={cardBg} borderRadius="xl" border="1px" borderColor={borderColor}>
                <VStack spacing={1}>
                  <Icon as={FaChartLine} w={{ base: 5, md: 6 }} h={{ base: 5, md: 6 }} color="green.400" />
                  <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold">
                    {stats.totalTypes}
                  </Text>
                  <Text fontSize={{ base: "2xs", md: "xs" }} color="gray.500" textTransform="uppercase" textAlign="center">
                    {language === 'pt' ? 'Tipos' : 'Types'}
                  </Text>
                </VStack>
              </Box>
            </SimpleGrid>
          </VStack>
        </MotionBox>

        {/* Search and Filters */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          mb={8}
        >
          <Flex
            direction={{ base: 'column', md: 'row' }}
            gap={{ base: 3, md: 4 }}
            p={{ base: 3, md: 4 }}
            bg={cardBg}
            borderRadius="xl"
            border="1px"
            borderColor={borderColor}
          >
            <InputGroup flex={1}>
              <InputLeftElement pointerEvents="none" h="full">
                <Icon as={FaSearch} color="gray.400" />
              </InputLeftElement>
              <Input
                placeholder={language === 'pt' ? 'Buscar experimentos...' : 'Search experiments...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                bg={bgColor}
                pl={{ base: 10, md: 10 }}
                fontSize={{ base: "sm", md: "md" }}
                h={{ base: "40px", md: "auto" }}
              />
            </InputGroup>
            <Select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              bg={bgColor}
              w={{ base: 'full', md: '200px' }}
              fontSize={{ base: "sm", md: "md" }}
              h={{ base: "40px", md: "auto" }}
            >
              <option value="all">{language === 'pt' ? 'Todos os Tipos' : 'All Types'}</option>
              {allTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </Select>
          </Flex>
        </MotionBox>

        {/* Results Count */}
        {filteredContent.length === 0 && (
          <Box textAlign="center" py={12}>
            <Text fontSize="lg" color="gray.500" mb={2}>
              {language === 'pt' ? 'Nenhum experimento encontrado' : 'No experiments found'}
            </Text>
            <Text fontSize="sm" color="gray.400">
              {language === 'pt' ? 'Tente ajustar seus filtros de busca' : 'Try adjusting your search filters'}
            </Text>
          </Box>
        )}

        {/* Content */}
        {filteredContent.length > 0 && (
          <Box position="relative">
            {filteredContent.map((category) => (
              <Box key={category.id} mb={12}>
                {filteredContent.length > 1 && (
                  <Heading
                    size="md"
                    mb={6}
                    color="cyan.400"
                    fontFamily="Share Tech Mono"
                    textTransform="uppercase"
                    letterSpacing="widest"
                  >
                    {category.title[language]}
                  </Heading>
                )}
                {category.items.map((item) => (
                  <DocSection key={item.id} item={item} />
                ))}
              </Box>
            ))}
          </Box>
        )}
      </Container>
    </LabLayout>
  );
};

export default CosmicLab;
