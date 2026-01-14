import { Box, Container, Flex, Link as ChakraLink, Stack, Text, useColorMode, IconButton, useDisclosure, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, VStack, useBreakpointValue, Button, Tooltip, Icon, Divider } from "@chakra-ui/react";
import { css, keyframes } from "@emotion/react";
import { Link as RouterLink, Outlet, useLocation } from "react-router-dom";
import { FaSun, FaMoon, FaBars, FaAnchor, FaRocket } from "react-icons/fa";
import { useTranslation } from "../i18n/useTranslation";
import { CookieConsent } from "./CookieConsent";
import { CodeTour } from "./CodeTour";
import { useState, useEffect, useCallback } from "react";
import { useGlobalEasterEggs } from "../hooks/useGlobalEasterEggs";
import { GlobalEasterEggNotification } from "./EasterEggs/GlobalEasterEggNotification";
import { usePageSpecificEasterEggs, PageEasterEggNotification } from "./EasterEggs/PageSpecificEasterEggs";
import { usePortfolioSettings } from "../hooks/usePortfolioSettings";
import { FloatingStars, SecretComboTracker, ClickParticles } from "./InteractiveElements";
import { CommandBar } from "./EasterEggs/CommandBar";
import { useGamification } from "../hooks/useGamification";
import { AchievementNotification } from "./Gamification/AchievementNotification";
import { GamificationPanel } from "./Gamification/GamificationPanel";
import { GamificationBadge } from "./Gamification/GamificationBadge";
import { useGamificationTracking } from "../hooks/useGamificationTracking";
import { WhatsAppButton } from "./WhatsAppButton";
import { CommandCenter } from "./CommandCenter/CommandCenter";
import { AccessibilityToolbar } from "./Accessibility/AccessibilityToolbar";
import { SkipLinks } from "./Accessibility/SkipLinks";

