import { useRef } from 'react';
import { Box, Button, Text, VStack, HStack, useColorModeValue } from '@chakra-ui/react';
import { motion, useMotionValue } from 'framer-motion';
import { FaFingerprint, FaUndo } from 'react-icons/fa';

export const TouchGestureSandbox = () => {
  const constraintsRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);
  const rotate = useMotionValue(0);

  // Background grid for context
  const bg = useColorModeValue('gray.50', 'gray.900');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handleReset = () => {
    x.set(0);
    y.set(0);
    scale.set(1);
    rotate.set(0);
  };

  return (
    <Box w="full" maxW="500px" h="400px" bg={bg} rounded="xl" border="1px solid" borderColor={borderColor} position="relative" overflow="hidden">
      <VStack position="absolute" top={4} left={4} zIndex={10} align="start" pointerEvents="none">
        <HStack spacing={2} bg="blackAlpha.600" p={2} rounded="md">
          <FaFingerprint color="cyan" />
          <Text color="white" fontSize="xs" fontWeight="bold">Touch / Drag Space</Text>
        </HStack>
        <Text color="gray.500" fontSize="xs">Try dragging, verifying boundaries.</Text>
      </VStack>

      <Button
        position="absolute"
        bottom={4}
        right={4}
        size="sm"
        onClick={handleReset}
        leftIcon={<FaUndo />}
        colorScheme="cyan"
        variant="ghost"
        zIndex={10}
      >
        Reset
      </Button>

      {/* Constraints Area */}
      <Box
        ref={constraintsRef}
        w="full"
        h="full"
        display="flex"
        alignItems="center"
        justifyContent="center"
        backgroundImage="radial-gradient(circle, #718096 1px, transparent 1px)"
        backgroundSize="20px 20px"
        opacity={0.5}
      >
        <motion.div
          drag
          dragConstraints={constraintsRef}
          dragElastic={0.2}
          whileHover={{ scale: 1.1, cursor: 'grab' }}
          whileTap={{ scale: 0.95, cursor: 'grabbing' }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 20,
            background: 'linear-gradient(135deg, #0BC5EA 0%, #00B5D8 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 30px -10px rgba(11, 197, 234, 0.6)',
            x, y, scale, rotate
          }}
        >
          <Box w="8px" h="8px" bg="white" rounded="full" />
        </motion.div>
      </Box>
    </Box>
  );
};
