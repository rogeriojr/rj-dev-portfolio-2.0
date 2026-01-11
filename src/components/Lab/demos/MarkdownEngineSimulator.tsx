import { useState } from 'react';
import {
  Box, VStack, HStack, Text, Textarea,
  Icon, Badge, Divider, Grid, GridItem,
} from '@chakra-ui/react';
import { FaMarkdown, FaEye, FaPen } from 'react-icons/fa';

const defaultMd = `# Advanced Portfolio Architecture
---
**Senior Engineer** status achieved. 👋

## Tech Stack
*   React 18 / Vite
*   Chakra UI
*   TypeScript Mastery

> "Simplicity is the soul of efficiency."
`;

export const MarkdownEngineSimulator = () => {
  const [markdown, setMarkdown] = useState(defaultMd);

  const renderPreview = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('# ')) return <Text key={i} fontSize="lg" fontWeight="bold" color="cyan.400">{line.replace('# ', '')}</Text>;
      if (line.startsWith('## ')) return <Text key={i} fontSize="md" fontWeight="bold" color="purple.400" mt={2}>{line.replace('## ', '')}</Text>;
      if (line.startsWith('* ')) return <Text key={i} fontSize="xs" color="gray.300" ml={4}>• {line.replace('* ', '')}</Text>;
      if (line.startsWith('> ')) return <Box key={i} pl={4} borderLeft="3px solid" borderColor="whiteAlpha.300" fontStyle="italic" color="gray.500" my={2}><Text fontSize="xs">{line.replace('> ', '')}</Text></Box>;
      if (line.startsWith('---')) return <Divider key={i} my={2} borderColor="whiteAlpha.100" />;
      if (line.startsWith('**')) return <Text key={i} fontSize="xs" fontWeight="bold" color="white">{line.replace(/\*\*/g, '')}</Text>;
      return <Text key={i} fontSize="xs" color="gray.400">{line}</Text>;
    });
  };

  return (
    <Box
      p={4}
      bg="rgba(10, 15, 30, 0.6)"
      borderRadius="xl"
      border="1px solid rgba(255,255,255,0.1)"
      maxW="700px"
      mx="auto"
    >
      <VStack align="stretch" spacing={4}>
        <HStack justify="space-between" mb={2} borderBottom="1px solid" borderColor="whiteAlpha.100" pb={2}>
          <HStack>
            <Icon as={FaMarkdown} color="cyan.400" />
            <Text fontSize="xs" fontWeight="bold" color="whiteAlpha.700" letterSpacing="widest">MARKDOWN_CORE_ENGINE</Text>
          </HStack>
          <Badge colorScheme="cyan" variant="subtle" fontSize="9px">REMARK_REHYPE_PIPE</Badge>
        </HStack>

        <Grid templateColumns="repeat(2, 1fr)" gap={4} h="300px">
          <GridItem display="flex" flexDirection="column">
            <HStack mb={2} color="whiteAlpha.400">
              <Icon as={FaPen} boxSize={2} />
              <Text fontSize="9px" fontWeight="bold">SOURCE_INPUT</Text>
            </HStack>
            <Textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              flex={1}
              bg="blackAlpha.400"
              border="1px solid"
              borderColor="whiteAlpha.100"
              fontSize="10px"
              fontFamily="mono"
              color="cyan.300"
              p={3}
              _focus={{ borderColor: 'cyan.500' }}
              resize="none"
            />
          </GridItem>

          <GridItem display="flex" flexDirection="column">
            <HStack mb={2} color="whiteAlpha.400">
              <Icon as={FaEye} boxSize={2} />
              <Text fontSize="9px" fontWeight="bold">REALTIME_RENDER</Text>
            </HStack>
            <Box
              flex={1}
              bg="whiteAlpha.50"
              borderRadius="md"
              p={3}
              overflowY="auto"
              border="1px solid"
              borderColor="whiteAlpha.100"
              className="custom-scroll"
            >
              {renderPreview(markdown)}
            </Box>
          </GridItem>
        </Grid>

        <HStack p={2} bg="whiteAlpha.100" borderRadius="md" justify="start">
          <Text fontSize="9px" color="whiteAlpha.400">STATUS: READY | PARSER: MOCK_BETA_1.2</Text>
        </HStack>
      </VStack>
    </Box>
  );
};
