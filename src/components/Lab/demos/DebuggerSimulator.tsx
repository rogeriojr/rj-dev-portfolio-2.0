import { useState } from 'react';
import {
  Box, VStack, HStack, Text, Button,
  Icon, Badge, Code, Divider, List, ListItem
} from '@chakra-ui/react';
import { FaStepForward, FaUndo, FaBug, FaCrosshairs } from 'react-icons/fa';

const codeLines = [
  "function calculateTotal(items) {",
  "  let total = 0;",
  "  items.forEach(item => {",
  "    if (item.active) {",
  "      total += item.price;",
  "    }",
  "  });",
  "  return total;",
  "}"
];

export const DebuggerSimulator = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const [variables, setVariables] = useState<Record<string, any>>({ total: 'undefined', item: 'null', active: 'false' });
  const [isFinished, setIsFinished] = useState(false);

  const step = () => {
    const nextLine = (currentLine + 1) % codeLines.length;
    setCurrentLine(nextLine);

    if (nextLine === 1) setVariables((v: any) => ({ ...v, total: 0 }));
    if (nextLine === 4) setVariables((v: any) => ({ ...v, item: '{ id: 1, price: 99 }', active: 'true' }));
    if (nextLine === 5) setVariables((v: any) => ({ ...v, total: 99 }));
    if (nextLine === 8) {
      setIsFinished(true);
      setVariables((v: any) => ({ ...v, active: 'done' }));
    } else {
      setIsFinished(false);
    }
  };

  const reset = () => {
    setCurrentLine(0);
    setVariables({ total: 'undefined', item: 'null', active: 'false' });
    setIsFinished(false);
  };

  return (
    <Box
      bg="rgba(15, 20, 40, 0.9)"
      p={4}
      borderRadius="xl"
      border="1px solid"
      borderColor="whiteAlpha.200"
      boxShadow="dark-lg"
      maxW="550px"
      mx="auto"
    >
      <VStack align="stretch" spacing={4}>
        <HStack justify="space-between" bg="whiteAlpha.100" p={2} m={-4} mb={0} borderTopRadius="xl">
          <HStack>
            <Icon as={FaBug} color="red.400" />
            <Text fontSize="xs" fontWeight="bold" color="whiteAlpha.700">NODE_DEBUG_SESSION</Text>
          </HStack>
          <HStack spacing={2}>
            <Button size="xs" fontSize="9px" h="20px" leftIcon={<FaStepForward />} colorScheme="blue" onClick={step} isDisabled={isFinished}>STEP</Button>
            <Button size="xs" fontSize="9px" h="20px" leftIcon={<FaUndo />} variant="ghost" color="whiteAlpha.500" onClick={reset}>RESET</Button>
          </HStack>
        </HStack>

        <HStack align="start" spacing={4} pt={2}>
          <Box flex={1} bg="blackAlpha.400" border="1px solid" borderColor="whiteAlpha.100" borderRadius="md" p={2}>
            {codeLines.map((line, idx) => (
              <HStack key={idx} spacing={3} bg={currentLine === idx ? "whiteAlpha.200" : "transparent"} borderRadius="sm">
                <Text fontSize="10px" color="whiteAlpha.300" w="15px" textAlign="right">{idx + 1}</Text>
                {currentLine === idx && <Icon as={FaCrosshairs} color="cyan.400" boxSize={2} />}
                <Code bg="transparent" color={currentLine === idx ? "cyan.400" : "gray.300"} fontSize="11px" whiteSpace="pre">
                  {line}
                </Code>
              </HStack>
            ))}
          </Box>

          <Box w="180px" bg="whiteAlpha.50" p={3} borderRadius="md" borderLeft="2px solid" borderColor="purple.500">
            <Text fontSize="2xs" fontWeight="bold" color="purple.300" mb={2}>VARIABLES</Text>
            <VStack align="stretch" spacing={2}>
              {Object.entries(variables).map(([key, val]) => (
                <HStack key={key} justify="space-between">
                  <Text fontSize="2xs" color="whiteAlpha.500">{key}:</Text>
                  <Badge fontSize="9px" colorScheme="cyan" variant="subtle">{typeof val === 'string' ? val : JSON.stringify(val)}</Badge>
                </HStack>
              ))}
            </VStack>
          </Box>
        </HStack>

        <Divider borderColor="whiteAlpha.100" />

        <Box px={2}>
          <Text fontSize="9px" color="whiteAlpha.400" mb={1}>CALL_STACK</Text>
          <List spacing={1}>
            <ListItem fontSize="9px" color="whiteAlpha.800" borderLeft="2px solid" borderColor="green.400" pl={2}>
              calculateTotal(items) line: {currentLine + 1}
            </ListItem>
            <ListItem fontSize="9px" color="whiteAlpha.400" borderLeft="2px solid" borderColor="whiteAlpha.200" pl={2}>
              (anonymous) line: 42
            </ListItem>
          </List>
        </Box>
      </VStack>
    </Box>
  );
};
