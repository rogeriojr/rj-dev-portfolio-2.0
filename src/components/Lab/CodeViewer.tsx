import React from 'react';
import { Box, Text, useColorModeValue, Flex, Icon } from '@chakra-ui/react';
import { FaCode } from 'react-icons/fa';

interface CodeViewerProps {
  code: string;
  language?: string;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({ code, language = 'typescript' }) => {
  const bg = useColorModeValue('gray.50', 'gray.900');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  return (
    <Box
      rounded="lg"
      overflow="hidden"
      border="1px"
      borderColor={borderColor}
      bg={bg}
      mt={4}
    >
      <Flex px={4} py={2} bg={useColorModeValue('gray.100', 'whiteAlpha.50')} align="center" justify="space-between">
        <Flex align="center" gap={2}>
          <Icon as={FaCode} color="gray.500" />
          <Text fontSize="xs" fontWeight="bold" textTransform="uppercase" color="gray.500">
            {language}
          </Text>
        </Flex>
        <Flex gap={1}>
          <Box w={3} h={3} rounded="full" bg="red.400" />
          <Box w={3} h={3} rounded="full" bg="yellow.400" />
          <Box w={3} h={3} rounded="full" bg="green.400" />
        </Flex>
      </Flex>
      <Box
        p={4}
        overflowX="auto"
        fontFamily="Share Tech Mono, monospace"
        fontSize="sm"
      >
        <pre>
          <code style={{ color: useColorModeValue('#2D3748', '#A0AEC0') }}>
            {code}
          </code>
        </pre>
      </Box>
    </Box>
  );
};
