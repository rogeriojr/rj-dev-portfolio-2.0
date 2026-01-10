import { Box, Container, Flex, Link as ChakraLink, Stack, Text, useColorMode, IconButton, useDisclosure, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, VStack, useBreakpointValue, Button, Tooltip, Icon } from "@chakra-ui/react";
import { css, keyframes } from "@emotion/react";
import { Link as RouterLink, Outlet } from "react-router-dom";
import { FaSun, FaMoon, FaBars, FaAnchor } from "react-icons/fa";
import { useTranslation } from "../i18n/useTranslation";
import { CookieConsent } from "./CookieConsent";
import { CodeTour } from "./CodeTour";
import { useState, useEffect } from "react";

export function Layout() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { t, language, setLanguage } = useTranslation();

  const [isMenuFixed, setIsMenuFixed] = useState(() => {
    const saved = localStorage.getItem('menuFixed');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('menuFixed', JSON.stringify(isMenuFixed));
  }, [isMenuFixed]);

  const toggleGravity = () => setIsMenuFixed(!isMenuFixed);

  const bgColor = colorMode === "dark" ? "gray.900" : "white";
  const textColor = colorMode === "dark" ? "yellow.400" : "yellow.600";
  const navBgColor = colorMode === "dark"
    ? (isMenuFixed ? "rgba(23, 25, 35, 0.95)" : "rgba(0, 0, 0, 0.6)")
    : "rgba(255, 255, 255, 0.95)";
  const hoverColor = colorMode === "dark" ? "yellow.300" : "yellow.600";

  const starKeyframes = keyframes`
    0% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.1); }
    100% { opacity: 0.3; transform: scale(1); }
  `;

  // Define NavLinks component
  const NavLinks = () => (
    <>
      <ChakraLink as={RouterLink} to="/" _hover={{ color: hoverColor, textShadow: "0 0 8px rgba(255,215,0,0.6)" }} transition="all 0.3s ease">
        {t('nav.home')}
      </ChakraLink>
      <ChakraLink as={RouterLink} to="/about" _hover={{ color: hoverColor, textShadow: "0 0 8px rgba(255,215,0,0.6)" }} transition="all 0.3s ease">
        {t('nav.about')}
      </ChakraLink>
      <ChakraLink as={RouterLink} to="/portfolio/development" _hover={{ color: hoverColor, textShadow: "0 0 8px rgba(255,215,0,0.6)" }} transition="all 0.3s ease">
        {t('nav.portfolio')}
      </ChakraLink>
      <ChakraLink as={RouterLink} to="/certificates" _hover={{ color: hoverColor, textShadow: "0 0 8px rgba(255,215,0,0.6)" }} transition="all 0.3s ease">
        {t('nav.certificates')}
      </ChakraLink>
    </>
  );

  return (
    // Changed minH="100vh" to height="auto" and removed overflow styles that might conflict with body scroll
    // The main scroll should be on the body, not this container, unless we want a specific app-like behavior.
    // Given the double scroll report, better to let content flow naturally.
    <Box
      minH="100vh"
      display="flex"
      flexDirection="column"
      bg={bgColor}
      backgroundImage={`radial-gradient(circle at 1px 1px, ${colorMode === "dark" ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)"
        } 1px, transparent 0),
      radial-gradient(circle at 15px 15px, ${colorMode === "dark" ? "rgba(255,215,0,0.1)" : "rgba(43,79,129,0.05)"
        } 2px, transparent 0)`}
      backgroundSize="50px 50px, 100px 100px"
      position="relative"
      overflowX="hidden" // Keep overflowX hidden to prevent horizontal scroll
      transition="all 0.3s ease-in-out"
      css={css`
        &:before {
          content: "";
          position: fixed; // Fixed position for background to avoid it scrolling away or causing issues
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: ${colorMode === "dark"
          ? "radial-gradient(circle at 50% 50%, rgba(76, 29, 149, 0.1) 0%, transparent 60%)"
          : "radial-gradient(circle at 50% 50%, rgba(43,79,129,0.1) 0%, transparent 60%)"};
          animation: ${starKeyframes} 8s infinite;
          pointer-events: none;
          z-index: 0;
        }
      `}
    >
      <Box
        as="nav"
        position={isMenuFixed ? "sticky" : "relative"}
        top={0}
        zIndex={100}
        bg={navBgColor}
        color={textColor}
        py={4}
        boxShadow={
          colorMode === "dark"
            ? "0 4px 20px rgba(0,0,0,0.4)"
            : "0 4px 20px rgba(43,79,129,0.15)"
        }
        backdropFilter="blur(12px)"
        transition="all 0.3s ease-in-out"
        borderBottom={isMenuFixed ? "1px solid rgba(255,255,255,0.05)" : "none"}
      >
        <Container maxW="container.xl">
          <Flex justify="space-between" align="center">
            <Flex align="center" gap={4} id="app-navigation-container">
              {!isMobile && (
                <Tooltip
                  label={isMenuFixed ? (language === 'pt' ? "Desativar Gravidade (Soltar Menu)" : "Disable Gravity (Release Menu)") : (language === 'pt' ? "Ativar Gravidade (Fixar Menu)" : "Activate Gravity (Fix Menu)")}
                  hasArrow
                  bg="purple.600"
                >
                  <IconButton
                    aria-label="Toggle Menu Gravity"
                    icon={<Icon as={FaAnchor} w={5} h={5} transform={!isMenuFixed ? "rotate(180deg)" : "rotate(0)"} />}
                    onClick={toggleGravity}
                    variant="ghost"
                    color={isMenuFixed ? "purple.400" : "gray.500"}
                    _hover={{
                      color: "purple.300",
                      bg: "whiteAlpha.100",
                      transform: "scale(1.1)"
                    }}
                    transition="all 0.2s"
                    animation={!isMenuFixed ? "pulse 2s infinite" : "none"}
                  />
                </Tooltip>
              )}

              {isMobile ? (
                <IconButton
                  id="app-navigation-mobile"
                  aria-label="Open menu"
                  icon={<FaBars />}
                  onClick={onOpen}
                  variant="ghost"
                  color={textColor}
                />
              ) : (
                <Stack id="app-navigation-desktop" direction="row" spacing={8}>
                  <NavLinks />
                </Stack>
              )}
            </Flex>

            {isMobile && (
              <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent bg={bgColor}>
                  <DrawerCloseButton color={textColor} />
                  <DrawerHeader borderBottomWidth="1px" color={textColor}>
                    Menu
                  </DrawerHeader>
                  <DrawerBody>
                    <VStack spacing={4} align="stretch">
                      <NavLinks />
                    </VStack>
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
            )}

            <Flex align="center" gap={4} id="language-toggle">
              <Flex align="center" gap={2}>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
                  color={textColor}
                  fontWeight="bold"
                  _hover={{ bg: colorMode === "dark" ? "whiteAlpha.200" : "blackAlpha.100" }}
                >
                  {language === 'pt' ? 'PT' : 'EN'}
                </Button>
                <IconButton
                  aria-label="Toggle color mode"
                  icon={colorMode === "dark" ? <FaSun /> : <FaMoon />}
                  onClick={toggleColorMode}
                  variant="ghost"
                  color={textColor}
                />
              </Flex>
            </Flex>
          </Flex>
        </Container>
      </Box>

      <Box
        flex={1}
        position="relative"
        zIndex={1}
      // Removed overflow-x hidden from here, rely on body
      >
        <Outlet />
      </Box>

      <Box
        as="footer"
        bg={navBgColor}
        color={textColor}
        py={6}
        mt="auto"
        boxShadow={
          colorMode === "dark"
            ? "0 -4px 20px rgba(0,0,0,0.3)"
            : "0 -4px 20px rgba(43,79,129,0.15)"
        }
        backdropFilter="blur(8px)"
        transition="all 0.3s ease-in-out"
        borderTop="1px solid rgba(255,255,255,0.05)"
      >
        <Container maxW="container.xl">
          <VStack spacing={2}>
            <Text textAlign="center" fontSize="sm">
              &copy; {new Date().getFullYear()} Rogério Júnior. {t('footer.rights')}.
            </Text>
            <Text fontSize="xs" opacity={0.6}>
              {language === 'pt' ? 'Desenvolvido no Espaço-Tempo' : 'Developed in Space-Time'} 🌌
            </Text>
          </VStack>
        </Container>
      </Box>

      <CookieConsent />
      <CodeTour />
    </Box>
  );
}
