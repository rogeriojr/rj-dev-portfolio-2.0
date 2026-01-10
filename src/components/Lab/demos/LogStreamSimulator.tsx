import { useState, useEffect, useRef } from 'react';
import {
  Box, VStack, HStack, Text, Badge, Icon,
  Input, Select, IconButton, Code,
  Collapse
} from '@chakra-ui/react';
import { FaTerminal, FaSearch, FaTrash } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface LogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  payload?: any;
}

const levelColors = {
  info: 'blue.400',
  warn: 'yellow.400',
  error: 'red.400',
  debug: 'purple.400'
};

export const LogStreamSimulator = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [filter, setFilter] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [selectedLog, setSelectedLog] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const messages = [
    { level: 'info', msg: 'Incoming request: GET /api/v1/users' },
    { level: 'debug', msg: 'Cache hit for key: user_123' },
    { level: 'info', msg: 'Payment processed successfully' },
    { level: 'warn', msg: 'Rate limit approaching for IP: 192.168.1.1' },
    { level: 'error', msg: 'Database connection timeout' },
    { level: 'info', msg: 'Worker node 04 heartbeat received' },
    { level: 'debug', msg: 'Hydrating state for session_abc' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const template = messages[Math.floor(Math.random() * messages.length)];
      const newLog: LogEntry = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toLocaleTimeString(),
        level: template.level as any,
        message: template.msg,
        payload: template.level === 'error' ? { status: 504, retry: true, stack: 'Error: ConnectionTimeout...' } : { requestId: 'req_' + Math.random().toString(36).substr(2, 5) }
      };
      setLogs((prev: LogEntry[]) => [...prev.slice(-49), newLog]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(filter.toLowerCase());
    const matchesLevel = levelFilter === 'all' || log.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  return (
    <Box
      bg="gray.900"
      borderRadius="xl"
      border="1px solid"
      borderColor="whiteAlpha.100"
      overflow="hidden"
      boxShadow="2xl"
      maxW="600px"
      mx="auto"
    >
      <HStack bg="whiteAlpha.50" p={3} borderBottom="1px solid" borderColor="whiteAlpha.100" justify="space-between">
        <HStack spacing={3}>
          <Icon as={FaTerminal} color="green.400" />
          <Text fontSize="xs" fontWeight="bold" color="whiteAlpha.700" letterSpacing="widest">STRUCTURED_LOG_STREAM</Text>
        </HStack>
        <HStack>
          <Select
            size="xs"
            variant="filled"
            bg="whiteAlpha.100"
            color="white"
            w="100px"
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
          >
            <option value="all">ALL LEVELS</option>
            <option value="info">INFO</option>
            <option value="warn">WARN</option>
            <option value="error">ERROR</option>
            <option value="debug">DEBUG</option>
          </Select>
          <IconButton
            aria-label="Clear logs"
            icon={<FaTrash />}
            size="xs"
            variant="ghost"
            onClick={() => setLogs([])}
            color="whiteAlpha.500"
          />
        </HStack>
      </HStack>

      <Box p={2} bg="blackAlpha.300">
        <HStack>
          <Icon as={FaSearch} color="whiteAlpha.300" boxSize={3} ml={2} />
          <Input
            placeholder="Filter logs..."
            size="xs"
            variant="unstyled"
            color="white"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </HStack>
      </Box>

      <Box
        h="250px"
        overflowY="auto"
        p={2}
        ref={scrollRef}
        css={{
          '&::-webkit-scrollbar': { width: '4px' },
          '&::-webkit-scrollbar-track': { background: 'transparent' },
          '&::-webkit-scrollbar-thumb': { background: 'rgba(255,255,255,0.1)', borderRadius: '10px' }
        }}
      >
        <VStack align="stretch" spacing={1}>
          <AnimatePresence>
            {filteredLogs.map((log: LogEntry) => (
              <Box key={log.id} onClick={() => setSelectedLog(selectedLog === log.id ? null : log.id)} cursor="pointer">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <HStack
                    fontSize="11px"
                    p={1}
                    borderRadius="sm"
                    _hover={{ bg: "whiteAlpha.100" }}
                    spacing={3}
                  >
                    <Text color="whiteAlpha.400" w="60px">{log.timestamp}</Text>
                    <Badge
                      variant="subtle"
                      fontSize="9px"
                      w="45px"
                      textAlign="center"
                      bg="transparent"
                      border="1px solid"
                      borderColor={(levelColors as any)[log.level]}
                      color={(levelColors as any)[log.level]}
                    >
                      {log.level.toUpperCase()}
                    </Badge>
                    <Text color="gray.300" isTruncated>{log.message}</Text>
                  </HStack>
                </motion.div>
                <Collapse in={selectedLog === log.id}>
                  <Box p={2} ml="105px" bg="whiteAlpha.50" borderRadius="md" my={1}>
                    <Code bg="transparent" color="cyan.400" fontSize="10px" display="block" whiteSpace="pre">
                      {JSON.stringify(log.payload, null, 2)}
                    </Code>
                  </Box>
                </Collapse>
              </Box>
            ))}
          </AnimatePresence>
        </VStack>
      </Box>
      <HStack p={2} bg="whiteAlpha.50" borderTop="1px solid" borderColor="whiteAlpha.100" justify="center">
        <Text fontSize="9px" color="whiteAlpha.400">LOG_ENGINE_ACTIVE | 100% PERSISTENCE</Text>
      </HStack>
    </Box>
  );
};
