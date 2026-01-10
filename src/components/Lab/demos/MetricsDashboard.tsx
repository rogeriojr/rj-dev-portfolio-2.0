import { useState, useEffect } from 'react';
import {
  Box, Grid, GridItem, Text, VStack, HStack,
  Stat, StatLabel, StatNumber, StatHelpText, StatArrow,
  Icon, Flex, Badge
} from '@chakra-ui/react';
import { FaMicrochip, FaMemory, FaExclamationCircle, FaChartLine } from 'react-icons/fa';

const SimpleLineChart = ({ data, color }: { data: number[], color: string }) => {
  const max = Math.max(...data, 100);
  const min = Math.min(...data, 0);
  const range = max - min;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * 100},${100 - ((v - min) / (range || 1)) * 100}`).join(' ');

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: '100%', height: '50px' }}>
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        points={points}
      />
    </svg>
  );
};

export const MetricsDashboard = () => {
  const [cpu, setCpu] = useState<number[]>(new Array(20).fill(0));
  const [mem, setMem] = useState<number[]>(new Array(20).fill(0));
  const [latency, setLatency] = useState(45);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpu(prev => [...prev.slice(1), Math.floor(Math.random() * 40) + 20]);
      setMem(prev => [...prev.slice(1), Math.floor(Math.random() * 20) + 60]);
      setLatency(Math.floor(Math.random() * 10) + 40);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      p={4}
      bg="rgba(10, 15, 35, 0.6)"
      borderRadius="xl"
      border="1px solid rgba(255,255,255,0.1)"
      backdropFilter="blur(10px)"
    >
      <VStack align="stretch" spacing={4}>
        <HStack justify="space-between" mb={2}>
          <HStack>
            <Icon as={FaChartLine} color="cyan.400" />
            <Text fontSize="sm" fontWeight="bold" color="whiteAlpha.800">SYSTEM_METRICS_V2</Text>
          </HStack>
          <Badge colorScheme="green" variant="outline">LIVE</Badge>
        </HStack>

        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <GridItem p={3} bg="whiteAlpha.50" borderRadius="lg">
            <Stat>
              <HStack justify="space-between">
                <StatLabel fontSize="2xs" color="whiteAlpha.600">CPU_LOAD</StatLabel>
                <Icon as={FaMicrochip} color="cyan.400" boxSize={3} />
              </HStack>
              <StatNumber fontSize="lg" color="white">{cpu[cpu.length - 1]}%</StatNumber>
              <Box mt={2}>
                <SimpleLineChart data={cpu} color="#4FD1C5" />
              </Box>
            </Stat>
          </GridItem>

          <GridItem p={3} bg="whiteAlpha.50" borderRadius="lg">
            <Stat>
              <HStack justify="space-between">
                <StatLabel fontSize="2xs" color="whiteAlpha.600">MEMORY_USAGE</StatLabel>
                <Icon as={FaMemory} color="purple.400" boxSize={3} />
              </HStack>
              <StatNumber fontSize="lg" color="white">{mem[mem.length - 1]}%</StatNumber>
              <Box mt={2}>
                <SimpleLineChart data={mem} color="#9F7AEA" />
              </Box>
            </Stat>
          </GridItem>
        </Grid>

        <Box p={3} bg="red.900" borderRadius="lg" border="1px solid" borderColor="red.900">
          <HStack justify="space-between">
            <VStack align="start" spacing={0}>
              <Text fontSize="2xs" color="red.300" fontWeight="bold">P99_LATENCY</Text>
              <Text fontSize="xl" fontWeight="bold" color="white">{latency}ms</Text>
            </VStack>
            <Flex direction="column" align="end">
              <StatHelpText m={0} color="red.300">
                <StatArrow type="increase" />
                2.4%
              </StatHelpText>
              <Icon as={FaExclamationCircle} color="red.400" boxSize={4} />
            </Flex>
          </HStack>
        </Box>

        <Text fontSize="9px" color="whiteAlpha.400" textAlign="center">
          COLLECTOR_ID: worker-node-04-gcp | REFRESH: 1500ms
        </Text>
      </VStack>
    </Box>
  );
};
