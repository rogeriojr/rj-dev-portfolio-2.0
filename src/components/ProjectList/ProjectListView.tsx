import { VStack, HStack, Box, Text, Heading, Badge, IconButton, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Project } from "../../types";
import { FaExternalLinkAlt, FaInfoCircle } from "react-icons/fa";
import { LazyImage } from "../LazyImage";
import { memo } from "react";

const MotionBox = motion(Box);

interface ProjectListViewProps {
  project: Project;
  onViewDetails: (project: Project) => void;
  language: string;
}

const ProjectListViewComponent = ({ project, onViewDetails, language }: ProjectListViewProps) => {
  const projectsWithDarkBg = ['portaltempoderquemage', 'neoidea', 'calculadora', 'bevaswm'];
  const needsDarkBg = projectsWithDarkBg.some(id => project.id.toLowerCase().includes(id.toLowerCase()));
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');
  const featuredBg = useColorModeValue('yellow.50', 'yellow.900');
  const featuredBorder = useColorModeValue('yellow.400', 'yellow.500');
  const featuredGlow = 'rgba(236, 201, 75, 0.4)';

  return (
    <MotionBox
      bg={project.featured ? featuredBg : bg}
      borderWidth={project.featured ? "2px" : "1px"}
      borderColor={project.featured ? featuredBorder : borderColor}
      borderRadius="xl"
      p={6}
      position="relative"
      _hover={{ 
        bg: project.featured ? featuredBg : hoverBg, 
        borderColor: project.featured ? 'yellow.300' : 'blue.400',
        boxShadow: project.featured ? `0 0 20px ${featuredGlow}` : 'md'
      }}
      boxShadow={project.featured ? `0 0 15px ${featuredGlow}` : 'none'}
      transition="all 0.2s"
      cursor="pointer"
      onClick={() => onViewDetails(project)}
      whileHover={{ scale: project.featured ? 1.03 : 1.02, x: 5 }}
      whileTap={{ scale: 0.98 }}
      w="100%"
      minH="200px"
      _before={project.featured ? {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at top right, rgba(236, 201, 75, 0.1), transparent 50%)',
        borderRadius: 'xl',
        pointerEvents: 'none',
        zIndex: 0
      } : {}}
    >
      <HStack spacing={6} align="start" position="relative" zIndex={1}>
        <Box
          w="180px"
          h="180px"
          minW="180px"
          maxW="180px"
          borderRadius="lg"
          overflow="hidden"
          flexShrink={0}
          bg={needsDarkBg ? 'gray.900' : useColorModeValue('white', 'gray.800')}
          display="flex"
          alignItems="center"
          justifyContent="center"
          border={project.featured ? "2px solid" : "1px solid"}
          borderColor={project.featured ? featuredBorder : useColorModeValue('gray.200', 'gray.700')}
          position="relative"
          boxShadow={project.featured ? `0 0 10px ${featuredGlow}` : 'none'}
        >
          {project.featured && (
            <Box
              position="absolute"
              top={2}
              right={2}
              zIndex={10}
              bgGradient="linear(to-r, yellow.400, orange.500)"
              borderRadius="full"
              px={2}
              py={1}
              boxShadow="0 0 10px rgba(236, 201, 75, 0.6)"
            >
              <Text fontSize="2xs" fontWeight="bold" color="white" letterSpacing="wide">
                {language === 'pt' ? 'DESTAQUE' : 'FEATURED'}
              </Text>
            </Box>
          )}
          {!project.featured && (
            <Badge
              position="absolute"
              top={2}
              right={2}
              zIndex={10}
              colorScheme="blue"
              borderRadius="full"
              px={2}
              py={0.5}
              fontSize="2xs"
              textTransform="uppercase"
              fontWeight="bold"
            >
              {project.category || 'Development'}
            </Badge>
          )}
          <Box
            w="100%"
            h="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            p={4}
          >
            <LazyImage
              src={project.images?.[0] || '/assets/projects/placeholder.png'}
              alt={project.title[language as 'pt' | 'en']}
              width="calc(100% - 32px)"
              height="calc(100% - 32px)"
              objectFit="contain"
            />
          </Box>
        </Box>
        
        <VStack align="start" flex={1} spacing={3} minW={0}>
          <HStack justify="space-between" w="100%" align="start" flexWrap="wrap" gap={2}>
            <Heading 
              size="md" 
              color={project.featured ? useColorModeValue('yellow.800', 'yellow.200') : useColorModeValue('gray.800', 'white')}
              flex={1}
              minW={0}
              wordBreak="break-word"
            >
              {project.title[language as 'pt' | 'en']}
            </Heading>
          </HStack>
          
          <Text
            color={useColorModeValue('gray.600', 'gray.300')}
            noOfLines={3}
            fontSize="sm"
            lineHeight="tall"
            wordBreak="break-word"
          >
            {project.description[language as 'pt' | 'en']}
          </Text>
          
          {project.tags && project.tags.length > 0 && (
            <Box w="100%">
              <HStack wrap="wrap" spacing={2} align="start" gap={1}>
                {project.tags.map((tag, idx) => (
                  <Badge 
                    key={idx} 
                    colorScheme="cyan" 
                    variant="subtle" 
                    fontSize="xs"
                    px={2.5}
                    py={0.5}
                    borderRadius="full"
                    whiteSpace="nowrap"
                    maxW="100%"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    mb={0.5}
                  >
                    {tag}
                  </Badge>
                ))}
              </HStack>
            </Box>
          )}
          
          <HStack spacing={2} mt="auto">
            {project.links && project.links.length > 0 && (
              <IconButton
                aria-label="Ver projeto"
                icon={<FaExternalLinkAlt />}
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(project.links![0].url, '_blank');
                }}
              />
            )}
            <IconButton
              aria-label="Ver detalhes"
              icon={<FaInfoCircle />}
              size="sm"
              colorScheme="blue"
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(project);
              }}
            />
          </HStack>
        </VStack>
      </HStack>
    </MotionBox>
  );
};

export const ProjectListView = memo(ProjectListViewComponent);
