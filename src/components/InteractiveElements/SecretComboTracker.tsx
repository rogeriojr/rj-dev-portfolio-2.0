import { useEffect, useState } from 'react';
import { Box, Text, VStack, HStack, Icon, useColorModeValue } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaKey } from 'react-icons/fa';

export function SecretComboTracker() {
  const [recentKeys, setRecentKeys] = useState<string[]>([]);
  const [showTracker, setShowTracker] = useState(false);
  const bg = useColorModeValue('whiteAlpha.900', 'blackAlpha.900');
  const borderColor = useColorModeValue('gray.300', 'gray.600');

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      
      const key = e.key.length === 1 ? e.key.toUpperCase() : e.code.replace('Key', '');
      setRecentKeys(prev => [...prev, key].slice(-10));
      setShowTracker(true);
      
      setTimeout(() => {
        setShowTracker(false);
        setTimeout(() => setRecentKeys([]), 500);
      }, 2000);
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  if (!showTracker || recentKeys.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        style={{
          position: 'fixed',
          bottom: '80px',
          right: '20px',
          zIndex: 9998,
        }}
      >
        <Box
          bg={bg}
          borderWidth="1px"
          borderColor={borderColor}
          borderRadius="lg"
          p={3}
          boxShadow="lg"
          backdropFilter="blur(10px)"
        >
          <VStack spacing={2} align="center">
            <HStack spacing={1}>
              <Icon as={FaKey} w={3} h={3} color="gray.500" />
              <Text fontSize="xs" color="gray.500" fontWeight="bold">
                Últimas teclas:
              </Text>
            </HStack>
            <HStack spacing={1}>
              {recentKeys.map((key, idx) => (
                <Box
                  key={idx}
                  px={2}
                  py={1}
                  bg="gray.100"
                  borderRadius="sm"
                  fontSize="xs"
                  fontWeight="bold"
                  color="gray.700"
                  minW="24px"
                  textAlign="center"
                >
                  {key}
                </Box>
              ))}
            </HStack>
          </VStack>
        </Box>
      </motion.div>
    </AnimatePresence>
  );
}
