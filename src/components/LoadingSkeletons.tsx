import { Box, Skeleton, SkeletonText, SimpleGrid } from '@chakra-ui/react';

export function ProjectCardSkeleton() {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
      <Skeleton height="200px" borderRadius="md" mb={4} />
      <SkeletonText mt={4} noOfLines={2} spacing={4} />
      <Skeleton height="20px" width="60%" mt={4} />
    </Box>
  );
}

export function ProjectGridSkeleton({ count = 9 }: { count?: number }) {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
      {Array.from({ length: count }).map((_, index) => (
        <ProjectCardSkeleton key={index} />
      ))}
    </SimpleGrid>
  );
}

export function CertificateSkeleton() {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Skeleton height="200px" />
      <Box p={4}>
        <Skeleton height="20px" width="40%" mb={2} />
        <SkeletonText noOfLines={2} spacing={2} />
        <Skeleton height="16px" width="30%" mt={3} />
      </Box>
    </Box>
  );
}
