import { useState, useRef } from 'react';
import { Box, Button, Text, Wrap, WrapItem, Tooltip } from '@chakra-ui/react';

const SAMPLE_TEXT = "Artificial Intelligence is transforming the way we build software, acting as a creative partner rather than just a tool. 🤖✨";

export const TokenStreamVisualizer = () => {
  const [tokens, setTokens] = useState<string[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Simple "tokenizer" by splitting by space for demo purposes, or chunks of chars
  const allTokens = SAMPLE_TEXT.match(/.{1,4}/g) || [];

  const startStream = () => {
    if (isStreaming) return;
    setTokens([]);
    setIsStreaming(true);
    let currentIndex = 0;

    intervalRef.current = setInterval(() => {
      if (currentIndex >= allTokens.length) {
        clearInterval(intervalRef.current!);
        setIsStreaming(false);
        return;
      }

      setTokens(prev => [...prev, allTokens[currentIndex]]);
      currentIndex++;
    }, 100); // 100ms per token
  };

  const stopStream = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsStreaming(false);
  };

  // Generate a consistent color for token visualization based on index
  const getTokenColor = (index: number) => {
    const colors = ['cyan.200', 'purple.200', 'green.200', 'yellow.200', 'pink.200'];
    return colors[index % colors.length];
  };

  return (
    <Box w="full" maxW="600px">
      <Box mb={4}>
        <Button
          size="sm"
          colorScheme={isStreaming ? "red" : "green"}
          onClick={isStreaming ? stopStream : startStream}
        >
          {isStreaming ? "Stop Generation" : "Generate Response"}
        </Button>
      </Box>

      <Box
        p={6}
        bg="gray.800"
        rounded="xl"
        minH="150px"
        border="1px solid"
        borderColor="gray.700"
        fontFamily="Share Tech Mono, monospace"
        fontSize="lg"
      >
        <Wrap spacing={1}>
          {tokens.map((token, idx) => (
            <Tooltip key={idx} label={`Token ID: ${Math.floor(Math.random() * 50000)}`} hasArrow bg="gray.700">
              <WrapItem>
                <Text
                  as="span"
                  bg={getTokenColor(idx)}
                  color="gray.900"
                  px={1}
                  rounded="sm"
                  cursor="default"
                  _hover={{ opacity: 0.8 }}
                >
                  {token}
                </Text>
              </WrapItem>
            </Tooltip>
          ))}
          {isStreaming && (
            <Text as="span" className="blinking-cursor" color="cyan.400">▍</Text>
          )}
        </Wrap>

        {tokens.length === 0 && !isStreaming && (
          <Text color="gray.500" fontStyle="italic">Click generate to visualize token streaming...</Text>
        )}
      </Box>

      <Text mt={2} fontSize="xs" color="gray.500">
        *Visualizes how LLMs generate text token-by-token. Hover over tokens to see IDs.
      </Text>
    </Box>
  );
};
