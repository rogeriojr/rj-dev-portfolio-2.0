import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Link,
  Icon,
  useColorModeValue,
  Button,
  Badge,
  Flex,
} from "@chakra-ui/react";
import { FaGithub, FaLink, FaInfoCircle, FaGlobeAmericas } from "react-icons/fa";
import { Project } from "../types";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "../i18n/useTranslation";
import { LazyImage } from "./LazyImage";
import { memo } from "react";
import { useProjectImageBackground } from "../utils/projectUtils";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface ProjectCardProps {
  project: Project;
  onViewDetails?: (project: Project) => void;
}

const MotionBox = motion(Box);

const ProjectCardComponent = ({
  project,
  onViewDetails,
}: ProjectCardProps) => {
  const bgColor = useColorModeValue(
    "rgba(255, 255, 255, 0.9)",
    "rgba(26, 32, 44, 0.9)"
  );
  const borderColor = useColorModeValue(
    "rgba(226, 232, 240, 0.6)",
    "rgba(45, 55, 72, 0.6)"
  );
  const imageBgColor = useProjectImageBackground(project, "gray.100", "gray.800");
  const glowColor = useColorModeValue(
    "rgba(66, 153, 225, 0.3)",
    "rgba(99, 179, 237, 0.3)"
  );
  const { t, language } = useTranslation();
  const reducedMotion = useReducedMotion();

  if (!project) {
    return null;
  }

  return (
    <AnimatePresence>
      <MotionBox
        role="article"
        aria-label={`Projeto: ${project.title[language]}${project.featured ? '. Projeto em destaque' : ''}`}
        initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
        animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -20 }}
        whileHover={reducedMotion ? {} : {
          y: -8,
          scale: 1.02,
          boxShadow: `0 0 20px ${glowColor}, 0 0 40px ${glowColor}`,
        }}
        transition={reducedMotion ? {} : {
          duration: 0.3,
          ease: "easeOut",
          boxShadow: {
            duration: 0.2,
          },
        }}
        borderWidth={project.featured ? "2px" : "1px"}
        borderColor={project.featured ? "yellow.400" : borderColor}
        borderRadius="2xl"
        overflow="hidden"
        bg={bgColor}
        boxShadow={project.featured ? "0 0 20px rgba(236, 201, 75, 0.4)" : "lg"}
        position="relative"
        backdropFilter="blur(8px)"
        display="flex"
        flexDirection="column"
        h="100%"
        minH={{ base: "320px", md: "360px", lg: "380px" }}
        w="100%"
        tabIndex={0}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && onViewDetails) {
            e.preventDefault();
            onViewDetails(project);
          }
        }}
        _focus={{
          outline: '3px solid #4A90E2',
          outlineOffset: '2px',
        }}
        _before={{
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(circle at top right, rgba(66, 153, 225, 0.1), transparent 50%)," +
            "radial-gradient(circle at bottom left, rgba(237, 100, 166, 0.1), transparent 50%)",
          opacity: 0,
          transition: "opacity 0.3s ease",
        }}
        _hover={{
          _before: {
            opacity: 1,
          },
          transform: "translateY(-8px)",
          boxShadow: project.featured ? "0 0 30px rgba(236, 201, 75, 0.6)" : "2xl",
          borderColor: project.featured ? "yellow.300" : useColorModeValue("blue.300", "cyan.400"),
        }}
      >
        <Box
          position="relative"
          bg={imageBgColor}
          overflow="hidden"
          flexShrink={0}
          h={{ base: "140px", md: "160px", lg: "180px" }}
          minH={{ base: "140px", md: "160px", lg: "180px" }}
          maxH={{ base: "140px", md: "160px", lg: "180px" }}
          w="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {project.featured && (
            <Box
              position="absolute"
              top={2}
              right={2}
              zIndex={10}
              bgGradient="linear(to-r, yellow.400, orange.500)"
              borderRadius="full"
              px={3}
              py={1}
              boxShadow="0 0 15px rgba(236, 201, 75, 0.6)"
            >
              <Text fontSize="xs" fontWeight="bold" color="white" letterSpacing="wide">
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
              py={1}
              fontSize="2xs"
              textTransform="uppercase"
              fontWeight="bold"
            >
              {project.category || 'Development'}
            </Badge>
          )}
          {project.images && project.images.length > 0 ? (
            <Box
              w="100%"
              h="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              p={4}
              position="relative"
            >
              <Box
                w="100%"
                h="100%"
                maxW="100%"
                maxH="100%"
                display="flex"
                alignItems="center"
                justifyContent="center"
                transition={reducedMotion ? "none" : "transform 0.3s ease"}
                _hover={reducedMotion ? {} : {
                  transform: "scale(1.05)",
                }}
              >
                <LazyImage
                  src={project.images[0]}
                  alt={`Imagem do projeto ${project.title[language]}`}
                  width="100%"
                  height="100%"
                  objectFit="contain"
                  fallbackSrc={project.id.includes('neo') || project.title[language].toLowerCase().includes('neo') ? "/assets/projects/neoidea_logo.png" : undefined}
                />
              </Box>
            </Box>
          ) : (
            <Flex
              h="100%"
              w="100%"
              bg={imageBgColor}
              align="center"
              justify="center"
              direction="column"
              position="relative"
              _after={{
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  "radial-gradient(circle at center, rgba(66, 153, 225, 0.1) 0%, transparent 70%)",
              }}
            >
              <Icon as={FaGlobeAmericas} w={{ base: 8, md: 10, lg: 12 }} h={{ base: 8, md: 10, lg: 12 }} color="gray.400" mb={2} />
              <Text fontSize={{ base: "2xs", md: "xs" }} color="gray.500" fontWeight="bold" textTransform="uppercase" letterSpacing="widest">
                {language === 'pt' ? 'Dados Visuais Ausentes' : 'No Visual Data'}
              </Text>
            </Flex>
          )}
        </Box>
        <VStack p={4} align="start" spacing={3} position="relative" zIndex={1} flex="1" justify="flex-start" minW={0} w="100%" minH={0}>
          <Heading
            size={{ base: "sm", md: "md" }}
            className="project-title"
            bgGradient="linear(to-r, blue.400, purple.500)"
            bgClip="text"
            transition="all 0.3s ease"
            wordBreak="break-word"
            w="100%"
            _hover={{
              bgGradient: "linear(to-r, blue.500, purple.600)",
              transform: "translateX(4px)",
            }}
          >
            {project.title[language]}
          </Heading>
          <Text
            noOfLines={3}
            className="project-description"
            color={useColorModeValue("gray.600", "gray.300")}
            fontSize={{ base: "xs", md: "sm" }}
            lineHeight="tall"
            w="100%"
            wordBreak="break-word"
          >
            {project.description[language]}
          </Text>
          {project.tags && project.tags.length > 0 && (
            <Box w="100%">
              <HStack spacing={{ base: 1.5, md: 2 }} wrap="wrap" align="start" gap={1}>
                {project.tags.slice(0, 4).map((tag, idx) => (
                  <Badge
                    key={idx}
                    colorScheme="blue"
                    variant="subtle"
                    fontSize={{ base: "2xs", md: "xs" }}
                    borderRadius="full"
                    px={{ base: 2, md: 2.5 }}
                    py={0.5}
                    whiteSpace="nowrap"
                    maxW="100%"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    mb={0.5}
                  >
                    {tag}
                  </Badge>
                ))}
                {project.tags.length > 4 && (
                  <Badge
                    colorScheme="gray"
                    variant="outline"
                    fontSize={{ base: "2xs", md: "xs" }}
                    borderRadius="full"
                    px={{ base: 1.5, md: 2 }}
                    py={0.5}
                    flexShrink={0}
                    mb={0.5}
                  >
                    +{project.tags.length - 4}
                  </Badge>
                )}
              </HStack>
            </Box>
          )}
          <HStack spacing={{ base: 2, md: 4 }} mt="auto" width="100%" align="center" flexWrap="wrap">
            <VStack align="start" spacing={2} flex={1} minW={0}>
              {project.links &&
                project.links.length > 0 &&
                project.links.slice(0, 1).map((link, index) => (
                  <Link
                    key={index}
                    href={link.url}
                    isExternal
                    color="blue.400"
                    display="inline-flex"
                    alignItems="center"
                    fontSize={{ base: "xs", md: "sm" }}
                    aria-label={`Abrir ${link.texto || 'link'} em nova aba`}
                    _hover={reducedMotion ? {} : {
                      color: "blue.300",
                      transform: "translateY(-1px)",
                    }}
                    _focus={{
                      outline: '3px solid #4A90E2',
                      outlineOffset: '2px',
                    }}
                    transition={reducedMotion ? "none" : "all 0.2s"}
                    wordBreak="break-all"
                  >
                    <Icon
                      as={link.url.includes("github") ? FaGithub : FaLink}
                      mr={1}
                      w={{ base: 3, md: 4 }}
                      h={{ base: 3, md: 4 }}
                    />
                    {t('projects.viewOnline')}
                  </Link>
                ))}
            </VStack>
            <Box flexShrink={0}>
              <Button
                rightIcon={<FaInfoCircle />}
                variant="ghost"
                size={{ base: "sm", md: "sm" }}
                minH={{ base: "44px", md: "auto" }}
                minW={{ base: "auto", md: "auto" }}
                px={{ base: 4, md: 3 }}
                onClick={() => {
                  onViewDetails?.(project);
                }}
                aria-label={`Ver detalhes do projeto ${project.title[language]}`}
                bgGradient="linear(to-r, blue.400, purple.500)"
                color="white"
                fontSize={{ base: "xs", md: "sm" }}
                _hover={reducedMotion ? {} : {
                  bgGradient: "linear(to-r, blue.500, purple.600)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 0 15px rgba(66, 153, 225, 0.4)",
                }}
                _focus={{
                  outline: '3px solid #4A90E2',
                  outlineOffset: '2px',
                }}
                _active={{
                  transform: "scale(0.95)",
                }}
              >
                {t('projects.viewDetails')}
              </Button>
            </Box>
          </HStack>
        </VStack>
      </MotionBox>
    </AnimatePresence >
  );
};

const ProjectCard = memo(ProjectCardComponent);

export default ProjectCard;
