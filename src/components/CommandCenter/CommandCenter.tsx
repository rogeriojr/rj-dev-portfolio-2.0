import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  HStack,
  Text,
  Icon,
  Box,
  Switch,
  Select,
  Button,
  Divider,
  Badge,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  SimpleGrid,
  Tooltip,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import {
  FaRocket,
  FaWhatsapp,
  FaTrophy,
  FaTerminal,
  FaUndo,
  FaCheck,
  FaPalette,
  FaLayerGroup,
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useTranslation } from '../../i18n/useTranslation';
import { useFloatingButtonsConfig, ButtonPosition } from '../../hooks/useFloatingButtonsConfig';
import { usePortfolioSettings } from '../../hooks/usePortfolioSettings';

const MotionBox = motion(Box);

interface CommandCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandCenter({ isOpen, onClose }: CommandCenterProps) {
  const { language } = useTranslation();
  const { config, updateButtonConfig, toggleButton, resetConfig } = useFloatingButtonsConfig();
  const { settings, updateSetting } = usePortfolioSettings();

  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const cardBg = useColorModeValue('gray.50', 'gray.700');
  const accentColor = 'cyan.400';

  const buttonConfigs = [
    {
      id: 'whatsapp' as const,
      name: language === 'pt' ? 'WhatsApp' : 'WhatsApp',
      icon: FaWhatsapp,
      color: 'whatsapp',
      description: language === 'pt' ? 'Botão de contato via WhatsApp' : 'WhatsApp contact button',
    },
    {
      id: 'gamification' as const,
      name: language === 'pt' ? 'Gamificação' : 'Gamification',
      icon: FaTrophy,
      color: 'yellow',
      description: language === 'pt' ? 'Painel de conquistas e XP' : 'Achievements and XP panel',
    },
    {
      id: 'commandBar' as const,
      name: language === 'pt' ? 'Barra de Comandos' : 'Command Bar',
      icon: FaTerminal,
      color: 'cyan',
      description: language === 'pt' ? 'Terminal de comandos e easter eggs' : 'Command terminal and easter eggs',
    },
  ];

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      size={{ base: "full", md: "xl" }} 
      isCentered
      returnFocusOnClose={true}
      trapFocus={true}
      closeOnOverlayClick={true}
      closeOnEsc={true}
    >
      <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(4px)" />
      <ModalContent 
        bg={bg} 
        borderRadius={{ base: "none", md: "2xl" }} 
        maxH={{ base: "100vh", md: "90vh" }} 
        overflow="hidden" 
        m={0}
        role="dialog"
        aria-modal="true"
        aria-labelledby="command-center-title"
      >
        <ModalHeader
          id="command-center-title"
          bgGradient="linear(to-r, cyan.400, purple.500)"
          bgClip="text"
          fontSize={{ base: "xl", md: "2xl" }}
          fontWeight="bold"
          fontFamily="Share Tech Mono"
          px={{ base: 4, md: 6 }}
          pt={{ base: 6, md: 4 }}
        >
          <HStack spacing={3}>
            <Icon as={FaRocket} color={accentColor} aria-hidden="true" />
            <Text>
              {language === 'pt' ? 'CENTRAL DE COMANDO' : 'COMMAND CENTER'}
            </Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton 
          size={{ base: "lg", md: "md" }}
          aria-label={language === 'pt' ? 'Fechar Central de Comando' : 'Close Command Center'}
        />

