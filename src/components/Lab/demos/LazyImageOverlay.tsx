import { useState } from 'react';
import { Box, Image, Skeleton, Text, VStack } from '@chakra-ui/react';

const LOW_RES = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=100&auto=format&fit=crop";
const HIGH_RES = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1080&auto=format&fit=crop";

export const LazyImageOverlay = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box position="relative" w="full" maxW="500px" h="300px" overflow="hidden" rounded="xl" boxShadow="xl">
      <Box
        position="absolute"
        top={0} left={0} right={0} bottom={0}
        bgImage={`url(${LOW_RES})`}
        bgSize="cover"
        filter="blur(20px)"
        opacity={isLoaded ? 0 : 1}
        transition="opacity 0.8s ease-out"
      />

      <Image
        src={HIGH_RES}
        alt="Cosmic View"
        w="full"
        h="full"
        objectFit="cover"
        onLoad={() => setIsLoaded(true)}
        opacity={isLoaded ? 1 : 0}
        transition="opacity 0.8s ease-in"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        transform={isHovered ? 'scale(1.1)' : 'scale(1)'}
        transitionProperty="transform"
        transitionDuration="0.6s"
      />

      <Box
        position="absolute"
        bottom={0} left={0} right={0}
        p={4}
        bgGradient="linear(to-t, blackAlpha.800, transparent)"
        transform={isHovered ? 'translateY(0)' : 'translateY(100%)'}
        transition="transform 0.4s ease-in-out"
      >
        <Text color="white" fontWeight="bold">Space Nebula</Text>
        <Text color="gray.300" fontSize="sm">High-resolution lazy loaded asset</Text>
      </Box>

      {!isLoaded && (
        <VStack position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">
          <Skeleton height="20px" width="100px" />
          <Text color="white" fontSize="xs" textShadow="0 0 4px black">Loading 8MB asset...</Text>
        </VStack>
      )}
    </Box>
  );
};
