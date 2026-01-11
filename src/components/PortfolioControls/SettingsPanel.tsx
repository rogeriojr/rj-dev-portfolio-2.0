import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  VStack,
  Switch,
  FormControl,
  FormLabel,
  Text,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaCog, FaTrash } from "react-icons/fa";
import { PortfolioSettings } from "../../hooks/usePortfolioSettings";

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  settings: PortfolioSettings;
  onUpdate: <K extends keyof PortfolioSettings>(key: K, value: PortfolioSettings[K]) => void;
  onReset: () => void;
}

export function SettingsPanel({
  isOpen,
  onClose,
  settings,
  onUpdate,
  onReset,
}: SettingsPanelProps) {
  const bg = useColorModeValue('white', 'gray.800');

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent bg={bg}>
        <DrawerCloseButton />
        <DrawerHeader>
          <HStack>
            <FaCog />
            <Text>Configurações do Portfólio</Text>
          </HStack>
        </DrawerHeader>

        <DrawerBody>
          <VStack spacing={6} align="stretch">
            <FormControl display="flex" alignItems="center" justifyContent="space-between">
              <FormLabel mb={0}>Animações Espaciais</FormLabel>
              <Switch
                isChecked={settings.showAnimations}
                onChange={(e) => onUpdate('showAnimations', e.target.checked)}
                colorScheme="blue"
              />
            </FormControl>

            <FormControl display="flex" alignItems="center" justifyContent="space-between">
              <FormLabel mb={0}>Easter Eggs</FormLabel>
              <Switch
                isChecked={settings.easterEggsEnabled}
                onChange={(e) => onUpdate('easterEggsEnabled', e.target.checked)}
                colorScheme="purple"
              />
            </FormControl>

            <Text fontSize="sm" color="gray.500" mt={4}>
              💡 Dica: Tente digitar "SPACE" ou "ROCKET" para descobrir easter eggs!
            </Text>
          </VStack>
        </DrawerBody>

        <DrawerFooter>
          <Button
            leftIcon={<FaTrash />}
            variant="outline"
            colorScheme="red"
            onClick={() => {
              onReset();
              onClose();
            }}
            mr={3}
          >
            Resetar Tudo
          </Button>
          <Button colorScheme="blue" onClick={onClose}>
            Fechar
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
