import { Box, Heading, Text, Image, Skeleton, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  isLoading?: boolean;
}

export default function ProjectCard({ title, description, imageUrl, isLoading = false }: ProjectCardProps) {
  const cardBg = useColorModeValue("gray.800", "gray.700");

  if (isLoading) {
    return (
      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        bg={cardBg}
        borderRadius="lg"
        overflow="hidden"
        _hover={{ transform: "translateY(-4px)", transition: "all 0.2s ease-in-out" }}
      >
        <Skeleton height="200px" />
        <Box p={6}>
          <Skeleton height="24px" width="70%" mb={4} />
          <Skeleton height="60px" />
        </Box>
      </MotionBox>
    );
  }

  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      bg={cardBg}
      borderRadius="lg"
      overflow="hidden"
      _hover={{ transform: "translateY(-4px)", transition: "all 0.2s ease-in-out" }}
    >
      <Image
        src={imageUrl}
        alt={title}
        objectFit="cover"
        height="200px"
        width="100%"
        fallback={<Skeleton height="200px" />}
      />
      <Box p={6}>
        <Heading as="h3" size="md" mb={2}>
          {title}
        </Heading>
        <Text noOfLines={3}>{description}</Text>
      </Box>
    </MotionBox>
  );
}