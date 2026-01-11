import { Box, Container, Heading, VStack, Text, HStack, useColorModeValue, Icon, SimpleGrid, Flex } from "@chakra-ui/react";
import { useEffect, useState, useMemo, useRef } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../config/firebase";
import { Project } from "../types";
import { UnderConstruction } from "./UnderConstruction";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { useTranslation } from "../i18n/useTranslation";
import { SearchBar } from "./SearchBar";
import { Pagination } from "./Pagination";
import { ProjectGridSkeleton } from "./LoadingSkeletons";
import { useDebounce } from "../hooks/useDebounce";
import { usePagination } from "../hooks/usePagination";
import { AdvancedFilters, SortOption } from "./AdvancedFilters";
import { FaRocket, FaSatellite, FaMeteor } from "react-icons/fa";
import { IoPlanet, IoTelescope } from "react-icons/io5";
import { IconType } from "react-icons";
import { LayoutSelector, PaginationModeSelector, ItemsPerPageSelector, SettingsPanel } from "./PortfolioControls";
import { FaCog } from "react-icons/fa";
import { IconButton } from "@chakra-ui/react";
import { usePortfolioSettings } from "../hooks/usePortfolioSettings";
import { useGamificationTracking } from "../hooks/useGamificationTracking";
import { InfiniteScroll } from "./InfiniteScroll";
import { ProjectListView, ProjectCompactView } from "./ProjectList";
import { useSpaceEasterEggs, EasterEggNotification } from "./EasterEggs/SpaceEasterEggs";
import { useAdditionalEasterEggs, AdditionalEasterEggNotification } from "./EasterEggs/AdditionalEasterEggs";
import { FloatingPlanets, FlyingRockets } from "./SpaceAnimations";

// Import unified data sources
import { PROJECT_OVERRIDES, NEW_STATIC_PROJECTS } from "../data/projects";
import { PROJECT_DATES } from "../data/projectDates";

interface PortfolioCategoryProps {
  category: string;
}

const MotionBox = motion(Box);

