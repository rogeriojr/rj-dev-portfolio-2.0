import { useState } from 'react';
import {
  Box, VStack, HStack, Text,
  Icon, IconButton,
  Button, Skeleton, Divider, SimpleGrid
} from '@chakra-ui/react';
import { FaFilePdf, FaChevronLeft, FaChevronRight, FaPrint, FaSearchPlus, FaSearchMinus, FaDownload } from 'react-icons/fa';
import { motion } from 'framer-motion';

export const DocumentPreviewSimulator = () => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [zoom, setZoom] = useState(1);

  const simulatePageChange = (p: number) => {
    setLoading(true);
    setPage(p);
    setTimeout(() => setLoading(false), 800);
  };

  return (
    <Box
      p={4}
      bg="rgba(10, 15, 30, 0.7)"
      borderRadius="xl"
      border="1px solid rgba(255,255,255,0.1)"
      maxW="600px"
      mx="auto"
      boxShadow="dark-lg"
    >
      <VStack align="stretch" spacing={4}>
        <HStack justify="space-between" mb={2}>
          <HStack spacing={3}>
            <Icon as={FaFilePdf} color="red.400" />
            <VStack align="start" spacing={0}>
              <Text fontSize="xs" fontWeight="bold" color="whiteAlpha.700" letterSpacing="widest">enterprise_invoice_#42.pdf</Text>
              <Text fontSize="9px" color="whiteAlpha.400">PDF/A-1b Standard | 1.2 MB</Text>
            </VStack>
          </HStack>
          <HStack spacing={1}>
            <IconButton aria-label="Zoom Out" icon={<FaSearchMinus />} size="xs" variant="ghost" onClick={() => setZoom(Math.max(0.5, zoom - 0.1))} />
            <Text fontSize="xs" color="whiteAlpha.500" w="40px" textAlign="center">{Math.round(zoom * 100)}%</Text>
            <IconButton aria-label="Zoom In" icon={<FaSearchPlus />} size="xs" variant="ghost" onClick={() => setZoom(Math.min(2, zoom + 0.1))} />
          </HStack>
        </HStack>

        <Box
          bg="white"
          borderRadius="sm"
          h="350px"
          overflow="hidden"
          position="relative"
          boxShadow="inner"
        >
          {loading ? (
            <VStack p={8} spacing={4} align="stretch" h="100%">
              <Skeleton h="20px" />
              <Skeleton h="20px" w="60%" />
              <Skeleton h="150px" />
              <Skeleton h="20px" />
            </VStack>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ transform: `scale(${zoom})`, transformOrigin: 'top center', padding: '20px' }}
            >
              <VStack align="stretch" spacing={4} color="gray.800">
                <HStack justify="space-between">
                  <Box boxSize="40px" bg="blue.600" borderRadius="md" />
                  <VStack align="end" spacing={0}>
                    <Text fontSize="lg" fontWeight="bold">INVOICE</Text>
                    <Text fontSize="xs" color="gray.500">#INV-2026-0042</Text>
                  </VStack>
                </HStack>
                <Divider borderColor="gray.200" />
                <SimpleGrid columns={2} spacing={4}>
                  <VStack align="start" spacing={1}>
                    <Text fontSize="9px" color="gray.500">BILLED TO:</Text>
                    <Text fontSize="xs" fontWeight="bold">Nexus Enterprise Corp.</Text>
                    <Text fontSize="9px">contact@nexus.com</Text>
                  </VStack>
                  <VStack align="end" spacing={1}>
                    <Text fontSize="9px" color="gray.500">DUE DATE:</Text>
                    <Text fontSize="xs" fontWeight="bold">Jan 25, 2026</Text>
                  </VStack>
                </SimpleGrid>
                <Box h="100px" bg="gray.50" p={2} borderRadius="md" border="1px dashed" borderColor="gray.200">
                  <Text fontSize="9px" color="gray.400">Document Page Metadata Context Render Placeholder</Text>
                </Box>
                {page === 2 && (
                  <Box p={4} bg="blue.50" border="1px solid" borderColor="blue.100" borderRadius="md">
                    <Text fontSize="xs" color="blue.800"><b>Note:</b> Extra terms and conditions for high-volume API requests included on page 2.</Text>
                  </Box>
                )}
              </VStack>
            </motion.div>
          )}
        </Box>

        <HStack justify="space-between" bg="whiteAlpha.100" p={2} borderRadius="md">
          <HStack spacing={2}>
            <IconButton aria-label="Prev" icon={<FaChevronLeft />} size="xs" onClick={() => simulatePageChange(1)} isDisabled={page === 1} />
            <Text fontSize="xs" color="whiteAlpha.700">Page {page} of 2</Text>
            <IconButton aria-label="Next" icon={<FaChevronRight />} size="xs" onClick={() => simulatePageChange(2)} isDisabled={page === 2} />
          </HStack>
          <HStack spacing={2}>
            <Button size="xs" leftIcon={<FaPrint />} variant="ghost" colorScheme="cyan">PRINT</Button>
            <Button size="xs" leftIcon={<FaDownload />} colorScheme="cyan">DOWNLOAD</Button>
          </HStack>
        </HStack>

        <Text fontSize="9px" color="whiteAlpha.400" textAlign="center">
          RENDER_ENGINE: pdf.js(wasm) | LAYER: canvas-2d
        </Text>
      </VStack>
    </Box>
  );
};
