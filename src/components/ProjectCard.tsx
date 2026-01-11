import {
  Box,
  Heading,
  Text,
  Image,
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

interface ProjectCardProps {
  project: Project;
  onViewDetails?: (project: Project) => void;
}

const MotionBox = motion(Box);

export default function ProjectCard({
  project,
  onViewDetails,
}: ProjectCardProps) {
  const bgColor = useColorModeValue(
    "rgba(255, 255, 255, 0.9)",
    "rgba(26, 32, 44, 0.9)"
  );
  const borderColor = useColorModeValue(
    "rgba(226, 232, 240, 0.6)",
    "rgba(45, 55, 72, 0.6)"
  );
  const imageBgColor = useColorModeValue("gray.100", "gray.800"); // Darker for space theme
  const glowColor = useColorModeValue(
    "rgba(66, 153, 225, 0.3)",
    "rgba(99, 179, 237, 0.3)"
  );
  const { t, language } = useTranslation();

  if (!project) {
    return null;
  }

  return (
    <AnimatePresence>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        whileHover={{
          y: -8,
          scale: 1.02,
          boxShadow: `0 0 20px ${glowColor}, 0 0 40px ${glowColor}`,
        }}
        transition={{
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
        minH="380px"
        w="100%"
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
        <Box
          position="relative"
          bg={useColorModeValue("white", "gray.100")}
          overflow="hidden"
          flexShrink={0}
          h="180px"
          minH="180px"
          maxH="180px"
          w="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {project.images && project.images.length > 0 ? (
            <Box
              w="100%"
              h="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              p={4}
            >
              <Image
                src={project.images[0]}
                alt={project.title[language]}
                objectFit="contain"
                maxH="calc(100% - 32px)"
                maxW="calc(100% - 32px)"
                w="auto"
                h="auto"
                bg="transparent"
                transition="transform 0.3s ease"
                _hover={{
                  transform: "scale(1.05)",
                }}
                onError={(e) => {
                  console.error(`Failed to load image: ${project.images[0]}`);
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
                fallbackSrc={project.id.includes('neo') || project.title[language].toLowerCase().includes('neo') ? "/assets/projects/neoidea_logo.png" : undefined}
                loading="lazy"
              />
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
              <Icon as={FaGlobeAmericas} w={12} h={12} color="gray.400" mb={2} />
              <Text fontSize="xs" color="gray.500" fontWeight="bold" textTransform="uppercase" letterSpacing="widest">
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
              <HStack spacing={{ base: 1, md: 2 }} wrap="wrap" align="start">
                {project.tags.slice(0, 4).map((tag, idx) => (
                  <Badge
                    key={idx}
                    colorScheme="blue"
                    variant="subtle"
                    fontSize={{ base: "2xs", md: "xs" }}
                    borderRadius="full"
                    px={{ base: 1.5, md: 2 }}
                    whiteSpace="nowrap"
                    maxW="100%"
                    overflow="hidden"
                    textOverflow="ellipsis"
                  >
                    {tag}
                  </Badge>
                ))}
                {project.tags.length > 4 && (
                  <Text fontSize={{ base: "2xs", md: "xs" }} color="gray.500" flexShrink={0}>
                    +{project.tags.length - 4}
                  </Text>
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
                    _hover={{
                      color: "blue.300",
                      transform: "translateY(-1px)",
                    }}
                    transition="all 0.2s"
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
                size={{ base: "xs", md: "sm" }}
                onClick={() => {
                  onViewDetails?.(project);
                }}
                bgGradient="linear(to-r, blue.400, purple.500)"
                color="white"
                fontSize={{ base: "xs", md: "sm" }}
                _hover={{
                  bgGradient: "linear(to-r, blue.500, purple.600)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 0 15px rgba(66, 153, 225, 0.4)",
                }}
                _active={{
                  transform: "translateY(0)",
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
}
