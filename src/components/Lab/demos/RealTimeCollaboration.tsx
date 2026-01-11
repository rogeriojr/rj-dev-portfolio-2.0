import { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  Button,
  Avatar,
  useColorModeValue,
  Icon,
  Badge,
  Code,
  SimpleGrid,
} from '@chakra-ui/react';
import { FaUsers, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface User {
  id: string;
  name: string;
  color: string;
  isActive: boolean;
}

interface Change {
  id: string;
  userId: string;
  content: string;
  timestamp: Date;
}

const MotionBox = motion(Box);

export function RealTimeCollaboration() {
  const [users] = useState<User[]>([
    { id: '1', name: 'Você', color: 'blue.500', isActive: true },
    { id: '2', name: 'Colaborador 1', color: 'green.500', isActive: true },
    { id: '3', name: 'Colaborador 2', color: 'purple.500', isActive: false },
  ]);
  const [content, setContent] = useState('Documento colaborativo em tempo real...');
  const [changes, setChanges] = useState<Change[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const cardBg = useColorModeValue('gray.50', 'gray.700');

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      if (Math.random() > 0.7 && users[1].isActive) {
        const newChange: Change = {
          id: Date.now().toString(),
          userId: '2',
          content: 'Editou o documento',
          timestamp: new Date(),
        };
        setChanges((prev) => [newChange, ...prev].slice(0, 10));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [users]);

  const activeUsers = users.filter((u) => u.isActive);

  return (
    <Box w="full" maxW="900px" mx="auto">
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <HStack justify="space-between" flexWrap="wrap" gap={3}>
          <HStack spacing={2}>
            <Icon as={FaUsers} color="blue.500" />
            <Text fontSize="lg" fontWeight="bold">
              Colaboração em Tempo Real
            </Text>
          </HStack>
          <HStack spacing={2}>
            <Badge colorScheme="green">Online</Badge>
            <Text fontSize="sm" color="gray.500">
              {activeUsers.length} usuários ativos
            </Text>
          </HStack>
        </HStack>

        {/* Active Users */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={3}>
          {users.map((user) => (
            <HStack
              key={user.id}
              p={3}
              bg={cardBg}
              borderRadius="md"
              border="1px solid"
              borderColor={user.isActive ? 'green.400' : borderColor}
              spacing={3}
            >
              <Avatar size="sm" bg={user.color} name={user.name} />
              <VStack align="start" spacing={0} flex={1}>
                <Text fontSize="sm" fontWeight="medium">
                  {user.name}
                </Text>
                <Text fontSize="xs" color="gray.500">
                  {user.isActive ? 'Editando...' : 'Offline'}
                </Text>
              </VStack>
              {user.isActive && (
                <MotionBox
                  as="span"
                  w={2}
                  h={2}
                  bg="green.500"
                  borderRadius="full"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </HStack>
          ))}
        </SimpleGrid>

        {/* Document Editor */}
        <Box
          p={6}
          bg={bg}
          borderRadius="xl"
          border="2px solid"
          borderColor={borderColor}
          minH="300px"
        >
          {isEditing ? (
            <VStack spacing={3} align="stretch">
              <Input
                value={content}
                onChange={(e) => setContent(e.target.value)}
                autoFocus
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && e.ctrlKey) {
                    setIsEditing(false);
                    const newChange: Change = {
                      id: Date.now().toString(),
                      userId: '1',
                      content: 'Atualizou o documento',
                      timestamp: new Date(),
                    };
                    setChanges((prev) => [newChange, ...prev].slice(0, 10));
                  }
                }}
              />
              <HStack justify="flex-end">
                <Button
                  size="sm"
                  leftIcon={<FaCheck />}
                  onClick={() => setIsEditing(false)}
                  colorScheme="green"
                >
                  Salvar
                </Button>
                <Button
                  size="sm"
                  leftIcon={<FaTimes />}
                  onClick={() => setIsEditing(false)}
                  variant="ghost"
                >
                  Cancelar
                </Button>
              </HStack>
            </VStack>
          ) : (
            <VStack align="start" spacing={3}>
              <Text fontSize="md" whiteSpace="pre-wrap">
                {content}
              </Text>
              <Button
                leftIcon={<FaEdit />}
                onClick={() => setIsEditing(true)}
                size="sm"
                variant="outline"
              >
                Editar
              </Button>
            </VStack>
          )}
        </Box>

        {/* Change History */}
        <Box>
          <Text fontSize="md" fontWeight="bold" mb={3}>
            Histórico de Mudanças
          </Text>
          <VStack spacing={2} align="stretch" maxH="200px" overflowY="auto">
            <AnimatePresence>
              {changes.length === 0 ? (
                <Text fontSize="sm" color="gray.500" textAlign="center" py={4}>
                  Nenhuma mudança ainda
                </Text>
              ) : (
                changes.map((change) => {
                  const user = users.find((u) => u.id === change.userId);
                  return (
                    <MotionBox
                      key={change.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      p={2}
                      bg={cardBg}
                      borderRadius="md"
                      border="1px solid"
                      borderColor={borderColor}
                    >
                      <HStack spacing={2}>
                        <Avatar size="xs" bg={user?.color} name={user?.name} />
                        <Text fontSize="xs" flex={1}>
                          <Text as="span" fontWeight="bold">
                            {user?.name}
                          </Text>{' '}
                          {change.content}
                        </Text>
                        <Text fontSize="2xs" color="gray.500">
                          {change.timestamp.toLocaleTimeString()}
                        </Text>
                      </HStack>
                    </MotionBox>
                  );
                })
              )}
            </AnimatePresence>
          </VStack>
        </Box>

        {/* Info */}
        <Box p={4} bg="blue.50" borderRadius="md" border="1px" borderColor="blue.200">
          <HStack spacing={2}>
            <Icon as={FaUsers} color="blue.500" />
            <Text fontSize="xs" color="blue.700">
              <Code fontSize="xs">WebSocket</Code> + <Code fontSize="xs">Operational Transform</Code> para
              colaboração em tempo real com sincronização de estado
            </Text>
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
}
