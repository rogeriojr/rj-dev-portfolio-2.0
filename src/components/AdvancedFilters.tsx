import {
  Box,
  HStack,
  Text,
  VStack,
  Wrap,
  WrapItem,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Button,
  Select,
  Icon,
  useColorModeValue,
  Tag,
  TagLabel,
  TagCloseButton,
  Tooltip, 
  SimpleGrid,
  Collapse,
  useDisclosure,
  IconButton,
  Switch,
  FormControl,
  FormLabel
} from "@chakra-ui/react";
import { FaGlobeAmericas, FaMoon, FaRocket, FaSatelliteDish, FaChevronDown, FaChevronUp, FaSignal, FaStar } from "react-icons/fa";
import { IoTelescope } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

export type SortOption = 'newest' | 'oldest' | 'name';

interface AdvancedFiltersProps {
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  availableTags: string[];
  yearRange: [number, number];
  onYearRangeChange: (range: [number, number]) => void;
  minYear: number;
  maxYear: number;
  sortBy: SortOption;
  onSortChange: (option: SortOption) => void;
  language: 'pt' | 'en';
  showFeaturedOnly?: boolean;
  onFeaturedOnlyChange?: (show: boolean) => void;
}

const MotionTag = motion(Tag);

export function AdvancedFilters({
  selectedTags,
  onTagsChange,
  availableTags,
  yearRange,
  onYearRangeChange,
  minYear,
  maxYear,
  sortBy,
  onSortChange,
  language,
  showFeaturedOnly = false,
  onFeaturedOnlyChange
}: AdvancedFiltersProps) {

  const boxBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.200');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: false });

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter(t => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  const clearFilters = () => {
    onTagsChange([]);
    onYearRangeChange([minYear, maxYear]);
    onSortChange('newest');
  };

  const tagsToShow = isOpen ? availableTags : (selectedTags.length > 0 ? selectedTags : availableTags.slice(0, 8));

  return (
    <Box
      bg={boxBg}
      p={{ base: 4, md: 6 }}
      borderRadius="2xl"
      borderWidth="1px"
      borderColor={borderColor}
      boxShadow="xl"
      backdropFilter="blur(16px)"
      backgroundColor={useColorModeValue('rgba(255, 255, 255, 0.9)', 'rgba(13, 16, 23, 0.9)')}
      position="relative"
      overflow="hidden"
    >
      <Box position="absolute" top="0" left="0" w="100%" h="2px" bgGradient="linear(to-r, transparent, cyan.500, transparent)" opacity={0.5} />
      <Box position="absolute" bottom="0" right="0" w="100%" h="2px" bgGradient="linear(to-r, transparent, purple.500, transparent)" opacity={0.5} />

      <VStack spacing={{ base: 4, md: 6, lg: 8 }} align="stretch" position="relative" zIndex={1}>

        {onFeaturedOnlyChange && (
          <Box
            p={{ base: 3, md: 4 }}
            borderRadius="xl"
            bgGradient={showFeaturedOnly 
              ? "linear(to-r, yellow.400, orange.500)" 
              : useColorModeValue("gray.100", "whiteAlpha.100")}
            borderWidth="2px"
            borderColor={showFeaturedOnly ? "orange.400" : borderColor}
            boxShadow={showFeaturedOnly ? "0 0 20px rgba(236, 201, 75, 0.4)" : "none"}
            transition="all 0.3s"
          >
            <FormControl display="flex" alignItems="center" justifyContent="space-between" flexDirection={{ base: "column", sm: "row" }} gap={{ base: 2, sm: 0 }}>
              <HStack spacing={{ base: 2, md: 3 }} flex={1}>
                <Icon 
                  as={FaStar} 
                  color={showFeaturedOnly ? "white" : "yellow.400"} 
                  w={{ base: 4, md: 5 }}
                  h={{ base: 4, md: 5 }}
                  filter={showFeaturedOnly ? "drop-shadow(0 0 8px rgba(255,255,255,0.8))" : "none"}
                />
                <FormLabel 
                  htmlFor="featured-filter" 
                  mb={0} 
                  fontWeight="bold"
                  color={showFeaturedOnly ? "white" : textColor}
                  fontSize={{ base: "sm", md: "md" }}
                  cursor="pointer"
                  whiteSpace={{ base: "normal", sm: "nowrap" }}
                >
                  {language === 'pt' ? 'Apenas Projetos em Destaque' : 'Featured Projects Only'}
                </FormLabel>
              </HStack>
              <Switch
                id="featured-filter"
                isChecked={showFeaturedOnly}
                onChange={(e) => onFeaturedOnlyChange(e.target.checked)}
                colorScheme="orange"
                size={{ base: "md", md: "lg" }}
              />
            </FormControl>
            {showFeaturedOnly && (
              <Text fontSize={{ base: "2xs", md: "xs" }} color="white" mt={2} opacity={0.9}>
                {language === 'pt' 
                  ? 'Mostrando apenas projetos destacados para recrutadores' 
                  : 'Showing only featured projects for recruiters'}
              </Text>
            )}
          </Box>
        )}

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 4, md: 6, lg: 8 }} alignItems="center">
          <Box id="star-chronology">
            <HStack justify="space-between" mb={{ base: 3, md: 4 }} flexWrap="wrap" gap={2}>
              <HStack spacing={2}>
                <Icon as={IoTelescope} color="cyan.400" w={{ base: 4, md: 5 }} h={{ base: 4, md: 5 }} />
                <Text fontWeight="bold" fontSize={{ base: "xs", md: "sm" }} color={textColor} letterSpacing="wide" textTransform="uppercase">
                  {language === 'pt' ? 'Cronologia Estelar' : 'Star Chronology'}
                </Text>
              </HStack>
              <Tag size={{ base: "xs", md: "sm" }} colorScheme="purple" variant="solid" borderRadius="full" fontSize={{ base: "xs", md: "sm" }}>
                {yearRange[0]} - {yearRange[1]}
              </Tag>
            </HStack>

            <Box px={2}>
              <RangeSlider
                aria-label={['ano-inicio', 'ano-fim']}
                min={minYear}
                max={maxYear}
                step={1}
                value={yearRange}
                onChange={(val) => onYearRangeChange(val as [number, number])}
                colorScheme="purple"
                mt={2}
                mb={4}
              >
                <RangeSliderTrack bg={useColorModeValue("gray.200", "whiteAlpha.100")} h={2} borderRadius="full">
                  <RangeSliderFilledTrack bgGradient="linear(to-r, cyan.400, purple.500, pink.500)" />
                </RangeSliderTrack>

                <RangeSliderThumb index={0} boxSize={8} bg="transparent" boxShadow="none" zIndex={2}>
                  <Tooltip label={yearRange[0].toString()} placement="top" hasArrow bg="blue.600">
                    <Box w="100%" h="100%" transition="transform 0.2s" _hover={{ transform: 'scale(1.2)' }}>
                      <Icon
                        as={FaGlobeAmericas}
                        color="cyan.400"
                        w="100%" h="100%"
                        filter="drop-shadow(0 0 4px rgba(0, 255, 255, 0.4))"
                      />
                    </Box>
                  </Tooltip>
                </RangeSliderThumb>

                <RangeSliderThumb index={1} boxSize={8} bg="transparent" boxShadow="none" zIndex={2}>
                  <Tooltip label={yearRange[1].toString()} placement="top" hasArrow bg="pink.600">
                    <Box w="100%" h="100%" transition="transform 0.2s" _hover={{ transform: 'rotate(45deg) scale(1.2)' }}>
                      <Icon
                        as={FaRocket}
                        color="pink.400"
                        w="100%" h="100%"
                        transform="rotate(45deg)"
                        filter="drop-shadow(0 0 8px rgba(236, 72, 153, 0.6))"
                      />
                    </Box>
                  </Tooltip>
                </RangeSliderThumb>
              </RangeSlider>

              <HStack justify="space-between" color="gray.500" fontSize={{ base: "2xs", md: "xs" }} mt={-2} flexWrap="wrap" gap={1}>
                <Text>{minYear} ({language === 'pt' ? 'Origem' : 'Origin'})</Text>
                <HStack spacing={1}>
                  <Icon as={FaMoon} boxSize={{ base: 2.5, md: 3 }} />
                  <Text>{language === 'pt' ? 'Presente' : 'Today'}</Text>
                </HStack>
              </HStack>
            </Box>
          </Box>

          <Box>
            <HStack mb={2} spacing={2}>
              <Icon as={FaSignal} color="green.400" w={{ base: 4, md: 5 }} h={{ base: 4, md: 5 }} />
              <Text fontWeight="bold" fontSize={{ base: "xs", md: "sm" }} color="gray.500" letterSpacing="wide" textTransform="uppercase">
                {language === 'pt' ? 'Prioridade da Missão' : 'Mission Priority'}
              </Text>
            </HStack>
            <Select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              size={{ base: "sm", md: "md" }}
              borderRadius="lg"
              variant="filled"
              bg={useColorModeValue('gray.100', 'whiteAlpha.100')}
              fontSize={{ base: "sm", md: "md" }}
              _focus={{ borderColor: "purple.400" }}
            >
              <option value="newest">{language === 'pt' ? '📅 Mais Recentes (Lançamentos)' : '📅 Newest (Launches)'}</option>
              <option value="oldest">{language === 'pt' ? '📜 Mais Antigos (Legacy)' : '📜 Oldest (Legacy)'}</option>
              <option value="name">{language === 'pt' ? '🔤 Nome (A-Z)' : '🔤 Name (A-Z)'}</option>
            </Select>
          </Box>
        </SimpleGrid>

        <Box
          id="tech-scanner"
          borderWidth="1px"
          borderColor={useColorModeValue("gray.200", "whiteAlpha.100")}
          borderRadius="xl"
          p={4}
          bg={useColorModeValue("gray.50", "blackAlpha.200")}
          position="relative"
          _before={{
            content: '""',
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            borderRadius: 'xl',
            boxShadow: isOpen ? "0 0 20px rgba(0, 255, 255, 0.1)" : "none",
            pointerEvents: 'none',
            transition: "all 0.3s"
          }}
        >
          <HStack justify="space-between" mb={{ base: 3, md: 4 }} cursor="pointer" onClick={onToggle} flexWrap="wrap" gap={2}>
            <HStack spacing={2} flexWrap="wrap">
              <Icon
                as={FaSatelliteDish}
                color={isOpen ? "green.400" : "gray.400"}
                animation={isOpen ? "pulse 2s infinite" : "none"}
                transform={isOpen ? "rotate(-15deg)" : "rotate(0)"}
                transition="transform 0.3s"
                w={{ base: 4, md: 5 }}
                h={{ base: 4, md: 5 }}
              />
              <Text fontWeight="bold" fontSize={{ base: "xs", md: "sm" }} textTransform="uppercase" letterSpacing="wider">
                {language === 'pt' ? 'Scanner de Tecnologias' : 'Tech Scanner'}
              </Text>
              <Tag size={{ base: "xs", md: "sm" }} colorScheme={selectedTags.length > 0 ? "green" : "gray"} variant="subtle" fontSize={{ base: "2xs", md: "xs" }}>
                {selectedTags.length > 0 ? `${selectedTags.length} ${language === 'pt' ? 'Sinais Ativos' : 'Active Signals'}` : 'Standby'}
              </Tag>
            </HStack>
            <IconButton
              aria-label="Toggle Radar"
              icon={isOpen ? <FaChevronUp /> : <FaChevronDown />}
              size={{ base: "md", md: "sm" }}
              minW={{ base: "44px", md: "auto" }}
              minH={{ base: "44px", md: "auto" }}
              variant="ghost"
              rounded="full"
              _active={{ transform: "scale(0.9)" }}
            />
          </HStack>

          <Collapse in={isOpen} animateOpacity startingHeight={40}>
            <Wrap spacing={{ base: 2, md: 3 }}>
              <AnimatePresence>
                {tagsToShow.map(tag => (
                  <WrapItem key={tag}>
                    <MotionTag
                      layout
                      size={{ base: "sm", md: "md" }}
                      variant={selectedTags.includes(tag) ? 'solid' : 'outline'}
                      colorScheme={selectedTags.includes(tag) ? "cyan" : "gray"}
                      cursor="pointer"
                      onClick={() => toggleTag(tag)}
                      whileHover={{ scale: 1.1, boxShadow: "0 0 8px cyan" }}
                      whileTap={{ scale: 0.95 }}
                      borderRadius="md"
                      border="1px solid"
                      borderColor={selectedTags.includes(tag) ? "cyan.400" : "gray.600"}
                      opacity={!isOpen && !selectedTags.includes(tag) ? 0.6 : 1}
                      transition="all 0.2s"
                      px={{ base: 2.5, md: 3 }}
                      py={{ base: 1.5, md: 2 }}
                      fontSize={{ base: "xs", md: "sm" }}
                    >
                      <TagLabel wordBreak="break-word">{tag}</TagLabel>
                      {selectedTags.includes(tag) && <TagCloseButton onClick={(e) => { e.stopPropagation(); toggleTag(tag); }} />}
                    </MotionTag>
                  </WrapItem>
                ))}
              </AnimatePresence>
            </Wrap>
          </Collapse>

          {!isOpen && availableTags.length > 8 && (
            <Text fontSize={{ base: "2xs", md: "xs" }} color="gray.500" mt={2} textAlign="center" cursor="pointer" onClick={onToggle} _hover={{ color: "cyan.400" }}>
              +{availableTags.length - 8} {language === 'pt' ? 'sinais ocultos... (Clique para expandir o espectro)' : 'hidden signals... (Click to expand spectrum)'}
            </Text>
          )}

        </Box>

        {(selectedTags.length > 0 || yearRange[0] !== minYear || yearRange[1] !== maxYear) && (
          <Button
            size={{ base: "sm", md: "sm" }}
            variant="ghost"
            colorScheme="red"
            onClick={clearFilters}
            leftIcon={<Icon as={FaRocket} transform="rotate(180deg)" w={{ base: 3, md: 4 }} h={{ base: 3, md: 4 }} />}
            alignSelf={{ base: "stretch", sm: "flex-end" }}
            minH={{ base: "44px", md: "auto" }}
            fontSize={{ base: "xs", md: "sm" }}
            _hover={{ bg: "red.50", color: "red.600" }}
            _active={{ transform: "scale(0.95)" }}
          >
            {language === 'pt' ? 'Abortar Filtros' : 'Abort Filters'}
          </Button>
        )}

      </VStack>
    </Box>
  );
}