export function Layout() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const location = useLocation();
  const { t, language, setLanguage } = useTranslation();
  const { trackThemeSwitch, trackLanguageSwitch } = useGamificationTracking();
  
  const isInLab = location.pathname.startsWith('/lab');
  
  const handleToggleColorMode = useCallback(() => {
    toggleColorMode();
    trackThemeSwitch();
  }, [toggleColorMode, trackThemeSwitch]);
  
  const handleSetLanguage = useCallback((lang: 'pt' | 'en') => {
    setLanguage(lang);
    trackLanguageSwitch();
  }, [setLanguage, trackLanguageSwitch]);
  
  const { settings } = usePortfolioSettings();
  const { activeEgg: globalEgg } = useGlobalEasterEggs(settings?.easterEggsEnabled ?? true);
  const { activeEgg: pageEgg } = usePageSpecificEasterEggs(settings?.easterEggsEnabled ?? true);
  
  const { unlockAchievement, newAchievement, incrementStat } = useGamification();
  const [gamificationOpen, setGamificationOpen] = useState(false);
  const { isOpen: isCommandCenterOpen, onOpen: onCommandCenterOpen, onClose: onCommandCenterClose } = useDisclosure();
  
  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const timeSpent = Math.floor((Date.now() - startTime) / 60000);
      if (timeSpent > 0 && timeSpent % 5 === 0) {
        incrementStat('timeSpent', 5);
      }
    }, 300000);
    
    return () => clearInterval(interval);
  }, [incrementStat]);
  
  useEffect(() => {
    const hasVisited = localStorage.getItem('portfolio-visited');
    if (!hasVisited) {
      unlockAchievement('first-visit', true);
      localStorage.setItem('portfolio-visited', 'true');
    }
  }, [unlockAchievement]);
  
  useEffect(() => {
    if (globalEgg) {
      const eggIdMap: Record<string, string> = {
        'konami': 'konami-code',
        'space': 'space-mode',
        'rocket': 'rocket-launch',
        'star': 'star-discoverer',
        'planet': 'planet-explorer',
        'dev': 'dev-mode',
        'triple-click': 'triple-click',
        'secret-combo': 'hello-world',
      };
      const achievementId = eggIdMap[globalEgg.id];
      if (achievementId) {
        unlockAchievement(achievementId, true);
      }
    }
  }, [globalEgg, unlockAchievement]);

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

  const NavLinks = ({ onLinkClick }: { onLinkClick?: () => void }) => (
    <>
      <ChakraLink 
        as={RouterLink} 
        to="/" 
        onClick={onLinkClick}
        _hover={{ color: hoverColor, textShadow: "0 0 8px rgba(255,215,0,0.6)" }} 
        transition="all 0.3s ease"
      >
        {t('nav.home')}
      </ChakraLink>
      <ChakraLink 
        as={RouterLink} 
        to="/about" 
        onClick={onLinkClick}
        _hover={{ color: hoverColor, textShadow: "0 0 8px rgba(255,215,0,0.6)" }} 
        transition="all 0.3s ease"
      >
        {t('nav.about')}
      </ChakraLink>
      <ChakraLink 
        as={RouterLink} 
        to="/portfolio/development" 
        onClick={onLinkClick}
        _hover={{ color: hoverColor, textShadow: "0 0 8px rgba(255,215,0,0.6)" }} 
        transition="all 0.3s ease"
      >
        {t('nav.portfolio')}
      </ChakraLink>
      <ChakraLink 
        as={RouterLink} 
        to="/certificates" 
        onClick={onLinkClick}
        _hover={{ color: hoverColor, textShadow: "0 0 8px rgba(255,215,0,0.6)" }} 
        transition="all 0.3s ease"
      >
        {t('nav.certificates')}
      </ChakraLink>
      <ChakraLink 
        as={RouterLink} 
        to="/lab" 
        onClick={onLinkClick}
        _hover={{ color: "cyan.400", textShadow: "0 0 8px rgba(0,255,255,0.6)" }} 
        transition="all 0.3s ease" 
        color="cyan.500"
      >
        Cosmic Lab 🚀
      </ChakraLink>
    </>
  );

  return (
    <>
      <SkipLinks />
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
      overflowX="hidden"
      w="100%"
      maxW="100vw"
      transition="all 0.3s ease-in-out"
      css={css`
        box-sizing: border-box;
        width: 100%;
        max-width: 100vw;
        overflow-x: hidden;
        position: relative;
        &:before {
          content: "";
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100vw;
          max-width: 100vw;
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
        id="navigation"
        role="navigation"
        aria-label="Navegação principal"
        position={isMenuFixed || (isMobile && isInLab) ? "fixed" : "relative"}
        top={0}
        left={0}
        right={0}
        zIndex={isMobile && isInLab ? 200 : 100}
        bg={navBgColor}
        color={textColor}
        py={{ base: 3, md: 4 }}
        px={0}
        w="100%"
        boxShadow={
          colorMode === "dark"
            ? "0 4px 20px rgba(0,0,0,0.4)"
            : "0 4px 20px rgba(43,79,129,0.15)"
        }
        backdropFilter="blur(12px)"
        transition="all 0.3s ease-in-out"
        borderBottom={isMenuFixed || (isMobile && isInLab) ? "1px solid rgba(255,255,255,0.05)" : "none"}
        css={{
          willChange: 'transform',
          boxSizing: 'border-box',
        }}
      >
        <Container maxW="container.xl" px={{ base: 2, md: 4 }} w="100%">
          <Flex justify="space-between" align="center" gap={{ base: 2, md: 4 }}>
            <Flex align="center" gap={{ base: 2, md: 4 }} id="app-navigation-container" flex={1}>
              {!isMobile && (
                <Tooltip
                  label={isMenuFixed ? (language === 'pt' ? "Desativar Gravidade (Soltar Menu)" : "Disable Gravity (Release Menu)") : (language === 'pt' ? "Ativar Gravidade (Fixar Menu)" : "Activate Gravity (Fix Menu)")}
                  hasArrow
                  bg="purple.600"
                >
                  <IconButton
                    aria-label="Toggle Menu Gravity"
                    icon={<Icon as={FaAnchor} w={{ base: 4, md: 5 }} h={{ base: 4, md: 5 }} transform={!isMenuFixed ? "rotate(180deg)" : "rotate(0)"} />}
                    onClick={toggleGravity}
                    variant="ghost"
                    color={isMenuFixed ? "purple.400" : "gray.500"}
                    size={{ base: "sm", md: "md" }}
                    _hover={{
                      color: "purple.300",
                      bg: "whiteAlpha.100",
                    }}
                    transition="all 0.2s"
                    animation={!isMenuFixed ? "pulse 2s infinite" : "none"}
                  />
                </Tooltip>
              )}

              {isMobile && (
                <IconButton
                  id="app-navigation-mobile"
                  aria-label="Open menu"
                  icon={<FaBars />}
                  onClick={onOpen}
                  variant="ghost"
                  color={textColor}
                  size="sm"
                />
              )}
              {!isMobile && (
                <Stack id="app-navigation-desktop" direction="row" spacing={{ base: 4, md: 6, lg: 8 }} flexWrap="wrap">
                  <NavLinks />
                </Stack>
              )}
            </Flex>

            {isMobile && (
              <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xs">
                <DrawerOverlay zIndex={199} />
                <DrawerContent bg={bgColor} zIndex={200}>
                  <DrawerCloseButton color={textColor} />
                  <DrawerHeader borderBottomWidth="1px" color={textColor} fontSize="lg">
                    Menu
                  </DrawerHeader>
                  <DrawerBody px={4}>
                    <VStack spacing={4} align="stretch">
                      <NavLinks onLinkClick={onClose} />
                      <Divider borderColor={colorMode === "dark" ? "whiteAlpha.200" : "blackAlpha.200"} />
                      <Button
                        leftIcon={<Icon as={FaRocket} />}
                        onClick={() => {
                          onClose();
                          onCommandCenterOpen();
                        }}
                        bgGradient="linear(to-r, orange.400, red.500)"
                        color="white"
                        _hover={{
                          bgGradient: "linear(to-r, orange.500, red.600)",
                        }}
                        size="sm"
                      >
                        {language === 'pt' ? 'Central de Comando' : 'Command Center'}
                      </Button>
                    </VStack>
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
            )}

            <Flex align="center" gap={{ base: 1, md: 2, lg: 4 }} id="language-toggle" flexShrink={0}>
              <Flex align="center" gap={1}>
                <Tooltip
                  label={language === 'pt' ? 'Central de Comando' : 'Command Center'}
                  placement="bottom"
                  hasArrow
                >
                  <IconButton
                    aria-label={language === 'pt' ? 'Abrir Central de Comando' : 'Open Command Center'}
                    icon={<Icon as={FaRocket} />}
                    onClick={onCommandCenterOpen}
                    variant="ghost"
                    color={textColor}
                    size={{ base: "sm", md: "md" }}
                    _hover={{
                      bg: colorMode === "dark" ? "whiteAlpha.200" : "blackAlpha.100",
                      color: "orange.400",
                      transform: "scale(1.1)",
                    }}
                    transition="all 0.2s"
                  />
                </Tooltip>
                <Button
                  size={{ base: "xs", md: "sm" }}
                  variant="ghost"
                  onClick={() => handleSetLanguage(language === 'pt' ? 'en' : 'pt')}
                  color={textColor}
                  fontWeight="bold"
                  fontSize={{ base: "xs", md: "sm" }}
                  px={{ base: 2, md: 3 }}
                  _hover={{ bg: colorMode === "dark" ? "whiteAlpha.200" : "blackAlpha.100" }}
                >
                  {language === 'pt' ? 'PT' : 'EN'}
                </Button>
                <IconButton
                  aria-label="Toggle color mode"
                  icon={colorMode === "dark" ? <FaSun /> : <FaMoon />}
                  onClick={handleToggleColorMode}
                  variant="ghost"
                  color={textColor}
                  size={{ base: "sm", md: "md" }}
                />
              </Flex>
            </Flex>
          </Flex>
        </Container>
      </Box>

      <Box
        id="main-content"
        role="main"
        aria-label="Conteúdo principal"
        flex={1}
        position="relative"
        zIndex={1}
        pt={
          isMenuFixed || (isMobile && isInLab)
            ? { base: "70px", md: "80px" }
            : { base: "0", md: "0" }
        }
        transition="padding-top 0.3s ease-in-out"
        overflowX="hidden"
        w="100%"
        maxW="100vw"
        tabIndex={-1}
      >
        <Outlet />
      </Box>

      {!isInLab && (
        <Box
          as="footer"
          id="footer"
          role="contentinfo"
          aria-label="Rodapé"
          bg={navBgColor}
          color={textColor}
          py={6}
          mt="auto"
          w="100%"
          px={0}
          boxShadow={
            colorMode === "dark"
              ? "0 -4px 20px rgba(0,0,0,0.3)"
              : "0 -4px 20px rgba(43,79,129,0.15)"
          }
          backdropFilter="blur(8px)"
          transition="all 0.3s ease-in-out"
          borderTop="1px solid rgba(255,255,255,0.05)"
          css={{
            boxSizing: 'border-box',
          }}
        >
          <Container maxW="container.xl" w="100%">
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
      )}

      <CookieConsent />
      <CodeTour />
      
      {settings?.showAnimations !== false && (
        <>
          <FloatingStars count={30} />
          <ClickParticles />
        </>
      )}
      <SecretComboTracker />
      
      <GlobalEasterEggNotification egg={globalEgg} />
      <PageEasterEggNotification egg={pageEgg} />
      <AchievementNotification achievement={newAchievement} />
      {!(isMobile && isInLab) && (
        <>
          <GamificationBadge onOpen={() => setGamificationOpen(true)} />
          <GamificationPanel isOpen={gamificationOpen} onClose={() => setGamificationOpen(false)} />
        </>
      )}
      
      <CommandCenter isOpen={isCommandCenterOpen} onClose={onCommandCenterClose} />
      
      {!(isMobile && isInLab) && <WhatsAppButton />}
      
      <CommandBar 
        enabled={settings?.easterEggsEnabled ?? true}
        onCommand={(egg) => {
          if (egg.effect) {
            egg.effect();
          }
        }}
      />
      
      <AccessibilityToolbar />
    </Box>
    </>
  );
}
