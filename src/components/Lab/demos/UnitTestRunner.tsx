import { useState } from 'react';
import {
  Box, VStack, HStack, Text, Button,
  Icon, Spinner, Badge, Divider
} from '@chakra-ui/react';
import { FaPlay, FaCheckCircle, FaTimesCircle, FaTerminal, FaVial } from 'react-icons/fa';

interface TestResult {
  name: string;
  status: 'pending' | 'running' | 'passed' | 'failed';
  duration: number;
}

export const UnitTestRunner = () => {
  const [testSuites, setTestSuites] = useState<TestResult[]>([
    { name: 'Currency Engine: correctly converts USD to BRL', status: 'pending', duration: 0 },
    { name: 'Auth Provider: emits event on token refresh', status: 'pending', duration: 0 },
    { name: 'Sanitization: removes scripts from user input', status: 'pending', duration: 0 },
    { name: 'Logic: calculates Fibonacci sequence safely', status: 'pending', duration: 0 },
  ]);
  const [isRunning, setIsRunning] = useState(false);

  const runTests = async () => {
    setIsRunning(true);
    const newSuites = testSuites.map(s => ({ ...s, status: 'pending' as const }));
    setTestSuites(newSuites);

    for (let i = 0; i < newSuites.length; i++) {
      setTestSuites(prev => {
        const next = [...prev];
        next[i].status = 'running';
        return next;
      });

      const duration = Math.floor(Math.random() * 500) + 100;
      await new Promise(r => setTimeout(r, duration));

      setTestSuites(prev => {
        const next = [...prev];
        next[i].status = Math.random() > 0.1 ? 'passed' : 'failed';
        next[i].duration = duration;
        return next;
      });
    }
    setIsRunning(false);
  };

  return (
    <Box
      bg="gray.900"
      p={4}
      borderRadius="lg"
      fontFamily="mono"
      boxShadow="dark-lg"
      border="1px solid rgba(255,255,255,0.05)"
    >
      <VStack align="stretch" spacing={4}>
        <HStack justify="space-between">
          <HStack>
            <Icon as={FaTerminal} color="green.400" />
            <Text color="gray.400" fontSize="xs" fontWeight="bold">JEST_ENGINE_SIMULATOR v4.2.0</Text>
          </HStack>
          <Button
            size="xs"
            colorScheme="green"
            leftIcon={<FaPlay />}
            onClick={runTests}
            isLoading={isRunning}
            isDisabled={isRunning}
          >
            RUN TEST SUITE
          </Button>
        </HStack>

        <Divider borderColor="whiteAlpha.100" />

        <VStack align="stretch" spacing={2} maxH="300px" overflowY="auto">
          {testSuites.map((test, idx) => (
            <HStack key={idx} justify="space-between" py={2} borderBottom="1px solid rgba(255,255,255,0.05)">
              <HStack spacing={3}>
                {test.status === 'pending' && <Icon as={FaVial} color="gray.600" />}
                {test.status === 'running' && <Spinner size="xs" color="blue.400" />}
                {test.status === 'passed' && <Icon as={FaCheckCircle} color="green.400" />}
                {test.status === 'failed' && <Icon as={FaTimesCircle} color="red.400" />}
                <Text fontSize="xs" color={test.status === 'failed' ? 'red.300' : 'gray.300'}>
                  {test.name}
                </Text>
              </HStack>
              <HStack>
                {test.status !== 'pending' && test.status !== 'running' && (
                  <Text fontSize="2xs" color="gray.600">{test.duration}ms</Text>
                )}
                {test.status === 'passed' && <Badge size="xs" colorScheme="green" variant="subtle" fontSize="2xs">PASS</Badge>}
                {test.status === 'failed' && <Badge size="xs" colorScheme="red" variant="subtle" fontSize="2xs">FAIL</Badge>}
              </HStack>
            </HStack>
          ))}
        </VStack>

        <Box bg="blackAlpha.300" p={2} borderRadius="md" border="1px dashed" borderColor="whiteAlpha.200">
          <Text fontSize="2xs" color="gray.500">
            Total coverage: <Text as="span" color="green.400">98.42%</Text> | Tests: <Text as="span" color="white">{testSuites.length}</Text>
          </Text>
        </Box>
      </VStack>
    </Box>
  );
};
