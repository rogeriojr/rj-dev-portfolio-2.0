import { useState, useRef, useEffect } from 'react';
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
} from '@chakra-ui/react';
import { FaPaperPlane, FaRobot, FaUser, FaStar } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const MotionBox = motion(Box);

export function AIChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Olá! Sou um assistente de IA. Como posso ajudar você hoje?',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const bg = useColorModeValue('gray.50', 'gray.800');
  const userBg = useColorModeValue('blue.500', 'blue.600');
  const aiBg = useColorModeValue('purple.500', 'purple.600');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('olá') || lowerMessage.includes('oi') || lowerMessage.includes('hello')) {
      return 'Olá! Como posso ajudar você hoje?';
    }
    if (lowerMessage.includes('portfólio') || lowerMessage.includes('projetos')) {
      return 'Este portfólio demonstra projetos em React, Node.js, IA e muito mais. Explore as seções para ver detalhes!';
    }
    if (lowerMessage.includes('tecnologia') || lowerMessage.includes('stack')) {
      return 'As principais tecnologias incluem React, TypeScript, Node.js, NestJS, e integrações com IA usando LLMs e RAG.';
    }
    if (lowerMessage.includes('experiência') || lowerMessage.includes('anos')) {
      return 'Tenho mais de 8 anos de experiência em desenvolvimento full-stack, com foco em soluções escaláveis e modernas.';
    }
    if (lowerMessage.includes('contato') || lowerMessage.includes('email')) {
      return 'Você pode me contatar através dos links sociais na página inicial ou baixar meu currículo.';
    }
    
    return `Entendi sua mensagem sobre "${userMessage}". Como assistente de IA, posso ajudar com informações sobre o portfólio, tecnologias utilizadas e projetos desenvolvidos. O que mais você gostaria de saber?`;
  };

  const sendMessage = () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateAIResponse(inputValue),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  return (
    <Box w="full" maxW="700px" mx="auto" h="600px" display="flex" flexDirection="column">
      {/* Header */}
      <HStack
        p={4}
        bg={aiBg}
        color="white"
        borderRadius="lg"
        mb={4}
        spacing={3}
      >
        <Icon as={FaRobot} w={6} h={6} />
        <VStack align="start" spacing={0} flex={1}>
          <Text fontWeight="bold">Assistente de IA</Text>
          <Text fontSize="xs" opacity={0.9}>
            Powered by AI • RAG System
          </Text>
        </VStack>
        <Badge colorScheme="green" variant="solid">
          Online
        </Badge>
      </HStack>

      {/* Messages */}
      <VStack
        spacing={3}
        align="stretch"
        flex={1}
        overflowY="auto"
        p={4}
        bg={bg}
        borderRadius="lg"
        border="1px solid"
        borderColor={borderColor}
      >
        <AnimatePresence>
          {messages.map((message) => (
            <MotionBox
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <HStack
                align="start"
                spacing={3}
                justify={message.role === 'user' ? 'flex-end' : 'flex-start'}
                flexDirection={message.role === 'user' ? 'row-reverse' : 'row'}
              >
                <Avatar
                  size="sm"
                  bg={message.role === 'user' ? userBg : aiBg}
                  icon={
                    message.role === 'user' ? (
                      <Icon as={FaUser} />
                    ) : (
                      <Icon as={FaRobot} />
                    )
                  }
                />
                <Box
                  maxW="70%"
                  p={3}
                  borderRadius="lg"
                  bg={message.role === 'user' ? userBg : aiBg}
                  color="white"
                >
                  <Text fontSize="sm" whiteSpace="pre-wrap">
                    {message.content}
                  </Text>
                  <Text fontSize="xs" opacity={0.7} mt={1}>
                    {message.timestamp.toLocaleTimeString()}
                  </Text>
                </Box>
              </HStack>
            </MotionBox>
          ))}
        </AnimatePresence>

        {isTyping && (
          <HStack spacing={2} align="start">
            <Avatar size="sm" bg={aiBg} icon={<Icon as={FaRobot} />} />
            <Box p={3} borderRadius="lg" bg={aiBg} color="white">
              <HStack spacing={1}>
                <MotionBox
                  as="span"
                  w={2}
                  h={2}
                  bg="white"
                  borderRadius="full"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <MotionBox
                  as="span"
                  w={2}
                  h={2}
                  bg="white"
                  borderRadius="full"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                />
                <MotionBox
                  as="span"
                  w={2}
                  h={2}
                  bg="white"
                  borderRadius="full"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                />
              </HStack>
            </Box>
          </HStack>
        )}

        <div ref={messagesEndRef} />
      </VStack>

      {/* Input */}
      <HStack mt={4} spacing={2}>
        <Input
          placeholder="Digite sua mensagem..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          isDisabled={isTyping}
        />
        <Button
          leftIcon={<FaPaperPlane />}
          onClick={sendMessage}
          isDisabled={!inputValue.trim() || isTyping}
          colorScheme="purple"
        >
          Enviar
        </Button>
      </HStack>

      {/* Info */}
      <Box mt={2} p={2} bg="purple.50" borderRadius="md" border="1px" borderColor="purple.200">
        <HStack spacing={2}>
          <Icon as={FaStar} color="purple.500" />
          <Text fontSize="xs" color="purple.700">
            <Code fontSize="xs">AI Chat</Code> com processamento de linguagem natural e contexto do portfólio
          </Text>
        </HStack>
      </Box>
    </Box>
  );
}
