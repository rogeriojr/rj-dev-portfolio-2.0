import { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Select,
  useColorModeValue,
  Icon,
  SimpleGrid,
  Card,
  CardBody,
} from '@chakra-ui/react';
import { FaChartLine } from 'react-icons/fa';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

interface DataPoint {
  label: string;
  value: number;
  color: string;
}

const SAMPLE_DATA: DataPoint[] = [
  { label: 'React', value: 85, color: 'blue.400' },
  { label: 'TypeScript', value: 90, color: 'cyan.400' },
  { label: 'Node.js', value: 80, color: 'green.400' },
  { label: 'AI/ML', value: 75, color: 'purple.400' },
  { label: 'Cloud', value: 70, color: 'orange.400' },
];

export function DataVisualization() {
  const [chartType, setChartType] = useState<'bar' | 'line' | 'pie' | 'area'>('bar');
  const [data] = useState<DataPoint[]>(SAMPLE_DATA);

  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const cardBg = useColorModeValue('gray.50', 'gray.700');

  const maxValue = Math.max(...data.map((d) => d.value));

  const renderBarChart = () => (
    <VStack spacing={3} align="stretch" h="300px" justify="flex-end">
      {data.map((item, idx) => (
        <HStack key={item.label} spacing={3} align="center">
          <Text fontSize="sm" w="100px" textAlign="right">
            {item.label}
          </Text>
          <Box flex={1} position="relative">
            <MotionBox
              h="30px"
              bg={item.color}
              borderRadius="md"
              initial={{ width: 0 }}
              animate={{ width: `${(item.value / maxValue) * 100}%` }}
              transition={{ duration: 1, delay: idx * 0.1 }}
              display="flex"
              alignItems="center"
              justifyContent="flex-end"
              pr={2}
            >
              <Text fontSize="xs" color="white" fontWeight="bold">
                {item.value}%
              </Text>
            </MotionBox>
          </Box>
        </HStack>
      ))}
    </VStack>
  );

  const renderLineChart = () => (
    <Box h="300px" position="relative" p={4}>
      <svg width="100%" height="100%" viewBox="0 0 400 250">
        <polyline
          points={data
            .map(
              (item, idx) =>
                `${(idx * 400) / (data.length - 1)},${250 - (item.value / maxValue) * 200}`
            )
            .join(' ')}
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {data.map((item, idx) => (
          <circle
            key={item.label}
            cx={(idx * 400) / (data.length - 1)}
            cy={250 - (item.value / maxValue) * 200}
            r="6"
            fill={item.color}
          />
        ))}
      </svg>
    </Box>
  );

  const renderPieChart = () => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = 0;

    return (
      <Box h="300px" display="flex" alignItems="center" justifyContent="center">
        <svg width="250" height="250" viewBox="0 0 250 250">
          {data.map((item) => {
            const angle = (item.value / total) * 360;
            const startAngle = currentAngle;
            currentAngle += angle;

            const x1 = 125 + 100 * Math.cos((startAngle * Math.PI) / 180);
            const y1 = 125 + 100 * Math.sin((startAngle * Math.PI) / 180);
            const x2 = 125 + 100 * Math.cos((currentAngle * Math.PI) / 180);
            const y2 = 125 + 100 * Math.sin((currentAngle * Math.PI) / 180);
            const largeArc = angle > 180 ? 1 : 0;

            return (
              <path
                key={item.label}
                d={`M 125 125 L ${x1} ${y1} A 100 100 0 ${largeArc} 1 ${x2} ${y2} Z`}
                fill={item.color}
                stroke="white"
                strokeWidth="2"
              />
            );
          })}
        </svg>
      </Box>
    );
  };

  const renderAreaChart = () => (
    <Box h="300px" position="relative" p={4}>
      <svg width="100%" height="100%" viewBox="0 0 400 250">
        <defs>
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="purple.400" stopOpacity="0.8" />
            <stop offset="100%" stopColor="purple.400" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <path
          d={`M 0,250 ${data
            .map(
              (item, idx) =>
                `L ${(idx * 400) / (data.length - 1)},${250 - (item.value / maxValue) * 200}`
            )
            .join(' ')} L 400,250 Z`}
          fill="url(#areaGradient)"
        />
        <polyline
          points={data
            .map(
              (item, idx) =>
                `${(idx * 400) / (data.length - 1)},${250 - (item.value / maxValue) * 200}`
            )
            .join(' ')}
          fill="none"
          stroke="purple.400"
          strokeWidth="3"
        />
      </svg>
    </Box>
  );

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return renderBarChart();
      case 'line':
        return renderLineChart();
      case 'pie':
        return renderPieChart();
      case 'area':
        return renderAreaChart();
      default:
        return renderBarChart();
    }
  };

  return (
    <Box w="full" maxW="800px" mx="auto">
      <VStack spacing={6} align="stretch">
        {/* Controls */}
        <HStack justify="space-between" flexWrap="wrap" gap={3}>
          <HStack spacing={2}>
            <Icon as={FaChartLine} color="blue.500" />
            <Text fontSize="lg" fontWeight="bold">
              Visualização de Dados
            </Text>
          </HStack>
          <Select
            value={chartType}
            onChange={(e) => setChartType(e.target.value as 'bar' | 'line' | 'pie' | 'area')}
            maxW="200px"
          >
            <option value="bar">Gráfico de Barras</option>
            <option value="line">Gráfico de Linha</option>
            <option value="pie">Gráfico de Pizza</option>
            <option value="area">Gráfico de Área</option>
          </Select>
        </HStack>

        {/* Chart */}
        <Box
          p={6}
          bg={bg}
          borderRadius="xl"
          border="1px solid"
          borderColor={borderColor}
          minH="350px"
        >
          {renderChart()}
        </Box>

        {/* Legend */}
        <SimpleGrid columns={{ base: 2, md: 5 }} spacing={3}>
          {data.map((item) => (
            <Card key={item.label} bg={cardBg} size="sm">
              <CardBody p={3}>
                <HStack spacing={2}>
                  <Box w={4} h={4} bg={item.color} borderRadius="sm" />
                  <VStack align="start" spacing={0}>
                    <Text fontSize="sm" fontWeight="bold">
                      {item.value}%
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      {item.label}
                    </Text>
                  </VStack>
                </HStack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
}
