import { Box, Container, Heading, Grid, VStack, Text, HStack, useColorModeValue, Icon, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState, useMemo } from "react";
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
import { SpaceBackground } from "./SpaceBackground";
import { FaRocket, FaSatellite, FaMeteor } from "react-icons/fa";
import { IoPlanet, IoTelescope } from "react-icons/io5";

// Import unified data sources
import { PROJECT_OVERRIDES, NEW_STATIC_PROJECTS } from "../data/projects";
import { PROJECT_DATES } from "../data/projectDates";

interface PortfolioCategoryProps {
  category: string;
}

const MotionBox = motion(Box);

export function PortfolioCategory({ category }: PortfolioCategoryProps) {
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const navigate = useNavigate();
  const { t, language } = useTranslation();
  const accentColor = useColorModeValue('blue.500', 'cyan.300');
  const rocketBg = useColorModeValue("blue.50", "whiteAlpha.100");

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

    filtered.sort((a, b) => {
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
  }, [allProjects, debouncedSearch, selectedTags, yearRange, sortBy, language]);

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
    itemsPerPage: 9,
    initialPage: 1,
  });

  const paginatedProjects = filteredProjects.slice(startIndex, endIndex);

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
      <SpaceBackground />
      <Container maxW="container.xl" py={20} position="relative" zIndex={1}>
        {/* Floating Planet Decorations */}
        <Box
          position="absolute"
          top="20px"
          left="-20px"
          opacity={0.15}
          animation="float 6s ease-in-out infinite"
          pointerEvents="none"
          zIndex={0}
        >
          <Icon as={IoPlanet} w={32} h={32} color="purple.500" />
        </Box>
        <Box
          position="absolute"
          top="150px"
          right="-10px"
          opacity={0.1}
          animation="float 8s ease-in-out infinite reverse"
          pointerEvents="none"
          zIndex={0}
        >
          <Icon as={FaSatellite} w={16} h={16} color="cyan.400" />
        </Box>

        {/* Meteor Shower Effect */}
        <Box position="absolute" top="300px" left="10%" opacity={0.05} transform="rotate(45deg)">
          <Icon as={FaMeteor} w={24} h={24} color="orange.300" />
        </Box>

        <VStack spacing={12} align="stretch" position="relative" zIndex={2}>
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

            <SimpleGrid columns={{ base: 2, md: 3 }} spacing={4} mt={8} maxW="3xl" mx="auto">
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

          {/* Advanced Filters */}
          <AdvancedFilters
            selectedTags={selectedTags}
            onTagsChange={setSelectedTags}
            availableTags={availableTags}
            yearRange={yearRange}
            onYearRangeChange={setYearRange}
            minYear={2014}
            maxYear={new Date().getFullYear() + 1}
            sortBy={sortBy}
            onSortChange={setSortBy}
            language={language}
          />

          {/* Projects Grid */}
          <AnimatePresence mode="wait">
            {paginatedProjects.length === 0 ? (
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
            ) : (
              <Grid
                key="grid"
                templateColumns={{
                  base: "repeat(1, 1fr)",
                  md: "repeat(2, 1fr)",
                  lg: "repeat(3, 1fr)",
                }}
                gap={8}
              >
                {paginatedProjects.map((project, index) => (
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
                    onClick={() => handleProjectClick(project.id)}
                    cursor="pointer"
                  >
                    <ProjectCard project={project} />
                  </MotionBox>
                ))}
              </Grid>
            )}
          </AnimatePresence>

          {/* Pagination */}
          {filteredProjects.length > 9 && (
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
                onItemsPerPageChange={setItemsPerPage}
                totalItems={filteredProjects.length}
              />
            </MotionBox>
          )}
        </VStack>
      </Container>
    </>
  );
}

// Helper Component for Stats
function StatBox({ label, value, icon }: { label: string, value: number, icon: any }) {
  const bg = useColorModeValue('white', 'whiteAlpha.50');
  const borderColor = useColorModeValue('gray.100', 'whiteAlpha.100');

  return (
    <HStack
      p={4}
      bg={bg}
      borderRadius="xl"
      borderWidth="1px"
      borderColor={borderColor}
      justify="space-between"
      boxShadow="sm"
      backdropFilter="blur(10px)"
    >
      <VStack align="start" spacing={0}>
        <Text fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" color="gray.500">
          {label}
        </Text>
        <Text fontSize="2xl" fontWeight="bold" bgGradient="linear(to-r, cyan.400, purple.500)" bgClip="text">
          {value}
        </Text>
      </VStack>
      <Icon as={icon} w={6} h={6} color="gray.400" />
    </HStack>
  )
}
