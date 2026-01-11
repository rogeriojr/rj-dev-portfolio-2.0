import { Box, Image, Text, Heading, Badge, useColorModeValue, VStack, HStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Project } from "../../types";

const MotionBox = motion(Box);

interface ProjectCompactViewProps {
  project: Project;
  onViewDetails: (project: Project) => void;
  language: string;
}

export function ProjectCompactView({ project, onViewDetails, language }: ProjectCompactViewProps) {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const hoverBg = useColorModeValue('blue.50', 'gray.700');

  return (
    <MotionBox
      bg={bg}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      overflow="hidden"
      cursor="pointer"
      onClick={() => onViewDetails(project)}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      transition="all 0.2s"
      _hover={{ borderColor: 'blue.400', bg: hoverBg }}
      h="100%"
      minH="280px"
      maxH="320px"
      display="flex"
      flexDirection="column"
      w="100%"
    >
      <Box 
        position="relative" 
        h="140px"
        minH="140px"
        maxH="140px"
        bg={useColorModeValue('white', 'gray.800')}
        display="flex"
        alignItems="center"
        justifyContent="center"
        overflow="hidden"
        borderBottom="1px solid"
        borderColor={useColorModeValue('gray.200', 'gray.700')}
        w="100%"
      >
        <Box
          w="100%"
          h="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={3}
        >
          <Image
            src={project.images?.[0] || '/assets/projects/placeholder.png'}
            alt={project.title[language as 'pt' | 'en']}
            maxW="calc(100% - 24px)"
            maxH="calc(100% - 24px)"
            w="auto"
            h="auto"
            objectFit="contain"
            bg="transparent"
          />
        </Box>
        <Badge
          position="absolute"
          top={2}
          right={2}
          colorScheme="blue"
          borderRadius="full"
          px={2}
        >
          {project.category}
        </Badge>
      </Box>
      
      <VStack align="start" p={3} spacing={1}>
        <Heading size="sm" noOfLines={1} color={useColorModeValue('gray.800', 'white')}>
          {project.title[language as 'pt' | 'en']}
        </Heading>
        <Text
          fontSize="xs"
          color={useColorModeValue('gray.600', 'gray.400')}
          noOfLines={2}
        >
          {project.description[language as 'pt' | 'en']}
        </Text>
        {project.tags && project.tags.length > 0 && (
          <Box w="100%" mt={1}>
            <HStack spacing={1} wrap="wrap" align="start">
              {project.tags.slice(0, 3).map((tag, idx) => (
                <Badge 
                  key={idx} 
                  fontSize="2xs" 
                  colorScheme="cyan" 
                  variant="subtle"
                  whiteSpace="nowrap"
                  maxW="100%"
                  overflow="hidden"
                  textOverflow="ellipsis"
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
}
