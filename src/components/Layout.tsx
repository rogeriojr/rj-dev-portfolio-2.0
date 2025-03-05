import { Box, Container, Flex, Link as ChakraLink, Stack, Text } from '@chakra-ui/react';
import { Link as RouterLink, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function Layout() {
  const { user, logout } = useAuth();

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Box as="nav" bg="gray.800" color="white" py={4}>
        <Container maxW="container.xl">
          <Flex justify="space-between" align="center">
            <Stack direction="row" spacing={8}>
              <ChakraLink as={RouterLink} to="/" _hover={{ color: 'blue.300' }}>
                Home
              </ChakraLink>
              <ChakraLink as={RouterLink} to="/about" _hover={{ color: 'blue.300' }}>
                Sobre Mim
              </ChakraLink>
              <ChakraLink as={RouterLink} to="/portfolio/development" _hover={{ color: 'blue.300' }}>
                Desenvolvimento
              </ChakraLink>
              <ChakraLink as={RouterLink} to="/portfolio/design" _hover={{ color: 'blue.300' }}>
                Design
              </ChakraLink>
              <ChakraLink as={RouterLink} to="/portfolio/social-media" _hover={{ color: 'blue.300' }}>
                Social Media
              </ChakraLink>
            </Stack>
            {user ? (
              <Stack direction="row" spacing={4}>
                <ChakraLink as={RouterLink} to="/admin" _hover={{ color: 'blue.300' }}>
                  Admin
                </ChakraLink>
                <ChakraLink onClick={() => logout()} _hover={{ color: 'blue.300' }} cursor="pointer">
                  Sair
                </ChakraLink>
              </Stack>
            ) : (
              <ChakraLink as={RouterLink} to="/login" _hover={{ color: 'blue.300' }}>
                Login
              </ChakraLink>
            )}
          </Flex>
        </Container>
      </Box>

      <Box flex={1}>
        <Outlet />
      </Box>

      <Box as="footer" bg="gray.800" color="white" py={4} mt="auto">
        <Container maxW="container.xl">
          <Text textAlign="center">&copy; {new Date().getFullYear()} Rogério Júnior. Todos os direitos reservados.</Text>
        </Container>
      </Box>
    </Box>
  );
}