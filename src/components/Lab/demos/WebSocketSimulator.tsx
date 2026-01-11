import { useState, useEffect, useRef } from 'react';
import { Box, VStack, HStack, Text, Button, Input, Badge, useColorModeValue, Code, Icon } from '@chakra-ui/react';
import { FaPlay, FaStop, FaPaperPlane, FaWifi } from 'react-icons/fa';

interface Message {
  id: string;
  type: 'sent' | 'received';
  content: string;
  timestamp: Date;
}

export function WebSocketSimulator() {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const wsRef = useRef<WebSocket | null>(null);
  const messageIdRef = useRef(0);

  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const sentBg = useColorModeValue('blue.100', 'blue.900');
  const receivedBg = useColorModeValue('green.100', 'green.900');

  const connect = () => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return;

    setIsConnected(true);
    const mockWs = {
      send: (data: string) => {
        setTimeout(() => {
          const mockResponse = {
            id: `msg-${++messageIdRef.current}`,
            type: 'received' as const,
            content: `Echo: ${data}`,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, mockResponse]);
        }, 300);
      },
      close: () => {
        setIsConnected(false);
      },
    } as WebSocket;

    wsRef.current = mockWs;
    setMessages((prev) => [
      ...prev,
      {
        id: `msg-${++messageIdRef.current}`,
        type: 'received',
        content: 'Connected to WebSocket server',
        timestamp: new Date(),
      },
    ]);
  };

  const disconnect = () => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${++messageIdRef.current}`,
          type: 'received',
          content: 'Disconnected from server',
          timestamp: new Date(),
        },
      ]);
    }
  };

  const sendMessage = () => {
    if (!inputValue.trim() || !isConnected) return;

    const newMessage: Message = {
      id: `msg-${++messageIdRef.current}`,
      type: 'sent',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    wsRef.current?.send(inputValue);
    setInputValue('');
  };

  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  return (
    <Box w="full" maxW="600px" mx="auto">
      <VStack spacing={4} align="stretch">
        <HStack justify="space-between" p={4} bg={bgColor} borderRadius="md" border="1px" borderColor={borderColor}>
          <HStack>
            <Icon as={FaWifi} color={isConnected ? 'green.400' : 'red.400'} opacity={isConnected ? 1 : 0.3} />
            <Text fontSize="sm" fontWeight="bold">
              Status: {isConnected ? 'Connected' : 'Disconnected'}
            </Text>
            <Badge colorScheme={isConnected ? 'green' : 'red'}>{isConnected ? 'LIVE' : 'OFFLINE'}</Badge>
          </HStack>
          <HStack>
            {!isConnected ? (
              <Button size="sm" leftIcon={<FaPlay />} onClick={connect} colorScheme="green">
                Connect
              </Button>
            ) : (
              <Button size="sm" leftIcon={<FaStop />} onClick={disconnect} colorScheme="red">
                Disconnect
              </Button>
            )}
          </HStack>
        </HStack>

        <Box
          h="300px"
          overflowY="auto"
          p={4}
          bg={useColorModeValue('blackAlpha.50', 'blackAlpha.300')}
          borderRadius="md"
          border="1px"
          borderColor={borderColor}
        >
          <VStack spacing={2} align="stretch">
            {messages.length === 0 ? (
              <Text fontSize="sm" color="gray.500" textAlign="center" py={8}>
                No messages yet. Connect and start chatting!
              </Text>
            ) : (
              messages.map((msg) => (
                <Box
                  key={msg.id}
                  p={3}
                  borderRadius="md"
                  bg={msg.type === 'sent' ? sentBg : receivedBg}
                  alignSelf={msg.type === 'sent' ? 'flex-end' : 'flex-start'}
                  maxW="80%"
                >
                  <Text fontSize="xs" color="gray.500" mb={1}>
                    {msg.type === 'sent' ? 'You' : 'Server'} • {msg.timestamp.toLocaleTimeString()}
                  </Text>
                  <Text fontSize="sm">{msg.content}</Text>
                </Box>
              ))
            )}
          </VStack>
        </Box>

        <HStack>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message..."
            isDisabled={!isConnected}
            bg={bgColor}
          />
          <Button
            leftIcon={<FaPaperPlane />}
            onClick={sendMessage}
            isDisabled={!isConnected || !inputValue.trim()}
            colorScheme="blue"
          >
            Send
          </Button>
        </HStack>

        <Box p={3} bg="blue.50" borderRadius="md" border="1px" borderColor="blue.200">
          <Text fontSize="xs" color="blue.700">
            <Code fontSize="xs">WebSocket</Code> provides full-duplex communication over a single TCP connection.
            Messages are sent and received in real-time with low latency.
          </Text>
        </Box>
      </VStack>
    </Box>
  );
}
