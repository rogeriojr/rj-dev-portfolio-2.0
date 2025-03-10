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
} from "@chakra-ui/react";
import { FaGithub, FaLink, FaInfoCircle } from "react-icons/fa";
import { Project } from "../types";
import { motion, AnimatePresence } from "framer-motion";

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
  const imageBgColor = useColorModeValue("gray.100", "gray.700");
  const glowColor = useColorModeValue(
    "rgba(66, 153, 225, 0.3)",
    "rgba(99, 179, 237, 0.3)"
  );

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
        borderWidth="1px"
        borderColor={borderColor}
        borderRadius="2xl"
        overflow="hidden"
        bg={bgColor}
        boxShadow="lg"
        position="relative"
        backdropFilter="blur(8px)"
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
        }}
      >
        <Box position="relative" bg={imageBgColor} overflow="hidden">
          {project.images && project.images.length > 0 ? (
            <Image
              src={project.images[0]}
              alt={project.title}
              objectFit="contain"
              p="4"
              h="200px"
              w="100%"
              transition="transform 0.3s ease"
              _hover={{
                transform: "scale(1.05)",
              }}
            />
          ) : (
            <Box
              h="200px"
              w="100%"
              bg={imageBgColor}
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
            />
          )}
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bgGradient="linear(to-b, transparent 50%, rgba(0,0,0,0.6))"
            transition="opacity 0.3s ease"
            _groupHover={{
              opacity: 0.8,
            }}
          />
        </Box>
        <VStack p={6} align="start" spacing={4} position="relative" zIndex={1}>
          <Heading
            size="md"
            className="project-title"
            bgGradient="linear(to-r, blue.400, purple.500)"
            bgClip="text"
            transition="all 0.3s ease"
            _hover={{
              bgGradient: "linear(to-r, blue.500, purple.600)",
              transform: "translateX(4px)",
            }}
          >
            {project.title}
          </Heading>
          <Text
            noOfLines={3}
            className="project-description"
            color={useColorModeValue("gray.600", "gray.300")}
          >
            {project.description}
          </Text>
          <HStack spacing={4} mt={2} width="100%" align="flex-start">
            <VStack align="start" spacing={2} flex={1}>
              {project.links &&
                project.links.length > 0 &&
                project.links.map((link, index) => (
                  <Link
                    key={index}
                    href={link.url}
                    isExternal
                    color="blue.400"
                    display="inline-flex"
                    alignItems="center"
                    _hover={{
                      color: "blue.300",
                      transform: "translateY(-2px)",
                      textShadow: "0 0 8px rgba(66, 153, 225, 0.6)",
                    }}
                    transition="all 0.2s"
                  >
                    <Icon
                      as={link.url.includes("github") ? FaGithub : FaLink}
                      mr={2}
                    />
                    {link.texto}
                  </Link>
                ))}
            </VStack>
            <Box>
              <Button
                rightIcon={<FaInfoCircle />}
                variant="ghost"
                size="sm"
                onClick={() => onViewDetails?.(project)}
                bgGradient="linear(to-r, blue.400, purple.500)"
                color="white"
                _hover={{
                  bgGradient: "linear(to-r, blue.500, purple.600)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 0 15px rgba(66, 153, 225, 0.4)",
                }}
                _active={{
                  transform: "translateY(0)",
                }}
              >
                Detalhes
              </Button>
            </Box>
          </HStack>
        </VStack>
      </MotionBox>
    </AnimatePresence>
  );
}
