import {
  Box,
  Container,
  Flex,
  Link as ChakraLink,
  Stack,
  Text,
  useColorMode,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { css, keyframes } from "@emotion/react";
import { Link as RouterLink, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FaSun, FaMoon, FaBars } from "react-icons/fa";

export function Layout() {
  const { user, logout } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const bgColor = colorMode === "dark" ? "gray.900" : "gray.50";
  const textColor = colorMode === "dark" ? "yellow.400" : "yellow.600";
  const navBgColor =
    colorMode === "dark" ? "rgba(0, 0, 0, 0.95)" : "rgba(255, 255, 255, 0.95)";
  const hoverColor = colorMode === "dark" ? "yellow.300" : "yellow.600";

  const starKeyframes = keyframes`
    0% { opacity: 0.3; }
    50% { opacity: 1; }
    100% { opacity: 0.3; }
  `;

  const NavLinks = () => (
    <>
      <ChakraLink
        as={RouterLink}
        to="/"
        _hover={{ color: hoverColor }}
        transition="all 0.3s ease"
      >
        Home
      </ChakraLink>
      <ChakraLink
        as={RouterLink}
        to="/about"
        _hover={{ color: hoverColor }}
        transition="all 0.3s ease"
      >
        Sobre Mim
      </ChakraLink>
      <ChakraLink
        as={RouterLink}
        to="/portfolio/development"
        _hover={{ color: hoverColor }}
        transition="all 0.3s ease"
      >
        Desenvolvimento
      </ChakraLink>
      <ChakraLink
        as={RouterLink}
        to="/portfolio/design"
        _hover={{ color: hoverColor }}
        transition="all 0.3s ease"
      >
        Design
      </ChakraLink>
      <ChakraLink
        as={RouterLink}
        to="/portfolio/social-media"
        _hover={{ color: hoverColor }}
        transition="all 0.3s ease"
      >
        Social Media
      </ChakraLink>
    </>
  );

  return (
    <Box
      minH="100vh"
      display="flex"
      flexDirection="column"
      bg={bgColor}
      backgroundImage={`radial-gradient(circle at 1px 1px, ${
        colorMode === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)"
      } 1px, transparent 0),
      radial-gradient(circle at 15px 15px, ${
        colorMode === "dark" ? "rgba(255,215,0,0.1)" : "rgba(43,79,129,0.05)"
      } 2px, transparent 0)`}
      backgroundSize="40px 40px, 60px 60px"
      position="relative"
      overflow="hidden"
      transition="all 0.3s ease-in-out"
      css={css`
        &:before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: ${colorMode === "dark"
            ? "radial-gradient(circle at 50% 50%, rgba(255,215,0,0.1) 0%, transparent 60%)"
            : "radial-gradient(circle at 50% 50%, rgba(43,79,129,0.1) 0%, transparent 60%)"};
          animation: ${starKeyframes} 3s infinite;
        }
      `}
    >
      <Box
        as="nav"
        bg={navBgColor}
        color={textColor}
        py={4}
        boxShadow={
          colorMode === "dark"
            ? "0 4px 20px rgba(255,215,0,0.15)"
            : "0 4px 20px rgba(43,79,129,0.15)"
        }
        backdropFilter="blur(8px)"
        transition="all 0.3s ease-in-out"
      >
        <Container maxW="container.xl">
          <Flex justify="space-between" align="center">
            {isMobile ? (
              <>
                <IconButton
                  aria-label="Open menu"
                  icon={<FaBars />}
                  onClick={onOpen}
                  variant="ghost"
                  color={textColor}
                />
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
                        {user ? (
                          <>
                            <ChakraLink
                              as={RouterLink}
                              to="/admin"
                              _hover={{ color: "brand.yellow.400" }}
                            >
                              Admin
                            </ChakraLink>
                            <ChakraLink
                              onClick={() => logout()}
                              _hover={{ color: "brand.yellow.400" }}
                              cursor="pointer"
                            >
                              Sair
                            </ChakraLink>
                          </>
                        ) : (
                          <ChakraLink
                            as={RouterLink}
                            to="/login"
                            _hover={{ color: "brand.yellow.400" }}
                          >
                            Login
                          </ChakraLink>
                        )}
                      </VStack>
                    </DrawerBody>
                  </DrawerContent>
                </Drawer>
              </>
            ) : (
              <Stack direction="row" spacing={8}>
                <NavLinks />
              </Stack>
            )}
            <Flex align="center" gap={4}>
              {!isMobile && (
                <Stack direction="row" spacing={4}>
                  {user ? (
                    <>
                      <ChakraLink
                        as={RouterLink}
                        to="/admin"
                        _hover={{ color: "brand.yellow.400" }}
                      >
                        Admin
                      </ChakraLink>
                      <ChakraLink
                        onClick={() => logout()}
                        _hover={{ color: "brand.yellow.400" }}
                        cursor="pointer"
                      >
                        Sair
                      </ChakraLink>
                    </>
                  ) : (
                    <ChakraLink
                      as={RouterLink}
                      to="/login"
                      _hover={{ color: "brand.yellow.400" }}
                    >
                      Login
                    </ChakraLink>
                  )}
                </Stack>
              )}
              <Flex align="center" gap={4}>
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
        css={css`
          &:before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: ${colorMode === "dark"
              ? "radial-gradient(circle at 50% 50%, rgba(255,215,0,0.05) 0%, transparent 70%)"
              : "radial-gradient(circle at 50% 50%, rgba(43,79,129,0.05) 0%, transparent 70%)"};
            pointer-events: none;
          }
        `}
      >
        <Outlet />
      </Box>

      <Box
        as="footer"
        bg={navBgColor}
        color={textColor}
        py={4}
        mt="auto"
        boxShadow={
          colorMode === "dark"
            ? "0 -4px 20px rgba(255,215,0,0.15)"
            : "0 -4px 20px rgba(43,79,129,0.15)"
        }
        backdropFilter="blur(8px)"
        transition="all 0.3s ease-in-out"
      >
        <Container maxW="container.xl">
          <Text textAlign="center">
            &copy; {new Date().getFullYear()} Rogério Júnior. Todos os direitos
            reservados.
          </Text>
        </Container>
      </Box>
    </Box>
  );
}
