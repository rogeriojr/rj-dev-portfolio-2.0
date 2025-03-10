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
} from "@chakra-ui/react";
import { FaGithub, FaLink } from "react-icons/fa";
import { Project } from "../types";
import { motion } from "framer-motion";

interface ProjectCardProps {
  project: Project;
}

const MotionBox = motion(Box);

export default function ProjectCard({ project }: ProjectCardProps) {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  if (!project) {
    return null;
  }

  return (
    <MotionBox
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      overflow="hidden"
      bg={bgColor}
      boxShadow="lg"
    >
      {project.images && project.images.length > 0 && (
        <Image
          src={project.images[0]}
          alt={project.title}
          objectFit="cover"
          h="200px"
          w="100%"
        />
      )}
      <VStack p={6} align="start" spacing={4}>
        <Heading size="md">{project.title}</Heading>
        <Text noOfLines={3}>{project.description}</Text>
        {project.links && project.links.length > 0 && (
          <HStack spacing={4} mt={2}>
            {project.links.map((link, index) => (
              <Link
                key={index}
                href={link.url}
                isExternal
                color="blue.500"
                display="inline-flex"
                alignItems="center"
              >
                <Icon
                  as={link.url.includes("github") ? FaGithub : FaLink}
                  mr={2}
                />
                {link.texto}
              </Link>
            ))}
          </HStack>
        )}
      </VStack>
    </MotionBox>
  );
}
