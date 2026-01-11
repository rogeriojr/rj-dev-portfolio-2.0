import { useState } from 'react';
import { Box, VStack, HStack, Text, Button, Badge, useColorModeValue, Icon } from '@chakra-ui/react';
import { FaPlay, FaRedo, FaCheckCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

type State = 'idle' | 'loading' | 'success' | 'error';

interface Transition {
  from: State;
  to: State;
  event: string;
}

const transitions: Transition[] = [
  { from: 'idle', to: 'loading', event: 'FETCH' },
  { from: 'loading', to: 'success', event: 'SUCCESS' },
  { from: 'loading', to: 'error', event: 'ERROR' },
  { from: 'success', to: 'idle', event: 'RESET' },
  { from: 'error', to: 'idle', event: 'RESET' },
];

const stateColors: Record<State, string> = {
  idle: 'gray',
  loading: 'yellow',
  success: 'green',
  error: 'red',
};

export function StateMachineVisualizer() {
  const [currentState, setCurrentState] = useState<State>('idle');
  const [history, setHistory] = useState<{ state: State; timestamp: Date }[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handleTransition = (event: string) => {
    const transition = transitions.find((t) => t.from === currentState && t.event === event);
    if (transition) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentState(transition.to);
        setHistory((prev) => [...prev, { state: transition.to, timestamp: new Date() }]);
        setIsAnimating(false);
      }, 500);
    }
  };

  const reset = () => {
    setCurrentState('idle');
    setHistory([]);
  };

  const availableEvents = transitions
    .filter((t) => t.from === currentState)
    .map((t) => t.event);

  return (
    <Box w="full" maxW="700px" mx="auto">
      <VStack spacing={6} align="stretch">
        {/* Current State Display */}
        <Box
          p={6}
          bg={bgColor}
          borderRadius="xl"
          border="2px"
          borderColor={stateColors[currentState] + '.300'}
          textAlign="center"
          position="relative"
          overflow="hidden"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentState}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <VStack spacing={2}>
                <Badge colorScheme={stateColors[currentState]} fontSize="lg" px={4} py={2}>
                  {currentState.toUpperCase()}
                </Badge>
                <Text fontSize="sm" color="gray.500">
                  Current State
                </Text>
              </VStack>
            </motion.div>
          </AnimatePresence>
        </Box>

        {/* State Diagram */}
        <Box p={6} bg={bgColor} borderRadius="xl" border="1px" borderColor={borderColor}>
          <Text fontSize="sm" fontWeight="bold" mb={4} textTransform="uppercase" color="gray.500">
            State Machine Diagram
          </Text>
          <HStack spacing={4} justify="center" flexWrap="wrap">
            {(['idle', 'loading', 'success', 'error'] as State[]).map((state) => (
              <Box
                key={state}
                p={4}
                borderRadius="md"
                bg={currentState === state ? stateColors[state] + '.100' : 'transparent'}
                border="2px"
                borderColor={currentState === state ? stateColors[state] + '.400' : borderColor}
                borderStyle={currentState === state ? 'solid' : 'dashed'}
                opacity={currentState === state ? 1 : 0.5}
                transition="all 0.3s"
              >
                <Text fontSize="xs" fontWeight="bold" textTransform="uppercase">
                  {state}
                </Text>
              </Box>
            ))}
          </HStack>
        </Box>

        {/* Controls */}
        <Box p={4} bg={bgColor} borderRadius="md" border="1px" borderColor={borderColor}>
          <Text fontSize="sm" fontWeight="bold" mb={3} color="gray.500">
            Available Events
          </Text>
          <HStack spacing={2} flexWrap="wrap">
            {availableEvents.length > 0 ? (
              availableEvents.map((event) => (
                <Button
                  key={event}
                  size="sm"
                  onClick={() => handleTransition(event)}
                  isDisabled={isAnimating}
                  colorScheme={stateColors[currentState]}
                  leftIcon={<FaPlay />}
                >
                  {event}
                </Button>
              ))
            ) : (
              <Text fontSize="sm" color="gray.500">
                No available transitions from this state
              </Text>
            )}
            <Button size="sm" onClick={reset} variant="outline" leftIcon={<FaRedo />}>
              Reset
            </Button>
          </HStack>
        </Box>

        {/* History */}
        {history.length > 0 && (
          <Box p={4} bg={bgColor} borderRadius="md" border="1px" borderColor={borderColor}>
            <Text fontSize="sm" fontWeight="bold" mb={3} color="gray.500">
              Transition History
            </Text>
            <VStack spacing={2} align="stretch" maxH="200px" overflowY="auto">
              {history.slice(-5).reverse().map((entry, idx) => (
                <HStack key={idx} p={2} bg="whiteAlpha.50" borderRadius="md">
                  <Icon as={FaCheckCircle} color={stateColors[entry.state] + '.400'} />
                  <Text fontSize="xs">
                    {entry.state} • {entry.timestamp.toLocaleTimeString()}
                  </Text>
                </HStack>
              ))}
            </VStack>
          </Box>
        )}

        {/* Info */}
        <Box p={3} bg="purple.50" borderRadius="md" border="1px" borderColor="purple.200">
          <Text fontSize="xs" color="purple.700">
            State machines provide predictable state transitions and help prevent invalid states.
            Each state has defined events that trigger transitions to other states.
          </Text>
        </Box>
      </VStack>
    </Box>
  );
}