        <ModalBody pb={6} px={{ base: 4, md: 6 }} overflowY="auto">
          <Tabs colorScheme="cyan" variant="enclosed">
            <TabList mb={4}>
              <Tab>
                <HStack spacing={2}>
                  <Icon as={FaLayerGroup} />
                  <Text fontSize="sm">
                    {language === 'pt' ? 'Botões Flutuantes' : 'Floating Buttons'}
                  </Text>
                </HStack>
              </Tab>
              <Tab>
                <HStack spacing={2}>
                  <Icon as={FaPalette} />
                  <Text fontSize="sm">
                    {language === 'pt' ? 'Aparência' : 'Appearance'}
                  </Text>
                </HStack>
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel px={0}>
                <VStack align="stretch" spacing={4}>
                  {buttonConfigs.map((button) => {
                    const buttonConfig = config[button.id];
                    const ButtonIcon = button.icon;

                    return (
                      <MotionBox
                        key={button.id}
                        p={4}
                        bg={cardBg}
                        borderRadius="lg"
                        border="1px"
                        borderColor={borderColor}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <VStack align="stretch" spacing={3}>
                          <HStack justify="space-between">
                            <HStack spacing={3}>
                              <Icon as={ButtonIcon} color={`${button.color}.400`} boxSize={5} />
                              <VStack align="start" spacing={0}>
                                <Text fontWeight="bold" fontSize="md">
                                  {button.name}
                                </Text>
                                <Text fontSize="xs" color="gray.500">
                                  {button.description}
                                </Text>
                              </VStack>
                            </HStack>
                            <Switch
                              isChecked={buttonConfig.enabled}
                              onChange={() => toggleButton(button.id)}
                              colorScheme={button.color}
                            />
                          </HStack>

                          {buttonConfig.enabled && (
                            <>
                              <Divider />
                              <SimpleGrid columns={2} spacing={3}>
                                <Box>
                                  <Text fontSize="xs" fontWeight="bold" mb={2} color="gray.500">
                                    {language === 'pt' ? 'Posição' : 'Position'}
                                  </Text>
                                  <Select
                                    size="sm"
                                    value={buttonConfig.position}
                                    onChange={(e) =>
                                      updateButtonConfig(button.id, {
                                        position: e.target.value as ButtonPosition,
                                        customX: undefined,
                                        customY: undefined,
                                      })
                                    }
                                  >
                                    <option value="top-left">
                                      {language === 'pt' ? 'Superior Esquerda' : 'Top Left'}
                                    </option>
                                    <option value="top-right">
                                      {language === 'pt' ? 'Superior Direita' : 'Top Right'}
                                    </option>
                                    <option value="bottom-left">
                                      {language === 'pt' ? 'Inferior Esquerda' : 'Bottom Left'}
                                    </option>
                                    <option value="bottom-right">
                                      {language === 'pt' ? 'Inferior Direita' : 'Bottom Right'}
                                    </option>
                                  </Select>
                                </Box>

                                <Box>
                                  <Text fontSize="xs" fontWeight="bold" mb={2} color="gray.500">
                                    Z-Index
                                  </Text>
                                  <NumberInput
                                    size="sm"
                                    value={buttonConfig.zIndex}
                                    min={1000}
                                    max={20000}
                                    onChange={(_, value) =>
                                      updateButtonConfig(button.id, { zIndex: value })
                                    }
                                  >
                                    <NumberInputField />
                                    <NumberInputStepper>
                                      <NumberIncrementStepper />
                                      <NumberDecrementStepper />
                                    </NumberInputStepper>
                                  </NumberInput>
                                </Box>
                              </SimpleGrid>

                              <HStack>
                                <Badge colorScheme={button.color} variant="subtle">
                                  {language === 'pt' ? 'Ativo' : 'Active'}
                                </Badge>
                                <Badge colorScheme="gray" variant="outline">
                                  {buttonConfig.position}
                                </Badge>
                              </HStack>
                            </>
                          )}
                        </VStack>
                      </MotionBox>
                    );
                  })}

                  <Divider />

                  <HStack justify="space-between">
                    <Tooltip label={language === 'pt' ? 'Restaurar configurações padrão' : 'Reset to default settings'}>
                      <Button
                        leftIcon={<FaUndo />}
                        variant="outline"
                        colorScheme="gray"
                        size="sm"
                        onClick={resetConfig}
                      >
                        {language === 'pt' ? 'Restaurar Padrões' : 'Reset Defaults'}
                      </Button>
                    </Tooltip>
                    <Button
                      leftIcon={<FaCheck />}
                      colorScheme="cyan"
                      size="sm"
                      onClick={onClose}
                    >
                      {language === 'pt' ? 'Aplicar' : 'Apply'}
                    </Button>
                  </HStack>
                </VStack>
              </TabPanel>

              <TabPanel px={0}>
                <VStack align="stretch" spacing={4}>
                  <MotionBox
                    p={4}
                    bg={cardBg}
                    borderRadius="lg"
                    border="1px"
                    borderColor={borderColor}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <HStack justify="space-between" mb={3}>
                      <VStack align="start" spacing={0}>
                        <Text fontWeight="bold" fontSize="md">
                          {language === 'pt' ? 'Animações' : 'Animations'}
                        </Text>
                        <Text fontSize="xs" color="gray.500">
                          {language === 'pt'
                            ? 'Ativar/desativar animações da plataforma'
                            : 'Enable/disable platform animations'}
                        </Text>
                      </VStack>
                      <Switch
                        isChecked={settings.showAnimations}
                        onChange={(e) => updateSetting('showAnimations', e.target.checked)}
                        colorScheme="cyan"
                      />
                    </HStack>
                  </MotionBox>

                  <MotionBox
                    p={4}
                    bg={cardBg}
                    borderRadius="lg"
                    border="1px"
                    borderColor={borderColor}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <HStack justify="space-between" mb={3}>
                      <VStack align="start" spacing={0}>
                        <Text fontWeight="bold" fontSize="md">
                          {language === 'pt' ? 'Easter Eggs' : 'Easter Eggs'}
                        </Text>
                        <Text fontSize="xs" color="gray.500">
                          {language === 'pt'
                            ? 'Ativar/desativar easter eggs e comandos secretos'
                            : 'Enable/disable easter eggs and secret commands'}
                        </Text>
                      </VStack>
                      <Switch
                        isChecked={settings.easterEggsEnabled}
                        onChange={(e) => updateSetting('easterEggsEnabled', e.target.checked)}
                        colorScheme="purple"
                      />
                    </HStack>
                  </MotionBox>

                  <Divider />

                  <Text fontSize="xs" color="gray.500" textAlign="center">
                    {language === 'pt'
                      ? 'Mais opções de customização em breve...'
                      : 'More customization options coming soon...'}
                  </Text>
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
