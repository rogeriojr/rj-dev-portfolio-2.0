import { Box, Heading, Text, Image, Skeleton, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  isLoading?: boolean;
  links?: Array<{
    texto: string;
    url: string;
  }>;
}

export default function ProjectCard({ title, description, imageUrl, isLoading = false, links = [] }: ProjectCardProps) {
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
        <Text noOfLines={3} mb={4}>{description}</Text>
        {links.map((link, index) => (
          <Box
            key={index}
            as="a"
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            display="inline-block"
            mr={2}
            mb={2}
            px={3}
            py={1}
            bg="blue.600"
            color="white"
            borderRadius="md"
            _hover={{ bg: "blue.700" }}
          >
            {link.texto}
          </Box>
        ))}
      </Box>
    </MotionBox>
  );
}