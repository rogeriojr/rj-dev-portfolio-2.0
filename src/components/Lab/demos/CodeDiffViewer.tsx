import { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Textarea,
  useColorModeValue,
  Icon,
  SimpleGrid,
  Badge,
} from '@chakra-ui/react';
import { FaCode, FaPlus, FaMinus } from 'react-icons/fa';

interface DiffLine {
  type: 'added' | 'removed' | 'unchanged';
  content: string;
  lineNumber?: number;
}

export function CodeDiffViewer() {
  const [oldCode, setOldCode] = useState(`function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}`);

  const [newCode, setNewCode] = useState(`function calculateTotal(items) {
  return items.reduce((total, item) => total + item.price, 0);
}`);

  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const addedBg = useColorModeValue('green.50', 'green.900');
  const removedBg = useColorModeValue('red.50', 'red.900');

  const calculateDiff = (): DiffLine[] => {
    const oldLines = oldCode.split('\n');
    const newLines = newCode.split('\n');
    const diff: DiffLine[] = [];
    let oldIndex = 0;
    let newIndex = 0;

    while (oldIndex < oldLines.length || newIndex < newLines.length) {
      if (oldIndex >= oldLines.length) {
        diff.push({ type: 'added', content: newLines[newIndex], lineNumber: newIndex + 1 });
        newIndex++;
      } else if (newIndex >= newLines.length) {
        diff.push({ type: 'removed', content: oldLines[oldIndex], lineNumber: oldIndex + 1 });
        oldIndex++;
      } else if (oldLines[oldIndex] === newLines[newIndex]) {
        diff.push({ type: 'unchanged', content: oldLines[oldIndex], lineNumber: oldIndex + 1 });
        oldIndex++;
        newIndex++;
      } else {
        // Simple diff: mark old as removed, new as added
        diff.push({ type: 'removed', content: oldLines[oldIndex], lineNumber: oldIndex + 1 });
        diff.push({ type: 'added', content: newLines[newIndex], lineNumber: newIndex + 1 });
        oldIndex++;
        newIndex++;
      }
    }

    return diff;
  };

  const diff = calculateDiff();

  return (
    <Box w="full" maxW="1200px" mx="auto">
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <HStack spacing={2}>
          <Icon as={FaCode} color="blue.500" />
          <Text fontSize="lg" fontWeight="bold">
            Visualizador de Diff de Código
          </Text>
        </HStack>

        {/* Code Editors */}
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={4}>
          <VStack align="stretch" spacing={2}>
            <HStack justify="space-between">
              <Text fontSize="sm" fontWeight="bold" color="red.500">
                Código Antigo
              </Text>
              <Badge colorScheme="red">Removido</Badge>
            </HStack>
            <Textarea
              value={oldCode}
              onChange={(e) => setOldCode(e.target.value)}
              fontFamily="mono"
              fontSize="sm"
              rows={12}
              bg={bg}
              borderColor={borderColor}
            />
          </VStack>

          <VStack align="stretch" spacing={2}>
            <HStack justify="space-between">
              <Text fontSize="sm" fontWeight="bold" color="green.500">
                Código Novo
              </Text>
              <Badge colorScheme="green">Adicionado</Badge>
            </HStack>
            <Textarea
              value={newCode}
              onChange={(e) => setNewCode(e.target.value)}
              fontFamily="mono"
              fontSize="sm"
              rows={12}
              bg={bg}
              borderColor={borderColor}
            />
          </VStack>
        </SimpleGrid>

        {/* Diff View */}
        <Box>
          <Text fontSize="md" fontWeight="bold" mb={3}>
            Diff Unificado
          </Text>
          <Box
            p={4}
            bg={bg}
            borderRadius="lg"
            border="1px solid"
            borderColor={borderColor}
            fontFamily="mono"
            fontSize="sm"
            maxH="400px"
            overflowY="auto"
          >
            <VStack align="stretch" spacing={1}>
              {diff.map((line, idx) => (
                <HStack
                  key={idx}
                  spacing={2}
                  p={1}
                  bg={
                    line.type === 'added'
                      ? addedBg
                      : line.type === 'removed'
                      ? removedBg
                      : 'transparent'
                  }
                  borderRadius="sm"
                >
                  <HStack spacing={1} w="60px" flexShrink={0}>
                    {line.type === 'added' && <Icon as={FaPlus} color="green.500" w={3} h={3} />}
                    {line.type === 'removed' && <Icon as={FaMinus} color="red.500" w={3} h={3} />}
                    {line.type === 'unchanged' && <Text fontSize="xs" color="gray.400" w={3} />}
                    {line.lineNumber && (
                      <Text fontSize="xs" color="gray.500" w="40px" textAlign="right">
                        {line.lineNumber}
                      </Text>
                    )}
                  </HStack>
                  <Text
                    color={
                      line.type === 'added'
                        ? 'green.700'
                        : line.type === 'removed'
                        ? 'red.700'
                        : 'inherit'
                    }
                    flex={1}
                  >
                    {line.content || ' '}
                  </Text>
                </HStack>
              ))}
            </VStack>
          </Box>
        </Box>

        {/* Stats */}
        <HStack spacing={4} justify="center" flexWrap="wrap">
          <Badge colorScheme="red" fontSize="sm" px={3} py={1}>
            {diff.filter((l) => l.type === 'removed').length} linhas removidas
          </Badge>
          <Badge colorScheme="green" fontSize="sm" px={3} py={1}>
            {diff.filter((l) => l.type === 'added').length} linhas adicionadas
          </Badge>
          <Badge colorScheme="gray" fontSize="sm" px={3} py={1}>
            {diff.filter((l) => l.type === 'unchanged').length} linhas inalteradas
          </Badge>
        </HStack>
      </VStack>
    </Box>
  );
}
