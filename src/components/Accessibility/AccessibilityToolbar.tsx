import {
  Box,
  IconButton,
  VStack,
  HStack,
  Text,
  Button,
  Divider,
  useColorModeValue,
  Tooltip,
  Switch,
  Select,
} from '@chakra-ui/react';
import {
  FaUniversalAccess,
  FaFont,
  FaEye,
  FaPalette,
  FaHandPaper,
  FaUndo,
  FaChevronUp,
  FaChevronDown,
} from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import { motion, AnimatePresence } from 'framer-motion';

const MotionBox = motion(Box);

export function AccessibilityToolbar() {
  const {
    state,
    setFontSize,
    setHighContrast,
    setColorBlindness,
    reset,
  } = useAccessibility();

  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');



  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest('[aria-label="Abrir menu de acessibilidade"]')
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const fontSizeOptions = [
    { value: 'normal', label: 'Normal (A)', labelShort: 'A', multiplier: 1 },
    { value: 'large', label: 'Grande (A+)', labelShort: 'A+', multiplier: 1.25 },
    { value: 'extra-large', label: 'Extra Grande (A++)', labelShort: 'A++', multiplier: 1.5 },
  ];

  const colorBlindnessOptions = [
    { value: 'none', label: 'Nenhum' },
    { value: 'protanopia', label: 'Protanopia' },
    { value: 'deuteranopia', label: 'Deuteranopia' },
    { value: 'tritanopia', label: 'Tritanopia' },
  ];

  return (
    <>
      <Box
        position="fixed"
        bottom={{ base: '72px', sm: '76px', md: '80px' }}
        left={{ base: '20px', sm: '24px', md: '28px' }}
        zIndex={10000}
        role="complementary"
        aria-label="Barra de Acessibilidade"
      >
        <AnimatePresence>
          {isOpen && (
            <MotionBox
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              mb={{ base: 2, sm: 3, md: 4 }}
              maxW={{ base: 'calc(100vw - 32px)', sm: 'none' }}
            >
              <Box
                ref={panelRef}
                id="accessibility-panel"
                bg={bgColor}
                border="2px solid"
                borderColor={borderColor}
                borderRadius="xl"
                boxShadow="2xl"
                p={{ base: 3, sm: 4 }}
                w={{ base: 'calc(100vw - 32px)', sm: '320px', md: '360px' }}
                maxW={{ base: 'calc(100vw - 32px)', sm: '320px', md: '360px' }}
                maxH={{ base: 'calc(100vh - 200px)', sm: '80vh' }}
                overflowY="auto"
                overflowX="hidden"
                role="region"
                aria-label="Painel de Configurações de Acessibilidade"
                aria-labelledby="accessibility-heading"
                mb={{ base: 2, sm: 4 }}
              >
                <VStack align="stretch" spacing={4} w="100%" minW={0}>
                  <HStack justify="space-between" mb={2}>
                    <HStack>
                      <Box
                        as={FaUniversalAccess}
                        color="blue.500"
                        fontSize="xl"
                        aria-hidden="true"
                      />
                      <Text id="accessibility-heading" fontWeight="bold" fontSize="lg">
                        Acessibilidade
                      </Text>
                    </HStack>
                    <IconButton
                      aria-label="Fechar painel de acessibilidade"
                      icon={isOpen ? <FaChevronDown /> : <FaChevronUp />}
                      size="sm"
                      variant="ghost"
                      onClick={() => setIsOpen(false)}
                      _focus={{
                        outline: '3px solid #4A90E2',
                        outlineOffset: '2px',
                      }}
                    />
                  </HStack>

                  <Divider />

                  <VStack align="stretch" spacing={3} w="100%" minW={0}>
                    <Box w="100%" minW={0}>
                      <HStack mb={2} spacing={2}>
                        <Box as={FaFont} color="purple.500" flexShrink={0} />
                        <Text fontWeight="semibold" fontSize="sm" minW={0} overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                          Tamanho da Fonte
                        </Text>
                      </HStack>
                      <HStack spacing={2} w="100%" minW={0}>
                        {fontSizeOptions.map((option) => (
                          <Button
                            key={option.value}
                            size="sm"
                            variant={state.fontSize === option.value ? 'solid' : 'outline'}
                            colorScheme={state.fontSize === option.value ? 'blue' : 'gray'}
                            onClick={() => setFontSize(option.value as any)}
                            aria-label={`Tamanho de fonte ${option.label}`}
                            aria-pressed={state.fontSize === option.value}
                            flex={1}
                            minW="0"
                            w="100%"
                            px={{ base: 1.5, sm: 2, md: 3 }}
                            py={{ base: 1.5, sm: 2 }}
                            fontSize={{ base: "2xs", sm: "xs" }}
                            overflow="hidden"
                            textOverflow="ellipsis"
                            whiteSpace="nowrap"
                            maxW="100%"
                            _focus={{
                              outline: '3px solid #4A90E2',
                              outlineOffset: '2px',
                            }}
                          >
                            <Box 
                              as="span" 
                              display="block" 
                              overflow="hidden" 
                              textOverflow="ellipsis" 
                              whiteSpace="nowrap" 
                              w="100%"
                              maxW="100%"
                              lineHeight="1.2"
                            >
                              <Box as="span" display={{ base: 'none', sm: 'inline' }}>
                                {option.label}
                              </Box>
                              <Box as="span" display={{ base: 'inline', sm: 'none' }}>
                                {option.labelShort}
                              </Box>
                            </Box>
                          </Button>
                        ))}
                      </HStack>
                    </Box>

                    <Divider />

                    <Box w="100%" minW={0}>
                      <HStack justify="space-between" mb={2} spacing={2} w="100%" minW={0}>
                        <HStack spacing={2} minW={0} flex={1}>
                          <Box as={FaEye} color="orange.500" flexShrink={0} />
                          <Text fontWeight="semibold" fontSize="sm" minW={0} overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                            Alto Contraste
                          </Text>
                        </HStack>
                        <Switch
                          isChecked={state.highContrast}
                          onChange={(e) => setHighContrast(e.target.checked)}
                          aria-label="Ativar modo de alto contraste"
                          aria-checked={state.highContrast}
                          colorScheme="orange"
                          _focus={{
                            outline: '3px solid #4A90E2',
                            outlineOffset: '2px',
                          }}
                        />
                      </HStack>
                      <Text fontSize="xs" color="gray.500" mt={1}>
                        Aumenta o contraste entre elementos
                      </Text>
                    </Box>

                    <Divider />

                    <Box w="100%" minW={0}>
                      <HStack mb={2} spacing={2} w="100%" minW={0}>
                        <Box as={FaPalette} color="green.500" flexShrink={0} />
                        <Text fontWeight="semibold" fontSize="sm" minW={0} overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                          Modo Daltonismo
                        </Text>
                      </HStack>
                      <Select
                        size="sm"
                        value={state.colorBlindness}
                        onChange={(e) => setColorBlindness(e.target.value as any)}
                        aria-label="Selecionar tipo de daltonismo"
                        w="100%"
                        minW={0}
                        maxW="100%"
                        _focus={{
                          outline: '3px solid #4A90E2',
                          outlineOffset: '2px',
                        }}
                      >
                        {colorBlindnessOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Select>
                      <Text fontSize="xs" color="gray.500" mt={1}>
                        Ajusta cores para diferentes tipos de daltonismo
                      </Text>
                    </Box>

                    <Divider />

                    <Box w="100%" minW={0}>
                      <HStack mb={2} spacing={2} w="100%" minW={0}>
                        <Box as={FaHandPaper} color="red.500" flexShrink={0} />
                        <VStack align="flex-start" spacing={0} minW={0} flex={1}>
                          <Text fontWeight="semibold" fontSize="sm" minW={0} overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                            Libras (VLibras)
                          </Text>
                          <Text fontSize="xs" color="green.500" fontWeight="medium">
                            Sempre ativo
                          </Text>
                        </VStack>
                      </HStack>
                      <Text fontSize="xs" color="gray.500" mt={1}>
                        Tradução automática para Libras sempre disponível
                      </Text>
                    </Box>

                    <Divider />

                    <Button
                      leftIcon={<FaUndo />}
                      size="sm"
                      variant="outline"
                      onClick={reset}
                      aria-label="Restaurar configurações padrão de acessibilidade"
                      colorScheme="gray"
                      w="100%"
                      minW={0}
                      overflow="hidden"
                      _focus={{
                        outline: '3px solid #4A90E2',
                        outlineOffset: '2px',
                      }}
                    >
                      <Box as="span" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap" w="100%">
                        Restaurar Padrões
                      </Box>
                    </Button>
                  </VStack>
                </VStack>
              </Box>
            </MotionBox>
          )}
        </AnimatePresence>

        <Tooltip 
          label="Acessibilidade" 
          placement="right"
          hasArrow
        >
          <IconButton
            aria-label="Abrir menu de acessibilidade"
            aria-expanded={isOpen}
            aria-controls="accessibility-panel"
            icon={<FaUniversalAccess />}
            size="md"
            colorScheme="blue"
            borderRadius="full"
            boxShadow="2xl"
            minW="40px"
            minH="40px"
            w="40px"
            h="40px"
            onClick={() => setIsOpen(!isOpen)}
            onKeyDown={(e) => {
              if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
              }
            }}
            _hover={{ transform: 'scale(1.1)' }}
            _focus={{
              outline: '3px solid #4A90E2',
              outlineOffset: '2px',
            }}
            transition="all 0.2s"
          />
        </Tooltip>
      </Box>

    </>
  );
}
