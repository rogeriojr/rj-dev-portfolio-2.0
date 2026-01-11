import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  Box,
  Input,
  VStack,
  HStack,
  Text,
  Icon,
  useColorModeValue,
  Kbd,
  Badge,
  Collapse,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTerminal, FaTimes, FaRocket, FaSatellite, FaStar } from 'react-icons/fa';
import { IoPlanet } from 'react-icons/io5';
import { IconType } from 'react-icons';
import { EasterEgg } from '../../hooks/useGlobalEasterEggs';
import { PAGE_EASTER_EGGS } from './PageSpecificEasterEggs';
import { useLocation } from 'react-router-dom';
import { useFloatingButtonsConfig } from '../../hooks/useFloatingButtonsConfig';

interface CommandBarProps {
  onCommand?: (egg: EasterEgg) => void;
  enabled?: boolean;
}

const COMMAND_EASTER_EGGS: (EasterEgg & { command: string; description: string })[] = [
  {
    id: 'konami',
    name: 'Código Konami',
    command: 'konami',
    description: 'Ativa o código Konami clássico',
    trigger: 'ArrowUp,ArrowUp,ArrowDown,ArrowDown,ArrowLeft,ArrowRight,ArrowLeft,ArrowRight,KeyB,KeyA',
    message: '🚀 Código Konami ativado! Sistema de propulsão máximo!',
    icon: '🚀',
    effect: () => {
      document.body.style.animation = 'rocketLaunch 2s ease-in-out';
      setTimeout(() => {
        document.body.style.animation = '';
      }, 2000);
    },
  },
  {
    id: 'space',
    name: 'Modo Espaço',
    command: 'space',
    description: 'Ativa modo exploração espacial',
    trigger: 'KeyS,KeyP,KeyA,KeyC,KeyE',
    message: '🌌 Modo exploração espacial ativado!',
    icon: '🌌',
  },
  {
    id: 'rocket',
    name: 'Foguete',
    command: 'rocket',
    description: 'Lança um foguete',
    trigger: 'KeyR,KeyO,KeyC,KeyK,KeyE,KeyT',
    message: '🚀 Foguete lançado! Preparando para decolagem!',
    icon: '🚀',
  },
  {
    id: 'star',
    name: 'Estrela',
    command: 'star',
    description: 'Descobre uma estrela',
    trigger: 'KeyS,KeyT,KeyA,KeyR',
    message: '⭐ Estrela descoberta! Nova constelação encontrada!',
    icon: '⭐',
  },
  {
    id: 'planet',
    name: 'Planeta',
    command: 'planet',
    description: 'Descobre um planeta',
    trigger: 'KeyP,KeyL,KeyA,KeyN,KeyE,KeyT',
    message: '🪐 Planeta descoberto! Missão de exploração iniciada!',
    icon: '🪐',
  },
  {
    id: 'secret-combo',
    name: 'Combo Secreto',
    command: 'hello world',
    description: 'Mensagem intergaláctica',
    trigger: 'KeyH,KeyE,KeyL,KeyL,KeyO,Space,KeyW,KeyO,KeyR,KeyL,KeyD',
    message: '👽 Mensagem recebida de outra galáxia! Olá, mundo!',
    icon: '👽',
  },
  {
    id: 'help',
    name: 'Ajuda',
    command: 'help',
    description: 'Lista todos os comandos disponíveis',
    trigger: '',
    message: '',
    icon: '❓',
  },
];

const iconMap: Record<string, IconType> = {
  '🚀': FaRocket,
  '🌌': FaSatellite,
  '⭐': FaStar,
  '🪐': IoPlanet,
  '👽': FaSatellite,
  '❓': FaStar,
};

