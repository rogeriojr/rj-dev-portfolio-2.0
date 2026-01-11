import { VStack, HStack, Box, Image, Text, Heading, Badge, IconButton, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Project } from "../../types";
import { FaExternalLinkAlt, FaInfoCircle } from "react-icons/fa";

const MotionBox = motion(Box);

interface ProjectListViewProps {
  project: Project;
  onViewDetails: (project: Project) => void;
  language: string;
}

export function ProjectListView({ project, onViewDetails, language }: ProjectListViewProps) {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');

  return (
    <MotionBox
      bg={bg}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="xl"
      p={6}
      _hover={{ bg: hoverBg, borderColor: 'blue.400' }}
      transition="all 0.2s"
      cursor="pointer"
      onClick={() => onViewDetails(project)}
      whileHover={{ scale: 1.02, x: 5 }}
      whileTap={{ scale: 0.98 }}
      w="100%"
      minH="200px"
    >
      <HStack spacing={6} align="start">
        <Box
          w="180px"
          h="180px"
          minW="180px"
          maxW="180px"
          borderRadius="lg"
          overflow="hidden"
          flexShrink={0}
          bg={useColorModeValue('white', 'gray.800')}
          display="flex"
          alignItems="center"
          justifyContent="center"
          border="1px solid"
          borderColor={useColorModeValue('gray.200', 'gray.700')}
        >
          <Box
            w="100%"
            h="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            p={4}
          >
            <Image
              src={project.images?.[0] || '/assets/projects/placeholder.png'}
              alt={project.title[language as 'pt' | 'en']}
              maxW="calc(100% - 32px)"
              maxH="calc(100% - 32px)"
              w="auto"
              h="auto"
              objectFit="contain"
              bg="transparent"
            />
          </Box>
        </Box>
        
        <VStack align="start" flex={1} spacing={3} minW={0}>
          <HStack justify="space-between" w="100%" align="start" flexWrap="wrap" gap={2}>
            <Heading 
              size="md" 
              color={useColorModeValue('gray.800', 'white')}
              flex={1}
              minW={0}
              wordBreak="break-word"
            >
              {project.title[language as 'pt' | 'en']}
            </Heading>
            <Badge 
              colorScheme="blue" 
              px={3} 
              py={1} 
              borderRadius="full"
              flexShrink={0}
            >
              {project.category}
            </Badge>
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
              <HStack wrap="wrap" spacing={2} align="start">
                {project.tags.map((tag, idx) => (
                  <Badge 
                    key={idx} 
                    colorScheme="cyan" 
                    variant="subtle" 
                    fontSize="xs"
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
}
