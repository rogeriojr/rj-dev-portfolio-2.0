import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
  Link as ChakraLink,
  Tooltip,
  Icon,
  Divider,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { css, keyframes } from "@emotion/react";
import { FaRocket } from "react-icons/fa";
import { CommandCenter } from "../CommandCenter/CommandCenter";
import { useTranslation } from "../../i18n/useTranslation";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const MotionBox = motion(Box);

const starburstAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 0;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.5;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
`;

const NavLink = ({
  to,
  children,
  onClick,
}: {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  const location = useLocation();
  const isActive =
    location.pathname === to || location.pathname.startsWith(`${to}/`);

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Tooltip label={`Go to ${children}`} placement="bottom">
      <ChakraLink
        as={RouterLink}
        to={to}
        onClick={handleClick}
        px={{ base: 3, md: 4 }}
        py={{ base: 3, md: 2 }}
        minH={{ base: "44px", md: "auto" }}
        display="flex"
        alignItems="center"
        rounded={"md"}
        position="relative"
        color={isActive ? "orange.400" : "white"}
        aria-current={isActive ? "page" : undefined}
        aria-label={`Ir para ${children}`}
        css={css`
          &:hover::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 30px;
            height: 30px;
            background: radial-gradient(circle, rgba(251, 146, 60, 0.6) 0%, rgba(251, 146, 60, 0) 70%);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: ${starburstAnimation} 0.8s ease-out;
            pointer-events: none;
          }
        `}
        _hover={{
          textDecoration: "none",
          color: "orange.400",
        }}
        _focus={{
          outline: '3px solid #4A90E2',
          outlineOffset: '2px',
        }}
      >
        {children}
        {isActive && (
          <MotionBox
            position="absolute"
            bottom="-2px"
            left="0"
            right="0"
            height="2px"
            bg="orange.400"
            layoutId="underline"
            initial={false}
          />
        )}
      </ChakraLink>
    </Tooltip>
  );
};

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isCommandCenterOpen, onOpen: onCommandCenterOpen, onClose: onCommandCenterClose } = useDisclosure();
  const { language } = useTranslation();
  const reducedMotion = useReducedMotion();

  const links = [
    { to: "/", label: "Home" },
    { to: "/portfolio/development", label: "Development" },
    { to: "/portfolio/design", label: "Design" },
    { to: "/portfolio/social-media", label: "Social Media" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  const NavLinks = ({ onLinkClick }: { onLinkClick?: () => void }) => (
    <>
      {links.map((link) => (
        <NavLink key={link.to} to={link.to} onClick={onLinkClick}>
          {link.label}
        </NavLink>
      ))}
    </>
  );

  return (
    <Box
      as="nav"
      id="navigation"
      role="navigation"
      aria-label="Navegação principal"
      position="fixed"
      w="100%"
      maxW="100vw"
      left={0}
      right={0}
      bg="gray.900"
      px={4}
      py={4}
      borderBottom="1px"
      borderColor="gray.700"
      zIndex="sticky"
    >
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={{ base: "md", sm: "lg" }}
          icon={<HamburgerIcon />}
          aria-label="Abrir menu de navegação"
          aria-expanded={isOpen}
          display={{ md: "none" }}
          onClick={onOpen}
          variant="outline"
          borderColor="orange.400"
          color="orange.400"
          minW={{ base: "44px", sm: "48px" }}
          minH={{ base: "44px", sm: "48px" }}
          _hover={reducedMotion ? {} : {
            bg: "orange.400",
            color: "white",
          }}
          _focus={{
            outline: '3px solid #4A90E2',
            outlineOffset: '2px',
          }}
          _active={{
            transform: "scale(0.95)",
          }}
        />

        <HStack spacing={8} alignItems={"center"}>
          <ChakraLink
            as={RouterLink}
            to="/"
            fontSize="xl"
            fontWeight="bold"
            color="orange.400"
            aria-label="Ir para página inicial"
            _focus={{
              outline: '3px solid #4A90E2',
              outlineOffset: '2px',
            }}
          >
            RJ-DEV
          </ChakraLink>
        </HStack>

        <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
          <NavLinks />
          <Tooltip
            label={language === 'pt' ? 'Central de Comando - Personalizar Botões' : 'Command Center - Customize Buttons'}
            placement="bottom"
            hasArrow
          >
            <IconButton
              aria-label={language === 'pt' ? 'Abrir Central de Comando' : 'Open Command Center'}
              aria-expanded={isCommandCenterOpen}
              icon={<Icon as={FaRocket} />}
              onClick={onCommandCenterOpen}
              variant="solid"
              colorScheme="orange"
              bgGradient="linear(to-r, orange.400, red.500)"
              color="white"
              size="md"
              borderRadius="md"
              _hover={reducedMotion ? {} : {
                bgGradient: "linear(to-r, orange.500, red.600)",
                transform: "scale(1.1)",
                boxShadow: "0 0 20px rgba(251, 146, 60, 0.5)",
              }}
              _focus={{
                outline: '3px solid #4A90E2',
                outlineOffset: '2px',
              }}
              transition={reducedMotion ? "none" : "all 0.2s"}
              boxShadow="md"
            />
          </Tooltip>
        </HStack>
      </Flex>

      <Drawer 
        isOpen={isOpen} 
        placement="left" 
        onClose={onClose}
        returnFocusOnClose={true}
        trapFocus={true}
      >
        <DrawerOverlay />
        <DrawerContent 
          bg="gray.900"
          role="dialog"
          aria-modal="true"
          aria-labelledby="drawer-header"
        >
          <DrawerCloseButton 
            color="orange.400" 
            aria-label={language === 'pt' ? 'Fechar menu de navegação' : 'Close navigation menu'}
            minW="44px"
            minH="44px"
            _focus={{
              outline: '3px solid #4A90E2',
              outlineOffset: '2px',
            }}
          />
          <DrawerHeader color="orange.400" id="drawer-header">
            {language === 'pt' ? 'Menu' : 'Menu'}
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing={3} align="stretch">
              <NavLinks onLinkClick={onClose} />
              <Divider borderColor="gray.700" />
              <Box
                as="button"
                onClick={() => {
                  onClose();
                  onCommandCenterOpen();
                }}
                aria-label={language === 'pt' ? 'Abrir Central de Comando' : 'Open Command Center'}
                px={4}
                py={{ base: 4, md: 3 }}
                minH="48px"
                rounded="md"
                bgGradient="linear(to-r, orange.400, red.500)"
                color="white"
                fontWeight="bold"
                _hover={reducedMotion ? {} : {
                  bgGradient: "linear(to-r, orange.500, red.600)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 12px rgba(251, 146, 60, 0.4)",
                }}
                _focus={{
                  outline: '3px solid #4A90E2',
                  outlineOffset: '2px',
                }}
                _active={{
                  transform: "scale(0.98)",
                }}
                transition={reducedMotion ? "none" : "all 0.2s"}
                boxShadow="md"
              >
                <HStack spacing={2} justify="center">
                  <Icon as={FaRocket} />
                  <Text>
                    {language === 'pt' ? 'Central de Comando' : 'Command Center'}
                  </Text>
                </HStack>
              </Box>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <CommandCenter isOpen={isCommandCenterOpen} onClose={onCommandCenterClose} />
    </Box>
  );
}