export function PortfolioCategory({ category }: PortfolioCategoryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(() => {
    // Mostrar featured por padrão na primeira visita
    const hasVisited = localStorage.getItem('portfolio-has-visited');
    if (!hasVisited) {
      localStorage.setItem('portfolio-has-visited', 'true');
      return true;
    }
    return false;
  });
  const navigate = useNavigate();
  const { t, language } = useTranslation();
  const { trackFilterUsage } = useGamificationTracking();
  const accentColor = useColorModeValue('blue.500', 'cyan.300');
  const rocketBg = useColorModeValue("blue.50", "whiteAlpha.100");
  
  const minYear = 2014;
  const maxYear = new Date().getFullYear() + 1;
  
  // Portfolio settings with localStorage persistence
  const { settings, updateSetting, resetSettings } = usePortfolioSettings();
  const [displayedProjects, setDisplayedProjects] = useState<Project[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  
  // Easter eggs
  const { activeEgg } = useSpaceEasterEggs(settings.easterEggsEnabled);
  const { activeEgg: additionalEgg } = useAdditionalEasterEggs(settings.easterEggsEnabled);

  // Debounce search for performance
  const debouncedSearch = useDebounce(searchTerm, 300);

  useEffect(() => {
    async function fetchProjects() {
      try {
        let fetchedProjects: Project[] = [];

        try {
          const projectsRef = collection(db, "projetos");
          const querySnapshot = await getDocs(projectsRef);
          fetchedProjects = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return { id: doc.id, ...data } as unknown as Project;
          });
        } catch (error) {
          console.log("Firestore offline/unavailable, using static data.");
        }

        const overridesList = Object.entries(PROJECT_OVERRIDES).map(([id, data]) => ({
          ...data,
          id,
          category: data.category || "development",
          createdAt: PROJECT_DATES[id] ? new Date(PROJECT_DATES[id]) : (data.createdAt || new Date()),
          updatedAt: new Date()
        } as Project));

        const staticList = NEW_STATIC_PROJECTS.map(p => ({
          ...p,
          createdAt: PROJECT_DATES[p.id] ? new Date(PROJECT_DATES[p.id]) : p.createdAt
        }));

        const mergedMap = new Map<string, Project>();
        fetchedProjects.forEach(p => mergedMap.set(p.id, p));
        staticList.forEach(p => mergedMap.set(p.id, p));
        overridesList.forEach(p => mergedMap.set(p.id, p));

        const combined = Array.from(mergedMap.values());
        const filtered = combined.filter(p => !category || p.category === category);

        setAllProjects(filtered);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, [category]);

  const projectYearRange = useMemo(() => {
    if (allProjects.length === 0) return [2018, new Date().getFullYear()];
    const years = allProjects.map(p => p.createdAt.getFullYear());
    return [Math.min(...years), Math.max(...years)];
  }, [allProjects]);

  const [yearRange, setYearRange] = useState<[number, number]>([2018, new Date().getFullYear()]);

  useEffect(() => {
    if (allProjects.length > 0) {
      setYearRange(projectYearRange as [number, number]);
    }
  }, [projectYearRange, allProjects.length]);

  const filteredProjects = useMemo(() => {
    let filtered = allProjects.filter(project => {
      // Filtro de featured
      if (showFeaturedOnly && !project.featured) {
        return false;
      }

      const matchesSearch = !debouncedSearch ||
        project.title[language].toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        project.description[language].toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        (project.tags && project.tags.some(tag => tag.toLowerCase().includes(debouncedSearch.toLowerCase())));

      const matchesTags = selectedTags.length === 0 ||
        (project.tags && selectedTags.every(tag => project.tags?.includes(tag)));

      const projectYear = project.createdAt.getFullYear();
      const matchesYear = projectYear >= yearRange[0] && projectYear <= yearRange[1];

      return matchesSearch && matchesTags && matchesYear;
    });

    // Ordenar: featured primeiro, depois pelo sortBy
    filtered.sort((a, b) => {
      // Sempre colocar featured primeiro
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      
      // Se ambos são featured ou ambos não são, usar sortBy
      switch (sortBy) {
        case 'newest':
          return b.createdAt.getTime() - a.createdAt.getTime();
        case 'oldest':
          return a.createdAt.getTime() - b.createdAt.getTime();
        case 'name':
          return a.title[language].localeCompare(b.title[language]);
        default:
          return 0;
      }
    });

    return filtered;
  }, [allProjects, debouncedSearch, selectedTags, yearRange, sortBy, language, showFeaturedOnly]);

  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    allProjects.forEach(project => {
      project.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [allProjects]);

  const {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    goToPage,
    setItemsPerPage,
    itemsPerPage,
  } = usePagination({
    totalItems: filteredProjects.length,
    itemsPerPage: settings.itemsPerPage,
    initialPage: 1,
    scrollContainerRef: containerRef,
  });

  // Note: itemsPerPage is synced via usePagination hook's internal useEffect

  // Reset pagination when filters change (only for paged mode)
  useEffect(() => {
    if (settings.paginationMode === 'paged' && currentPage !== 1) {
      goToPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, selectedTags, yearRange, sortBy, showFeaturedOnly]);

  // Handle displayed projects based on pagination mode
  useEffect(() => {
    if (settings.paginationMode === 'infinite') {
      // Infinite scroll mode: show initial items
      const initialCount = settings.itemsPerPage;
      setDisplayedProjects(filteredProjects.slice(0, initialCount));
    } else {
      // Paged mode: show items for current page
      if (filteredProjects.length > 0) {
        const newProjects = filteredProjects.slice(startIndex, endIndex);
        setDisplayedProjects(newProjects);
      } else {
        setDisplayedProjects([]);
      }
    }
  }, [filteredProjects, settings.paginationMode, settings.itemsPerPage, startIndex, endIndex, currentPage]);

  // Reset displayed projects when switching pagination modes
  useEffect(() => {
    if (settings.paginationMode === 'infinite') {
      const initialCount = settings.itemsPerPage;
      setDisplayedProjects(filteredProjects.slice(0, initialCount));
    } else if (settings.paginationMode === 'paged') {
      goToPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.paginationMode]);

  const handleLoadMore = () => {
    if (isLoadingMore || displayedProjects.length >= filteredProjects.length || settings.paginationMode !== 'infinite') return;
    
    setIsLoadingMore(true);
    setTimeout(() => {
      const nextCount = displayedProjects.length + settings.itemsPerPage;
      setDisplayedProjects(filteredProjects.slice(0, nextCount));
      setIsLoadingMore(false);
    }, 300);
  };

  const hasMore = displayedProjects.length < filteredProjects.length;

  const handleProjectClick = (projectId: string) => {
    navigate(`/portfolio/${category}/${projectId}`);
  };

  if (category === "design" || category === "social-media") {
    return <UnderConstruction />;
  }

  if (loading) {
    return (
      <Container maxW="container.xl" py={20}>
        <ProjectGridSkeleton count={9} />
      </Container>
    );
  }

  return (
    <>
      {settings.showAnimations && (
        <>
          <FloatingPlanets />
          <FlyingRockets />
        </>
      )}
      <Container ref={containerRef} maxW="container.xl" py={{ base: 12, md: 20 }} px={{ base: 4, md: 6 }} position="relative" zIndex={1}>
        {/* Floating Planet Decorations - Hidden on mobile */}
        <Box
          position="absolute"
          top="20px"
          left="-20px"
          opacity={0.15}
          animation="float 6s ease-in-out infinite"
          pointerEvents="none"
          zIndex={0}
          display={{ base: "none", lg: "block" }}
        >
          <Icon as={IoPlanet} w={{ base: 20, md: 32 }} h={{ base: 20, md: 32 }} color="purple.500" />
        </Box>
        <Box
          position="absolute"
          top="150px"
          right="-10px"
          opacity={0.1}
          animation="float 8s ease-in-out infinite reverse"
          pointerEvents="none"
          zIndex={0}
          display={{ base: "none", md: "block" }}
        >
          <Icon as={FaSatellite} w={{ base: 12, md: 16 }} h={{ base: 12, md: 16 }} color="cyan.400" />
        </Box>

        {/* Meteor Shower Effect - Hidden on mobile */}
        <Box 
          position="absolute" 
          top="300px" 
          left="10%" 
          opacity={0.05} 
          transform="rotate(45deg)"
          display={{ base: "none", xl: "block" }}
        >
          <Icon as={FaMeteor} w={{ base: 16, md: 24 }} h={{ base: 16, md: 24 }} color="orange.300" />
        </Box>

        <VStack spacing={{ base: 8, md: 12 }} align="stretch" position="relative" zIndex={2}>
          {/* Header */}
          <MotionBox
            textAlign="center"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <VStack spacing={4}>
              <Box
                p={4}
                borderRadius="full"
                bg={rocketBg}
                boxShadow="0 0 20px rgba(66, 153, 225, 0.3)"
                position="relative"
              >
                <Icon as={FaRocket} w={12} h={12} color={accentColor} />
                {/* Rocket exhaust effect */}
                <Box
                  position="absolute" bottom="-10px" left="50%" transform="translateX(-50%)"
                  w="20px" h="20px" bg="orange.400" filter="blur(10px)" opacity={0.6} borderRadius="full"
                />
              </Box>

              <VStack spacing={1}>
                <Heading
                  size="2xl"
                  bgGradient="linear(to-r, cyan.400, blue.500, purple.600)"
                  bgClip="text"
                  fontWeight="extrabold"
                  letterSpacing="tight"
                >
                  {t('projects.title') || "Portfólio & Cases"}
                </Heading>
                <Text color="gray.500" fontSize="lg" maxW="2xl">
                  {language === 'pt' ? 'Explore o universo de soluções desenvolvidas através do tempo.' : 'Explore the universe of solutions developed through time.'}
                </Text>
              </VStack>
            </VStack>

            <SimpleGrid columns={{ base: 1, sm: 3 }} spacing={{ base: 3, md: 4 }} mt={{ base: 6, md: 8 }} maxW="3xl" mx="auto" w="full">
              <StatBox label={language === 'pt' ? 'Descobertas' : 'Discoveries'} value={allProjects.length} icon={IoPlanet} />
              <StatBox label={language === 'pt' ? 'Visíveis' : 'Visible'} value={filteredProjects.length} icon={IoTelescope} />
              <StatBox label={language === 'pt' ? 'Tecnologias' : 'Technologies'} value={availableTags.length} icon={FaSatellite} />
            </SimpleGrid>
          </MotionBox>

          {/* Search Bar */}
          <MotionBox
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder={language === 'pt' ? '🔭 Explorar projetos, stacks ou constelações...' : '🔭 Explore projects, stacks or constellations...'}
            />
          </MotionBox>

          {/* Portfolio Controls */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Flex
              direction={{ base: 'column', md: 'row' }}
              gap={4}
              align={{ base: 'stretch', md: 'center' }}
              justify="space-between"
              wrap="wrap"
            >
              <HStack spacing={4} flexWrap="wrap">
                <LayoutSelector
                  layout={settings.layout}
                  onChange={(layout) => updateSetting('layout', layout)}
                />
                <PaginationModeSelector
                  mode={settings.paginationMode}
                  onChange={(mode) => {
                    updateSetting('paginationMode', mode);
                    // Reset to page 1 when switching modes
                    if (mode === 'paged') {
                      goToPage(1);
                    } else {
                      setDisplayedProjects(filteredProjects.slice(0, settings.itemsPerPage));
                    }
                  }}
                />
                <ItemsPerPageSelector
                  value={settings.itemsPerPage}
                  onChange={(value) => {
                    updateSetting('itemsPerPage', value);
                    setItemsPerPage(value);
                  }}
                />
                <IconButton
                  aria-label="Configurações"
                  icon={<FaCog />}
                  onClick={() => setSettingsOpen(true)}
                  variant="ghost"
                  colorScheme="blue"
                  size="md"
                />
              </HStack>
            </Flex>
          </MotionBox>

          {/* Advanced Filters */}
          <AdvancedFilters
            selectedTags={selectedTags}
            onTagsChange={(tags) => {
              setSelectedTags(tags);
              if (tags.length > 0) trackFilterUsage();
            }}
            availableTags={availableTags}
            yearRange={yearRange}
            onYearRangeChange={(range) => {
              setYearRange(range);
              if (range[0] !== minYear || range[1] !== maxYear) trackFilterUsage();
            }}
            minYear={2014}
            maxYear={new Date().getFullYear() + 1}
            sortBy={sortBy}
            onSortChange={(sort) => {
              setSortBy(sort);
              trackFilterUsage();
            }}
            language={language}
            showFeaturedOnly={showFeaturedOnly}
            onFeaturedOnlyChange={setShowFeaturedOnly}
          />

          {/* Projects Display - Dynamic Layout */}
          <AnimatePresence mode="wait">
            {displayedProjects.length === 0 ? (
              <MotionBox
                key="empty"
                textAlign="center"
                py={20}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <VStack spacing={4}>
                  <Icon as={IoTelescope} w={24} h={24} color="gray.600" />
                  <Heading size="md" color="gray.500">
                    {language === 'pt' ? 'O radar não detectou objetos neste setor.' : 'Radar detected no objects in this sector.'}
                  </Heading>
                  <Text color="gray.400">
                    {language === 'pt' ? 'Tente ajustar suas coordenadas de busca.' : 'Try adjusting your search coordinates.'}
                  </Text>
                </VStack>
              </MotionBox>
            ) : settings.layout === 'list' ? (
              <InfiniteScroll
                key="list"
                hasMore={hasMore && settings.paginationMode === 'infinite'}
                isLoading={isLoadingMore}
                onLoadMore={handleLoadMore}
              >
                <VStack spacing={4} align="stretch">
                  {displayedProjects.map((project, index) => (
                    <MotionBox
                      key={project.id}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.05,
                        ease: "easeOut"
                      }}
                    >
                      <ProjectListView
                        project={project}
                        onViewDetails={(p) => handleProjectClick(p.id)}
                        language={language}
                      />
                    </MotionBox>
                  ))}
                </VStack>
              </InfiniteScroll>
            ) : settings.layout === 'compact' ? (
              <InfiniteScroll
                key="compact"
                hasMore={hasMore && settings.paginationMode === 'infinite'}
                isLoading={isLoadingMore}
                onLoadMore={handleLoadMore}
              >
                <SimpleGrid
                  columns={{ base: 2, sm: 2, md: 3, lg: 4, xl: 5 }}
                  spacing={{ base: 3, md: 4 }}
                  w="100%"
                >
                  {displayedProjects.map((project, index) => (
                    <MotionBox
                      key={project.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.03,
                        ease: "easeOut"
                      }}
                    >
                      <ProjectCompactView
                        project={project}
                        onViewDetails={(p) => handleProjectClick(p.id)}
                        language={language}
                      />
                    </MotionBox>
                  ))}
                </SimpleGrid>
              </InfiniteScroll>
            ) : (
              <InfiniteScroll
                key="grid"
                hasMore={hasMore && settings.paginationMode === 'infinite'}
                isLoading={isLoadingMore}
                onLoadMore={handleLoadMore}
              >
                <SimpleGrid
                  columns={{ base: 1, sm: 2, lg: 3 }}
                  spacing={{ base: 6, md: 8 }}
                  w="100%"
                >
                  {displayedProjects.map((project, index) => (
                    <MotionBox
                      key={project.id}
                      layoutId={project.id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.05,
                        ease: "easeOut"
                      }}
                      whileHover={{
                        y: -10,
                        zIndex: 10,
                        transition: { duration: 0.2 }
                      }}
                      cursor="pointer"
                    >
                      <ProjectCard 
                        project={project} 
                        onViewDetails={(p) => handleProjectClick(p.id)}
                      />
                    </MotionBox>
                  ))}
                </SimpleGrid>
              </InfiniteScroll>
            )}
          </AnimatePresence>

          {/* Pagination - Only show for paged mode */}
          {settings.paginationMode === 'paged' && filteredProjects.length > settings.itemsPerPage && (
            <MotionBox
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={goToPage}
                itemsPerPage={itemsPerPage}
                onItemsPerPageChange={(value) => {
                  setItemsPerPage(value);
                  updateSetting('itemsPerPage', value);
                }}
                totalItems={filteredProjects.length}
              />
            </MotionBox>
          )}
        </VStack>
      </Container>
      
      {/* Easter Egg Notifications */}
      <EasterEggNotification egg={activeEgg} />
      <AdditionalEasterEggNotification egg={additionalEgg} />
      
      {/* Settings Panel */}
      <SettingsPanel
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        settings={settings}
        onUpdate={(key, value) => updateSetting(key, value)}
        onReset={resetSettings}
      />
    </>
  );
}

// Helper Component for Stats
function StatBox({ label, value, icon, color }: { label: string, value: number, icon: IconType, color?: string }) {
  const bg = useColorModeValue('white', 'whiteAlpha.50');
  const borderColor = useColorModeValue('gray.100', 'whiteAlpha.100');
  const iconColor = color || 'gray.400';

  return (
    <HStack
      p={{ base: 3, md: 4 }}
      bg={bg}
      borderRadius="xl"
      borderWidth="1px"
      borderColor={borderColor}
      justify="space-between"
      boxShadow="sm"
      backdropFilter="blur(10px)"
      w="full"
    >
      <VStack align="start" spacing={0} flex={1}>
        <Text fontSize={{ base: "2xs", md: "xs" }} fontWeight="bold" textTransform="uppercase" letterSpacing="wider" color="gray.500">
          {label}
        </Text>
        <Text 
          fontSize={{ base: "xl", md: "2xl" }}
          fontWeight="bold" 
          bgGradient={color ? `linear(to-r, ${color}, ${color})` : "linear(to-r, cyan.400, purple.500)"} 
          bgClip="text"
        >
          {value}
        </Text>
      </VStack>
      <Icon as={icon} w={{ base: 5, md: 6 }} h={{ base: 5, md: 6 }} color={iconColor} />
    </HStack>
  )
}
