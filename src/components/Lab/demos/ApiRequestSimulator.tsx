import { useState } from 'react';
import { Box, Button, HStack, Text, VStack, Badge } from '@chakra-ui/react';
import { FaPlay, FaBug, FaServer } from 'react-icons/fa';

export const ApiRequestSimulator = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [logs, setLogs] = useState<string[]>([]);
  const [latencyMode, setLatencyMode] = useState<'fast' | 'slow' | 'timeout'>('fast');

  const addLog = (msg: string) => setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 5));

  const runSimulation = async (shouldFail = false) => {
    setStatus('loading');
    setLogs([]);
    addLog('🚀 Request started: GET /api/v1/user/profile');
    addLog('⏳ Resolving DNS...');

    const delay = latencyMode === 'fast' ? 800 : latencyMode === 'slow' ? 3000 : 6000;

    try {
      if (latencyMode === 'timeout') {
        await new Promise((_, reject) => setTimeout(() => reject('Timeout'), 2000));
      } else {
        await new Promise(resolve => setTimeout(resolve, delay * 0.5));
        addLog('🤝 Handshake established. Sending headers...');
        await new Promise(resolve => setTimeout(resolve, delay * 0.5));
      }

      if (shouldFail) throw new Error('Internal Server Error (500)');

      setStatus('success');
      addLog('✅ Response received: 200 OK');
      addLog('📦 Payload size: 1.4kb');
    } catch (err: any) {
      setStatus('error');
      addLog(`❌ Request Failed: ${err.message || err}`);
    }
  };

  return (
    <Box bg="gray.900" p={6} rounded="xl" border="1px solid" borderColor="gray.700" w="full" maxW="600px">
      <VStack align="stretch" spacing={6}>
        <HStack justify="space-between" wrap="wrap" gap={4}>
          <HStack>
            <Button leftIcon={<FaPlay />} size="sm" colorScheme="cyan" onClick={() => runSimulation(false)} isLoading={status === 'loading'}>
              Send Request
            </Button>
            <Button leftIcon={<FaBug />} size="sm" colorScheme="red" variant="outline" onClick={() => runSimulation(true)} isDisabled={status === 'loading'}>
              Simulate 500
            </Button>
          </HStack>

          <HStack spacing={1} bg="gray.800" p={1} rounded="md">
            <Button size="xs" variant={latencyMode === 'fast' ? 'solid' : 'ghost'} onClick={() => setLatencyMode('fast')}>Fast</Button>
            <Button size="xs" variant={latencyMode === 'slow' ? 'solid' : 'ghost'} colorScheme="orange" onClick={() => setLatencyMode('slow')}>Slow</Button>
            <Button size="xs" variant={latencyMode === 'timeout' ? 'solid' : 'ghost'} colorScheme="red" onClick={() => setLatencyMode('timeout')}>Timeout</Button>
          </HStack>
        </HStack>

        <Box position="relative" h="60px" bg="blackAlpha.400" rounded="md" overflow="hidden">
          <HStack h="full" px={4} spacing={0}>
            <Box as={FaServer} color="gray.500" w={6} h={6} />

            <Box flex={1} h="2px" bg="gray.700" mx={4} position="relative">
              {status === 'loading' && (
                <Box
                  position="absolute"
                  top="-4px"
                  left="0"
                  w="10px"
                  h="10px"
                  bg="cyan.400"
                  rounded="full"
                  animation="ping 1s cubic-bezier(0, 0, 0.2, 1) infinite"
                  as={motion.div}
                  animate={{ left: ['0%', '100%', '0%'] }}
                  // @ts-ignore
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />
              )}
            </Box>

            <Badge
              colorScheme={status === 'idle' ? 'gray' : status === 'loading' ? 'yellow' : status === 'success' ? 'green' : 'red'}
              variant="solid"
              fontSize="md"
              px={3}
              py={1}
              rounded="full"
            >
              {status.toUpperCase()}
            </Badge>
          </HStack>
        </Box>

        <Box bg="black" p={4} rounded="md" fontFamily="monospace" fontSize="xs" h="150px" overflowY="auto">
          {logs.length === 0 ? <Text color="gray.600">// Ready to start simulation...</Text> : logs.map((log, i) => (
            <Text key={i} color="green.300" borderBottom="1px solid" borderColor="whiteAlpha.100" py={1}>{log}</Text>
          ))}
        </Box>
      </VStack>
    </Box>
  );
};

import { motion } from 'framer-motion';
