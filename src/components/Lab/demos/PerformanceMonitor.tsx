import { useState, useEffect } from 'react';
import { Box, VStack, HStack, Text, Button, Progress, Badge, useColorModeValue, SimpleGrid, Icon } from '@chakra-ui/react';
import { FaMemory, FaMicrochip, FaNetworkWired, FaClock, FaChartLine } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { motion } from 'framer-motion';

interface Metric {
  name: string;
  value: number;
  max: number;
  unit: string;
  icon: IconType;
  color: string;
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<Metric[]>([
    { name: 'CPU', value: 45, max: 100, unit: '%', icon: FaMicrochip, color: 'blue' },
    { name: 'Memory', value: 62, max: 100, unit: '%', icon: FaMemory, color: 'purple' },
    { name: 'Network', value: 28, max: 100, unit: 'Mbps', icon: FaNetworkWired, color: 'green' },
    { name: 'Response Time', value: 120, max: 500, unit: 'ms', icon: FaClock, color: 'orange' },
  ]);

  const [isMonitoring, setIsMonitoring] = useState(true);

  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  useEffect(() => {
    if (!isMonitoring) return;

    const interval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((metric) => ({
          ...metric,
          value: Math.max(
            0,
            Math.min(
              metric.max,
              metric.value + (Math.random() - 0.5) * (metric.max * 0.1)
            )
          ),
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [isMonitoring]);

  const getStatusColor = (value: number, max: number) => {
    const percentage = (value / max) * 100;
    if (percentage > 80) return 'red';
    if (percentage > 60) return 'yellow';
    return 'green';
  };

  return (
    <Box w="full" maxW="800px" mx="auto">
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <HStack justify="space-between">
          <HStack>
            <Icon as={FaChartLine} color="cyan.400" />
            <Text fontSize="lg" fontWeight="bold">
              Performance Monitor
            </Text>
          </HStack>
          <Badge colorScheme={isMonitoring ? 'green' : 'gray'}>
            {isMonitoring ? 'LIVE' : 'PAUSED'}
          </Badge>
        </HStack>

        {/* Metrics Grid */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          {metrics.map((metric) => {
            const percentage = (metric.value / metric.max) * 100;
            const statusColor = getStatusColor(metric.value, metric.max);

            return (
              <motion.div
                key={metric.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Box
                  p={6}
                  bg={bgColor}
                  borderRadius="xl"
                  border="1px"
                  borderColor={borderColor}
                >
                  <HStack justify="space-between" mb={4}>
                    <HStack>
                      <Icon as={metric.icon} color={`${metric.color}.400`} />
                      <Text fontWeight="bold">{metric.name}</Text>
                    </HStack>
                    <Badge colorScheme={statusColor} fontSize="sm">
                      {metric.value.toFixed(1)}
                      {metric.unit}
                    </Badge>
                  </HStack>

                  <Progress
                    value={percentage}
                    colorScheme={statusColor}
                    size="lg"
                    borderRadius="full"
                    mb={2}
                  />

                  <HStack justify="space-between" fontSize="xs" color="gray.500">
                    <Text>0 {metric.unit}</Text>
                    <Text>
                      {metric.max} {metric.unit}
                    </Text>
                  </HStack>
                </Box>
              </motion.div>
            );
          })}
        </SimpleGrid>

        {/* Controls */}
        <Box p={4} bg={bgColor} borderRadius="md" border="1px" borderColor={borderColor}>
          <HStack justify="center">
            <Button
              size="sm"
              onClick={() => setIsMonitoring(!isMonitoring)}
              colorScheme={isMonitoring ? 'red' : 'green'}
            >
              {isMonitoring ? 'Pause Monitoring' : 'Start Monitoring'}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setMetrics([
                  { name: 'CPU', value: 45, max: 100, unit: '%', icon: FaMicrochip, color: 'blue' },
                  { name: 'Memory', value: 62, max: 100, unit: '%', icon: FaMemory, color: 'purple' },
                  { name: 'Network', value: 28, max: 100, unit: 'Mbps', icon: FaNetworkWired, color: 'green' },
                  { name: 'Response Time', value: 120, max: 500, unit: 'ms', icon: FaClock, color: 'orange' },
                ]);
              }}
            >
              Reset
            </Button>
          </HStack>
        </Box>

        {/* Info */}
        <Box p={3} bg="blue.50" borderRadius="md" border="1px" borderColor="blue.200">
          <Text fontSize="xs" color="blue.700">
            Real-time performance monitoring helps identify bottlenecks and optimize application
            performance. Monitor CPU, memory, network, and response times to ensure optimal user experience.
          </Text>
        </Box>
      </VStack>
    </Box>
  );
}
