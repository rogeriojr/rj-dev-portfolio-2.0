import { Box, Text, Heading, Badge, useColorModeValue, VStack, HStack, Icon } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Project } from "../../types";
import { FaStar } from "react-icons/fa";
import { LazyImage } from "../LazyImage";
import { memo } from "react";

const MotionBox = motion(Box);

interface ProjectCompactViewProps {
  project: Project;
  onViewDetails: (project: Project) => void;
  language: string;
}

const ProjectCompactViewComponent = ({ project, onViewDetails, language }: ProjectCompactViewProps) => {
  const projectsWithDarkBg = ['portaltempoderquemage', 'neoidea', 'calculadora', 'bevaswm'];
  const projectsWithWhiteBg = ['metaway'];
  const needsDarkBg = projectsWithDarkBg.some(id => project.id.toLowerCase().includes(id.toLowerCase()));
  const needsWhiteBg = projectsWithWhiteBg.some(id => project.id.toLowerCase().includes(id.toLowerCase()));
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const hoverBg = useColorModeValue('blue.50', 'gray.700');
  const featuredBg = useColorModeValue('yellow.50', 'yellow.900');
  const featuredBorder = useColorModeValue('yellow.400', 'yellow.500');
  const featuredGlow = 'rgba(236, 201, 75, 0.4)';

  return (
    <MotionBox
      bg={project.featured ? featuredBg : bg}
      borderWidth={project.featured ? "2px" : "1px"}
      borderColor={project.featured ? featuredBorder : borderColor}
      borderRadius="lg"
      overflow="hidden"
      cursor="pointer"
      onClick={() => onViewDetails(project)}
      whileHover={{ scale: project.featured ? 1.08 : 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      transition="all 0.2s"
      _hover={{ 
        borderColor: project.featured ? 'yellow.300' : 'blue.400', 
        bg: project.featured ? featuredBg : hoverBg,
        boxShadow: project.featured ? `0 0 20px ${featuredGlow}` : 'md'
      }}
      boxShadow={project.featured ? `0 0 15px ${featuredGlow}` : 'none'}
      h="100%"
      minH="280px"
      maxH="320px"
      display="flex"
      flexDirection="column"
      w="100%"
      position="relative"
      _before={project.featured ? {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at top right, rgba(236, 201, 75, 0.15), transparent 50%)',
        pointerEvents: 'none',
        zIndex: 0
      } : {}}
    >
      <Box 
        position="relative" 
        h="140px"
        minH="140px"
        maxH="140px"
        bg={needsDarkBg ? 'gray.900' : needsWhiteBg ? 'white' : useColorModeValue('white', 'gray.800')}
        display="flex"
        alignItems="center"
        justifyContent="center"
        overflow="hidden"
        borderBottom={project.featured ? "2px solid" : "1px solid"}
        borderColor={project.featured ? featuredBorder : useColorModeValue('gray.200', 'gray.700')}
        w="100%"
        zIndex={1}
      >
        <Box
          w="100%"
          h="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={3}
          position="relative"
        >
          <Box
            w="100%"
            h="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <LazyImage
              src={project.images?.[0] || '/assets/projects/placeholder.png'}
              alt={project.title[language as 'pt' | 'en']}
              width="100%"
              height="100%"
              objectFit="contain"
            />
          </Box>
        </Box>
        {project.featured && (
          <Box
            position="absolute"
            top={2}
            left={2}
            zIndex={10}
            bgGradient="linear(to-r, yellow.400, orange.500)"
            borderRadius="full"
            p={1.5}
            boxShadow="0 0 10px rgba(236, 201, 75, 0.6)"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Icon as={FaStar} w={3} h={3} color="white" />
          </Box>
        )}
        {!project.featured && (
          <Badge
            position="absolute"
            top={2}
            right={2}
            colorScheme="blue"
            borderRadius="full"
            px={2}
            py={0.5}
            fontSize="2xs"
            textTransform="uppercase"
            fontWeight="bold"
            boxShadow="none"
          >
            {project.category || 'Development'}
          </Badge>
        )}
      </Box>
      
      <VStack align="start" p={3} spacing={1} position="relative" zIndex={1}>
        <HStack spacing={1.5} w="100%">
          <Heading 
            size="sm" 
            noOfLines={1} 
            color={project.featured ? useColorModeValue('yellow.800', 'yellow.200') : useColorModeValue('gray.800', 'white')}
            flex={1}
          >
            {project.title[language as 'pt' | 'en']}
          </Heading>
        </HStack>
        <Text
          fontSize="xs"
          color={useColorModeValue('gray.600', 'gray.400')}
          noOfLines={2}
        >
          {project.description[language as 'pt' | 'en']}
        </Text>
        {project.tags && project.tags.length > 0 && (
          <Box w="100%" mt={1}>
            <HStack spacing={1.5} wrap="wrap" align="start" gap={0.5}>
              {project.tags.slice(0, 3).map((tag, idx) => (
                <Badge 
                  key={idx} 
                  fontSize="2xs" 
                  colorScheme="cyan" 
                  variant="subtle"
                  px={1.5}
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
      </VStack>
    </MotionBox>
  );
};

export const ProjectCompactView = memo(ProjectCompactViewComponent);