function CommandBarFloatingButton({ onOpen }: { onOpen: () => void }) {
  const { config, getButtonStyle } = useFloatingButtonsConfig();
  
  if (!config.commandBar.enabled) return null;
  
  const hasCustomPosition = config.commandBar.position !== 'bottom-left' || 
                            config.commandBar.customX !== undefined || 
                            config.commandBar.customY !== undefined;
  
  return (
    <Tooltip label="Barra de Comandos (Ctrl+K ou Ctrl+J)" placement="right">
      <IconButton
        aria-label="Abrir barra de comandos"
        icon={<FaTerminal />}
        style={hasCustomPosition ? getButtonStyle('commandBar') : undefined}
        position={hasCustomPosition ? undefined : "fixed"}
        bottom={hasCustomPosition ? undefined : "20px"}
        left={hasCustomPosition ? undefined : "20px"}
        zIndex={hasCustomPosition ? undefined : 9996}
        size="lg"
        borderRadius="full"
        bgGradient="linear(to-r, cyan.500, blue.500)"
        color="white"
        _hover={{
          bgGradient: "linear(to-r, cyan.400, blue.400)",
          transform: "scale(1.1)",
        }}
        boxShadow="0 4px 20px rgba(0, 255, 255, 0.4)"
        onClick={onOpen}
      />
    </Tooltip>
  );
}

