import { useState } from 'react';
import { Box, VStack, HStack, Text, Button, Textarea, Badge, useColorModeValue, Code, IconButton } from '@chakra-ui/react';
import { FaCopy, FaCheck, FaPlay, FaTrash } from 'react-icons/fa';

const defaultCode = `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Calculate first 10 Fibonacci numbers
for (let i = 0; i < 10; i++) {
  console.log(\`F(\${i}) = \${fibonacci(i)}\`);
}`;

export function CodeEditorSimulator() {
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [language] = useState('javascript');

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const editorBg = useColorModeValue('#1e1e1e', '#0d1117');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const executeCode = () => {
    const logs: string[] = [];
    const originalLog = console.log;
    console.log = (...args: unknown[]) => {
      logs.push(args.map((arg) => String(arg)).join(' '));
      originalLog(...args);
    };

    try {
      // Simple eval for demo (not safe for production!)
      eval(code);
      setOutput(logs.length > 0 ? logs : ['Code executed successfully']);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      setOutput([`Error: ${errorMessage}`]);
    } finally {
      console.log = originalLog;
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearOutput = () => {
    setOutput([]);
  };

  return (
    <Box w="full" maxW="900px" mx="auto">
      <VStack spacing={4} align="stretch">
        {/* Editor */}
        <Box
          borderRadius="md"
          overflow="hidden"
          border="1px"
          borderColor={borderColor}
          boxShadow="lg"
        >
          {/* Editor Header */}
          <HStack
            justify="space-between"
            p={2}
            bg={editorBg}
            borderBottom="1px"
            borderColor="whiteAlpha.100"
          >
            <HStack spacing={2}>
              <Box w={2} h={2} rounded="full" bg="red.500" />
              <Box w={2} h={2} rounded="full" bg="yellow.500" />
              <Box w={2} h={2} rounded="full" bg="green.500" />
              <Text fontSize="xs" color="gray.400" ml={2}>
                editor.{language}
              </Text>
            </HStack>
            <HStack>
              <IconButton
                aria-label="Copy code"
                icon={copied ? <FaCheck /> : <FaCopy />}
                size="xs"
                variant="ghost"
                color={copied ? 'green.400' : 'gray.400'}
                onClick={copyCode}
              />
              <Button
                size="xs"
                leftIcon={<FaPlay />}
                onClick={executeCode}
                colorScheme="green"
                bg="green.600"
                _hover={{ bg: 'green.700' }}
              >
                Run
              </Button>
            </HStack>
          </HStack>

          {/* Code Area */}
          <Box bg={editorBg} p={4} position="relative">
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              fontFamily="'Fira Code', 'Courier New', monospace"
              fontSize="sm"
              bg="transparent"
              color="gray.100"
              border="none"
              resize="none"
              minH="300px"
              _focus={{ outline: 'none' }}
              style={{ tabSize: 2 }}
            />
            <Badge
              position="absolute"
              top={2}
              right={2}
              colorScheme="blue"
              fontSize="xs"
            >
              {code.split('\n').length} lines
            </Badge>
          </Box>
        </Box>

        {/* Output */}
        {output.length > 0 && (
          <Box
            p={4}
            bg={bgColor}
            borderRadius="md"
            border="1px"
            borderColor={borderColor}
          >
            <HStack justify="space-between" mb={2}>
              <Text fontSize="sm" fontWeight="bold" color="gray.500">
                Output
              </Text>
              <IconButton
                aria-label="Clear output"
                icon={<FaTrash />}
                size="xs"
                variant="ghost"
                onClick={clearOutput}
              />
            </HStack>
            <Box
              p={3}
              bg="blackAlpha.800"
              borderRadius="md"
              fontFamily="monospace"
              fontSize="sm"
              color="green.300"
              maxH="200px"
              overflowY="auto"
            >
              {output.map((line, idx) => (
                <Text key={idx}>{line}</Text>
              ))}
            </Box>
          </Box>
        )}

        {/* Info */}
        <Box p={3} bg="green.50" borderRadius="md" border="1px" borderColor="green.200">
          <Text fontSize="xs" color="green.700">
            This is a simplified code editor. In production, use libraries like{' '}
            <Code fontSize="xs">Monaco Editor</Code> or <Code fontSize="xs">CodeMirror</Code> for
            syntax highlighting, autocomplete, and advanced features.
          </Text>
        </Box>
      </VStack>
    </Box>
  );
}