export function CommandBar({ onCommand, enabled = true }: CommandBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();

  const bg = useColorModeValue('gray.800', 'gray.900');
  const borderColor = useColorModeValue('cyan.400', 'cyan.500');
  const textColor = useColorModeValue('cyan.300', 'cyan.200');
  const suggestionBg = useColorModeValue('gray.700', 'gray.800');

  const availableCommands = useMemo(() => {
    const pageEgg = PAGE_EASTER_EGGS.find(egg => location.pathname === egg.path);
    const commands = [...COMMAND_EASTER_EGGS];
    
    if (pageEgg) {
      const pageCommand = {
        id: `page-${pageEgg.path}`,
        name: `Página ${pageEgg.path}`,
        command: pageEgg.path.replace('/', '') || 'home',
        description: `Easter egg da página ${pageEgg.path}`,
        trigger: pageEgg.trigger,
        message: pageEgg.message,
        icon: '📄',
      };
      commands.push(pageCommand);
    }
    
    return commands;
  }, [location.pathname]);

  const suggestions = useMemo(() => {
    if (!input.trim()) return availableCommands.slice(0, 5);
    const lowerInput = input.toLowerCase();
    return availableCommands
      .filter(cmd => 
        cmd.command.toLowerCase().includes(lowerInput) ||
        cmd.name.toLowerCase().includes(lowerInput) ||
        cmd.description.toLowerCase().includes(lowerInput)
      )
      .slice(0, 5);
  }, [input, availableCommands]);

  useEffect(() => {
    if (!enabled) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'j')) {
        e.preventDefault();
        setIsOpen(prev => {
          if (!prev) {
            setTimeout(() => inputRef.current?.focus(), 100);
          }
          return !prev;
        });
      }
      
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        setInput('');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [enabled, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleCommand = useCallback((command: string) => {
    const trimmed = command.trim().toLowerCase();
    
    if (!trimmed) return;

    setHistory(prev => [...prev, trimmed].slice(-20));
    setHistoryIndex(-1);

    if (trimmed === 'help') {
      setShowSuggestions(true);
      return;
    }

    const egg = availableCommands.find(cmd => cmd.command.toLowerCase() === trimmed);
    
    if (egg && egg.id !== 'help') {
      if (onCommand) {
        onCommand(egg);
      }
      if (egg.effect) {
        egg.effect();
      }
      setInput('');
      setShowSuggestions(false);
    } else {
      setInput('');
    }
  }, [availableCommands, onCommand]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp' && history.length > 0) {
      e.preventDefault();
      const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(newIndex);
      setInput(history[newIndex]);
    } else if (e.key === 'ArrowDown' && historyIndex >= 0) {
      e.preventDefault();
      const newIndex = historyIndex + 1;
      if (newIndex >= history.length) {
        setHistoryIndex(-1);
        setInput('');
      } else {
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setInput('');
    }
  }, [input, history, historyIndex, handleCommand]);

  if (!enabled) return null;

  return (
    <>
      {!isOpen && <CommandBarFloatingButton onOpen={() => {
        setIsOpen(true);
        setTimeout(() => inputRef.current?.focus(), 100);
      }} />}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            style={{
              position: 'fixed',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 10000,
              width: '90%',
              maxWidth: '600px',
            }}
          >
            <Box
              bg={bg}
              borderWidth="2px"
              borderColor={borderColor}
              borderRadius="xl"
              boxShadow="0 8px 32px rgba(0, 0, 0, 0.5)"
              overflow="hidden"
            >
              <HStack
                px={4} py={2}
                borderBottomWidth="1px"
                borderColor={borderColor}
                justify="space-between"
                bg="blackAlpha.300"
              >
                <HStack spacing={2}>
                  <Icon as={FaTerminal} color={textColor} />
                  <Text fontSize="sm" fontWeight="bold" color={textColor}>
                    Comando Espacial
                  </Text>
                </HStack>
                <IconButton
                  aria-label="Fechar"
                  icon={<FaTimes />}
                  size="xs"
                  variant="ghost"
                  color={textColor}
                  onClick={() => {
                    setIsOpen(false);
                    setInput('');
                    setShowSuggestions(false);
                  }}
                />
              </HStack>

              <Box p={4}>
                <HStack spacing={2}>
                  <Text color={textColor} fontSize="sm">$</Text>
                  <Input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => {
                      setInput(e.target.value);
                      setShowSuggestions(true);
                      setHistoryIndex(-1);
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="Digite um comando... (ex: help, space, rocket)"
                    color={textColor}
                    _placeholder={{ color: 'gray.500' }}
                    borderColor={borderColor}
                    _focus={{ borderColor: 'cyan.300', boxShadow: `0 0 0 1px ${borderColor}` }}
                    bg="blackAlpha.200"
                    autoComplete="off"
                  />
                </HStack>

                <Collapse in={showSuggestions && suggestions.length > 0} animateOpacity>
                  <VStack align="stretch" mt={2} spacing={1} maxH="200px" overflowY="auto">
                    {suggestions.map((cmd) => {
                      const iconKey = cmd.icon || '';
                      const IconComponent = (iconKey && iconMap[iconKey]) ? iconMap[iconKey] : FaStar;
                      return (
                        <HStack
                          key={cmd.id}
                          p={2}
                          borderRadius="md"
                          bg={suggestionBg}
                          cursor="pointer"
                          _hover={{ bg: 'gray.600' }}
                          onClick={() => {
                            setInput(cmd.command);
                            handleCommand(cmd.command);
                          }}
                          spacing={3}
                        >
                          <Icon as={IconComponent} color={cmd.icon === '🚀' ? 'orange.400' : 'cyan.400'} />
                          <VStack align="start" spacing={0} flex={1}>
                            <HStack spacing={2}>
                              <Text fontSize="sm" fontWeight="bold" color={textColor}>
                                {cmd.command}
                              </Text>
                              <Badge size="sm" colorScheme="cyan" variant="outline">
                                {cmd.name}
                              </Badge>
                            </HStack>
                            <Text fontSize="xs" color="gray.400">
                              {cmd.description}
                            </Text>
                          </VStack>
                          <Kbd fontSize="xs">Enter</Kbd>
                        </HStack>
                      );
                    })}
                  </VStack>
                </Collapse>

                {input === '' && (
                  <HStack mt={2} spacing={2} flexWrap="wrap">
                    <Text fontSize="xs" color="gray.500">
                      Dica:
                    </Text>
                    <Kbd fontSize="xs">Ctrl+K</Kbd>
                    <Text fontSize="xs" color="gray.500">ou</Text>
                    <Kbd fontSize="xs">Ctrl+J</Kbd>
                    <Text fontSize="xs" color="gray.500">para abrir/fechar</Text>
                  </HStack>
                )}
              </Box>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
